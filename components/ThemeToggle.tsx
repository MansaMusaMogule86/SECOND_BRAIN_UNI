
import React from 'react';

interface ThemeToggleProps {
  isLight: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isLight, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-8 right-8 z-50 p-3 rounded-full bg-theme-card border border-theme-border backdrop-blur-md hover:scale-105 transition-all active:scale-95 text-theme-main shadow-lg"
      aria-label="Toggle theme"
    >
      {isLight ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.364 17.364l-.707.707m12.728 0l-.707-.707M6.364 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
