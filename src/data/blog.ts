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
  // "fragment": content-only HTML rendered inside the site's prose container.
  // "full": a complete standalone HTML document, shown as-is in an iframe.
  kind: "fragment" | "full";
  html?: string; // fragment body (metadata comment stripped)
  file?: string; // full-page file path, served from public/ e.g. "/blog/prism.html"
}

// Full standalone articles. Drop the .html file in public/blog/ and add an entry here
// (title/date/excerpt for the list page). The page itself is shown exactly as authored.
const fullPosts: BlogPost[] = [
  {
    slug: "how-peal-is-built",
    title: "How Peal v0 is built, crate by crate",
    date: "2026-07-09",
    excerpt:
      "A reveal-later encryption network is five Rust crates, one wasm bridge, a TypeScript SDK, and a browser app. The whole thing wired together: what each part does, why it exists, and how a single secret travels from a browser tab to a committee and back.",
    kind: "full",
    file: "/blog/how-peal-is-built.html",
  },
  {
    slug: "peal",
    title: "Peal: encryption with a release date",
    date: "2026-07-08",
    excerpt:
      "Seal data now and it opens later, decrypted by a threshold committee on a time or block you set instead of by the user. How Peal wraps Commonware's batched threshold encryption, the cryptography in depth, and the five things worth building on it.",
    kind: "full",
    file: "/blog/peal.html",
  },
  {
    slug: "fiscus",
    title: "Fiscus, explained: a fund that shows nothing and proves everything",
    date: "2026-07-04",
    excerpt:
      "The complete guide to Fiscus, a private fund protocol on Miden: positions stay sealed while honesty stays checkable — the product, the machinery, the money, and the plan.",
    kind: "full",
    file: "/blog/fiscus.html",
  },
  {
    slug: "mainnet-moment-gtm",
    title: "Turning the mainnet moment into builders",
    date: "2026-06-30",
    excerpt:
      "A developer go-to-market playbook for a protocol's launch moment: how to turn the run-up to mainnet into real apps shipping, and early builders into the proof that recruits the next wave.",
    kind: "full",
    file: "/blog/mainnet-moment-gtm.html",
  },
  {
    slug: "monaris-railgun",
    title: "Inside Monaris × RAILGUN: private payments that feel like one tap",
    date: "2026-06-29",
    excerpt:
      "RAILGUN can hide who paid whom, how much, and the margin — all on a public chain. The catch is almost nobody can use it. Here is how Monaris fixes that.",
    kind: "full",
    file: "/blog/monaris-railgun.html",
  },
  {
    slug: "secrets-as-a-service",
    title: "Secrets as a Service",
    date: "2026-06-29",
    excerpt:
      "A way for a public blockchain to keep a secret and open it exactly on time — nobody can read it early, nobody can hold it back.",
    kind: "full",
    file: "/blog/secrets-as-a-service.html",
  },
  {
    slug: "prism",
    title: "Prism: a multi-agent harness that measures its own value",
    date: "2026-06-29",
    excerpt:
      "A complete agent workflow — from reading a codebase to shipping and reviewing it — built on grounded claims, compounding memory, and enforced safety.",
    kind: "full",
    file: "/blog/prism.html",
  },
  {
    slug: "vara-eth-agentic-economy",
    title: "What builders can actually build with Vara.eth in the agentic economy",
    date: "2026-06-28",
    excerpt:
      "The first real agent products onchain won't be chat wrappers — they'll be trust layers, policy engines, and service markets.",
    kind: "full",
    file: "/blog/vara-eth-agentic-economy.html",
  },
  {
    slug: "polybaskets-board",
    title: "PolyBaskets: Product & Architecture Board",
    date: "2026-06-27",
    excerpt:
      "How the PolyBaskets product and architecture fit together — and how the new perps feature works.",
    kind: "full",
    file: "/blog/polybaskets-board.html",
  },
];

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

const fragmentPosts: BlogPost[] = Object.entries(modules).map(([path, raw]) => {
  const slug = (path.split("/").pop() || "").replace(/\.html$/, "");
  const { meta, body } = parse(raw);
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    excerpt: meta.excerpt || "",
    kind: "fragment" as const,
    html: body,
  };
});

export const blogPosts: BlogPost[] = [...fullPosts, ...fragmentPosts]
  // newest first (ISO dates sort lexicographically); undated posts sink to the bottom
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
