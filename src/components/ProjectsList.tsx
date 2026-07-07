import { Link } from "react-router-dom";
import { projects } from "@/data/content";
import AnimatedSection from "./AnimatedSection";

const statusColor: Record<string, string> = {
  live: "text-emerald-600 dark:text-emerald-400",
  building: "text-amber-600 dark:text-amber-400",
  research: "text-muted-foreground",
};

interface ProjectsListProps {
  heading?: string;
  limit?: number;
  moreHref?: string;
}

const ProjectsList = ({ heading = "Experiments", limit, moreHref }: ProjectsListProps) => (
  <AnimatedSection className="mt-16" id="experiments">
    <h2 className="text-[15px] font-bold text-foreground mb-6">{heading}</h2>
    <div className="space-y-8">
      {(limit ? projects.slice(0, limit) : projects).map((p) => {
        const rawLinks = [
          { label: p.link.includes("github") ? "github" : "view", href: p.link },
          p.website && { label: "website", href: p.website },
          p.protocol && { label: "protocol", href: p.protocol },
          p.social && { label: "twitter", href: p.social },
        ].filter(Boolean) as { label: string; href: string }[];
        // drop duplicate hrefs (e.g. a project whose primary link is also its social)
        const seen = new Set<string>();
        const links = rawLinks.filter((l) =>
          seen.has(l.href) ? false : (seen.add(l.href), true)
        );

        return (
          <div key={p.title}>
            <div className="flex items-baseline justify-between gap-6">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14.5px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {p.title}
              </a>
              <span
                className={`shrink-0 text-[11px] uppercase tracking-widest font-medium ${statusColor[p.status]}`}
              >
                {p.status}
              </span>
            </div>
            <p className="mt-1.5 text-[14px] text-foreground/75 leading-[1.65]">
              {p.description}
            </p>
            {p.highlight && (
              <p className="mt-1.5 text-[12.5px] font-medium text-muted-foreground">
                {p.highlight}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-muted-foreground/70 hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              ))}
              {p.tags.length > 0 && (
                <span className="text-[12px] text-muted-foreground/50">
                  {p.tags.join(" · ")}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
    {moreHref && (
      <div className="mt-6 text-right">
        <Link
          to={moreHref}
          className="text-[13.5px] text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          more »
        </Link>
      </div>
    )}
  </AnimatedSection>
);

export default ProjectsList;
