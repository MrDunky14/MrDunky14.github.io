import { useState } from 'react';
import NumberFlow from '@number-flow/react';
import { ExternalLink, Code2, Eye, Zap, CheckCircle2 } from 'lucide-react';
import { MYELIN_METRIC_MATRIX } from '../data/systemsData';
import { ResolutionTarget, PrecisionMode } from '../types';

interface MyelinCardProps {
  onOpenReceipt: (receiptId: string) => void;
  onOpenVisualProof: () => void;
}

export function MyelinCard({ onOpenReceipt, onOpenVisualProof }: MyelinCardProps) {
  const [resolution, setResolution] = useState<ResolutionTarget>('1080p');
  const [precision, setPrecision] = useState<PrecisionMode>('FP16');

  const metricKey = `${resolution}-${precision}`;
  const currentMetric = MYELIN_METRIC_MATRIX[metricKey] ?? MYELIN_METRIC_MATRIX['1080p-FP16']!;

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between hover:border-zinc-700/80 transition-all shadow-md shadow-black/40">
      <div>
        {/* Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              DirectX 12 Compute
            </span>
            <span className="text-xs font-mono text-zinc-400">SM 6.2 // HLSL</span>
          </div>
          <a
            href="https://github.com/MrDunky14/MYELIN-SR"
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
          MYELIN-SR
        </h3>
        <p className="text-xs sm:text-sm text-cyan-400 font-mono mt-1">
          DirectX 12 1.58-Bit Ternary Super-Resolution Engine
        </p>

        <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
          High-performance real-time compute shader pipeline executing 2x super-resolution with 1-ULP numerical parity to PyTorch. Features custom register-blocked 3x3 convolution kernels with FP16 vector HFMA2 instructions.
        </p>

        {/* 2x2 Metric Switcher Controls */}
        <div className="mt-5 p-3.5 rounded-lg border border-zinc-800 bg-zinc-950/80">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center space-x-1">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>Interactive Kernel Profiler</span>
            </span>

            {/* Resolution Switcher */}
            <div className="inline-flex rounded-md p-0.5 bg-zinc-900 border border-zinc-800 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setResolution('1080p')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  resolution === '1080p'
                    ? 'bg-zinc-800 text-cyan-300 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                1080p (540p in)
              </button>
              <button
                type="button"
                onClick={() => setResolution('1440p')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  resolution === '1440p'
                    ? 'bg-zinc-800 text-cyan-300 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                1440p (720p in)
              </button>
            </div>
          </div>

          {/* Precision Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-zinc-800/80">
            <span className="text-[11px] font-mono text-zinc-400">Precision Mode:</span>
            <div className="inline-flex rounded-md p-0.5 bg-zinc-900 border border-zinc-800 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setPrecision('FP16')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  precision === 'FP16'
                    ? 'bg-zinc-800 text-cyan-300 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Dense FP16 (HFMA2)
              </button>
              <button
                type="button"
                onClick={() => setPrecision('TernaryQAT')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  precision === 'TernaryQAT'
                    ? 'bg-zinc-800 text-cyan-300 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                1.58-Bit Ternary QAT
              </button>
            </div>
          </div>

          {/* Live Dynamic Number Display */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-zinc-800/80 text-left">
            <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-400 font-mono block">FRAME LATENCY</span>
              <div className="text-lg font-mono font-bold text-cyan-300 flex items-baseline space-x-1 tabular-nums">
                <NumberFlow
                  value={currentMetric.frameTimeMs}
                  format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                />
                <span className="text-xs text-zinc-400 font-normal">ms</span>
              </div>
            </div>

            <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-400 font-mono block">THROUGHPUT</span>
              <div className="text-lg font-mono font-bold text-emerald-400 flex items-baseline space-x-1 tabular-nums">
                <NumberFlow
                  value={currentMetric.fps}
                  format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                />
                <span className="text-xs text-zinc-400 font-normal">FPS</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
              <span className="text-[10px] text-zinc-400 font-mono block">WORKING VRAM</span>
              <div className="text-lg font-mono font-bold text-zinc-200 flex items-baseline space-x-1 tabular-nums">
                <NumberFlow
                  value={currentMetric.vramMb}
                  format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                />
                <span className="text-xs text-zinc-400 font-normal">MB</span>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="flex items-center space-x-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>{currentMetric.numericalParity}</span>
            </span>
            <span className="text-zinc-400">{currentMetric.speedupVsBaseline}</span>
          </div>
        </div>

        {/* Technical Highlights list */}
        <div className="mt-5 space-y-2 text-xs font-mono text-zinc-300">
          <div className="flex items-start space-x-2">
            <span className="text-cyan-400 select-none">▸</span>
            <span>OC_TILE=8 register-blocked loop with float16_t2 vector ALUs</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-cyan-400 select-none">▸</span>
            <span>Cooperative 34x18 halo load across 256 threads with LDS bank-conflict avoidance</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-cyan-400 select-none">▸</span>
            <span>Hardware Target: NVIDIA GeForce RTX 5050 Laptop GPU</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onOpenReceipt('myelin-hlsl')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Inspect HLSL Kernel</span>
        </button>

        <button
          type="button"
          onClick={onOpenVisualProof}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>Set14 Visual Proof</span>
        </button>
      </div>
    </article>
  );
}
