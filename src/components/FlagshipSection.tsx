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
    <section id="flagships" className="py-16 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-2">
              <Layers className="w-4 h-4" />
              <span>01 // FLAGSHIP ARCHITECTURES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-sans">
              Production Engines &amp; Benchmarks
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-2 md:mt-0 max-w-md">
            Direct author of custom compute shaders, lock-free concurrency primitives, and deterministic evaluation environments.
          </p>
        </div>

        {/* Flagship Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MyelinCard
            onOpenReceipt={onOpenReceipt}
            onOpenVisualProof={onOpenVisualProof}
          />
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
