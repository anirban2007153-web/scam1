import React from 'react';
import { ActiveView } from '../types';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  MessageSquareCode, 
  Smartphone, 
  History, 
  BookOpenCheck 
} from 'lucide-react';

interface SidebarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onSelectView }) => {
  return (
    <aside 
      id="scamshield-sidebar"
      className="w-full md:w-64 bg-[#0b1329]/95 border-b md:border-b-0 md:border-r border-slate-800 flex-shrink-0 flex flex-col justify-between sticky top-0 z-50 backdrop-blur-md"
    >
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <button 
            id="brand-logo-btn"
            className="flex items-center space-x-3 text-left group focus:outline-none" 
            onClick={() => onSelectView('dashboard')} 
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30 group-hover:scale-105 transition">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight font-mono-tech text-white">ScamShield</span>
              </div>
              <p className="text-[11px] text-cyan-400/90 font-medium">Cybersecurity Lab Demo</p>
            </div>
          </button>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-950 text-cyan-300 border border-cyan-800">
            PROTOTYPE DEMO
          </span>
        </div>

        {/* Tagline Mini Card */}
        <div className="px-5 py-3 bg-slate-900/40 border-b border-slate-800/50 hidden md:block">
          <p className="text-xs text-slate-400 italic">
            “Understand suspicious messages before you trust them.”
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1.5 overflow-x-auto flex md:flex-col">
          <div className="hidden md:block px-2 pt-1 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Web Mode Views
          </div>

          <button 
            id="nav-dashboard" 
            className={`nav-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all focus:outline-none ${
              activeView === 'dashboard'
                ? 'text-white bg-cyan-500/10 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
            onClick={() => onSelectView('dashboard')} 
            type="button"
          >
            <div className="flex items-center space-x-3">
              <LayoutDashboard className={`w-5 h-5 ${activeView === 'dashboard' ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>Dashboard</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">Web</span>
          </button>

          <button 
            id="nav-analyzer" 
            className={`nav-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all focus:outline-none ${
              activeView === 'analyzer'
                ? 'text-white bg-cyan-500/10 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
            onClick={() => onSelectView('analyzer')} 
            type="button"
          >
            <div className="flex items-center space-x-3">
              <MessageSquareCode className={`w-5 h-5 ${activeView === 'analyzer' ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>SMS Analyzer</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Tool</span>
          </button>

          <div className="hidden md:block pt-3 pb-1 px-2 text-[10px] font-mono uppercase tracking-wider text-cyan-400/80 font-semibold border-t border-slate-800/60 mt-2">
            Feature Phone Simulation
          </div>

          <button 
            id="nav-keypad" 
            className={`nav-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all border focus:outline-none ${
              activeView === 'keypad'
                ? 'text-white bg-cyan-500/20 border-cyan-500/50 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70 border-slate-700/50 bg-gradient-to-r from-slate-900 to-indigo-950/40'
            }`}
            onClick={() => onSelectView('keypad')} 
            type="button"
          >
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-cyan-400" />
              <span className="font-semibold text-cyan-300">Keypad Phone Mode</span>
            </div>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/40 font-mono">SIMULATION</span>
          </button>

          <div className="hidden md:block pt-3 pb-1 px-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold border-t border-slate-800/60 mt-2">
            Learning & History
          </div>

          <button 
            id="nav-history" 
            className={`nav-btn w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all focus:outline-none ${
              activeView === 'history'
                ? 'text-white bg-cyan-500/10 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
            onClick={() => onSelectView('history')} 
            type="button"
          >
            <History className={`w-5 h-5 ${activeView === 'history' ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>Analysis History</span>
          </button>

          <button 
            id="nav-awareness" 
            className={`nav-btn w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all focus:outline-none ${
              activeView === 'awareness'
                ? 'text-white bg-cyan-500/10 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
            onClick={() => onSelectView('awareness')} 
            type="button"
          >
            <BookOpenCheck className={`w-5 h-5 ${activeView === 'awareness' ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>Awareness Center</span>
          </button>
        </nav>
      </div>

      {/* Bottom Safety & Disclaimer footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/50 hidden md:block">
        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-[11px] text-slate-300">Offline Simulation Sandbox</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-tight">
          Demo analysis based on suspicious message indicators. Frontend simulation sandbox - no live telecom or backend connected.
        </p>
      </div>
    </aside>
  );
};
