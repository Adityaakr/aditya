import { writingAndTalks } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

const typeStyles: Record<string, string> = {
  essay: "text-blue-600 bg-blue-50",
  talk: "text-violet-600 bg-violet-50",
  thread: "text-orange-600 bg-orange-50",
  workshop: "text-emerald-600 bg-emerald-50",
  video: "text-rose-600 bg-rose-50",
};

const WritingTalks = () => (
  <section id="writing" className="py-24 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-3">
        thoughts
      </p>
      <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-14">
        writing & talks
      </h2>
      <div className="space-y-0">
        {writingAndTalks.map((item) => (
          <a
            key={item.title}
            href={item.link}
            className="group flex items-center justify-between py-4 border-b border-border/40 hover:bg-muted/30 -mx-4 px-4 transition-colors duration-200 rounded-sm"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span
                className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full shrink-0 ${typeStyles[item.type] || "text-muted-foreground bg-muted"}`}
              >
                {item.type}
              </span>
              <span className="text-[14px] md:text-[15px] text-foreground font-medium group-hover:text-foreground/70 transition-colors duration-200 truncate">
                {item.title}
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0 ml-6">
              <span className="text-[12px] text-muted-foreground/40 font-medium hidden sm:inline tabular-nums">
                {item.date}
              </span>
              <ArrowUpRight
                size={14}
                className="text-muted-foreground/25 group-hover:text-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default WritingTalks;
