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
    <header className="w-full pt-3 pb-2 px-4 font-sans">
      <div className="flex items-center justify-between min-h-[40px]">
        {/* Left Action Slot */}
        <div className="w-10 flex items-center justify-start">
          {currentScreen !== 'review' && onBack ? (
            <button
              onClick={onBack}
              type="button"
              className="min-h-[40px] min-w-[40px] -ml-2 flex items-center justify-center rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 active:scale-95 transition-all"
              aria-label="Go back"
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
          <h1 className="font-display font-bold text-base tracking-tight text-stone-900 leading-none">
            {BRAND.name}
          </h1>
        </div>

       {/* Right Action Slot */}
       <div className="w-10 flex items-center justify-end">
        {currentScreen !== 'review' && onReset ? (
  
  <button
      onClick={onReset}
      type="button"
      className="min-h-[40px] min-w-[40px] -mr-2 flex items-center justify-center rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 active:scale-95 transition-all"
      aria-label="Start over"
    >
      <RotateCcw className="w-4 h-4" />
    </button>
  ) : (
    <div className="w-5" />
  )}
</div>
      </div>
    </header>
  );
};

