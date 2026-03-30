import { useState } from "react";
import { navLinks, siteConfig } from "@/data/content";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
        <a href="#" className="font-body text-sm font-medium text-foreground tracking-tight">
          {siteConfig.name}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={siteConfig.resumeLink}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            resume
          </a>
          <a
            href={siteConfig.calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-1.5 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-200 rounded-sm"
          >
            book a call
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-border space-y-3">
            <a href={siteConfig.resumeLink} className="block text-sm text-muted-foreground hover:text-foreground">
              resume
            </a>
            <a
              href={siteConfig.calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm px-4 py-1.5 border border-foreground text-foreground rounded-sm"
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
