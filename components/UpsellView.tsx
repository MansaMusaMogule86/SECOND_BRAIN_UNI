import React from 'react';
import { motion } from 'framer-motion';
import { transitions } from '../utils/motion';

interface UpsellViewProps {
  onJoin: () => void;
}

const UpsellView: React.FC<UpsellViewProps> = ({ onJoin }) => {
  const handleJoinClick = () => {
    // In a real app, this goes to Stripe.
    // For this demo, we simulate a "system install" success.
    const currentOrigin = window.location.origin + window.location.pathname;
    const successUrl = `${currentOrigin}?payment=success`;
    // const CHECKOUT_URL = 'https://buy.stripe.com/test_placeholder_product_id';
    // window.location.href = `${CHECKOUT_URL}?prefilled_email=${encodeURIComponent(localStorage.getItem('user_email') || '')}&success_url=${encodeURIComponent(successUrl)}`;

    // Direct bypass for demo purposes since we don't have a real product ID
    window.location.href = successUrl;
  };

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-8">
      <motion.div
        initial={transitions.screen.initial}
        animate={transitions.screen.animate}
        exit={transitions.screen.exit}
        transition={transitions.screen.transition}
        className="max-w-2xl w-full text-center space-y-16"
      >
        <div className="space-y-10">
          <motion.div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 opacity-80">
              System Install Available
            </p>
            <h1 className="text-4xl md:text-5xl text-theme-main serif leading-tight">
              Second Brain System
            </h1>
            <p className="text-xl text-theme-muted font-light">
              A personal AI operating system for thinking clearly.
            </p>
          </motion.div>

          <motion.div
            initial={transitions.secondaryText.initial}
            animate={transitions.secondaryText.animate}
            transition={transitions.secondaryText.transition}
            className="space-y-8 text-xl text-theme-main font-light leading-relaxed max-w-lg mx-auto"
          >
            <p className="opacity-80">
              This isn’t something you watch.<br />
              This is something you use.
            </p>

            <div className="w-12 h-[1px] bg-theme-border mx-auto opacity-50 my-8" />

            <p>
              <span className="text-theme-muted">You are buying:</span><br />
              A pre-configured AI behavior.<br />
              Built-in thinking modes.<br />
              Guardrails against noise.
            </p>

            <p>
              <span className="text-theme-muted">The one-sentence promise:</span><br />
              You never start from zero again when thinking, planning, or deciding with AI.
            </p>

            <p className="text-base text-theme-muted italic pt-4">
              The first phase installs and calibrates the system to how you think.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={transitions.button.initial}
          animate={transitions.button.animate}
          transition={transitions.button.transition}
          className="space-y-6 pt-8"
        >
          <motion.button
            onClick={handleJoinClick}
            animate={transitions.buttonPulse}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="px-14 py-5 bg-theme-main text-theme-bg rounded-full font-medium text-lg shadow-xl"
          >
            Install System
          </motion.button>

          <div className="flex flex-col space-y-2 opacity-50">
            <p className="text-[10px] text-theme-muted font-bold uppercase tracking-[0.3em]">
              One-time purchase • Lifetime access
            </p>
            <p className="text-[9px] text-theme-muted">
              Instant activation. No setup.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UpsellView;
