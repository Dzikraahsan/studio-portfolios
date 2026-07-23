import type { Variants, Transition } from "framer-motion";

// ─── MOTION TOKENS ─────────────────────────────────────────────────────────

export const MOTION_DURATION = {
  INSTANT: 0,
  FAST: 0.15,
  NORMAL: 0.25,
  MEDIUM: 0.4,
  SLOW: 0.6,
  SLOWER: 0.8,
} as const;

export const MOTION_OFFSET = {
  NONE: 0,
  SM: 8,
  MD: 14,
  LG: 20,
  XL: 32,
} as const;

export const MOTION_SCALE = {
  COMPRESSED: 0.7,
  TACTILE: 0.95,
  TACTILE_SUBTLE: 0.98,
  DEFAULT: 1,
  HOVER: 1.02,
} as const;

export const MOTION_STAGGER = {
  DESKTOP: 0.06,
  MOBILE: 0.03,
  MAX_DELAY: 0.25,
} as const;

export const MOTION_EASE = {
  OUT_SMOOTH: [0.22, 1, 0.36, 1] as const,
  EASE_OUT: [0, 0, 0.2, 1] as const,
  EASE_IN_OUT: [0.4, 0, 0.2, 1] as const,
  EASE_IN: [0.4, 0, 1, 1] as const,
} as const;

export const MOTION_SPRING = {
  RESPONSIVE: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  } satisfies Transition,
  BOUNCY: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  } satisfies Transition,
  GENTLE: {
    type: "spring",
    stiffness: 180,
    damping: 24,
  } satisfies Transition,
} as const;

// ─── TYPES ─────────────────────────────────────────────────────────────────

export interface RevealCustomProps {
  y?: number;
  opacity?: number;
}

// ─── VARIANTS & TRANSITIONS ────────────────────────────────────────────────

export const revealVariants: Variants = {
  hidden: (custom?: RevealCustomProps) => ({
    opacity: custom?.opacity ?? 0,
    y: custom?.y ?? MOTION_OFFSET.MD,
  }),
  visible: {
    opacity: 1,
    y: MOTION_OFFSET.NONE,
  },
};

export const getRevealTransition = (
  duration: number = MOTION_DURATION.SLOW,
  delay: number = 0
): Transition => ({
  duration,
  delay,
  ease: MOTION_EASE.OUT_SMOOTH,
});

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: MOTION_OFFSET.SM,
  },
  animate: {
    opacity: 1,
    y: MOTION_OFFSET.NONE,
  },
  exit: {
    opacity: 0,
    y: -MOTION_OFFSET.SM,
  },
};

export const pageTransition: Transition = {
  duration: MOTION_DURATION.MEDIUM,
  ease: MOTION_EASE.OUT_SMOOTH,
};

export const toggleIconVariants: Variants = {
  initial: {
    opacity: 0,
    rotate: -90,
    scale: MOTION_SCALE.COMPRESSED,
  },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: MOTION_SCALE.DEFAULT,
  },
  exit: {
    opacity: 0,
    rotate: 90,
    scale: MOTION_SCALE.COMPRESSED,
  },
};

export const toggleIconTransition: Transition = {
  duration: MOTION_DURATION.NORMAL,
  ease: MOTION_EASE.OUT_SMOOTH,
};

export const mobileMenuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const mobileMenuItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_OFFSET.MD,
    scale: MOTION_SCALE.TACTILE_SUBTLE,
  },
  visible: {
    opacity: 1,
    y: MOTION_OFFSET.NONE,
    scale: MOTION_SCALE.DEFAULT,
  },
  exit: {
    opacity: 0,
    y: MOTION_OFFSET.SM,
    scale: MOTION_SCALE.TACTILE_SUBTLE,
  },
};

// ─── UTILITIES ─────────────────────────────────────────────────────────────

export const calculateStaggerDelay = (
  index: number,
  isMobile: boolean = false,
  customDelay?: number
): number => {
  if (customDelay !== undefined) return customDelay;

  return Math.min(
    index * (isMobile ? MOTION_STAGGER.MOBILE : MOTION_STAGGER.DESKTOP),
    MOTION_STAGGER.MAX_DELAY
  );
};
