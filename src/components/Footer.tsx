import { useState } from 'react';
import { Terminal, Github, Mail, Copy, Check, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/systemsData';
import { toast } from 'sonner';

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    toast.success('Email copied to clipboard: ' + PERSONAL_INFO.email);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/80 py-12 text-zinc-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-zinc-800/80">
          {/* Identity & Mission */}
          <div>
            <div className="flex items-center space-x-2 text-zinc-200 mb-2 font-semibold">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-sm text-[11px]">
              {PERSONAL_INFO.role} based in Mumbai. Specializing in low-level high-throughput inference engines, C++23 concurrency, and DirectX 12 compute pipelines.
            </p>
            <div className="mt-3 text-[11px] text-zinc-400">
              Affiliation: {PERSONAL_INFO.institution}, Mumbai
            </div>
          </div>

          {/* System Spec & Architecture */}
          <div>
            <span className="text-[11px] font-semibold text-zinc-200 uppercase tracking-wider block mb-2">
              Architecture &amp; Toolchain
            </span>
            <ul className="space-y-1.5 text-[11px] text-zinc-400">
              <li>• Direct3D 12 Compute &amp; HLSL Shader Model 6.2</li>
              <li>• C++23 (MSVC 19.52 /std:c++23 /O2)</li>
              <li>• Lock-Free Concurrency &amp; Memory-Mapped IO</li>
              <li>• Static Single-Page Bundle (Vite 6 + React 19)</li>
              <li>• Zero runtime tracking scripts // 100% WCAG AA</li>
            </ul>
          </div>

          {/* Contact & Verified Channels */}
          <div>
            <span className="text-[11px] font-semibold text-zinc-200 uppercase tracking-wider block mb-2">
              Direct Contact
            </span>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center space-x-2 overflow-hidden">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate text-[11px]">{PERSONAL_INFO.email}</span>
                </div>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                )}
              </button>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Github className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="text-[11px]">github.com/{PERSONAL_INFO.handle}</span>
                </div>
                <span className="text-[10px] text-zinc-400">View Repos</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Verified Signature */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Eureka! 2026 Winner (E-Cell, IIT Bombay) // Systems Infrastructure</span>
          </div>

          <div className="text-zinc-400">
            © {new Date().getFullYear()} Krishna Singh. All telemetry empirical &amp; audit-verified.
          </div>
        </div>
      </div>
    </footer>
  );
}
