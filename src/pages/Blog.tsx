import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "Why I Switched from REST to tRPC (and What I Learned)",
    description: "A practical deep-dive into type-safe APIs, developer experience gains, and the tradeoffs that matter.",
    date: "2026-02-14",
  },
  {
    title: "Building a Design System That Actually Gets Used",
    description: "Lessons from creating and maintaining a component library across three production apps.",
    date: "2026-01-20",
  },
  {
    title: "The Case for Local-First Software",
    description: "Exploring CRDTs, offline-first architecture, and why the future of apps might not need a server.",
    date: "2025-12-08",
  },
  {
    title: "Performance Budgets Are Not Optional",
    description: "How I cut my app's bundle size by 60% and what every frontend developer should know about performance.",
    date: "2025-11-15",
  },
];

const Blog = () => (
  <PageTransition>
    <div className="container pt-32 -mb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">blog</h1>
        <p className="text-muted-foreground max-w-lg mb-12">
          thoughts on engineering, design systems, and building things that last.
        </p>
      </motion.div>
      <div className="flex flex-col gap-1">
        {posts.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group flex items-start gap-4 py-5 border-b border-border/40 cursor-pointer hover:bg-card/50 -mx-4 px-4 rounded-md transition-colors"
          >
            <time className="font-mono text-[11px] text-muted-foreground shrink-0 pt-1 w-20">
              {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </time>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1 flex items-center gap-2">
                {post.title}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </PageTransition>
);

export default Blog;
