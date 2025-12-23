
import React from 'react';

const StrategyDashboard: React.FC = () => {
  const sections = [
    {
      title: "1. The Full Upsell Strategy",
      content: [
        "Introduction: The upsell is introduced AFTER the user gets their 'One Clear Win' in the Clarity Session. We wait for the dopamine hit of success before showing the bridge to continuity.",
        "Belief Creation: Belief is built through the interactive workshop. By showing them Gemini 3 Pro's deep thinking capabilities on THEIR OWN problem, we prove the tech works.",
        "The Reveal: We reveal the gap by asking: 'What happens tomorrow when I'm not here to guide you?'. The gap is consistency, not more features."
      ]
    },
    {
      title: "2. The Emotional Journey",
      content: [
        "Phase 1: Curiosity (Landing). The 'Think First' promise creates intrigue.",
        "Phase 2: Empowerment (Workshop). The user feels smart, not the AI.",
        "Phase 3: Realization (Upsell Start). The realization that tools are useless without a habit system.",
        "Phase 4: Confidence (Offer). The system feels like the inevitable next step for a high-performing life."
      ]
    },
    {
      title: "3. $497 Positioning",
      content: [
        "What it solves: It solves 'Random Thinking Syndrome'.",
        "Why $497: We aren't selling a course; we are selling 30 days of regained time and a lifetime thinking partner. It's a high ROI investment on cognitive capacity.",
        "Not for everyone: This is for builders, leaders, and parents who value clarity over noise. It's not for prompt-hackers."
      ]
    },
    {
      title: "4. The Language of the Moment",
      content: [
        "Direct: 'You don't need another AI tool. You need a system that works when you're tired.'",
        "Human: 'We built this for people who want to spend more time living and less time prompt-engineering.'",
        "Non-pushy: 'If you're happy with today's win, that's enough. But if you want this clarity every day, join us.'"
      ]
    },
    {
      title: "5. Premium & Special Feel",
      content: [
        "No Hype: Use minimalist black/white/indigo aesthetics. No flashy banners.",
        "Deep Tech: Using Gemini 3 Pro with thinking mode makes the experience feel advanced and substantial compared to standard chatbots.",
        "Personal Safety: Emphasize that the Second Brain is their private thinking space."
      ]
    },
    {
      title: "6. What NOT To Do",
      content: [
        "No False Scarcity: No 'Only 3 spots left' timers. It breaks trust.",
        "No Income Claims: Never say 'Make $10k with AI'. It feels scammy.",
        "No Overwhelm: Don't show a 50-module curriculum. Show a 1-page system."
      ]
    },
    {
      title: "7. Execution Checklist",
      content: [
        "Before Session: Ensure API keys are active. Warm up the 'Think First' framework in pre-call emails.",
        "During Session: Live demo of the workshop. Let them click the buttons. Encourage the 'One Win'.",
        "After Session: Immediate access to the 30-day thinking guide via email. No friction."
      ]
    }
  ];

  return (
    <div className="flex-grow bg-gray-900 text-gray-100 p-8 md:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-bold border-b border-gray-800 pb-4 mb-2">Second Brain Product Strategy</h1>
          <p className="text-gray-400">Senior Strategist Execution Plan • $497 Upsell Flow</p>
        </header>

        {sections.map((sec, i) => (
          <section key={i} className="space-y-4">
            <h2 className="text-2xl font-semibold text-indigo-400">{sec.title}</h2>
            <ul className="space-y-4">
              {sec.content.map((item, j) => (
                <li key={j} className="flex space-x-3 text-gray-300">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700">
          <p className="text-sm italic text-gray-400">
            "Execution is the only differentiator. This system is designed to create a premium, calm environment where the user feels empowered to invest in themselves."
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrategyDashboard;
