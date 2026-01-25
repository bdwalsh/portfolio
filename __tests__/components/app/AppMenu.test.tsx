import { afterEach, describe, expect, test } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import AppMenu from "@/app/components/app/AppMenu";

afterEach(() => {
  cleanup();
});

describe("AppMenu", () => {
  describe("rendering", () => {
    test("renders the navigation menu", () => {
      render(<AppMenu />);

      expect(screen.getByRole("navigation")).toBeDefined();
    });

    test("renders hamburger toggle button", () => {
      render(<AppMenu />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });
      expect(toggleButton).toBeDefined();
    });

    test("renders all navigation links", () => {
      render(<AppMenu />);

      expect(screen.getByRole("link", { name: /home/i })).toBeDefined();
      expect(screen.getByRole("link", { name: /projects/i })).toBeDefined();
      expect(screen.getByRole("link", { name: /skills/i })).toBeDefined();
      expect(screen.getByRole("link", { name: /about/i })).toBeDefined();
      expect(screen.getByRole("link", { name: /contact/i })).toBeDefined();
    });
  });

  describe("navigation links", () => {
    test("Home link points to #home", () => {
      render(<AppMenu />);

      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink.getAttribute("href")).toBe("#home");
    });

    test("Projects link points to #projects", () => {
      render(<AppMenu />);

      const projectsLink = screen.getByRole("link", { name: /projects/i });
      expect(projectsLink.getAttribute("href")).toBe("#projects");
    });

    test("Skills link points to #skills", () => {
      render(<AppMenu />);

      const skillsLink = screen.getByRole("link", { name: /skills/i });
      expect(skillsLink.getAttribute("href")).toBe("#skills");
    });

    test("About link points to #about", () => {
      render(<AppMenu />);

      const aboutLink = screen.getByRole("link", { name: /about/i });
      expect(aboutLink.getAttribute("href")).toBe("#about");
    });

    test("Contact link points to #contact", () => {
      render(<AppMenu />);

      const contactLink = screen.getByRole("link", { name: /contact/i });
      expect(contactLink.getAttribute("href")).toBe("#contact");
    });
  });

  describe("toggle functionality", () => {
    test("menu is initially closed", () => {
      render(<AppMenu />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });
      expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    });

    test("clicking toggle button opens the menu", () => {
      render(<AppMenu />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      fireEvent.click(toggleButton);

      expect(toggleButton.getAttribute("aria-expanded")).toBe("true");
    });

    test("clicking toggle button twice closes the menu", () => {
      render(<AppMenu />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);

      expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    });

    test("menu container has hidden class when closed", () => {
      render(<AppMenu />);

      const nav = screen.getByRole("navigation");
      const menuContainer = nav.parentElement;

      expect(menuContainer?.className).toContain("hidden");
    });

    test("menu container removes hidden class when open", () => {
      render(<AppMenu />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      fireEvent.click(toggleButton);

      const nav = screen.getByRole("navigation");
      const menuContainer = nav.parentElement;

      expect(menuContainer?.className).toContain("block");
      expect(menuContainer?.className).not.toMatch(/(?:^|\s)hidden(?:\s|$)/);
    });
  });

  describe("hamburger icon animation", () => {
    test("hamburger lines have closed state classes initially", () => {
      const { container } = render(<AppMenu />);

      const spans = container.querySelectorAll("button span");

      // First line - should translate up slightly
      expect(spans[0].className).toContain("-translate-y-0.5");
      expect(spans[0].className).not.toContain("rotate-45");

      // Middle line - should be visible
      expect(spans[1].className).toContain("opacity-100");

      // Third line - should translate down slightly
      expect(spans[2].className).toContain("translate-y-0.5");
      expect(spans[2].className).not.toContain("-rotate-45");
    });

    test("hamburger lines transform to X when open", () => {
      const { container } = render(<AppMenu />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      fireEvent.click(toggleButton);

      const spans = container.querySelectorAll("button span");

      // First line - should rotate to form X
      expect(spans[0].className).toContain("rotate-45");
      expect(spans[0].className).toContain("translate-y-1");

      // Middle line - should be hidden
      expect(spans[1].className).toContain("opacity-0");

      // Third line - should rotate opposite direction
      expect(spans[2].className).toContain("-rotate-45");
      expect(spans[2].className).toContain("-translate-y-1");
    });
  });

  describe("accessibility", () => {
    test("toggle button has accessible label", () => {
      render(<AppMenu />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });
      expect(toggleButton.getAttribute("aria-label")).toBe(
        "Toggle navigation menu",
      );
    });

    test("toggle button has aria-expanded attribute", () => {
      render(<AppMenu />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });
      expect(toggleButton.hasAttribute("aria-expanded")).toBe(true);
    });

    test("navigation has aria-label", () => {
      render(<AppMenu />);

      const nav = screen.getByRole("navigation", { name: /primary/i });
      expect(nav).toBeDefined();
    });

    test("aria-expanded reflects menu state", () => {
      render(<AppMenu />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation menu/i,
      });

      expect(toggleButton.getAttribute("aria-expanded")).toBe("false");

      fireEvent.click(toggleButton);
      expect(toggleButton.getAttribute("aria-expanded")).toBe("true");

      fireEvent.click(toggleButton);
      expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    });
  });

  describe("styling", () => {
    test("menu is fixed positioned", () => {
      const { container } = render(<AppMenu />);

      const menuWrapper = container.firstChild as HTMLElement;
      expect(menuWrapper.className).toContain("fixed");
    });

    test("menu is positioned at top", () => {
      const { container } = render(<AppMenu />);

      const menuWrapper = container.firstChild as HTMLElement;
      expect(menuWrapper.className).toContain("top-0");
    });

    test("menu has full width", () => {
      const { container } = render(<AppMenu />);

      const menuWrapper = container.firstChild as HTMLElement;
      expect(menuWrapper.className).toContain("w-full");
    });

    test("navigation links have hover styling class", () => {
      render(<AppMenu />);

      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink.className).toContain("hover:text-accent");
    });
  });
});
