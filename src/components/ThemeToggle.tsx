import { memo } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { toggleIconVariants, toggleIconTransition } from "@/lib/motion";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = memo(({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const labelText = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={labelText}
      aria-pressed={isDark}
      title={labelText}
      className={`relative inline-flex items-center justify-center h-8 w-8 rounded-full border border-border/70 bg-card/60 backdrop-blur-md text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "dark-icon" : "light-icon"}
          variants={toggleIconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={toggleIconTransition}
          style={{ willChange: "transform, opacity" }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon size={14} aria-hidden="true" />
          ) : (
            <Sun size={14} aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
});

ThemeToggle.displayName = "ThemeToggle";
export default ThemeToggle;
