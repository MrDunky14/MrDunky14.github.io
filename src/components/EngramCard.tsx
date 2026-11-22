import { ExternalLink, Code2, Zap, ShieldCheck } from 'lucide-react';

interface EngramCardProps {
  onOpenReceipt: (receiptId: string) => void;
}

export function EngramCard({ onOpenReceipt }: EngramCardProps) {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between hover:border-zinc-700/80 transition-all shadow-md shadow-black/40">
      <div>
        {/* Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Low-Level Engine
            </span>
            <span className="text-xs font-mono text-zinc-400">C++23 // Lock-Free</span>
          </div>
          <a
            href="https://github.com/MrDunky14/Engram-Core"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 font-sans">
          Engram-Core
        </h3>
        <p className="text-xs sm:text-sm text-emerald-400 font-mono mt-1">
          C++23 Spreading-Activation Graph Engine &amp; Cognitive Substrate
        </p>

        <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
          High-throughput lock-free graph store designed for sub-microsecond spreading activation and continuous associative recall. Built with a custom VirtualAlloc arena, ABA-tagged Treiber free stack, and torn-free seqlock edge snapshots.
        </p>

        {/* Telemetry Metrics Grid */}
        <div className="mt-5 p-3.5 rounded-lg border border-zinc-800 bg-zinc-950/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center space-x-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Empirical Performance Benchmarks</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-400">MSVC 19.52 /std:c++23</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-400 font-mono block">INGEST SPEED</span>
              <div className="text-lg font-mono font-bold text-emerald-400 tabular-nums">
                22.9M
                <span className="text-xs text-zinc-400 font-normal ml-1">triples/s</span>
              </div>
            </div>

            <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-400 font-mono block">2-HOP TRAVERSAL</span>
              <div className="text-lg font-mono font-bold text-cyan-300 tabular-nums">
                100
                <span className="text-xs text-zinc-400 font-normal ml-1">ns</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-400 font-mono block">ARENA RSS</span>
              <div className="text-lg font-mono font-bold text-zinc-200 tabular-nums">
                47.1
                <span className="text-xs text-zinc-400 font-normal ml-1">MB</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80">
            <span className="flex items-center space-x-1 text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>7.0x faster than SQLite baseline</span>
            </span>
            <span className="text-zinc-400">1,000 Hz Hybrid Timer</span>
          </div>
        </div>

        {/* Technical Highlights list */}
        <div className="mt-5 space-y-2 text-xs font-mono text-zinc-300">
          <div className="flex items-start space-x-2">
            <span className="text-emerald-400 select-none">▸</span>
            <span>Lock-free ABA-tagged 64-bit Treiber stack for O(1) node reuse</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-emerald-400 select-none">▸</span>
            <span>Reader-quiesced kill() draining using std::unique_lock&lt;std::shared_mutex&gt;</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-emerald-400 select-none">▸</span>
            <span>Per-node seqlock edge snapshots with _mm_pause() spin loop</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-emerald-400 select-none">▸</span>
            <span>Zero heap allocations on the critical spreading traversal hot path</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center">
        <button
          type="button"
          onClick={() => onOpenReceipt('engram-seqlock')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Inspect Seqlock Source</span>
        </button>
      </div>
    </article>
  );
}
