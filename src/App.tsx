import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { KeypadPhoneView } from './components/KeypadPhoneView';
import { HistoryView } from './components/HistoryView';
import { AwarenessView } from './components/AwarenessView';
import { PRESET_SCENARIOS, INITIAL_HISTORY_RECORDS, evaluateCustomMessage } from './data/scenarios';
import { ActiveView, ScenarioData, ScanRecord } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [currentScenario, setCurrentScenario] = useState<ScenarioData>(PRESET_SCENARIOS.kyc);
  const [historyRecords, setHistoryRecords] = useState<ScanRecord[]>(INITIAL_HISTORY_RECORDS);
  const [totalAnalyzed, setTotalAnalyzed] = useState<number>(17);

  // Scenario selection handler
  const handleSelectScenario = (scenarioKey: string) => {
    const scenario = PRESET_SCENARIOS[scenarioKey];
    if (!scenario) return;

    setCurrentScenario(scenario);
    setTotalAnalyzed((prev) => prev + 1);

    // Add to history top
    const newRecord: ScanRecord = {
      id: `rec-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      relativeTime: 'Just Now',
      message: scenario.text,
      risk: scenario.risk,
      category: scenario.category,
      indicatorCount: scenario.chips.filter((c) => c.type === 'danger' || c.type === 'warning').length,
      scenarioKey: scenario.id,
    };
    setHistoryRecords((prev) => [newRecord, ...prev]);
  };

  // Custom text analysis handler
  const handleAnalyzeCustomText = (text: string) => {
    const evaluated = evaluateCustomMessage(text || PRESET_SCENARIOS.kyc.text);
    setCurrentScenario(evaluated);
    setTotalAnalyzed((prev) => prev + 1);

    const newRecord: ScanRecord = {
      id: `rec-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      relativeTime: 'Just Now',
      message: evaluated.text,
      risk: evaluated.risk,
      category: evaluated.category,
      indicatorCount: evaluated.chips.filter((c) => c.type === 'danger' || c.type === 'warning').length,
      scenarioKey: evaluated.id in PRESET_SCENARIOS ? evaluated.id : undefined,
    };
    setHistoryRecords((prev) => [newRecord, ...prev]);
  };

  // Switch to Keypad Phone Simulator with specific text
  const handleSwitchToKeypadWithText = (text: string) => {
    if (text.trim() && text.trim() !== currentScenario.text) {
      const evaluated = evaluateCustomMessage(text.trim());
      setCurrentScenario(evaluated);
    }
    setActiveView('keypad');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Top header dual-mode switcher
  const handleSwitchMode = (mode: 'web' | 'keypad') => {
    if (mode === 'keypad') {
      setActiveView('keypad');
    } else {
      setActiveView('dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation from Sidebar
  const handleSelectView = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#080d1a] text-slate-200 min-h-screen font-sans antialiased retro-grid flex flex-col md:flex-row selection:bg-cyan-500 selection:text-white">
      {/* Left Persistent Navigation Sidebar */}
      <Sidebar activeView={activeView} onSelectView={handleSelectView} />

      {/* Main Viewport Container */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Top bar with Dual Mode Switcher */}
        <TopHeader activeView={activeView} onSwitchMode={handleSwitchMode} />

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8 flex-1">
          {activeView === 'keypad' ? (
            <KeypadPhoneView
              currentScenario={currentScenario}
              onReturnToAnalyzer={() => {
                setActiveView('dashboard');
                setTimeout(() => {
                  const el = document.getElementById('dashboard-analyzer-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
          ) : activeView === 'history' ? (
            <HistoryView
              records={historyRecords}
              onSelectRecord={(rec) => {
                if (rec.scenarioKey && PRESET_SCENARIOS[rec.scenarioKey]) {
                  setCurrentScenario(PRESET_SCENARIOS[rec.scenarioKey]);
                } else {
                  setCurrentScenario(evaluateCustomMessage(rec.message));
                }
                setActiveView('dashboard');
                setTimeout(() => {
                  const el = document.getElementById('dashboard-analyzer-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              onSimulateOnKeypad={(msg) => handleSwitchToKeypadWithText(msg)}
              onClearHistory={() => setHistoryRecords([])}
              onResetDefaultHistory={() => setHistoryRecords(INITIAL_HISTORY_RECORDS)}
            />
          ) : activeView === 'awareness' ? (
            <AwarenessView />
          ) : (
            <DashboardView
              currentScenario={currentScenario}
              onSelectScenario={handleSelectScenario}
              onAnalyzeCustomText={handleAnalyzeCustomText}
              onSwitchToKeypadWithText={handleSwitchToKeypadWithText}
              onSwitchView={handleSelectView}
              historyRecords={historyRecords}
              totalAnalyzed={totalAnalyzed}
            />
          )}
        </div>

        {/* Site Footer */}
        <footer 
          id="scamshield-footer"
          className="mt-auto border-t border-slate-800/80 bg-[#090f20] px-6 py-4 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <div className="flex items-center space-x-2">
            <span className="font-mono text-white font-semibold">ScamShield</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Cybersecurity Prototype for College Hackathon Presentation</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-500 font-mono">
            <span>SIMULATED FRONTEND ONLY</span>
            <span>NO TELECOM CONNECTIONS</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
