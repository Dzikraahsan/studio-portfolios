import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const heritage = [
  {
    name: "******* *****",
    role: "Introduced me to technology, problem solving, and inspired me to be a developer.",
    period: "2004 - Now",
    image: "https://res.cloudinary.com/da4fjxm1e/image/upload/f_auto,q_auto,w_500/person_uycbpf.png",
  },
  {
    name: "Dzikra Ahsan Imawan",
    role: "Continuing the journey and building my own path.",
    period: "2024 – Now",
    image: "https://res.cloudinary.com/da4fjxm1e/image/upload/f_auto,q_auto,w_500/Dzikra-foto2_evsxzq.png",
  },
];

const Blog = () => (
  <PageTransition>
    <div className="container pt-32 -mb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          heirtage
        </h1>
        <p className="text-muted-foreground max-w-lg mb-12">
          a glimpse into the people who shaped my journey in programming.
        </p>
      </motion.div>

      <div className="flex flex-col gap-1">
        {heritage.map((item, i) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group flex items-center gap-4 py-8 border-b border-border/40 hover:bg-card/50 -mx-4 px-4 rounded-md transition-colors"
          >
            {/* LEFT - IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              decoding="async"
              loading="lazy"
              className="w-16 h-16 rounded-full object-cover shrink-0"
            />

            {/* CENTER - NAME + ROLE */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-[15px] text-foreground group-hover:text-primary transition-colors mb-1">
                {item.name}
              </h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed justify-text-left">
                {item.role}
              </p>
            </div>

            {/* RIGHT - PERIOD */}
            <span className="font-mono pl-4 text-[10px] md:text-sm lg:text-sm text-muted-foreground shrink-0">
              {item.period}
            </span>
          </motion.article>
        ))}
      </div>
    </div>
  </PageTransition>
);
 
export default Blog;