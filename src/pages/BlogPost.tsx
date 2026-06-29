import { getPost, formatDate } from "@/data/blog";
import { siteConfig } from "@/data/content";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="noise-overlay min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/40">
        <div className="mx-auto max-w-[680px] px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            blog
          </Link>
          <p className="text-[13px] font-semibold text-foreground">{siteConfig.name}</p>
        </div>
      </header>

      <main className="py-16 md:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-[680px]">
          {!post ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">post not found</h1>
              <p className="mt-3 text-[15px] text-muted-foreground/65">
                this article doesn't exist (or hasn't been published yet).
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 mt-6 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={13} />
                back to blog
              </Link>
            </div>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="mb-10">
                {post.date && (
                  <time className="text-[12px] font-medium tracking-wide uppercase text-muted-foreground/50">
                    {formatDate(post.date)}
                  </time>
                )}
                <h1 className="mt-3 text-3xl md:text-[2.5rem] font-bold tracking-tighter text-foreground leading-tight">
                  {post.title}
                </h1>
              </header>

              <div
                className="prose prose-neutral dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-[1.75]
                  prose-li:text-muted-foreground
                  prose-a:text-foreground prose-a:underline-offset-4
                  prose-strong:text-foreground
                  prose-img:rounded-2xl prose-img:border prose-img:border-border/40
                  prose-pre:rounded-2xl prose-pre:border prose-pre:border-border/40
                  prose-blockquote:border-l-border prose-blockquote:text-muted-foreground/80"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              <div className="mt-16 pt-8 border-t border-border/40">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={13} />
                  back to blog
                </Link>
              </div>
            </motion.article>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
