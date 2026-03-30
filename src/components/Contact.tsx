import { siteConfig } from "@/data/content";

const Contact = () => (
  <section id="contact" className="py-24 px-6 border-t border-border">
    <div className="mx-auto max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground font-heading">
        let's build something useful.
      </h2>
      <div className="mt-8 flex flex-wrap gap-6 items-center">
        <a href={`mailto:${siteConfig.email}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-body underline underline-offset-4 decoration-border hover:decoration-foreground">
          email
        </a>
        <a href={siteConfig.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-body underline underline-offset-4 decoration-border hover:decoration-foreground">
          x / twitter
        </a>
        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-body underline underline-offset-4 decoration-border hover:decoration-foreground">
          github
        </a>
        <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-body underline underline-offset-4 decoration-border hover:decoration-foreground">
          linkedin
        </a>
      </div>
      <div className="mt-8">
        <a
          href={siteConfig.calLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm px-6 py-2.5 bg-foreground text-background hover:bg-foreground/85 transition-colors duration-200 rounded-sm font-body"
        >
          book a call
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
