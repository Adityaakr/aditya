import { stats, statsLink } from "@/data/content";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import AnimatedSection, { staggerContainer, staggerItem } from "./AnimatedSection";
import { motion } from "framer-motion";

const PolybasketsStats = () => (
  <section className="py-24 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <AnimatedSection>
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <p className="text-[11px] font-medium tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
            polybaskets
          </p>
          <span className="text-[10px] font-medium text-muted-foreground/30 ml-auto">
            live
          </span>
        </div>

        <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-8">
          the market that trades itself
        </h2>
      </AnimatedSection>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={staggerItem}
            className="group p-5 rounded-2xl border border-border/40 bg-card hover:border-emerald-500/15 dark:hover:border-emerald-400/15 hover:shadow-sm transition-all duration-300 text-center"
          >
            <p className="text-[2rem] md:text-[2.25rem] font-bold tracking-tight text-foreground tabular-nums leading-none">
              {s.value}
            </p>
            <p className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground/35 mt-2">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <AnimatedSection delay={0.2}>
        <a
          href={statsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground/50 hover:text-foreground transition-colors duration-200 group"
        >
          <TrendingUp size={13} />
          <span>view live stats</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default PolybasketsStats;
