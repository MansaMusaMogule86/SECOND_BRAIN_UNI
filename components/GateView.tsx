import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GateViewProps {
  onComplete: () => void;
}

const GateView: React.FC<GateViewProps> = ({ onComplete }) => {
  const [email, setEmail] = useState('');
  const [isExiting, setIsExiting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && isValidEmail(email)) {
      setIsProcessing(true);

      const emailValue = email.trim();
      localStorage.setItem('user_email', emailValue);

      try {
        await fetch('https://api.example.com/sb-leads-webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailValue,
            timestamp: new Date().toISOString(),
            sessionId: Math.random().toString(36).substring(7),
            source: 'second_brain_live_session'
          })
        });
      } catch (err) {
        console.warn("Lead storage webhook failed, proceeding with local session.", err);
      }

      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }, 400);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Second Brain — A Guided Experience',
      text: 'Experience how to shift your thinking with AI.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Share cancelled or failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  const isValidEmail = (email: string) => {
    return email.includes('@') && email.includes('.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 premium-bg overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`max-w-md w-full space-y-12 text-center`}
      >
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-light leading-tight text-theme-main tracking-wide">
            Second Brain
          </h1>
          <p className="text-sm text-theme-muted font-light leading-relaxed tracking-wider uppercase">
            A Guided Experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative">
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-theme-card border border-theme-border rounded-2xl py-5 px-6 text-xl font-light outline-none transition-all duration-500 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/5 focus:scale-[1.02] text-center placeholder:text-theme-muted text-theme-main shadow-inner"
              required
              disabled={isProcessing}
            />
          </div>

          <div className="relative min-h-[80px] flex flex-col items-center justify-center">
            <button
              type="submit"
              disabled={!isValidEmail(email) || isProcessing}
              className="w-full py-5 bg-theme-main text-theme-bg rounded-full font-medium text-lg shadow-xl hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Preparing session..." : "Continue"}
            </button>
          </div>
        </form>

        <div className="pt-12 border-t border-theme-border/30 space-y-4">
          <p className="text-[9px] text-theme-muted font-bold uppercase tracking-[0.4em] opacity-40">Privacy First • Secure Connection</p>
        </div>
      </motion.div>
    </div>
  );
};

export default GateView;