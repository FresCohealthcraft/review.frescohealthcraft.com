import React, { useState } from 'react';
import { CheckCircle2, ExternalLink, Copy, Check, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { GOOGLE_REVIEW_URL, BRAND } from '../types';
import { copyTextToClipboard } from '../utils/clipboard';

interface ScreenThankYouProps {
  finalReview: string;
  onStartOver: () => void;
}

export const ScreenThankYou: React.FC<ScreenThankYouProps> = ({
  finalReview,
  onStartOver,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAgain = async () => {
    const success = await copyTextToClipboard(finalReview);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenGoogle = () => {
    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex flex-col justify-between px-4 sm:px-5 py-5"
    >
      <div className="text-center my-auto">
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100/90 text-emerald-700 flex items-center justify-center shadow-xs">
          <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Thank You! 💚
        </h2>
        <p className="text-sm font-medium text-emerald-800 mt-1">
          {BRAND.tagline}
        </p>

        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xs mx-auto leading-relaxed">
          Your review has been copied. On Google, paste it into the review box and submit your review.
        </p>

        {/* 2 Step Instructions Card */}
        <div className="my-4 bg-white border border-stone-200/90 rounded-2xl p-4 text-left shadow-xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-900">
                Switch to the Google review tab
              </p>
              <p className="text-[11px] text-stone-500 leading-normal">
                If the tab didn't open automatically, tap the green button below.
              </p>
            </div>
          </div>

          <div className="border-t border-stone-100" />

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-900">
                Paste your review & tap Submit
              </p>
              <p className="text-[11px] text-stone-500 leading-normal">
                Tap inside Google's review box, select <strong>Paste</strong>, and submit.
              </p>
            </div>
          </div>
        </div>

        {/* Preview of the Copied Review */}
        <div className="bg-stone-100/70 border border-stone-200/70 rounded-xl p-3 text-left relative">
          <p className="text-xs text-stone-700 italic line-clamp-3 leading-relaxed">
            "{finalReview}"
          </p>
          <div className="mt-2 flex items-center justify-between pt-2 border-t border-stone-200/50">
            <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" /> Copied to clipboard
            </span>

            <button
              type="button"
              onClick={handleCopyAgain}
              className="text-stone-600 hover:text-stone-900 text-xs font-medium flex items-center gap-1 min-h-[30px] px-2 rounded hover:bg-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Copied again!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Group */}
      <div className="pt-3 pb-1 space-y-2 border-t border-stone-200/60 mt-3">
        {/* Re-open Google Review Button */}
        <button
          type="button"
          onClick={handleOpenGoogle}
          className="w-full min-h-[50px] py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all focus-visible:outline-emerald-900 cursor-pointer"
        >
          <span>Open Google Reviews Page</span>
          <ExternalLink className="w-4 h-4" />
        </button>

        {/* Reset / Done Button */}
        <button
          type="button"
          onClick={onStartOver}
          className="w-full min-h-[44px] py-2 px-3 text-stone-600 hover:text-stone-900 text-xs font-medium flex items-center justify-center gap-1.5 rounded-xl hover:bg-stone-200/50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Write another review / Start over</span>
        </button>
      </div>
    </motion.div>
  );
};

