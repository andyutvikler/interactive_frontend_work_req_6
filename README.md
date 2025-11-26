# Localized Fun Fact Viewer (Work Requirement 6)

This project is a continuation of my earlier “Random Fun Fact Viewer” from Work Requirement 2.  
Here, I extend the app with:

- basic localization (English + Norwegian)
- a language switcher
- an automated test suite using Vitest and React Testing Library

The goal is to demonstrate internationalisation, semantic HTML, and test-driven verification of UI behavior.

---

## 🧱 Tech stack

- Vite + React + TypeScript
- Static JSON file for translations
- Vitest
- React Testing Library
- @testing-library/jest-dom
- @testing-library/user-event
- jsdom test environment

---

## 🚀 Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app

```bash
npm run dev
```

---

## 🌍 How the localization system works

### Translation data

Translations are stored in:

```
public/funfacts_translations.json
```

Structure example:

```json
{
  "en": { "funFacts": [ { "text": "I have two cats and a dog" } ] },
  "no": { "funFacts": [ { "text": "Jeg har ..." } ] }
}
```

### Loading translations

- `App.tsx` fetches `/funfacts_translations.json` via `useEffect`.
- JSON data is stored in state.
- The UI shows a loading message or error depending on fetch status.

### Language switching

A labeled `<select>` lets the user choose a language.
Changing selection updates the `language` state and resets the fun fact index.

### Fun fact display

The app displays one fact at a time and cycles through facts using a button.

### Accessibility

- `<main aria-label>` landmark
- `<section role="region" aria-label="Fun fact">`
- Hidden heading for the language section

---

## 🧪 Testing

Run tests:

```bash
npm test
```

UI mode:

```bash
npm run test:ui
```

### Test setup

`src/setupTests.ts`:

- imports jest-dom
- cleans DOM after each test
- mocks `fetch` to avoid network calls

### Tests cover:

1. Default language fun fact appears.
2. Switching language updates visible text.
3. Semantic/accessible roles and labels exist.

---

## 📂 Project structure

```
public/
  funfacts_translations.json
src/
  App.tsx
  App.test.tsx
  setupTests.ts
  main.tsx
vite.config.ts
package.json
```

---

## ✅ Summary

This project fulfills Work Requirement 6 by implementing:
- localization with a static JSON file
- a language switcher
- semantic and accessible UI
- a Vitest + RTL test suite verifying localization and structure
