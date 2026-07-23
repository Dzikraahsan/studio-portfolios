import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import {
  MOTION_DURATION,
  MOTION_SPRING,
  calculateStaggerDelay,
  mobileMenuItemVariants,
  mobileMenuVariants,
} from "@/lib/motion";

// ─── Constants & Data Tokens ──────────────────────────────────────────────────

const NAV_LINKS = [
  { to: "/", label: "home" },
  { to: "/about", label: "about" },
  { to: "/projects", label: "projects" },
  { to: "/journey", label: "journey" },
  { to: "/legacy", label: "legacy" },
  { to: "/contact", label: "contact" },
] as const;

// ─── Navbar Component ─────────────────────────────────────────────────────────

const Navbar = memo(() => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Desktop Indicator Position Calculator
  const updateIndicator = useCallback(() => {
    // CRITICAL FIX: Bypass DOM measurement on mobile devices to prevent layout thrashing on scroll-resize
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIndicatorStyle((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      return;
    }

    const activeLink = linksRef.current[location.pathname];
    const container = containerRef.current;

    if (activeLink && container) {
      const activeRect = activeLink.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeLeft = activeRect.left - containerRect.left;

      setIndicatorStyle({
        left: `${relativeLeft}px`,
        width: `${activeRect.width}px`,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname]);

  // Window Resize Listener
  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  // HIGH FIX: Consolidated Mobile Overlay Side-Effects (Scroll Lock & Escape Key)
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  // Close Mobile Menu strictly on Route Change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
      >
        <div className="container flex items-center justify-between h-14">
          <Link
            to="/"
            className="font-mono text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm select-none [-webkit-tap-highlight-color:transparent]"
          >
            Dzii<span className="text-primary">27</span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <div
            ref={containerRef}
            className="relative hidden md:flex items-center gap-8 h-full py-1"
          >
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  ref={(el) => {
                    linksRef.current[link.to] = el;
                  }}
                  to={link.to}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-mono text-xs tracking-wide transition-colors duration-200 relative py-1 z-10 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Dynamic Active Indicator */}
            <div
              className="absolute bottom-[1rem] h-[2px] bg-primary pointer-events-none opacity-90"
              style={{
                ...indicatorStyle,
                transition:
                  "left 320ms cubic-bezier(0.22, 1, 0.36, 1), width 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease",
                willChange: "left, width",
              }}
            />

            <ThemeToggle className="ml-2" />
          </div>

          {/* ── Mobile Actions Bar ── */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              // MEDIUM FIX: Added touch feedback enhancement classes
              className="text-foreground min-h-11 min-w-11 inline-flex items-center justify-center rounded-md transition-colors duration-200 active:bg-surface/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring select-none [-webkit-tap-highlight-color:transparent]"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileOpen ? (
                <X size={18} aria-hidden="true" />
              ) : (
                <Menu size={18} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Navigation Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: MOTION_DURATION.NORMAL }}
            className="fixed inset-0 z-40 bg-background/30 backdrop-blur-xl flex flex-col justify-between p-6 pt-24 md:hidden overflow-hidden"
          >
            {/* Grid Technical Overlay Pattern */}
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Navigation Links List */}
            <div className="relative flex flex-col gap-2.5 w-full max-w-sm mx-auto my-auto z-10">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/45 block mb-1 pl-1 select-none">
                / navigation menu
              </span>

              {NAV_LINKS.map((link, i) => {
                const isActive = location.pathname === link.to;

                return (
                  <motion.div
                    key={link.to}
                    variants={mobileMenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{
                      ...MOTION_SPRING.RESPONSIVE,
                      delay: calculateStaggerDelay(i, true),
                    }}
                    className="w-full"
                  >
                    <Link
                      to={link.to}
                      aria-current={isActive ? "page" : undefined}
                      // MEDIUM FIX: Added touch feedback enhancement classes
                      className={`group relative flex items-center justify-between w-full p-4 rounded-xl border font-mono text-sm transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring select-none [-webkit-tap-highlight-color:transparent] ${
                        isActive
                          ? "bg-primary/5 border-primary/25 text-primary"
                          : "bg-surface/20 border-border/40 text-muted-foreground active:bg-surface/40 active:border-border/60 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[10px] opacity-35 ${
                            isActive
                              ? "text-primary font-bold"
                              : "text-muted-foreground"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="tracking-wide">{link.label}</span>
                      </div>

                      {isActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_hsl(var(--primary)/0.4)] animate-pulse" />
                      ) : (
                        <span
                          className="text-[10px] opacity-0 group-active:opacity-100 group-hover:opacity-40 transition-opacity font-mono tracking-tighter"
                          aria-hidden="true"
                        >
                          -&gt;
                        </span>
                      )}

                      {isActive && (
                        <div
                          className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Brand Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="relative z-10 border-t border-border/30 pt-4 text-center w-full max-w-sm mx-auto font-mono text-[9px] text-muted-foreground/30 tracking-widest uppercase select-none"
            >
              dzii27 © personal page
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
