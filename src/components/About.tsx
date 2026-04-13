import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";

const linkClass = "text-foreground font-semibold underline decoration-border/80 underline-offset-4 hover:decoration-foreground/40 transition-colors";

const About = () => (
  <section id="about" className="py-24 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <AnimatedSection>
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-3">
          about
        </p>
        <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-10">
          a bit about me
        </h2>
      </AnimatedSection>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-5 max-w-[600px]"
      >
        <motion.p variants={staggerItem} className="text-base md:text-[1.0625rem] text-muted-foreground leading-[1.75]">
          currently i work on developer adoption, technical education, ecosystem growth, and builder support across web3 — primarily at{" "}
          <a href="https://vara.network" target="_blank" rel="noopener noreferrer" className={linkClass}>vara network</a>{" "}
          and{" "}
          <a href="https://gear-tech.io" target="_blank" rel="noopener noreferrer" className={linkClass}>gear foundation</a>.
          i also contribute to the{" "}
          <a href="https://wiki.vara.network" target="_blank" rel="noopener noreferrer" className={linkClass}>vara wiki</a>{" "}
          and maintain{" "}
          <a href="https://sails-tutorials.vara.network/hello-world/hello-world" target="_blank" rel="noopener noreferrer" className={linkClass}>interactive sails tutorials</a>.
        </motion.p>
        <motion.p variants={staggerItem} className="text-base md:text-[1.0625rem] text-muted-foreground leading-[1.75]">
          alongside that, i'm building{" "}
          <a href="https://monaris.co" target="_blank" rel="noopener noreferrer" className={linkClass}>monaris</a>{" "}
          (18,160+ waitlist) — a private finance product for the stablecoin era, and{" "}
          <a href="https://cusp.fi" target="_blank" rel="noopener noreferrer" className={linkClass}>cusp</a>{" "}
          — the execution layer for agentic, event-driven capital.
        </motion.p>
        <motion.p variants={staggerItem} className="text-base md:text-[1.0625rem] text-muted-foreground leading-[1.75]">
          i've judged at{" "}
          <a href="https://x.com/adityakrx/status/1969372931760537636" target="_blank" rel="noopener noreferrer" className={linkClass}>ETH Global</a>,
          partnered at{" "}
          <a href="https://x.com/adityakrx/status/1971095045236465940" target="_blank" rel="noopener noreferrer" className={linkClass}>ETH Pragma</a>,
          won{" "}
          <a href="https://x.com/adityakrx/status/1994392689287262212" target="_blank" rel="noopener noreferrer" className={linkClass}>20+ hackathons</a>,
          and run 25+ workshops across ecosystems including avalanche, stellar, aptos, mantle, and hedera.
        </motion.p>
      </motion.div>
    </div>
  </section>
);

export default About;
