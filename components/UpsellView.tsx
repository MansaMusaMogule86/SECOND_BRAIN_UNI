import React from 'react';
import { motion } from 'framer-motion';
import { transitions } from '../utils/motion';

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
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-8">
      <motion.div
        initial={transitions.screen.initial}
        animate={transitions.screen.animate}
        exit={transitions.screen.exit}
        transition={transitions.screen.transition}
        className="max-w-2xl w-full text-center space-y-12"
      >
        <div className="space-y-8">
          <h1 className="text-3xl md:text-4xl text-theme-main serif leading-tight">
            You’ve reached the end of the free experience.
          </h1>

          <motion.div
            initial={transitions.secondaryText.initial}
            animate={transitions.secondaryText.animate}
            transition={transitions.secondaryText.transition}
            className="space-y-6 text-xl text-theme-muted font-light leading-relaxed"
          >
            <p>What you just did wasn’t a trick.<br />It was a way of thinking.</p>
            <p>Right now, it feels clear because you were guided.<br />You knew exactly what to do next.</p>
            <p>The hard part is not understanding this.<br />The hard part is doing it tomorrow.<br />And the day after.<br />And the day you’re tired or overwhelmed.</p>
            <p className="text-theme-main font-medium pt-4">That’s what the 30-day system is for.</p>
            <p>It doesn’t teach you more.<br />It keeps this clarity alive.</p>
            <p>Every day, you’re guided.<br />Every day, you don’t start from zero.</p>
            <p className="pt-4">If you want that, you can continue.<br />If not, you can stop here with no loss.</p>
          </motion.div>
        </div>

        <motion.div
          initial={transitions.button.initial}
          animate={transitions.button.animate}
          transition={transitions.button.transition}
          className="space-y-4 pt-4"
        >
          <motion.button
            onClick={handleJoinClick}
            animate={transitions.buttonPulse}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="px-12 py-5 bg-theme-main text-theme-bg rounded-full font-medium text-lg shadow-xl"
          >
            Join the 30-Day Program
          </motion.button>
          <p className="text-[10px] text-theme-muted font-bold uppercase tracking-[0.4em] opacity-60">
            Instant access. No software. No setup.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UpsellView;
