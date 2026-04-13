import { highlights } from "@/data/content";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";

const Highlights = () => (
  <section className="py-20 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <AnimatedSection>
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-3">
          highlights
        </p>
        <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-10">
          proof of work
        </h2>
      </AnimatedSection>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap gap-3"
      >
        {highlights.map((item) => (
          <motion.a
            key={item.label}
            variants={staggerItem}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/60 bg-card hover:border-foreground/20 hover:shadow-sm transition-all duration-200"
          >
            <span className="text-[13px] font-medium text-foreground">
              {item.label}
            </span>
            <ArrowUpRight
              size={12}
              className="text-muted-foreground/40 group-hover:text-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Highlights;
