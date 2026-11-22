import { useState, useMemo } from 'react';
import { Table, Filter, ShieldCheck, Check } from 'lucide-react';
import { BENCHMARK_ARCHIVE } from '../data/systemsData';

export function BenchmarkArchive() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Latency', 'Throughput', 'Memory', 'Correctness'];

  const filteredEntries = useMemo(() => {
    return BENCHMARK_ARCHIVE.filter((entry) => {
      const matchesCategory =
        selectedCategory === 'All' || entry.category === selectedCategory;
      const matchesQuery =
        searchQuery === '' ||
        entry.system.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.metric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.hardwareBaseline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="benchmarks" className="py-16 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-2">
              <Table className="w-4 h-4" />
              <span>03 // EMPIRICAL BENCHMARK ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-sans">
              System Telemetry &amp; Latency Distributions
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-2 md:mt-0 max-w-md">
            Verifiable empirical metrics measured under deterministic hardware conditions. Tabular numbers formatted with sub-microsecond precision.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-3 rounded-lg border border-zinc-800 bg-zinc-900/40">
          <div className="flex items-center space-x-1 overflow-x-auto text-xs font-mono">
            <span className="text-zinc-400 mr-2 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded transition-colors cursor-pointer text-xs ${
                  selectedCategory === cat
                    ? 'bg-zinc-800 text-cyan-300 font-semibold border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search benchmarks..."
              className="w-full sm:w-56 px-3 py-1 text-xs font-mono rounded bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* High-Density Tabular Numbers Table */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden shadow-lg shadow-black/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/80 font-mono text-zinc-400 uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4 font-semibold">System</th>
                  <th className="py-3 px-4 font-semibold">Metric</th>
                  <th className="py-3 px-4 font-semibold">Empirical Value</th>
                  <th className="py-3 px-4 font-semibold">Hardware Baseline</th>
                  <th className="py-3 px-4 font-semibold">Validation Method</th>
                  <th className="py-3 px-4 font-semibold">Class</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 font-mono">
                {filteredEntries.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-zinc-800/40 transition-colors group"
                  >
                    <td className="py-3 px-4 font-semibold text-zinc-100 whitespace-nowrap">
                      {row.system}
                    </td>
                    <td className="py-3 px-4 text-zinc-300 whitespace-nowrap">
                      {row.metric}
                    </td>
                    <td className="py-3 px-4 font-bold text-cyan-300 tabular-nums whitespace-nowrap">
                      {row.empiricalValue}
                    </td>
                    <td className="py-3 px-4 text-zinc-400 whitespace-nowrap">
                      {row.hardwareBaseline}
                    </td>
                    <td className="py-3 px-4 text-zinc-400 whitespace-nowrap flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{row.validationMethod}</span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          row.category === 'Latency'
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                            : row.category === 'Throughput'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : row.category === 'Memory'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}
                      >
                        {row.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEntries.length === 0 && (
            <div className="py-12 text-center text-zinc-400 font-mono text-xs">
              No benchmark entries matching query &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>

        {/* Verification Guarantee Footer */}
        <div className="mt-4 p-3 rounded-lg border border-zinc-800/60 bg-zinc-950/50 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-zinc-400 gap-2">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Check className="w-3.5 h-3.5" />
            <span>100% Audit-Verified Ground Truth: Zero interpolation, zero synthetic projections.</span>
          </div>
          <span className="text-zinc-400">Environment: Windows 11 x86-64</span>
        </div>
      </div>
    </section>
  );
}
