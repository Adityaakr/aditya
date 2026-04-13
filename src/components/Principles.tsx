import { principles } from "@/data/content";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";

const Principles = () => (
  <section className="py-24 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <AnimatedSection>
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-3">
          values
        </p>
        <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-14">
          principles
        </h2>
      </AnimatedSection>
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-6 max-w-[600px]"
      >
        {principles.map((p, i) => (
          <motion.li key={i} variants={staggerItem} className="flex items-baseline gap-5 group">
            <span className="text-[13px] text-muted-foreground/30 group-hover:text-foreground/50 font-semibold tabular-nums shrink-0 w-6 text-right transition-colors duration-300">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] md:text-base text-foreground leading-relaxed font-medium">
              {p}
            </span>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  </section>
);

export default Principles;
