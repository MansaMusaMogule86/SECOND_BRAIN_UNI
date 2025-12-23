import React from 'react';
import { motion } from 'framer-motion';

interface PatternViewProps {
  onNext: () => void;
}

const PatternView: React.FC<PatternViewProps> = ({ onNext }) => {
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
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 opacity-60">Step 11 — The Name</p>
          <h2 className="text-3xl md:text-5xl font-light text-theme-main leading-tight serif">The "Role-Constraint-Intent" Pattern.</h2>
        </div>

        <div className="space-y-12">
          {[
            { id: 1, title: 'The Role', desc: "Don't just ask. Tell it who to be. (Expert, Critic, Friend)." },
            { id: 2, title: 'The Constraint', desc: "Give it boundaries. (Time, Budget, Tone)." },
            { id: 3, title: 'The Intent', desc: "Define the win. (A plan, a critique, a draft)." }
          ].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (index * 0.2) }}
              className="flex items-start space-x-8"
            >
              <div className="w-12 h-12 rounded-full border border-indigo-500/20 flex items-center justify-center text-indigo-500 font-bold flex-shrink-0">
                {item.id}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-theme-main">{item.title}</h3>
                <p className="text-theme-muted font-light leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center pt-8"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-16 py-6 bg-theme-main text-theme-bg rounded-full font-medium text-lg hover:shadow-lg transition-all"
          >
            I Understand
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PatternView;
