import React, { useState } from 'react';
import { ScanRecord, RiskLevel } from '../types';
import { History, Search, ArrowRight, Smartphone, Filter, Trash2, RotateCcw } from 'lucide-react';

interface HistoryViewProps {
  records: ScanRecord[];
  onSelectRecord: (record: ScanRecord) => void;
  onSimulateOnKeypad: (text: string) => void;
  onClearHistory: () => void;
  onResetDefaultHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  records,
  onSelectRecord,
  onSimulateOnKeypad,
  onClearHistory,
  onResetDefaultHistory,
}) => {
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRecords = records.filter((r) => {
    if (filterRisk !== 'ALL' && r.risk !== filterRisk) {
      return false;
    }
    if (searchQuery.trim() && !r.message.toLowerCase().includes(searchQuery.toLowerCase()) && !r.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div id="view-history-container" className="space-y-6">
      {/* Header */}
      <div className="bg-[#121d36] rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Analysis History & Simulated Logs</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review evaluated simulated SMS queries, inspect detected heuristic traits, and test in dual modes.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onResetDefaultHistory}
            type="button"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition flex items-center space-x-1.5 focus:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <button
            onClick={onClearHistory}
            type="button"
            className="px-3 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 text-xs font-medium border border-rose-800 transition flex items-center space-x-1.5 focus:outline-none"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#121d36] rounded-xl border border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search queries or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#090f1e] border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-mono text-slate-400">Risk Filter:</span>
          {(['ALL', 'HIGH RISK', 'MEDIUM RISK', 'LOW RISK'] as const).map((risk) => (
            <button
              key={risk}
              onClick={() => setFilterRisk(risk)}
              type="button"
              className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                filterRisk === risk
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>

      {/* History Items List */}
      <div className="bg-[#121d36] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No matching simulated records found.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {filteredRecords.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 hover:bg-slate-800/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center space-x-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        item.risk === 'HIGH RISK'
                          ? 'bg-rose-950 text-rose-400 border-rose-800'
                          : item.risk === 'MEDIUM RISK'
                          ? 'bg-amber-950 text-amber-400 border-amber-800'
                          : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      }`}
                    >
                      {item.risk}
                    </span>
                    <span className="text-xs font-semibold text-white truncate">{item.category}</span>
                    <span className="text-[11px] font-mono text-slate-500">• {item.relativeTime}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic font-sans break-words">
                    “{item.message}”
                  </p>
                  <p className="text-[11px] font-mono text-slate-400">
                    {item.indicatorCount} Indicator{item.indicatorCount === 1 ? '' : 's'} Flagged
                  </p>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0 self-end md:self-center">
                  <button
                    onClick={() => onSimulateOnKeypad(item.message)}
                    type="button"
                    className="px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-700/60 text-cyan-300 text-xs font-semibold flex items-center space-x-1.5 transition"
                    title="Simulate on 2G Keypad Phone"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Test on Keypad</span>
                  </button>
                  <button
                    onClick={() => onSelectRecord(item)}
                    type="button"
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 transition"
                  >
                    <span>View in Web Analyzer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
