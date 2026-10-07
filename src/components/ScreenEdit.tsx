import React, { useRef, useState } from 'react';
import { RefreshCw, Check, Undo2, ClipboardCopy, ExternalLink, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StarRating, GOOGLE_REVIEW_URL } from '../types';
import { copyTextToClipboard } from '../utils/clipboard';

interface ScreenEditProps {
  rating: StarRating;
  editedReview: string;
  originalSuggestion: string;
  isLoadingMore: boolean;
  onTextChange: (newText: string) => void;
  onGenerateMore: () => void;
  onProceedToGoogle: (textToUse?: string) => void;
}

export const ScreenEdit: React.FC<ScreenEditProps> = ({
  rating,
  editedReview,
  originalSuggestion,
  isLoadingMore,
  onTextChange,
  onGenerateMore,
  onProceedToGoogle,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'manual'>('idle');
  const [showBriefNotice, setShowBriefNotice] = useState<boolean>(false);

  // Handler for separate "📋 Copy Review" button
  const handleCopyOnly = async () => {
    if (!editedReview.trim()) return;

    const success = await copyTextToClipboard(editedReview.trim());
    if (success) {
      setCopyStatus('copied');
      setShowBriefNotice(false);
      setTimeout(() => setCopyStatus('idle'), 4000);
    } else {
      setCopyStatus('manual');
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.select();
        textareaRef.current.setSelectionRange(0, editedReview.length);
      }
    }
  };

  // Handler for prominent "📋 Copy & Continue to Google" button
  const handleCopyAndContinue = async () => {
    if (!editedReview.trim()) return;

    const reviewText = editedReview.trim();
    const success = await copyTextToClipboard(reviewText);

    if (success) {
      setCopyStatus('copied');
      setShowBriefNotice(true);
    } else {
      setCopyStatus('manual');
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.select();
        textareaRef.current.setSelectionRange(0, reviewText.length);
      }
    }

    // Open exact Google review URL synchronously in new tab/window
    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');

    // Notify parent to transition or update state
    onProceedToGoogle(reviewText);
  };

  const handleResetToOriginal = () => {
    onTextChange(originalSuggestion);
    setCopyStatus('idle');
    setShowBriefNotice(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex flex-col justify-between px-4 sm:px-5 py-4"
    >
      <div>
        {/* Title */}
        <div className="text-center mb-2">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Edit & Copy Review
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Personalize your words, copy, and continue to Google
          </p>
        </div>

        {/* Editable Review Box */}
        <div className="relative mt-2">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5 px-1">
            <span className="font-medium text-stone-700">
              Selected {rating} ★ Review:
            </span>
            <div className="flex items-center gap-2">
              {editedReview !== originalSuggestion && (
                <button
                  type="button"
                  onClick={handleResetToOriginal}
                  className="text-stone-500 hover:text-stone-800 flex items-center gap-1 text-[11px] underline min-h-[32px] px-1 cursor-pointer"
                >
                  <Undo2 className="w-3 h-3" /> Reset
                </button>
              )}
              <span className="text-[11px] text-stone-400">{editedReview.length} chars</span>
            </div>
          </div>

          <div
            className={`relative rounded-2xl border-2 transition-all ${
              copyStatus === 'manual'
                ? 'border-amber-500 bg-amber-50/20 ring-2 ring-amber-200'
                : copyStatus === 'copied'
                ? 'border-emerald-600 bg-emerald-50/20 ring-2 ring-emerald-100'
                : 'border-emerald-600/30 bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100'
            } shadow-xs`}
          >
            <textarea
              ref={textareaRef}
              value={editedReview}
              onChange={(e) => {
                onTextChange(e.target.value);
                if (copyStatus !== 'idle') setCopyStatus('idle');
                if (showBriefNotice) setShowBriefNotice(false);
              }}
              rows={4}
              placeholder="Edit your review text here..."
              className="w-full p-3.5 sm:p-4 text-stone-800 text-sm sm:text-base leading-relaxed resize-none rounded-2xl bg-transparent outline-none"
            />

            <div className="flex items-center justify-between px-3.5 pb-2.5 pt-1 border-t border-stone-100 text-xs text-stone-400">
              <span className="text-[11px]">
                {editedReview.trim().length > 0 ? 'Editable text box' : 'Please enter your review'}
              </span>

              <button
                type="button"
                onClick={onGenerateMore}
                disabled={isLoadingMore}
                className="text-emerald-700 hover:text-emerald-900 font-medium text-xs flex items-center gap-1 min-h-[30px] px-2 rounded-md hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
                <span>{isLoadingMore ? 'Rolling...' : '🔄 Try Another'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Messages & Brief Instruction */}
        <AnimatePresence mode="wait">
          {copyStatus === 'copied' && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-left space-y-1 shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-900">
                <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                <span>✅ Your review has been copied.</span>
              </div>
              <p className="text-xs text-emerald-800 pl-6">
                Your review is copied. On Google, tap the review box and choose Paste.
              </p>
            </motion.div>
          )}

          {copyStatus === 'manual' && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-left space-y-1"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Clipboard permission unavailable</span>
              </div>
              <p className="text-xs text-amber-800 pl-6">
                Please long-press the text box above, select <strong>Copy</strong>, and then tap Continue to Google.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Zone: Step 5 (Prominent Copy & Continue) and Separate Copy Button */}
      <div className="pt-3 pb-1 space-y-2.5 border-t border-stone-200/60 mt-3">
        {/* STEP 5: PROMINENT BUTTON — "📋 Copy & Continue to Google" */}
        <button
          type="button"
          onClick={handleCopyAndContinue}
          disabled={!editedReview.trim()}
          className="w-full min-h-[52px] py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all focus-visible:outline-emerald-900 cursor-pointer"
        >
          <ClipboardCopy className="w-5 h-5 text-amber-300" />
          <span>📋 Copy & Continue to Google</span>
          <ExternalLink className="w-4 h-4 ml-1 opacity-90" />
        </button>

        {/* Small instruction directly below the Google button */}
        <p className="text-[12px] text-center text-stone-600 leading-relaxed font-normal px-2">
          Your review is copied. On Google, tap the review box and choose Paste.
        </p>

        {/* Secondary: Separate "📋 Copy Review" Button (for manual/individual copy) */}
        <div className="pt-1 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleCopyOnly}
            disabled={!editedReview.trim()}
            className="min-h-[42px] px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 active:scale-[0.99] text-stone-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copyStatus === 'copied' ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Review Copied!</span>
              </>
            ) : (
              <>
                <ClipboardCopy className="w-4 h-4 text-stone-500" />
                <span>📋 Copy Review</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onGenerateMore}
            disabled={isLoadingMore}
            className="min-h-[42px] px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 active:scale-[0.99] text-stone-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-stone-500 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>🔄 Generate More</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

