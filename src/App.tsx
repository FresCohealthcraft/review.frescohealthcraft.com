import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppScreen, StarRating } from './types';
import { fetchReviewSuggestions } from './services/reviewService';
import { generateDynamicSuggestions } from './data/reviewSuggestions';
import { ReviewPageUI } from './components/ReviewPageUI';
import { AlmostDoneScreen } from './components/AlmostDoneScreen';
import { QRCodeSection } from './components/QRCodeSection';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('review');
  const [rating, setRating] = useState<StarRating>(5);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [customReviewText, setCustomReviewText] = useState<string>('');
  const [finalReviewText, setFinalReviewText] = useState<string>('');

  // Initial load: generate 4 suggestions for 5-star rating
  useEffect(() => {
    loadSuggestionsForRating(5);

    // Support URL routing for QR page e.g. #qr or /qr
    if (window.location.hash === '#qr' || window.location.pathname === '/qr') {
      setScreen('qr');
    }

    const handleHashChange = () => {
      if (window.location.hash === '#qr') {
        setScreen('qr');
      } else if (screen === 'qr') {
        setScreen('review');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const loadSuggestionsForRating = (newRating: StarRating) => {
    // 1. Immediately provide dynamic suggestions without latency
    const initialFour = generateDynamicSuggestions(newRating);
    setSuggestions(initialFour);
    setActiveSuggestionIndex(0);

    // 2. Non-blocking enrichment via Gemini API if server API is configured
    try {
      fetchReviewSuggestions(newRating, []).then((res) => {
        if (res.isAiGenerated && res.suggestions.length >= 4) {
          setSuggestions(res.suggestions);
        }
      });
    } catch {
      // Keep dynamic suggestions
    }
  };

  // When rating is selected
  const handleSelectRating = (newRating: StarRating) => {
    setRating(newRating);
    loadSuggestionsForRating(newRating);
  };

  // Next suggestion in the card
  const handleNextSuggestion = () => {
    if (suggestions.length === 0) return;
    setActiveSuggestionIndex((prev) => (prev + 1) % suggestions.length);
  };

  // Previous suggestion in the card
  const handlePrevSuggestion = () => {
    if (suggestions.length === 0) return;
    setActiveSuggestionIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
  };

  // When "Ready to Review" is clicked
  const handleReadyToReview = (textToCopy: string) => {
    setFinalReviewText(textToCopy);
    setScreen('finish');
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-stone-900 flex flex-col justify-center items-center antialiased font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="w-full max-w-[440px] min-h-screen sm:min-h-[700px] flex flex-col bg-[#FBFBF9] sm:my-auto sm:py-2">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: Review Page UI (Matching Screenshot 1) */}
          {screen === 'review' && (
            <ReviewPageUI
              key="review-page"
              rating={rating}
              suggestions={suggestions}
              activeSuggestionIndex={activeSuggestionIndex}
              customReviewText={customReviewText}
              onSelectRating={handleSelectRating}
              onNextSuggestion={handleNextSuggestion}
              onPrevSuggestion={handlePrevSuggestion}
              onCustomTextChange={setCustomReviewText}
              onReadyToReview={handleReadyToReview}
              onOpenQR={() => {
                window.location.hash = 'qr';
                setScreen('qr');
              }}
            />
          )}

          {/* SCREEN 2: Almost Done — Finish on Google (Matching Screenshot 2) */}
          {screen === 'finish' && (
            <AlmostDoneScreen
              key="finish-screen"
              reviewText={finalReviewText}
              onGoBack={() => setScreen('review')}
            />
          )}

          {/* SCREEN 3: QR Code Standee Section (New requested feature) */}
          {screen === 'qr' && (
            <QRCodeSection
              key="qr-screen"
              onBack={() => {
                window.location.hash = '';
                setScreen('review');
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
