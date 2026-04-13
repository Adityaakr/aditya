import { useState } from "react";
import { navLinks, siteConfig } from "@/data/content";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-transparent data-[scrolled]:border-border transition-colors duration-300">
      <div className="mx-auto max-w-[860px] px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-body text-[15px] font-bold text-foreground tracking-tight"
        >
          {siteConfig.name}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-normal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <a
            href={siteConfig.resumeLink}
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            resume
          </a>
          <a
            href={siteConfig.calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium px-4 py-1.5 bg-foreground text-background hover:bg-foreground/85 transition-all duration-200 rounded-full"
          >
            book a call
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-6 py-8 space-y-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-5 border-t border-border space-y-4">
            <a
              href={siteConfig.resumeLink}
              className="block text-[15px] font-medium text-muted-foreground hover:text-foreground"
            >
              resume
            </a>
            <a
              href={siteConfig.calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[13px] font-medium px-5 py-2 bg-foreground text-background rounded-full"
            >
              book a call
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
