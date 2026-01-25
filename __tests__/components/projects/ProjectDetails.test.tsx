import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ProjectDetails from "@/app/components/projects/ProjectDetails";

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

// Mock next/link for AppButton
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

// Mock FontAwesome for AppModal
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="font-awesome-icon" />,
}));

// Mock ProjectHighlightsDisplay to simplify testing
vi.mock("@/app/components/highlights/ProjectHighlightsDisplay", () => ({
  default: ({ projectId }: { projectId: number }) => (
    <div data-testid="project-highlights-display" data-project-id={projectId}>
      Mocked Highlights for Project {projectId}
    </div>
  ),
}));

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

// Factory function for creating test props
const createProjectDetailsProps = (overrides = {}) => ({
  id: 1,
  title: "Test Project",
  description: "This is a test project description",
  featureImage: "/images/test-project.png",
  icons: ["/icons/icon1.svg", "/icons/icon2.svg"],
  altText: "Test project screenshot",
  ...overrides,
});

describe("ProjectDetails", () => {
  describe("rendering", () => {
    test("renders project title", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      expect(
        screen.getByRole("heading", { name: "Test Project" }),
      ).toBeDefined();
    });

    test("renders project description", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      expect(
        screen.getByText("This is a test project description"),
      ).toBeDefined();
    });

    test("renders feature image with correct props", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      const images = screen.getAllByTestId("next-image");
      const featureImage = images[0];

      expect(featureImage.getAttribute("src")).toBe("/images/test-project.png");
      expect(featureImage.getAttribute("alt")).toBe("Test project screenshot");
      expect(featureImage.getAttribute("width")).toBe("750");
      expect(featureImage.getAttribute("height")).toBe("329");
    });

    test("renders icons", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      const images = screen.getAllByTestId("next-image");
      // First image is feature image, rest are icons
      expect(images).toHaveLength(3); // 1 feature + 2 icons
    });

    test("renders Video Highlights button", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      expect(screen.getByText("Video Highlights")).toBeDefined();
    });
  });

  describe("conditional rendering", () => {
    test("does not render description when empty", () => {
      render(
        <ProjectDetails {...createProjectDetailsProps({ description: "" })} />,
      );

      // Title should exist but description paragraph should not
      expect(
        screen.getByRole("heading", { name: "Test Project" }),
      ).toBeDefined();
      expect(
        screen.queryByText("This is a test project description"),
      ).toBeNull();
    });

    test("renders without icons when not provided", () => {
      render(
        <ProjectDetails {...createProjectDetailsProps({ icons: undefined })} />,
      );

      const images = screen.getAllByTestId("next-image");
      // Only feature image should exist
      expect(images).toHaveLength(1);
    });

    test("renders without icons when array is empty", () => {
      render(
        <ProjectDetails {...createProjectDetailsProps({ icons: [] })} />,
      );

      const images = screen.getAllByTestId("next-image");
      expect(images).toHaveLength(1);
    });
  });

  describe("modal functionality", () => {
    test("modal is initially closed", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      expect(screen.queryByRole("dialog")).toBeNull();
    });

    test("opens modal when Video Highlights button is clicked", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      const button = screen.getByText("Video Highlights");
      fireEvent.click(button);

      expect(screen.getByRole("dialog")).toBeDefined();
    });

    test("modal displays project title", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      const button = screen.getByText("Video Highlights");
      fireEvent.click(button);

      // Modal should show the project title
      const modalTitle = screen.getByText("Test Project", {
        selector: "#app-modal-title",
      });
      expect(modalTitle).toBeDefined();
    });

    test("modal contains ProjectHighlightsDisplay with correct projectId", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      const button = screen.getByText("Video Highlights");
      fireEvent.click(button);

      const highlightsDisplay = screen.getByTestId(
        "project-highlights-display",
      );
      expect(highlightsDisplay.getAttribute("data-project-id")).toBe("1");
    });

    test("closes modal when close button is clicked", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      // Open modal
      const button = screen.getByText("Video Highlights");
      fireEvent.click(button);
      expect(screen.getByRole("dialog")).toBeDefined();

      // Close modal
      const closeButton = screen.getByRole("button", { name: /close/i });
      fireEvent.click(closeButton);

      expect(screen.queryByRole("dialog")).toBeNull();
    });

    test("closes modal when backdrop is clicked", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      // Open modal
      const button = screen.getByText("Video Highlights");
      fireEvent.click(button);

      // Click backdrop
      const backdrop = document.querySelector(".fixed.inset-0.bg-black");
      fireEvent.click(backdrop!);

      expect(screen.queryByRole("dialog")).toBeNull();
    });

    test("closes modal when Escape key is pressed", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      // Open modal
      const button = screen.getByText("Video Highlights");
      fireEvent.click(button);
      expect(screen.getByRole("dialog")).toBeDefined();

      // Press Escape
      fireEvent.keyDown(document, { key: "Escape" });

      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  describe("layout and styling", () => {
    test("has grid layout classes", () => {
      const { container } = render(
        <ProjectDetails {...createProjectDetailsProps()} />,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("grid");
      expect(wrapper.className).toContain("grid-cols-6");
      expect(wrapper.className).toContain("gap-x-8");
      expect(wrapper.className).toContain("mb-20");
    });

    test("title has correct styling", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      const title = screen.getByRole("heading", { name: "Test Project" });
      expect(title.className).toContain("text-heading-h2");
      expect(title.className).toContain("mb-2");
    });

    test("icons are rendered in a list", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      const list = screen.getByRole("list");
      expect(list).toBeDefined();
      expect(list.className).toContain("flex");
      expect(list.className).toContain("mt-4");
    });

    test("each icon is in a list item", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(2);
    });

    test("button has margin top class", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      const button = screen.getByText("Video Highlights").closest("a");
      expect(button?.className).toContain("mt-8");
    });
  });

  describe("icon rendering", () => {
    test("renders correct number of icons", () => {
      const icons = ["/icon1.svg", "/icon2.svg", "/icon3.svg"];
      render(<ProjectDetails {...createProjectDetailsProps({ icons })} />);

      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(3);
    });

    test("icon images have correct attributes", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      const images = screen.getAllByTestId("next-image");
      // Skip first image (feature image), check icon images
      const iconImages = images.slice(1);

      expect(iconImages[0].getAttribute("src")).toBe("/icons/icon1.svg");
      expect(iconImages[0].getAttribute("width")).toBe("25");
      expect(iconImages[0].getAttribute("height")).toBe("25");
    });

    test("icon images use altText for alt attribute", () => {
      render(<ProjectDetails {...createProjectDetailsProps()} />);

      const images = screen.getAllByTestId("next-image");
      const iconImages = images.slice(1);

      iconImages.forEach((img) => {
        expect(img.getAttribute("alt")).toBe("Test project screenshot");
      });
    });
  });

  describe("different project data", () => {
    test("renders with different project data", () => {
      render(
        <ProjectDetails
          {...createProjectDetailsProps({
            id: 5,
            title: "Another Project",
            description: "Different description",
            featureImage: "/images/another.png",
            altText: "Another screenshot",
          })}
        />,
      );

      expect(
        screen.getByRole("heading", { name: "Another Project" }),
      ).toBeDefined();
      expect(screen.getByText("Different description")).toBeDefined();

      const featureImage = screen.getAllByTestId("next-image")[0];
      expect(featureImage.getAttribute("src")).toBe("/images/another.png");
      expect(featureImage.getAttribute("alt")).toBe("Another screenshot");
    });

    test("passes correct projectId to modal when opened", () => {
      render(
        <ProjectDetails {...createProjectDetailsProps({ id: 42 })} />,
      );

      const button = screen.getByText("Video Highlights");
      fireEvent.click(button);

      const highlightsDisplay = screen.getByTestId(
        "project-highlights-display",
      );
      expect(highlightsDisplay.getAttribute("data-project-id")).toBe("42");
    });
  });
});
