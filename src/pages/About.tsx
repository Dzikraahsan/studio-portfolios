import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const skills = [
  { category: "languages", items: ["TypeScript", "JavaScript", "PHP", "Golang", "Python", "Rust"] },
  { category: "frontend", items: ["Tailwind CSS", "Bootstrap CSS"] },
  { category: "backend", items: ["Node.js", "MySQL", "Firebase", "Supabase"] },
  { category: "framework", items: ["Laravel", "React.js", "Vite", "Next.js"] },
  { category: "tools", items: ["Git", "Figma", "Canva"] },
  { category: "gaming", items: ["eFootball", "Clash Of Clans"] },
];

const About = () => (
  <PageTransition>
    <div className="container pt-32 -mb-10 max-w-2xl">
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
          i'm a software engineer and frontend developer who loves building things at the intersection of design and engineering.
          i believe great software is equal parts technical precision and human empathy — every interaction should feel intentional,
          and every detail should have a purpose.
        </p>
        <p>
          i started coding out of curiosity — tinkering with small projects, breaking things, and figuring out how to put them back together.
          that curiosity never really went away. these days, i spend most of my time crafting user interfaces, building web applications,
          and exploring ways to make the web feel faster, more intuitive, and more enjoyable to use.
        </p>
        <p>
          when i'm not coding, you'll probably find me diving into design systems, experimenting with typography,
          or just taking a walk while listening to a good podcast.
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
          Object-oriented programming languages support encapsulation, thereby improving the ability of software to be reused, refined, tested, maintained, and extended.
          The full benefit of this support can only be realized if encapsulation is maximized during the design process.
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
