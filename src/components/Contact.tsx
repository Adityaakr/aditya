import { siteConfig } from "@/data/content";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";
import { ArrowUpRight } from "lucide-react";

const Contact = () => (
  <section id="contact" className="py-28 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <AnimatedSection>
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-6">
          get in touch
        </p>
        <h2 className="text-3xl md:text-[2.5rem] font-bold tracking-tighter text-foreground leading-tight">
          let's build something useful.
        </h2>
        <p className="mt-4 text-base text-muted-foreground/70 max-w-md">
          always open to collaborating on interesting products, developer tools, and ecosystem work.
        </p>
      </AnimatedSection>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-10 flex flex-wrap gap-5 items-center"
      >
        {[
          { label: "email", href: `mailto:${siteConfig.email}` },
          { label: "x / twitter", href: siteConfig.twitter },
          { label: "github", href: siteConfig.github },
          { label: "linkedin", href: siteConfig.linkedin },
          { label: "telegram", href: siteConfig.telegram },
        ].map((link) => (
          <motion.a
            key={link.label}
            variants={staggerItem}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-4 decoration-border/80 hover:decoration-foreground/40"
          >
            {link.label}
            <ArrowUpRight
              size={12}
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        ))}
      </motion.div>

      <AnimatedSection delay={0.2}>
        <div className="mt-12 p-6 md:p-8 rounded-xl border border-border/60 bg-muted/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[15px] font-semibold text-foreground">
                schedule a call
              </p>
              <p className="text-[13px] text-muted-foreground/70 mt-1">
                15-min intro — let's talk about what you're building
              </p>
            </div>
            <a
              href={siteConfig.calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[14px] font-semibold px-7 py-3 bg-foreground text-background hover:bg-foreground/85 transition-all duration-200 rounded-full shrink-0"
            >
              book a call
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default Contact;
