import { Cpu, Shield, Radio, CheckCircle } from 'lucide-react';
import { SUPPORTING_PROJECTS } from '../data/systemsData';

export function SupportingGrid() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'fp-san':
        return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'aegis-voice':
        return <Radio className="w-4 h-4 text-cyan-400" />;
      case 'bdsc':
        return <Shield className="w-4 h-4 text-emerald-400" />;
      default:
        return <Cpu className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section id="secondary-systems" className="py-16 border-b border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>02 // SECONDARY SYSTEMS MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-sans">
              Specialized Infrastructure &amp; Hardware Engines
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-2 md:mt-0 max-w-md">
            Neuromorphic edge architectures, sovereign privacy-guaranteed telephony triage, and zero-trust hardware lock gateways.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUPPORTING_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between hover:border-zinc-700/80 transition-all shadow-sm"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
                  <div className="flex items-center space-x-2">
                    {getIcon(project.id)}
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-zinc-100 font-sans">
                  {project.name}
                </h3>

                {/* Problem & Solution block */}
                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      Target Constraint
                    </span>
                    <p className="text-zinc-300 mt-0.5 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      Architectural Solution
                    </span>
                    <p className="text-zinc-200 mt-0.5 leading-relaxed font-medium">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-5 p-3 rounded-lg border border-zinc-800/80 bg-zinc-950/70">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Verified Empirical Attributes
                  </span>
                  <div className="space-y-1.5">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-[11px] font-mono text-zinc-300">
                        <CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-800/60 border border-zinc-700/60 text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
