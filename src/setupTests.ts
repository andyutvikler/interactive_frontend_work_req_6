import "@testing-library/jest-dom";
import { afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Clean up the DOM after each test
afterEach(() => {
  cleanup();
});

// This is the same data as in public/funfacts_translations.json
const mockTranslations ={
  "en": {
    "funFacts": [
      {
        "text": "I have two cats and a dog"
      },
      {
        "text": "I play fortnite"
      },
    {
      "text": "I enjoy the rain"
    },
    {
      "text": "I read a couple of books every week"
    }
    ]
  },
  "no": {
    "funFacts": [
      {
        "text": "Jeg har to katter og en hund"
      },
      {
        "text": "Jeg spiller fortnite"
      },
      {
        "text": "Jeg liker regn"
      },
      {
        "text": "Jeg leser et par bøker i uken"
      }
    ]
  }
}


// Mock global fetch so App's useEffect(fetch(...)) works in tests
beforeAll(() => {
  vi.spyOn(global, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
    if (typeof input === "string" && input.endsWith("/funfacts_translations.json")) {
      // Simulate a Response-like object with json()
      return {
        ok: true,
        json: async () => mockTranslations
      } as any;
    }

    // For any other URL, you can decide what to do; here we just throw:
    throw new Error("Unhandled fetch URL in tests: " + input);
  });
});
