import React, { useState, useRef } from 'react';
import { ScenarioData, ScanRecord, ActiveView } from '../types';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Smartphone, 
  Search, 
  HelpCircle,
  FileText,
  Clock,
  ExternalLink,
  ShieldCheck,
  Check,
  Info
} from 'lucide-react';

interface DashboardViewProps {
  currentScenario: ScenarioData;
  onSelectScenario: (scenarioKey: string) => void;
  onAnalyzeCustomText: (text: string) => void;
  onSwitchToKeypadWithText: (text: string) => void;
  onSwitchView: (view: ActiveView) => void;
  historyRecords: ScanRecord[];
  totalAnalyzed: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentScenario,
  onSelectScenario,
  onAnalyzeCustomText,
  onSwitchToKeypadWithText,
  onSwitchView,
  historyRecords,
  totalAnalyzed,
}) => {
  const [inputText, setInputText] = useState<string>(currentScenario.text);
  const analyzerInputRef = useRef<HTMLTextAreaElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  // Sync text when a preset scenario is chosen
  React.useEffect(() => {
    setInputText(currentScenario.text);
  }, [currentScenario.text]);

  const handleAnalyzeClick = () => {
    onAnalyzeCustomText(inputText);
    if (resultCardRef.current) {
      resultCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClear = () => {
    setInputText('');
    if (analyzerInputRef.current) {
      analyzerInputRef.current.focus();
    }
  };

  const handleTransferToKeypad = () => {
    onSwitchToKeypadWithText(inputText.trim() || currentScenario.text);
  };

  const isDanger = currentScenario.risk === 'HIGH RISK';
  const isMedium = currentScenario.risk === 'MEDIUM RISK';
  const isLow = currentScenario.risk === 'LOW RISK';

  return (
    <div id="view-web-dashboard" className="space-y-8">
      {/* 1. Welcome Hero Banner */}
      <div 
        id="dashboard-hero-section"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#121d36] via-[#101b38] to-[#0d152a] p-6 md:p-8 border border-slate-800 shadow-xl"
      >
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-700/60 text-cyan-300 text-xs font-mono font-medium mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Frontend Simulation Sandbox • Heuristic Security Model</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Welcome to ScamShield
          </h2>

          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed">
            Understand suspicious messages before you trust them. Inspect incoming SMS copy for phishing vectors, deceptive domains, credential harvesting, and urgent panic language. Try the exact same indicator engine in rich <span className="text-cyan-300 font-semibold">Smartphone Web Mode</span> or accessible <span className="text-cyan-300 font-semibold">Keypad Feature Phone Mode</span>.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              id="hero-check-sms-btn"
              onClick={() => {
                const el = document.getElementById('dashboard-analyzer-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                if (analyzerInputRef.current) analyzerInputRef.current.focus();
              }}
              type="button"
              className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-cyan-500/20 flex items-center space-x-2 focus:outline-none"
            >
              <span>Check Suspicious SMS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-keypad-mode-btn"
              onClick={() => onSwitchView('keypad')}
              type="button"
              className="px-4 py-2.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm transition flex items-center space-x-2 focus:outline-none"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Keypad Phone Mode</span>
            </button>
          </div>
        </div>

        <div className="absolute -right-16 -top-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-32 bottom-0 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* DEMO STATISTICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="dashboard-stats-row">
        <div className="bg-[#121d36]/90 border border-slate-800 rounded-xl p-4 sm:p-5 relative shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Messages Analyzed</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">DEMO</span>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-white" id="stat-total-count">
              {totalAnalyzed}
            </span>
            <span className="text-xs text-slate-400">test queries</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Simulated inputs tested in this session</p>
        </div>

        <div className="bg-[#121d36]/90 border border-slate-800 rounded-xl p-4 sm:p-5 relative shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400">High-Risk Messages</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-900">DEMO</span>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-rose-400" id="stat-high-count">
              7
            </span>
            <span className="text-xs text-rose-400/80">flagged threats</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Phishing & banking impersonations detected</p>
        </div>

        <div className="bg-[#121d36]/90 border border-slate-800 rounded-xl p-4 sm:p-5 relative shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Safety Tips Studied</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-900">DEMO</span>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-emerald-400">8</span>
            <span className="text-xs text-emerald-400/80">habits studied</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Awareness guide checkpoints completed</p>
        </div>
      </div>

      {/* 2. LARGE SMS MESSAGE INPUT CARD & ANALYZER */}
      <div 
        id="dashboard-analyzer-section"
        className="bg-[#121d36] rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6"
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></span>
              <h3 className="text-xl font-bold text-white tracking-tight">Interactive SMS Threat Analyzer</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Demo analysis based on suspicious message indicators.
            </p>
          </div>
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-800">
              Rule-Based Indicator Heuristics
            </span>
          </div>
        </div>

        {/* Preset Test Example Buttons */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase tracking-wider text-[11px] font-semibold text-slate-300">Preset Test Scenarios:</span>
            <span className="text-[11px] text-slate-500">Click any scenario to populate instantly</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <button
              id="btn-scen-kyc"
              onClick={() => onSelectScenario('kyc')}
              type="button"
              className={`group text-left px-3.5 py-2.5 rounded-xl transition flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-rose-500 ${
                currentScenario.id === 'kyc'
                  ? 'bg-slate-800 border-2 border-rose-500 shadow-md'
                  : 'bg-slate-900/90 hover:bg-slate-800/90 border border-rose-900/50 hover:border-rose-500/70'
              }`}
            >
              <div>
                <span className="text-xs font-semibold text-rose-300 group-hover:text-rose-200 block">Bank KYC Phishing</span>
                <span className="text-[10px] text-slate-400 font-mono">Suspicious link & urgency</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-950 text-rose-400 border border-rose-800">HIGH</span>
            </button>

            <button
              id="btn-scen-electricity"
              onClick={() => onSelectScenario('electricity')}
              type="button"
              className={`group text-left px-3.5 py-2.5 rounded-xl transition flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-rose-500 ${
                currentScenario.id === 'electricity'
                  ? 'bg-slate-800 border-2 border-rose-500 shadow-md'
                  : 'bg-slate-900/90 hover:bg-slate-800/90 border border-rose-900/50 hover:border-rose-500/70'
              }`}
            >
              <div>
                <span className="text-xs font-semibold text-rose-300 group-hover:text-rose-200 block">Electricity Urgent Cut</span>
                <span className="text-[10px] text-slate-400 font-mono">Utility disconnect panic</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-950 text-rose-400 border border-rose-800">HIGH</span>
            </button>

            <button
              id="btn-scen-prize"
              onClick={() => onSelectScenario('prize')}
              type="button"
              className={`group text-left px-3.5 py-2.5 rounded-xl transition flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                currentScenario.id === 'prize'
                  ? 'bg-slate-800 border-2 border-amber-500 shadow-md'
                  : 'bg-slate-900/90 hover:bg-slate-800/90 border border-amber-900/50 hover:border-amber-500/70'
              }`}
            >
              <div>
                <span className="text-xs font-semibold text-amber-300 group-hover:text-amber-200 block">Prize / Lottery Hook</span>
                <span className="text-[10px] text-slate-400 font-mono">Advance fee solicitation</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800">MEDIUM</span>
            </button>

            <button
              id="btn-scen-doctor"
              onClick={() => onSelectScenario('doctor')}
              type="button"
              className={`group text-left px-3.5 py-2.5 rounded-xl transition flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                currentScenario.id === 'doctor'
                  ? 'bg-slate-800 border-2 border-emerald-500 shadow-md'
                  : 'bg-slate-900/90 hover:bg-slate-800/90 border border-emerald-900/50 hover:border-emerald-500/70'
              }`}
            >
              <div>
                <span className="text-xs font-semibold text-emerald-300 group-hover:text-emerald-200 block">Doctor Appointment</span>
                <span className="text-[10px] text-slate-400 font-mono">Legitimate confirmation</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">LOW</span>
            </button>
          </div>
        </div>

        {/* Textarea & Controls */}
        <div className="space-y-3">
          <div className="relative">
            <label className="sr-only" htmlFor="dashboard-sms-input">Suspicious SMS Text</label>
            <textarea
              ref={analyzerInputRef}
              id="dashboard-sms-input"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type suspicious SMS here (e.g. URGENT! Your bank account will be blocked. Verify KYC now at example.com)..."
              className="w-full bg-[#090f1e] border-2 border-slate-700/80 rounded-xl p-4 text-sm md:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 font-sans resize-none transition shadow-inner"
            />
            {inputText.length > 0 && (
              <button
                id="btn-quick-clear"
                onClick={handleClear}
                type="button"
                className="absolute right-3 top-3 text-xs font-mono text-slate-400 hover:text-slate-100 bg-slate-800/90 hover:bg-slate-700 px-2 py-1 rounded border border-slate-700 transition"
              >
                Clear
              </button>
            )}
          </div>

          {/* Meta info row */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 px-1 gap-2">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-slate-300" id="char-counter-dash">
                {inputText.length} character{inputText.length === 1 ? '' : 's'}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Evaluation: Heuristic indicators check</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Zero telecommunication intercept • Client-side demo</span>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-2">
              <button
                id="btn-reset-text"
                onClick={handleClear}
                type="button"
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition focus:outline-none"
              >
                Reset Text
              </button>
              <button
                id="btn-analyze-another"
                onClick={() => {
                  setInputText('');
                  if (analyzerInputRef.current) analyzerInputRef.current.focus();
                }}
                type="button"
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition focus:outline-none"
              >
                Analyze Another SMS
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Keypad Bridge Button */}
              <button
                id="btn-simulate-keypad-bridge"
                onClick={handleTransferToKeypad}
                type="button"
                title="Simulate this message on a basic keypad phone display"
                className="px-4 py-2.5 rounded-lg bg-indigo-950 hover:bg-indigo-900/80 text-cyan-300 text-xs font-semibold border border-indigo-700/70 transition flex items-center space-x-2 shadow-sm focus:outline-none"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>Simulate Warning on Keypad Phone →</span>
              </button>

              {/* Primary Glowing Analyze Button */}
              <button
                id="btn-analyze-sms"
                onClick={handleAnalyzeClick}
                type="button"
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-cyan-500/30 flex items-center space-x-2 focus:outline-none active:scale-98"
              >
                <Search className="w-4 h-4 text-slate-950" />
                <span>Analyze SMS</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. POLISHED ANALYSIS RESULT DISPLAY */}
        <div ref={resultCardRef} className="mt-8 border-t border-slate-800 pt-7" id="dashboard-result-card">
          <div
            id="result-outer-container"
            className={`rounded-2xl p-6 md:p-7 transition-all duration-300 border ${
              isDanger
                ? 'bg-gradient-to-br from-rose-950/40 via-[#18233e] to-[#121d36] border-rose-800/60 glow-danger'
                : isMedium
                ? 'bg-gradient-to-br from-amber-950/40 via-[#18233e] to-[#121d36] border-amber-800/60 glow-amber'
                : 'bg-gradient-to-br from-emerald-950/40 via-[#18233e] to-[#121d36] border-emerald-800/60 glow-safe'
            }`}
          >
            {/* Top Banner Verdict Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
              <div className="flex items-center space-x-3.5">
                <div
                  id="result-icon-box"
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                    isDanger
                      ? 'bg-rose-600/20 border-rose-500/50 text-rose-400'
                      : isMedium
                      ? 'bg-amber-600/20 border-amber-500/50 text-amber-400'
                      : 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400'
                  }`}
                >
                  {isDanger ? (
                    <AlertTriangle className="w-7 h-7" />
                  ) : isMedium ? (
                    <Zap className="w-7 h-7" />
                  ) : (
                    <CheckCircle2 className="w-7 h-7" />
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">RISK LEVEL:</span>
                    <span
                      id="result-risk-badge"
                      className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold shadow-sm flex items-center space-x-1.5 ${
                        isDanger
                          ? 'bg-rose-600 text-white'
                          : isMedium
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      <span>{isDanger ? '⚠' : isMedium ? '⚠' : '✓'}</span>
                      <span id="result-risk-badge-text">{currentScenario.risk}</span>
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-white mt-1 flex items-center space-x-2">
                    <span>Category:</span>
                    <span className="text-cyan-300" id="result-category-text">{currentScenario.category}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="text-[11px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800" id="result-verdict-tag">
                  {isDanger
                    ? 'Heuristic Verdict: Flagged by Suspicious Indicators'
                    : isMedium
                    ? 'Heuristic Verdict: Caution Advised - Potential Scam Vector'
                    : 'Heuristic Verdict: Baseline Checks Passed'}
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-1">Confidence: Heuristic Match</span>
              </div>
            </div>

            {/* Visual Tag-Style Indicator Chips */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold block">
                Suspicious Indicator Chips Detected
              </span>
              <div className="flex flex-wrap gap-2 pt-1" id="indicator-chips-container">
                {currentScenario.chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${
                      chip.type === 'danger'
                        ? 'bg-rose-950/70 text-rose-300 border-rose-800/80'
                        : chip.type === 'warning'
                        ? 'bg-amber-950/70 text-amber-300 border-amber-800/80'
                        : chip.type === 'safe'
                        ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800/80'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    {chip.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Split Layout: Detailed Heuristic Breakdown & Actionable Safety Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 pt-5 border-t border-slate-800/80">
              {/* Left: Heuristic breakdown */}
              <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 sm:p-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Detailed Heuristic Breakdown</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300" id="heuristic-breakdown-list">
                  {currentScenario.heuristics.map((h, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className={`font-bold mt-0.5 ${isLow ? 'text-emerald-400' : isMedium ? 'text-amber-400' : 'text-rose-400'}`}>
                        {isLow ? '✓' : isMedium ? '⚠' : '✕'}
                      </span>
                      <span>
                        <strong>{h.label}:</strong> {h.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Actionable Safety Recommendations */}
              <div className="bg-slate-950/60 border border-emerald-900/40 rounded-xl p-4 sm:p-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-3 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Actionable Safety Recommendations</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-200" id="safety-recommendations-list">
                  {currentScenario.recommendations.map((r, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>
                        <strong>{r.label}:</strong> {r.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Prominent Disclaimer Box */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-2.5">
                <Info className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] sm:text-xs leading-relaxed text-slate-300">
                  <strong className="text-white">Prototype Notice:</strong> Demo analysis based on suspicious message indicators for hackathon presentation purposes. Simulated frontend only. Does not guarantee 100% detection, does not intercept live telecommunication traffic, and does not replace official banking verification.
                </p>
              </div>
              <button
                id="btn-keypad-notice-bridge"
                onClick={handleTransferToKeypad}
                type="button"
                className="flex-shrink-0 px-3.5 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/80 text-cyan-300 text-xs font-semibold flex items-center space-x-1.5 transition whitespace-nowrap focus:outline-none"
              >
                <span>Simulate Warning on Keypad Phone →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. RECENT SIMULATED SCANS TABLE */}
      <div className="bg-[#121d36] rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4" id="dashboard-history-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <h3 className="text-base font-bold text-white">Recent Simulated Scans</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Log of evaluated simulated SMS tests during this demonstration session.</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800">
              Local simulated records only. No user data stored or transmitted.
            </span>
          </div>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-3.5">Timestamp</th>
                <th className="py-3 px-3.5">Message Snippet</th>
                <th className="py-3 px-3.5">Risk Badge</th>
                <th className="py-3 px-3.5">Detected Indicators</th>
                <th className="py-3 px-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {historyRecords.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-3.5 font-mono text-slate-400 whitespace-nowrap">
                    {item.relativeTime}
                  </td>
                  <td className="py-3 px-3.5 max-w-xs truncate font-sans text-white">
                    “{item.message}”
                  </td>
                  <td className="py-3 px-3.5">
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
                  </td>
                  <td className="py-3 px-3.5 font-mono text-slate-400">
                    {item.indicatorCount} Indicator{item.indicatorCount === 1 ? '' : 's'} Flagged
                  </td>
                  <td className="py-3 px-3.5 text-right">
                    <button
                      onClick={() => {
                        if (item.scenarioKey) {
                          onSelectScenario(item.scenarioKey);
                        } else {
                          onAnalyzeCustomText(item.message);
                        }
                        const el = document.getElementById('dashboard-analyzer-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      type="button"
                      className="text-cyan-400 hover:text-cyan-300 font-mono text-xs underline focus:outline-none"
                    >
                      View Result
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK ACCESS TILES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          id="tile-analyzer"
          onClick={() => {
            onSwitchView('analyzer');
            const el = document.getElementById('dashboard-analyzer-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          type="button"
          className="text-left w-full cursor-pointer bg-[#121d36]/80 hover:bg-[#121d36] border border-slate-800 hover:border-cyan-500/50 p-4 rounded-xl transition group shadow-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition">
            <Search className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-white">Full SMS Analyzer</h4>
          <p className="text-xs text-slate-400 mt-1">Deep inspection tool with heuristic breakdown.</p>
        </button>

        <button
          id="tile-history"
          onClick={() => onSwitchView('history')}
          type="button"
          className="text-left w-full cursor-pointer bg-[#121d36]/80 hover:bg-[#121d36] border border-slate-800 hover:border-cyan-500/50 p-4 rounded-xl transition group shadow-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-105 transition">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-white">View History</h4>
          <p className="text-xs text-slate-400 mt-1">Review mock threat records and timestamps from this session.</p>
        </button>

        <button
          id="tile-awareness"
          onClick={() => onSwitchView('awareness')}
          type="button"
          className="text-left w-full cursor-pointer bg-[#121d36]/80 hover:bg-[#121d36] border border-slate-800 hover:border-cyan-500/50 p-4 rounded-xl transition group shadow-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-white">Read Safety Tips</h4>
          <p className="text-xs text-slate-400 mt-1">Checklist and behavioral defense against social engineering.</p>
        </button>

        <button
          id="tile-keypad"
          onClick={() => onSwitchView('keypad')}
          type="button"
          className="text-left w-full cursor-pointer bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-cyan-500/40 p-4 rounded-xl transition hover:border-cyan-400 group shadow-md focus:outline-none focus:ring-1 focus:ring-cyan-400"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 mb-3 group-hover:scale-105 transition">
            <Smartphone className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-cyan-300">Keypad Phone Mode</h4>
          <p className="text-xs text-slate-400 mt-1">Simulate basic-phone accessibility warning workflow.</p>
        </button>
      </div>

      {/* 5. KEYPAD PHONE ACCESSIBILITY CONCEPT CARD */}
      <div className="bg-gradient-to-r from-slate-900 via-[#121d36] to-slate-900 rounded-2xl border border-cyan-800/50 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-700 rounded font-semibold">
              SAME PRODUCT • TWO MODES
            </span>
            <h3 className="text-base font-bold text-white">Keypad Phone Accessibility Concept</h3>
          </div>
          <p className="text-xs md:text-sm text-slate-300">
            Explore a simulated basic-phone workflow that presents a warning message in a simple, readable format for non-smartphone users. Same threat detection rules, adapted for low-resolution 2G displays.
          </p>
        </div>
        <button
          id="btn-open-keypad-mode-banner"
          onClick={() => onSwitchView('keypad')}
          type="button"
          className="px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition flex-shrink-0 flex items-center space-x-2 shadow-lg shadow-cyan-600/20 focus:outline-none"
        >
          <span>Open Keypad Phone Mode</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* AWARENESS CENTER SECTION IN DASHBOARD */}
      <div className="bg-[#121d36] rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6 shadow-xl" id="dashboard-awareness-section">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold">
            ✓
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Cybersecurity Awareness & Defense Principles</h3>
            <p className="text-xs text-slate-400">Practical rules to protect yourself against fraudulent text messages.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1.5">
            <span className="text-xs font-mono font-bold text-rose-400 block">01. Never Share OTP or PINs</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              No bank or official service will ever request your One-Time Password or PIN over text message.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1.5">
            <span className="text-xs font-mono font-bold text-amber-400 block">02. Inspect Hyperlinks Carefully</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Avoid clicking shortened URLs (bit.ly, tinyurl) or misspelled bank web addresses received via SMS.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1.5">
            <span className="text-xs font-mono font-bold text-emerald-400 block">03. Verify in Official Apps Only</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Always check alerts by opening your official bank application independently rather than tapping SMS links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
