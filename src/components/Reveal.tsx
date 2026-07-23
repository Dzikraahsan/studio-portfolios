import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useMemo,
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

type AllowedElement = "div" | "section" | "article" | "li" | "header" | "footer" | "a";

type RevealBaseProps<T extends AllowedElement> = {
  children: ReactNode;
  delay?: number;
  index?: number;
  className?: string;
  as?: T;
};

export type RevealProps<T extends AllowedElement = "div"> = RevealBaseProps<T> &
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

  const intersectionMargin = isMobile ? "0px 0px 50px 0px" : "0px 0px -5% 0px";

  const inView = useInView(ref, {
    once: true,
    amount: 0.05,
    margin: intersectionMargin,
  });

  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (inView || prefersReducedMotion) return;

    const fallbackTime = isMobile ? 600 : 1200;
    const timer = setTimeout(() => setForceShow(true), fallbackTime);

    return () => clearTimeout(timer);
  }, [inView, prefersReducedMotion, isMobile]);

  const isVisible = inView || forceShow || Boolean(prefersReducedMotion);

  const yOffset = prefersReducedMotion || isMobile ? MOTION_OFFSET.NONE : MOTION_OFFSET.MD;

  const duration = prefersReducedMotion
    ? MOTION_DURATION.INSTANT
    : isMobile
    ? MOTION_DURATION.MEDIUM
    : MOTION_DURATION.SLOW;

  const computedDelay = prefersReducedMotion
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
      initial="hidden"
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
