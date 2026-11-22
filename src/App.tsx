import { useState, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FlagshipSection } from './components/FlagshipSection';
import { SupportingGrid } from './components/SupportingGrid';
import { BenchmarkArchive } from './components/BenchmarkArchive';
import { Footer } from './components/Footer';
import { Toaster } from 'sonner';

const ReceiptModal = lazy(() =>
  import('./components/ReceiptModal').then((m) => ({ default: m.ReceiptModal }))
);
const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette }))
);

export function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeReceiptId, setActiveReceiptId] = useState<string | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isVisualProofMode, setIsVisualProofMode] = useState(false);

  const handleOpenReceipt = (receiptId: string) => {
    setActiveReceiptId(receiptId);
    setIsVisualProofMode(false);
    setIsReceiptModalOpen(true);
  };

  const handleOpenVisualProof = () => {
    setIsVisualProofMode(true);
    setIsReceiptModalOpen(true);
  };

  const handleCloseReceiptModal = () => {
    setIsReceiptModalOpen(false);
    setIsVisualProofMode(false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
      {/* Toast notifications */}
      <Toaster theme="dark" position="bottom-right" richColors />

      {/* Global Restrained Header */}
      <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Structural Flow */}
      <main className="flex-1">
        <Hero />
        <FlagshipSection
          onOpenReceipt={handleOpenReceipt}
          onOpenVisualProof={handleOpenVisualProof}
        />
        <SupportingGrid />
        <BenchmarkArchive />
      </main>

      {/* Accessible Modals loaded lazily */}
      <Suspense fallback={null}>
        {isReceiptModalOpen && (
          <ReceiptModal
            isOpen={isReceiptModalOpen}
            onClose={handleCloseReceiptModal}
            receiptId={activeReceiptId}
            showVisualProof={isVisualProofMode}
          />
        )}

        {isCommandPaletteOpen && (
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onOpenReceipt={handleOpenReceipt}
            onOpenVisualProof={handleOpenVisualProof}
          />
        )}
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
