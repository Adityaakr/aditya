import { trustLogos } from "@/data/content";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";

const TrustStrip = () => (
  <section className="py-16 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <AnimatedSection>
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-5">
          worked with
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          {trustLogos.map((logo) => (
            <motion.a
              key={logo.name}
              variants={staggerItem}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] tracking-wide uppercase text-muted-foreground/45 font-medium hover:text-foreground transition-colors duration-300"
            >
              {logo.name}
            </motion.a>
          ))}
        </motion.div>
      </AnimatedSection>
    </div>
  </section>
);

export default TrustStrip;
