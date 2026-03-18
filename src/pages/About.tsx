import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const skills = [
  { category: "languages", items: ["TypeScript", "JavaScript", "Go", "Python", "Rust"] },
  { category: "frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { category: "backend", items: ["Node.js", "PostgreSQL", "Redis", "Docker"] },
  { category: "tools", items: ["Git", "Figma", "Linux", "CI/CD"] },
];

const About = () => (
  <PageTransition>
    <div className="container pt-32 pb-16 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">about</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-5 text-muted-foreground leading-relaxed mb-16"
      >
        <p>
          i'm a full-stack software engineer who loves building things at the intersection of design and engineering. 
          i believe great software is equal parts technical rigor and human empathy — every interaction should feel 
          intentional and every system should be built to last.
        </p>
        <p>
          i started coding out of curiosity — tinkering with scripts, breaking things, and learning how to put them 
          back together. that curiosity hasn't faded. today i spend my time building tools, contributing to open source, 
          and exploring new ways to make the web faster, more accessible, and more beautiful.
        </p>
        <p>
          when i'm not coding, you'll find me reading about systems thinking, experimenting with typography, 
          or going on long walks with a podcast.
        </p>
      </motion.div>

      {/* Philosophy */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="font-mono text-xs text-primary tracking-widest uppercase mb-4">philosophy</h2>
        <blockquote className="border-l-2 border-primary/40 pl-4 text-muted-foreground italic leading-relaxed">
          i'd rather ship slow and solid than fast and fragile. every project is an opportunity to build something 
          that feels precise, calm, and durable — not just "done."
        </blockquote>
      </motion.section>

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-mono text-xs text-primary tracking-widest uppercase mb-6">skills & tools</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  </PageTransition>
);

export default About;
