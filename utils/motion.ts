// Global Motion Rules
// Principle: Slow sensitive system. Nothing feels fast. No surprises.

const DURATION_ENTRY = 0.7; // 600-800ms
const DURATION_EXIT = 0.35; // 300-400ms
const DELAY_TEXT = 0.3; // 300ms
const DELAY_BUTTON = 0.5; // 500ms
const PULSE_DURATION = 0.7; // 700ms

export const transitions = {
    screen: {
        initial: { opacity: 0, y: 16 }, // 12-16px upward
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 0 }, // No movement on exit
        transition: { duration: DURATION_ENTRY, ease: "easeOut" }
    },
    secondaryText: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: DELAY_TEXT, duration: DURATION_ENTRY, ease: "easeOut" }
    },
    button: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: DELAY_BUTTON, duration: DURATION_ENTRY, ease: "easeOut" }
    },
    buttonPulse: {
        scale: [1, 1.02, 1],
        transition: { duration: PULSE_DURATION, times: [0, 0.5, 1], repeat: 0, delay: DELAY_BUTTON + 0.1 }
    }
};

export const delays = {
    text: DELAY_TEXT,
    button: DELAY_BUTTON
};
