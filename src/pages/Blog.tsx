import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import PageShell from "@/components/PageShell";
import AnimatedSection from "@/components/AnimatedSection";

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2026-07-08" -> "Jul 8, 2026"
function shortDate(date: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((date || "").trim());
  if (!m) return date || "";
  const [, y, mm, dd] = m;
  return `${MONTHS_SHORT[Number(mm) - 1]} ${Number(dd)}, ${y}`;
}

const Blog = () => (
  <PageShell>
    <AnimatedSection className="mt-14">
      <h2 className="text-[15px] font-bold text-foreground mb-5">Posts</h2>
      {blogPosts.length === 0 ? (
        <p className="text-[14px] text-muted-foreground/60">
          no posts yet, check back soon.
        </p>
      ) : (
        <div className="space-y-3">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="flex items-baseline justify-between gap-6"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="text-[14.5px] text-indigo-600 dark:text-indigo-400 hover:underline leading-snug"
              >
                {post.title}
              </Link>
              {post.date && (
                <span className="shrink-0 text-[13px] text-muted-foreground/70 tabular-nums">
                  {shortDate(post.date)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </AnimatedSection>
  </PageShell>
);

export default Blog;
