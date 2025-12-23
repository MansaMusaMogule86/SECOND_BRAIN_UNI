import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PersonalizationViewProps {
  onComplete: () => void;
}

const PersonalizationView: React.FC<PersonalizationViewProps> = ({ onComplete }) => {
  const [choice, setChoice] = useState<string | null>(null);

  const options = [
    { id: 'fitness', label: 'Body & Fitness', sub: 'Health without confusion.' },
    { id: 'business', label: 'Work & Business', sub: 'Strategy over busywork.' },
    { id: 'clarity', label: 'Life Clarity', sub: 'Decision-making with peace.' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-theme-bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full space-y-16"
      >
        <div className="text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 opacity-60">Step 12 — The Application</p>
          <h2 className="text-3xl md:text-5xl font-light text-theme-main leading-tight serif">Where should we focus next?</h2>
          <p className="text-xl text-theme-muted font-light">Now that you have the logic, tell me your priority.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {options.map((opt, index) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
              onClick={() => setChoice(opt.id)}
              className={`p-10 text-left rounded-[2rem] border transition-all duration-500 ${choice === opt.id
                  ? 'bg-indigo-600 border-indigo-600 text-white scale-[1.02] shadow-xl shadow-indigo-500/20'
                  : 'bg-theme-card border-theme-border hover:border-indigo-500/30 hover:bg-theme-card/80'
                }`}
            >
              <h3 className={`text-2xl font-light ${choice === opt.id ? 'text-white' : 'text-theme-main'}`}>{opt.label}</h3>
              <p className={`mt-2 font-light ${choice === opt.id ? 'text-indigo-100' : 'text-theme-muted'}`}>{opt.sub}</p>
            </motion.button>
          ))}
        </div>

        {choice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.button
              onClick={onComplete}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-16 py-6 bg-theme-main text-theme-bg rounded-full font-medium text-lg hover:shadow-lg transition-all"
            >
              Set Focus
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PersonalizationView;
