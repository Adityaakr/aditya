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
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
        <AnimatedSection delay={0.1}>
          <div className="shrink-0">
            <img
              src="/aditya.png"
              alt="Aditya"
              className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-border/60 shadow-sm"
            />
          </div>
        </AnimatedSection>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-5 flex-1"
        >
        <motion.p variants={staggerItem} className="text-base md:text-[1.0625rem] text-muted-foreground leading-[1.75]">
          currently i work on developer adoption, technical education, ecosystem growth, and builder support across web3 — primarily at{" "}
          <a href="https://vara.network" target="_blank" rel="noopener noreferrer" className={linkClass}>vara network</a>{" "}
          and{" "}
          <a href="https://gear-tech.io" target="_blank" rel="noopener noreferrer" className={linkClass}>gear foundation</a>.
          i{" "}
          <a href="https://x.com/monaris_fi/status/2033153654115737736?s=20" target="_blank" rel="noopener noreferrer" className={linkClass}>build products that get real adoption</a>.
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
          and run 35+ workshops across ecosystems including vara, avalanche, stellar, aptos and hedera.
        </motion.p>
        <motion.p variants={staggerItem} className="text-base md:text-[1.0625rem] text-muted-foreground leading-[1.75]">
          i'm also a member of{" "}
          <a href="https://superteam.fun" target="_blank" rel="noopener noreferrer" className={linkClass}>superteam</a>.
        </motion.p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
