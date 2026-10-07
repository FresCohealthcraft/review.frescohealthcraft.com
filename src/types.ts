export type StarRating = 1 | 2 | 3 | 4 | 5;

export type AppScreen = 'review' | 'finish' | 'qr';

export interface ReviewSuggestion {
  id: string;
  text: string;
  category?: string;
}

export const GOOGLE_REVIEW_URL = 'https://g.page/r/CVewo3-XeCgfEBM/review';

// Deployed site URL for QR Code (Always use this, not the AI Studio preview URL)
export const DEPLOYED_SITE_URL = 'https://review.frescohealthcraft.com';

export const BRAND = {
  name: 'Fresco Healthcraft',
  tagline: 'Crafting Wellness, Nurturing Life',
  poweredBy: 'Fresco Healthcraft',
  phone: '8983363146',
  website: 'frescohealthcraft.com',
  instagram: 'fresco_healthcraft',
};
