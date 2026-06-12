import { useEffect, useState, useCallback, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 300;

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      const currentY = window.scrollY || document.documentElement.scrollTop;
      if (currentY !== lastScrollY.current) {
        lastScrollY.current = currentY;
        setVisible(currentY > SCROLL_THRESHOLD);
      }
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={cn(
        "fixed z-50 flex items-center justify-center rounded-full",
        "border border-white/[0.08] bg-background/60 backdrop-blur-2xl",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.4),0_1px_4px_rgba(0,0,0,0.3)]",
        "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "group cursor-pointer",
        "hover:-translate-y-0.5 hover:scale-105",
        "hover:border-white/[0.14]",
        "hover:bg-primary/10",
        "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3),0_0_20px_hsl(var(--primary)/0.12)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "bottom-5 right-4 size-10 md:bottom-8 md:right-8 md:size-11",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none",
      )}
    >
      {/* Layered inner highlight */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full",
          "bg-gradient-to-b from-white/[0.06] to-transparent",
        )}
      />

      {/* Soft primary glow ring */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full opacity-0",
          "bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15)_0%,transparent_70%)]",
          "transition-opacity duration-500 group-hover:opacity-100",
        )}
      />

      <ArrowUp
        className={cn(
          "relative size-4 md:size-[18px]",
          "text-muted-foreground",
          "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "group-hover:-translate-y-0.5 group-hover:text-primary",
        )}
      />
    </button>
  );
}
