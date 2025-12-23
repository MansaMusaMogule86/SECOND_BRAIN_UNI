import React from 'react';
import { motion } from 'framer-motion';

interface ContrastViewProps {
    onNext: () => void;
}

const ContrastView: React.FC<ContrastViewProps> = ({ onNext }) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-theme-bg">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="max-w-4xl w-full space-y-16"
            >
                <div className="text-center space-y-6">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 opacity-60">Step 08 — The Contrast</p>
                    <h2 className="text-3xl md:text-5xl font-light text-theme-main leading-tight serif">
                        Look at how far you've come.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4 opacity-50"
                    >
                        <h3 className="text-xs font-bold text-theme-muted uppercase tracking-widest text-center">30 Minutes Ago</h3>
                        <div className="p-8 bg-theme-card border border-theme-border rounded-[2rem] text-center">
                            <p className="text-theme-muted italic">"Help me write an email."</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                        className="space-y-4 relative"
                    >
                        <div className="absolute -inset-1 bg-indigo-500/10 blur-xl rounded-full" />
                        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest text-center relative">Right Now</h3>
                        <div className="p-8 bg-theme-card border-2 border-indigo-500/20 rounded-[2rem] text-center relative shadow-2xl">
                            <p className="text-theme-main font-serif">"Act as a communication strategist. Critique this draft for clarity and tone. Tell me what I missed."</p>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-center pt-8"
                >
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-12 py-5 bg-theme-main text-theme-bg rounded-full font-medium text-lg hover:shadow-lg transition-all"
                    >
                        I See It
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ContrastView;
