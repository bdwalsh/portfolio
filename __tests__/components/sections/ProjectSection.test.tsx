import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ProjectsSection from "@/app/components/sections/ProjectsSection";

// Use vi.hoisted to make mock data available before vi.mock hoisting
const { mockProjectDetailsData } = vi.hoisted(() => {
  const mockProjectDetailsData = [
    {
      id: 1,
      title: "Project One",
      description: "Description for project one",
      featureImage: "/images/project-one.png",
      icons: ["/icons/icon1.svg"],
      altText: "Project one screenshot",
    },
    {
      id: 2,
      title: "Project Two",
      description: "Description for project two",
      featureImage: "/images/project-two.png",
      icons: ["/icons/icon2.svg"],
      altText: "Project two screenshot",
    },
    {
      id: 3,
      title: "Project Three",
      description: "Description for project three",
      featureImage: "/images/project-three.png",
      icons: [],
      altText: "Project three screenshot",
    },
  ];

  return { mockProjectDetailsData };
});

// Mock project data
vi.mock("@/app/data/projects", () => ({
  projectDetailsData: mockProjectDetailsData,
}));

// Mock ProjectDetails component
vi.mock("@/app/components/projects/ProjectDetails", () => ({
  default: ({ id, title }: { id: number; title: string }) => (
    <div data-testid={`project-details-${id}`} data-project-id={id}>
      <h2>{title}</h2>
    </div>
  ),
}));

// Mock next/link for AppButton
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
    target,
    rel,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    target?: string;
    rel?: string;
  }) => (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      data-testid="next-link"
    >
      {children}
    </a>
  ),
}));

afterEach(() => {
  cleanup();
});

describe("ProjectsSection", () => {
  describe("rendering", () => {
    test("renders the section heading", () => {
      render(<ProjectsSection />);

      expect(
        screen.getByRole("heading", { name: /projects i've worked on/i }),
      ).toBeDefined();
    });

    test("renders all projects from data", () => {
      render(<ProjectsSection />);

      expect(screen.getByTestId("project-details-1")).toBeDefined();
      expect(screen.getByTestId("project-details-2")).toBeDefined();
      expect(screen.getByTestId("project-details-3")).toBeDefined();
    });

    test("renders project titles", () => {
      render(<ProjectsSection />);

      expect(screen.getByText("Project One")).toBeDefined();
      expect(screen.getByText("Project Two")).toBeDefined();
      expect(screen.getByText("Project Three")).toBeDefined();
    });

    test("renders portfolio info text", () => {
      render(<ProjectsSection />);

      expect(screen.getByText(/curious about this site/i)).toBeDefined();
    });

    test("renders GitHub button", () => {
      render(<ProjectsSection />);

      expect(
        screen.getByText("View my portfolio site on github"),
      ).toBeDefined();
    });

    test("renders tech stack mentions", () => {
      render(<ProjectsSection />);

      expect(screen.getByText("React")).toBeDefined();
      expect(screen.getByText("Next.js")).toBeDefined();
      expect(screen.getByText("Tailwind")).toBeDefined();
    });
  });

  describe("section attributes", () => {
    test("has correct id for navigation", () => {
      render(<ProjectsSection />);

      const section = document.getElementById("projects");
      expect(section).not.toBeNull();
      expect(section?.tagName).toBe("SECTION");
    });

    test("section has correct styling classes", () => {
      render(<ProjectsSection />);

      const section = document.getElementById("projects");
      expect(section?.className).toContain("bg-brand-primary");
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("flex-col");
      expect(section?.className).toContain("items-center");
      expect(section?.className).toContain("justify-center");
    });
  });

  describe("project list", () => {
    test("renders correct number of projects", () => {
      render(<ProjectsSection />);

      const projectElements = screen.getAllByTestId(/project-details-/);
      expect(projectElements).toHaveLength(3);
    });

    test("passes correct props to ProjectDetails", () => {
      render(<ProjectsSection />);

      const project1 = screen.getByTestId("project-details-1");
      expect(project1.getAttribute("data-project-id")).toBe("1");

      const project2 = screen.getByTestId("project-details-2");
      expect(project2.getAttribute("data-project-id")).toBe("2");
    });
  });

  describe("AOS animations", () => {
    test("project wrappers have AOS attributes", () => {
      const { container } = render(<ProjectsSection />);

      const animatedElements = container.querySelectorAll("[data-aos]");
      expect(animatedElements.length).toBeGreaterThanOrEqual(3);
    });

    test("projects have fade-right animation", () => {
      const { container } = render(<ProjectsSection />);

      const projectWrapper = container.querySelector(
        "[data-aos='fade-right']",
      );
      expect(projectWrapper).not.toBeNull();
    });

    test("projects have aos-delay attribute", () => {
      const { container } = render(<ProjectsSection />);

      const projectWrapper = container.querySelector("[data-aos-delay='0']");
      expect(projectWrapper).not.toBeNull();
    });
  });

  describe("GitHub link", () => {
    test("has correct href", () => {
      render(<ProjectsSection />);

      const githubLink = screen
        .getAllByTestId("next-link")
        .find((link) =>
          link.getAttribute("href")?.includes("github.com/bdwalsh/portfolio"),
        );
      expect(githubLink).toBeDefined();
      expect(githubLink?.getAttribute("href")).toBe(
        "https://github.com/bdwalsh/portfolio",
      );
    });

    test("opens in new tab", () => {
      render(<ProjectsSection />);

      const githubLink = screen
        .getAllByTestId("next-link")
        .find((link) =>
          link.getAttribute("href")?.includes("github.com/bdwalsh/portfolio"),
        );
      expect(githubLink?.getAttribute("target")).toBe("_blank");
    });

    test("has security rel attributes", () => {
      render(<ProjectsSection />);

      const githubLink = screen
        .getAllByTestId("next-link")
        .find((link) =>
          link.getAttribute("href")?.includes("github.com/bdwalsh/portfolio"),
        );
      expect(githubLink?.getAttribute("rel")).toBe("noreferrer noopener");
    });
  });

  describe("heading", () => {
    test("heading is h1 level", () => {
      render(<ProjectsSection />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.textContent).toBe("Projects I've Worked On");
    });

    test("heading has correct styling classes", () => {
      render(<ProjectsSection />);

      const heading = screen.getByRole("heading", {
        name: /projects i've worked on/i,
      });
      expect(heading.className).toContain("text-white");
      expect(heading.className).toContain("text-heading-h1");
      expect(heading.className).toContain("font-heading-h1-600");
    });
  });

  describe("layout", () => {
    test("renders accent divider", () => {
      const { container } = render(<ProjectsSection />);

      const divider = container.querySelector(".bg-accent.h-2.w-8");
      expect(divider).not.toBeNull();
      expect(divider?.className).toContain("mb-12");
    });

    test("footer section has flex column layout", () => {
      const { container } = render(<ProjectsSection />);

      const footerContainer = container.querySelector(
        ".flex.flex-col.justify-center.items-center",
      );
      expect(footerContainer).not.toBeNull();
    });

    test("GitHub button has margin top", () => {
      render(<ProjectsSection />);

      const githubLink = screen
        .getAllByTestId("next-link")
        .find((link) =>
          link.getAttribute("href")?.includes("github.com/bdwalsh/portfolio"),
        );
      expect(githubLink?.className).toContain("mt-8");
    });
  });

  describe("portfolio info", () => {
    test("mentions React as strong element", () => {
      render(<ProjectsSection />);

      const reactText = screen.getByText("React");
      expect(reactText.tagName).toBe("STRONG");
    });

    test("mentions Next.js as strong element", () => {
      render(<ProjectsSection />);

      const nextText = screen.getByText("Next.js");
      expect(nextText.tagName).toBe("STRONG");
    });

    test("mentions Tailwind as strong element", () => {
      render(<ProjectsSection />);

      const tailwindText = screen.getByText("Tailwind");
      expect(tailwindText.tagName).toBe("STRONG");
    });
  });

  describe("accessibility", () => {
    test("section has id for anchor navigation", () => {
      render(<ProjectsSection />);

      const section = document.getElementById("projects");
      expect(section).not.toBeNull();
    });

    test("main heading is accessible", () => {
      render(<ProjectsSection />);

      const heading = screen.getByRole("heading", {
        name: /projects i've worked on/i,
      });
      expect(heading).toBeDefined();
    });

    test("GitHub link is accessible", () => {
      render(<ProjectsSection />);

      const link = screen.getByRole("link", {
        name: /view my portfolio site on github/i,
      });
      expect(link).toBeDefined();
    });

    test("external link has proper security attributes", () => {
      render(<ProjectsSection />);

      const externalLink = screen.getByRole("link", {
        name: /view my portfolio site on github/i,
      });
      expect(externalLink.getAttribute("rel")).toContain("noreferrer");
      expect(externalLink.getAttribute("rel")).toContain("noopener");
    });
  });
});
