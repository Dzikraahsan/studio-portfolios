import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  index: number;
}

const ProjectCard = ({ title, description, tags, link, index }: ProjectCardProps) => (
  <motion.a
    href={link || "#"}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className="group block bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 hover:glow-border transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
      {description}
    </p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border/50"
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.a>
);

export default ProjectCard;
