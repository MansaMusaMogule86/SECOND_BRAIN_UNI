import React from 'react';
import { motion } from 'framer-motion';

interface MasteryViewProps {
  onNext: () => void;
}

const MasteryView: React.FC<MasteryViewProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-theme-bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full space-y-16"
      >
        <div className="text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 opacity-60">Step 04 — The Difference</p>
          <h2 className="text-3xl md:text-5xl font-light text-theme-main leading-tight serif">Thinking is the lever.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: The Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-theme-muted opacity-40">The "Google" Approach</h3>
            <div className="p-8 bg-theme-card/50 border border-theme-border rounded-[2rem] space-y-4 shadow-sm opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <p className="text-xs font-bold text-theme-muted tracking-widest">INPUT</p>
              <p className="text-lg text-theme-muted italic font-serif">"How do I lose weight?"</p>
              <div className="h-px bg-theme-border/50 my-6" />
              <p className="text-xs font-bold text-theme-muted tracking-widest">OUTPUT</p>
              <p className="text-sm text-theme-muted leading-relaxed">Eat less, move more. Eat vegetables. (Generic noise...)</p>
            </div>
          </motion.div>

          {/* Right Column: The New Way */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-indigo-400">The "Architect" Approach</h3>
            <div className="p-8 bg-theme-card border-2 border-indigo-500/10 rounded-[2rem] space-y-4 shadow-2xl shadow-indigo-500/5">
              <p className="text-xs font-bold text-indigo-400 tracking-widest">INPUT</p>
              <p className="text-lg text-theme-main font-serif">"Act as a nutritionist. I am a busy parent. Build a plan for someone who has no time to cook but wants more energy."</p>
              <div className="h-px bg-indigo-500/10 my-6" />
              <p className="text-xs font-bold text-indigo-400 tracking-widest">OUTPUT</p>
              <p className="text-sm text-theme-main leading-relaxed">Focus on high-protein, zero-prep snacks... (Specific, actionable logic...)</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center space-y-10 pt-8"
        >
          <p className="text-xl text-theme-muted font-light max-w-xl mx-auto italic">
            Nothing magical happened. Only the thinking changed.
          </p>
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-5 bg-theme-main text-theme-bg rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300"
          >
            Try it Yourself
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MasteryView;
