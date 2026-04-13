import { testimonials } from "@/data/content";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

const Testimonials = () => (
  <section className="py-14 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <AnimatedSection>
        <Link to="/people-say" className="group block">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/30 border border-rose-200/40 dark:border-rose-800/30">
                <Heart size={13} className="text-rose-500" fill="currentColor" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                  wall of love
                </p>
                <p className="text-[12px] text-muted-foreground/50">
                  kind words from builders & communities
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Preview: stacked screenshot thumbnails */}
              <div className="flex -space-x-3">
                {testimonials.slice(0, 5).map((t, i) => (
                  <motion.img
                    key={t.name}
                    src={t.image}
                    alt={t.name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    className="w-9 h-9 rounded-lg object-cover border-2 border-background shadow-sm"
                  />
                ))}
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted/60 border-2 border-background text-[10px] font-bold text-muted-foreground/60">
                  +{testimonials.length - 5}
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground/50 group-hover:text-foreground transition-colors">
                view all
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

export default Testimonials;
