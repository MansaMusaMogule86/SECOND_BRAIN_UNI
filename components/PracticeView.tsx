import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse, transcribeAudio, getFollowUpSuggestions } from '../services/ai';
import { ChatMessage } from '../types';

interface PracticeViewProps {
  step: string;
  title: string;
  instruction: string;
  onNext: () => void;
  isFreeform?: boolean;
}

const SparkleIcon = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="flex-shrink-0 mt-1.5"
  >
    <svg className="w-5 h-5 text-indigo-500 gemini-sparkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3L14.5 9L21 11.5L14.5 14L12 21L9.5 14L3 11.5L9.5 9L12 3Z" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
    </svg>
  </motion.div>
);

const PracticeView: React.FC<PracticeViewProps> = ({ step, title, instruction, onNext, isFreeform = false }) => {
  // Session Survival: Rehydrate messages
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(`sb_messages_${step}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Persist messages
  useEffect(() => {
    localStorage.setItem(`sb_messages_${step}`, JSON.stringify(messages));
  }, [messages, step]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading, suggestions]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          setLoading(true);
          try {
            const transcription = await transcribeAudio(base64Audio, 'audio/webm');
            if (transcription) setInput(transcription.trim());
          } catch (err) { console.error("Transcription error", err); }
          finally { setLoading(false); }
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) { console.error("Error accessing microphone", err); }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  /* State for Wild Features */
  const [researchMode, setResearchMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const finalInput = textToSend || input;
    if ((!finalInput.trim() && !selectedImage) || loading) return;

    setSuggestions([]);
    setMessages(prev => [...prev, { role: 'user', text: finalInput, image: selectedImage || undefined }]);
    setInput('');
    setSelectedImage(null); // Clear image after send
    setLoading(true);
    setError(null);

    try {
      // Use 'search' mode if toggle is on, otherwise default 'thinking' (or 'fast' for simple)
      const mode = researchMode ? 'search' : 'thinking';

      const res = await getAIResponse(finalInput, mode, selectedImage || undefined);
      // If the provider returned strict text
      const modelText = typeof res === 'string' ? res : (res.text || "Insight generated.");

      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
      const newSuggestions = await getFollowUpSuggestions(`${finalInput} -> ${modelText}`);
      setSuggestions(newSuggestions);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please check your connection or API keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-theme-bg relative">
      {/* Deep Research Toggle (Top Right) */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setResearchMode(!researchMode)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-500 ${researchMode ? 'bg-indigo-900/40 border-indigo-500 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-transparent border-theme-border text-theme-muted hover:border-theme-main'}`}
        >
          <div className={`w-2 h-2 rounded-full ${researchMode ? 'bg-indigo-400 animate-pulse' : 'bg-theme-muted'}`} />
          <span className="text-xs uppercase tracking-widest font-bold">Deep Research</span>
        </button>
      </div>
      <div ref={scrollRef} className="flex-grow overflow-y-auto px-6 pt-32 pb-64 no-scrollbar">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto space-y-20"
        >
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 opacity-60">Step {step} — {title}</p>
              <h2 className="text-3xl font-light text-theme-main leading-tight serif">{instruction}</h2>
            </motion.div>
          </div>

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex w-full ${msg.role === 'user' ? 'flex-col items-end' : 'items-start space-x-5'}`}>
                    {msg.role === 'model' && <SparkleIcon />}
                    <div className={`text-xl font-light tracking-tight leading-relaxed max-w-[90%] ${msg.role === 'user' ? 'text-theme-muted italic text-right' : 'text-theme-main serif'}`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start space-x-5"
            >
              <SparkleIcon />
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-theme-muted mt-2.5 animate-pulse">Thinking...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {!loading && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-2 pt-4"
            >
              <div className="w-full mb-2">
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-indigo-500/60">Suggested thinking paths:</p>
              </div>
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="px-4 py-2 text-sm bg-theme-card border border-indigo-500/20 text-theme-muted rounded-full hover:border-indigo-500/50 hover:text-theme-main transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}

          {messages.some(m => m.role === 'model') && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-12 text-center"
            >
              <button
                onClick={onNext}
                className="px-12 py-5 bg-theme-main text-theme-bg rounded-full font-medium text-lg shadow-lg hover:scale-[1.02] transition-transform"
              >
                Continue the Journey
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <footer className="p-8 pb-12 fixed bottom-0 left-0 right-0 bg-gradient-to-t from-theme-bg via-theme-bg to-transparent z-50">
        <div className="max-w-2xl mx-auto space-y-4">

          {selectedImage && (
            <div className="relative inline-block">
              <img src={selectedImage} alt="Preview" className="h-16 w-16 object-cover rounded-xl border border-indigo-500/30" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-theme-bg border border-theme-border rounded-full p-1 text-theme-muted hover:text-red-400"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}

          <div className="relative group flex items-end space-x-4 border-b border-theme-border transition-all focus-within:border-indigo-400 pb-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
              placeholder={isFreeform ? (researchMode ? "Ask deeper questions..." : "Ask something real...") : "Paste instruction here..."}
              className="flex-grow bg-transparent py-4 text-xl font-light outline-none disabled:opacity-30 placeholder:text-theme-muted text-theme-main"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              title="Upload Image"
              className="text-theme-muted hover:text-indigo-400 transition-colors pb-4"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={loading}
              title={isRecording ? "Stop recording" : "Record voice"}
              className={`${isRecording ? 'text-red-500 animate-pulse scale-110' : 'text-theme-muted hover:text-indigo-400'} transition-all pb-4`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            <button
              onClick={() => handleSend()}
              disabled={loading || (!input.trim() && !selectedImage)}
              title="Send message"
              className="text-theme-muted hover:text-indigo-400 transition-colors pb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PracticeView;
