import { useState, useMemo } from "react";
import { contentItems, type ContentType } from "@/data/content";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";

const tabs: { label: string; value: ContentType | "all" }[] = [
  { label: "all", value: "all" },
  { label: "videos", value: "video" },
  { label: "writing", value: "thread" },
  { label: "workshops", value: "workshop" },
  { label: "events", value: "event" },
];

const typeStyles: Record<string, string> = {
  video: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50",
  essay: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50",
  talk: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50",
  thread: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50",
  workshop: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50",
  event: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50",
};

const featuredTypeLabel: Record<string, string> = {
  video: "Featured Video",
  thread: "Featured Thread",
  event: "Featured Event",
};

const INITIAL_COUNT = 12;

const ContentSection = () => {
  const [activeTab, setActiveTab] = useState<ContentType | "all">("all");
  const [showAll, setShowAll] = useState(false);

  const featured = useMemo(() => contentItems.filter((i) => i.featured).slice(0, 3), []);

  const filtered = useMemo(() => {
    const items = activeTab === "all"
      ? contentItems
      : activeTab === "thread"
        ? contentItems.filter((i) => i.type === "thread" || i.type === "essay")
        : contentItems.filter((i) => i.type === activeTab);
    return activeTab === "all" ? items.filter((i) => !i.featured) : items;
  }, [activeTab]);

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT;

  const getCount = (value: string) => {
    if (value === "all") return contentItems.length;
    if (value === "thread") return contentItems.filter((i) => i.type === "thread" || i.type === "essay").length;
    return contentItems.filter((i) => i.type === value).length;
  };

  const currentFeatured = featured[0];

  return (
    <section id="content" className="py-24 px-6 lg:px-8 border-t border-border/60">
      <div className="mx-auto max-w-[860px]">
        <AnimatedSection>
          <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-3">
            content
          </p>
          <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-6">
            videos, writing & talks
          </h2>
          <p className="text-[15px] text-muted-foreground/70 mb-10 max-w-lg">
            {contentItems.length} pieces across videos, threads, workshops, essays, and talks — here's the best of it.
          </p>
        </AnimatedSection>

        {activeTab === "all" && (
          <AnimatedSection>
            <div className="relative mb-14 rounded-[2rem] border border-border/60 bg-card shadow-sm dark:shadow-white/[0.02] overflow-hidden">
              <a
                href={currentFeatured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block min-h-[260px] p-6 md:p-10"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${typeStyles[currentFeatured.type]}`}>
                    {currentFeatured.type}
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">★ featured</span>
                </div>
                <h3 className="text-3xl md:text-[2.15rem] font-semibold tracking-tight text-foreground leading-tight max-w-[640px] mb-4 group-hover:text-foreground/80 transition-colors">
                  {currentFeatured.title}
                </h3>
                {currentFeatured.summary && (
                  <p className="text-[15px] md:text-base text-muted-foreground/72 leading-relaxed max-w-[640px] mb-8">
                    {currentFeatured.summary}
                  </p>
                )}
                <div className="mt-auto flex items-end justify-between gap-6">
                  <span className="text-[12px] text-muted-foreground/40 font-medium tabular-nums">
                    {currentFeatured.date}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-muted-foreground/35 group-hover:text-foreground group-hover:border-foreground/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            </div>
          </AnimatedSection>
        )}

        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => { setActiveTab(tab.value); setShowAll(false); }}
              className={`text-[12px] font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
                activeTab === tab.value
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border/60 hover:border-foreground/20 hover:text-foreground"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-[10px] opacity-60">{getCount(tab.value)}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="space-y-0"
          >
            {displayed.map((item) => (
              <motion.a
                key={item.title + item.date}
                variants={staggerItem}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-3.5 border-b border-border/40 hover:bg-muted/30 -mx-4 px-4 transition-all duration-200 rounded-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full shrink-0 ${typeStyles[item.type] || "text-muted-foreground bg-muted"}`}>
                    {item.type}
                  </span>
                  <span className="text-[13px] md:text-[14px] text-foreground font-medium group-hover:text-foreground/70 transition-colors duration-200 truncate">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-6">
                  <span className="text-[11px] text-muted-foreground/40 font-medium hidden sm:inline tabular-nums">{item.date}</span>
                  <ArrowUpRight size={13} className="text-muted-foreground/25 group-hover:text-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {hasMore && !showAll && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground border border-border/60 hover:border-foreground/20 px-6 py-2.5 rounded-full transition-all duration-200"
            >
              show all {filtered.length} more
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ContentSection;
