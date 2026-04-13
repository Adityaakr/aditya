import { siteConfig } from "@/data/content";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="py-10 px-6 lg:px-8 border-t border-border/60"
  >
    <div className="mx-auto max-w-[860px]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-[13px] font-semibold text-foreground mb-1">
            {siteConfig.name}
          </p>
          <p className="text-[12px] text-muted-foreground/50">
            builder, operator, devrel
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "x / twitter", href: siteConfig.twitter },
            { label: "github", href: siteConfig.github },
            { label: "linkedin", href: siteConfig.linkedin },
            { label: "substack", href: siteConfig.substack },
            { label: "telegram", href: siteConfig.telegram },
            { label: "vara wiki", href: siteConfig.varaWiki },
            { label: "cal.com", href: siteConfig.calLink },
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
      <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-[11px] text-muted-foreground/30 font-medium">
          &copy; {new Date().getFullYear()} {siteConfig.name}. all rights reserved.
        </span>
        <span className="text-[11px] text-muted-foreground/30">
          built with react, tailwind & framer motion
        </span>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
