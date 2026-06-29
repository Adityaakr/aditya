# Project Model — aditya-portfolio

_Last updated: 2026-06-29 by `prism-understand` (blog section investigation)_

A personal portfolio site. Vite + React 18 + TypeScript + Tailwind + shadcn/ui, client-routed
with react-router-dom. Single-page app, statically built, deployed from GitHub
(`github.com/Adityaakr/aditya`).

## Architecture
- **Entry**: `index.html` (root) → `src/main.tsx:5` mounts `<App/>` into `#root`.
- **App shell / routing**: `src/App.tsx:13-29` — `BrowserRouter` with `ThemeProvider` (next-themes,
  default light), react-query, tooltip + two toasters. Routes: `/` → `Index`, `/people-say` →
  `PeopleSay`, `*` → `NotFound` (`src/App.tsx:20-23`).
- **Home page**: `src/pages/Index.tsx` assembles section components (Hero, About, Projects,
  SelectedWork, ContentSection, Testimonials, Contact, Header, Footer, etc.).
- **Secondary page template**: `src/pages/PeopleSay.tsx` — the canonical pattern for any non-home
  page: `noise-overlay min-h-screen bg-background` root, own sticky header (`max-w-[1000px]`,
  `h-14`, `backdrop-blur-xl bg-background/80 border-b border-border/40`), `<main>` with
  `py-16 md:py-24 px-6 lg:px-8`, motion entrance, internal footer link back to `/`.
- **Content data**: `src/data/content.ts` (~541 lines) centralizes everything — `siteConfig`
  (1-14), `navLinks` (16-21), `testimonials`, `selectedWork`, `projects`, and `contentItems`
  (277-527, typed `ContentItem { title, type, date, link, featured?, summary? }`).
- **Animation**: `src/components/AnimatedSection.tsx` exports `sectionVariants`,
  `staggerContainer`, `staggerItem`; `whileInView` + `viewport={{ once: true }}`.

## Invariants
- Routing is **client-side `BrowserRouter`** (`src/App.tsx`); any unmatched path renders
  `NotFound`. Deep links to app routes need an SPA fallback from the host.
- Files in `public/` are copied **as-is** to `dist/` root by Vite (no base path set in
  `vite.config.ts` — base defaults to `/`). So `public/x.html` is served at `/x.html` raw,
  bypassing React. Confirmed: `vite.config.ts` has no `base`.
- `dist/` is **gitignored** (`.gitignore:11`) and not committed — builds are regenerated.
- Header navigation uses plain `<a href>` anchors driven by `navLinks` in `content.ts`, NOT
  react-router `<Link>` (`src/components/Header.tsx:41-49`). Internal route links would need a
  `<Link>` (or accept a full reload via `<a href="/blog">`).
- `@tailwindcss/typography` is a dependency (`package.json:70`) but is **NOT registered** in
  `tailwind.config.ts:94` (plugins = `[tailwindcss-animate]` only). `prose` classes are inert
  until the plugin is added there.

## Conventions
- **Design tokens**: `src/index.css:8-50` (light) / `52-89` (dark). Near-white bg
  (`--background: 0 0% 99%`), near-black fg (`220 14% 10%`), grays for muted, `--radius: 0.5rem`.
  Font is **Satoshi** (heading + body) via fontshare; tight tracking (`-0.025em` headings).
  Custom `noise-overlay` grain (`src/index.css:125-149`).
- **Container widths**: home/header use `max-w-[860px]`; secondary pages (PeopleSay) use
  `max-w-[1000px]`.
- **Typography scale** (observed): section label = `text-[11px] tracking-widest uppercase
  text-muted-foreground/50`; card title h3 = `text-[15px] font-semibold`; body =
  `text-[14px] text-muted-foreground leading-relaxed`; date/meta = `text-[12px]
  text-muted-foreground/50`.
- All content lives in `src/data/content.ts` as typed exported arrays; pages map over them.
- Path alias `@` → `./src` (`vite.config.ts`).

## Danger zones
- `BrowserRouter` + raw `public/*.html`: a raw HTML file in `public/blog/` is reachable only by
  hard URL (`/blog/foo.html`); any in-app `<Link>`/anchor that react-router intercepts will 404
  to `NotFound`. Mixing the two route spaces is the main footgun for the blog feature.
- Deployment: hosted on **Railway** (per owner, 2026-06-29). No Railway/Nixpacks/Docker config
  is tracked (`git ls-files` shows none), so it relies on Nixpacks auto-detection with **no
  explicit SPA fallback**. No `start` script, no static-server dep (`package.json:6-14`).
  CONSEQUENCE: react-router deep links (`/people-say`, future `/blog/:slug`) and hard refreshes
  will 404 unless a server with an index.html fallback is added (e.g. `serve -s dist -l $PORT`
  or Caddy via `nixpacks.toml`). A rebuild/redeploy is always required for any content change
  (static Vite build).

## Blog section (built 2026-06-29)
- **Engine**: `src/data/blog.ts` — `import.meta.glob('/src/content/blog/*.html', {query:'?raw',
  eager:true})` auto-discovers articles at build time. Filename = slug. Parses a leading
  `<!-- title: / date: / excerpt: -->` comment; rest of file is the article body. Sorted
  newest-first by ISO date. Exports `blogPosts`, `getPost(slug)`, `formatDate`.
- **Two post kinds** (`BlogPost.kind` in `src/data/blog.ts`):
  - `fragment` — content-only HTML in `src/content/blog/*.html`, auto-discovered via glob,
    rendered inside the `prose` container. (Demo `welcome.html` was removed once real posts
    were added.)
  - `full` — complete standalone `<html>` documents in `public/blog/*.html`, listed via the
    hand-maintained `fullPosts[]` array in `blog.ts`. Shown EXACTLY as authored inside an
    `<iframe>` (full-bleed, with a thin sticky back bar) at `/blog/:slug` — see the
    `kind === "full"` branch in `src/pages/BlogPost.tsx`. Current full posts: `prism`,
    `vara-eth-agentic-economy`, `polybaskets-board` (placeholder dates 2026-06-27..29).
- **CRITICAL serving rule** (`public/serve.json`, copied to `dist/serve.json`): `cleanUrls:
  false` is REQUIRED. By default `serve` 301-redirects `/blog/x.html` → `/blog/x`, which would
  collide with the React `/blog/:slug` route and break the iframe source (infinite/empty load).
  With cleanUrls off: `/blog/x.html` serves the raw file (iframe target) and `/blog/x` falls
  back to index.html (React reader). Verified both serve correct content. Adding more full
  posts = drop file in `public/blog/`, add a `fullPosts` entry; no serve.json change needed.
- **Pages**: `src/pages/Blog.tsx` (`/blog` list, `max-w-[760px]`) and `src/pages/BlogPost.tsx`
  (`/blog/:slug`, `max-w-[680px]`, renders body via `dangerouslySetInnerHTML` inside a `prose`
  container; scrolls to top on slug change). Both reuse the PeopleSay shell pattern.
- **Routes**: `src/App.tsx:23-24` (`/blog`, `/blog/:slug`).
- **Nav**: "blog" added to `navLinks` (`content.ts:19`); `Header.tsx` now renders react-router
  `<Link>` for any href starting with `/` (else `<a>` for hash anchors) — desktop + mobile.
- **Prose**: `@tailwindcss/typography` registered at `tailwind.config.ts:94`. CSS bundle grew
  ~94kB as a result. Article styles tuned in BlogPost.tsx via `prose-*` modifiers to match
  muted-foreground body + foreground headings.
- **Railway serving**: added `serve` dep + `start` script `serve -s dist -l
  tcp://0.0.0.0:${PORT:-3000}` (`package.json`) and `railway.json` (NIXPACKS, build=`npm run
  build`, start=`npm run start`). The `-s` flag gives the index.html SPA fallback, so
  `/blog/:slug` deep links and refreshes return 200 (also fixes `/people-say` refresh).
  Verified locally: `/`, `/blog`, `/blog/welcome` all 200.

## Decision log
- 2026-06-29 — Blog implemented (this session). Format chosen: content-only HTML rendered
  inside the React shell (not raw `public/` files), auto-discovered via glob; auto-publish on
  Railway via committed `railway.json`. No `docs/NN-*.md` written.

## Lessons
_(reserved for prism-retro)_
