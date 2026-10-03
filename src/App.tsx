import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppScreen, StarRating, GOOGLE_REVIEW_URL, BRAND } from './types';
import { fetchReviewSuggestions } from './services/reviewService';
import { generateDynamicSuggestions } from './data/reviewSuggestions';
import { copyTextToClipboard } from './utils/clipboard';
import { Header } from './components/Header';
import { ScreenRating } from './components/ScreenRating';
import { ScreenSuggestions } from './components/ScreenSuggestions';
import { ScreenEdit } from './components/ScreenEdit';
import { ScreenThankYou } from './components/ScreenThankYou';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('rating');
  const [selectedRating, setSelectedRating] = useState<StarRating | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editedReview, setEditedReview] = useState<string>('');
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [copyNotice, setCopyNotice] = useState<string | null>(null);

  // 1. Customer selects 1–5 stars
  const handleSelectRating = (rating: StarRating) => {
    setSelectedRating(rating);

    // 2. Generate exactly 4 AI review suggestions based on selected rating
    const instantFour = generateDynamicSuggestions(rating);
    setSuggestions(instantFour);
    setSelectedIndex(null);
    setEditedReview('');

    // Immediately transition to Screen 2
    setScreen('suggestions');

    // Background enrichment from Gemini API if available (non-blocking)
    try {
      fetchReviewSuggestions(rating, []).then((res) => {
        if (res.isAiGenerated && res.suggestions.length >= 4) {
          setSuggestions(res.suggestions);
        }
      });
    } catch {
      // Keep dynamic variations
    }
  };

  // Keep existing "Generate More" functionality
  const handleGenerateMore = async () => {
    if (!selectedRating) return;
    setIsLoadingMore(true);

    const currentExclude = [...suggestions];
    try {
      const res = await fetchReviewSuggestions(selectedRating, currentExclude);
      if (res.suggestions.length >= 4) {
        setSuggestions(res.suggestions);
        if (screen === 'edit') {
          setEditedReview(res.suggestions[0]);
        }
      } else {
        const fresh = generateDynamicSuggestions(selectedRating, currentExclude);
        setSuggestions(fresh);
        if (screen === 'edit') {
          setEditedReview(fresh[0]);
        }
      }
    } catch {
      const fresh = generateDynamicSuggestions(selectedRating, currentExclude);
      setSuggestions(fresh);
      if (screen === 'edit') {
        setEditedReview(fresh[0]);
      }
    } finally {
      setIsLoadingMore(false);
    }
  };

  // 3. Customer taps one suggestion
  // 4. Open the selected suggestion in an editable text box
  const handleSelectSuggestion = (index: number) => {
    setSelectedIndex(index);
    if (suggestions[index]) {
      setEditedReview(suggestions[index]);
    }
    // Open in editable text box
    setScreen('edit');
  };

  // Continue to Google: copies review and transitions to thank-you screen
  const handleProceedToGoogle = async (customText?: string) => {
    const textToCopy = (
      customText ||
      editedReview ||
      (selectedIndex !== null ? suggestions[selectedIndex] : '') ||
      suggestions[0] ||
      ''
    ).trim();

    if (textToCopy) {
      await copyTextToClipboard(textToCopy);
      setCopyNotice('✅ Your review has been copied.');
      setTimeout(() => setCopyNotice(null), 3500);
    }

    setScreen('thankyou');
  };

  // Navigation handlers
  const handleBack = () => {
    if (screen === 'edit') {
      setScreen('suggestions');
    } else if (screen === 'suggestions') {
      setScreen('rating');
      setSelectedIndex(null);
    }
  };

  const handleReset = () => {
    setSelectedRating(null);
    setSuggestions([]);
    setSelectedIndex(null);
    setEditedReview('');
    setScreen('rating');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col justify-between items-center antialiased selection:bg-emerald-100">
      {/* Background Wellness Ambiance */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-stone-200/40 blur-3xl" />
      </div>

      {/* Main Container - Mobile-First */}
      <div className="relative z-10 w-full max-w-[440px] min-h-screen sm:min-h-[740px] sm:my-auto sm:py-4 flex flex-col">
        <div className="w-full flex-1 flex flex-col bg-white sm:rounded-3xl sm:border sm:border-stone-200/80 sm:shadow-lg sm:shadow-emerald-950/5 overflow-hidden">
          {/* Header with Brand & Navigation */}
          <Header
            currentScreen={screen}
            onBack={handleBack}
            onReset={handleReset}
          />

          {/* Toast Notification */}
          <AnimatePresence>
            {copyNotice && (
              <div className="px-4 py-2 bg-emerald-700 text-white text-xs text-center font-medium shadow-xs">
                {copyNotice}
              </div>
            )}
          </AnimatePresence>

          {/* Screen Flow with Smooth Transitions */}
          <main className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {/* SCREEN 1: 1–5 Star Rating Selection */}
              {screen === 'rating' && (
                <ScreenRating
                  key="screen-rating"
                  onSelectRating={handleSelectRating}
                />
              )}

              {/* SCREEN 2: Exactly 4 AI Review Suggestions */}
              {screen === 'suggestions' && selectedRating && (
                <ScreenSuggestions
                  key="screen-suggestions"
                  rating={selectedRating}
                  suggestions={suggestions}
                  selectedIndex={selectedIndex}
                  isLoadingMore={isLoadingMore}
                  onSelectIndex={handleSelectSuggestion}
                  onGenerateMore={handleGenerateMore}
                  onChangeRating={() => setScreen('rating')}
                />
              )}

              {/* SCREEN 3: Open in Editable Text Box with prominent "📋 Copy & Continue to Google" */}
              {screen === 'edit' && selectedRating && (
                <ScreenEdit
                  key="screen-edit"
                  rating={selectedRating}
                  editedReview={editedReview}
                  originalSuggestion={
                    selectedIndex !== null && suggestions[selectedIndex]
                      ? suggestions[selectedIndex]
                      : editedReview
                  }
                  isLoadingMore={isLoadingMore}
                  onTextChange={setEditedReview}
                  onGenerateMore={handleGenerateMore}
                  onProceedToGoogle={handleProceedToGoogle}
                />
              )}

              {/* SCREEN 4: Confirmation & Guidance Screen */}
              {screen === 'thankyou' && (
                <ScreenThankYou
                  key="screen-thankyou"
                  finalReview={
                    editedReview ||
                    (selectedIndex !== null ? suggestions[selectedIndex] : '') ||
                    suggestions[0] ||
                    ''
                  }
                  onStartOver={handleReset}
                />
              )}
            </AnimatePresence>
          </main>

          {/* Footer Safe Area */}
          <footer className="py-2.5 px-4 text-center border-t border-stone-100 bg-[#FAF8F5]/80">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-normal">
              <span>{BRAND.name}</span>
              <span aria-hidden="true">·</span>
              <span>{BRAND.tagline}</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
