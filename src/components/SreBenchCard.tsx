import { ExternalLink, Code2, Network, GitBranch } from 'lucide-react';

interface SreBenchCardProps {
  onOpenReceipt: (receiptId: string) => void;
}

export function SreBenchCard({ onOpenReceipt }: SreBenchCardProps) {
  // DAG microservices for interactive visual topology
  const services = [
    { name: 'api-gateway', role: 'Ingress Proxy', upstream: [] },
    { name: 'auth', role: 'JWT Validator', upstream: ['api-gateway'] },
    { name: 'orders', role: 'Order Engine', upstream: ['auth'] },
    { name: 'payments', role: 'Payment Gateway', upstream: ['orders'] },
    { name: 'inventory', role: 'Stock Service', upstream: ['orders'] },
    { name: 'database', role: 'Primary DB', upstream: ['payments', 'inventory'] },
  ];

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between hover:border-zinc-700/80 transition-all shadow-md shadow-black/40">
      <div>
        {/* Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Evaluation Benchmark
            </span>
            <span className="text-xs font-mono text-zinc-400">OpenEnv // Python 3.11</span>
          </div>
          <a
            href="https://github.com/MrDunky14/SREBench"
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
          SREBench
        </h3>
        <p className="text-xs sm:text-sm text-purple-400 font-mono mt-1">
          OpenEnv Microservice DAG Benchmark for Autonomous SRE Incident Triage
        </p>

        <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
          High-throughput simulation environment modeling cascading incidents across distributed services. Features anti-exploit causal dependency gating and a strict scoring policy that penalizes blind restarts and superficial investigations.
        </p>

        {/* 6-Service DAG Topology Widget */}
        <div className="mt-5 p-3.5 rounded-lg border border-zinc-800 bg-zinc-950/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center space-x-1">
              <Network className="w-3 h-3 text-purple-400" />
              <span>6-Service Causal DAG Topology</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Anti-Exploit Gated</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-zinc-200">
                    {svc.name}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 mt-1">
                  {svc.role}
                </span>
              </div>
            ))}
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-zinc-800/80 text-left">
            <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-400 font-mono block">SIM THROUGHPUT</span>
              <div className="text-lg font-mono font-bold text-purple-300 tabular-nums">
                1,000+
                <span className="text-xs text-zinc-400 font-normal ml-1">eps/s</span>
              </div>
            </div>

            <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-400 font-mono block">PYTEST PASS</span>
              <div className="text-lg font-mono font-bold text-emerald-400 tabular-nums">
                22 / 22
                <span className="text-xs text-zinc-400 font-normal ml-1">Clean</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-400 font-mono block">FAULT COVERAGE</span>
              <div className="text-lg font-mono font-bold text-zinc-200 tabular-nums">
                12 / 12
                <span className="text-xs text-zinc-400 font-normal ml-1">Types</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80">
            <span className="flex items-center space-x-1 text-purple-400">
              <GitBranch className="w-3 h-3" />
              <span>Causal Parent Recovery Gating</span>
            </span>
            <span className="text-zinc-400">Shotgun Penalty (-0.50)</span>
          </div>
        </div>

        {/* Technical Highlights list */}
        <div className="mt-5 space-y-2 text-xs font-mono text-zinc-300">
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 select-none">▸</span>
            <span>Upstream dependency gating: recovering children requires healthy parents</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 select-none">▸</span>
            <span>Penalizes premature diagnoses (-0.15) and blind shotgun restarts (-0.50)</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 select-none">▸</span>
            <span>Finalist artifact in Meta x Hugging Face x Scaler OpenEnv Hackathon</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 select-none">▸</span>
            <span>Full 22/22 pytest suite verifying deterministic step and reward loops</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center">
        <button
          type="button"
          onClick={() => onOpenReceipt('srebench-pytest')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5 text-purple-400" />
          <span>Inspect Pytest Suite</span>
        </button>
      </div>
    </article>
  );
}
