import React from 'react';
import { motion } from 'framer-motion';

interface OrientationViewProps {
    onNext: () => void;
}

const OrientationView: React.FC<OrientationViewProps> = ({ onNext }) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-theme-bg">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="max-w-2xl w-full space-y-12 text-center"
            >
                <div className="space-y-6">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 opacity-60">Step 03 — Orientation</p>
                    <h1 className="text-3xl md:text-4xl font-light leading-relaxed text-theme-main serif">
                        ChatGPT often feels broken because we treat it like a search engine.
                        <span className="block mt-4 text-theme-muted">We ask for answers. It gives us text.</span>
                        <span className="block mt-4">Real mastery is not about better prompting. It's about thinking in structures.</span>
                    </h1>
                </div>

                <div className="pt-12">
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-12 py-4 border border-theme-border/50 text-theme-muted rounded-full font-medium text-lg hover:text-theme-main hover:border-theme-main transition-colors duration-500"
                    >
                        I Understand
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default OrientationView;
