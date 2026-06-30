# Project Model — aditya-portfolio

_Last updated: 2026-06-30 by `prism-understand`/`prism-feedback` (Kohaku article fact-check + fixes)_

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
- Deployment: **production is VERCEL** (adibuilds.in — confirmed 2026-06-30 by a Vercel `bom1::`
  404 page; the earlier "Railway" note was wrong). `railway.json` + `public/serve.json` are
  vestigial (harmless, left in repo). Vercel auto-detects Vite → output `dist`, build `npm run
  build`. Deploy triggers on push to `main`.
- **SPA fallback = `vercel.json`** (root, added 2026-06-30): `rewrites` source `/((?!.*\.).*)`
  sends extensionless paths to `/index.html` (so `/blog/:slug`, `/people-say`, `/blog`, hard
  refreshes resolve) while ANY path with a dot is served from the filesystem — critical so the
  full-post iframe sources `/blog/*.html` and `/assets/*` are NOT rewritten. `cleanUrls:false`
  so `/blog/x.html` is not 308'd to `/blog/x` (would collide with the React route + break the
  iframe). Without this file, react-router deep links 404 on hard refresh (the original symptom).

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
    `kind === "full"` branch in `src/pages/BlogPost.tsx`. Current full posts (newest-first):
    `fiscus`, `mainnet-moment-gtm`, `kohaku-for-miden` (all 2026-06-30), `monaris-railgun`,
    `secrets-as-a-service`, `prism` (2026-06-29), `vara-eth-agentic-economy` (2026-06-28),
    `polybaskets-board` (2026-06-27). Dates are placeholders.
- **NEW-ARTICLE NORMALIZE WORKFLOW** (2026-06-30): articles arrive as standalone HTML in
  arbitrary skins (amber/Bricolage, Inter/Kalam, Fraunces dark-pitch, etc.). Standing rule =
  normalize EVERY new full article to the canonical blue design before publishing (user has
  chosen this every time). Mechanics that worked: delegate the conversion to a general-purpose
  subagent given (a) the source path, (b) `vara-eth-agentic-economy.html` as the canonical
  reference to copy `<head>`+`:root`+`<style>` verbatim, (c) explicit forbidden-list. Common
  source footguns to strip: `<script>` (esp. JS-rendered code stored in
  `<script type="text/plain" class="code__src">` — must be extracted to static `<pre>`),
  `@keyframes`/transitions/scroll-reveal, sticky topbars/progress bars, dark/ink dual themes,
  forbidden fonts (Newsreader/Fraunces/Inter/Kalam/Bricolage/IBM Plex). Also strip author
  notes-to-self callouts. Landing-page pitches (e.g. fiscus) get flattened from full-width
  alternating sections into the single 720px reading column. Verify with grep (0 scripts/
  keyframes/bad-fonts/dark-tokens) + a Playwright screenshot pass. mainnet-moment-gtm arrived
  ALREADY canonical (only needed one `@keyframes rise` entrance animation stripped).
- **CANONICAL ARTICLE DESIGN** (2026-06-29): all full-page articles share ONE design system,
  defined by `public/blog/vara-eth-agentic-economy.html` and now matched by `prism.html` +
  `polybaskets-board.html`. Any NEW full article must reuse the identical `<head>`+`<style>`
  block: fonts Instrument Serif (h1/h2/callout/diagram-titles) + DM Sans (body/diagram labels)
  + JetBrains Mono (tag/section-number/caption/code); tokens `--bg #FAFAF8`, `--text #1a1a1a`,
  `--accent #2563eb`, `--sketch-fill-{blue,green,amber,rose,purple,gray}`; 720px
  `.article-container`. Components: `.article-tag`, `.section-number`+`h2` (with
  `.divider-thin` between sections), `.callout`, `.glossary`, `.data-table`, `.cards`,
  `.diagram-wrapper`+`.diagram-caption`. DIAGRAMS must be clean static inline SVG on a
  `viewBox="0 0 760 H"` with `fill="var(--diagram-bg)"` bg, sketch-fill boxes + `#1a1a1a`
  strokes, line+polygon arrows, Instrument Serif titles. FORBIDDEN: rough.js, `<script>`,
  feTurbulence/feDisplacementMap, Patrick Hand / Newsreader / cursive fonts, marker highlights.
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

## Blog content accuracy (fact-check, 2026-06-30)
- **`public/blog/kohaku-for-miden.html` reviewed** (5 parallel verifiers grounding against live
  docs). Conceptual framing, thesis, and honesty are strong; Kohaku is a real EF project
  (`github.com/ethereum/kohaku`, packages `@kohaku-eth/*` exist, Helios + colibri real). Protocol
  facts mostly correct: ERC-4337 `PackedUserOperation` v0.7 exact, Privacy Pools ASP+ragequit,
  Miden nullifier formula + P2ID + RPO-Falcon512 default, 0zk 73-byte Bech32m (XOR-"railgun") all
  verified accurate. Initial rating **7/10** — dragged down by fabricated code symbols; fixed to ~9.
- **VERIFIED real `@demox-labs/miden-sdk` surface** (v0.12.5 — use these in any future Miden
  article, do NOT invent ergonomic calls): `WebClient.createClient(rpcUrl?, noteTransportUrl?,
  seed?)`, `client.syncState()`, send = `client.newSendTransactionRequest(sender, target, faucet,
  NoteType.private(), amount)` then `client.submitNewTransaction(sender, req)`,
  `client.newWallet(AccountStorageMode.private(), mutable, auth_scheme_id:number/*0=RPO-Falcon512*/,
  initSeed?: Uint8Array|null)`, `SecretKey.rpoFalconWithRNG(seed)` → `.publicKey()`,
  `AccountComponent.createAuthComponentFromCommitment(word, id)`, balance =
  `account.vault().getBalance(faucetId)` (AssetVault), prover =
  `TransactionProver.newRemoteProver(url)`/`newLocalProver()`. FABRICATED (never use):
  `client.transactions.send({…noteType:"private"})`, `client.accounts.getBalance`,
  `AuthScheme.AuthRpoFalcon512`, `getPublicKeyAsWord`, `getTransactionSummary`,
  `submitWithSignatures`, `new RemoteTransactionProver`. MASM: `exec.tx::get_output_notes_info`
  does NOT exist (no single "total out" call — iterate output notes); `exec.account::incr_nonce`
  and the `export.auth__<name>` convention ARE real.
- **LESSON for blog work**: SDK/protocol code in articles must be grounded against live docs, not
  recalled — Miden's TS API moves fast. Label any proposed/aspirational facade code "illustrative."
- **Round 2 (`prism-feedback`, 2026-06-30, cross-TIER skeptics)** caught defects the first pass and
  even my OWN round-1 fixes missed — lesson: a "real API" fix can still be wrong; re-verify against
  the actual `.d.ts`/source. Additional verified facts (use these): `NoteType` is an ENUM
  (`NoteType.Private = 2`), NOT `NoteType.private()`; `PublicKey.toCommitment(): Word` (not
  `toWord`/`getPublicKeyAsWord`); `submitNewTransaction(accountId, req)` is **2-arg, no prover** —
  custom proving is `executeTransaction(id, req)` → `proveTransaction(result, prover?)` →
  `submitProvenTransaction(proven, result)`; `newSendTransactionRequest`/`submitNewTransaction` take
  an **AccountId** (`account.id()`), not the `Account` object; `getAccount(): Account|undefined`
  (null-guard needed). **MASM is illustrative-only, NOT stack-exact**: Miden account IDs are TWO
  felts → compare via `account_id::is_equal`, not a single `mem_load`+`assert_eq` (the old P2ID made
  the recipient check a no-op); a `push.CAP lte assert` with no value on the stack underflows;
  `incr_nonce` must run FIRST (before delta-commitment). Nullifier field order is right but the 3rd
  field is now `storage_commitment` (inputs→storage rename) and `next` adds metadata+attachments
  (6 fields). DECISION: MASM blocks relabeled "illustrative/simplified — not stack-exact" rather
  than chasing exact assembly on the fast-moving `next` branch.

## Decision log
- 2026-07-01 — `prism-feedback` on Kohaku reviewer notes (10 pts, grounded vs live Miden source). FIXED: note model (NoteInputs→NoteStorage since v0.14, metadata is always public, nullifier formula updated), softened absolutes (disappears/nothing-to-deploy/no-relayer/privacy-primitives), Guardian trust-boundary nuance, builder-focused conclusion, and a version note (code targets demox 0.12; official SDK now @miden-sdk/miden-sdk 0.15+). REJECTED reviewer pt 3: "0=RPO-Falcon512" is CORRECT for the demox TS newWallet (0=Falcon,1=ECDSA, verified v0.12-0.15); the reviewer conflated it with the Rust protocol enum (Falcon=2). Do NOT change 0→2 (would throw). Pt 1 "broken citations" = reviewer tool stripped our anchor text; links are well-formed (and user-requested).
- 2026-06-30 — `prism.html`: corrected production-readiness para (docs/02 status flipped guard v2 / version check / write protocol / evidence ladder / checkpoint-resume from PLANNED to SHIPPED; open item = live large-repo validation) and added a "best way to use it" paragraph (lean for design, full fleet for defect-finding, read the divergence line).
- 2026-06-30 — `prism-plan` (sync): added the 8 core-philosophy principles (OVERVIEW §3) as a list at the end of §2; verified all other source features already present (eleven commands, repo map, craft floor, production-readiness). No new section.
- 2026-06-30 — `prism-plan` (sync content): updated `prism.html` to the latest Prism (grounded in
  `prism-claude-code/` OVERVIEW + command specs + docs/01-three-improvements). Added 2 commands
  (`/prism-write`, `/prism-ship`) → "nine" became "eleven"; added two §4 paragraphs (Repo Map for
  large codebases: structure-only cache, sizing gate, OID staleness, depth-not-inclusion ranking;
  Craft Floor for greenfield code, subordinate to conform-first, no new gate). Eval numbers + engine
  + hooks unchanged (verified against EVAL-REPORT.md: 5-3-4, 0.42, ~4.6×). Folded, no new section.
- 2026-06-30 — `prism-plan` (writing voice, MODERATE chosen): refined `prism.html` to the house
  voice. 3-editor deliberation (structure/AI-tells/voice). Applied: §2 failure cascade de-monotoned,
  cut throat-clearing + 2 restatements, 5 bold lead-ins → " - ", Jaccard in plain words, skeptic
  panel why-before-what, title em-dash → colon. Structure: folded §7 "proof harness" into the eval
  section, compressed the redundant §8 "full run", 12 → 11 sections (renumbered). Held the
  aggressive eval-first reorder. Plan: ~/.claude/plans/shiny-strolling-sphinx.md. Divergence 0.31.
- 2026-06-29 — Blog implemented (this session). Format chosen: content-only HTML rendered
  inside the React shell (not raw `public/` files), auto-discovered via glob; auto-publish on
  Railway via committed `railway.json`. No `docs/NN-*.md` written.
- 2026-06-30 — `prism-plan` (writing voice): Tier 1 voice pass applied to `kohaku-for-miden.html`
  — killed banned phrases ("the deep reframe", 6× "maps to →" → "on Miden →" + varied prose),
  cut throat-clearing/meta-frames, broke run-ons, dropped vague qualifiers. Tier 2 (structural
  cut/reorder: merge §1, demote Tornado §4, trim §10, possible payoff-first reorder) HELD pending
  owner's call on Q1 (reference vs manifesto) — recommendation was "reference → moderate, keep
  verified technical depth, don't gut §3/§6". Open: is this the house voice for all articles?
- 2026-06-30 — Kohaku article fact-checked + corrected (7 fixes: real Miden TS API, MASM
  spend-cap, Railgun 4-key model spending/viewing/nullifying/master, PPOI→"Private Proofs of
  Innocence" attributed to Railgun, commitment operand order, note-tag sync nuance, Tornado
  `_refund`). Same SDK-grounding pass should run on `fiscus.html` (also has Miden TS/MASM).

## Lessons
- **Run an AUDIENCE/EXPERT lens on outward-facing content, not just correctness.** The Kohaku
  fact-check + feedback passes optimized for "is it true / will the code compile" and missed
  overclaims a Miden insider would flag (absolutes like "nothing to deploy"/"privacy already
  there", missing "metadata is public", no SDK version note). The user had to supply that lens.
  For any article meant to be shared with a domain expert, explicitly run: "how would an engineer
  from THIS ecosystem read this?" alongside the correctness pass.
- **Verify SDK/source CURRENCY, not just existence.** I grounded the Miden TS API against
  `@demox-labs/miden-sdk@0.12.5` and treated it as authoritative, never checking it had been
  superseded by the official `@miden-sdk/miden-sdk` (0.15+). Grounding is only as good as the
  source you pick — always confirm a package is the latest/canonical one (npm last-published +
  official docs), then add a version note when code is version-sensitive.
- **Apply known staleness immediately; don't grade it "low" and defer.** Pass 1 DID flag the
  Miden `NoteInputs → NoteStorage` rename (v0.14) but I only fixed the commitment operand order
  and left the prose saying "inputs". Surfaced-but-unapplied = the user finds it later. If a
  verifier flags drift, fix the user-visible text in the same pass.
- **Two ID spaces can collide and look like a bug.** Miden demox-SDK `newWallet` auth id
  (0=RPO-Falcon512, 1=ECDSA) vs the Rust protocol enum (`Falcon512Poseidon2`=2, ECDSA=1) are
  DIFFERENT spaces; ECDSA=1 in both invites a wrong "fix". Don't change `0→2`. (verified
  miden-client v0.12.5–v0.15.2 web-client new_account.rs.)
