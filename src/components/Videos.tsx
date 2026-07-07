import { Link } from "react-router-dom";
import { contentItems } from "@/data/content";
import AnimatedSection from "./AnimatedSection";

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2026-04" -> "Apr 2026"
function monthLabel(date: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec((date || "").trim());
  if (!m) return date || "";
  const [, y, mm] = m;
  return `${MONTHS_SHORT[Number(mm) - 1]} ${y}`;
}

const LIMIT = 5;

// Prefer featured videos, then fill with the most recent.
const videos = contentItems
  .filter((c) => c.type === "video")
  .sort((a, b) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    return (b.date || "").localeCompare(a.date || "");
  })
  .slice(0, LIMIT);

const Videos = () => (
  <AnimatedSection className="mt-16">
    <h2 className="text-[15px] font-bold text-foreground mb-5">Videos</h2>
    <div className="space-y-3">
      {videos.map((v) => (
        <div key={v.link} className="flex items-baseline justify-between gap-6">
          <a
            href={v.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14.5px] text-indigo-600 dark:text-indigo-400 hover:underline leading-snug"
          >
            {v.title}
          </a>
          <span className="shrink-0 text-[13px] text-muted-foreground/70 tabular-nums">
            {monthLabel(v.date)}
          </span>
        </div>
      ))}
    </div>
    <div className="mt-5 text-right">
      <Link
        to="/content"
        className="text-[13.5px] text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        more videos »
      </Link>
    </div>
  </AnimatedSection>
);

export default Videos;
