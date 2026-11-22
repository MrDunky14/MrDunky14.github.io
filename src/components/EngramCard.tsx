import { useState } from 'react';
import { ExternalLink, Code2, Play, RotateCcw } from 'lucide-react';

interface EngramCardProps {
  onOpenReceipt: (receiptId: string) => void;
}

export function EngramCard({ onOpenReceipt }: EngramCardProps) {
  const [activeTab, setActiveTab] = useState<'graph' | 'memory'>('graph');
  const [pulseActive, setPulseActive] = useState<boolean>(false);
  const [pulseStep, setPulseStep] = useState<number>(0);
  const [committedBlocks, setCommittedBlocks] = useState<number>(6); // Out of 32 blocks

  // Spreading activation simulation trigger
  const handleTriggerPulse = () => {
    setPulseActive(true);
    setPulseStep(1);
    setTimeout(() => setPulseStep(2), 300);
    setTimeout(() => setPulseStep(3), 600);
    setTimeout(() => {
      setPulseActive(false);
      setPulseStep(0);
    }, 1200);
  };

  const handleSimulateAllocation = () => {
    setCommittedBlocks((prev) => (prev >= 28 ? 6 : prev + 4));
  };

  // Node positions in the interactive cortex DAG (viewBox: 0 0 500 170)
  const nodes = [
    { id: 'ROOT', label: 'ROOT', x: 250, y: 30, hop: 0, v: '1.00V' },
    { id: 'C1', label: 'Cortex.1', x: 150, y: 84, hop: 1, v: '0.74V' },
    { id: 'C2', label: 'Cortex.2', x: 350, y: 84, hop: 1, v: '0.68V' },
    { id: 'N1', label: 'Synapse.A', x: 80, y: 138, hop: 2, v: '0.52V' },
    { id: 'N2', label: 'Synapse.B', x: 210, y: 138, hop: 2, v: '0.48V' },
    { id: 'M1', label: 'Motor.X', x: 290, y: 138, hop: 2, v: '0.45V' },
    { id: 'M2', label: 'Motor.Y', x: 420, y: 138, hop: 2, v: '0.41V' },
  ];

  const edges = [
    { from: 'ROOT', to: 'C1' },
    { from: 'ROOT', to: 'C2' },
    { from: 'C1', to: 'N1' },
    { from: 'C1', to: 'N2' },
    { from: 'C2', to: 'M1' },
    { from: 'C2', to: 'M2' },
  ];

  return (
    <article className="specular-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between col-span-1 lg:col-span-6 relative overflow-hidden group">
      {/* Corner Crosshairs */}
      <span className="corner-cross top-2.5 left-2.5 text-zinc-600">+</span>
      <span className="corner-cross top-2.5 right-2.5 text-zinc-600">+</span>
      <span className="corner-cross bottom-2.5 left-2.5 text-zinc-600">+</span>
      <span className="corner-cross bottom-2.5 right-2.5 text-zinc-600">+</span>

      {/* Atmospheric Emerald Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div>
        {/* Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-zinc-800/80">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>C++23 Concurrency</span>
            </span>
            <span className="text-xs font-mono text-zinc-400">Lock-Free // Win32 Arena</span>
          </div>

          <a
            href="https://github.com/MrDunky14/Engram-Core"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans flex items-center space-x-2.5">
          <span>Engram-Core</span>
          <span className="text-xs font-mono text-emerald-400 font-normal px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60">
            22.9M triples/s
          </span>
        </h3>
        <p className="text-xs sm:text-sm text-emerald-400 font-mono mt-1">
          C++23 Spreading-Activation Graph Store &amp; Real-Time Memory Substrate
        </p>

        <p className="text-xs text-zinc-300 mt-2.5 leading-relaxed">
          High-throughput lock-free graph store engineered for sub-microsecond spreading activation. Features demand-paged <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">VirtualAlloc</code> memory, ABA-tagged Treiber neurogenesis stack, and reader-quiesced <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">kill()</code> draining with torn-free seqlocks.
        </p>

        {/* Interactive Instrument Container */}
        <div className="mt-5 p-4 rounded-xl border border-zinc-800/90 bg-zinc-950/90">
          {/* Instrument Header with Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-800/80">
            <div className="inline-flex rounded-lg p-0.5 bg-zinc-900 border border-zinc-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('graph')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer font-medium ${
                  activeTab === 'graph'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Spreading Activation
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('memory')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer font-medium ${
                  activeTab === 'memory'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                VirtualAlloc Map
              </button>
            </div>

            {/* Interactive Control Button */}
            {activeTab === 'graph' ? (
              <button
                type="button"
                onClick={handleTriggerPulse}
                disabled={pulseActive}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-mono font-semibold transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                <span>{pulseActive ? 'Propagating...' : 'Trigger 2-Hop Wavefront'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSimulateAllocation}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:text-white text-xs font-mono font-semibold transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-zinc-400" />
                <span>Simulate Node Ingest (+4 Pages)</span>
              </button>
            )}
          </div>

          {/* Tab 1: Interactive Spreading Activation Graph Simulator */}
          {activeTab === 'graph' ? (
            <div className="relative h-48 w-full bg-black/60 rounded-lg border border-zinc-800/80 p-2 overflow-hidden flex flex-col justify-between">
              {/* Telemetry Status Line */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 px-1">
                <span className="flex items-center space-x-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${pulseActive ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
                  <span>Traversal: <strong className="text-zinc-200">100 ns p50</strong> (7.0x faster than SQLite)</span>
                </span>
                <span>Seqlock: <strong className="text-emerald-400">0 Torn Invariants</strong></span>
              </div>

              {/* Interactive SVG Node Mesh */}
              <svg className="w-full h-36" viewBox="0 0 500 170">
                {/* Edges */}
                {edges.map((edge) => {
                  const src = nodes.find((n) => n.id === edge.from)!;
                  const dst = nodes.find((n) => n.id === edge.to)!;
                  const isEdgeActive =
                    (pulseStep === 1 && src.hop === 0) ||
                    (pulseStep === 2 && src.hop === 1);

                  return (
                    <line
                      key={`${edge.from}-${edge.to}`}
                      x1={src.x}
                      y1={src.y}
                      x2={dst.x}
                      y2={dst.y}
                      stroke={isEdgeActive ? '#10b981' : '#27272a'}
                      strokeWidth={isEdgeActive ? '2.5' : '1.5'}
                      strokeDasharray={isEdgeActive ? '4 2' : 'none'}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                  const isNodePulsed =
                    (pulseStep === 1 && node.hop === 0) ||
                    (pulseStep === 2 && node.hop === 1) ||
                    (pulseStep === 3 && node.hop === 2);

                  return (
                    <g key={node.id} className="cursor-pointer group/node" onClick={handleTriggerPulse}>
                      {/* Pulse Ripple */}
                      {isNodePulsed && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="18"
                          className="fill-emerald-400/20 animate-ping pointer-events-none"
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isNodePulsed ? '12' : '9'}
                        className={`transition-all duration-200 ${
                          isNodePulsed
                            ? 'fill-emerald-400 stroke-emerald-200 stroke-2'
                            : 'fill-zinc-900 stroke-zinc-700 stroke-1.5 hover:stroke-emerald-400 hover:fill-zinc-800'
                        }`}
                      />
                      <text
                        x={node.x}
                        y={node.y + 19}
                        textAnchor="middle"
                        className="text-[10px] font-mono fill-zinc-400 select-none tracking-tight font-medium"
                      >
                        {node.label}
                      </text>
                      {isNodePulsed && (
                        <text
                          x={node.x}
                          y={node.y - 14}
                          textAnchor="middle"
                          className="text-[10px] font-mono fill-emerald-300 font-bold select-none"
                        >
                          {node.v}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              <div className="text-[10px] font-mono text-zinc-500 text-center">
                Click any node to inject spreading voltage wave across 2-hop edges
              </div>
            </div>
          ) : (
            /* Tab 2: VirtualAlloc Demand-Paging Arena Visualizer */
            <div className="relative h-48 w-full bg-black/60 rounded-lg border border-zinc-800/80 p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-zinc-400">Virtual Reservation: <strong className="text-zinc-200">1.3 GB (MEM_RESERVE)</strong></span>
                  <span className="text-emerald-400">Physical RSS: <strong>47.1 MB (MEM_COMMIT)</strong></span>
                </div>

                {/* Memory Page Block Grid (32 blocks simulating 262,144 arena nodes) */}
                <div className="grid grid-cols-8 gap-1.5 p-2 bg-zinc-950 rounded border border-zinc-800">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const isCommitted = i < committedBlocks;
                    return (
                      <div
                        key={i}
                        className={`h-4 rounded-sm border transition-all duration-300 ${
                          isCommitted
                            ? 'bg-emerald-500/30 border-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                            : 'bg-zinc-900/60 border-zinc-800/80'
                        }`}
                        title={isCommitted ? `Page ${i}: Physical Page Mapped (MEM_COMMIT)` : `Page ${i}: Virtual Address Reserved (Zero Physical RAM)`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="text-[10px] font-mono text-zinc-400 leading-tight">
                <span className="text-emerald-400 font-semibold">&gt; Demand Paging Reality: </span>
                Zero physical pages zeroed upfront. Memory allocation defers soft page faults to runtime, keeping the working set at <strong>47.1 MB RSS</strong> instead of allocating 1.3 GB physical RAM.
              </div>
            </div>
          )}
        </div>

        {/* Empirical Benchmarks Strip */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 text-left">
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 font-mono block">INGEST SPEED</span>
            <div className="text-lg font-mono font-bold text-emerald-400 tabular-nums">
              22.9M
              <span className="text-xs text-zinc-500 font-normal ml-1">triples/s</span>
            </div>
            <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">8.5x vs SQLite3</span>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 font-mono block">2-HOP TRAVERSAL</span>
            <div className="text-lg font-mono font-bold text-cyan-300 tabular-nums">
              100
              <span className="text-xs text-zinc-500 font-normal ml-1">ns</span>
            </div>
            <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">7.0x vs SQLite3</span>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 font-mono block">WORKING SET</span>
            <div className="text-lg font-mono font-bold text-amber-300 tabular-nums">
              47.1
              <span className="text-xs text-zinc-500 font-normal ml-1">MB</span>
            </div>
            <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">VirtualAlloc RSS</span>
          </div>
        </div>
      </div>

      {/* Action Trigger */}
      <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onOpenReceipt('engram-core')}
          className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
        >
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>Inspect C++23 Seqlock Source &rarr;</span>
        </button>

        <span className="text-[10px] font-mono text-zinc-500">
          76.2M stress ops // 0 torn invariants
        </span>
      </div>
    </article>
  );
}
