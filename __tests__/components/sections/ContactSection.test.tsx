import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ContactSection from "@/app/components/sections/ContactSection";

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

describe("ContactSection", () => {
  describe("rendering", () => {
    test("renders the section heading", () => {
      render(<ContactSection />);

      expect(
        screen.getByRole("heading", { name: /get in touch/i }),
      ).toBeDefined();
    });

    test("renders email link", () => {
      render(<ContactSection />);

      expect(screen.getByText("bdwalsh075@gmail.com")).toBeDefined();
    });

    test("renders LinkedIn link", () => {
      render(<ContactSection />);

      expect(
        screen.getByText("www.linkedin.com/in/brendanwalsh3"),
      ).toBeDefined();
    });

    test("renders GitHub link", () => {
      render(<ContactSection />);

      expect(screen.getByText("https://github.com/bdwalsh")).toBeDefined();
    });

    test("renders social icons", () => {
      render(<ContactSection />);

      const images = screen.getAllByTestId("next-image");
      expect(images).toHaveLength(2); // LinkedIn and GitHub icons
    });
  });

  describe("section attributes", () => {
    test("has correct id for navigation", () => {
      render(<ContactSection />);

      const section = document.getElementById("contact");
      expect(section).not.toBeNull();
      expect(section?.tagName).toBe("SECTION");
    });

    test("section has correct styling classes", () => {
      render(<ContactSection />);

      const section = document.getElementById("contact");
      expect(section?.className).toContain("bg-brand-primary");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("flex-col");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });
  });

  describe("email link", () => {
    test("has correct mailto href", () => {
      render(<ContactSection />);

      const emailLink = screen.getByRole("link", {
        name: "bdwalsh075@gmail.com",
      });
      expect(emailLink.getAttribute("href")).toBe("mailto:bdwalsh075@gmail.com");
    });

    test("has hover styling class", () => {
      render(<ContactSection />);

      const emailLink = screen.getByRole("link", {
        name: "bdwalsh075@gmail.com",
      });
      expect(emailLink.className).toContain("hover:text-accent");
    });
  });

  describe("LinkedIn link", () => {
    test("has correct href", () => {
      render(<ContactSection />);

      const linkedInLink = screen.getByRole("link", {
        name: "www.linkedin.com/in/brendanwalsh3",
      });
      expect(linkedInLink.getAttribute("href")).toBe(
        "https://linkedin.com/in/brendanwalsh3",
      );
    });

    test("opens in new tab", () => {
      render(<ContactSection />);

      const linkedInLink = screen.getByRole("link", {
        name: "www.linkedin.com/in/brendanwalsh3",
      });
      expect(linkedInLink.getAttribute("target")).toBe("_blank");
    });

    test("has security rel attributes", () => {
      render(<ContactSection />);

      const linkedInLink = screen.getByRole("link", {
        name: "www.linkedin.com/in/brendanwalsh3",
      });
      expect(linkedInLink.getAttribute("rel")).toBe("noreferrer noopener");
    });

    test("has hover styling class", () => {
      render(<ContactSection />);

      const linkedInLink = screen.getByRole("link", {
        name: "www.linkedin.com/in/brendanwalsh3",
      });
      expect(linkedInLink.className).toContain("hover:text-accent");
    });
  });

  describe("GitHub link", () => {
    test("has correct href", () => {
      render(<ContactSection />);

      const githubLink = screen.getByRole("link", {
        name: "https://github.com/bdwalsh",
      });
      expect(githubLink.getAttribute("href")).toBe(
        "https://github.com/bdwalsh",
      );
    });

    test("opens in new tab", () => {
      render(<ContactSection />);

      const githubLink = screen.getByRole("link", {
        name: "https://github.com/bdwalsh",
      });
      expect(githubLink.getAttribute("target")).toBe("_blank");
    });

    test("has security rel attributes", () => {
      render(<ContactSection />);

      const githubLink = screen.getByRole("link", {
        name: "https://github.com/bdwalsh",
      });
      expect(githubLink.getAttribute("rel")).toBe("noreferrer noopener");
    });

    test("has hover styling class", () => {
      render(<ContactSection />);

      const githubLink = screen.getByRole("link", {
        name: "https://github.com/bdwalsh",
      });
      expect(githubLink.className).toContain("hover:text-accent");
    });
  });

  describe("social icons", () => {
    test("LinkedIn icon has correct src", () => {
      render(<ContactSection />);

      const images = screen.getAllByTestId("next-image");
      expect(images[0].getAttribute("src")).toBe(
        "/images/icons/linkedin-icon.svg",
      );
    });

    test("LinkedIn icon has correct alt text", () => {
      render(<ContactSection />);

      const linkedInIcon = screen.getByAltText("LinkedIn logo");
      expect(linkedInIcon).toBeDefined();
    });

    test("GitHub icon has correct src", () => {
      render(<ContactSection />);

      const images = screen.getAllByTestId("next-image");
      expect(images[1].getAttribute("src")).toBe(
        "/images/icons/github-white-icon.svg",
      );
    });

    test("GitHub icon has correct alt text", () => {
      render(<ContactSection />);

      const githubIcon = screen.getByAltText("GitHub logo");
      expect(githubIcon).toBeDefined();
    });

    test("icons have correct dimensions", () => {
      render(<ContactSection />);

      const images = screen.getAllByTestId("next-image");
      images.forEach((img) => {
        expect(img.getAttribute("width")).toBe("25");
        expect(img.getAttribute("height")).toBe("25");
      });
    });
  });

  describe("heading", () => {
    test("heading is h1 level", () => {
      render(<ContactSection />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.textContent).toBe("Get in Touch!");
    });

    test("heading has correct styling classes", () => {
      render(<ContactSection />);

      const heading = screen.getByRole("heading", { name: /get in touch/i });
      expect(heading.className).toContain("text-heading-h2");
      expect(heading.className).toContain("font-heading-h2-600");
      expect(heading.className).toContain("mb-2");
    });
  });

  describe("layout", () => {
    test("content container has flex column layout", () => {
      const { container } = render(<ContactSection />);

      const contentContainer = container.querySelector(
        ".flex.flex-col.items-center",
      );
      expect(contentContainer).not.toBeNull();
    });

    test("social link containers have flex layout", () => {
      const { container } = render(<ContactSection />);

      const flexContainers = container.querySelectorAll(
        ".flex.xl\\:text-heading-h3",
      );
      expect(flexContainers).toHaveLength(2);
    });
  });

  describe("accessibility", () => {
    test("section has id for anchor navigation", () => {
      render(<ContactSection />);

      const section = document.getElementById("contact");
      expect(section).not.toBeNull();
    });

    test("all links are accessible", () => {
      render(<ContactSection />);

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(3); // Email, LinkedIn, GitHub
    });

    test("icons have meaningful alt text", () => {
      render(<ContactSection />);

      expect(screen.getByAltText("LinkedIn logo")).toBeDefined();
      expect(screen.getByAltText("GitHub logo")).toBeDefined();
    });

    test("external links have proper security attributes", () => {
      render(<ContactSection />);

      const externalLinks = screen
        .getAllByRole("link")
        .filter((link) => link.getAttribute("target") === "_blank");

      expect(externalLinks).toHaveLength(2);
      externalLinks.forEach((link) => {
        expect(link.getAttribute("rel")).toContain("noreferrer");
        expect(link.getAttribute("rel")).toContain("noopener");
      });
    });
  });
});
