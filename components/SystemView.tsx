import React, { useState } from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  { id: 1, title: "Calibration", situation: "System Installation", ask: "Use this prompt to break any task into three tiny steps.", why: "Calibration: Removes paralysis by lowering the entry threshold." },
  { id: 2, title: "Firewall", situation: "Communication Risk", ask: "Check a draft for defensive tone.", why: "Guardrail logic: Prevents friction." },
  { id: 3, title: "Bridging", situation: "Concept Complexity", ask: "Explain X using Y analogy.", why: "Mode: Acceleration of understanding." },
  { id: 4, title: "Targeting", situation: "Task Overload", ask: "Identify the one task that makes the others unnecessary.", why: "Mode: High-value targeting." },
  { id: 5, title: "Solving", situation: "Decision Fatigue", ask: "Generate three options that solve a specific problem.", why: "Mode: Problem-solution mapping." },
  { id: 6, title: "Filtering", situation: "Signal Extraction", ask: "Find the three most controversial points in this text.", why: "Mode: Noise reduction." },
  { id: 7, title: "Stress Testing", situation: "Logic Analysis", ask: "Find the biggest flaw in my reasoning.", why: "Guardrail: Blind spot detection." },
  { id: 8, title: "Scoping", situation: "Boundary Definition", ask: "What are the three most important questions to ask now?", why: "Mode: Scope control." },
  { id: 9, title: "Simulation", situation: "Resistance Check", ask: "Roleplay as a skeptic and ask one difficult question.", why: "Calibration: Emotional preparation." },
  { id: 10, title: "Prevention", situation: "Error Avoidance", ask: "What are the three most common mistakes?", why: "Mode: Failure prevention." },
  { id: 11, title: "Identity", situation: "Identity Shift", ask: "Always challenge my first idea with a better alternative before agreeing.", why: "System Rule: Anti-mediocrity protocol." }
];

interface SystemViewProps {
  onComplete?: () => void;
  isPermanent?: boolean; // If true, it's the full paid system (maybe expandable later)
}

const SystemView: React.FC<SystemViewProps> = ({ onComplete, isPermanent = false }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const current = STEPS[currentStepIdx];
  const isLastStep = currentStepIdx === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-theme-bg py-24 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-16 fade-in-up">
        {/* Progress Header */}
        <div className="flex items-center justify-between border-b border-theme-border pb-10">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-400">
              {isPermanent ? "System Active" : "System Installation"}
            </p>
            <p className="text-xl serif text-theme-main">
              Module {currentStepIdx + 1} / {STEPS.length}
            </p>
          </div>
          <div className="flex space-x-6">
            <button
              onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}
              disabled={currentStepIdx === 0}
              className="text-[10px] font-bold uppercase tracking-widest text-theme-muted hover:text-theme-main transition-colors disabled:opacity-30"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentStepIdx(Math.min(STEPS.length - 1, currentStepIdx + 1))}
              disabled={currentStepIdx === STEPS.length - 1 && !isPermanent}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${currentStepIdx === STEPS.length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-theme-muted hover:text-theme-main'}`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Card Content */}
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

          {/* Completion Button for Installation Mode */}
          {!isPermanent && isLastStep && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-16 text-center"
            >
              <button
                onClick={onComplete}
                className="px-10 py-4 bg-theme-main text-theme-bg rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-lg"
              >
                Finalize Configuration
              </button>
            </motion.div>
          )}

          {(!isLastStep || isPermanent) && (
            <div className="pt-16 text-center">
              <div className="w-1 h-1 bg-theme-border rounded-full mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemView;
