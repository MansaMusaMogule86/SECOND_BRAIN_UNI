import React from 'react';
import { motion } from 'framer-motion';
import { transitions } from '../utils/motion';

interface PostInstallViewProps {
    onNext: () => void;
}

const PostInstallView: React.FC<PostInstallViewProps> = ({ onNext }) => {
    return (
        <div className="min-h-screen bg-theme-bg flex items-center justify-center p-8">
            <motion.div
                initial={transitions.screen.initial}
                animate={transitions.screen.animate}
                exit={transitions.screen.exit}
                transition={transitions.screen.transition}
                className="max-w-2xl w-full text-center space-y-16"
            >
                <div className="space-y-6">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 opacity-80 animate-pulse">
                        Status: Complete
                    </p>
                    <h1 className="text-4xl md:text-5xl text-theme-main serif leading-tight">
                        System Installed.
                    </h1>
                    <div className="w-12 h-[1px] bg-theme-border mx-auto opacity-50 my-8" />
                    <p className="text-xl text-theme-muted font-light leading-relaxed">
                        Configuration is finished.<br />
                        This state is currently temporary.
                    </p>
                </div>

                <motion.div
                    initial={transitions.button.initial}
                    animate={transitions.button.animate}
                    transition={transitions.button.transition}
                    className="pt-8"
                >
                    <motion.button
                        onClick={onNext}
                        animate={transitions.buttonPulse}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="px-12 py-5 bg-theme-card border border-theme-border text-theme-main rounded-full font-light text-lg hover:border-theme-main hover:bg-theme-main hover:text-theme-bg transition-all"
                    >
                        Make it Permanent
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PostInstallView;
