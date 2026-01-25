import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ProjectHighlightsDisplay from "@/app/components/highlights/ProjectHighlightsDisplay";

// Use vi.hoisted to make factory data available before vi.mock hoisting
const { mockProjectHighlightsData } = vi.hoisted(() => {
  // Inline factory functions since we can't import in hoisted context
  const createHighlight = (overrides = {}) => ({
    id: "highlight-default",
    title: "Default Highlight",
    description: "Default description",
    videoLink: "/videos/default-video.mp4",
    videoWidth: "700",
    ...overrides,
  });

  const createProjectHighlights = (overrides = {}) => ({
    id: 1,
    projectId: 1,
    title: "Default Project Highlights",
    highlights: [createHighlight()],
    ...overrides,
  });

  const mockProjectHighlightsData = [
    createProjectHighlights({
      id: 1,
      projectId: 1,
      title: "Test Project Highlights",
      highlights: [
        createHighlight({
          id: "highlight-1",
          title: "First Highlight",
          description: "Description for the first highlight",
          videoLink: "/videos/test-video-1.mp4",
          videoWidth: "700",
        }),
        createHighlight({
          id: "highlight-2",
          title: "Second Highlight",
          description: "Description for the second highlight",
          videoLink: "/videos/test-video-2.mp4",
          videoWidth: "500",
        }),
      ],
    }),
    createProjectHighlights({
      id: 2,
      projectId: 2,
      title: "Single Highlight Project",
      highlights: [
        createHighlight({
          id: "highlight-single",
          title: "Only Highlight",
          description: "This is the only highlight",
          videoLink: "/videos/single-video.mp4",
          videoWidth: "600",
        }),
      ],
    }),
    createProjectHighlights({
      id: 3,
      projectId: 3,
      title: "Empty Highlights Project",
      highlights: [],
    }),
  ];

  return { mockProjectHighlightsData };
});

// Mock the highlights data using factory
vi.mock("@/app/data/highlights", () => ({
  projectHighlightsData: mockProjectHighlightsData,
}));

afterEach(() => {
  cleanup();
});

describe("ProjectHighlightsDisplay", () => {
  describe("rendering", () => {
    test("renders highlights for valid projectId", () => {
      render(<ProjectHighlightsDisplay projectId={1} />);

      expect(screen.getByText("First Highlight")).toBeDefined();
      expect(screen.getByText("Second Highlight")).toBeDefined();
    });

    test("renders highlight descriptions", () => {
      render(<ProjectHighlightsDisplay projectId={1} />);

      expect(
        screen.getByText("Description for the first highlight"),
      ).toBeDefined();
      expect(
        screen.getByText("Description for the second highlight"),
      ).toBeDefined();
    });

    test("renders nothing for non-existent projectId", () => {
      const { container } = render(
        <ProjectHighlightsDisplay projectId={999} />,
      );

      expect(container.firstChild).toBeNull();
    });

    test("renders nothing for project with empty highlights", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={3} />);

      expect(container.firstChild).toBeNull();
    });

    test("renders single highlight correctly", () => {
      render(<ProjectHighlightsDisplay projectId={2} />);

      expect(screen.getByText("Only Highlight")).toBeDefined();
      expect(screen.getByText("This is the only highlight")).toBeDefined();
    });
  });

  describe("video elements", () => {
    test("renders video elements for each highlight", () => {
      render(<ProjectHighlightsDisplay projectId={1} />);

      const videos = screen.getAllByText(
        /your browser does not support the video tag/i,
      );
      expect(videos).toHaveLength(2);
    });

    test("video has correct attributes", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={1} />);

      const video = container.querySelector("video") as HTMLVideoElement;
      expect(video).not.toBeNull();
      // React sets these as properties, not attributes
      expect(video.autoplay).toBe(true);
      expect(video.muted).toBe(true);
      expect(video.loop).toBe(true);
      expect(video.getAttribute("preload")).toBe("none");
    });

    test("video has correct width from data", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={1} />);

      const videos = container.querySelectorAll("video");
      expect(videos[0].getAttribute("width")).toBe("700");
      expect(videos[1].getAttribute("width")).toBe("500");
    });

    test("video source has correct src", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={1} />);

      const sources = container.querySelectorAll("source");
      expect(sources[0].getAttribute("src")).toBe("/videos/test-video-1.mp4");
      expect(sources[1].getAttribute("src")).toBe("/videos/test-video-2.mp4");
    });

    test("video source has correct type", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={1} />);

      const source = container.querySelector("source");
      expect(source?.getAttribute("type")).toBe("video/mp4");
    });
  });

  describe("layout and styling", () => {
    test("applies margin bottom to all highlights except last", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={1} />);

      const highlightContainers = container.querySelectorAll(
        ".flex.flex-col.lg\\:flex-row",
      );

      expect(highlightContainers).toHaveLength(2);
      expect(highlightContainers[0].className).toContain("mb-14");
      expect(highlightContainers[1].className).not.toContain("mb-14");
    });

    test("single highlight does not have margin bottom", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={2} />);

      const highlightContainer = container.querySelector(
        ".flex.flex-col.lg\\:flex-row",
      );

      expect(highlightContainer?.className).not.toContain("mb-14");
    });

    test("highlight containers have responsive flex classes", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={1} />);

      const highlightContainer = container.querySelector(
        ".flex.flex-col.lg\\:flex-row",
      );

      expect(highlightContainer).not.toBeNull();
      expect(highlightContainer?.className).toContain("flex");
      expect(highlightContainer?.className).toContain("flex-col");
      expect(highlightContainer?.className).toContain("lg:flex-row");
    });

    test("video container has flex-shrink-0 class", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={1} />);

      const videoContainer = container.querySelector(".flex-shrink-0");
      expect(videoContainer).not.toBeNull();
    });

    test("content container has flex-1 class", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={1} />);

      const contentContainer = container.querySelector(".flex-1");
      expect(contentContainer).not.toBeNull();
    });
  });

  describe("title and description", () => {
    test("renders title in h2 element", () => {
      render(<ProjectHighlightsDisplay projectId={1} />);

      const headings = screen.getAllByRole("heading", { level: 2 });
      expect(headings).toHaveLength(2);
      expect(headings[0].textContent).toBe("First Highlight");
      expect(headings[1].textContent).toBe("Second Highlight");
    });

    test("title has correct styling classes", () => {
      render(<ProjectHighlightsDisplay projectId={1} />);

      const heading = screen.getByRole("heading", { name: "First Highlight" });
      expect(heading.className).toContain("text-xl");
      expect(heading.className).toContain("font-semibold");
    });

    test("renders accent divider between title and description", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={1} />);

      const dividers = container.querySelectorAll(".bg-accent");
      expect(dividers.length).toBeGreaterThan(0);
    });
  });

  describe("memoization", () => {
    test("finds correct project by projectId", () => {
      render(<ProjectHighlightsDisplay projectId={2} />);

      // Should only render highlights for projectId 2
      expect(screen.getByText("Only Highlight")).toBeDefined();
      expect(screen.queryByText("First Highlight")).toBeNull();
      expect(screen.queryByText("Second Highlight")).toBeNull();
    });

    test("renders different content for different projectIds", () => {
      const { rerender } = render(<ProjectHighlightsDisplay projectId={1} />);

      expect(screen.getByText("First Highlight")).toBeDefined();

      rerender(<ProjectHighlightsDisplay projectId={2} />);

      expect(screen.queryByText("First Highlight")).toBeNull();
      expect(screen.getByText("Only Highlight")).toBeDefined();
    });
  });

  describe("edge cases", () => {
    test("handles projectId of 0", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={0} />);

      expect(container.firstChild).toBeNull();
    });

    test("handles negative projectId", () => {
      const { container } = render(<ProjectHighlightsDisplay projectId={-1} />);

      expect(container.firstChild).toBeNull();
    });
  });
});
