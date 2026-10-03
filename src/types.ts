export type StarRating = 1 | 2 | 3 | 4 | 5;

export type AppScreen = 'rating' | 'suggestions' | 'edit' | 'thankyou';

export interface ReviewSuggestion {
  id: string;
  text: string;
  category?: string;
}

export const GOOGLE_REVIEW_URL = 'https://g.page/r/CVewo3-XeCgfEBM/review';

export const BRAND = {
  name: 'Fresco Healthcraft',
  tagline: 'Crafting Wellness, Nurturing Life',
};
