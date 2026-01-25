import { afterEach, describe, expect, test } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import AppContentWrapper from "@/app/components/app/AppContentWrapper";

afterEach(() => {
  cleanup();
});

describe("AppContentWrapper", () => {
  describe("rendering", () => {
    test("renders children correctly", () => {
      render(
        <AppContentWrapper>
          <p>Test content</p>
        </AppContentWrapper>,
      );

      expect(screen.getByText("Test content")).toBeDefined();
    });

    test("renders text children", () => {
      render(<AppContentWrapper>Plain text content</AppContentWrapper>);

      expect(screen.getByText("Plain text content")).toBeDefined();
    });

    test("renders multiple children", () => {
      render(
        <AppContentWrapper>
          <h1>Title</h1>
          <p>Paragraph</p>
          <span>Span content</span>
        </AppContentWrapper>,
      );

      expect(screen.getByText("Title")).toBeDefined();
      expect(screen.getByText("Paragraph")).toBeDefined();
      expect(screen.getByText("Span content")).toBeDefined();
    });

    test("renders nested components", () => {
      render(
        <AppContentWrapper>
          <div>
            <section>
              <article>Nested content</article>
            </section>
          </div>
        </AppContentWrapper>,
      );

      expect(screen.getByText("Nested content")).toBeDefined();
    });

    test("renders without children", () => {
      const { container } = render(<AppContentWrapper />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeDefined();
      expect(wrapper.tagName).toBe("DIV");
    });
  });

  describe("styling", () => {
    test("applies width classes", () => {
      const { container } = render(
        <AppContentWrapper>Content</AppContentWrapper>,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("w-full");
      expect(wrapper.className).toContain("lg:max-w-[75rem]");
    });

    test("renders as a div element", () => {
      const { container } = render(
        <AppContentWrapper>Content</AppContentWrapper>,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.tagName).toBe("DIV");
    });
  });

  describe("composition", () => {
    test("can be nested within other elements", () => {
      render(
        <section data-testid="parent-section">
          <AppContentWrapper>
            <p>Wrapped content</p>
          </AppContentWrapper>
        </section>,
      );

      const section = screen.getByTestId("parent-section");
      expect(section).toBeDefined();
      expect(screen.getByText("Wrapped content")).toBeDefined();
    });

    test("preserves child element attributes", () => {
      render(
        <AppContentWrapper>
          <button data-testid="child-button" type="submit">
            Submit
          </button>
        </AppContentWrapper>,
      );

      const button = screen.getByTestId("child-button");
      expect(button.getAttribute("type")).toBe("submit");
    });
  });
});
