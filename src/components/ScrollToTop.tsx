import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = (): null => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    const frameId = requestAnimationFrame(() => {
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant" as ScrollBehavior,
        });
      } catch {
        window.scrollTo(0, 0);
      }

      setTimeout(() => {
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.focus({ preventScroll: true });
        }
      }, 10);
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
