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
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

export type ProjectStatus =
  "Completed" | "Experimental" | "Archived" | "On Working";

export type Complexity = "Beginner" | "Intermediate" | "Advanced";

export interface TechGroup {
  label: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  year: string;
  status: ProjectStatus;
  featured?: boolean;
  category: string;
  role: string;
  complexity: Complexity;
  duration: string;
  highlights: string[];
  learnings: string[];
  challenges: string;
  outcome: string;
  technologies: TechGroup[];
  repository?: string;
  liveDemo?: string;
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
  onOpenDetails?: (project: Project) => void;
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

const StatusBadge = ({ status }: { status: ProjectStatus }) => (
  <span
    className={`inline-flex shrink-0 items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-widest transition-colors duration-200 ${statusStyles[status]}`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[status]}`} />
    {status}
  </span>
);

const ProjectCard = ({
  title,
  description,
  tags,
  link = "",
  index,
  year = "2024",
  status = "Completed",
  category = "Project",
  role = "Developer",
  duration = "N/A",
  complexity = "Intermediate",
  highlights = [],
  learnings = [],
  challenges = "",
  outcome = "",
  technologies = [],
  liveDemo = "",
  repository,
  onOpenDetails,
}: ProjectCardProps) => {
  const demoUrl = liveDemo || link || null;

  const handleCardClick = () => {
    if (onOpenDetails) {
      onOpenDetails({
        title,
        description,
        tags,
        link,
        year,
        status,
        category,
        role,
        complexity,
        duration,
        highlights,
        learnings,
        challenges,
        outcome,
        technologies,
        liveDemo,
        repository,
      });
    }
  };

  return (
    <Reveal index={index}>
      <div
        onClick={handleCardClick}
        className="flex flex-col h-full rounded-2xl border border-border/50 bg-surface/20 md:hover:border-border/80 md:hover:bg-surface/30 md:hover:-translate-y-1 transition-all duration-250 cursor-pointer overflow-hidden group w-full"
        style={{ willChange: "transform" }}
      >
        <div className="flex flex-col flex-1 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-muted-foreground/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-border/60" />
                <span className="text-[10px] font-mono uppercase tracking-wide text-muted-foreground/45">
                  {category}
                </span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground truncate group-hover:text-primary transition-colors duration-200">
                {title}
              </h3>
            </div>
            <StatusBadge status={status} />
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
            {description}
          </p>

          <div className="space-y-2 pt-4 border-t border-border/30 text-[11px] font-mono text-muted-foreground/60">
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={11} className="text-muted-foreground/40" />
                Year
              </span>
              <span className="text-foreground/70">{year}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center gap-1.5">
                <Layers size={11} className="text-muted-foreground/40" />
                Stack
              </span>
              <span className="text-foreground/70">
                {tags.length} technologies
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={11} className="text-muted-foreground/40" />
                Duration
              </span>
              <span className="text-foreground/70">{duration}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 bg-muted/10 border-t border-border/35 mt-auto">
          <button className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground/50 group-hover:text-primary transition-colors duration-200">
            <ChevronDown
              size={12}
              className="-rotate-90 group-hover:translate-x-0.5 transition-transform"
            />
            <span>view details</span>
          </button>

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground/50 hover:text-primary transition-all duration-200 hover:-translate-y-0.5"
              style={{ willChange: "transform" }}
            >
              <span>live demo</span>
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export default ProjectCard;
