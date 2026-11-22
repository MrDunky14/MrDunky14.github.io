import { Command } from 'cmdk';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Layers,
  Code2,
  Table,
  Cpu,
  Mail,
  Github,
  Search,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/systemsData';
import { toast } from 'sonner';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReceipt: (receiptId: string) => void;
  onOpenVisualProof: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenReceipt,
  onOpenVisualProof,
}: CommandPaletteProps) {
  const runAction = (action: () => void) => {
    action();
    onClose();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    toast.success('Email copied: ' + PERSONAL_INFO.email);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Backdrop Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in-0 duration-150" />

        {/* Modal Dialog Content */}
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-800 bg-[#0c0c0e] shadow-2xl overflow-hidden focus:outline-none ring-1 ring-white/10 animate-in zoom-in-95 fade-in-0 duration-150">
          <Dialog.Title className="sr-only">Global Command Palette</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search systems, benchmarks, code receipts, and actions
          </Dialog.Description>

          <Command className="w-full">
            {/* Search Input Bar */}
            <div className="flex items-center px-3.5 py-3 border-b border-zinc-800/80 bg-zinc-950/60">
              <Search className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
              <Command.Input
                placeholder="Search systems, benchmarks, receipts, or actions..."
                className="w-full bg-transparent text-sm font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none"
                autoFocus
              />
              <kbd className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 ml-2 select-none shrink-0">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <Command.List className="max-h-80 overflow-y-auto p-2 text-xs font-mono">
              <Command.Empty className="py-8 text-center text-zinc-500 text-xs font-mono">
                No matching systems or commands found.
              </Command.Empty>

              {/* Flagship Systems */}
              <Command.Group
                heading="FLAGSHIP ARCHITECTURES"
                className="text-zinc-500 px-2 py-1.5 uppercase text-[10px] tracking-wider font-semibold font-mono"
              >
                <Command.Item
                  onSelect={() => runAction(() => scrollTo('flagships'))}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>MYELIN-SR (DirectX 12 Super-Resolution)</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">8.60 ms @ 1080p</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => scrollTo('flagships'))}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Engram-Core (C++23 Graph Engine)</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">22.9M triples/s</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => scrollTo('flagships'))}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    <span>SREBench (OpenEnv Microservice DAG)</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">22/22 pytest pass</span>
                </Command.Item>
              </Command.Group>

              {/* Code Receipts */}
              <Command.Group
                heading="CODE RECEIPTS & PROOFS"
                className="text-zinc-500 px-2 py-1.5 uppercase text-[10px] tracking-wider font-semibold font-mono mt-2"
              >
                <Command.Item
                  onSelect={() => runAction(() => onOpenReceipt('myelin-hlsl'))}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>myelin_v3_ocblock.hlsl</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">HLSL SM 6.2</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => onOpenReceipt('engram-seqlock'))}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>cluster_graph.h Seqlock Reader</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">C++23 Concurrency</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => onOpenReceipt('srebench-pytest'))}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Code2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>tests/test_srebench.py</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">22/22 Pytest</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => onOpenVisualProof())}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Set14 Butterfly Super-Resolution Visual Proof</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">1-ULP Parity</span>
                </Command.Item>
              </Command.Group>

              {/* Quick Anchors */}
              <Command.Group
                heading="NAVIGATION & TELEMETRY"
                className="text-zinc-500 px-2 py-1.5 uppercase text-[10px] tracking-wider font-semibold font-mono mt-2"
              >
                <Command.Item
                  onSelect={() => runAction(() => scrollTo('benchmarks'))}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Table className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Consolidated Benchmark Archive</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">#benchmarks</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => scrollTo('secondary-systems'))}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Secondary Systems (FP-SAN, Aegis-Voice, BDSC)</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">#secondary-systems</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => scrollTo('telemetry'))}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Hardware Host Telemetry Specs</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">#telemetry</span>
                </Command.Item>
              </Command.Group>

              {/* Actions */}
              <Command.Group
                heading="CONNECT & REPOSITORIES"
                className="text-zinc-500 px-2 py-1.5 uppercase text-[10px] tracking-wider font-semibold font-mono mt-2"
              >
                <Command.Item
                  onSelect={() => runAction(() => copyEmail())}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy Contact Email ({PERSONAL_INFO.email})</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">Clipboard</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => window.open(PERSONAL_INFO.githubUrl, '_blank'))}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800/80 hover:text-white aria-selected:bg-zinc-800/80 aria-selected:text-white cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Github className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Open GitHub Profile (MrDunky14)</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
