import { MyelinCard } from './MyelinCard';
import { EngramCard } from './EngramCard';
import { SreBenchCard } from './SreBenchCard';
import { Layers } from 'lucide-react';

interface FlagshipSectionProps {
  onOpenReceipt: (receiptId: string) => void;
  onOpenVisualProof: () => void;
}

export function FlagshipSection({ onOpenReceipt, onOpenVisualProof }: FlagshipSectionProps) {
  return (
    <section id="flagships" className="py-20 border-b border-zinc-800/80 relative">
      {/* Background Architectural Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-5 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>01 // FLAGSHIP SYSTEMS &amp; ARCHITECTURES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Production Engines &amp; Benchmarks
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-zinc-400 font-mono mt-3 md:mt-0 max-w-md flex flex-col space-y-1">
            <span className="text-zinc-300">
              Direct author of GPU compute shaders, lock-free concurrency, and distributed DAG simulators.
            </span>
            <span className="text-zinc-500 text-[11px]">
              SYS.SPEC // SM6.2_OC8 • CXX23_SEQLOCK • GYM_DISCRETE240
            </span>
          </div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Row 1: Full-Width Spotlight Hero Card (12 Columns) */}
          <MyelinCard
            onOpenReceipt={onOpenReceipt}
            onOpenVisualProof={onOpenVisualProof}
          />

          {/* Row 2: 2-Column Flank (6 Columns + 6 Columns) */}
          <EngramCard
            onOpenReceipt={onOpenReceipt}
          />
          <SreBenchCard
            onOpenReceipt={onOpenReceipt}
          />
        </div>
      </div>
    </section>
  );
}
