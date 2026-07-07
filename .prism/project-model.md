# Project Model — aditya-portfolio

_Last updated: 2026-07-08 by `prism-understand` (map for minimal-researcher restructure)_

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
- **0.15 UPGRADE (2026-07-02, `prism-feedback`)**: kohaku article's TS snippets now target
  `@miden-sdk/miden-sdk` **0.15.4** (published 2026-07-02), grounded by extracting the ACTUAL npm
  tarball into scratchpad and reading the shipped `.d.ts` + `index.js` exports (strongest method —
  reuse it: `npm pack @miden-sdk/miden-sdk && tar -xzf` → `dist/st/api-types.d.ts` high-level,
  `dist/st/crates/miden_client_web.d.ts` WASM layer). The 0.12 surface above is HISTORICAL — do not
  use it for new writing. **VERIFIED 0.15.4 surface** (2 independent cross-tier skeptics, all PASS):
  high-level `MidenClient.create({rpcUrl, noteTransportUrl, proverUrl, seed, keystore, autoSync})` /
  `createTestnet()`; `client.accounts.create({storage:"private"|"public", auth:"falcon"|"ecdsa"})` →
  `Promise<Account>`; `client.transactions.send({account, to, token, amount, type:"private",
  returnNote:true})` → `{txId, note, result}`; `client.accounts.getBalance(acct, token)` →
  `Promise<bigint>`; `client.notes.sendPrivate({note, to})` / `fetchPrivate()`; `client.sync()`
  (NTL fetch then chain sync) / `syncChain()` / `syncNoteTransport()`; `client.tags.add/remove/list`;
  `transactions.preview()` → `TransactionSummary` (accountDelta + input/output notes);
  `client.compile.noteScript({code, libraries})`. WASM layer (root-exported): `AuthSecretKey.
  rpoFalconWithRNG(seed)` → `.publicKey().toCommitment(): Word`; `AccountComponent.
  createAuthComponentFromCommitment(word, 2)` — wasm enum AuthRpoFalcon512=2, AuthEcdsaK256Keccak=1
  (numeric enum NOT root-exported; root `AuthScheme` = string const {Falcon:"falcon",ECDSA:"ecdsa"});
  `NoteType.Private=0, Public=1` (CHANGED from 0.12's Private=2!); `TransactionProver.newLocalProver/
  newRemoteProver(url, timeoutMs?)/newCallbackProver`; NATIVE MULTISIG: `new
  AuthFalcon512RpoMultisigConfig(approvers: Word[], threshold)` + `createAuthFalcon512RpoMultisig()`.
  **IRONY GUARD**: calls flagged FABRICATED for 0.12 (`client.transactions.send({...})`,
  `client.accounts.getBalance`, `AuthScheme`, `getPublicKeyAsWord`) are REAL in 0.15 — do not
  "fix" them backwards. `@demox-labs/miden-sdk` is dead at 0.12.5. Also confirmed in 0.15 d.ts:
  attachments returned over RPC for private notes too (backs the article's metadata claim).
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

## Restructure target — minimal researcher layout (mapped 2026-07-08, `prism-understand`)
Goal: restyle the home page to a single-column, monochrome, text-first "researcher" layout
(reference: Dhruv Agarwal `@0xdhruv`). Bones already fit — shared section shell is
`py-24 px-6 lg:px-8` + `mx-auto max-w-[860px]` (single column), tokens are monochrome Satoshi
(`src/index.css:8-89`). Gaps are STRUCTURAL (3 reference blocks have no backing data):
- **Header** (`src/components/Header.tsx`) is a text wordmark only — reference needs avatar +
  name + `@handle` + role subtitle, underlined inline nav, social-icon row top-right.
- **Intro** — merge `Hero.tsx` (decorative: gradient blobs `Hero.tsx:7-10`, status pill, CTAs) +
  `About.tsx` (paragraphs `About.tsx:35-62`, hardcoded, no `@/data` import) → plain bio paragraphs.
  Bio should move to data as `bio: string[]`.
- **Publications** — DOES NOT EXIST. Add `Publication { title; date; link }` + `publications[]`.
- **Experience** — DOES NOT EXIST as structured data. `selectedWork` (`content.ts:130`, shape
  `{title,description,link,website?,websiteLabel?}`) is the nearest but has NO company/role/
  dateRange/bullets. Add `Experience { role; company; dateRange; bullets: string[]; links? }` +
  `experience[]`. **User must supply real work history** (not in repo — flagged).
- **Posts** — `blogPosts` (`src/data/blog.ts:150`, ISO `date`, sorted newest-first) maps directly;
  render dated list + `more »` → `/blog`.
Social links currently flat keys on `siteConfig` (`content.ts:1`: twitter/github/linkedin/
substack/telegram/email) — reference wants an icon row, may want a `socialLinks[]` array.
Proposed `Index.tsx` order: Header → Intro → Publications → Experience → Posts → Footer. Drop
from mount: TrustStrip, Testimonials, Highlights, ContentSection, `.noise-overlay` (optional),
Hero decoration. Reusable as-is: `Projects.tsx` grid (fits an "oss and projects" tab), Footer,
860px shell, tokens, `AnimatedSection`.

## Decision log
- 2026-07-08 — MULTI-PAGE SPLIT + em-dash purge (uncommitted, follow-up to the reskin). Nav tabs now
  ROUTE to dedicated pages instead of on-page anchors: `navLinks` = experiments→/experiments,
  experience→/experience, writing→/writing, posts→/blog (`content.ts`). NEW shared `PageShell.tsx`
  (720px column + ProfileHeader + footer) used by every page. `ProfileHeader` nav now uses react-router
  `<Link>` for internal hrefs with active-tab underline via `useLocation`; avatar + name link to `/`.
  NEW pages: `pages/ExperiencePage.tsx`, `pages/ExperimentsPage.tsx`, `pages/WritingPage.tsx` (routes
  added in `App.tsx` + a `ScrollToTop` on pathname change). NEW `components/Writing.tsx` renders ALL
  `contentItems` grouped Writing/Videos/Talks & Workshops/Events (completeness). Home (`Index.tsx`) =
  Intro + Publications(moreHref=/writing) + Posts(recent 6, more→/blog). `Blog.tsx` restyled to
  PageShell + minimal dated list (heading "Posts"), old sticky-header/excerpt layout removed.
  ProjectsList heading "Projects"→"Experiments". Experience roles relabeled Founder→**Builder** for
  Monaris/Cusp/PolyBaskets (per owner) + expanded to 5 entries with more detail; dates still PLACEHOLDER.
  EM-DASHES removed from all generated content (Intro, experience, publications) + the one visible blog
  title (`PolyBaskets — ` → `: `); blog.ts excerpts still hold em-dashes but are no longer rendered.
  tsc clean, build green, verified via Playwright on /, /experience, /experiments, /writing, /blog.
- 2026-07-08 — MINIMAL RESEARCHER RESKIN shipped (uncommitted, `prism-understand`→build). Home page
  rebuilt to a single 720px column matching the Dhruv Agarwal reference. NEW components (plain blocks,
  no full-width shell): `ProfileHeader.tsx` (avatar+name+`@handle`+role, nav tabs `#projects/#experience/
  #posts`, social icons + theme toggle), `Intro.tsx` (bio paragraphs), `Publications.tsx`, `Experience.tsx`,
  `ProjectsList.tsx` (minimal list, replaces the card grid — data still `projects[]`), `Posts.tsx`
  (recent 6 from `blogPosts` + `more »` → /blog). `Index.tsx` rewritten to compose them; dropped
  `.noise-overlay` + fixed `Header`. `AnimatedSection.tsx` gained an `id?` prop for anchor targets.
  NEW data in `content.ts`: `siteConfig.{handle,role,avatar}`, `publications[]` (curated featured
  writing), `experience[]` (ExperienceEntry, 4 roles derived from selectedWork + About — **date ranges
  are PLACEHOLDERS, user to correct**); `navLinks` retrimmed to 3 anchor tabs. Accent = indigo-600/
  indigo-400 for links (only color in the monochrome layout). tsc clean, `npm run build` green,
  verified via Playwright light+dark full-page screenshots (all sections + Peal card render).
  NOW-UNUSED (left in repo, prune later): Hero, About, TrustStrip, Testimonials, Highlights,
  SelectedWork, ContentSection, Contact, Footer, Projects, Header.
- 2026-07-08 — Peal Network added to `projects` (`content.ts`) + new optional `protocol?` field on
  `Project` interface, rendered in `Projects.tsx` (github · website · protocol links). Pushed to
  `origin/blog/peal-protocol` (commit 48927dd).
- 2026-07-03 — De-hedge round 3 (owner-directed sweep): removed "(a privacy tradeoff, not
  invisibility)" from the §1 provider table row AND its sibling §8.1 heading kw (now "pull-only,
  tag-based sync"); cut "Here is the part that matters:" throat-clearer (§2); renamed scope
  callout to declarative "Scope: the local transaction path" and trimmed its tail; CUT the
  end-of-§2 thesis-restatement callout entirely (said better at §2 start); "largely vanishes" →
  "vanishes" in §4.1 (the delegated-proving exception sentence keeps it honest); dropped ", not
  an afterthought" tail in §10.2. KEPT: §5.1 "design pattern rather than a shipped standard"
  (accuracy guard), §1 "mostly already there" (true — provider/transport still need building),
  remaining ", not X" contrasts that do real work. Tag balance verified post-edit.
- 2026-07-03 — OWNER de-hedge round 2 on kohaku article: removed "One honest nuance" callout
  (anonymity-set network effect), Guardian "trust boundary" sentence, §8.1 "node-trust and
  transport choices" sentence, "endpoint still sees your requests" clause, and §10.3 "note
  transport is its own trust boundary" sentence. KEPT (substance, owner may still overrule):
  §2 local-vs-network scope callout, attachments-visibility line, remote-prover-sees-inputs
  point in §10.4. Do not re-add the removed trust hedges in future passes.
- 2026-07-02 — `prism-feedback` 0.15 upgrade APPLIED to kohaku-for-miden.html: all 5 Miden TS
  blocks + §9 facade rewritten to verified `@miden-sdk/miden-sdk` 0.15.4 API (tabs relabeled
  "miden-sdk 0.15 · ts"); the compressed version-note paragraph DELETED (nothing left to
  disclaim); §6.1 prose now "Falcon-512 (RpoFalcon512 in the SDK's symbols)"; §7 comment-only
  block replaced with REAL native multisig code (AuthFalcon512RpoMultisigConfig + external
  keystore); §10.3 delivery bullet now cites noteTransportUrl + notes.sendPrivate/fetchPrivate;
  §9 intro notes MidenClient already speaks the one-call shape so the plugin layer's job is the
  privacy opinioning. 2 cross-tier skeptics: zero FAILs, 1 WARN (sync() comment) fixed. Not
  committed — awaiting owner.
- 2026-07-02 — `prism-understand` on Kohaku article "remove the two hedge blocks" proposal.
  VERDICT: do NOT delete either outright — both are load-bearing. (A) the line-509 version note
  is referenced by "the 0.12 SDK below" at 814 and 822; deleting orphans those and un-marks
  genuinely stale API code. (B) 10.4 "The honest limit" is cross-referenced BY NAME from the
  code comment at 546, and cutting the operator-centralization caveat would over-claim privacy
  (it was added deliberately by the 2026-07-01 grounded review). Recommended fix instead:
  COMPRESS both (A → 1 sentence, naming detail lives only in §6.1; B → 2 sentences, keep the
  heading so 546 resolves) and attack the real problem: ~22 hedge instances (10× "illustrative",
  2× "check the current docs", 2× "not stack-exact"), the thesis restated ~8× (cut the 549
  callout), two comment-only code blocks (693-701, 870-881) that should be real code or prose,
  and zero concrete numbers (proving time, tag coarseness). Independent editorial critic agreed
  on all points. No edits applied yet — awaiting owner's go.
- 2026-07-02 — OWNER OVERRIDE, applied: (B) "The honest limit" (old 10.4) REMOVED entirely per
  Aditya's explicit call ("even though it's centralized, it's not to mention it, remove it").
  The line-546 code-comment cross-reference was deleted with it (no dangling refs, verified by
  grep) and 10.5-10.7 renumbered to 10.4-10.6. Do NOT re-add the operator-centralization callout
  in future passes; the owner knows the tradeoff and chose to omit it. (A) the version note was
  COMPRESSED to one sentence (0.12 → @miden-sdk/miden-sdk pointer only); the Falcon naming story
  now lives only in §6.1 prose + code comments, which stay anchored by the "0.12 SDK" mention.

- 2026-07-01 — synced prism.html with updated OVERVIEW (Jul 1): added W7 currency+audience grounding paragraph and the four-tier evidence ladder (verified/supported/unverified/contradicted) to §4 verify. §10 shipped-status already matched.
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

## Decision log — 2026-07-04 · About-section spiral accent
- SHIPPED (uncommitted): `SpiralAccent.tsx` — Archimedean spiral (3.5 turns, 1px non-scaling stroke,
  `currentColor` at `text-foreground/10`, radial mask fading outer edge), rendered absolutely behind the
  About photo at 185% of its box, draw-in once via framer `pathLength` with house easing [0.22,1,0.36,1],
  `useReducedMotion` → static. Wired in `About.tsx` (wrapper now `relative`, img `relative z-10`).
- REJECTED: embedding the reference CloudFront hero video (third-party user-scoped asset — can 403 anytime;
  dark cinematic block clashes with light monochrome brand); section-wide spiral wash (sits under body copy);
  continuous rotation (would be the page's only looping motion, beside reading text).
- INVARIANTS (verified this run): dark mode IS live — next-themes ThemeProvider `App.tsx:16`, toggle
  `Header.tsx:60,88` → decorative strokes must use theme tokens, never hardcoded grays. Ancestor
  `AnimatedSection` animates transforms → absolute-position decorations must anchor to the inner
  non-transformed wrapper, or they slide during entrance.

### Telemetry
- divergence: 0.39 (evidence 0.55, conclusion 0.15) | threshold 0.30 UNCALIBRATED
- grounding: n/a (no eval fixtures)
- models: draft=fable · lenses=3x explore (practitioner/adversary/taste); verify panel skipped (two-way door)
- claims: dark-mode-live grounded (App.tsx:16, Header.tsx:60) · containing-block-trap grounded (AnimatedSection.tsx:5-10) · video-hotlink-fragile unverified-by-probe (rejected on ownership regardless)
- fleet: 3 lenses · token-multiple vs single-pass ≈ 3x

## Decision log — 2026-07-04 (later) · spiral v2→v7: user override
- User REJECTED the monochrome thin-line spiral ("nowhere close") — wants the literal luminous
  galaxy of the reference. Lesson: when Aditya supplies a visual reference, match its LOOK,
  not a tasteful abstraction of it.
- SHIPPED (uncommitted) v7 `SpiralAccent.tsx`: two-arm spiral + glow layers (#7fa3ff/#cfe0ff/#f2f7ff)
  + star particles w/ gold flecks (#ffc76e) on tilted squashed plane (rotate -16°, scaleY .46),
  26s orbit; dark nebula vignette div behind photo (glow needs darkness); wrap via two clipped
  copies (back=top 58%, front=bottom 42% at z-20 — complementary clips avoid double-draw mud).
  Reduced-motion guard REMOVED at user's insistence on visible motion.
- Verified via playwright screenshots + computed-transform sampling (ROTATING: true).
- FINAL: user removed the spiral/galaxy accent entirely — About section reverted to plain photo.
  Do not re-add decoration there unless explicitly asked.
