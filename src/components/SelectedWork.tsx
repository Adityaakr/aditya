import { selectedWork } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

const SelectedWork = () => (
  <section id="work" className="py-24 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-3">
        work
      </p>
      <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-14">
        selected work
      </h2>
      <div className="space-y-0">
        {selectedWork.map((item, i) => (
          <a
            key={item.title}
            href={item.link}
            className="group flex items-start justify-between gap-6 py-5 border-b border-border/50 first:border-t first:border-border/50 hover:bg-muted/30 -mx-4 px-4 transition-colors duration-200 rounded-sm"
          >
            <div className="flex items-start gap-4 min-w-0">
              <span className="text-[12px] text-muted-foreground/35 font-medium tabular-nums mt-0.5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-foreground group-hover:text-foreground/80 transition-colors duration-200 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[14px] text-muted-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={16}
              className="text-muted-foreground/25 group-hover:text-foreground transition-all duration-200 mt-0.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default SelectedWork;
