import React from 'react';
import { motion } from 'framer-motion';

interface UpsellViewProps {
  onJoin: () => void;
}

const UpsellView: React.FC<UpsellViewProps> = ({ onJoin }) => {
  const handleJoinClick = () => {
    const CHECKOUT_URL = 'https://buy.stripe.com/test_placeholder_product_id';
    const currentOrigin = window.location.origin + window.location.pathname;
    const successUrl = `${currentOrigin}?payment=success`;
    window.location.href = `${CHECKOUT_URL}?prefilled_email=${encodeURIComponent(localStorage.getItem('user_email') || '')}&success_url=${encodeURIComponent(successUrl)}`;
  };

  return (
    <div className="min-h-screen bg-theme-bg py-32 px-6">
      <div className="max-w-3xl mx-auto space-y-24">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center space-y-12"
        >
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl text-theme-muted serif leading-relaxed">
              "This win is just the beginning. You have the logic. Now you need the habit."
            </h3>
            <div className="w-12 h-px bg-indigo-500/20 mx-auto" />
          </div>

          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-600 opacity-60">The System</p>
            <h2 className="text-6xl md:text-7xl font-light leading-tight text-theme-main">
              Second Brain <span className="italic">Daily.</span>
            </h2>
          </div>

          <p className="text-2xl text-theme-muted font-light leading-relaxed max-w-2xl mx-auto">
            A 30-day guided thinking habit. We tell you what to ask ChatGPT in real-world situations, removing decision fatigue and turning logic into muscle memory.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-10 bg-theme-card border border-theme-border rounded-[2.5rem] space-y-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-medium text-theme-main">Daily Logic</h3>
            <p className="text-theme-muted leading-relaxed font-light">Short, daily instructions for real situations. No learning required.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-10 bg-theme-card border border-theme-border rounded-[2.5rem] space-y-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-medium text-theme-main">Zero Friction</h3>
            <p className="text-theme-muted leading-relaxed font-light">Not a course. Not software. Just a system that works when you're tired.</p>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center space-y-12 pt-12"
        >
          <div className="space-y-2">
            <p className="text-6xl font-light text-theme-main">$497</p>
            <p className="text-xs text-theme-muted font-bold uppercase tracking-[0.3em]">Lifetime Access</p>
          </div>

          <div className="space-y-8">
            <motion.button
              onClick={handleJoinClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-16 py-7 bg-theme-main text-theme-bg text-xl font-medium rounded-full shadow-2xl transition-transform"
            >
              Join the 30-Day Program
            </motion.button>
            <p className="text-[10px] text-theme-muted font-bold uppercase tracking-[0.4em] opacity-50">Instant access • No setup • Habit installation</p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default UpsellView;
