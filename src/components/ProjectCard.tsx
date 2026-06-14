import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Code2,
  Wallet,
  User,
  CalendarDays,
  Layers,
  Activity,
  LayoutDashboard,
  Type,
  Utensils,
  Earth,
  Clock,
  User2,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

export type ProjectStatus =
  | "Completed"
  | "Experimental"
  | "Archived"
  | "On Working";

type Complexity = "Beginner" | "Intermediate" | "Advanced";

interface TechGroup {
  label: string;
  items: string[];
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  index: number;
  className?: string;
  year?: string;
  status?: ProjectStatus;
  featured?: boolean;
  category?: string;
  role?: string;
  duration?: string;
  complexity?: Complexity;
  highlights?: string[];
  learnings?: string[];
  challenges?: string;
  outcome?: string;
  technologies?: TechGroup[];
  liveDemo?: string;
  repository?: string;
}

const iconMap: Record<string, LucideIcon> = {
  "Paperjam Club": Earth,
  Kaifood: Utensils,
  Portfolio: User,
  Finance: Wallet,
  "Daily Activity": Activity,
  Dashboard: LayoutDashboard,
  "Finance Flow": Wallet,
  "Text Generate": Type,
};

const statusStyles: Record<ProjectStatus, string> = {
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Experimental: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Archived: "bg-muted text-muted-foreground border-border",
  "On Working": "bg-sky-500/10 text-sky-400 border-sky-500/20",
};

const statusDotStyles: Record<ProjectStatus, string> = {
  Completed: "bg-emerald-400",
  Experimental: "bg-amber-400",
  Archived: "bg-muted-foreground",
  "On Working": "bg-sky-400",
};

const complexityStyles: Record<Complexity, string> = {
  Beginner: "text-muted-foreground",
  Intermediate: "text-primary/70",
  Advanced: "text-primary",
};

const complexityBars: Record<Complexity, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

// ─── Shared primitives (mirror Projects.tsx visual language) ──────────────────

const CardChip = ({ children }: { children: React.ReactNode }) => (
  <span
    className="inline-flex items-center whitespace-nowrap text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border border-border/50 bg-background/50 text-muted-foreground transition-all duration-200 hover:-translate-y-px hover:border-border/70"
    style={{ willChange: "transform" }}
  >
    {children}
  </span>
);

const CardSectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 block mb-2">
    {children}
  </span>
);

const CardComplexityBar = ({ level }: { level: Complexity }) => {
  const filled = complexityBars[level];
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${complexityStyles[level]}`}
    >
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`h-2 w-0.5 rounded-full transition-colors duration-200 ${
            n <= filled ? "bg-current" : "bg-current/20"
          }`}
        />
      ))}
      <span className="ml-1 text-[10px] font-mono uppercase tracking-wide">
        {level}
      </span>
    </span>
  );
};

// ─── Animated expand panel ────────────────────────────────────────────────────

const AnimatedPanel = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (open) {
      setRendered(true);
      requestAnimationFrame(() => {
        if (ref.current) setHeight(ref.current.scrollHeight);
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      setHeight(0);
      const t = setTimeout(() => setRendered(false), 280);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!rendered) return null;

  return (
    <div
      style={{
        height,
        overflow: "hidden",
        transition: "height 280ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 220ms ease 50ms, transform 220ms ease 50ms",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ─── ProjectCard ──────────────────────────────────────────────────────────────

const ProjectCard = ({
  title,
  description,
  tags,
  link,
  index,
  className = "",
  year = "2024",
  status = "Completed",
  category,
  role,
  duration,
  complexity,
  highlights,
  learnings,
  challenges,
  outcome,
  technologies,
  liveDemo,
}: ProjectCardProps) => {
  const Icon = iconMap[title] || Code2;
  const number = String(index + 1).padStart(2, "0");
  const [expanded, setExpanded] = useState(false);

  const demoUrl = liveDemo || link || null;

  const hasExpandContent =
    highlights?.length ||
    learnings?.length ||
    challenges ||
    outcome ||
    technologies?.length ||
    role ||
    duration ||
    complexity;

  return (
    <Reveal
      as="div"
      index={index}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface/40 transition-all duration-300 md:hover:-translate-y-px md:hover:border-primary/30 ${className}`}
      style={{ willChange: "transform" }}
    >
      {/* Top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 md:group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-primary transition-colors duration-300 md:group-hover:border-primary/40">
            <Icon size={17} strokeWidth={1.6} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono text-muted-foreground/35 tracking-widest">
                {number}
              </span>
              <span className="h-px w-3 bg-border/50" />
              <span className="text-[10px] font-mono text-muted-foreground/50 tracking-widest uppercase">
                {year}
              </span>
              {category && (
                <>
                  <span className="h-px w-3 bg-border/50" />
                  <span className="text-[10px] font-mono text-muted-foreground/45 tracking-widest uppercase truncate">
                    {category}
                  </span>
                </>
              )}
            </div>
            <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-foreground truncate">
              {title}
            </h3>
          </div>
        </div>
        {demoUrl ? (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 mt-0.5 text-muted-foreground/40 hover:text-primary transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5"
            style={{ willChange: "transform" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight size={15} />
          </a>
        ) : (
          <ArrowUpRight
            size={15}
            className="shrink-0 mt-0.5 text-muted-foreground/20"
          />
        )}
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-border/50" />

      {/* Description */}
      <div className="px-5 py-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex-1" />

      {/* Footer panel */}
      <div className="mx-3 mb-3 rounded-xl border border-border/40 bg-muted/25 divide-y divide-border/40">
        {/* Metadata row */}
        <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-[11px] font-mono text-muted-foreground/55">
          <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <Layers size={11} className="shrink-0" />
              {tags.length} stack
            </span>
            <span className="h-2.5 w-px bg-border/50" />
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={11} className="shrink-0" />
              {year}
            </span>
            {duration && (
              <>
                <span className="h-2.5 w-px bg-border/50" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={11} className="shrink-0" />
                  {duration}
                </span>
              </>
            )}
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-widest font-mono transition-colors duration-200 ${statusStyles[status]}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[status]}`}
            />
            <span className="hidden sm:inline">{status}</span>
          </span>
        </div>

        {/* Tags */}
        <div className="px-3.5 py-2.5">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center whitespace-nowrap text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border border-border/50 bg-background/50 text-muted-foreground transition-all duration-200 hover:-translate-y-px"
                style={{ willChange: "transform" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Expand toggle */}
        {hasExpandContent && (
          <div className="px-3.5 py-2">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/40 hover:text-primary transition-colors duration-200"
            >
              <ChevronDown
                size={11}
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 240ms cubic-bezier(0.4,0,0.2,1)",
                }}
              />
              {expanded ? "less" : "more"}
            </button>
          </div>
        )}

        {/* Expanded details */}
        <AnimatedPanel open={expanded}>
          <div className="px-3.5 py-4 space-y-4">
            {/* Role / Complexity meta */}
            {(role || complexity) && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-mono text-muted-foreground/55">
                {role && (
                  <span className="inline-flex items-center gap-1.5">
                    <User2 size={11} className="shrink-0" />
                    {role}
                  </span>
                )}
                {role && complexity && (
                  <span className="h-2.5 w-px bg-border/50" />
                )}
                {complexity && <CardComplexityBar level={complexity} />}
              </div>
            )}

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <div>
                <CardSectionLabel>Highlights</CardSectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {highlights.map((h) => (
                    <CardChip key={h}>{h}</CardChip>
                  ))}
                </div>
              </div>
            )}

            {/* Learnings */}
            {learnings && learnings.length > 0 && (
              <div>
                <CardSectionLabel>Learnings</CardSectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {learnings.map((l) => (
                    <CardChip key={l}>{l}</CardChip>
                  ))}
                </div>
              </div>
            )}

            {/* Challenge */}
            {challenges && (
              <div>
                <CardSectionLabel>Challenge</CardSectionLabel>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  {challenges}
                </p>
              </div>
            )}

            {/* Outcome */}
            {outcome && (
              <div>
                <CardSectionLabel>Outcome</CardSectionLabel>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  {outcome}
                </p>
              </div>
            )}

            {/* Technologies */}
            {technologies && technologies.length > 0 && (
              <div>
                <CardSectionLabel>Stack</CardSectionLabel>
                <div className="flex flex-col gap-1.5">
                  {technologies.map((g) => (
                    <div key={g.label} className="flex items-start gap-2">
                      <span className="text-[10px] font-mono text-muted-foreground/35 w-14 shrink-0 pt-0.5">
                        {g.label}
                      </span>
                      <span className="h-3 w-px bg-border/50 mt-0.5 shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {g.items.map((item) => (
                          <CardChip key={item}>{item}</CardChip>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnimatedPanel>
      </div>
    </Reveal>
  );
};

export default ProjectCard;
