import React, { useState, useCallback, memo } from "react";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  Clock,
  MapPin,
  MessageSquare,
  LucideIcon,
  Zap,
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  CornerDownRight,
  ArrowUpRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SocialItem {
  icon: LucideIcon;
  label: string;
  href: string;
  handle: string;
}

interface HighlightItem {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
}

const SOCIALS: readonly SocialItem[] = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Dzikraahsan",
    handle: "@Dzikraahsan",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dzikra-ahsan-1b2154386?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    handle: "in/Dzikra Ahsan Imawan",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:dzikraahsan10@gmail.com",
    handle: "dzikraahsan10@gmail.com",
  },
] as const;

const HIGHLIGHTS: readonly HighlightItem[] = [
  {
    icon: Zap,
    label: "Response Time",
    value: "Within 24 hours",
    sub: "usually much faster",
  },
  {
    icon: CalendarCheck,
    label: "Availability",
    value: "Open to work",
    sub: "freelance & collaborations",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Majalengka, Indonesia",
    sub: "remote-friendly worldwide",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Fri",
    sub: "09:00 – 20:00 WIB",
  },
] as const;

// Helper Regex Email Standard
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = memo(() => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid = EMAIL_REGEX.test(formData.email.trim());
  const isMessageValid = formData.message.trim().length >= 5;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isNameValid) {
      toast.error("Please enter a valid name (at least 2 characters).");
      return;
    }
    if (!isEmailValid) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!isMessageValid) {
      toast.error("Please enter a message (at least 5 characters).");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.from("messages").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
      ]);

      if (error) throw error;

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Reveal delay={0.1}>
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact form"
        className="bg-surface/10 rounded-2xl border border-border/40 p-5 sm:p-6 mb-12 space-y-4 shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.04)]"
      >
        <div className="flex items-center gap-2 mb-2">
          <CornerDownRight size={12} className="text-primary/70" aria-hidden="true" />
          <h2 className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase">
            send a digital letter
          </h2>
        </div>

        {/* Input Name */}
        <div className="relative">
          <label htmlFor="contact-name" className="sr-only">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={formData.name.length > 0 && !isNameValid}
            aria-describedby="contact-name-hint"
            placeholder="your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-surface/30 border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/40 focus:bg-surface/50 transition-[background-color,border-color] duration-200 font-mono"
          />
          <span id="contact-name-hint" className="sr-only">
            At least 2 characters.
          </span>
          {formData.name.length > 0 && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
              {isNameValid ? (
                <CheckCircle2 size={13} className="text-emerald-400/80" />
              ) : (
                <AlertCircle size={13} className="text-amber-400/60" />
              )}
            </div>
          )}
        </div>

        {/* Input Email */}
        <div className="relative">
          <label htmlFor="contact-email" className="sr-only">
            Your email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={formData.email.length > 0 && !isEmailValid}
            aria-describedby="contact-email-hint"
            placeholder="your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-surface/30 border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/40 focus:bg-surface/50 transition-[background-color,border-color] duration-200 font-mono"
          />
          <span id="contact-email-hint" className="sr-only">
            A valid email address so I can reply.
          </span>
          {formData.email.length > 0 && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
              {isEmailValid ? (
                <CheckCircle2 size={13} className="text-emerald-400/80" />
              ) : (
                <AlertCircle size={13} className="text-amber-400/60" />
              )}
            </div>
          )}
        </div>

        {/* Textarea Message */}
        <div className="relative">
          <label htmlFor="contact-message" className="sr-only">
            Your message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            aria-required="true"
            aria-invalid={formData.message.length > 0 && !isMessageValid}
            aria-describedby="contact-message-hint"
            placeholder="your message..."
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-surface/30 border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/40 focus:bg-surface/50 transition-[background-color,border-color] duration-200 font-mono resize-none [scrollbar-width:none]"
          />
          <span id="contact-message-hint" className="sr-only">
            At least 5 characters describing what you'd like to talk about.
          </span>
          <div
            className="absolute right-3.5 bottom-3 pointer-events-none flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground/40"
            aria-hidden="true"
          >
            <span>{formData.message.trim().length} chars</span>
            {formData.message.length > 0 && (
              isMessageValid ? (
                <CheckCircle2 size={11} className="text-emerald-400/80" />
              ) : (
                <AlertCircle size={11} className="text-amber-400/60" />
              )
            )}
          </div>
        </div>

        {/* Button Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group/btn inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-xs tracking-wider uppercase px-5 py-2.5 rounded-xl hover:scale-[1.02] hover:-translate-y-px hover:shadow-[0_8px_30px_hsl(var(--primary)/0.2)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none transform-gpu select-none [-webkit-tap-highlight-color:transparent]"
          style={{ willChange: "transform" }}
        >
          <span>{loading ? "sending..." : "dispatch"}</span>
          <Send
            size={12}
            className={`transition-transform duration-300 ease-out transform-gpu ${
              loading ? "animate-pulse" : "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            }`}
          />
        </button>
      </form>
    </Reveal>
  );
});

ContactForm.displayName = "ContactForm";

const Contact = () => {
  return (
    <PageTransition>
      <div className="container pt-28 sm:pt-32 -mb-4 pb-6 relative">
        {/* Background Radial Glow */}
        <div
          className="pointer-events-none absolute top-40 right-10 w-72 h-72 bg-primary/5 rounded-full blur-[120px] opacity-40 z-0 transform-gpu"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          {/* Left Column: Title, Form & Social Connections */}
          <div className="lg:col-span-7 max-w-2xl w-full">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
                  / contact
                </span>
                <span className="h-px flex-1 max-w-[60px] bg-border/40" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
                  message me
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
                let's talk
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground/85 leading-relaxed mb-10 max-w-xl">
                have a project in mind, a professional inquiry, or just want to connect?
                fill out the form below or drop a line through one of my digital outposts.
              </p>
            </Reveal>

            {/* Form Component */}
            <ContactForm />

            {/* Socials Connection Archive */}
            <div className="flex flex-col gap-2 mt-6">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 block mb-1.5 pl-1">
                // connections
              </span>
              {SOCIALS.map((s, i) => (
                <Reveal
                  as="a"
                  key={s.label}
                  index={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-4 py-3 border border-border/40 bg-surface/5 hover:bg-surface/10 hover:border-border/80 rounded-xl transition-[background-color,border-color,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transform-gpu select-none [-webkit-tap-highlight-color:transparent]"
                  style={{ willChange: "transform" }}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-muted-foreground transition-colors duration-300 group-hover:border-primary/30 group-hover:text-primary">
                      <s.icon size={14} />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground/80 group-hover:text-foreground transition-colors truncate">
                      {s.handle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/30 group-hover:text-primary transition-colors duration-300">
                    <span className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider">
                      {s.label}
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transform-gpu"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Info & Metadata Sidebar */}
          <div className="lg:col-span-5 w-full lg:pt-[3.75rem]">
            <div className="lg:sticky lg:top-28 flex flex-col gap-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary tracking-widest uppercase">
                    quick info
                  </span>

                  {/* Status Indicator Live */}
                  <div className="inline-flex items-center gap-2 border border-border/40 bg-surface/20 rounded-full px-2.5 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground/85 uppercase tracking-wider">
                      active & responsive
                    </span>
                  </div>
                </div>
                <div className="mt-3 h-px w-full bg-border/40" />
              </div>

              {/* Grid Metadata Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {HIGHLIGHTS.map((item, i) => (
                  <Reveal key={item.label} index={i} delay={0.15 + i * 0.05}>
                    <div className="group flex items-start gap-3 bg-surface/5 border border-border/40 hover:border-border/80 hover:bg-surface/10 rounded-2xl p-4 transition-[background-color,border-color,transform] duration-300 ease-out h-full transform-gpu">
                      <div className="mt-[1px] shrink-0 w-7 h-7 rounded-lg border border-border/60 bg-background/40 group-hover:border-primary/30 flex items-center justify-center transition-colors duration-300">
                        <item.icon
                          size={12}
                          className="text-muted-foreground/60 group-hover:text-primary transition-colors duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-[9px] text-muted-foreground/40 tracking-widest uppercase mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium text-foreground leading-snug tracking-tight">
                          {item.value}
                        </p>
                        <p className="text-[11px] text-muted-foreground/60 mt-0.5 font-normal">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="h-px w-full bg-border/30" />

              {/* Preferred Contact Mode Node */}
              <Reveal delay={0.4}>
                <div className="flex items-start gap-3.5 bg-surface/5 border border-border/30 rounded-2xl p-4 transform-gpu">
                  <div className="mt-0.5 shrink-0 w-7 h-7 rounded-lg border border-border/50 bg-background/50 flex items-center justify-center">
                    <MessageSquare size={13} className="text-primary/70" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] text-primary tracking-widest uppercase mb-1">
                      preferred communication
                    </p>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed font-normal">
                      for structured inquiries, using the index letter form on the left ensures optimal queue tracing.
                      for rapid direct pings, standard channels like email or secure instant paths work equally well.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Institutional Statement Node */}
              <Reveal delay={0.5}>
                <div className="rounded-2xl border border-border/40 bg-surface/5 px-4 py-4 flex flex-col gap-2 transition-colors duration-300 hover:border-border/60 transform-gpu">
                  <p className="text-[11px] text-muted-foreground/70 leading-relaxed font-normal">
                    currently handling remote architectures worldwide, ensuring complete technological compliance with design metrics.
                  </p>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/35 block text-right">
                    archive · 2026
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
