import React from 'react';
import { Star, RefreshCw, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { StarRating } from '../types';

interface ScreenSuggestionsProps {
  rating: StarRating;
  suggestions: string[];
  selectedIndex: number | null;
  isLoadingMore: boolean;
  onSelectIndex: (index: number) => void;
  onGenerateMore: () => void;
  onChangeRating: () => void;
}

export const ScreenSuggestions: React.FC<ScreenSuggestionsProps> = ({
  rating,
  suggestions,
  selectedIndex,
  isLoadingMore,
  onSelectIndex,
  onGenerateMore,
  onChangeRating,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex flex-col justify-between px-4 sm:px-5 py-4"
    >
      <div>
        {/* Rating context badge */}
        <div className="flex items-center justify-between mb-3 bg-stone-100/80 rounded-xl px-3.5 py-2 border border-stone-200/50">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-stone-500">Your Rating:</span>
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-stone-700 ml-1">
              {rating}/5
            </span>
          </div>

          <button
            type="button"
            onClick={onChangeRating}
            className="text-xs font-medium text-emerald-700 hover:text-emerald-800 underline underline-offset-2 min-h-[36px] flex items-center px-1 cursor-pointer"
          >
            Change
          </button>
        </div>

        {/* Heading */}
        <div className="text-center mt-1 mb-3">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            ✨ Your experience, beautifully expressed
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Tap a suggestion below to personalize & copy:
          </p>
        </div>

        {/* EXACTLY 4 Review Suggestions */}
        <div className="space-y-2.5 my-3" role="radiogroup" aria-label="Review suggestions">
          {suggestions.slice(0, 4).map((text, idx) => {
            const isSelected = selectedIndex === idx;

            return (
              <button
                key={idx}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectIndex(idx)}
                className="w-full text-left p-3.5 sm:p-4 rounded-xl transition-all duration-150 relative cursor-pointer min-h-[64px] flex items-center justify-between gap-3 bg-white border border-stone-200/90 hover:border-emerald-500 hover:bg-emerald-50/20 active:scale-[0.99] shadow-2xs group"
              >
                {/* Review Text */}
                <p className="text-xs sm:text-sm leading-relaxed text-stone-800 font-normal flex-1">
                  "{text}"
                </p>

                {/* Tap to edit affordance */}
                <div className="shrink-0 w-7 h-7 rounded-full bg-stone-100 group-hover:bg-emerald-100 group-hover:text-emerald-800 text-stone-400 flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Zone: Visible "🔄 Generate More" Button */}
      <div className="pt-3 pb-1 space-y-2 border-t border-stone-200/60 mt-2">
        <button
          type="button"
          onClick={onGenerateMore}
          disabled={isLoadingMore}
          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 active:scale-[0.99] text-stone-800 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all focus-visible:outline-emerald-600 shadow-2xs cursor-pointer"
        >
          <RefreshCw
            className={`w-4 h-4 text-emerald-700 ${
              isLoadingMore ? 'animate-spin' : ''
            }`}
          />
          <span>{isLoadingMore ? 'Generating 4 new suggestions...' : '🔄 Generate More'}</span>
        </button>

        <p className="text-[11px] text-center text-stone-400 font-normal">
          Tap any of the 4 reviews above to edit & continue to Google
        </p>
      </div>
    </motion.div>
  );
};
