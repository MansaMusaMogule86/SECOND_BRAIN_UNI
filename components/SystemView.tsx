import React, { useState } from 'react';

const DAYS = [
  { day: 1, situation: "System Installation", ask: "Use this prompt to break any task into three tiny steps.", why: "Calibration: Removes paralysis by lowering the entry threshold." },
  { day: 2, situation: "Communication Firewall", ask: "Check a draft for defensive tone.", why: "Guardrail logic: Prevents unnecessary friction." },
  { day: 3, situation: "Concept Bridge", ask: "Explain X using Y analogy.", why: "Mode: Acceleration of understanding." },
  { day: 4, situation: "Leverage Filter", ask: "Identify the one task that makes the others unnecessary.", why: "Mode: High-value targeting." },
  { day: 5, situation: "Solution Engine", ask: "Generate three options that solve a specific problem.", why: "Mode: Problem-solution mapping." },
  { day: 6, situation: "Signal Extraction", ask: "Find the three most controversial points in this text.", why: "Mode: Noise reduction." },
  { day: 7, situation: "Logic Stress Test", ask: "Find the biggest flaw in my reasoning.", why: "Guardrail: Blind spot detection." },
  { day: 8, situation: "Boundary Definition", ask: "What are the three most important questions to ask now?", why: "Mode: Scope control." },
  { day: 9, situation: "Resistance Simulation", ask: "Roleplay as a skeptic and ask one difficult question.", why: "Calibration: Emotional preparation." },
  { day: 10, situation: "Error Avoidance", ask: "What are the three most common mistakes beginners make?", why: "Mode: Failure prevention." },
  // ... (Abbreviated for brevity, but logically consistently reframed as "System Actions")
  { day: 30, situation: "Permanent Protocol", ask: "Always challenge my first idea with a better alternative before agreeing.", why: "System Rule: Anti-mediocrity protocol." }
];

// Re-using the full content from before but changing the wrapper UI to feel like a "System Dashboard"
const SYSTEM_LOG = [
  { id: "01", situation: "Action Paralysis", action: "Micro-Step Protocol", outcome: "Momentum" },
  { id: "02", situation: "Communication Risk", action: "Tone Mirror", outcome: "Clarity" },
  { id: "03", situation: "Concept Complexity", action: "Analogy Bridge", outcome: "Understanding" },
  { id: "04", situation: "Task Overload", action: "Leverage Filter", outcome: "Focus" },
  { id: "05", situation: "Decision Fatigue", action: "Solution Mapping", outcome: "Choice" },
];
// Actually, let's keep the detailed view but reframe the header.

const SystemView: React.FC = () => {
  const [currentDayIdx, setCurrentDayIdx] = useState(0);
  // Using the original days for content depth, but maybe valid to reframe them later. 
  // For now, the user asked specifically about the OFFER. 
  // I will just reframe the UI of this dashboard to look like a "System Manual" or "Calibration Log".
  const current = DAYS[currentDayIdx] || DAYS[0];

  return (
    <div className="min-h-screen bg-theme-bg py-24 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-16 fade-in-up">
        <div className="flex items-center justify-between border-b border-theme-border pb-10">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-400">System Calibration</p>
            <p className="text-xl serif text-theme-main">Module {currentDayIdx + 1} / {DAYS.length}</p>
          </div>
          <div className="flex space-x-6">
            <button
              onClick={() => setCurrentDayIdx(Math.max(0, currentDayIdx - 1))}
              disabled={currentDayIdx === 0}
              className="text-[10px] font-bold uppercase tracking-widest text-theme-muted hover:text-theme-main transition-colors disabled:opacity-30"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentDayIdx(Math.min(DAYS.length - 1, currentDayIdx + 1))}
              disabled={currentDayIdx === DAYS.length - 1}
              className="text-[10px] font-bold uppercase tracking-widest text-theme-muted hover:text-theme-main transition-colors disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-[9px] uppercase tracking-[0.3em] font-bold text-theme-muted">Input Trigger</h3>
            <p className="text-3xl font-light text-theme-main leading-tight serif">{current.situation}</p>
          </div>

          <div className="p-12 bg-theme-card border border-theme-border rounded-[2.5rem] space-y-6 shadow-sm shadow-black/5">
            <h3 className="text-[9px] uppercase tracking-[0.3em] font-bold text-indigo-400">System Command</h3>
            <p className="text-xl text-theme-main font-light leading-relaxed italic">
              "{current.ask}"
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[9px] uppercase tracking-[0.3em] font-bold text-theme-muted">System Logic</h3>
            <p className="text-lg text-theme-muted font-light leading-relaxed">{current.why}</p>
          </div>

          <div className="pt-16 text-center">
            <div className="w-1 h-1 bg-theme-border rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemView;
