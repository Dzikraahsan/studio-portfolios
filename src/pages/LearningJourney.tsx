import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Code } from "lucide-react";

const experiments = [
  {
    title: "Learn React.js",
    description: "Exploring how React works, from its structure to the way everything connects and runs together.",
    status: "present",
  },
  {
    title: "Learn Laravel",
    description: "Exploring the fundamentals of Laravel, from how its structure works to handling routes, views, and simple database integration.",
    status: "present",
  },
  {
    title: "Learn JavaScript & TypeScript",
    description: "Learning the basics of JavaScript and TypeScript, from working with the DOM to understanding state and how everything behaves in a simple application.",
    status: "present",
  },
  {
    title: "Learn HTML & CSS",
    description: "Learning the basics of HTML and CSS, from building simple page structures to styling layouts and understanding how everything comes together on the web.",
    status: "past",
  },
];

const Labs = () => (
  <PageTransition>
    <div className="container pt-32 -mb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">learning journey</h1>
        <p className="text-muted-foreground max-w-lg mb-12">
          things i'm currently learning, building, and figuring out along the way.
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
                  exp.status === "present" 
                    ? "text-primary border-primary/30 bg-primary/5" 
                    : "text-muted-foreground border-border bg-secondary"
                }`}>
                  {exp.status}
                </span>
                <Code size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
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