// Blog engine — drop a content-only .html file into src/content/blog/ and it
// shows up automatically (no manifest to edit). Each file starts with a metadata
// comment, e.g.:
//
//   <!--
//   title: My First Post
//   date: 2026-06-29
//   excerpt: One-line summary shown on the /blog list.
//   -->
//   <h1>My First Post</h1>
//   <p>...the article...</p>
//
// The filename (without .html) becomes the URL slug: my-first-post -> /blog/my-first-post

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  html: string; // article body (metadata comment stripped)
}

// Vite glob: read every article as a raw string at build time.
const modules = import.meta.glob("/src/content/blog/*.html", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parse(raw: string): { meta: Record<string, string>; body: string } {
  const meta: Record<string, string> = {};
  const match = raw.match(/<!--([\s\S]*?)-->/);
  let body = raw;
  if (match) {
    body = raw.replace(match[0], "").trim();
    for (const line of match[1].split("\n")) {
      const idx = line.indexOf(":");
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim().toLowerCase();
      const value = line.slice(idx + 1).trim();
      if (key) meta[key] = value;
    }
  }
  return { meta, body };
}

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = (path.split("/").pop() || "").replace(/\.html$/, "");
    const { meta, body } = parse(raw);
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || "",
      excerpt: meta.excerpt || "",
      html: body,
    };
  })
  // newest first (ISO dates sort lexicographically); untitled-date posts sink to the bottom
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

export const getPost = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Format yyyy-mm-dd without timezone surprises ("2026-06-29" -> "June 29, 2026").
export function formatDate(date: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((date || "").trim());
  if (!m) return date || "";
  const [, y, mm, dd] = m;
  return `${MONTHS[Number(mm) - 1]} ${Number(dd)}, ${y}`;
}
