import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  MOTION_DURATION,
  MOTION_OFFSET,
  calculateStaggerDelay,
  getRevealTransition,
  revealVariants,
} from "@/lib/motion";

type AllowedElement =
  | "div"
  | "section"
  | "article"
  | "li"
  | "header"
  | "footer"
  | "a";

type RevealBaseProps<T extends AllowedElement> = {
  children: ReactNode;
  delay?: number;
  index?: number;
  className?: string;
  as?: T;
};

export type RevealProps<T extends AllowedElement = "div"> =
  RevealBaseProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof RevealBaseProps<T>>;

const Reveal = <T extends AllowedElement = "div">({
  children,
  delay,
  index = 0,
  className,
  as,
  style,
  ...rest
}: RevealProps<T>) => {
  const MotionTag = motion[as || "div"] as ElementType;

  const ref = useRef<HTMLDivElement | null>(null);

  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // Observer hanya dipakai di desktop
  const inView = useInView(ref, {
    once: true,
    amount: 0.05,
    margin: "0px 0px -5% 0px",
  });

  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    if (inView) return;

    const timer = window.setTimeout(() => {
      setForceShow(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [inView, prefersReducedMotion, isMobile]);

  const isVisible = prefersReducedMotion
    ? true
    : isMobile
    ? true
    : inView || forceShow;

  const yOffset = prefersReducedMotion
    ? MOTION_OFFSET.NONE
    : isMobile
    ? 4
    : MOTION_OFFSET.MD;

  const duration = prefersReducedMotion
    ? MOTION_DURATION.INSTANT
    : isMobile
    ? 0.22
    : MOTION_DURATION.SLOW;

  const computedDelay = prefersReducedMotion
    ? 0
    : isMobile
    ? 0
    : calculateStaggerDelay(index, isMobile, delay);

  const transitionConfig = useMemo(
    () => getRevealTransition(duration, computedDelay),
    [duration, computedDelay]
  );

  return (
    <MotionTag
      ref={ref}
      className={className}
      custom={{ y: yOffset }}
      variants={revealVariants}
      initial={isMobile ? false : "hidden"}
      animate={isVisible ? "visible" : "hidden"}
      transition={transitionConfig}
      style={style}
      {...(rest as ComponentPropsWithoutRef<ElementType>)}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
