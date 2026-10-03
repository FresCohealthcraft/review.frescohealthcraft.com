import { StarRating } from '../types';

/**
 * Curated, natural review suggestions categorized strictly by star rating.
 * IMPORTANT AI RULES:
 * - STRICTLY NO use of the phrase "cold-pressed".
 * - Do not invent specific products.
 * - Do not invent prices.
 * - Do not invent delivery details.
 * - Do not invent health benefits.
 * - Do not claim things the customer did not provide.
 * - Keep suggestions short, natural and editable.
 */

export const BASE_REVIEWS_BY_RATING: Record<StarRating, string[]> = {
  5: [
    'Absolutely loved my experience with Fresco Healthcraft! Fresh, tasty and beautifully prepared. 💚',
    'Fresh, healthy and delicious! Really happy with the overall experience. ✨',
    'Such a lovely experience at Fresco Healthcraft. Loved the freshness and taste! 🌿',
    'Great experience at Fresco Healthcraft. Would love to visit/order again! 💚',
    'Top-notch quality and genuinely fresh taste. Everything felt pure and well crafted. ✨',
    'Incredible freshness and lovely atmosphere! Fresco Healthcraft truly crafts wellness with care. 🌱',
    'Clean, refreshing flavors and warm service. Really impressed by the standard here! 💚',
    'Wonderful experience from start to finish. Everything tasted vibrant and super fresh. 🌿',
    'So happy to have found Fresco Healthcraft! Pure, honest wellness made fresh. Highly recommend! 🌟',
    'Loved every bit of my experience today. Wholesome, refreshing, and beautifully prepared! 💚',
    'Everything was spot-on. Fresh ingredients, welcoming staff, and fantastic quality all around. ✨',
    'A fantastic spot for mindful wellness. Fresh, delicious, and made with genuine care! 🌿',
    'Exceptional quality and pristine freshness! Fresco Healthcraft has won me over. 💚',
    'Really satisfied with my experience! The quality and freshness speak for themselves. ✨',
  ],
  4: [
    'Really enjoyed my experience with Fresco Healthcraft! Fresh, healthy and very well put together. 🌿',
    'Great quality and wonderful freshness. Staff was courteous and the overall vibe was lovely. ✨',
    'Wholesome and fresh experience at Fresco Healthcraft. Truly appreciate the quality! 💚',
    'A delightful wellness stop. Everything tasted clean and fresh, definitely worth visiting! 👍',
    'Very good experience overall. Great focus on pure ingredients and attentive service. 🌱',
    'Loved the refreshing flavors and neat presentation. Just a tiny wait, but well worth it! ✨',
    'Solid 4-star experience! Fresh, vibrant, and clean preparation. Will recommend to friends. 🌿',
    'Enjoyed the wholesome quality at Fresco Healthcraft. Fresh flavors and welcoming ambiance. 👍',
    'Good, fresh offerings and courteous service. A reliable place for clean wellness! ✨',
    'Pleasantly surprised by the freshness and taste. Service was friendly, would come again! 🌿',
  ],
  3: [
    'A pleasant experience overall. Good freshness, though there is still some room to improve in service speed.',
    'Decent visit to Fresco Healthcraft. Satisfactory quality, and with a little more consistency it will be great.',
    'Fair experience today. The flavors were okay, but looking forward to seeing better consistency next time.',
    'Good concept and clean atmosphere, with room for improvement in overall turnaround.',
    'Reasonable quality and friendly staff. Hoping for a slightly smoother service during peak hours.',
    'An okay wellness experience. Fresh ingredients, but felt the overall service could be elevated.',
    'Decent quality overall, though I felt the preparation could be a little faster.',
    'Average visit today. Good potential and neat space, but hoping for a more seamless experience next time.',
  ],
  2: [
    'Decent concept and potential, but the overall experience felt a bit inconsistent today. Room for improvement on service.',
    'Average experience this time. A few areas in service and preparation could definitely be smoother and more attentive.',
    'Appreciate what Fresco Healthcraft stands for, but today’s experience fell short of expectations. Hoping to see improvements.',
    'Mixed feelings about my visit today. Good potential, but service speed and attention to detail need refinement.',
    'The visit was rather underwhelming today. Hope the management looks into improving waiting times and consistency.',
    'Found the service a bit slow and inconsistent today. Hoping to see noticeable improvements in the future.',
  ],
  1: [
    'Unfortunately had an unsatisfactory experience with my visit today. I hope customer care can look into this and improve.',
    'The experience was not up to expectations today. Sharing this feedback with the hope quality and service get improved.',
    'Hoping Fresco Healthcraft can improve their service and consistency based on my recent visit.',
    'Found the recent experience lacking in timeliness and overall service quality. Hoping for better attention to detail next time.',
    'Disappointed with the experience today. Constructive feedback in hopes of seeing tangible improvements.',
    'Encountered several issues with service delays and attentiveness today. Hope management addresses this.',
  ],
};

// Generative templates for dynamic variations without inventing facts
const OPENINGS: Record<StarRating, string[]> = {
  5: [
    'Absolutely loved my visit to Fresco Healthcraft!',
    'Outstanding experience with Fresco Healthcraft today!',
    'Such a delightful and uplifting experience at Fresco Healthcraft!',
    'Really blown away by the freshness at Fresco Healthcraft!',
    'Always a wonderful experience at Fresco Healthcraft!',
    'Truly exceptional experience with Fresco Healthcraft!',
  ],
  4: [
    'Very pleasant experience at Fresco Healthcraft.',
    'Really enjoyed my visit to Fresco Healthcraft today.',
    'Great quality and nice experience at Fresco Healthcraft.',
    'Good, wholesome experience with Fresco Healthcraft overall.',
    'Had a very positive experience at Fresco Healthcraft.',
  ],
  3: [
    'Decent experience at Fresco Healthcraft today.',
    'Fair visit to Fresco Healthcraft overall.',
    'An okay experience at Fresco Healthcraft.',
    'Mixed experience at Fresco Healthcraft today.',
  ],
  2: [
    'Rather underwhelming experience at Fresco Healthcraft today.',
    'A few hiccups during my experience at Fresco Healthcraft.',
    'Felt that my visit to Fresco Healthcraft today fell short.',
    'The experience at Fresco Healthcraft was inconsistent today.',
  ],
  1: [
    'Unfortunately had a disappointing experience at Fresco Healthcraft.',
    'The experience at Fresco Healthcraft was not satisfactory today.',
    'Disappointed with how things went at Fresco Healthcraft today.',
    'Sharing constructive feedback about my recent visit to Fresco Healthcraft.',
  ],
};

const MIDDLES: Record<StarRating, string[]> = {
  5: [
    'Everything was incredibly fresh, tasty and prepared with immense care.',
    'The quality of ingredients and clean preparation really stand out.',
    'Loved how refreshing and delicious everything tasted.',
    'Fresh flavors, spotless cleanliness, and welcoming staff all around.',
    'Super fresh, wholesome, and beautifully put together.',
  ],
  4: [
    'Fresh flavors and neat preparation throughout.',
    'Quality is definitely there, and staff was very polite.',
    'Clean flavors and a great wellness atmosphere.',
    'Fresh ingredients and lovely presentation, just a small wait.',
  ],
  3: [
    'The ingredients were fine, but service turnaround could be faster.',
    'Decent taste, though consistency could be improved.',
    'Clean atmosphere, but order turnaround felt a bit slow.',
  ],
  2: [
    'Service speed was lacking and the preparation felt rushed.',
    'Good concept, but the execution and waiting time need attention.',
    'Felt that attention to detail and customer care could be much better.',
  ],
  1: [
    'Encountered excessive waiting time and poor service coordination.',
    'Service was unhelpful and the overall quality was not up to standard.',
    'Felt completely overlooked and turnaround was far too long.',
  ],
};

const CLOSINGS: Record<StarRating, string[]> = {
  5: [
    'Will definitely be coming back! 💚',
    'Highly recommend to anyone who values clean wellness! 🌿',
    'Would love to visit/order again! ✨',
    'Truly crafts wellness with heart! 💚',
    'Keep up the fantastic standard! 🌱',
  ],
  4: [
    'Will gladly come back again! 🌿',
    'Definitely worth checking out. ✨',
    'Recommended for fresh wellness! 👍',
    'Looking forward to my next visit! 🌿',
  ],
  3: [
    'Hoping to see smoother service next time.',
    'Room for improvement, but has good potential.',
    'With more consistency it could be much better.',
  ],
  2: [
    'Hope management takes note and improves service consistency.',
    'Hoping the team addresses these service bottlenecks.',
    'Room for substantial improvement in service delivery.',
  ],
  1: [
    'I hope customer service reaches out and improves on this.',
    'Sharing in hopes that quality and attention to detail get fixed.',
    'Hope management investigates and corrects these issues.',
  ],
};

/**
 * Generates EXACTLY 4 fresh, natural variations for the given rating.
 * Avoids returning the exact same set as previousSuggestions.
 */
export function generateDynamicSuggestions(
  rating: StarRating,
  excludeSuggestions: string[] = []
): string[] {
  const basePool = [...BASE_REVIEWS_BY_RATING[rating]];
  const excludeSet = new Set(excludeSuggestions);

  // Filter out any recently displayed reviews if possible
  let available = basePool.filter((item) => !excludeSet.has(item));
  if (available.length < 4) {
    available = basePool;
  }

  // Shuffle available
  const shuffledBase = [...available].sort(() => Math.random() - 0.5);

  const results: string[] = [];

  // Take 2-3 from curated base
  const countFromBase = Math.min(shuffledBase.length, Math.random() > 0.5 ? 2 : 3);
  for (let i = 0; i < countFromBase && results.length < 4; i++) {
    if (!results.includes(shuffledBase[i])) {
      results.push(shuffledBase[i]);
    }
  }

  // Generate dynamic combinations to ensure natural variations
  const openings = OPENINGS[rating];
  const middles = MIDDLES[rating];
  const closings = CLOSINGS[rating];

  let attempts = 0;
  while (results.length < 4 && attempts < 25) {
    attempts++;
    const op = openings[Math.floor(Math.random() * openings.length)];
    const mid = middles[Math.floor(Math.random() * middles.length)];
    const cl = closings[Math.floor(Math.random() * closings.length)];
    const candidate = `${op} ${mid} ${cl}`;

    if (!results.includes(candidate) && !excludeSet.has(candidate)) {
      results.push(candidate);
    }
  }

  // Fallback to fill up to exactly 4 if needed
  for (const item of basePool) {
    if (results.length >= 4) break;
    if (!results.includes(item)) {
      results.push(item);
    }
  }

  // Strict safety check: ensure no phrase "cold-pressed" is ever present
  return results.slice(0, 4).map((s) => s.replace(/cold-pressed/gi, 'freshly crafted'));
}
