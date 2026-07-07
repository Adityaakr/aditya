import { Link } from "react-router-dom";
import { publications } from "@/data/content";
import AnimatedSection from "./AnimatedSection";

const Publications = ({ moreHref }: { moreHref?: string }) => (
  <AnimatedSection className="mt-16">
    <h2 className="text-[15px] font-bold text-foreground mb-5">Publications</h2>
    <div className="space-y-3">
      {publications.map((p) => (
        <div key={p.title} className="flex items-baseline justify-between gap-6">
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14.5px] text-indigo-600 dark:text-indigo-400 hover:underline leading-snug"
          >
            {p.title}
          </a>
          <span className="shrink-0 text-[13px] text-muted-foreground/70 tabular-nums">
            {p.date}
          </span>
        </div>
      ))}
    </div>
    {moreHref && (
      <div className="mt-5 text-right">
        <Link
          to={moreHref}
          className="text-[13.5px] text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          more writing »
        </Link>
      </div>
    )}
  </AnimatedSection>
);

export default Publications;
