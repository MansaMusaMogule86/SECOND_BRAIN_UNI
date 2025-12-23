
import React from 'react';

interface MirrorViewProps {
  onNext: () => void;
}

const MirrorView: React.FC<MirrorViewProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-theme-bg">
      <div className="max-w-4xl w-full space-y-16 fade-in-up">
        <div className="text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500">Step 05 — The Mirror</p>
          <h2 className="text-4xl md:text-5xl font-light text-theme-main leading-tight">The difference is invisible.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 opacity-40">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-theme-muted">The Searcher</h3>
            <p className="text-lg text-theme-muted italic">"How do I get more done today?"</p>
            <p className="text-sm text-theme-muted leading-relaxed">
              Result: Generic tips on sleep, hydration, and checklists. Nothing changes.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-indigo-400">The Architect</h3>
            <p className="text-lg text-theme-main">"Act as an efficiency expert. I am overwhelmed by 50 small tasks. Help me find the 3 that will make the other 47 irrelevant."</p>
            <p className="text-sm text-theme-muted leading-relaxed">
              Result: Strategic leverage. Absolute clarity. Momentum.
            </p>
          </div>
        </div>

        <div className="text-center pt-12">
          <button onClick={onNext} className="px-12 py-5 bg-theme-main text-theme-bg rounded-full font-medium text-lg">
            I see it
          </button>
        </div>
      </div>
    </div>
  );
};

export default MirrorView;
