import { useState } from 'react';
import { Cpu, Award, MapPin, Terminal, Copy, Check, ChevronDown, Activity } from 'lucide-react';
import { PERSONAL_INFO, TELEMETRY_SPECS } from '../data/systemsData';
import { toast } from 'sonner';

export function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    toast.success('Email copied to clipboard: ' + PERSONAL_INFO.email);
    setTimeout(() => setCopied(false), 2000);
  };

  const toolchainItems = [
    'C++23',
    'DirectX 12',
    'HLSL SM 6.2',
    'CUDA',
    'Lock-Free Concurrency',
    '1.58-bit QAT',
    'AVX2',
    'Win32 VirtualAlloc',
    'Distributed DAGs',
  ];

  return (
    <section className="relative pt-24 pb-16 border-b border-zinc-800/80 bg-radial from-zinc-900/40 via-zinc-950 to-[#09090b]">
      {/* Structural wireframe grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges: Affiliation & Award */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">{PERSONAL_INFO.award}</span>
            <span className="text-amber-400/60 hidden sm:inline">•</span>
            <span className="text-amber-200/80 hidden sm:inline">{PERSONAL_INFO.awardRole}</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>{PERSONAL_INFO.affiliation}</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 text-zinc-400 font-mono text-xs tracking-wider mb-2">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>sys://operator/krishna-singh</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 font-sans">
            Krishna Singh
          </h1>

          <p className="mt-2 text-lg sm:text-xl font-medium text-cyan-400 font-mono tracking-tight">
            {PERSONAL_INFO.role}
          </p>

          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans max-w-3xl">
            {PERSONAL_INFO.thesis}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#flagships"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-200 text-xs font-mono font-medium transition-all shadow-sm shadow-cyan-950"
          >
            <span>Explore Flagships</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </a>

          <a
            href="#benchmarks"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 text-xs font-mono font-medium transition-all"
          >
            <span>Benchmark Archive</span>
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 text-xs font-mono font-medium transition-all cursor-pointer"
            aria-label="Copy Email"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied Email</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>{PERSONAL_INFO.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Toolchain strip */}
        <div className="mt-10 pt-6 border-t border-zinc-800/80">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            <span>Core Systems Stack &amp; Architectural Focus</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {toolchainItems.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Battle Station Telemetry Bar */}
        <div id="telemetry" className="specular-card mt-8 p-5 rounded-xl border border-zinc-800/90 relative overflow-hidden">
          {/* Corner Crosshairs */}
          <span className="corner-cross top-2 left-2 text-zinc-600">+</span>
          <span className="corner-cross top-2 right-2 text-zinc-600">+</span>
          <span className="corner-cross bottom-2 left-2 text-zinc-600">+</span>
          <span className="corner-cross bottom-2 right-2 text-zinc-600">+</span>

          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-semibold tracking-wider text-zinc-200 uppercase">
                Hardware Host &amp; Benchmark Baseline Telemetry
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {TELEMETRY_SPECS.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800/70">
              <span className="text-[10px] text-zinc-500 block uppercase">Host CPU</span>
              <span className="text-zinc-200 font-semibold">{TELEMETRY_SPECS.cpu}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800/70">
              <span className="text-[10px] text-zinc-500 block uppercase">Compute GPU</span>
              <span className="text-zinc-200 font-semibold">{TELEMETRY_SPECS.gpu}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800/70">
              <span className="text-[10px] text-zinc-500 block uppercase">Toolchain &amp; Compiler</span>
              <span className="text-zinc-200 font-semibold">{TELEMETRY_SPECS.compiler}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800/70">
              <span className="text-[10px] text-zinc-500 block uppercase">SIMD / Vector Pipeline</span>
              <span className="text-zinc-200 font-semibold">{TELEMETRY_SPECS.simd}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
