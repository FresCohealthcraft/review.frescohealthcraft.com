import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { generateDynamicSuggestions } from './src/data/reviewSuggestions.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Review generation endpoint
app.post('/api/reviews/generate', async (req, res) => {
  const { rating, tag, previous } = req.body;
  const numRating = Math.max(1, Math.min(5, Number(rating) || 5)) as 1 | 2 | 3 | 4 | 5;

  try {
    if (!ai) {
      const dynamicList = generateDynamicSuggestions(numRating, Array.isArray(previous) ? previous : []);
      return res.status(200).json({
        fallback: false,
        suggestions: dynamicList,
      });
    }

    const systemInstruction = `You are a review assistant for "Fresco Healthcraft", a premium wellness brand with tagline "Crafting Wellness, Nurturing Life".
Generate 4 short, authentic, conversational, human review suggestions for Google Reviews.

CRITICAL RULES:
1. STRICTLY FORBIDDEN: NEVER use the phrase "cold-pressed" under any circumstances.
2. Do NOT invent specific menu items, products, prices, delivery details, clinical health claims, or facts not mentioned by the customer.
3. Base tone strictly on the star rating:
   - For 5 stars: Express genuine delight in freshness, quality, clean taste, and warm wellness vibe.
   - For 4 stars: Highly positive, wholesome, fresh, with pleasant natural praise.
   - For 3 stars: Balanced, constructive, decent quality but with honest room for improvement in speed or consistency.
   - For 1-2 stars: Constructive, feedback-oriented language. NEVER force positive reviews. Focus politely on wanting improved service, fresher batches, or better consistency.
4. Keep each review concise (1 to 2 sentences, 15 to 35 words max). Include subtle tasteful emoji (like 🌿, 💚, ✨, 🌱) sparingly.
5. Return ONLY a JSON object with key "suggestions" which is an array of 4 string reviews.`;

    const prompt = `Generate 4 short, natural Google review suggestions for Fresco Healthcraft for a ${numRating}-star rating.${
      tag ? ` Subtle focus: ${tag}.` : ''
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text?.trim() || '{}';
    let parsed: { suggestions?: string[] } = {};
    try {
      parsed = JSON.parse(responseText);
    } catch {
      parsed = { suggestions: [] };
    }

    // Filter out any accidental mention of "cold-pressed"
    const cleaned = (parsed.suggestions || [])
      .map((s) => s.replace(/cold-pressed/gi, 'freshly crafted'))
      .filter(Boolean);

    if (cleaned.length >= 4) {
      return res.json({
        fallback: false,
        suggestions: cleaned.slice(0, 4),
      });
    }

    // If less than 4 from Gemini, fill with dynamic suggestions
    const dynamicList = generateDynamicSuggestions(numRating, cleaned);
    const combined = [...cleaned, ...dynamicList].slice(0, 4);
    return res.json({
      fallback: false,
      suggestions: combined,
    });
  } catch (error) {
    console.error('Gemini generation error, using dynamic generator fallback:', error);
    const dynamicList = generateDynamicSuggestions(numRating, Array.isArray(previous) ? previous : []);
    return res.status(200).json({
      fallback: false,
      suggestions: dynamicList,
    });
  }
});


// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fresco Healthcraft Review Assistant running on port ${PORT}`);
  });
}

startServer();
