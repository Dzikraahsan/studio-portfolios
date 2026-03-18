import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

const allProjects = [
  {
    title: "Kaifood",
    description: "A food business website that sells various menus.",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "https://www.kaifood.web.id/",
  },
  {
    title: "Portfolio",
    description: "A personal portfolio that contains information about myself.",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "https://portfoliodzikra.vercel.app/",
  },
  {
    title: "Daily Activity",
    description: "A website used to record daily activities, with several features that can be used.",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "https://tracking-activities.vercel.app/",
  },
  {
    title: "Dashboard",
    description: "A website that has the function of recording employee work and performance statistics.",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "https://dashboard-40.vercel.app/",
  },
  {
    title: "Finance Flow",
    description: "Web prototype for structured and recorded financial use.",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "https://finance-flow-beryl.vercel.app/",
  },
  {
    title: "Cleanliness assessment",
    description: "The website is used to assess the cleanliness of the classroom environment.",
    tags: ["Laravel", "Blade PHP", "MySQL"],
    link: "https://github.com/Dzikraahsan/penilaian-kebersihan",
  },
];

const Projects = () => (
  <PageTransition>
    <div className="container pt-32 -mb-8">
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
