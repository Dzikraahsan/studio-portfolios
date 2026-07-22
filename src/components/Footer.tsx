import { memo } from "react";
import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  isExternal: boolean;
}

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: "GitHub profile (opens in a new tab)",
    href: "https://github.com/Dzikraahsan",
    icon: Github,
    isExternal: true,
  },
  {
    label: "LinkedIn profile (opens in a new tab)",
    href: "https://www.linkedin.com/in/dzikra-ahsan-1b2154386?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: Linkedin,
    isExternal: true,
  },
  {
    label: "Send email to dzikraahsan10@gmail.com",
    href: "mailto:dzikraahsan10@gmail.com",
    icon: Mail,
    isExternal: false,
  },
] as const;

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-8 mt-32 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright Text */}
        <p className="font-mono text-xs text-muted-foreground">
          © {currentYear} Dzikra. all rights reserved.
        </p>

        {/* Social Links List */}
        <ul className="flex items-center gap-4" aria-label="Social links">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon, isExternal }) => (
            <li key={label}>
              <a
                href={href}
                {...(isExternal
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
                aria-label={label}
                className="text-muted-foreground hover:text-primary transition-all duration-200 inline-flex items-center justify-center min-h-11 min-w-11 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
