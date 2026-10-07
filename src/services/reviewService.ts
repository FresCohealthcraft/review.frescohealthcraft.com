import { StarRating } from '../types';
import { generateDynamicSuggestions } from '../data/reviewSuggestions';

export async function fetchReviewSuggestions(
  rating: StarRating,
  excludeSuggestions: string[] = []
): Promise<{ suggestions: string[]; isAiGenerated: boolean }> {
  try {
    const controller = new AbortController();
    // Fast 1.8s timeout so the 30-second mobile review flow is never stalled
    const timeoutId = setTimeout(() => controller.abort(), 1800);

    const res = await fetch('/api/reviews/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, previous: excludeSuggestions }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.suggestions) && data.suggestions.length >= 4) {
        const cleanList = data.suggestions
          .map((s: string) => s.replace(/cold-pressed/gi, 'freshly crafted'))
          .filter((s: string) => Boolean(s && s.trim()));

        if (cleanList.length >= 4) {
          return {
            suggestions: cleanList.slice(0, 4),
            isAiGenerated: true,
          };
        }
      }
    }
  } catch (err) {
    console.warn('API fetch fell back to dynamic local generator:', err);
  }

  // Instant dynamic generator
  return {
    suggestions: generateDynamicSuggestions(rating, excludeSuggestions),
    isAiGenerated: false,
  };
}

