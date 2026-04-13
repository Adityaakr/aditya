import { projects } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

const statusStyles: Record<string, string> = {
  live: "text-emerald-600 bg-emerald-50 border-emerald-200/80",
  building: "text-amber-600 bg-amber-50 border-amber-200/80",
  research: "text-muted-foreground bg-muted border-border",
};

const Projects = () => (
  <section id="projects" className="py-24 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-3">
        projects
      </p>
      <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-14">
        things i'm building
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="group block p-6 border border-border/60 rounded-lg hover:border-foreground/15 hover:shadow-sm transition-all duration-250"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-foreground">
                {project.title}
              </h3>
              <span
                className={`text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full border ${statusStyles[project.status]}`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            <div className="mt-5 flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground/40 group-hover:text-foreground transition-colors duration-200">
              <span>view project</span>
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
