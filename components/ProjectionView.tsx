import React from 'react';
import { motion } from 'framer-motion';

interface ProjectionViewProps {
    onNext: () => void;
}

const ProjectionView: React.FC<ProjectionViewProps> = ({ onNext }) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-theme-bg">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="max-w-2xl w-full space-y-16 text-center"
            >
                <div className="space-y-6">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 opacity-60">Step 13 — The Projection</p>
                    <h2 className="text-3xl md:text-5xl font-light text-theme-main leading-tight serif">
                        Imagine using this...
                    </h2>
                </div>

                <div className="space-y-8">
                    {[
                        "When you're tired.",
                        "When you're stressed.",
                        "When you're staring at a blank page alone."
                    ].map((text, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 1.5), duration: 1 }} // Slow reveal
                            className="text-2xl text-theme-muted font-light italic"
                        >
                            {text}
                        </motion.p>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5.5 }}
                    className="pt-12"
                >
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-12 py-5 border border-theme-border/50 text-theme-muted rounded-full font-medium text-lg hover:text-theme-main hover:border-theme-main transition-colors duration-500"
                    >
                        I'm Ready for the System
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ProjectionView;
