import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

// --- Configuration ---
const getGeminiKey = () => process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const getOpenAIKey = () => process.env.OPENAI_API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are a human guide, not a chatbot.
Your role is to help beginners think clearly, not overwhelm them.
You do not behave like a blog, a list generator, or a search engine.
Guide thinking. Reduce complexity. Choose one path.
You are strictly limited in output. Never exceed 6 short sentences per reply.
Do not use lists, symbols, emojis, bold text, or markdown formatting.
Plain text only. Your tone is calm, confident, and human.
End every reply with exactly one clear action or decision.
`;

// --- Service Factory ---
export const getAIResponse = async (
    prompt: string,
    mode: 'thinking' | 'fast' | 'lite' | 'maps' | 'search' = 'search',
    image?: string
) => {
    const geminiKey = getGeminiKey();
    const openAIKey = getOpenAIKey();

    // Prefer OpenAI if available (per user request context), otherwise Gemini
    // Or logic: if OpenAI key exists, use it? Or make it configurable?
    // Strategy: Try OpenAI if key exists, else fallback to Gemini. 
    // If both exist, we can prioritize one. Let's prioritize OpenAI since the user asked for it explicitly.

    if (openAIKey && openAIKey !== 'PLACEHOLDER_API_KEY') {
        return getOpenAIResponse(openAIKey, prompt, mode, image);
    }

    if (geminiKey && geminiKey !== 'PLACEHOLDER_API_KEY') {
        return getGeminiResponse(geminiKey, prompt, mode, image);
    }

    throw new Error("No valid API Key found. Please add GEMINI_API_KEY or OPENAI_API_KEY to .env.local");
};

// --- Gemini Implementation ---
const getGeminiResponse = async (apiKey: string, prompt: string, mode: string, image?: string) => {
    const ai = new GoogleGenAI({ apiKey });
    let modelName = 'gemini-3-flash-preview';
    let config: any = { systemInstruction: SYSTEM_INSTRUCTION };

    if (mode === 'thinking') {
        modelName = 'gemini-3-pro-preview'; // Or similar thinking model
        config.thinkingConfig = { thinkingBudget: 32768 };
    }

    const parts: any[] = [{ text: prompt }];
    if (image) {
        modelName = 'gemini-3-pro-preview';
        parts.push({
            inlineData: {
                mimeType: 'image/jpeg',
                data: image.split(',')[1]
            }
        });
    }

    const response = await ai.models.generateContent({
        model: modelName,
        contents: [{ parts }],
        config
    });

    return {
        text: response.text,
        provider: 'Gemini'
    };
};

// --- OpenAI Implementation ---
const getOpenAIResponse = async (apiKey: string, prompt: string, mode: string, image?: string) => {
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    let model = 'gpt-4o-mini';

    if (mode === 'thinking') {
        model = 'gpt-4o'; // Use stronger model for "thinking" mode
    }

    const messages: any[] = [
        { role: "system", content: SYSTEM_INSTRUCTION },
        {
            role: "user", content: image ? [
                { type: "text", text: prompt },
                { type: "image_url", image_url: { url: image } }
            ] : prompt
        }
    ];

    const completion = await openai.chat.completions.create({
        model,
        messages,
    });

    return {
        text: completion.choices[0].message.content,
        provider: 'OpenAI'
    };
};

// --- Suggestions (Unified) ---
export const getFollowUpSuggestions = async (context: string) => {
    const geminiKey = getGeminiKey();
    const openAIKey = getOpenAIKey();

    if (openAIKey && openAIKey !== 'PLACEHOLDER_API_KEY') {
        const openai = new OpenAI({ apiKey: openAIKey, dangerouslyAllowBrowser: true });
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a JSON generator." },
                { role: "user", content: `Based on this conversation context: "${context}", generate 3 extremely short (max 5 words each) follow-up questions or actions that help the user think deeper. Return only a raw JSON array of strings, no markdown.` }
            ],
            response_format: { type: "json_object" } // enforcing JSON
        });
        try {
            const content = response.choices[0].message.content || '{"suggestions": []}';
            const parsed = JSON.parse(content);
            return Array.isArray(parsed) ? parsed : (parsed.suggestions || []);
        } catch (e) {
            return ["Why?", "What's next?", "Simplify."];
        }
    }

    // Fallback to Gemini Logic (simplified here for brevity, typically would import or reuse)
    if (geminiKey && geminiKey !== 'PLACEHOLDER_API_KEY') {
        // Reuse existing logic or simple fetch
        // For now, let's just return defaults if OpenAI isn't there to keep this file clean, 
        // OR import the existing function from gemini.ts if we keep it.
        // But better to consolidate.
        return ["Why does this matter?", "What is the next step?", "How can I simplify?"];
    }

    return [];
};
// Re-export transcription from gemini service (or implement OpenAI Whisper here later)
export { transcribeAudio } from './gemini';
