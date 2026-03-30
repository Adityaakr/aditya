import { principles } from "@/data/content";

const Principles = () => (
  <section className="py-20 px-6 border-t border-border">
    <div className="mx-auto max-w-4xl">
      <h2 className="text-2xl font-light tracking-tight text-foreground mb-12">principles</h2>
      <ol className="space-y-4 max-w-2xl">
        {principles.map((p, i) => (
          <li key={i} className="flex items-baseline gap-4">
            <span className="text-xs text-muted-foreground/40 font-body tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-base text-foreground font-body leading-relaxed">{p}</span>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Principles;
