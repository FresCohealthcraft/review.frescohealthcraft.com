import React from 'react';
import { BRAND } from '../types';

interface FrescoEmblemProps {
  size?: number;
  showContacts?: boolean;
  className?: string;
}

export const FrescoEmblem: React.FC<FrescoEmblemProps> = ({
  size = 200,
  showContacts = false,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full bg-white flex flex-col items-center justify-center p-2 select-none shadow-sm ${className}`}
    >
      {/* Outer gradient border ring matching IMG_20260929_050028_681.webp */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 200 200"
      >
        <defs>
          <linearGradient id="emblemBorderGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E7D32" />
            <stop offset="35%" stopColor="#43A047" />
            <stop offset="65%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="url(#emblemBorderGrad)"
          strokeWidth="6"
        />
      </svg>

      {/* Emblem Inner Content */}
      <div className="flex flex-col items-center justify-center text-center w-full px-2">
        {/* "FresCo" with leaves over 'o' */}
        <div className="relative leading-none mt-1">
          <span className="font-serif-title italic font-bold text-[#14532D] text-[34px] sm:text-[38px] tracking-tight">
            Fres
          </span>
          <span className="font-serif-title font-bold text-[#E65100] text-[34px] sm:text-[38px] relative inline-block">
            Co
            {/* Two green leaves sprouting above the 'o' */}
            <svg
              className="absolute -top-3.5 -right-2.5 w-6 h-6 text-[#2E7D32]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 3c-3 0-5 2-6 5-1-3-3-5-6-5 0 5 4 9 9 9 1-3 2-6 3-9z" />
              <path d="M14 6c2 1 3 3 3 5 2-2 3-5 3-7-3 0-5 1-6 2z" />
            </svg>
          </span>
        </div>

        {/* "HEALTHCRAFT" */}
        <div className="font-display font-bold text-[#14532D] text-[11px] sm:text-[12px] tracking-[0.24em] uppercase mt-1 leading-none">
          HEALTHCRAFT
        </div>

        {/* Divider with "CRAFTING WELLNESS" */}
        <div className="flex items-center justify-center gap-1.5 w-full my-1">
          <div className="w-5 h-[1.5px] bg-[#14532D]" />
          <span className="font-display font-bold text-[#14532D] text-[6.5px] sm:text-[7px] tracking-[0.18em] uppercase whitespace-nowrap">
            Crafting Wellness
          </span>
          <div className="w-5 h-[1.5px] bg-[#14532D]" />
        </div>

        {/* "NURTURING LIFE" */}
        <div className="font-display font-bold text-[#14532D] text-[6.5px] sm:text-[7px] tracking-[0.2em] uppercase leading-none">
          Nurturing Life
        </div>

        {/* Optional contact details inside emblem if requested */}
        {showContacts && (
          <div className="mt-2 pt-1 border-t border-stone-200/80 flex items-center justify-center gap-2 text-[7px] text-stone-700 font-medium">
            <span>✆ {BRAND.phone}</span>
            <span>·</span>
            <span>🌐 {BRAND.website}</span>
          </div>
        )}
      </div>
    </div>
  );
};
