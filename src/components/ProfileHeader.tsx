import { useState, useEffect } from "react";
import { navLinks, siteConfig } from "@/data/content";
import { Github, Linkedin, Twitter, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const socials = [
  { label: "GitHub", href: siteConfig.github, Icon: Github },
  { label: "LinkedIn", href: siteConfig.linkedin, Icon: Linkedin },
  { label: "Twitter", href: siteConfig.twitter, Icon: Twitter },
  { label: "Email", href: `mailto:${siteConfig.email}`, Icon: Mail },
];

const ProfileHeader = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { pathname } = useLocation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pt-16 md:pt-20"
    >
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            src={siteConfig.avatar}
            alt={siteConfig.name}
            className="w-14 h-14 rounded-full object-cover border border-border/60"
          />
        </Link>
        <div>
          <div className="flex flex-wrap items-baseline gap-x-2.5">
            <Link
              to="/"
              className="text-[17px] font-bold tracking-tight text-foreground hover:opacity-70 transition-opacity"
            >
              {siteConfig.name}
            </Link>
            <a
              href={siteConfig.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {siteConfig.handle}
            </a>
          </div>
          <p className="text-[13.5px] text-muted-foreground mt-0.5">
            {siteConfig.role}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-b border-border/60 pb-3">
        <nav className="flex items-center gap-5">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            const cls = `text-[13.5px] font-medium underline underline-offset-[6px] transition-colors ${
              active
                ? "text-foreground decoration-foreground/60"
                : "text-foreground/80 decoration-border hover:decoration-foreground/50"
            }`;
            return link.href.startsWith("/") ? (
              <Link key={link.label} to={link.href} className={cls}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={cls}>
                {link.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-3.5 text-muted-foreground">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-foreground transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default ProfileHeader;
