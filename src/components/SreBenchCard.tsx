import { useState } from 'react';
import { ExternalLink, Code2, AlertTriangle, RotateCcw, Flame } from 'lucide-react';

interface SreBenchCardProps {
  onOpenReceipt: (receiptId: string) => void;
}

type ServiceStatus = 'healthy' | 'degraded' | 'failed';

export function SreBenchCard({ onOpenReceipt }: SreBenchCardProps) {
  // Service health states
  const [activeFault, setActiveFault] = useState<string | null>(null);
  const [isRecovering, setIsRecovering] = useState<boolean>(false);

  // Microservice dependency graph state
  const getServiceStatus = (serviceName: string): ServiceStatus => {
    if (activeFault === 'database') {
      if (serviceName === 'database') return 'failed';
      if (['payment', 'catalog', 'order', 'frontend'].includes(serviceName)) return 'degraded';
    }
    if (activeFault === 'auth') {
      if (serviceName === 'auth') return 'failed';
      if (serviceName === 'frontend') return 'degraded';
    }
    if (activeFault === 'payment') {
      if (serviceName === 'payment') return 'failed';
      if (['order', 'frontend'].includes(serviceName)) return 'degraded';
    }
    return 'healthy';
  };

  const handleInjectFault = (faultType: string) => {
    setActiveFault(faultType);
    setIsRecovering(false);
  };

  const handleCausalRemediation = () => {
    setIsRecovering(true);
    // Causal step-by-step recovery: database first, then dependents
    setTimeout(() => {
      setActiveFault(null);
      setIsRecovering(false);
    }, 900);
  };

  const services = [
    { id: 'frontend', name: 'frontend-gw', tier: 'Tier 0: Entry', x: 260, y: 24 },
    { id: 'auth', name: 'auth-svc', tier: 'Tier 1: Auth', x: 150, y: 78 },
    { id: 'order', name: 'order-svc', tier: 'Tier 1: Checkout', x: 370, y: 78 },
    { id: 'payment', name: 'payment-svc', tier: 'Tier 2: Billing', x: 150, y: 132 },
    { id: 'catalog', name: 'catalog-svc', tier: 'Tier 2: Inventory', x: 370, y: 132 },
    { id: 'database', name: 'db-replica', tier: 'Tier 3: Storage', x: 260, y: 182 },
  ];

  const connections = [
    { from: 'frontend', to: 'auth' },
    { from: 'frontend', to: 'order' },
    { from: 'order', to: 'payment' },
    { from: 'order', to: 'catalog' },
    { from: 'payment', to: 'database' },
    { from: 'catalog', to: 'database' },
  ];

  return (
    <article className="specular-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between col-span-1 lg:col-span-6 relative overflow-hidden group">
      {/* Corner Crosshairs */}
      <span className="corner-cross top-2.5 left-2.5 text-zinc-600">+</span>
      <span className="corner-cross top-2.5 right-2.5 text-zinc-600">+</span>
      <span className="corner-cross bottom-2.5 left-2.5 text-zinc-600">+</span>
      <span className="corner-cross bottom-2.5 right-2.5 text-zinc-600">+</span>

      {/* Atmospheric Amber/Rose Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div>
        {/* Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-zinc-800/80">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center space-x-1.5 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>RL Environment</span>
            </span>
            <span className="text-xs font-mono text-zinc-400">OpenEnv // Gymnasium</span>
          </div>

          <a
            href="https://github.com/MrDunky14/SREBench"
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
          <span>SREBench</span>
          <span className="text-xs font-mono text-amber-400 font-normal px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/60">
            &gt;1,000 eps/s
          </span>
        </h3>
        <p className="text-xs sm:text-sm text-amber-400 font-mono mt-1">
          OpenEnv Incident-Response Benchmark &amp; Stochastic State Machine
        </p>

        <p className="text-xs text-zinc-300 mt-2.5 leading-relaxed">
          High-throughput simulation environment for autonomous incident triage across a 6-service microservice DAG. Features anti-exploit reward hardening (shotgun penalty <code className="text-rose-400 bg-zinc-900 px-1 py-0.5 rounded">-0.50</code>, premature diagnosis <code className="text-rose-400 bg-zinc-900 px-1 py-0.5 rounded">-0.15</code>) and strict causal recovery gating.
        </p>

        {/* Interactive Microservice DAG Simulator */}
        <div className="mt-5 p-4 rounded-xl border border-zinc-800/90 bg-zinc-950/90">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-800/80">
            <span className="text-xs font-mono font-semibold text-zinc-300 flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive DAG Topology Simulator</span>
            </span>

            {/* Fault Actions */}
            <div className="flex items-center space-x-1.5">
              {activeFault ? (
                <button
                  type="button"
                  onClick={handleCausalRemediation}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-semibold hover:bg-emerald-500/30 transition-all cursor-pointer"
                >
                  <RotateCcw className={`w-3 h-3 ${isRecovering ? 'animate-spin' : ''}`} />
                  <span>{isRecovering ? 'Resolving...' : 'Causal Remediation'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleInjectFault('database')}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-mono font-semibold hover:bg-rose-500/25 transition-all cursor-pointer"
                >
                  <Flame className="w-3 h-3 text-rose-400" />
                  <span>Inject DB Sync Failure</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive DAG Topology Canvas */}
          <div className="relative h-56 w-full bg-black/60 rounded-lg border border-zinc-800/80 p-2 overflow-hidden flex flex-col justify-between">
            {/* Status Header */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 px-1">
              <span className="flex items-center space-x-1">
                <span className={`w-1.5 h-1.5 rounded-full ${activeFault ? 'bg-rose-400 animate-ping' : 'bg-emerald-400'}`} />
                <span>DAG Health: <strong className={activeFault ? 'text-rose-400' : 'text-emerald-400'}>{activeFault ? 'CASCADE FAULT ACTIVE' : 'ALL 6 SERVICES HEALTHY'}</strong></span>
              </span>
              <span>Causal Gating: <strong className="text-zinc-200">Enforced</strong></span>
            </div>

            {/* SVG Connections and Nodes */}
            <svg className="w-full h-44" viewBox="0 0 520 206">
              {/* Dependency Arrows */}
              {connections.map((conn) => {
                const src = services.find((s) => s.id === conn.from)!;
                const dst = services.find((s) => s.id === conn.to)!;
                const dstStatus = getServiceStatus(dst.id);

                return (
                  <line
                    key={`${conn.from}-${conn.to}`}
                    x1={src.x}
                    y1={src.y}
                    x2={dst.x}
                    y2={dst.y}
                    stroke={dstStatus === 'failed' ? '#f43f5e' : dstStatus === 'degraded' ? '#f59e0b' : '#27272a'}
                    strokeWidth={dstStatus !== 'healthy' ? '2' : '1.5'}
                    strokeDasharray={dstStatus !== 'healthy' ? '4 2' : 'none'}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Service Nodes */}
              {services.map((svc) => {
                const status = getServiceStatus(svc.id);
                const isFailed = status === 'failed';
                const isDegraded = status === 'degraded';

                return (
                  <g
                    key={svc.id}
                    className="cursor-pointer group/node"
                    onClick={() => handleInjectFault(svc.id === activeFault ? 'database' : svc.id)}
                  >
                    <rect
                      x={svc.x - 52}
                      y={svc.y - 13}
                      width="104"
                      height="26"
                      rx="6"
                      className={`transition-all duration-200 ${
                        isFailed
                          ? 'fill-rose-950/90 stroke-rose-500 stroke-1.5 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                          : isDegraded
                          ? 'fill-amber-950/80 stroke-amber-500 stroke-1.5'
                          : 'fill-zinc-900/95 stroke-zinc-700/80 stroke-1 hover:stroke-amber-400 hover:fill-zinc-800'
                      }`}
                    />
                    {/* Status Dot */}
                    {isFailed && (
                      <circle
                        cx={svc.x - 38}
                        cy={svc.y}
                        r="5"
                        className="fill-rose-400/30 animate-ping pointer-events-none"
                      />
                    )}
                    <circle
                      cx={svc.x - 38}
                      cy={svc.y}
                      r="3.5"
                      className={
                        isFailed
                          ? 'fill-rose-400'
                          : isDegraded
                          ? 'fill-amber-400'
                          : 'fill-emerald-400'
                      }
                    />
                    {/* Service Name Label */}
                    <text
                      x={svc.x + 8}
                      y={svc.y + 3.5}
                      textAnchor="middle"
                      className={`text-[10px] font-mono font-medium select-none tracking-tight ${
                        isFailed ? 'fill-rose-200' : isDegraded ? 'fill-amber-200' : 'fill-zinc-300'
                      }`}
                    >
                      {svc.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="text-[10px] font-mono text-zinc-500 text-center flex items-center justify-center space-x-2">
              <span>Click node to inject fault</span>
              <span>•</span>
              <span className="text-zinc-400">Dependency: <code className="text-zinc-300">frontend &rarr; order &rarr; payment &rarr; db</code></span>
            </div>
          </div>
        </div>

        {/* Empirical Benchmarks Strip */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 text-left">
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 font-mono block">THROUGHPUT</span>
            <div className="text-lg font-mono font-bold text-amber-400 tabular-nums">
              &gt;1,000
              <span className="text-xs text-zinc-500 font-normal ml-1">eps/s</span>
            </div>
            <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">Stochastic state sim</span>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 font-mono block">TEST SUITE</span>
            <div className="text-lg font-mono font-bold text-emerald-400 tabular-nums">
              22 / 22
              <span className="text-xs text-zinc-500 font-normal ml-1">pass</span>
            </div>
            <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">tests/test_srebench.py</span>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 font-mono block">ACTION SPACE</span>
            <div className="text-lg font-mono font-bold text-cyan-300 tabular-nums">
              Discrete
              <span className="text-xs text-zinc-500 font-normal ml-1">(240)</span>
            </div>
            <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">Gymnasium API</span>
          </div>
        </div>
      </div>

      {/* Action Trigger */}
      <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onOpenReceipt('srebench')}
          className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <Code2 className="w-4 h-4 text-amber-400" />
          <span>Inspect 22/22 Pytest Suite &rarr;</span>
        </button>

        <span className="text-[10px] font-mono text-zinc-500">
          Finalist — Meta × HF × Scaler
        </span>
      </div>
    </article>
  );
}
