import React from 'react';
import { Leaf, ChevronLeft, RotateCcw } from 'lucide-react';
import { AppScreen, BRAND } from '../types';

interface HeaderProps {
  currentScreen: AppScreen;
  onBack?: () => void;
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onBack,
  onReset,
}) => {
  return (
    <header className="w-full pt-4 pb-3 px-4">
      <div className="flex items-center justify-between min-h-[44px]">
        {/* Left Action Slot */}
        <div className="w-10 flex items-center justify-start">
          {currentScreen !== 'rating' && onBack && currentScreen !== 'thankyou' ? (
            <button
              onClick={onBack}
              type="button"
              className="min-h-[44px] min-w-[44px] -ml-2 flex items-center justify-center rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 active:scale-95 transition-all focus-visible:outline-emerald-600"
              aria-label="Go back to previous screen"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-7 h-7 rounded-full bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-4 h-4 fill-emerald-600/30 text-emerald-700" />
            </div>
          )}
        </div>

        {/* Center Brand Identity */}
        <div className="flex-1 text-center px-1">
          <h1 className="font-display font-bold text-lg tracking-tight text-stone-900 leading-none">
            {BRAND.name}
          </h1>
          <p className="text-[11px] font-medium text-emerald-800/80 tracking-wide mt-0.5">
            {BRAND.tagline}
          </p>
        </div>

        {/* Right Action Slot */}
        <div className="w-10 flex items-center justify-end">
          {currentScreen !== 'rating' && onReset ? (
            <button
              onClick={onReset}
              type="button"
              className="min-h-[44px] min-w-[44px] -mr-2 flex items-center justify-center rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 active:scale-95 transition-all focus-visible:outline-emerald-600"
              aria-label="Start over"
              title="Start over"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-5" />
          )}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {(['rating', 'suggestions', 'edit', 'thankyou'] as AppScreen[]).map((step, idx) => {
          const screens: AppScreen[] = ['rating', 'suggestions', 'edit', 'thankyou'];
          const currentIndex = screens.indexOf(currentScreen);
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'w-6 bg-emerald-700'
                  : isDone
                  ? 'w-2 bg-emerald-500/60'
                  : 'w-2 bg-stone-300/70'
              }`}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </header>
  );
};
