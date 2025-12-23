
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/gemini';
import { ChatMessage } from '../types';

interface WorkshopViewProps {
  onFinish: () => void;
}

const SparkleIcon = () => (
  <div className="flex-shrink-0 mt-1.5">
    <svg className="w-5 h-5 text-indigo-500 gemini-sparkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3L14.5 9L21 11.5L14.5 14L12 21L9.5 14L3 11.5L9.5 9L12 3Z" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
    </svg>
  </div>
);

const WorkshopView: React.FC<WorkshopViewProps> = ({ onFinish }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await getGeminiResponse(currentInput, 'thinking');
      const modelMsg: ChatMessage = { role: 'model', text: res.text || "I am reflecting on that logic." };
      setMessages(prev => [...prev, modelMsg]);
      
      if (messages.length >= 0) {
        setTimeout(() => setShowExplanation(true), 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F2]">
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto px-6 pt-32 pb-48 scroll-smooth"
      >
        <div className="max-w-2xl mx-auto space-y-20">
          {messages.length === 0 && (
            <div className="space-y-12 fade-in-up">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500">Step 03 — Guided Practice</p>
                <h2 className="text-4xl md:text-5xl font-light text-[#333333] leading-tight">Experience the shift.</h2>
              </div>
              
              <div className="p-10 bg-white/60 backdrop-blur-sm rounded-[2.5rem] border border-white/80 space-y-6">
                <p className="text-lg text-gray-500 font-light leading-relaxed">
                  Paste this below and ask something you’ve been overthinking lately:
                </p>
                <div className="p-6 bg-[#F7F7F2] rounded-2xl text-[#444444] font-mono text-sm leading-relaxed border border-gray-100">
                  "Act as a senior strategist. Listen to my current situation and help me find the ONE most important action I can take today. Be blunt but helpful."
                </div>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex w-full ${msg.role === 'user' ? 'flex-col items-end max-w-lg' : 'items-start space-x-5'}`}>
                {msg.role === 'model' && <SparkleIcon />}
                <div className={`text-xl md:text-2xl leading-relaxed font-light tracking-tight text-reveal ${msg.role === 'user' ? 'text-gray-400 italic text-right' : 'text-[#444444] serif'}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start space-x-5 animate-pulse">
              <SparkleIcon />
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-300 mt-2.5">Refining thought...</p>
            </div>
          )}

          {showExplanation && (
            <div className="pt-24 border-t border-gray-200/40 fade-in-up space-y-10">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500">Step 04 — The Insight</p>
                <h3 className="text-3xl font-light text-[#333333] leading-tight">It wasn't a trick.</h3>
                <p className="text-xl text-gray-500 font-light leading-relaxed">
                  You just learned a thinking pattern. It works for fitness, business, and every hard decision you face.
                </p>
              </div>
              <button 
                onClick={onFinish}
                className="px-12 py-5 bg-gray-900 text-white rounded-full font-medium text-lg hover:scale-[1.02] transition-all"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>

      {!showExplanation && (
        <footer className="p-8 pb-12 bg-[#F7F7F2] absolute bottom-0 left-0 right-0">
          <div className="max-w-2xl mx-auto">
            <div className="relative group flex items-end space-x-4 border-b border-gray-200/60 transition-all focus-within:border-indigo-400 pb-3">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
                placeholder="Share your situation..."
                className="flex-grow bg-transparent py-4 text-xl font-light outline-none disabled:opacity-30 placeholder:text-gray-200 text-[#444444]"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="text-gray-200 hover:text-indigo-400 transition-colors pb-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default WorkshopView;
