
import React from 'react';

interface WhyViewProps {
  onNext: () => void;
}

const WhyView: React.FC<WhyViewProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-theme-bg">
      <div className="max-w-2xl w-full space-y-12 text-center fade-in-up">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500">Step 06 — The Why</p>
          <h2 className="text-4xl font-light text-theme-main leading-tight">It's a "Thinking" Gap.</h2>
        </div>
        
        <div className="space-y-8 text-xl text-theme-muted leading-relaxed font-light">
          <p>
            You are used to "Keywords". 
          </p>
          <p>
            But AI works on "Context". When you give it context, it stops being a library and starts being a partner.
          </p>
        </div>
        
        <button onClick={onNext} className="px-12 py-5 bg-theme-main text-theme-bg rounded-full font-medium text-lg">
          Show Me
        </button>
      </div>
    </div>
  );
};

export default WhyView;
