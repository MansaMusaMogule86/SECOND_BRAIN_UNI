
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { View } from './types';
import LandingView from './components/LandingView';
import GateView from './components/GateView';
import DecompressionView from './components/DecompressionView';
import OrientationView from './components/OrientationView';
import MasteryView from './components/MasteryView';
import PracticeView from './components/PracticeView';
import ContrastView from './components/ContrastView';
import PatternView from './components/PatternView';
import PersonalizationView from './components/PersonalizationView';
import ProjectionView from './components/ProjectionView';
import CompletionView from './components/CompletionView';
import UpsellView from './components/UpsellView';
import SystemView from './components/SystemView';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  // Session Survival: Restore view state
  const [currentView, setCurrentView] = useState<View>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      return View.SYSTEM;
    }
    const saved = localStorage.getItem('sb_session_step');
    return (saved as View) || View.GATE; // Default to GATE for simplicity in this flow
  });

  // Session Survival: Restore theme preference
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('sb_theme') === 'light';
  });

  // Persist view state
  useEffect(() => {
    localStorage.setItem('sb_session_step', currentView);
  }, [currentView]);

  // Apply theme
  useEffect(() => {
    localStorage.setItem('sb_theme', isLight ? 'light' : 'dark');
    if (isLight) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLight]);

  const toggleTheme = () => setIsLight(!isLight);

  const renderView = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {(() => {
            switch (currentView) {
              case View.GATE:
                return <GateView onComplete={() => setCurrentView(View.DECOMPRESSION)} />;

              case View.DECOMPRESSION: // Step 2
                return (
                  <DecompressionView
                    title="Step 02 — Decompression"
                    text="Before we begin, slow down. This is not another tutorial. This is a shift in how you use your mind. Take a breath."
                    onNext={() => setCurrentView(View.ORIENTATION)}
                  />
                );

              case View.ORIENTATION: // Step 3
                return <OrientationView onNext={() => setCurrentView(View.MASTERY)} />;

              case View.MASTERY: // Step 4
                return <MasteryView onNext={() => setCurrentView(View.PRACTICE_1)} />;

              case View.PRACTICE_1: // Step 5
                return (
                  <PracticeView
                    step="05"
                    title="First Guided Practice"
                    instruction="Paste this: 'Tell me how to start a business.' (See how vague it is?)"
                    onNext={() => setCurrentView(View.REFLECTION)}
                  />
                );

              case View.REFLECTION: // Step 6
                return (
                  <DecompressionView
                    title="Step 06 — Reflection"
                    text={
                      <span>
                        Notice how generic that felt?
                        <br />
                        <span className="text-theme-muted text-2xl mt-4 block">You gave it zero constraints, so it gave you zero value.</span>
                      </span>
                    }
                    buttonText="I felt it"
                    onNext={() => setCurrentView(View.PRACTICE_2)}
                  />
                );

              case View.PRACTICE_2: // Step 7
                return (
                  <PracticeView
                    step="07"
                    title="Second Guided Practice"
                    instruction="Now, paste this: 'Act as a lean startup advisor. I have $500 and 5 hours. Give me a 3-step test plan.'"
                    onNext={() => setCurrentView(View.CONTRAST)}
                  />
                );

              case View.CONTRAST: // Step 8
                return <ContrastView onNext={() => setCurrentView(View.TENSION)} />;

              case View.TENSION: // Step 9
                return (
                  <DecompressionView
                    title="Step 09 — The Shift"
                    text="That worked because I gave you the prompt. But what happens when I'm not here?"
                    buttonText="Show me"
                    onNext={() => setCurrentView(View.PRACTICE_3)}
                  />
                );

              case View.PRACTICE_3: // Step 10
                return (
                  <PracticeView
                    step="10"
                    title="Third Practice"
                    instruction="Now you try. Give it a Role. Give it a Constraint. Ask for a specific Win."
                    isFreeform={true}
                    onNext={() => setCurrentView(View.PATTERN)}
                  />
                );

              case View.PATTERN: // Step 11
                return <PatternView onNext={() => setCurrentView(View.PERSONALIZATION)} />;

              case View.PERSONALIZATION: // Step 12
                return <PersonalizationView onComplete={() => setCurrentView(View.PROJECTION)} />;

              case View.PROJECTION: // Step 13
                return <ProjectionView onNext={() => setCurrentView(View.COMPLETION)} />;

              case View.COMPLETION: // Step 14
                return <CompletionView onNext={() => setCurrentView(View.UPSELL)} />;

              case View.UPSELL: // Step 15
                return <UpsellView onJoin={() => setCurrentView(View.SYSTEM)} />;

              case View.SYSTEM:
                return <SystemView />;

              default:
                return <GateView onComplete={() => setCurrentView(View.DECOMPRESSION)} />;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-theme-bg text-theme-main selection:bg-indigo-500/30 selection:text-indigo-200">
      <ThemeToggle isLight={isLight} onToggle={toggleTheme} />
      <main className="flex-grow">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
