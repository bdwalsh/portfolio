type ScrollHashOptions = {
  offset?: number;
  sectionSelector?: string;
};

const buildUrl = (hash: string) => {
  const { pathname, search } = window.location;
  return `${pathname}${search}${hash}`;
};

export const clearHashOnLoad = () => {
  if (typeof window === "undefined") return;

  const clear = () => {
    if (window.location.hash) {
      window.history.replaceState(null, "", buildUrl(""));
      window.scrollTo(0, 0);
    }
  };

  // Run immediately
  clear();

  // Run again after load to catch browser scroll restoration
  if (document.readyState !== "complete") {
    window.addEventListener("load", () => {
      window.setTimeout(clear, 0);
    }, { once: true });
  }
};

export const setupScrollHash = ({
  offset = 0,
  sectionSelector = "section[id]",
}: ScrollHashOptions = {}) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(sectionSelector),
  ).sort((a, b) => a.offsetTop - b.offsetTop);

  if (!sections.length) {
    return () => {};
  }

  const updateHash = () => {
    const position = window.scrollY + offset;
    let activeId: string | null = null;

    for (const section of sections) {
      if (position >= section.offsetTop) {
        activeId = section.id;
      } else {
        break;
      }
    }

    const nextHash = activeId ? `#${activeId}` : "";
    const nextUrl = buildUrl(nextHash);
    const currentUrl = buildUrl(window.location.hash);

    if (nextUrl !== currentUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateHash();
      ticking = false;
    });
  };

  // Delay initial hash update to avoid interfering with clearHashOnLoad
  window.setTimeout(updateHash, 100);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateHash);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", updateHash);
  };
};
