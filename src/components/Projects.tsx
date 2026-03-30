import { projects } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

const statusStyles: Record<string, string> = {
  live: "text-green-700 bg-green-50 border-green-200",
  building: "text-amber-700 bg-amber-50 border-amber-200",
  research: "text-muted-foreground bg-muted border-border",
};

const Projects = () => (
  <section id="projects" className="py-20 px-6 border-t border-border">
    <div className="mx-auto max-w-4xl">
      <h2 className="text-2xl font-light tracking-tight text-foreground mb-12">projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="group block p-5 border border-border/60 rounded-sm hover:border-foreground/20 transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-body font-medium text-foreground">{project.title}</h3>
              <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm border ${statusStyles[project.status]}`}>
                {project.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{project.description}</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground/50 group-hover:text-foreground transition-colors duration-200">
              <span>view</span>
              <ArrowUpRight size={12} />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
