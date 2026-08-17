/**
 * Give every blog post real link-preview tags.
 *
 * The problem: posts are shared as /blog/<slug> (no extension). vercel.json rewrites
 * every extensionless path to /index.html, so a crawler asking for /blog/<slug> gets
 * the generic site shell. Crawlers do not run JS, so react-helmet-style client-side
 * tags would not help either.
 *
 * The fix: after `vite build`, write dist/blog/<slug>/index.html for each post: a copy
 * of the built shell with per-post <title>, og:*, twitter:* and canonical injected.
 * Vercel checks the filesystem before applying rewrites, so that file is what a crawler
 * receives, while the React app still boots from it and routes to the post as normal.
 *
 * Post metadata is read from src/data/blog.ts (the single source of truth for the list).
 * A post's own og:image / og:description, if its standalone HTML declares one, wins.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://www.adibuilds.in';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Pull the fullPosts entries out of src/data/blog.ts without needing a TS runtime. */
function readPosts() {
  const src = readFileSync(join(ROOT, 'src/data/blog.ts'), 'utf8');
  const start = src.indexOf('const fullPosts');
  const end = src.indexOf('\n];', start);
  if (start === -1 || end === -1) throw new Error('could not locate fullPosts[] in src/data/blog.ts');
  const block = src.slice(start, end);

  const posts = [];
  for (const chunk of block.split(/\n  \{\n/).slice(1)) {
    const field = (name) => {
      const m = chunk.match(new RegExp(`${name}:\\s*\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`));
      return m ? m[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\') : null;
    };
    const slug = field('slug');
    if (slug) posts.push({ slug, title: field('title'), excerpt: field('excerpt'), file: field('file') });
  }
  return posts;
}

/** Read a meta value the standalone article already declares for itself. */
function fromArticle(file, patterns) {
  if (!file) return null;
  const path = join(DIST, file.replace(/^\//, ''));
  if (!existsSync(path)) return null;
  const html = readFileSync(path, 'utf8').slice(0, 8192);
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return null;
}

const shell = readFileSync(join(DIST, 'index.html'), 'utf8');

// Strip the site-wide tags we are about to replace, so nothing is declared twice.
const STRIP = [
  /^\s*<title>[\s\S]*?<\/title>\s*$/gim,
  /^\s*<meta\s+property="og:(?:title|description|type|url|image|image:width|image:height)"[^>]*>\s*$/gim,
  /^\s*<meta\s+name="twitter:(?:card|title|description|image)"[^>]*>\s*$/gim,
  /^\s*<link\s+rel="canonical"[^>]*>\s*$/gim,
];

let written = 0;
for (const post of readPosts()) {
  const url = `${SITE}/blog/${post.slug}`;
  const image = fromArticle(post.file, [
    /<meta\s+property="og:image"\s+content="([^"]+)"/i,
    /<meta\s+name="twitter:image"\s+content="([^"]+)"/i,
  ]);
  const w = fromArticle(post.file, [/<meta\s+property="og:image:width"\s+content="([^"]+)"/i]);
  const h = fromArticle(post.file, [/<meta\s+property="og:image:height"\s+content="([^"]+)"/i]);
  const desc =
    fromArticle(post.file, [/<meta\s+property="og:description"\s+content="([^"]+)"/i]) || post.excerpt || '';
  const abs = image ? (image.startsWith('http') ? image : SITE + image) : null;

  const tags = [
    `<title>${esc(post.title)}</title>`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:site_name" content="Aditya" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(post.title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    // twitter:site / twitter:creator stay as declared once in the site shell.
    `<meta name="twitter:title" content="${esc(post.title)}" />`,
    `<meta name="twitter:description" content="${esc(desc)}" />`,
  ];
  if (abs) {
    // Only claim a large image card when there actually is an image to show.
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    tags.push(`<meta property="og:image" content="${esc(abs)}" />`);
    tags.push(`<meta property="og:image:alt" content="${esc(post.title)}" />`);
    tags.push(`<meta name="twitter:image" content="${esc(abs)}" />`);
    if (w) tags.push(`<meta property="og:image:width" content="${esc(w)}" />`);
    if (h) tags.push(`<meta property="og:image:height" content="${esc(h)}" />`);
  } else {
    tags.push(`<meta name="twitter:card" content="summary" />`);
  }

  let html = shell;
  for (const re of STRIP) html = html.replace(re, '');
  html = html.replace(/<\/head>/i, `  ${tags.join('\n    ')}\n  </head>`);

  const dir = join(DIST, 'blog', post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  written++;
  console.log(`  og  /blog/${post.slug}${abs ? '' : '  (no image, summary card)'}`);
}

console.log(`prerender-og: wrote ${written} post shells`);

/**
 * Guard: /blog/<slug> only reaches the shell above because vercel.json rewrites it there
 * explicitly. Vercel reads vercel.json from the repo, not from build output, so it cannot
 * be generated here. Fail loudly rather than silently shipping a post whose shared link
 * would fall through to the generic site card.
 */
const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
const routed = new Set((vercel.rewrites || []).map((r) => r.source));
const missing = readPosts()
  .map((p) => `/blog/${p.slug}`)
  .filter((s) => !routed.has(s));

if (missing.length) {
  console.error(
    `\nprerender-og: vercel.json is missing rewrites for ${missing.length} post(s):\n` +
      missing.map((s) => `  { "source": "${s}", "destination": "${s}/index.html" },`).join('\n') +
      `\n\nAdd them ABOVE the catch-all rewrite in vercel.json, or link previews for these ` +
      `posts will fall back to the generic site card.\n`
  );
  process.exit(1);
}
console.log('prerender-og: all posts have an explicit vercel.json rewrite');
