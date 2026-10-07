import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { StarRating } from '../types';

interface ScreenRatingProps {
  onSelectRating: (rating: StarRating) => void;
}

export const ScreenRating: React.FC<ScreenRatingProps> = ({ onSelectRating }) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const starLabels: Record<StarRating, string> = {
    1: 'Needs Improvement',
    2: 'Fair Experience',
    3: 'Good Experience',
    4: 'Great Experience',
    5: 'Exceptional Experience',
  };

  const activeRating = hoveredStar || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex flex-col justify-between px-5 py-6"
    >
      {/* Top Graphic / Decorative Nature Aura */}
      <div className="flex flex-col items-center text-center mt-2">
        <div className="w-16 h-16 mb-5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-xs">
          <span className="text-3xl" role="img" aria-label="green heart">
            💚
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-snug tracking-tight text-balance max-w-xs">
          How was your experience with Fresco Healthcraft?
        </h2>

        <p className="text-stone-500 text-sm mt-3 font-normal">
          Tap a star to rate your experience
        </p>
      </div>

      {/* Star Rating Interactive Group */}
      <div className="my-8 flex flex-col items-center">
        <div
          className="flex items-center justify-center gap-2 sm:gap-3 py-4 px-2"
          role="radiogroup"
          aria-label="Star rating selection"
        >
          {([1, 2, 3, 4, 5] as StarRating[]).map((starNum) => {
            const isHighlighted = (hoveredStar ?? 0) >= starNum;

            return (
              <button
                key={starNum}
                type="button"
                role="radio"
                aria-checked={false}
                aria-label={`${starNum} star${starNum > 1 ? 's' : ''} - ${starLabels[starNum]}`}
                onClick={() => onSelectRating(starNum)}
                onMouseEnter={() => setHoveredStar(starNum)}
                onMouseLeave={() => setHoveredStar(null)}
                className="group relative min-w-[56px] min-h-[56px] sm:min-w-[62px] sm:min-h-[62px] flex items-center justify-center rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:border-amber-400 hover:shadow-md active:scale-90 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-emerald-600 cursor-pointer"
              >
                <Star
                  className={`w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-150 group-hover:scale-110 ${
                    isHighlighted
                      ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                      : 'text-stone-300 group-hover:text-amber-300'
                  }`}
                />
                <span className="sr-only">{starNum} Stars</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Descriptive Feedback Label */}
        <div className="h-6 flex items-center justify-center mt-2">
          {activeRating ? (
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-200/60">
              {activeRating} ★ · {starLabels[activeRating as StarRating]}
            </span>
          ) : (
            <span className="text-xs text-stone-400">
              Select 1 to 5 stars to continue
            </span>
          )}
        </div>
      </div>

      {/* Trust & Speed Note */}
      <div className="text-center pt-4 pb-2 border-t border-stone-200/60">
        <p className="text-[12px] text-stone-500 leading-relaxed">
          Takes ~30 seconds · No sign-in required · You remain in full control
        </p>
      </div>
    </motion.div>
  );
};

