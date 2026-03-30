import { siteConfig } from "@/data/content";

const Footer = () => (
  <footer className="py-10 px-6 border-t border-border">
    <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-xs text-muted-foreground/50 font-body">
        © {new Date().getFullYear()} {siteConfig.name}
      </span>
      <div className="flex gap-5">
        <a href={siteConfig.twitter} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors duration-200 font-body">
          twitter
        </a>
        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors duration-200 font-body">
          github
        </a>
        <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors duration-200 font-body">
          linkedin
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
