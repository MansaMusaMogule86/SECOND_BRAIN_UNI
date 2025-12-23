
import React from 'react';

interface LandingViewProps {
  onStart: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-theme-bg">
      <div className="max-w-2xl w-full space-y-12 text-center fade-in-up">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500">Step 01 — Orientation</p>
          <h1 className="text-5xl md:text-6xl font-light leading-tight text-theme-main">
            Why AI feels <span className="italic">confusing.</span>
          </h1>
        </div>
        
        <div className="space-y-8 text-xl text-theme-muted leading-relaxed font-light">
          <p>
            People don’t use ChatGPT wrong. They think wrong.
          </p>
          <p>
            Most treat it like Google—asking short, vague questions. This results in generic, useless answers.
          </p>
          <p className="text-theme-main font-medium italic">
            "In the next 2 minutes, you’ll see what actually changes everything."
          </p>
        </div>
        
        <div className="pt-10">
          <button
            onClick={onStart}
            className="px-12 py-5 bg-theme-main text-theme-bg rounded-full font-medium text-lg hover:scale-[1.02] transition-all shadow-xl shadow-black/10"
          >
            See the Difference
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingView;
