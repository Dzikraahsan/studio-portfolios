import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const experiments = [
  {
    title: "Shader Playground",
    description: "Interactive GLSL fragment shader editor with live preview and parameter controls.",
    status: "active",
  },
  {
    title: "Type Racer Clone",
    description: "Minimalist typing speed test with real-time WPM tracking and leaderboard.",
    status: "active",
  },
  {
    title: "CSS Grid Generator",
    description: "Visual tool for generating complex CSS Grid layouts with copy-paste code output.",
    status: "wip",
  },
  {
    title: "Motion Gallery",
    description: "Collection of micro-interaction patterns built with Framer Motion and Spring physics.",
    status: "active",
  },
];

const Labs = () => (
  <PageTransition>
    <div className="container pt-32 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">labs</h1>
        <p className="text-muted-foreground max-w-lg mb-12">
          experiments, prototypes, and creative explorations. some polished, some half-baked — all fun.
        </p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-2">
        {experiments.map((exp, i) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group border border-border/60 rounded-lg p-6 hover:border-primary/40 hover:glow-border transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {exp.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                  exp.status === "active" 
                    ? "text-primary border-primary/30 bg-primary/5" 
                    : "text-muted-foreground border-border bg-secondary"
                }`}>
                  {exp.status}
                </span>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </PageTransition>
);

export default Labs;
