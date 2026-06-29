import { blogPosts, formatDate } from "@/data/blog";
import { siteConfig } from "@/data/content";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => (
  <div className="noise-overlay min-h-screen bg-background">
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/40">
      <div className="mx-auto max-w-[760px] px-6 lg:px-8 h-14 flex items-center justify-between">
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
      <div className="mx-auto max-w-[760px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-lg"
        >
          <h1 className="text-3xl md:text-[2.5rem] font-bold tracking-tighter text-foreground leading-tight">
            blog
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground/65 leading-relaxed">
            essays and notes on building, devrel, and the things i ship.
          </p>
        </motion.div>

        {blogPosts.length === 0 ? (
          <p className="text-[14px] text-muted-foreground/60">no posts yet — check back soon.</p>
        ) : (
          <div className="border-t border-border/40">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block py-6 border-b border-border/40"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-[17px] font-semibold tracking-tight text-foreground group-hover:opacity-70 transition-opacity">
                      {post.title}
                      <ArrowUpRight
                        size={15}
                        className="inline-block ml-1 -translate-y-px text-muted-foreground/40 group-hover:translate-x-0.5 group-hover:-translate-y-1 transition-transform"
                      />
                    </h2>
                    {post.date && (
                      <time className="shrink-0 text-[12px] text-muted-foreground/50 tabular-nums">
                        {formatDate(post.date)}
                      </time>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  </div>
);

export default Blog;
