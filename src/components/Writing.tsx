import { contentItems, type ContentType } from "@/data/content";
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

const GROUPS: { heading: string; types: ContentType[] }[] = [
  { heading: "Writing", types: ["essay", "thread"] },
  { heading: "Videos", types: ["video"] },
  { heading: "Talks & Workshops", types: ["talk", "workshop"] },
  { heading: "Events", types: ["event"] },
];

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  (b.date || "").localeCompare(a.date || "");

const Writing = () => (
  <div className="mt-14 space-y-14">
    {GROUPS.map((group) => {
      const items = contentItems
        .filter((c) => group.types.includes(c.type))
        .sort(byDateDesc);
      if (items.length === 0) return null;
      return (
        <AnimatedSection key={group.heading}>
          <h2 className="text-[15px] font-bold text-foreground mb-5">
            {group.heading}
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.link}
                className="flex items-baseline justify-between gap-6"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14.5px] text-indigo-600 dark:text-indigo-400 hover:underline leading-snug"
                >
                  {item.title}
                </a>
                <span className="shrink-0 text-[13px] text-muted-foreground/70 tabular-nums">
                  {monthLabel(item.date)}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      );
    })}
  </div>
);

export default Writing;
