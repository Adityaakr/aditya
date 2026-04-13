import { principles } from "@/data/content";

const Principles = () => (
  <section className="py-24 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-3">
        values
      </p>
      <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-14">
        principles
      </h2>
      <ol className="space-y-6 max-w-[600px]">
        {principles.map((p, i) => (
          <li key={i} className="flex items-baseline gap-5 group">
            <span className="text-[13px] text-muted-foreground/30 font-semibold tabular-nums shrink-0 w-6 text-right">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] md:text-base text-foreground leading-relaxed font-medium">
              {p}
            </span>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Principles;
