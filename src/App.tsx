import React, { useEffect, useState } from "react";
import "./App.css";

type LanguageCode = "en" | "no";

interface FunFact {
  text: string;
}

interface TranslationFile {
  [languageCode: string]: {
    funFacts: FunFact[];
  };
}

function App() {
  const [translations, setTranslations] = useState<TranslationFile | null>(null);
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load translations from the static JSON file in /public
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch("/funfacts_translations.json");
        if (!response.ok) {
          throw new Error("Failed to load translations file");
        }
        const data: TranslationFile = await response.json();
        setTranslations(data);
        setLoadError(null);
      } catch (error) {
        console.error(error);
        setLoadError("Could not load fun facts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []);

  const funFactsForLanguage: FunFact[] =
    translations?.[language]?.funFacts ?? [];

  // Make sure the index is always valid for the current language
  const safeIndex =
    funFactsForLanguage.length > 0
      ? currentFactIndex % funFactsForLanguage.length
      : 0;

  const currentFact =
    funFactsForLanguage.length > 0 ? funFactsForLanguage[safeIndex] : null;

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = event.target.value as LanguageCode;
    setLanguage(newLanguage);
    setCurrentFactIndex(0); // reset so tests & UX are predictable
  };

  const handleNextFact = () => {
    if (funFactsForLanguage.length === 0) return;
    setCurrentFactIndex((prev) => (prev + 1) % funFactsForLanguage.length);
  };

  return (
    <main
      className="app-container"
      aria-label="Localized fun fact application"
    >
      <header className="app-header">
        <h1>Localized Fun Fact Viewer</h1>
        <p>Choose a language and explore some fun facts.</p>
      </header>

      {/* Language switcher with accessible label */}
      <section
        className="language-switcher"
        aria-labelledby="language-switcher-heading"
      >
        <h2 id="language-switcher-heading" className="visually-hidden">
          Language selection
        </h2>

        <label htmlFor="language-select">Language</label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="no">Norsk</option>
        </select>
      </section>

      {/* Fun fact region (semantic + accessible) */}
      <section
        className="fun-fact-region"
        role="region"
        aria-label="Fun fact"
        aria-live="polite"
      >
        {isLoading && <p>Loading fun facts…</p>}

        {loadError && !isLoading && <p>{loadError}</p>}

        {!isLoading && !loadError && !currentFact && (
          <p>No fun facts available in this language.</p>
        )}

        {!isLoading && !loadError && currentFact && (
          <p className="fun-fact-text">{currentFact.text}</p>
        )}
      </section>

      <div className="controls">
        <button
          type="button"
          onClick={handleNextFact}
          disabled={funFactsForLanguage.length === 0 || !!loadError}
        >
          Show another fun fact
        </button>
      </div>
    </main>
  );
}

export default App;
