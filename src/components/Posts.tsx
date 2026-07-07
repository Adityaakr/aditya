import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import AnimatedSection from "./AnimatedSection";

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

const RECENT = 6;

const Posts = () => (
  <AnimatedSection className="mt-16" id="posts">
    <h2 className="text-[15px] font-bold text-foreground mb-5">Posts</h2>
    <div className="space-y-3">
      {blogPosts.slice(0, RECENT).map((post) => (
        <div key={post.slug} className="flex items-baseline justify-between gap-6">
          <Link
            to={`/blog/${post.slug}`}
            className="text-[14.5px] text-indigo-600 dark:text-indigo-400 hover:underline leading-snug"
          >
            {post.title}
          </Link>
          <span className="shrink-0 text-[13px] text-muted-foreground/70 tabular-nums">
            {shortDate(post.date)}
          </span>
        </div>
      ))}
    </div>
    {blogPosts.length > RECENT && (
      <div className="mt-5 text-right">
        <Link
          to="/blog"
          className="text-[13.5px] text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          more »
        </Link>
      </div>
    )}
  </AnimatedSection>
);

export default Posts;
