
import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";

const getApiKey = () => {
  const key = process.env.API_KEY || '';
  if (!key || key === 'PLACEHOLDER_API_KEY') {
    throw new Error("Invalid or missing API Key. Please check .env.local");
  }
  return key;
};

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

export const getGeminiResponse = async (
  prompt: string,
  mode: 'thinking' | 'fast' | 'lite' | 'maps' | 'search' = 'search',
  image?: string
) => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });
  let modelName = 'gemini-3-flash-preview';
  let config: any = {
    systemInstruction: SYSTEM_INSTRUCTION
  };

  if (mode === 'thinking') {
    modelName = 'gemini-3-pro-preview';
    config.thinkingConfig = { thinkingBudget: 32768 };
  } else if (mode === 'lite') {
    modelName = 'gemini-2.5-flash-lite-latest';
  } else if (mode === 'maps') {
    modelName = 'gemini-2.5-flash';
    config.tools = [{ googleMaps: {} }];
  } else if (mode === 'search') {
    modelName = 'gemini-3-flash-preview';
    config.tools = [{ googleSearch: {} }];
  } else if (mode === 'fast') {
    modelName = 'gemini-3-flash-preview';
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
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const getFollowUpSuggestions = async (context: string) => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{
      parts: [{
        text: `Based on this conversation context: "${context}", generate 3 extremely short (max 5 words each) follow-up questions or actions that help the user think deeper. Return only a JSON array of strings.`
      }]
    }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (err) {
    console.error("Failed to parse suggestions", err);
    return ["Why does this matter?", "What is the next step?", "How can I simplify?"];
  }
};

export const generateImage = async (prompt: string, size: '1K' | '2K' | '4K' = '1K', aspectRatio: string = '1:1') => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      imageConfig: {
        aspectRatio,
        imageSize: size
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generateVideo = async (prompt: string, imageBase64: string) => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    image: {
      imageBytes: imageBase64.split(',')[1],
      mimeType: 'image/jpeg'
    },
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  return `${downloadLink}&key=${getApiKey()}`;
};

export const transcribeAudio = async (base64Audio: string, mimeType: string = 'audio/webm') => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{
      parts: [
        { text: "Transcribe this audio accurately. Only return the transcription." },
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Audio
          }
        }
      ]
    }]
  });
  return response.text;
};

export const decode = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const encode = (bytes: Uint8Array) => {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};
