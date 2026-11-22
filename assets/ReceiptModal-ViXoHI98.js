import{r as n,j as e,D as v,v as k,w as E,x as S,I as C,y as a,z as o,X as c,q as N,T as w,b as d,c as l,E as T}from"./vendor-DgwgiKl8.js";import{t as u}from"./index-CemXqtZF.js";import"./numberflow-CCBqW9Sg.js";const m=[{id:"myelin-hlsl",title:"DirectX 12 HLSL SM 6.2 Compute Kernel",system:"MYELIN-SR",filePath:"src/myelin_v3_ocblock.hlsl",language:"hlsl",description:"Register-blocked compute shader kernel (OC_TILE=8) with float16_t2 HFMA2 vector ALUs, cooperative 34x18 LDS halo loading, and 2-bit ternary weight bitmask unpack.",reproductionCommand:"dxc.exe -T cs_6_2 -E CSMain -DFORCE_DENSE=1 src/myelin_v3_ocblock.hlsl -Fo bin/myelin_dense.cso",repoUrl:"https://github.com/MrDunky14/MYELIN-SR/blob/main/src/myelin_v3_ocblock.hlsl",code:`// MYELIN-SR v3.3: OC_TILE=8 Register-Blocked + float16_t2 Vectorized Kernel (SM 6.2)
// Target Architecture: NVIDIA GeForce RTX 5050 Laptop GPU
// Compile flags: -DFORCE_DENSE=0|1 (0 = 2-bit ternary unpack, 1 = dense FP16 HFMA2)

#ifndef FORCE_DENSE
#define FORCE_DENSE 1
#endif

cbuffer LayerConfig : register(b0)
{
    uint InW;
    uint InH;
    uint OutW;
    uint OutH;
    uint LayerType;      // 0 = Backbone 3x3, 1 = Head 3x3, 2 = PixelShuffle 2x + Bilinear Skip
    uint InChannels;
    uint OutChannels;
    uint Activation;     // 0 = None, 1 = ReLU
    uint TernaryOffset;  // uint32 index into TernaryWeights
    uint DenseOffset;    // float16_t element index into DenseWeights
    uint ScaleOffset;    // float index into Scales
    uint BiasOffset;     // float index into Biases
};

ByteAddressBuffer       InputAct       : register(t0);
StructuredBuffer<uint>  TernaryWeights : register(t1);
ByteAddressBuffer       DenseWeights   : register(t2);
StructuredBuffer<float> Scales         : register(t3);
StructuredBuffer<float> Biases         : register(t4);
RWByteAddressBuffer     OutputAct      : register(u0);

#define LOAD_H1(buf, idx)        ((buf).Load<float16_t>((idx) * 2u))
#define STORE_H2(buf, idx, val)  ((buf).Store<float16_t2>((idx) * 2u, (val)))

#define TILE_W 32
#define TILE_H 16
#define SHARED_W 34
#define SHARED_H 18
#define THREADS_PER_GROUP 256
#define OC_TILE 8

// Pad stride to 36 to avoid 32-bank LDS conflicts on 16-bit accesses
groupshared float16_t s_Tile[SHARED_H][36];

[numthreads(16, 16, 1)]
void CSMain(
    uint3 gid    : SV_GroupID,
    uint3 gtid   : SV_GroupThreadID,
    uint3 dtid   : SV_DispatchThreadID,
    uint  gindex : SV_GroupIndex)
{
    if (LayerType == 0u || LayerType == 1u)
    {
        bool useTernary = (LayerType == 0u) && (FORCE_DENSE == 0);
        uint ocBase = gid.z * OC_TILE;
        int  baseX  = (int)(gid.x * TILE_W) - 1;
        int  baseY  = (int)(gid.y * TILE_H) - 1;

        float16_t2 acc[OC_TILE];
        [unroll]
        for (uint k = 0u; k < OC_TILE; ++k)
            acc[k] = float16_t2(0.0h, 0.0h);

        uint wordsPerOC = (InChannels * 9u + 15u) / 16u;
        uint tx = gtid.x * 2u;
        uint ty = gtid.y;

        for (uint ic = 0u; ic < InChannels; ++ic)
        {
            // Cooperative 34x18 halo load (ALL 256 threads participate; no early exit)
            uint chBase = ic * InH;
            for (uint idx = gindex; idx < (SHARED_W * SHARED_H); idx += THREADS_PER_GROUP)
            {
                uint ly = idx / SHARED_W;
                uint lx = idx % SHARED_W;
                int gx = baseX + (int)lx;
                int gy = baseY + (int)ly;
                float16_t v = (float16_t)0;
                if (gx >= 0 && gx < (int)InW && gy >= 0 && gy < (int)InH)
                    v = LOAD_H1(InputAct, (chBase + (uint)gy) * InW + (uint)gx);
                s_Tile[ly][lx] = v;
            }
            GroupMemoryBarrierWithGroupSync();

            // Load 3x4 neighborhood ONCE into registers -> 9 float16_t2 vectors reused across 8 OCs
            float16_t2 v[9];
            [unroll]
            for (uint ky = 0u; ky < 3u; ++ky)
            {
                float16_t a0 = s_Tile[ty + ky][tx + 0u];
                float16_t a1 = s_Tile[ty + ky][tx + 1u];
                float16_t a2 = s_Tile[ty + ky][tx + 2u];
                float16_t a3 = s_Tile[ty + ky][tx + 3u];
                v[ky * 3u + 0u] = float16_t2(a0, a1);
                v[ky * 3u + 1u] = float16_t2(a1, a2);
                v[ky * 3u + 2u] = float16_t2(a2, a3);
            }

            if (!useTernary)
            {
                // Dense FP16: vector multiply-accumulate on FP16 ALUs
                uint denseBase = DenseOffset + ic * 9u;
                [unroll]
                for (uint k = 0u; k < OC_TILE; ++k)
                {
                    uint oc = ocBase + k;
                    if (oc < OutChannels)
                    {
                        uint weightOffset = denseBase + oc * (InChannels * 9u);
                        [unroll]
                        for (uint t = 0u; t < 9u; ++t)
                        {
                            float16_t w = LOAD_H1(DenseWeights, weightOffset + t);
                            acc[k] += v[t] * float16_t2(w, w);
                        }
                    }
                }
            }
            GroupMemoryBarrierWithGroupSync();
        }
        // Write out results with fused scale, bias, and optional ReLU...
    }
}`},{id:"engram-seqlock",title:"C++23 Seqlock Reader & Reader-Quiesced Kill",system:"Engram-Core",filePath:"src/core/cluster_graph.h",language:"cpp",description:"Lock-free seqlock snapshots for torn-free edge traversal with _mm_pause() spin loop, and reader-quiesced node reclamation on an ABA-tagged Treiber stack.",reproductionCommand:"cl.exe /std:c++23 /O2 /EHsc /MD /I src/core src/core/main.cpp /Fe:bin/engram_core.exe",repoUrl:"https://github.com/MrDunky14/Engram-Core/blob/main/src/core/cluster_graph.h",code:`// Engram-Core: High-Throughput Ingestion & Traversal Engine (C++23)
// Lock-free ABA-tagged Treiber stack + Seqlock reader + RQS Quiescence Drain

// ─────────────────────────────────────────────────────────────
// Seqlock snapshots: bounded copy for torn-free edge traversal
// ─────────────────────────────────────────────────────────────
int copy_edges_snapshot(Edge* out, int max_n) const noexcept {
    for (int spin = 0;; ++spin) {
        uint32_t s1 = edge_seq.load(std::memory_order_acquire);
        if (s1 & 1u) {
            if (spin > 64) std::this_thread::yield();
            else {
                #if defined(_MSC_VER)
                _mm_pause();
                #else
                std::this_thread::yield();
                #endif
            }
            continue;
        }
        int ec = edge_count.load(std::memory_order_relaxed);
        int n = (ec < max_n) ? ec : max_n;
        for (int i = 0; i < n; i++) {
            out[i] = edges[i];
        }
        std::atomic_thread_fence(std::memory_order_acquire);
        uint32_t s2 = edge_seq.load(std::memory_order_acquire);
        if (s1 == s2) return n;
        if (spin > 64) std::this_thread::yield();
    }
}

// ─────────────────────────────────────────────────────────────
// kill() — push node onto the Treiber stack with RQS draining
//          so active readers never observe recycled state.
// PRECONDITION: Caller must NOT hold any lock on graph_rw_lock,
// as kill() acquires unique_lock<shared_mutex>(graph_rw_lock) to quiesce.
// ─────────────────────────────────────────────────────────────
void kill(int id) noexcept {
    if (id < 0 || id >= CORTEX_CAPACITY) return;

    ClusterNode& n = cortex_memory[id];
    while (n.edge_lock.test_and_set(std::memory_order_acquire))
        std::this_thread::yield();
    while (n.inverse_edge_lock.test_and_set(std::memory_order_acquire))
        std::this_thread::yield();

    n.edge_seq.fetch_add(1, std::memory_order_acq_rel);
    n.inverse_edge_seq.fetch_add(1, std::memory_order_acq_rel);
    std::atomic_thread_fence(std::memory_order_release);

    n.alive.store(false, std::memory_order_release);
    n.edge_count.store(0, std::memory_order_release);
    n.inverse_edge_count.store(0, std::memory_order_release);

    std::atomic_thread_fence(std::memory_order_release);
    n.edge_seq.fetch_add(1, std::memory_order_acq_rel);
    n.inverse_edge_seq.fetch_add(1, std::memory_order_acq_rel);

    n.inverse_edge_lock.clear(std::memory_order_release);
    n.edge_lock.clear(std::memory_order_release);

    // RQS Quiesce: Drain readers in spread_activation holding shared_lock
    {
        std::unique_lock<std::shared_mutex> quiesce(graph_rw_lock);
    }

    uint64_t head = free_head.load(std::memory_order_acquire);
    uint64_t new_head;
    do {
        uint32_t tag = (uint32_t)(head >> 32);
        int32_t  old_top = (head == FREE_STACK_EMPTY)
            ? -1
            : (int32_t)(head & 0xFFFFFFFFull);

        free_next[id].store(old_top, std::memory_order_relaxed);
        new_head = (((uint64_t)(tag + 1) << 32) | (uint32_t)id);
    } while (!free_head.compare_exchange_weak(head, new_head,
        std::memory_order_release,
        std::memory_order_acquire));
}`},{id:"srebench-pytest",title:"OpenEnv 22/22 Pytest Verification Suite",system:"SREBench",filePath:"tests/test_srebench.py",language:"python",description:"Exhaustive test suite verifying 12-task incident lifecycle, stochastic compound task transitions, causal dependency gating, and anti-exploit penalties.",reproductionCommand:"pytest tests/test_srebench.py -v",repoUrl:"https://github.com/MrDunky14/SREBench/blob/main/tests/test_srebench.py",code:`"""
Comprehensive Pytest Suite for SREBench.
Tests:
1. All 12 tasks + compound random task lifecycle (initialize, step, grade).
2. Log formatting: zero unformatted '{' or '}' braces across all 12 fault types in INCIDENTS.
3. Anti-exploit guards:
   a) Shotgun restart penalty when >= 2 distinct services restarted (-0.50).
   b) Premature diagnosis penalty when < 2 distinct targets investigated (-0.15).
   c) Non-root remediation penalty (-0.15).
   d) Ground truth hidden in state().
4. FastAPI server endpoints via TestClient (/tasks, /reset, /step, /state, /grader).
"""

import pytest
from src.environment import SREBenchEnvironment, INCIDENTS
from src.infrastructure import Infrastructure, LOG_TEMPLATES
from src.models import (
    IncidentAction,
    IncidentObservation,
    IncidentReward,
    IncidentState,
)
from src.server import app, GRADERS
from fastapi.testclient import TestClient

@pytest.mark.parametrize("task_id", list(INCIDENTS.keys()))
def test_all_12_tasks_lifecycle(task_id):
    """Verify each of the 12 standard tasks initializes, steps, and grades cleanly."""
    env = SREBenchEnvironment()
    obs = env.reset(task_id)
    assert isinstance(obs, IncidentObservation)
    assert obs.alert_message != ""
    assert len(obs.system_dashboard) == 6

    # Take an investigation step
    action = IncidentAction(
        action_type="investigate",
        command="check_logs",
        target="api-gateway",
        params={},
    )
    obs, reward, done, info = env.step(action)
    assert isinstance(obs, IncidentObservation)
    assert isinstance(reward, IncidentReward)
    assert isinstance(done, bool)

    # Verify grader runs cleanly
    grader_fn = GRADERS.get(task_id)
    assert grader_fn is not None
    score = grader_fn(env)
    assert isinstance(score, float)
    assert 0.0 <= score <= 1.0


def test_anti_exploit_shotgun_penalty():
    """Verify restart penalty (-0.50) triggers when restarting multiple services blindly."""
    env = SREBenchEnvironment()
    env.reset("task_1")

    # Restart service 1
    action1 = IncidentAction(action_type="remediate", command="restart_service", target="auth", params={})
    env.step(action1)

    # Restart service 2 (shotgun trigger)
    action2 = IncidentAction(action_type="remediate", command="restart_service", target="orders", params={})
    obs, reward, done, info = env.step(action2)

    assert reward.penalty <= -0.50
    assert "shotgun_restart_penalty" in info.get("penalties", [])`}];function D({receiptId:_,isOpen:p,onClose:h,showVisualProof:f=!1}){const[x,r]=n.useState(!1),[g,i]=n.useState(!1),t=m.find(s=>s.id===_)||m[0],y=()=>{navigator.clipboard.writeText(t.code),r(!0),u.success("Source code snippet copied to clipboard"),setTimeout(()=>r(!1),2e3)},b=()=>{navigator.clipboard.writeText(t.reproductionCommand),i(!0),u.success("Reproduction command copied: "+t.reproductionCommand),setTimeout(()=>i(!1),2e3)};return e.jsx(v,{open:p,onOpenChange:s=>!s&&h(),children:e.jsxs(k,{children:[e.jsx(E,{className:"fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"}),e.jsx(S,{className:"fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-800 bg-[#0c0c0e] p-6 shadow-2xl focus:outline-none max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200","aria-describedby":"receipt-description",children:f?e.jsxs("div",{className:"flex flex-col h-full overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between pb-4 border-b border-zinc-800",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(C,{className:"w-5 h-5 text-emerald-400"}),e.jsxs("div",{children:[e.jsx(a,{className:"text-lg font-bold font-sans text-zinc-100",children:"MYELIN-SR: Set14 Butterfly Visual Proof"}),e.jsx("p",{id:"receipt-description",className:"text-xs font-mono text-zinc-400",children:"Bicubic vs PyTorch FP16 Reference vs DirectX 12 MYELIN-SR HLSL Output"})]})]}),e.jsx(o,{className:"rounded p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer","aria-label":"Close modal",children:e.jsx(c,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"mt-4 flex-1 overflow-y-auto",children:[e.jsx("div",{className:"rounded-lg border border-zinc-800 bg-black/60 p-2 flex items-center justify-center",children:e.jsx("img",{src:"/assets/visual_comparison_butterfly.png",alt:"MYELIN-SR Set14 Butterfly Super-Resolution Quality Comparison",className:"max-h-[60vh] w-auto object-contain rounded"})}),e.jsxs("div",{className:"mt-4 p-3 rounded-lg border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-300 space-y-1",children:[e.jsxs("div",{className:"flex items-center space-x-2 text-emerald-400 font-semibold",children:[e.jsx(N,{className:"w-4 h-4"}),e.jsx("span",{children:"Bitwise Precision & PSNR Integrity Validated"})]}),e.jsx("p",{className:"text-zinc-400",children:"The Set14 Butterfly comparison demonstrates crisp high-frequency wing ridge reconstruction without haloing, ringing artifacts, or edge distortion. Outputs match the PyTorch reference tensor within 1-ULP numerical precision."})]})]})]}):e.jsxs("div",{className:"flex flex-col h-full overflow-hidden",children:[e.jsxs("div",{className:"flex items-start justify-between pb-4 border-b border-zinc-800",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center space-x-2 mb-1",children:[e.jsx("span",{className:"px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",children:t.system}),e.jsx("span",{className:"text-xs font-mono text-zinc-400",children:t.filePath})]}),e.jsx(a,{className:"text-lg font-bold font-sans text-zinc-100",children:t.title}),e.jsx("p",{id:"receipt-description",className:"text-xs text-zinc-400 mt-1",children:t.description})]}),e.jsx(o,{className:"rounded p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer","aria-label":"Close modal",children:e.jsx(c,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"mt-4 p-2.5 rounded-lg border border-zinc-800 bg-zinc-950 flex items-center justify-between text-xs font-mono",children:[e.jsxs("div",{className:"flex items-center space-x-2 overflow-x-auto mr-2",children:[e.jsx(w,{className:"w-4 h-4 text-emerald-400 shrink-0"}),e.jsx("span",{className:"text-zinc-400 shrink-0",children:"$"}),e.jsx("span",{className:"text-zinc-200 select-all whitespace-nowrap",children:t.reproductionCommand})]}),e.jsx("button",{type:"button",onClick:b,className:"shrink-0 p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer",title:"Copy command","aria-label":"Copy compilation command",children:g?e.jsx(d,{className:"w-4 h-4 text-emerald-400"}):e.jsx(l,{className:"w-4 h-4"})})]}),e.jsx("div",{className:"mt-4 flex-1 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300 leading-relaxed",children:e.jsx("pre",{className:"whitespace-pre overflow-x-auto",children:e.jsx("code",{children:t.code})})}),e.jsxs("div",{className:"mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between",children:[e.jsxs("a",{href:t.repoUrl,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center space-x-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors",children:[e.jsx("span",{children:"View in GitHub Repository"}),e.jsx(T,{className:"w-3.5 h-3.5"})]}),e.jsx("button",{type:"button",onClick:y,className:"inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer",children:x?e.jsxs(e.Fragment,{children:[e.jsx(d,{className:"w-3.5 h-3.5 text-emerald-400"}),e.jsx("span",{className:"text-emerald-300",children:"Copied Source"})]}):e.jsxs(e.Fragment,{children:[e.jsx(l,{className:"w-3.5 h-3.5 text-zinc-400"}),e.jsx("span",{children:"Copy Source Snippet"})]})})]})]})})]})})}export{D as ReceiptModal};
