import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import AppButton from "@/app/components/app/AppButton";

afterEach(() => {
  cleanup();
});

// Mock next/link to render a standard anchor for testing
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
    target,
    rel,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    target?: string;
    rel?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </a>
  ),
}));

describe("AppButton", () => {
  describe("rendering", () => {
    test("renders with required href prop", () => {
      render(<AppButton href="/test">Click me</AppButton>);

      const link = screen.getByRole("link", { name: /click me/i });
      expect(link).toBeDefined();
      expect(link.getAttribute("href")).toBe("/test");
    });

    test("renders children correctly", () => {
      render(
        <AppButton href="/test">
          <span>Button Text</span>
        </AppButton>,
      );

      expect(screen.getByText("Button Text")).toBeDefined();
    });

    test("renders with complex children", () => {
      render(
        <AppButton href="/test">
          <span>Icon</span>
          <span>Label</span>
        </AppButton>,
      );

      expect(screen.getByText("Icon")).toBeDefined();
      expect(screen.getByText("Label")).toBeDefined();
    });
  });

  describe("styling", () => {
    test("applies default classes", () => {
      render(<AppButton href="/test">Button</AppButton>);

      const link = screen.getByRole("link");
      expect(link.className).toContain("bg-accent");
      expect(link.className).toContain("text-black");
      expect(link.className).toContain("font-semibold");
      expect(link.className).toContain("duration-300");
      expect(link.className).toContain("hover:bg-accent-hover");
      expect(link.className).toContain("px-10");
      expect(link.className).toContain("py-3.5");
    });

    test("appends custom className to default classes", () => {
      render(
        <AppButton href="/test" className="mt-8 custom-class">
          Button
        </AppButton>,
      );

      const link = screen.getByRole("link");
      expect(link.className).toContain("bg-accent");
      expect(link.className).toContain("mt-8");
      expect(link.className).toContain("custom-class");
    });

    test("handles undefined className gracefully", () => {
      render(<AppButton href="/test">Button</AppButton>);

      const link = screen.getByRole("link");
      // Should not have trailing space or undefined in className
      expect(link.className).not.toContain("undefined");
    });
  });

  describe("link attributes", () => {
    test("sets target attribute when provided", () => {
      render(
        <AppButton href="/external" target="_blank">
          External Link
        </AppButton>,
      );

      const link = screen.getByRole("link");
      expect(link.getAttribute("target")).toBe("_blank");
    });

    test("sets rel attribute when provided", () => {
      render(
        <AppButton href="/external" rel="noreferrer noopener">
          External Link
        </AppButton>,
      );

      const link = screen.getByRole("link");
      expect(link.getAttribute("rel")).toBe("noreferrer noopener");
    });

    test("sets both target and rel for external links", () => {
      render(
        <AppButton
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          External
        </AppButton>,
      );

      const link = screen.getByRole("link");
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noreferrer noopener");
    });

    test("does not set target when not provided", () => {
      render(<AppButton href="/internal">Internal Link</AppButton>);

      const link = screen.getByRole("link");
      expect(link.getAttribute("target")).toBeNull();
    });
  });

  describe("click handling", () => {
    test("calls onClick handler when clicked", () => {
      const handleClick = vi.fn();

      render(
        <AppButton href="/test" onClick={handleClick}>
          Clickable
        </AppButton>,
      );

      const link = screen.getByRole("link");
      fireEvent.click(link);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("passes event object to onClick handler", () => {
      const handleClick = vi.fn();

      render(
        <AppButton href="/test" onClick={handleClick}>
          Clickable
        </AppButton>,
      );

      const link = screen.getByRole("link");
      fireEvent.click(link);

      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });

    test("does not throw when onClick is not provided", () => {
      render(<AppButton href="/test">No Handler</AppButton>);

      const link = screen.getByRole("link");

      expect(() => fireEvent.click(link)).not.toThrow();
    });

    test("allows preventing default behavior in onClick", () => {
      const handleClick = vi.fn((e: React.MouseEvent) => {
        e.preventDefault();
      });

      render(
        <AppButton href="/test" onClick={handleClick}>
          Prevent Default
        </AppButton>,
      );

      const link = screen.getByRole("link");
      fireEvent.click(link);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("accessibility", () => {
    test("is accessible as a link", () => {
      render(<AppButton href="/accessible">Accessible Button</AppButton>);

      const link = screen.getByRole("link", { name: /accessible button/i });
      expect(link).toBeDefined();
    });

    test("has accessible name from children", () => {
      render(<AppButton href="/test">View Projects</AppButton>);

      expect(
        screen.getByRole("link", { name: /view projects/i }),
      ).toBeDefined();
    });
  });
});
