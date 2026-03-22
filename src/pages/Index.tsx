import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand } from "@fortawesome/free-solid-svg-icons";

const featuredProjects = [
  {
    title: "Kaifood",
    description: "A food business website that sells various menus.",
    tags: ["React", "Vite", "TypeScript", "Tailwind"],
    link: "https://www.kaifood.web.id/",
  },
  {
    title: "Portfolio",
    description: "A personal portfolio that contains information about myself.",
    tags: ["React", "Vite", "TypeScript", "Tailwind"],
    link: "https://portfoliodzikra.vercel.app/",
  },
  {
    title: "Daily Activity",
    description: "A website used to record daily activities, with several features that can be used.",
    tags: ["React", "Vite", "TypeScript", "Tailwind"],
    link: "https://tracking-activities.vercel.app/",
  },
];

const Index = () => {
  return (
    <PageTransition>
      <div className="container pt-32 -mb-12">
        {/* Hero */}
        <section className="min-h-[60vh] flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-mono text-xs text-primary mb-4 tracking-widest uppercase"
          >
            software engineer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6 max-w-2xl"
          >
            hey, i'm <span className="text-gradient">Dzikra</span> <span className="wave">👋</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8"
          >
            i build modern, scalable, and user-focused web applications. passionate about clean code, 
            great design, and solving real problems with technology.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-xs tracking-wider uppercase px-5 py-2.5 rounded-md hover:glow-sm transition-all duration-300"
            >
              view projects <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-border text-foreground font-mono text-xs tracking-wider uppercase px-5 py-2.5 rounded-md hover:border-primary/60 hover:text-primary transition-all duration-300"
            >
              contact me
            </Link>
          </motion.div>
        </section>

        {/* Quote */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16 border-t border-border/40"
        >
          <blockquote className="font-mono text-sm text-muted-foreground text-right max-w-md ml-auto italic leading-relaxed">
            "Good judgement comes from experience, and experience comes from bad judgement."
          </blockquote>
        </motion.section>

        {/* About Preview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 border-t border-border/40"
        >
          <h2 className="font-mono text-xs text-primary tracking-widest uppercase mb-6">about</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">
            i'm a software engineer and frontend developer who loves building things at the intersection of design and engineering.
            i believe great software is equal parts technical precision and human empathy — every interaction should feel intentional,
            and every detail should have a purpose.
          </p>
          <Link to="/about" className="font-mono text-xs text-primary hover:underline inline-flex items-center gap-1">
            read more <ArrowRight size={12} />
          </Link>
        </motion.section>

        {/* Featured Projects */}
        <section className="py-16 border-t border-border/40">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-mono text-xs text-primary tracking-widest uppercase">featured projects</h2>
            <Link to="/projects" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
              view all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.title} {...project} index={i} />
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 border-t border-border/40">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/learning-journey"
              className="group border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-all duration-300"
            >
              <h3 className="font-mono text-xs text-primary tracking-widest uppercase mb-2">learning journey</h3>
              <p className="text-sm text-muted-foreground">things i'm currently learning, building, and figuring out along the way.</p>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Index;
