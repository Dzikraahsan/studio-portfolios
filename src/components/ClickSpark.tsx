import React, { useRef, useEffect, useCallback, memo } from "react";

// ─── Interfaces & Types ───────────────────────────────────────────────────────

export type EasingType = "linear" | "ease-in" | "ease-out" | "ease-in-out";

export interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: EasingType;
  extraScale?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

// ─── Easing Utility Engine ────────────────────────────────────────────────────

const calculateEasing = (t: number, type: EasingType): number => {
  switch (type) {
    case "linear":
      return t;
    case "ease-in":
      return t * t;
    case "ease-in-out":
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    case "ease-out":
    default:
      return t * (2 - t);
  }
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const ClickSpark = memo<ClickSparkProps>(
  ({
    sparkColor = "hsl(var(--spark))",
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = "ease-out",
    extraScale = 1.0,
    children,
    className = "",
    style,
  }) => {
    const isMobileRef = useRef<boolean>(
      typeof window !== "undefined" &&
        (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)
    );
    const effectiveSparkCount = isMobileRef.current ? Math.min(sparkCount, 5) : sparkCount;
    const effectiveDuration = isMobileRef.current ? Math.min(duration, 300) : duration;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const sparksRef = useRef<Spark[]>([]);
    const animationIdRef = useRef<number | null>(null);
    const cachedSparkColorRef = useRef<string>(sparkColor);

    const resolveColor = useCallback(() => {
      if (typeof window === "undefined") return sparkColor;

      if (sparkColor.startsWith("hsl(var(") || sparkColor.startsWith("var(")) {
        const temp = document.createElement("div");
        temp.style.color = sparkColor;
        document.body.appendChild(temp);
        const resolved = getComputedStyle(temp).color;
        document.body.removeChild(temp);
        return resolved || sparkColor;
      }
      return sparkColor;
    }, [sparkColor]);

    useEffect(() => {
      cachedSparkColorRef.current = resolveColor();
    }, [resolveColor]);

    const draw = useCallback(
      (timestamp: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const logicalWidth = canvas.width / dpr;
        const logicalHeight = canvas.height / dpr;

        ctx.clearRect(0, 0, logicalWidth, logicalHeight);

        const activeColor = cachedSparkColorRef.current;

        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";

        sparksRef.current = sparksRef.current.filter((spark) => {
          const elapsed = timestamp - spark.startTime;
          if (elapsed >= effectiveDuration) return false;

          const progress = elapsed / effectiveDuration;
          const eased = calculateEasing(progress, easing);

          const distance = eased * sparkRadius * extraScale;
          const lineLength = sparkSize * (1 - eased);

          const cos = Math.cos(spark.angle);
          const sin = Math.sin(spark.angle);
          const x1 = spark.x + distance * cos;
          const y1 = spark.y + distance * sin;
          const x2 = spark.x + (distance + lineLength) * cos;
          const y2 = spark.y + (distance + lineLength) * sin;

          ctx.globalAlpha = Math.max(0, 1 - progress);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          return true;
        });

        ctx.globalAlpha = 1;

        if (sparksRef.current.length > 0) {
          animationIdRef.current = requestAnimationFrame(draw);
        } else {
          animationIdRef.current = null;
        }
      },
      [effectiveDuration, easing, extraScale, sparkRadius, sparkSize]

    );

    const startAnimation = useCallback(() => {
      if (animationIdRef.current === null) {
        animationIdRef.current = requestAnimationFrame(draw);
      }
    }, [draw]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      let resizeFrameId: number;

      const resizeCanvas = () => {
        const rect = parent.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        if (
          canvas.width !== rect.width * dpr ||
          canvas.height !== rect.height * dpr
        ) {
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          canvas.style.width = `${rect.width}px`;
          canvas.style.height = `${rect.height}px`;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.scale(dpr, dpr);
          }
        }
      };

      const handleResize = () => {
        if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
        resizeFrameId = requestAnimationFrame(resizeCanvas);
      };

      let observer: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(handleResize);
        observer.observe(parent);
      } else {
        window.addEventListener("resize", handleResize);
      }
      resizeCanvas();


      return () => {
        if (observer) observer.disconnect();
        else window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(resizeFrameId);
        if (animationIdRef.current !== null) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
      };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const count = effectiveSparkCount;
      const now = performance.now();
      const newSparks: Spark[] = Array.from({ length: count }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / count,
        startTime: now,
      }));


      if (sparksRef.current.length > 64) {
        sparksRef.current = sparksRef.current.slice(-32);
      }

      sparksRef.current.push(...newSparks);
      startAnimation();
    };

    return (
      <div
        className={`relative w-full h-full ${className}`}
        style={style}
        onClick={handleClick}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
        />
        {children}
      </div>
    );
  }
);

ClickSpark.displayName = "ClickSpark";

export default ClickSpark;
