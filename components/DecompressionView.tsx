import React from 'react';
import { motion } from 'framer-motion';

interface DecompressionViewProps {
  onNext: () => void;
  title?: string;
  text?: React.ReactNode;
  buttonText?: string;
  disableAnimation?: boolean;
}

const DecompressionView: React.FC<DecompressionViewProps> = ({
  onNext,
  title = "Step 02 — Decompression",
  text = "Before we begin, slow down. This is not another tutorial. This is a shift in how you use your mind. Take a breath.",
  buttonText = "Continue",
  disableAnimation = false
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-theme-bg">
      <motion.div
        initial={disableAnimation ? {} : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl w-full space-y-12 text-center"
      >
        <div className="space-y-6">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 opacity-60">{title}</p>
          <h1 className="text-3xl md:text-5xl font-light leading-snug text-theme-main serif">
            {text}
          </h1>
        </div>

        <div className="pt-12">
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
            className="px-12 py-4 border border-theme-border/50 text-theme-muted rounded-full font-medium text-lg hover:text-theme-main hover:border-theme-main transition-colors duration-500"
          >
            {buttonText}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DecompressionView;
