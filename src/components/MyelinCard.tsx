import { useState } from 'react';
import NumberFlow from '@number-flow/react';
import { ExternalLink, Code2, Zap, CheckCircle2, Sliders, Layers } from 'lucide-react';
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
    <article className="specular-card rounded-2xl p-6 sm:p-8 col-span-1 lg:col-span-12 relative overflow-hidden group">
      {/* Corner Crosshairs */}
      <span className="corner-cross top-2.5 left-2.5 text-zinc-600">+</span>
      <span className="corner-cross top-2.5 right-2.5 text-zinc-600">+</span>
      <span className="corner-cross bottom-2.5 left-2.5 text-zinc-600">+</span>
      <span className="corner-cross bottom-2.5 right-2.5 text-zinc-600">+</span>

      {/* Atmospheric Cyan Radial Aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Metadata Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-zinc-800/80">
        <div className="flex items-center space-x-2.5">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center space-x-1.5 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>DirectX 12 Compute</span>
          </span>
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">HLSL SM 6.2 // OC_TILE=8</span>
          <span className="text-xs font-mono text-zinc-500">•</span>
          <span className="text-xs font-mono text-zinc-400">NVIDIA RTX 5050</span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[11px] font-mono text-emerald-400/90 flex items-center space-x-1 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>1-ULP PyTorch Parity</span>
          </span>
          <a
            href="https://github.com/MrDunky14/MYELIN-SR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main 2-Column Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Super-Resolution Visual Viewport (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans flex items-center space-x-3">
              <span>MYELIN-SR</span>
              <span className="text-xs font-mono text-cyan-400 font-normal px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
                v3.0 Production
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-mono mt-1">
              DirectX 12 1.58-Bit Ternary &amp; Native FP16 Super-Resolution Inference Engine
            </p>
          </div>

          {/* Interactive Visual Comparison Viewport */}
          <div className="rounded-xl border border-zinc-800 bg-black/80 overflow-hidden relative shadow-2xl shadow-black/80 group/viewer">
            {/* Viewport Header Bar */}
            <div className="px-3.5 py-2 border-b border-zinc-800/80 bg-zinc-900/90 flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-300 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Set5 Butterfly Pixel-Level Quality Inspection (2x Zoom Nearest-Neighbor Crop)</span>
              </span>
              <span className="text-cyan-400 font-semibold hidden sm:inline">Set14 2x Y-PSNR</span>
            </div>

            {/* Real Composite Artifact Image */}
            <div className="relative p-2 bg-zinc-950 flex justify-center items-center overflow-x-auto">
              <img
                src="/assets/visual_comparison_butterfly.png"
                alt="MYELIN-SR 5-Way Visual Comparison on Set5 Butterfly (Bicubic, Lanczos, Ternary QAT, Dense FP16, Ground Truth)"
                className="w-full h-auto rounded border border-zinc-800/60 select-none pointer-events-auto"
                loading="lazy"
              />
            </div>

            {/* Viewport Footer Telemetry */}
            <div className="px-3.5 py-2 border-t border-zinc-800/80 bg-zinc-900/70 flex flex-wrap items-center justify-between text-[11px] font-mono gap-2">
              <div className="flex items-center space-x-2 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Dense FP16: <strong className="text-zinc-200">32.32 dB (+2.00 dB)</strong></span>
                <span className="text-zinc-600">|</span>
                <span>Ternary QAT: <strong className="text-zinc-200">32.29 dB (+1.97 dB)</strong></span>
              </div>
              <button
                type="button"
                onClick={onOpenVisualProof}
                className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-semibold underline underline-offset-4"
              >
                Inspect Full High-Res Artifact &rarr;
              </button>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            7 progressive compute kernels optimizing 540p&rarr;1080p from 75.96 ms down to <strong>8.60 ms (116.3 FPS)</strong> on NVIDIA RTX 5050 Laptop GPU via <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">OC_TILE=8</code> register blocking, padded LDS tiling, and <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5 rounded">float16_t2</code> (<code className="text-cyan-300">HFMA2</code> packed vector ALUs).
          </p>
        </div>

        {/* Right Column: Interactive 2x2 NumberFlow Roofline Profiler (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5 h-full">
          {/* Interactive Switcher Box */}
          <div className="p-4 sm:p-5 rounded-xl border border-zinc-800/90 bg-zinc-950/90 shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800/80">
              <span className="text-xs font-mono font-semibold text-cyan-400 flex items-center space-x-1.5 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Roofline Profiler</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">SM 6.2 Execution</span>
            </div>

            {/* Resolution Selector */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1.5">
                <span>Output Resolution:</span>
                <span className="text-zinc-500 font-mono text-[10px]">Scale: 2x</span>
              </div>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setResolution('1080p')}
                  className={`py-1.5 px-3 rounded-md transition-all cursor-pointer font-medium text-center ${
                    resolution === '1080p'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  1080p <span className="text-[10px] opacity-75">(540p in)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setResolution('1440p')}
                  className={`py-1.5 px-3 rounded-md transition-all cursor-pointer font-medium text-center ${
                    resolution === '1440p'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  1440p <span className="text-[10px] opacity-75">(720p in)</span>
                </button>
              </div>
            </div>

            {/* Precision Selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1.5">
                <span>Precision Mode:</span>
                <span className="text-zinc-500 font-mono text-[10px]">Kernel Architecture</span>
              </div>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setPrecision('FP16')}
                  className={`py-1.5 px-3 rounded-md transition-all cursor-pointer font-medium text-center ${
                    precision === 'FP16'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Dense FP16 <span className="text-[10px] opacity-75">(HFMA2)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPrecision('TernaryQAT')}
                  className={`py-1.5 px-3 rounded-md transition-all cursor-pointer font-medium text-center ${
                    precision === 'TernaryQAT'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  1.58-bit Ternary <span className="text-[10px] opacity-75">(QAT)</span>
                </button>
              </div>
            </div>

            {/* Dynamic Telemetry Matrix with NumberFlow */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 font-mono block">FRAME TIME</span>
                <div className="text-2xl font-mono font-bold text-cyan-300 flex items-baseline space-x-1">
                  <NumberFlow value={currentMetric.frameTimeMs} format={{ minimumFractionDigits: 2 }} />
                  <span className="text-xs font-normal text-zinc-400">ms</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 font-mono block">THROUGHPUT</span>
                <div className="text-2xl font-mono font-bold text-emerald-400 flex items-baseline space-x-1">
                  <NumberFlow value={currentMetric.fps} format={{ minimumFractionDigits: 1 }} />
                  <span className="text-xs font-normal text-zinc-400">FPS</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 font-mono block">BACKBONE WEIGHTS</span>
                <div className="text-lg font-mono font-bold text-zinc-200 flex items-baseline space-x-1">
                  <NumberFlow value={currentMetric.weightKb} format={{ minimumFractionDigits: 1 }} />
                  <span className="text-xs font-normal text-zinc-400">KB</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                  {precision === 'TernaryQAT' ? '7.93x compressed' : 'Native FP16'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 font-mono block">SET14 2X Y-PSNR</span>
                <div className="text-lg font-mono font-bold text-amber-300 flex items-baseline space-x-1">
                  <NumberFlow value={currentMetric.psnrDb} format={{ minimumFractionDigits: 2 }} />
                  <span className="text-xs font-normal text-zinc-400">dB</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                  {currentMetric.psnrGain} vs bicubic
                </span>
              </div>
            </div>
          </div>

          {/* Key Empirical Finding Callout */}
          <div className="p-3.5 rounded-lg border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-zinc-300 leading-relaxed">
            <span className="text-cyan-400 font-semibold block mb-1">
              &gt; Empirical Roofline Finding:
            </span>
            Dense FP16 beats 2-bit packed ternary by <strong>2.65x (8.60 ms vs 22.75 ms)</strong> despite 7.93x weight compression because the entire 37.7 KB backbone fits into L1/L2 cache, making the ALU bitwise decode overhead the primary bottleneck on modern GPUs.
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenReceipt('myelin-sr')}
              className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 text-xs font-mono font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Inspect HLSL Kernel Code</span>
            </button>
            <button
              type="button"
              onClick={onOpenVisualProof}
              className="inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-zinc-400" />
              <span>Visual Proof</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
