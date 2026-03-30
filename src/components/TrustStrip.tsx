import { trustLogos, proofStats } from "@/data/content";

const TrustStrip = () => (
  <section className="py-16 px-6 border-t border-border">
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
        {trustLogos.map((name) => (
          <span key={name} className="text-xs tracking-widest uppercase text-muted-foreground/60 font-body">
            {name}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {proofStats.map((stat) => (
          <p key={stat} className="text-sm text-muted-foreground leading-relaxed font-body">
            — {stat}
          </p>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
