import { testimonials, siteConfig } from "@/data/content";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
  testimonials.filter((_, i) => i % 3 === 0),
  testimonials.filter((_, i) => i % 3 === 1),
  testimonials.filter((_, i) => i % 3 === 2),
];

const PeopleSay = () => (
  <div className="noise-overlay min-h-screen bg-background">
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/40">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          back
        </Link>
        <p className="text-[13px] font-semibold text-foreground">{siteConfig.name}</p>
      </div>
    </header>

    <main className="py-16 md:py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-[1000px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-lg"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/30 border border-rose-200/50 dark:border-rose-800/30">
            <Heart size={12} className="text-rose-500" fill="currentColor" />
            <span className="text-[11px] font-semibold tracking-wide text-rose-600 dark:text-rose-400">
              wall of love
            </span>
          </div>
          <h1 className="text-3xl md:text-[2.5rem] font-bold tracking-tighter text-foreground leading-tight">
            what people say
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground/65 leading-relaxed">
            kind words from builders, founders, and communities i've worked with.
          </p>
        </motion.div>

        {/* Masonry-style image gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + (colIdx * 0.1) + (i * 0.12),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative rounded-2xl overflow-hidden border border-border/40 hover:border-border/70 bg-card/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.05] dark:hover:shadow-white/[0.03]"
                >
                  <img
                    src={t.image}
                    alt={`${t.name} — "${t.quote}"`}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-[14px] font-bold text-white">{t.name}</p>
                    <p className="text-[12px] text-white/60">{t.handle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-[15px] text-muted-foreground/50 max-w-sm mx-auto leading-relaxed">
            i can't capture every message, reply, or DM — but if something i shipped made your day even 1% easier, that means everything.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-4 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} />
            back to home
          </Link>
        </motion.div>
      </div>
    </main>
  </div>
);

export default PeopleSay;
