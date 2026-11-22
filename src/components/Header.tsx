import { useState, useEffect } from 'react';
import { Terminal, Github, Search } from 'lucide-react';
import { PERSONAL_INFO } from '../data/systemsData';

interface HeaderProps {
  onOpenCommandPalette: () => void;
}

export function Header({ onOpenCommandPalette }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-zinc-800/80 shadow-lg shadow-black/40'
          : 'bg-[#09090b]/60 backdrop-blur-sm border-zinc-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Identity & Telemetry indicator */}
        <div className="flex items-center space-x-3">
          <a
            href="#"
            className="flex items-center space-x-2.5 text-zinc-100 hover:text-white transition-colors group"
          >
            <div className="w-7 h-7 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:border-zinc-700 group-hover:text-cyan-400 transition-colors">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-wider font-mono uppercase text-zinc-100">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-tight -mt-0.5">
                Systems &amp; AI-Infra
              </span>
            </div>
          </a>

          <div className="hidden sm:flex items-center space-x-1.5 pl-3 border-l border-zinc-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono text-zinc-400 tracking-wider">
              ONLINE
            </span>
          </div>
        </div>

        {/* Center: Fast Section Anchors */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-mono text-zinc-400">
          <a
            href="#flagships"
            className="hover:text-zinc-100 transition-colors hover:underline underline-offset-4 decoration-zinc-700"
          >
            01.FLAGSHIPS
          </a>
          <a
            href="#secondary-systems"
            className="hover:text-zinc-100 transition-colors hover:underline underline-offset-4 decoration-zinc-700"
          >
            02.SECONDARY
          </a>
          <a
            href="#benchmarks"
            className="hover:text-zinc-100 transition-colors hover:underline underline-offset-4 decoration-zinc-700"
          >
            03.BENCHMARKS
          </a>
          <a
            href="#telemetry"
            className="hover:text-zinc-100 transition-colors hover:underline underline-offset-4 decoration-zinc-700"
          >
            04.TELEMETRY
          </a>
        </nav>

        {/* Right: Cmd+K Trigger & GitHub Link */}
        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center space-x-2 px-2.5 py-1.5 rounded border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 transition-all text-xs font-mono cursor-pointer"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-zinc-400 bg-zinc-950 border border-zinc-800 rounded">
              ⌘K
            </kbd>
          </button>

          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-100 transition-colors flex items-center justify-center"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
