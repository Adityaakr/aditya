import { projects } from "@/data/content";
import { ArrowUpRight, ExternalLink, Twitter } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";

const statusStyles: Record<string, string> = {
  live: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200/80 dark:border-emerald-800/50",
  building: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200/80 dark:border-amber-800/50",
  research: "text-muted-foreground bg-muted border-border",
};

const Projects = () => (
  <section id="projects" className="py-24 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <AnimatedSection>
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-3">
          projects
        </p>
        <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-14">
          things i'm building
        </h2>
      </AnimatedSection>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={staggerItem}
            className="group relative p-6 border border-border/60 rounded-xl hover:border-foreground/15 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-white/[0.02] transition-all duration-300 bg-card flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-semibold text-foreground">
                {project.title}
              </h3>
              <span
                className={`text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full border ${statusStyles[project.status]}`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-[14px] text-muted-foreground leading-relaxed mb-3 flex-1">
              {project.description}
            </p>
            {project.highlight && (
              <p className="text-[12px] font-semibold text-foreground/80 mb-3">
                {project.highlight}
              </p>
            )}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium text-muted-foreground/60 bg-muted/80 px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground/50 hover:text-foreground transition-colors duration-200"
              >
                <span>{project.link.includes("github") ? "github" : "view"}</span>
                <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground/50 hover:text-foreground transition-colors duration-200"
                >
                  <ExternalLink size={11} />
                  <span>website</span>
                </a>
              )}
              {project.social && (
                <a
                  href={project.social}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground/50 hover:text-foreground transition-colors duration-200"
                >
                  <Twitter size={11} />
                  <span>@monaris_fi</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Projects;
