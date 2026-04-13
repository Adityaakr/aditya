import { selectedWork } from "@/data/content";
import { ArrowUpRight, ExternalLink, BookOpen } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";

const SailsBanner = () => (
  <motion.div variants={staggerItem}>
    <a
      href="https://sails-tutorials.vara.network/hello-world/hello-world"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 py-4 px-5 -mx-4 bg-muted/40 hover:bg-muted/70 border-b border-border/50 rounded-sm transition-all duration-200"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 shrink-0">
        <BookOpen size={14} className="text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-foreground leading-snug">
          build without any setup using sails framework
        </p>
        <p className="text-[12px] text-muted-foreground/60 mt-0.5">
          interactive tutorials — learn from hello world to deploying smart contracts in your browser
        </p>
      </div>
      <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 shrink-0 hidden sm:inline">
        learn now
      </span>
      <ArrowUpRight
        size={14}
        className="text-muted-foreground/30 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all duration-200 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  </motion.div>
);

const SelectedWork = () => (
  <section id="work" className="py-24 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <AnimatedSection>
        <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-3">
          work
        </p>
        <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-14">
          selected work
        </h2>
      </AnimatedSection>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-0"
      >
        {selectedWork.map((item, i) => (
          <div key={item.title}>
            <motion.div
              variants={staggerItem}
              className="group flex items-start justify-between gap-6 py-5 border-b border-border/50 first:border-t first:border-border/50 hover:bg-muted/30 -mx-4 px-4 transition-all duration-250 rounded-sm"
            >
              <div className="flex items-start gap-4 min-w-0">
                <span className="text-[12px] text-muted-foreground/35 font-medium tabular-nums mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                    <h3 className="text-[15px] font-semibold text-foreground group-hover:text-foreground/80 transition-colors duration-200 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] text-muted-foreground/70 leading-relaxed">
                      {item.description}
                    </p>
                  </a>
                  {"website" in item && item.website && (
                    <a
                      href={item.website as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2.5 text-[12px] font-medium text-muted-foreground/50 hover:text-foreground transition-colors duration-200"
                    >
                      <ExternalLink size={11} />
                      <span>{"websiteLabel" in item && item.websiteLabel ? (item.websiteLabel as string) : (item.website as string).replace(/^https?:\/\//, "")}</span>
                    </a>
                  )}
                </div>
              </div>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="shrink-0 mt-0.5">
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground/25 group-hover:text-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
            {i === 0 && <SailsBanner />}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default SelectedWork;
