import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ChevronRight,
  Shield,
  Smartphone,
  Check
} from 'lucide-react';

export const AwarenessView: React.FC = () => {
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  const quizQuestions = [
    {
      id: 1,
      scenario: 'You receive an SMS from "CITY-POWER" claiming your electricity will be disconnected in 2 hours unless you pay $45 via a bit.ly link.',
      options: [
        'Pay quickly using the bit.ly link to avoid power loss.',
        'Ignore and delete immediately without checking anywhere.',
        'Do not click the link; check your utility account via their official mobile app or phone bill.',
      ],
      correctIndex: 2,
      explanation: 'Always verify through independent, official channels. Real utilities never demand immediate payment through generic URL shorteners under arbitrary panic deadlines.',
    },
    {
      id: 2,
      scenario: 'A text message claims to be your bank warning: "Your account is temporarily locked. Reply with your 6-digit OTP to unlock."',
      options: [
        'Reply with the OTP since they just want to verify you own the phone.',
        'Never reply with an OTP; banks never request One-Time Passwords via incoming SMS.',
        'Forward the OTP to customer support email.',
      ],
      correctIndex: 1,
      explanation: 'OTPs are for your eyes only. No authentic institution will ever request your OTP, password, or PIN via SMS or over the phone.',
    },
    {
      id: 3,
      scenario: 'Why does ScamShield offer a 2G Keypad Feature Phone mode in addition to the Web Dashboard?',
      options: [
        'To simulate accessibility for millions of basic-phone users who receive deceptive SMS on low-resolution displays without web browsers.',
        'Because 2G phones are immune to phishing attacks.',
        'To demonstrate video streaming on keypad handsets.',
      ],
      correctIndex: 0,
      explanation: 'Keypad feature phone users are often targeted by smishing campaigns and lack rich web browsers or URL security indicators. Clear plain-text warning messages ensure accessible security for all user demographics.',
    },
  ];

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    setSelectedQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div id="view-awareness-container" className="space-y-8">
      {/* Header */}
      <div className="bg-[#121d36] rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold">
            <BookOpenCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Cybersecurity Awareness & Defense Principles
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Understand social engineering vectors, attack anatomy, and essential defensive protocols.
            </p>
          </div>
        </div>

        {/* 3 Core Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-sm font-bold text-white">Never Share OTP or PINs</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              One-Time Passwords (OTPs), PINs, passwords, and CVVs are confidential authentication factors. Legitimate banks and government services will strictly never request them via text message or telephone call.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-sm font-bold text-white">Inspect Hyperlinks Carefully</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Look out for shortened URLs (bit.ly, tinyurl, t.co) and deceptive lookalike domain names (e.g., sbi-kyc-update.com instead of sbi.co.in). Never tap embedded links from unexpected senders.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-sm font-bold text-white">Verify in Official Apps Only</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If an SMS states your account, electricity, or package is suspended, independently open the verified provider app or dial the customer service number printed on your physical billing statement.
            </p>
          </div>
        </div>
      </div>

      {/* Smishing Anatomy Breakdown */}
      <div className="bg-[#121d36] rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <span>Anatomy of a Smishing (SMS Phishing) Attack</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/40 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">Step 1</span>
            <h4 className="text-xs font-bold text-white">Panic / Urgency Hook</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uses capital letters, impending deadlines ("tonight at 9PM"), or threat of police / account freezes to suppress critical thinking.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/40 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">Step 2</span>
            <h4 className="text-xs font-bold text-white">Authority Spoofing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Impersonates trusted institutions: national banks, municipal power utilities, postal logistics, or healthcare clinics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-900/40 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">Step 3</span>
            <h4 className="text-xs font-bold text-white">Deceptive Destination</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Directs victims to external credential harvesting portals, fake payment gateways, or malware APK downloads.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-900/40 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Step 4</span>
            <h4 className="text-xs font-bold text-white">ScamShield Intervention</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Flags urgency triggers, unverified domains, and credential demands — presenting plain-text actionable warnings in dual modes.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Cyber Check Quiz */}
      <div className="bg-[#121d36] rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Interactive Phishing Reflex Check</h3>
            <p className="text-xs text-slate-400">Test your response against real-world social engineering prompts.</p>
          </div>
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q) => {
            const hasAnswered = selectedQuizAnswers[q.id] !== undefined;
            const chosenIdx = selectedQuizAnswers[q.id];
            const isCorrect = chosenIdx === q.correctIndex;

            return (
              <div key={q.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {q.id}
                  </span>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {q.scenario}
                  </p>
                </div>

                <div className="space-y-2 pl-9">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = chosenIdx === oIdx;
                    let btnStyle = 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-600';
                    if (hasAnswered) {
                      if (oIdx === q.correctIndex) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/80 border-rose-600 text-rose-200';
                      } else {
                        btnStyle = 'bg-slate-900/40 text-slate-500 border-slate-900';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectAnswer(q.id, oIdx)}
                        disabled={hasAnswered}
                        type="button"
                        className={`w-full text-left p-3 rounded-lg text-xs border transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {hasAnswered && oIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && showExplanation[q.id] && (
                  <div
                    className={`ml-9 p-3 rounded-lg text-xs leading-relaxed border ${
                      isCorrect
                        ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-800/80 text-rose-300'
                    }`}
                  >
                    <strong className="block mb-1">
                      {isCorrect ? '✓ Correct Decision!' : '✕ High-Risk Decision!'}
                    </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
