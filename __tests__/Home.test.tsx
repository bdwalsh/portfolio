import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "../pages";

test("Pages Router", () => {
  render(<Home />);
  const main = within(screen.getByRole("main"));
  expect(
    main.getByRole("heading", { level: 1, name: /brendan walsh/i }),
  ).toBeDefined();

  const footer = within(screen.getByRole("contentinfo"));
  expect(footer.getByText(/brendan walsh/i)).toBeDefined();
});

