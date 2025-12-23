import React from 'react';
import { motion } from 'framer-motion';

interface CompletionViewProps {
    onNext: () => void;
}

const CompletionView: React.FC<CompletionViewProps> = ({ onNext }) => {
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
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-20 h-20 mx-auto bg-indigo-500 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50 mb-8"
                    >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-light leading-tight text-theme-main serif">
                        You are ready.
                    </h1>
                    <p className="text-xl text-theme-muted font-light leading-relaxed max-w-lg mx-auto">
                        The free experience is complete. You have shifted from searching to architecting.
                    </p>
                </div>

                <div className="pt-12">
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-12 py-5 bg-theme-main text-theme-bg rounded-full font-medium text-lg hover:shadow-xl transition-all"
                    >
                        Continue
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default CompletionView;
