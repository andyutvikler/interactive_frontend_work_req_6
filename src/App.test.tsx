import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Localized Fun Fact Viewer", () => {
  test("shows a fun fact in the default language on initial render", async () => {
    render(<App />);

    // Wait for the initial English fun fact to appear
    const funFact = await screen.findByText(/ have two cats and a dog/i);

    expect(funFact).toBeInTheDocument();
  });

  test("switching language changes the visible fun fact text", async () => {
    const user = userEvent.setup();
    render(<App />);

    // First, confirm the English fun fact is shown
    const englishFact = await screen.findByText(/i have two cats and a dog/i);
    expect(englishFact).toBeInTheDocument();

    // Find the language dropdown via its accessible label
const languageSelect = screen.getByRole("combobox", { name: /language/i });

    // Change language to Norwegian ("no")
    await user.selectOptions(languageSelect, "no");

    // Get the fun fact region
    const funFactRegion = await screen.findByRole("region", {
      name: /fun fact/i
    });

    // The text in the region should now be different than the English fact
    expect(funFactRegion).toBeInTheDocument();
    expect(funFactRegion).not.toHaveTextContent(/i have two cats and a dog/i);
  });

  test("renders fun fact inside a semantic region with accessible name", async () => {
    render(<App />);

    // Wait for the initial fun fact so we know content has loaded
    await screen.findByText(/i have two cats and a dog/i);

    // We set role="region" and aria-label="Fun fact" in App.tsx
    const funFactRegion = screen.getByRole("region", { name: /fun fact/i });

    expect(funFactRegion).toBeInTheDocument();
  });
});
