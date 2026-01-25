import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import AppModal from "@/app/components/app/AppModal";

// Mock FontAwesome to avoid rendering issues
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon, ...props }: { icon: unknown }) => (
    <span data-testid="font-awesome-icon" {...props} />
  ),
}));

// Mock requestAnimationFrame for animation testing
const mockRaf = vi.fn((cb: FrameRequestCallback) => {
  cb(0);
  return 0;
});

beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", mockRaf);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  document.body.style.overflow = "";
});

describe("AppModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: "Test Modal Title",
  };

  describe("rendering", () => {
    test("renders nothing when isOpen is false", () => {
      render(
        <AppModal {...defaultProps} isOpen={false}>
          <p>Modal content</p>
        </AppModal>,
      );

      expect(screen.queryByRole("dialog")).toBeNull();
    });

    test("renders modal when isOpen is true", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Modal content</p>
          </AppModal>,
        );
      });

      expect(screen.getByRole("dialog")).toBeDefined();
    });

    test("renders title correctly", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps} title="Custom Title">
            <p>Content</p>
          </AppModal>,
        );
      });

      expect(screen.getByText("Custom Title")).toBeDefined();
    });

    test("renders children content", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Modal body content</p>
          </AppModal>,
        );
      });

      expect(screen.getByText("Modal body content")).toBeDefined();
    });

    test("renders close button", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      expect(screen.getByRole("button", { name: /close/i })).toBeDefined();
    });

    test("renders complex children", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <div>
              <h3>Section Title</h3>
              <p>Paragraph text</p>
              <button>Action Button</button>
            </div>
          </AppModal>,
        );
      });

      expect(screen.getByText("Section Title")).toBeDefined();
      expect(screen.getByText("Paragraph text")).toBeDefined();
      expect(screen.getByRole("button", { name: /action button/i })).toBeDefined();
    });
  });

  describe("close functionality", () => {
    test("calls onClose when close button is clicked", async () => {
      const onClose = vi.fn();

      await act(async () => {
        render(
          <AppModal {...defaultProps} onClose={onClose}>
            <p>Content</p>
          </AppModal>,
        );
      });

      const closeButton = screen.getByRole("button", { name: /close/i });
      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("calls onClose when backdrop is clicked", async () => {
      const onClose = vi.fn();

      await act(async () => {
        render(
          <AppModal {...defaultProps} onClose={onClose}>
            <p>Content</p>
          </AppModal>,
        );
      });

      // Find the backdrop (the overlay div with onClick)
      const backdrop = document.querySelector(".fixed.inset-0.bg-black");
      expect(backdrop).not.toBeNull();

      fireEvent.click(backdrop!);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("calls onClose when Escape key is pressed", async () => {
      const onClose = vi.fn();

      await act(async () => {
        render(
          <AppModal {...defaultProps} onClose={onClose}>
            <p>Content</p>
          </AppModal>,
        );
      });

      fireEvent.keyDown(document, { key: "Escape" });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("does not call onClose for other keys", async () => {
      const onClose = vi.fn();

      await act(async () => {
        render(
          <AppModal {...defaultProps} onClose={onClose}>
            <p>Content</p>
          </AppModal>,
        );
      });

      fireEvent.keyDown(document, { key: "Enter" });
      fireEvent.keyDown(document, { key: "Tab" });
      fireEvent.keyDown(document, { key: "a" });

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("body overflow management", () => {
    test("sets body overflow to hidden when open", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      expect(document.body.style.overflow).toBe("hidden");
    });

    test("resets body overflow when closed", async () => {
      const { rerender } = render(
        <AppModal {...defaultProps}>
          <p>Content</p>
        </AppModal>,
      );

      await act(async () => {
        rerender(
          <AppModal {...defaultProps} isOpen={false}>
            <p>Content</p>
          </AppModal>,
        );
      });

      expect(document.body.style.overflow).toBe("unset");
    });
  });

  describe("accessibility", () => {
    test("has dialog role", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      expect(screen.getByRole("dialog")).toBeDefined();
    });

    test("has aria-modal attribute", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      const dialog = screen.getByRole("dialog");
      expect(dialog.getAttribute("aria-modal")).toBe("true");
    });

    test("has aria-labelledby pointing to title", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      const dialog = screen.getByRole("dialog");
      expect(dialog.getAttribute("aria-labelledby")).toBe("app-modal-title");

      const title = document.getElementById("app-modal-title");
      expect(title).not.toBeNull();
      expect(title?.textContent).toBe("Test Modal Title");
    });

    test("close button has aria-label", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      const closeButton = screen.getByRole("button", { name: /close/i });
      expect(closeButton.getAttribute("aria-label")).toBe("Close");
    });
  });

  describe("animation", () => {
    test("modal content has transition classes", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("transition-opacity");
      expect(dialog.className).toContain("duration-[1000ms]");
    });

    test("backdrop has transition classes", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      const backdrop = document.querySelector(".fixed.inset-0.bg-black");
      expect(backdrop?.className).toContain("transition-opacity");
      expect(backdrop?.className).toContain("duration-[1000ms]");
    });

    test("modal becomes visible after animation", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("opacity-100");
    });
  });

  describe("styling", () => {
    test("modal is fixed positioned", async () => {
      const { container } = await act(async () => {
        return render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      const modalWrapper = container.querySelector(".fixed.inset-0.z-50");
      expect(modalWrapper).not.toBeNull();
    });

    test("modal content has max width constraint", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("max-w-[75rem]");
    });

    test("modal content has max height constraint", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("max-h-[85%]");
    });

    test("modal content is scrollable", async () => {
      await act(async () => {
        render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("overflow-y-scroll");
    });
  });

  describe("cleanup", () => {
    test("removes event listener on unmount", async () => {
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const { unmount } = await act(async () => {
        return render(
          <AppModal {...defaultProps}>
            <p>Content</p>
          </AppModal>,
        );
      });

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});
