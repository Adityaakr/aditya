import { trustLogos, proofStats } from "@/data/content";

const TrustStrip = () => (
  <section className="py-16 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-5">
        worked with
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-12">
        {trustLogos.map((name) => (
          <span
            key={name}
            className="text-[13px] tracking-wide uppercase text-muted-foreground/50 font-medium"
          >
            {name}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
        {proofStats.map((stat) => (
          <p
            key={stat}
            className="text-[15px] text-muted-foreground leading-relaxed pl-4 border-l-2 border-border"
          >
            {stat}
          </p>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
