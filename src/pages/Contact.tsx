import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com", handle: "@yourname" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", handle: "in/yourname" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com", handle: "hello@example.com" },
];

const Contact = () => (
  <PageTransition>
    <div className="container pt-32 -mb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">let's talk</h1>
        <p className="text-muted-foreground mb-12">
          have a project in mind, a question, or just want to say hi? i'd love to hear from you.
        </p>

        {/* Social Links */}
        <div className="flex flex-col gap-3 mb-16">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="group flex items-center gap-4 py-3 border-b border-border/40 hover:border-primary/40 transition-colors"
            >
              <s.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">{s.handle}</span>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="font-mono text-xs text-primary tracking-widest uppercase mb-2">send a message</h2>
          <input
            type="text"
            placeholder="your name"
            className="bg-card border border-border/60 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
          />
          <input
            type="email"
            placeholder="your email"
            className="bg-card border border-border/60 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
          />
          <textarea
            rows={4}
            placeholder="your message"
            className="bg-card border border-border/60 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
          />
          <button
            type="submit"
            className="self-start inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-xs tracking-wider uppercase px-5 py-2.5 rounded-md hover:glow-sm transition-all duration-300"
          >
            send <Send size={14} />
          </button>
        </motion.form>
      </motion.div>
    </div>
  </PageTransition>
);

export default Contact;
