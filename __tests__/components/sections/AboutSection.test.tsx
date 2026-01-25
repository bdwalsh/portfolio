import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import AboutSection from "@/app/components/sections/AboutSection";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="next-image"
    />
  ),
}));

afterEach(() => {
  cleanup();
});

describe("AboutSection", () => {
  describe("rendering", () => {
    test("renders the section heading", () => {
      render(<AboutSection />);

      expect(
        screen.getByRole("heading", { name: /about brendan/i }),
      ).toBeDefined();
    });

    test("renders the profile image", () => {
      render(<AboutSection />);

      const image = screen.getByTestId("next-image");
      expect(image).toBeDefined();
    });

    test("renders biographical content", () => {
      render(<AboutSection />);

      expect(
        screen.getByText(/has been working as a software developer since 2016/i),
      ).toBeDefined();
    });
  });

  describe("section attributes", () => {
    test("has correct id for navigation", () => {
      render(<AboutSection />);

      const section = document.getElementById("about");
      expect(section).not.toBeNull();
      expect(section?.tagName).toBe("SECTION");
    });

    test("section has correct styling classes", () => {
      render(<AboutSection />);

      const section = document.getElementById("about");
      expect(section?.className).toContain("bg-brand-primary");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("flex-col");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });
  });

  describe("profile image", () => {
    test("has correct src attribute", () => {
      render(<AboutSection />);

      const image = screen.getByTestId("next-image");
      expect(image.getAttribute("src")).toBe("/images/profile-image.jpg");
    });

    test("has descriptive alt text", () => {
      render(<AboutSection />);

      const image = screen.getByTestId("next-image");
      expect(image.getAttribute("alt")).toBe("Portrait of Brendan Walsh");
    });

    test("has correct dimensions", () => {
      render(<AboutSection />);

      const image = screen.getByTestId("next-image");
      expect(image.getAttribute("width")).toBe("250");
      expect(image.getAttribute("height")).toBe("200");
    });

    test("image container has rounded styling", () => {
      const { container } = render(<AboutSection />);

      const imageContainer = container.querySelector(".rounded-full");
      expect(imageContainer).not.toBeNull();
    });
  });

  describe("content", () => {
    test("mentions BCIT education", () => {
      render(<AboutSection />);

      expect(
        screen.getByText(/British Columbia Institute of Technology/i),
      ).toBeDefined();
    });

    test("mentions Convertus/AutoTrader experience", () => {
      render(<AboutSection />);

      expect(screen.getByText(/Convertus/i)).toBeDefined();
      expect(screen.getByText(/AutoTrader/i)).toBeDefined();
    });

    test("mentions Pixieset experience", () => {
      render(<AboutSection />);

      expect(screen.getByText(/Pixieset/i)).toBeDefined();
    });

    test("mentions technical skills", () => {
      render(<AboutSection />);

      expect(screen.getByText(/JavaScript/i)).toBeDefined();
      expect(screen.getByText(/Vue/i)).toBeDefined();
      expect(screen.getByText(/TypeScript/i)).toBeDefined();
    });

    test("bio text is centered", () => {
      render(<AboutSection />);

      const bioText = screen.getByText(
        /has been working as a software developer/i,
      ).closest("p");
      expect(bioText?.className).toContain("text-center");
    });
  });

  describe("heading", () => {
    test("heading is h1 level", () => {
      render(<AboutSection />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.textContent).toBe("About Brendan");
    });

    test("heading has correct styling classes", () => {
      render(<AboutSection />);

      const heading = screen.getByRole("heading", { name: /about brendan/i });
      expect(heading.className).toContain("text-white");
      expect(heading.className).toContain("text-heading-h1");
      expect(heading.className).toContain("font-heading-h1-600");
    });
  });

  describe("layout", () => {
    test("renders accent divider", () => {
      const { container } = render(<AboutSection />);

      const divider = container.querySelector(".bg-accent");
      expect(divider).not.toBeNull();
      expect(divider?.className).toContain("h-2");
      expect(divider?.className).toContain("w-8");
      expect(divider?.className).toContain("mb-12");
    });

    test("content container has flex column layout", () => {
      const { container } = render(<AboutSection />);

      const contentContainer = container.querySelector(
        ".flex.flex-col.items-center.justify-center",
      );
      expect(contentContainer).not.toBeNull();
    });

    test("image container has fixed dimensions", () => {
      const { container } = render(<AboutSection />);

      const imageContainer = container.querySelector(".w-\\[250px\\]");
      expect(imageContainer).not.toBeNull();
      expect(imageContainer?.className).toContain("h-[250px]");
      expect(imageContainer?.className).toContain("overflow-hidden");
      expect(imageContainer?.className).toContain("mb-8");
    });
  });

  describe("accessibility", () => {
    test("section has id for anchor navigation", () => {
      render(<AboutSection />);

      const section = document.getElementById("about");
      expect(section).not.toBeNull();
    });

    test("image has meaningful alt text", () => {
      render(<AboutSection />);

      const image = screen.getByAltText("Portrait of Brendan Walsh");
      expect(image).toBeDefined();
    });

    test("heading provides clear section identification", () => {
      render(<AboutSection />);

      const heading = screen.getByRole("heading", { name: /about brendan/i });
      expect(heading).toBeDefined();
    });
  });
});
