import { motion } from "framer-motion";
import { siteConfig } from "@/data/content";
import { ArrowDown } from "lucide-react";

const Hero = () => (
  <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 px-6 lg:px-8 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/[0.04] via-violet-500/[0.04] to-transparent rounded-full blur-3xl dark:from-blue-400/[0.06] dark:via-violet-400/[0.06]" />
      <div className="absolute top-40 -right-32 w-[400px] h-[400px] bg-gradient-to-bl from-emerald-500/[0.04] via-cyan-500/[0.04] to-transparent rounded-full blur-3xl dark:from-emerald-400/[0.06] dark:via-cyan-400/[0.06]" />
    </div>

    <div className="mx-auto max-w-[860px] relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-flex items-center gap-2.5 mb-6 px-3 py-1.5 rounded-full bg-muted/50 border border-border/60">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <p className="text-[12px] font-medium tracking-wide text-muted-foreground">
            building at vara network & gear foundation
          </p>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-bold tracking-tighter leading-[1.05] text-foreground"
      >
        i build products,{" "}
        <br className="hidden sm:block" />
        developer ecosystems{" "}
        <br className="hidden sm:block" />
        <span className="text-muted-foreground/60">& internet-native finance.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-7 text-base md:text-[1.0625rem] text-muted-foreground/75 leading-[1.7] max-w-[520px]"
      >
        devrel, product, growth, and web3 execution - helping technical products get adopted and building a few of my own along the way.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <a
          href="#work"
          className="inline-flex items-center gap-2 text-[13px] font-semibold px-6 py-2.5 bg-foreground text-background hover:bg-foreground/85 transition-all duration-200 rounded-full"
        >
          view my work
          <ArrowDown size={13} />
        </a>
        <a
          href={siteConfig.calLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13px] font-medium px-6 py-2.5 border border-border hover:border-foreground/20 hover:bg-muted/50 text-foreground transition-all duration-200 rounded-full"
        >
          book a call
        </a>
      </motion.div>
    </div>
  </section>
);

export default Hero;
