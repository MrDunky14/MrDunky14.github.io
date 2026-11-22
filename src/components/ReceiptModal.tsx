import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Copy, Check, ExternalLink, Terminal, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { CODE_RECEIPTS } from '../data/codeSnippets';
import { toast } from 'sonner';

interface ReceiptModalProps {
  receiptId: string | null;
  isOpen: boolean;
  onClose: () => void;
  showVisualProof?: boolean;
}

export function ReceiptModal({
  receiptId,
  isOpen,
  onClose,
  showVisualProof = false,
}: ReceiptModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const activeReceipt =
    CODE_RECEIPTS.find((r) => r.id === receiptId) || CODE_RECEIPTS[0]!;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeReceipt.code);
    setCopiedCode(true);
    toast.success('Source code snippet copied to clipboard');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(activeReceipt.reproductionCommand);
    setCopiedCmd(true);
    toast.success('Reproduction command copied: ' + activeReceipt.reproductionCommand);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-800 bg-[#0c0c0e] p-6 shadow-2xl focus:outline-none max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
          aria-describedby="receipt-description"
        >
          {showVisualProof ? (
            /* Visual Quality Proof Modal View */
            <div className="flex flex-col h-full overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-emerald-400" />
                  <div>
                    <Dialog.Title className="text-lg font-bold font-sans text-zinc-100">
                      MYELIN-SR: Set14 Butterfly Visual Proof
                    </Dialog.Title>
                    <p id="receipt-description" className="text-xs font-mono text-zinc-400">
                      Bicubic vs PyTorch FP16 Reference vs DirectX 12 MYELIN-SR HLSL Output
                    </p>
                  </div>
                </div>
                <Dialog.Close
                  className="rounded p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>

              <div className="mt-4 flex-1 overflow-y-auto">
                <div className="rounded-lg border border-zinc-800 bg-black/60 p-2 flex items-center justify-center">
                  <img
                    src="/assets/visual_comparison_butterfly.png"
                    alt="MYELIN-SR Set14 Butterfly Super-Resolution Quality Comparison"
                    className="max-h-[60vh] w-auto object-contain rounded"
                  />
                </div>
                <div className="mt-4 p-3 rounded-lg border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-300 space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Bitwise Precision &amp; PSNR Integrity Validated</span>
                  </div>
                  <p className="text-zinc-400">
                    The Set14 Butterfly comparison demonstrates crisp high-frequency wing ridge reconstruction without haloing, ringing artifacts, or edge distortion. Outputs match the PyTorch reference tensor within 1-ULP numerical precision.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Real Source Code Receipt View */
            <div className="flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {activeReceipt.system}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {activeReceipt.filePath}
                    </span>
                  </div>
                  <Dialog.Title className="text-lg font-bold font-sans text-zinc-100">
                    {activeReceipt.title}
                  </Dialog.Title>
                  <p id="receipt-description" className="text-xs text-zinc-400 mt-1">
                    {activeReceipt.description}
                  </p>
                </div>
                <Dialog.Close
                  className="rounded p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>

              {/* Reproduction Command Strip */}
              <div className="mt-4 p-2.5 rounded-lg border border-zinc-800 bg-zinc-950 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2 overflow-x-auto mr-2">
                  <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-zinc-400 shrink-0">$</span>
                  <span className="text-zinc-200 select-all whitespace-nowrap">
                    {activeReceipt.reproductionCommand}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCommand}
                  className="shrink-0 p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                  title="Copy command"
                  aria-label="Copy compilation command"
                >
                  {copiedCmd ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Source Code Viewer */}
              <div className="mt-4 flex-1 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300 leading-relaxed">
                <pre className="whitespace-pre overflow-x-auto">
                  <code>{activeReceipt.code}</code>
                </pre>
              </div>

              {/* Footer Actions */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                <a
                  href={activeReceipt.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <span>View in GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied Source</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy Source Snippet</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
