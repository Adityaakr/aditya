import { siteConfig } from "@/data/content";

const Contact = () => (
  <section id="contact" className="py-28 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-6">
        get in touch
      </p>
      <h2 className="text-3xl md:text-[2.5rem] font-bold tracking-tighter text-foreground leading-tight">
        let's build something useful.
      </h2>
      <p className="mt-4 text-base text-muted-foreground/70 max-w-md">
        always open to collaborating on interesting products, developer tools, and ecosystem work.
      </p>
      <div className="mt-10 flex flex-wrap gap-5 items-center">
        {[
          { label: "email", href: `mailto:${siteConfig.email}` },
          { label: "x / twitter", href: siteConfig.twitter },
          { label: "github", href: siteConfig.github },
          { label: "linkedin", href: siteConfig.linkedin },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-4 decoration-border/80 hover:decoration-foreground/40"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="mt-10">
        <a
          href={siteConfig.calLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[14px] font-semibold px-7 py-3 bg-foreground text-background hover:bg-foreground/85 transition-all duration-200 rounded-full"
        >
          book a call
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
