import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import HeroSection from "@/app/components/sections/HeroSection";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ),
}));

// Mock FontAwesome
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({
    className,
    "aria-hidden": ariaHidden,
  }: {
    className?: string;
    "aria-hidden"?: boolean;
  }) => (
    <span
      data-testid="font-awesome-icon"
      className={className}
      aria-hidden={ariaHidden}
    />
  ),
}));

afterEach(() => {
  cleanup();
});

describe("HeroSection", () => {
  describe("rendering", () => {
    test("renders the main heading with name", () => {
      render(<HeroSection />);

      expect(
        screen.getByRole("heading", { name: /brendan walsh/i }),
      ).toBeDefined();
    });

    test("renders the subtitle", () => {
      render(<HeroSection />);

      expect(screen.getByText("Frontend Software Developer")).toBeDefined();
    });

    test("renders the tagline", () => {
      render(<HeroSection />);

      expect(
        screen.getByText(
          /frontend developer focused on creating pixel perfect user interfaces/i,
        ),
      ).toBeDefined();
    });

    test("renders the CTA button", () => {
      render(<HeroSection />);

      expect(screen.getByText("See What I've Worked On")).toBeDefined();
    });

    test("renders the scroll down icon", () => {
      render(<HeroSection />);

      expect(screen.getByTestId("font-awesome-icon")).toBeDefined();
    });

    test("renders particles container", () => {
      render(<HeroSection />);

      const particlesContainer = document.getElementById("particles-js");
      expect(particlesContainer).not.toBeNull();
    });
  });

  describe("section attributes", () => {
    test("has correct id for navigation", () => {
      render(<HeroSection />);

      const section = document.getElementById("home");
      expect(section).not.toBeNull();
      expect(section?.tagName).toBe("SECTION");
    });

    test("section has correct styling classes", () => {
      render(<HeroSection />);

      const section = document.getElementById("home");
      expect(section?.className).toContain("relative");
      expect(section?.className).toContain("min-h-[100dvh]");
      expect(section?.className).toContain("bg-brand-primary");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("flex-col");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });
  });

  describe("CTA button", () => {
    test("links to work section", () => {
      render(<HeroSection />);

      const ctaButton = screen.getByText("See What I've Worked On").closest("a");
      expect(ctaButton?.getAttribute("href")).toBe("#work");
    });
  });

  describe("scroll down link", () => {
    test("links to projects section", () => {
      render(<HeroSection />);

      const scrollLink = screen
        .getAllByTestId("next-link")
        .find((link) => link.getAttribute("href") === "#projects");
      expect(scrollLink).toBeDefined();
    });

    test("has bounce animation class", () => {
      render(<HeroSection />);

      const scrollLink = screen
        .getAllByTestId("next-link")
        .find((link) => link.getAttribute("href") === "#projects");
      expect(scrollLink?.className).toContain("animate-bounce");
    });

    test("is positioned at bottom", () => {
      render(<HeroSection />);

      const scrollLink = screen
        .getAllByTestId("next-link")
        .find((link) => link.getAttribute("href") === "#projects");
      expect(scrollLink?.className).toContain("absolute");
      expect(scrollLink?.className).toContain("bottom-0");
    });
  });

  describe("heading", () => {
    test("heading is h1 level", () => {
      render(<HeroSection />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.textContent).toBe("Brendan Walsh");
    });

    test("heading has correct styling classes", () => {
      render(<HeroSection />);

      const heading = screen.getByRole("heading", { name: /brendan walsh/i });
      expect(heading.className).toContain("text-white");
      expect(heading.className).toContain("text-heading-h1");
      expect(heading.className).toContain("font-heading-h1-600");
    });

    test("heading has AOS animation attribute", () => {
      render(<HeroSection />);

      const heading = screen.getByRole("heading", { name: /brendan walsh/i });
      expect(heading.getAttribute("data-aos")).toBe("zoom-in");
    });
  });

  describe("subtitle", () => {
    test("subtitle is rendered as strong element", () => {
      render(<HeroSection />);

      const subtitle = screen.getByText("Frontend Software Developer");
      expect(subtitle.tagName).toBe("STRONG");
    });

    test("subtitle has correct styling classes", () => {
      render(<HeroSection />);

      const subtitle = screen.getByText("Frontend Software Developer");
      expect(subtitle.className).toContain("text-white");
      expect(subtitle.className).toContain("block");
      expect(subtitle.className).toContain("mb-5");
    });
  });

  describe("tagline", () => {
    test("tagline has AOS animation attributes", () => {
      render(<HeroSection />);

      const tagline = screen.getByText(
        /frontend developer focused on creating pixel perfect/i,
      );
      expect(tagline.getAttribute("data-aos")).toBe("fade-up");
      expect(tagline.getAttribute("data-aos-duration")).toBe("2000");
    });
  });

  describe("layout", () => {
    test("renders accent divider", () => {
      const { container } = render(<HeroSection />);

      const divider = container.querySelector(".bg-accent.h-2.w-8");
      expect(divider).not.toBeNull();
      expect(divider?.className).toContain("mb-5");
    });

    test("content wrapper has correct z-index", () => {
      const { container } = render(<HeroSection />);

      const contentWrapper = container.querySelector(".z-10");
      expect(contentWrapper).not.toBeNull();
    });

    test("CTA container has margin top", () => {
      const { container } = render(<HeroSection />);

      const ctaContainer = container.querySelector(".mt-4");
      expect(ctaContainer).not.toBeNull();
    });
  });

  describe("particles background", () => {
    test("particles container has correct id", () => {
      render(<HeroSection />);

      const particlesContainer = document.getElementById("particles-js");
      expect(particlesContainer).not.toBeNull();
    });

    test("particles container is positioned absolutely", () => {
      render(<HeroSection />);

      const particlesContainer = document.getElementById("particles-js");
      expect(particlesContainer?.className).toContain("absolute");
    });

    test("particles container covers full area", () => {
      render(<HeroSection />);

      const particlesContainer = document.getElementById("particles-js");
      expect(particlesContainer?.className).toContain("w-full");
      expect(particlesContainer?.className).toContain("h-full");
    });

    test("particles container has lower z-index", () => {
      render(<HeroSection />);

      const particlesContainer = document.getElementById("particles-js");
      expect(particlesContainer?.className).toContain("z-0");
    });
  });

  describe("accessibility", () => {
    test("section has id for anchor navigation", () => {
      render(<HeroSection />);

      const section = document.getElementById("home");
      expect(section).not.toBeNull();
    });

    test("particles container is hidden from screen readers", () => {
      render(<HeroSection />);

      const particlesContainer = document.getElementById("particles-js");
      expect(particlesContainer?.getAttribute("aria-hidden")).toBe("true");
    });

    test("scroll down icon is hidden from screen readers", () => {
      render(<HeroSection />);

      const icon = screen.getByTestId("font-awesome-icon");
      expect(icon.getAttribute("aria-hidden")).toBe("true");
    });

    test("main heading is accessible", () => {
      render(<HeroSection />);

      const heading = screen.getByRole("heading", { name: /brendan walsh/i });
      expect(heading).toBeDefined();
    });
  });

  describe("AOS animations", () => {
    test("heading has zoom-in animation", () => {
      render(<HeroSection />);

      const heading = screen.getByRole("heading", { name: /brendan walsh/i });
      expect(heading.getAttribute("data-aos")).toBe("zoom-in");
    });

    test("tagline has fade-up animation with duration", () => {
      render(<HeroSection />);

      const tagline = screen.getByText(
        /frontend developer focused on creating pixel perfect/i,
      );
      expect(tagline.getAttribute("data-aos")).toBe("fade-up");
      expect(tagline.getAttribute("data-aos-duration")).toBe("2000");
    });

    test("CTA container has fade-up animation with delay", () => {
      const { container } = render(<HeroSection />);

      const ctaContainer = container.querySelector("[data-aos-delay='800']");
      expect(ctaContainer).not.toBeNull();
      expect(ctaContainer?.getAttribute("data-aos")).toBe("fade-up");
      expect(ctaContainer?.getAttribute("data-aos-duration")).toBe("2000");
    });
  });
});
