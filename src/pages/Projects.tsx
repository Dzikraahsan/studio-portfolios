import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

const allProjects = [
  {
    title: "Aurora UI",
    description: "A component library built for speed and accessibility. Ships with 40+ primitives and full dark mode support.",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "#",
  },
  {
    title: "Vaultkey",
    description: "End-to-end encrypted password manager with zero-knowledge architecture and cross-platform sync.",
    tags: ["Go", "React", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Pixelflow",
    description: "Real-time collaborative design tool for developers. Think Figma meets VS Code, in the browser.",
    tags: ["WebSocket", "Canvas API", "Node.js"],
    link: "#",
  },
  {
    title: "Nightowl Analytics",
    description: "Privacy-first web analytics dashboard with real-time event tracking and zero cookies.",
    tags: ["Next.js", "ClickHouse", "Redis"],
    link: "#",
  },
  {
    title: "Codeframe",
    description: "Browser-based IDE with AI-powered code completion, linting, and one-click deployment.",
    tags: ["Monaco", "Docker", "WebContainer"],
    link: "#",
  },
  {
    title: "Syncwave",
    description: "Offline-first note-taking app with real-time sync powered by CRDTs and local-first architecture.",
    tags: ["Yjs", "IndexedDB", "React"],
    link: "#",
  },
];

const Projects = () => (
  <PageTransition>
    <div className="container pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">projects</h1>
        <p className="text-muted-foreground max-w-lg mb-12">
          a collection of things i've built — from open source tools to full-stack applications.
        </p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project, i) => (
          <ProjectCard key={project.title} {...project} index={i} />
        ))}
      </div>
    </div>
  </PageTransition>
);

export default Projects;
