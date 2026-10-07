import React, { useState } from 'react';
import { X, ExternalLink, ClipboardCheck, Star, CheckCircle, ArrowUpRight, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GOOGLE_REVIEW_URL, BRAND } from '../types';
import { copyTextToClipboard } from '../utils/clipboard';

interface AlmostDoneScreenProps {
  reviewText: string;
  onGoBack: () => void;
}

export const AlmostDoneScreen: React.FC<AlmostDoneScreenProps> = ({
  reviewText,
  onGoBack,
}) => {
  const [showToast, setShowToast] = useState<boolean>(true);
  const [copiedAgain, setCopiedAgain] = useState<boolean>(false);

  // Auto-hide toast after 2.5s
  React.useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenGoogle = () => {
    // Open Google Review page synchronously
    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
  };

  const handleCopyAgain = async () => {
    const success = await copyTextToClipboard(reviewText);
    if (success) {
      setCopiedAgain(true);
      setShowToast(true);
      setTimeout(() => setCopiedAgain(false), 2000);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[440px] mx-auto min-h-screen sm:min-h-[640px] flex flex-col justify-between p-4 sm:p-5 font-sans bg-[#FBFBF9] text-stone-900 relative"
    >
      {/* Toast Notification ("Copied.") */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-xs font-medium shadow-lg pointer-events-none"
          >
            Copied.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card (Mobile-first popup card with large rounded corners & soft shadow) */}
      <div className="w-full rounded-[28px] sm:rounded-none bg-white sm:bg-transparent shadow-xl sm:shadow-none border border-stone-200/70 sm:border-0 p-5 sm:p-0 my-auto max-h-[92vh] sm:max-h-none overflow-y-auto sm:overflow-visible">
        {/* Header with Title and Close X Button */}
        <div className="flex items-start justify-between pt-1 pb-1">
          <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-stone-900 tracking-tight leading-tight">
            Almost done — finish<br className="block sm:hidden" /> on Google
          </h2>
          <button
            onClick={onGoBack}
            type="button"
            className="min-h-[36px] min-w-[36px] -mr-1 -mt-1 flex items-center justify-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-stone-600 mt-1.5 mb-4 sm:mb-5">
          Your review for <strong className="font-bold text-stone-900">{BRAND.name}</strong> is ready.
        </p>

        {/* Green Box: Review copied to clipboard */}
        <div className="bg-[#EAF8F0] border border-[#BDECCB] rounded-2xl p-3.5 sm:p-4 flex items-start gap-3 sm:gap-3.5 shadow-2xs mb-4 sm:mb-5">
          <div className="w-9 h-9 rounded-full bg-[#CEF0DA] flex items-center justify-center shrink-0 mt-0.5 text-[#15803D]">
            <ClipboardCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-bold text-stone-900 text-sm sm:text-[15px] leading-tight">
              Review copied to clipboard
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-snug">
              Long-press inside Google's review box, then tap Paste.
            </p>
          </div>
        </div>

        {/* WHAT HAPPENS NEXT Section */}
        <div className="mb-4 sm:mb-5">
          <h4 className="text-[11px] font-bold text-stone-400 tracking-wider uppercase mb-3">
            WHAT HAPPENS NEXT
          </h4>

          <div className="space-y-3 sm:space-y-3.5 text-xs sm:text-[15px] font-semibold text-stone-900">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              <span className="w-4 sm:w-5 text-center font-bold text-[#6B21A8] text-xs sm:text-sm">1</span>
              <ArrowUpRight className="w-4 h-4 text-stone-700 sm:text-purple-600 shrink-0 stroke-[2.2]" />
              <span>Redirect Google</span>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3">
              <span className="w-4 sm:w-5 text-center font-bold text-[#6B21A8] text-xs sm:text-sm">2</span>
              <Copy className="w-4 h-4 text-stone-700 sm:text-purple-600 shrink-0 stroke-[2]" />
              <span>
                Paste your review — <strong className="text-[#10B981] font-semibold">already copied</strong>
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3">
              <span className="w-4 sm:w-5 text-center font-bold text-[#6B21A8] text-xs sm:text-sm">3</span>
              <Star className="w-4 h-4 text-stone-700 sm:text-purple-600 shrink-0 stroke-[2]" />
              <span>Confirm your star rating</span>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-3">
              <span className="w-4 sm:w-5 text-center font-bold text-[#6B21A8] text-xs sm:text-sm">4</span>
              <CheckCircle className="w-4 h-4 text-stone-700 sm:text-purple-600 shrink-0 stroke-[2]" />
              <span>Post on Google</span>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-stone-400 mt-3 sm:mt-4 leading-normal">
            Posted directly on Google. Sign in if prompted.
          </p>
        </div>

        {/* Review Box: Rounded border box with italic text, divider, Ready to paste tick, and Copy text */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-3.5 sm:p-3 text-left relative mt-4 mb-5 shadow-2xs">
          <p className="text-xs sm:text-xs text-stone-800 italic line-clamp-3 leading-relaxed">
            "{reviewText}"
          </p>
          <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#16A34A] flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Ready to paste
            </span>
            <button
              type="button"
              onClick={handleCopyAgain}
              className="text-stone-700 hover:text-stone-900 text-xs font-medium flex items-center gap-1.5 min-h-[28px] px-2 rounded hover:bg-stone-100 transition-colors cursor-pointer"
            >
              {copiedAgain ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-700" />
                  <span>Copy text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Zone: Full-width blue (#1A5FFF) pill button with external link icon */}
        <div className="pt-1 pb-1">
          <button
            type="button"
            onClick={handleOpenGoogle}
            className="w-full min-h-[50px] sm:min-h-[52px] py-3.5 px-4 rounded-full sm:rounded-xl bg-[#1A5FFF] hover:bg-[#1550DB] active:scale-[0.99] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all focus-visible:outline-blue-700 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 stroke-[2.2]" />
            <span>Open Google Review Page</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
