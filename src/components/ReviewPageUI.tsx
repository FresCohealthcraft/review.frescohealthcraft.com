import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, QrCode, PenSquare, Lightbulb, Send, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StarRating, BRAND } from '../types';
import { copyTextToClipboard } from '../utils/clipboard';

interface ReviewPageUIProps {
  rating: StarRating;
  suggestions: string[];
  activeSuggestionIndex: number;
  customReviewText: string;
  onSelectRating: (rating: StarRating) => void;
  onNextSuggestion: () => void;
  onPrevSuggestion: () => void;
  onCustomTextChange: (text: string) => void;
  onReadyToReview: (finalText: string) => void;
  onOpenQR: () => void;
}

export const ReviewPageUI: React.FC<ReviewPageUIProps> = ({
  rating,
  suggestions,
  activeSuggestionIndex,
  customReviewText,
  onSelectRating,
  onNextSuggestion,
  onPrevSuggestion,
  onCustomTextChange,
  onReadyToReview,
  onOpenQR,
}) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const currentSuggestion = suggestions[activeSuggestionIndex] || suggestions[0] || '';

  // The review to be posted: custom text if typed, otherwise current suggestion
  const effectiveReviewText = (customReviewText.trim() || currentSuggestion.trim());
  const isReady = effectiveReviewText.length > 0;

  // Immediate synchronous copy on user tap
  const handleReadyClick = () => {
    if (!isReady) return;
    const textToCopy = effectiveReviewText;

    // IMMEDIATE synchronous clipboard copy on user tap gesture
    copyTextToClipboard(textToCopy);

    // Transition to Almost Done screen
    onReadyToReview(textToCopy);
  };

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-screen sm:min-h-[720px] flex flex-col justify-between p-4 sm:p-5 font-sans bg-[#FBFBF9] text-stone-900">
      {/* Main White Rounded Card (Matching Image 1: 1791255098391.png) */}
      <div className="w-full bg-white rounded-[32px] border border-stone-200/90 shadow-xl p-5 sm:p-6 my-auto flex flex-col gap-4">
        {/* Top Header: Brand Logo on Left, "Scan QR Standee →" Pill on Right */}
        <div className="flex items-center justify-between pb-1">
          {/* Brand Logo Lockup */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-0.5">
              <span className="font-serif-title font-bold text-2xl sm:text-[26px] text-[#13442A] tracking-tight leading-none">
                Fres<span className="relative">Co<span className="absolute -top-1.5 -right-2 text-xs">🍃</span></span>
              </span>
              <span className="text-[9px] font-sans text-stone-400 ml-1">™</span>
            </div>
            <div className="flex items-center gap-1.5 my-0.5">
              <div className="w-5 h-[1px] bg-stone-300" />
              <span className="text-[10px] font-bold tracking-[0.22em] text-[#13442A] uppercase">
                Healthcraft
              </span>
              <div className="w-5 h-[1px] bg-stone-300" />
            </div>
            <p className="text-[9px] text-stone-500 italic tracking-wider font-serif">
              Crafting wellness Nurturing life
            </p>
          </div>

          {/* Right Pill: "Scan QR Standee →" */}
          <button
            onClick={onOpenQR}
            type="button"
            className="px-3 py-1.5 rounded-full border border-stone-200 bg-[#F9F9F8] hover:bg-stone-100 transition-colors flex items-center gap-1.5 text-stone-700 text-[11px] font-medium shadow-2xs cursor-pointer group"
          >
            <QrCode className="w-3.5 h-3.5 text-stone-700" />
            <div className="flex flex-col text-left leading-tight">
              <span>Scan QR</span>
              <span className="text-[10px] text-stone-500 -mt-0.5">Standee</span>
            </div>
            <ArrowRight className="w-3 h-3 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Hero Title: "Share Your Experience ♡" */}
        <div className="text-center pt-1 pb-1">
          <h1 className="font-serif-title font-bold text-3xl sm:text-[34px] text-[#15462D] tracking-tight flex items-center justify-center gap-1.5 leading-tight">
            <span>Share Your</span>
          </h1>
          <div className="font-serif-title font-bold text-3xl sm:text-[34px] text-[#15462D] tracking-tight flex items-center justify-center gap-2 -mt-1">
            <span>Experience</span>
            <span className="text-2xl text-emerald-600 inline-block rotate-[-10deg]">💚</span>
            <span className="text-sm font-handwriting text-emerald-600 -ml-1">˗ˋˏ</span>
          </div>

          <p className="text-xs sm:text-[13px] text-stone-500 max-w-[300px] mx-auto mt-2 leading-relaxed">
            Your feedback helps us serve you better and keeps our wellness journey going!
          </p>
        </div>

        {/* Section 1: Rate Your Experience Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-2xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-[#3D7048] text-white flex items-center justify-center text-xs">
              ★
            </div>
            <h2 className="font-serif-title font-semibold text-base sm:text-[17px] text-[#15462D]">
              Rate Your Experience
            </h2>
          </div>

          {/* 5 Large Stars in Soft Circular Pods */}
          <div
            className="flex items-center justify-between px-1"
            role="radiogroup"
            aria-label="Star rating selection"
          >
            {([1, 2, 3, 4, 5] as StarRating[]).map((starNum) => {
              const isFilled = (hoveredStar ?? rating) >= starNum;

              return (
                <button
                  key={starNum}
                  type="button"
                  role="radio"
                  aria-checked={rating === starNum}
                  aria-label={`${starNum} stars`}
                  onClick={() => onSelectRating(starNum)}
                  onMouseEnter={() => setHoveredStar(starNum)}
                  onMouseLeave={() => setHoveredStar(null)}
                  className="w-12 h-12 rounded-full bg-[#F3F4F6] hover:bg-amber-50 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  <span
                    className={`text-2xl sm:text-[26px] leading-none transition-colors select-none ${
                      isFilled ? 'text-amber-400 drop-shadow-xs' : 'text-stone-300'
                    }`}
                  >
                    ★
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Write your review textarea Card */}
        <div className="bg-white rounded-2xl border border-stone-300/80 p-3.5 shadow-2xs relative">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#EBF5ED] text-[#2D6A4F] flex items-center justify-center shrink-0 mt-0.5">
              <PenSquare className="w-3.5 h-3.5" />
            </div>

            <textarea
              value={customReviewText}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  onCustomTextChange(e.target.value);
                }
              }}
              rows={3}
              placeholder="Write your review here in your own words..."
              className="w-full text-stone-800 text-xs sm:text-sm placeholder:text-stone-400 focus:outline-none resize-none bg-transparent leading-relaxed"
            />
          </div>

          {/* Character Counter 0/500 */}
          <div className="text-right text-[11px] text-stone-400 font-mono mt-1">
            {customReviewText.length}/500
          </div>
        </div>

        {/* Tip Badge below textarea */}
        <div className="flex items-center gap-2 px-2 text-[11px] text-stone-500">
          <div className="w-5 h-5 rounded-full bg-[#F0FDF4] text-emerald-700 flex items-center justify-center text-xs shrink-0">
            <Lightbulb className="w-3 h-3" />
          </div>
          <span className="text-stone-300">|</span>
          <p className="leading-snug">
            Tip: The suggestion below will be used if left blank.
          </p>
        </div>

        {/* Section 3: AI Suggested Review Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-3.5 shadow-2xs">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-full bg-[#3D7048] text-white flex items-center justify-center text-xs">
              ✦
            </div>
            <h3 className="font-serif-title font-semibold text-sm sm:text-[15px] text-[#15462D]">
              AI Suggested Review
            </h3>
          </div>

          {/* AI Suggestion display with direct onclick and Left/Right arrows */}
          <div className="bg-[#FAF9F6] hover:bg-[#F4F2EC] rounded-xl p-2.5 sm:p-3 border border-stone-200/80 flex items-center justify-between gap-2 transition-colors">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevSuggestion();
              }}
              type="button"
              className="w-7 h-7 rounded-full bg-white border border-stone-200 shadow-2xs flex items-center justify-center text-stone-600 hover:text-stone-900 active:scale-95 transition-all shrink-0 cursor-pointer"
              aria-label="Previous suggestion"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
            </button>

            {/* Direct clickable suggestion box */}
            <div
              onClick={() => onCustomTextChange(currentSuggestion)}
              className="flex-1 px-2 py-1.5 cursor-pointer select-none rounded-lg hover:bg-white/80 active:scale-[0.99] transition-all"
              title="Tap to use this review"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSuggestion}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs text-stone-700 leading-relaxed font-normal text-center line-clamp-3 hover:text-stone-900"
                >
                  "{currentSuggestion}"
                </motion.p>
              </AnimatePresence>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNextSuggestion();
              }}
              type="button"
              className="w-7 h-7 rounded-full bg-white border border-stone-200 shadow-2xs flex items-center justify-center text-stone-600 hover:text-stone-900 active:scale-95 transition-all shrink-0 cursor-pointer"
              aria-label="Next suggestion"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Bottom Full-width Pill Button: "Ready to Review →" */}
        <div className="pt-1">
          <button
            onClick={handleReadyClick}
            disabled={!isReady}
            type="button"
            className={`w-full min-h-[50px] py-3.5 px-6 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer active:scale-[0.99] ${
              isReady
                ? 'bg-[#185333] hover:bg-[#124227] text-white'
                : 'bg-emerald-800/60 text-white/70 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4 text-emerald-200 stroke-[2.2] -rotate-12" />
            <span>Ready to Review</span>
            <ArrowRight className="w-4 h-4 text-emerald-200 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
