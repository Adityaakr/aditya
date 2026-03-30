import { writingAndTalks } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

const typeLabel: Record<string, string> = {
  essay: "essay",
  talk: "talk",
  thread: "thread",
  workshop: "workshop",
  video: "video",
};

const WritingTalks = () => (
  <section id="writing" className="py-20 px-6 border-t border-border">
    <div className="mx-auto max-w-4xl">
      <h2 className="text-2xl font-light tracking-tight text-foreground mb-12">writing & talks</h2>
      <div className="space-y-0">
        {writingAndTalks.map((item) => (
          <a
            key={item.title}
            href={item.link}
            className="group flex items-center justify-between py-4 border-b border-border/50"
          >
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-body w-16 shrink-0">
                {typeLabel[item.type] || item.type}
              </span>
              <span className="text-sm md:text-base text-foreground font-body group-hover:text-muted-foreground transition-colors duration-200 truncate">
                {item.title}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              <span className="text-xs text-muted-foreground/40 font-body hidden sm:inline">{item.date}</span>
              <ArrowUpRight size={14} className="text-muted-foreground/30 group-hover:text-foreground transition-colors duration-200" />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default WritingTalks;
