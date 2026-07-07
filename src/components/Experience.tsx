import { experience } from "@/data/content";
import AnimatedSection from "./AnimatedSection";

const Experience = () => (
  <AnimatedSection className="mt-16" id="experience">
    <h2 className="text-[15px] font-bold text-foreground mb-6">Experience</h2>
    <div className="space-y-9">
      {experience.map((job) => (
        <div key={`${job.role}-${job.company}`}>
          <div className="flex items-baseline justify-between gap-6">
            <h3 className="text-[14.5px] font-semibold text-indigo-600 dark:text-indigo-400">
              {job.role}
            </h3>
            {job.dateRange && (
              <span className="shrink-0 text-[13px] text-muted-foreground/70 tabular-nums">
                {job.dateRange}
              </span>
            )}
          </div>
          <p className="text-[13px] text-muted-foreground mt-0.5">{job.company}</p>
          <ul className="mt-3 space-y-2">
            {job.bullets.map((b, i) => (
              <li
                key={i}
                className="relative pl-4 text-[14px] text-foreground/75 leading-[1.65] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-muted-foreground/50"
              >
                {b}
              </li>
            ))}
          </ul>
          {job.links && job.links.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {job.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </AnimatedSection>
);

export default Experience;
