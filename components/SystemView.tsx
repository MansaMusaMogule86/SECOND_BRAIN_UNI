
import React, { useState } from 'react';

const DAYS = [
  { day: 1, situation: "You are feeling overwhelmed with a large task.", ask: "Ask ChatGPT to break this specific task into three tiny steps that take less than five minutes each.", why: "This removes the paralysis of starting by making the first move invisible." },
  { day: 2, situation: "You need to write a sensitive or difficult email.", ask: "Paste your draft and ask ChatGPT if the tone sounds defensive or unclear to a stranger.", why: "This provides an objective mirror for your communication before you hit send." },
  { day: 3, situation: "You are struggling to understand a complex or technical concept.", ask: "Ask ChatGPT to explain the concept using a simple analogy involving a household object.", why: "Analogies bridge the gap between what you know and what you are trying to learn." },
  { day: 4, situation: "You have a long list of tasks and do not know where to begin.", ask: "Provide the list and ask ChatGPT which task will make the others easier or unnecessary.", why: "This forces you to identify leverage rather than just being busy." },
  { day: 5, situation: "You need to buy a gift but have no ideas.", ask: "Describe the person and ask ChatGPT for three gifts that solve a specific problem they have.", why: "Thinking about problems rather than objects leads to more meaningful choices." },
  { day: 6, situation: "You are reading a long article or document.", ask: "Paste the text and ask ChatGPT for the three most controversial or surprising points.", why: "This helps you find the signal in the noise quickly." },
  { day: 7, situation: "You have a theory or an idea you are unsure about.", ask: "Ask ChatGPT to find the biggest flaw in your logic and suggest how to fix it.", why: "Testing your ideas early prevents wasted effort on bad assumptions." },
  { day: 8, situation: "You are starting a new project at work.", ask: "Ask ChatGPT what the three most important questions are that you should ask your manager to ensure success.", why: "Asking the right questions early defines the boundaries of the project." },
  { day: 9, situation: "You are preparing for a high stakes meeting.", ask: "Ask ChatGPT to roleplay as a skeptical participant and ask you one difficult question about your topic.", why: "Preparation comes from anticipating resistance, not just rehearsing your speech." },
  { day: 10, situation: "You are using a new piece of software or a tool.", ask: "Ask ChatGPT for the three most common mistakes beginners make when using this tool.", why: "Learning what to avoid is faster than learning every single feature." },
  { day: 11, situation: "You are comparing two products to buy.", ask: "Ask ChatGPT to compare them based on long term durability rather than price or features.", why: "Focusing on longevity changes how you value your money." },
  { day: 12, situation: "You are writing a report or a presentation.", ask: "Ask ChatGPT to create an outline that focuses entirely on the solution rather than the problem.", why: "Starting with the end in mind keeps your audience engaged." },
  { day: 13, situation: "You are planning a trip to a new city.", ask: "Ask ChatGPT for three locations that are significant to locals but ignored by tourists.", why: "Real experiences happen where the crowds are not." },
  { day: 14, situation: "You want to improve a specific personal skill.", ask: "Ask ChatGPT for a ten minute daily practice routine that focuses on the fundamentals of that skill.", why: "Consistency on basics beats intensity on advanced techniques." },
  { day: 15, situation: "You are in a minor disagreement with someone.", ask: "Ask ChatGPT how to explain your side using only facts and no emotional language.", why: "Neutral language deescalates conflict and leads to faster resolution." },
  { day: 16, situation: "You received an answer that feels too generic.", ask: "Tell ChatGPT the answer is too vague and ask for a specific example from real life history.", why: "Forcing specificity turns information into usable knowledge." },
  { day: 17, situation: "You think the AI gave you a wrong or incomplete answer.", ask: "Explain why you disagree and ask the AI to re-evaluate its logic based on your feedback.", why: "Challenging the AI strengthens your own critical thinking and the quality of the output." },
  { day: 18, situation: "You are looking at a problem from only one angle.", ask: "Ask ChatGPT to describe the opposite approach and why it might actually be more effective.", why: "Considering the reverse prevents narrow thinking and reveals hidden opportunities." },
  { day: 19, situation: "You are making a big life decision.", ask: "Ask ChatGPT if there are any hidden assumptions in your current plan that you are not seeing.", why: "Identifying blind spots is the first step toward making a sound decision." },
  { day: 20, situation: "You have a draft that is too long.", ask: "Ask ChatGPT to remove 30 percent of the words without losing the core message.", why: "Brevity is a sign of clear thinking and respect for the reader." },
  { day: 21, situation: "You want to think deeper about a specific topic.", ask: "Ask ChatGPT to ask you one question that will force you to clarify your own thinking.", why: "The best use of AI is not getting answers but being asked the right questions." },
  { day: 22, situation: "You are testing a new strategy.", ask: "Ask ChatGPT to list three things that could go wrong if you implement this strategy today.", why: "Anticipating failure allows you to build a more resilient plan." },
  { day: 23, situation: "You have two separate ideas that do not seem to fit.", ask: "Ask ChatGPT to find a common thread that links these two ideas into one strategy.", why: "Synthesis is the highest form of creativity." },
  { day: 24, situation: "You are choosing between two good options.", ask: "Explain your long term goal and ask ChatGPT which option aligns better with that specific goal.", why: "Decisions should be based on where you are going, not where you are now." },
  { day: 25, situation: "You are starting your morning.", ask: "Tell ChatGPT your main goal for the day and ask what the one most impactful action is.", why: "Focusing on impact prevents the day from being lost to small distractions." },
  { day: 26, situation: "You are finishing your workday.", ask: "List what you accomplished and ask ChatGPT to suggest one small improvement for tomorrow.", why: "Incremental progress is the only way to achieve long term mastery." },
  { day: 27, situation: "You need to solve a problem with limited resources.", ask: "Ask ChatGPT for a solution that does not require spending any money or hiring anyone.", why: "Constraints force you to find creative ways to use what you already have." },
  { day: 28, situation: "You are explaining a complex idea to someone else.", ask: "Ask ChatGPT how to explain it to someone who has no background in the subject.", why: "If you cannot explain it simply, you do not understand it well enough." },
  { day: 29, situation: "You are about to have a difficult conversation.", ask: "Predict how the other person might react and ask ChatGPT for a calm way to respond to that reaction.", why: "Rehearsing the emotional outcome keeps you in control of the conversation." },
  { day: 30, situation: "You want a permanent thinking partner.", ask: "Tell ChatGPT to always challenge your first idea with a better alternative before it agrees with you.", why: "This ensures you never settle for your first, easiest thought." }
];

const SystemView: React.FC = () => {
  const [currentDayIdx, setCurrentDayIdx] = useState(0);
  const current = DAYS[currentDayIdx];

  return (
    <div className="min-h-screen bg-theme-bg py-24 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-16 fade-in-up">
        <div className="flex items-center justify-between border-b border-theme-border pb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-400">Day {current.day} of 30</p>
          <div className="flex space-x-6">
            {currentDayIdx > 0 && (
              <button onClick={() => setCurrentDayIdx(i => i - 1)} className="text-[10px] font-bold uppercase tracking-widest text-theme-muted hover:text-theme-main transition-colors">Prev</button>
            )}
            {currentDayIdx < DAYS.length - 1 && (
              <button onClick={() => setCurrentDayIdx(i => i + 1)} className="text-[10px] font-bold uppercase tracking-widest text-theme-muted hover:text-theme-main transition-colors">Next</button>
            )}
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-[9px] uppercase tracking-[0.3em] font-bold text-theme-muted">Situation</h3>
            <p className="text-3xl font-light text-theme-main leading-tight serif">{current.situation}</p>
          </div>

          <div className="p-12 bg-theme-card border border-theme-border rounded-[2.5rem] space-y-6 shadow-sm shadow-black/5">
            <h3 className="text-[9px] uppercase tracking-[0.3em] font-bold text-indigo-400">The Ask</h3>
            <p className="text-xl text-theme-main font-light leading-relaxed italic">
              "{current.ask}"
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[9px] uppercase tracking-[0.3em] font-bold text-theme-muted">The Why</h3>
            <p className="text-lg text-theme-muted font-light leading-relaxed">{current.why}</p>
          </div>

          <div className="pt-16 text-center">
            <div className="w-1 h-1 bg-theme-border rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemView;
