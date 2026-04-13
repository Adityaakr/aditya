import { siteConfig } from "@/data/content";

const Footer = () => (
  <footer className="py-8 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px] flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-[12px] text-muted-foreground/40 font-medium">
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </span>
      <div className="flex gap-6">
        {[
          { label: "twitter", href: siteConfig.twitter },
          { label: "github", href: siteConfig.github },
          { label: "linkedin", href: siteConfig.linkedin },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-muted-foreground/40 hover:text-foreground font-medium transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
