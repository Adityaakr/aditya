export const siteConfig = {
  name: "Aditya",
  handle: "@adityakrx",
  role: "I build and explain programmable money",
  avatar: "/aditya.png",
  title: "Aditya - Builder, Operator, DevRel",
  description: "i build products, developer ecosystems, and internet-native finance ideas.",
  email: "hello@aditya.dev",
  twitter: "https://x.com/adityakrx",
  github: "https://github.com/Adityaakr",
  linkedin: "https://linkedin.com/in/adityaa-kr",
  calLink: "https://cal.com/adityakrx",
  resumeLink: "https://linkedin.com/in/adityaa-kr",
  substack: "https://adityakrx.substack.com",
  telegram: "https://t.me/Adityaakrx",
  varaWiki: "https://wiki.vara.network",
};

// Inline nav tabs shown under the profile header (each routes to its own page).
export const navLinks = [
  { label: "experiments", href: "/experiments" },
  { label: "experience", href: "/experience" },
  { label: "content", href: "/content" },
  { label: "posts", href: "/blog" },
];

export interface TrustLogo {
  name: string;
  href: string;
}

export const trustLogos: TrustLogo[] = [
  { name: "vara network", href: "https://vara.network" },
  { name: "gear foundation", href: "https://gear-tech.io" },
  { name: "arbitrum", href: "https://arbitrum.io" },
  { name: "stellar", href: "https://stellar.org" },
  { name: "avalanche", href: "https://avax.network" },
  { name: "hedera", href: "https://hedera.com" },
  { name: "solana", href: "https://solana.com" },
];

export const stats = [
  { value: "574", label: "Active Live Agents" },
  { value: "4.8M+", label: "Transactions" },
  { value: "23,395", label: "Bets" },
  { value: "52,872", label: "Baskets" },
  { value: "4,096", label: "Claims" },
];

export const statsLink = "https://app.polybaskets.xyz/stats";

export const testimonials = [
  {
    quote: "Vara's most loved KOL. Awesome video!",
    name: "Vara Network",
    handle: "@VaraNetwork",
    platform: "x" as const,
    image: "/testimonials/vara.png",
  },
  {
    quote: "True Passionate DevRel",
    name: "Satyam Singhal",
    handle: "Agentic AI×Web3 Researcher",
    platform: "linkedin" as const,
    image: "/testimonials/satyam.png",
  },
  {
    quote: "Great explainer video, thank you Adityaa!",
    name: "Dion Cornett",
    handle: "Advisor, Investor, Mentor",
    platform: "linkedin" as const,
    image: "/testimonials/dion.png",
  },
  {
    quote: "goat 🐐",
    name: "Pandit",
    handle: "@panditdhamdhere",
    platform: "x" as const,
    image: "/testimonials/pandit.png",
  },
  {
    quote: "Awesome content Aditya 🫡",
    name: "Harpreet Singh",
    handle: "@HAPPYS1NGH",
    platform: "x" as const,
    image: "/testimonials/harpreet.png",
  },
  {
    quote: "This is all you need to know to create your project on Vara Network",
    name: "Luis | Vara.eth",
    handle: "@luisreve85",
    platform: "x" as const,
    image: "/testimonials/luis.png",
  },
  {
    quote: "Building something Cool on this! with @antigravity and @claudeai and @VaraNetwork skills! LFGGG",
    name: "Mannu.web3",
    handle: "@callmeveizir",
    platform: "x" as const,
    image: "/testimonials/mannu.png",
  },
  {
    quote: "coooooking",
    name: "Kanishk.hl",
    handle: "@kanishkkhurana",
    platform: "x" as const,
    image: "/testimonials/kanishk.png",
  },
  {
    quote: "legend, content arc dropping soon??",
    name: "Akshit | Epoch Protocol",
    handle: "@OstrichBoy",
    platform: "x" as const,
    image: "/testimonials/akshit.png",
  },
  {
    quote: "This is amazing Aditya. Love to see this quality content from you",
    name: "Nishant | Citrea",
    handle: "@nishant_zk",
    platform: "x" as const,
    image: "/testimonials/nishant.png",
  },
  {
    quote: "Amazing video brother",
    name: "ayman",
    handle: "@ayman_web3",
    platform: "x" as const,
    image: "/testimonials/ayman.png",
  },
];

export const selectedWork = [
  {
    title: "monaris private - private by default",
    description: "one click. zero gas. no new wallet. no friction. pay privately, receive privately, and build cashflow privately. just money that moves the way it should. 🔒",
    link: "https://x.com/monaris_fi/status/2030575693864882617?s=20",
  },
  {
    title: "cusp - documentation & whitepaper",
    description: "the capital markets layer for prediction markets - risk, credit, settlement, and liquidation infrastructure for event-driven positions. read the docs and whitepaper.",
    link: "https://docs.cusp.fi",
    website: "https://drive.google.com/file/d/1FrhRtRtgE8hl8EqvbibSXJ_LHzzDWwsx/view",
    websiteLabel: "whitepaper",
  },
  {
    title: "vara network documentation & developer education",
    description: "creating interactive learning paths, sails tutorials, and comprehensive docs that onboard developers to vara and gear protocol.",
    link: "https://wiki.vara.network",
  },
  {
    title: "vara skills - ai agents that build dApps autonomously",
    description: "built the agent skill pack that lets AI code, test, ship, and deploy complete dApps on vara in real time. 40min+ demo video.",
    link: "https://vara.network/agentic-development",
    website: "https://vara.network/agentic-development",
  },
  {
    title: "polybaskets - index fund for agentic predictions",
    description: "deploy your agent, win every day. launch an AI agent that claims free CHIP tokens daily, bets on prediction market baskets autonomously, and climbs the leaderboard. top agent wins 100,000 VARA every day.",
    link: "https://polybaskets.xyz",
    website: "https://polybaskets.xyz",
  },
  {
    title: "ecosystem growth - featured in messari state of vara report",
    description: "led growwstreams growth & builder expansion; india/APAC ecosystem highlighted in messari's Q4 2025 vara report.",
    link: "https://messari.io/report/state-of-vara-q4-2025",
  },
  {
    title: "vara builders office hours & community",
    description: "hosting regular office hours, ecosystem showcases, and builder-facing sessions with protocol leadership.",
    link: "https://x.com/adityakrx/status/2030259503980294640",
  },
  {
    title: "technical content, demos, and workshops",
    description: "25+ hands-on sessions, bridge launches, goat sdk integrations, and deep-dive content bridging protocol concepts with real code.",
    link: "https://x.com/VaraNetwork_IN/status/1950801019127861715?s=20",
  },
  {
    title: "experimental product and protocol research",
    description: "exploring ideas at the intersection of DeFi, prediction markets, AI agents, and distribution.",
    link: "https://github.com/Adityaakr",
  },
];

// Long-form writing worth surfacing at the top (curated from contentItems).
export interface Publication {
  title: string;
  date: string; // display string, e.g. "Jun 2026"
  link: string;
}

export const publications: Publication[] = [
  {
    title: "A secret that opens itself",
    date: "Jun 2026",
    link: "https://x.com/adityakrx/status/2071593948423115043",
  },
  {
    title: "The Six Products the Agentic Economy Needs on Ethereum",
    date: "Apr 2026",
    link: "https://x.com/adityakrx/status/2046818743612031223",
  },
  {
    title: "Where does the yield actually come from? State of onchain yield",
    date: "Apr 2026",
    link: "https://x.com/adityakrx/status/2037844194333794377",
  },
  {
    title: "The hidden courtroom inside prediction markets: who decides the truth?",
    date: "Mar 2026",
    link: "https://x.com/adityakrx/status/2022529296062124404",
  },
  {
    title: "Where do builders go in 2025? High performance apps on ETH L1",
    date: "Mar 2026",
    link: "https://x.com/adityakrx/status/2036059896043741630",
  },
];

// Work history. NOTE: date ranges are placeholders derived from selectedWork,
// correct them to your real timeline.
export interface ExperienceEntry {
  role: string;
  company: string;
  dateRange?: string;
  bullets: string[];
  links?: { label: string; href: string }[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Developer Relations & Ecosystem Growth",
    company: "Vara Network · Gear Foundation",
    dateRange: "2024 - Present",
    bullets: [
      "Lead developer relations and ecosystem growth for Vara Network and Gear Foundation end to end, owning the full builder journey from first touch to production: adoption strategy, technical education, documentation, developer tooling, and hands-on support.",
      "Showcased Vara's agentic development stack to builders, using Vara Skills to ship a complete dApp live in about 40 minutes and prove how fast the build loop can be; also built a Vara MCP server that speeds up AI-assisted development in Cursor by 40 to 100x.",
      "Ran the Vara Agents hackathon (agents.vara.network), onboarding builders to ship autonomous agents that each deploy a Sails program, register, coordinate with other agents, post identity updates, and earn from real on-chain interactions.",
      "Authored the Sails tutorial series, interactive learning paths, and core developer documentation on the Vara wiki, building the primary onboarding path that takes a new builder from zero to a deployed Gear program.",
      "Produced explainer and educational content that grew Vara's developer mindshare, from a getting-started walkthrough that reaches a deployed program in under five minutes to deep dives on vara.eth and its real-time parallel execution on Ethereum L1.",
      "Expanded the builder community across India, the US, Europe, and Asia through workshops, hackathon activations, ecosystem showcases, and the Vara Builder Office Hours I started with protocol leadership; India's growth was highlighted in Messari's State of Vara Q4 2025 report.",
      "Supported grant projects with technical integrations and continued engineering guidance, tracking delivery against KPI and milestone-based grant targets.",
      "Delivered 25+ hands-on sessions and reference integrations, including the ETH-Vara bridge launch, GOAT SDK and Eliza agent integrations, and ecosystem features like growwstreams payment streams and the rivr DEX, translating protocol capabilities into production-ready code.",
    ],
    links: [
      { label: "vara skills", href: "https://vara.network/agentic-development" },
      { label: "vara agents", href: "https://agents.vara.network/" },
      { label: "messari report", href: "https://messari.io/report/state-of-vara-q4-2025" },
    ],
  },
  {
    role: "Creator & Chief",
    company: "Monaris",
    bullets: [
      "Private credit layer for the stablecoin economy: turns receivables and recurring cashflow into instant liquidity, backed by private, verifiable credit.",
      "One layer for working capital, BNPL-style financing, automated repayments, treasury, and one-click private payments.",
      "18,160+ waitlist.",
    ],
    links: [
      { label: "monaris.co", href: "https://monaris.co" },
      { label: "@monaris_fi", href: "https://x.com/monaris_fi" },
    ],
  },
  {
    role: "Protocol Design & Research",
    company: "Cusp",
    bullets: [
      "The capital markets layer for prediction markets: risk, credit, settlement, and liquidation infrastructure for event-driven positions.",
      "Supported by Superteam.",
    ],
    links: [
      { label: "beta.cusp.fi", href: "https://beta.cusp.fi" },
      { label: "docs.cusp.fi", href: "https://docs.cusp.fi" },
      { label: "whitepaper", href: "https://drive.google.com/file/d/1FrhRtRtgE8hl8EqvbibSXJ_LHzzDWwsx/view" },
    ],
  },
  {
    role: "Creator & Maintainer",
    company: "PolyBaskets",
    bullets: [
      "The index fund for prediction markets: bundle, weight, and let AI agents trade for you.",
      "4.8M+ transactions, 23K+ bets, 52K+ baskets, and 4K+ claims on Vara.",
    ],
    links: [{ label: "polybaskets.xyz", href: "https://polybaskets.xyz" }],
  },
  {
    role: "Hackathons, Research & Community",
    company: "Independent · Multi-chain",
    bullets: [
      "Won 20+ hackathons including ETH Global, judged at ETH Global New Delhi, and partnered at ETH Pragma.",
      "Shipped experiments across ecosystems: ETH-Vara bridge, k-blackbox Rust SDK, Vaultera AI vaults on Hedera, and a post-quantum migration tool.",
      "Ran workshops and builder activations across Avalanche, Stellar, and Solana. Member of Superteam.",
    ],
  },
];

export type ProjectStatus = "live" | "building" | "research";

export interface Project {
  title: string;
  description: string;
  status: ProjectStatus;
  link: string;
  website?: string;
  protocol?: string;
  social?: string;
  tags: string[];
  highlight?: string;
}

export const projects: Project[] = [
  {
    title: "monaris",
    description: "private credit layer for the stablecoin economy. Monaris turns receivables and recurring cashflow into instant liquidity, backed by private, verifiable credit. one layer for working capital, BNPL-style financing, automated repayments, treasury, and one-click private payments.",
    status: "building",
    link: "https://monaris.co",
    social: "https://x.com/monaris_fi",
    tags: ["stablecoins", "payfi", "finance"],
    highlight: "18,160+ waitlist",
  },
  {
    title: "cusp",
    description: "Cusp is the capital markets layer for prediction markets. It provides risk, credit, settlement, and liquidation infrastructure for event-driven positions, and for any short-maturity claim that resolves against a contractual source and pays out after the fact.",
    status: "building",
    link: "https://docs.cusp.fi",
    website: "https://beta.cusp.fi",
    tags: ["AI agents", "capital", "prediction markets"],
  },
  {
    title: "polybaskets",
    description: "the index fund for prediction markets - bundle, weight, and let AI agents trade for you",
    status: "live",
    link: "https://github.com/Adityaakr/polybaskets",
    website: "https://polybaskets.xyz",
    tags: ["prediction markets", "vara", "DeFi"],
    highlight: "4.8M+ tx · 23K+ bets · 52K+ baskets · 4K+ claims",
  },
  {
    title: "peal network",
    description: "encryption with a release date - the programmable disclosure network. seal data to the Peal committee and it stays unreadable, even to operators, until the cue fires and the whole batch opens at once. fair reveals for any dapp, every share verified in public.",
    status: "building",
    link: "https://github.com/Adityaakr/peal-network",
    website: "https://peal.network",
    protocol: "https://peal.network/#/protocol",
    tags: ["encryption", "cryptography", "protocol"],
  },
  {
    title: "vaultera",
    description: "autonomous AI agents managing real capital in tokenized hedera vaults with on-chain decision logging",
    status: "live",
    link: "https://github.com/Adityaakr/Vaultera",
    website: "https://vaultera-production.up.railway.app",
    tags: ["AI", "hedera", "vaults"],
  },
  {
    title: "hashtac",
    description: "commit-reveal scheme via SHA-256 so no front-running, no copycats both players lock moves, then reveal atomically gasless mode, persistent leaderboard",
    status: "live",
    link: "https://github.com/Adityaakr/HashTac",
    tags: ["gaming", "vara", "sails"],
  },
  {
    title: "k-blackbox",
    description: "correctness-first rust SDK - live CRC32 checksum verification for L2 orderbooks with record/replay",
    status: "live",
    link: "https://github.com/Adityaakr/k-blackbox",
    tags: ["rust", "orderbook", "infra"],
  },
  {
    title: "quantum migration tool",
    description: "post-quantum wallet safety. every address that has sent a transaction has published the public key a quantum computer needs to derive its private key. scan it, prove the exposure, and migrate to a hybrid post-quantum account.",
    status: "live",
    link: "https://github.com/Adityaakr/quantum-migration",
    website: "https://quantum.adibuilds.in",
    tags: ["post-quantum", "wallet", "security"],
  },
  {
    title: "vara-mcp-server",
    description: "MCP server for AI-assisted vara development - scaffold, compile, test, and generate clients 40-100x faster in cursor IDE",
    status: "live",
    link: "https://github.com/Adityaakr/vara-mcp-server",
    tags: ["MCP", "AI", "vara", "devtools"],
  },
  {
    title: "Varix Perps",
    description: "Varix is a perpetual futures exchange on Vara built with modular on-chain components for margin, liquidity, oracle pricing, sessions, and market execution. It combines exchange-style trading UX with transparent on-chain settlement to deliver a fast, scalable, and production-ready perps platform.",
    status: "live",
    link: "https://github.com/Adityaakr/varix-perps",
    tags: ["perps", "vara", "trading"],
  },
  {
    title: "prism-claude-code",
    description: "A multi-agent harness for Claude Code that measures its own value. Prompt-defined commands fan parallel lenses over a task, adversarially verify each finding across model tiers, loop to convergence, and persist what they learn. The differentiator is honesty: its own eval reports when a single pass beats the fleet, instead of assuming more agents is always better.",
    status: "live",
    link: "https://github.com/Adityaakr/prism-claude-code",
    website: "https://www.adibuilds.in/blog/prism",
    tags: ["AI", "agents", "claude-code", "devtools"],
  },
];

export const principles = [
  "build things people can actually use",
  "clarity beats hype",
  "distribution matters as much as product",
  "developer experience is a growth lever",
  "speed matters but trust matters more",
  "focus on a few things really well",
];

export type ContentType = "video" | "essay" | "thread" | "workshop" | "event" | "talk";

export interface ContentItem {
  title: string;
  type: ContentType;
  date: string;
  link: string;
  featured?: boolean;
  summary?: string;
}

export const contentItems: ContentItem[] = [
  {
    title: "Every Asset Class Gets Its Wall Street. Prediction Markets Are Next.",
    type: "thread",
    date: "2026-06",
    link: "https://x.com/usecusp/status/2065306601511399896",
    featured: true,
  },
  {
    title: "Introducing CUSP: The DeFi Capital Layer for Prediction Markets on Solana",
    type: "thread",
    date: "2026-05",
    link: "https://x.com/usecusp/status/2059508915751313442",
    featured: true,
  },
  {
    title: "A secret that opens itself",
    type: "essay",
    date: "2026-06",
    link: "https://x.com/adityakrx/status/2071593948423115043",
    summary: "Giving Ethereum a secret it can open itself. Software as a service lets you rent computation instead of running it yourself. This is the same idea applied to a harder problem: secrets as a service.",
  },
  {
    title: "The Six Products the Agentic Economy Needs on Ethereum",
    type: "thread",
    date: "2026-04",
    link: "https://x.com/adityakrx/status/2046818743612031223",
    featured: true,
    summary: "A piece on the product stack agentic markets still need on Ethereum, and where autonomous capital, execution, coordination, and interfaces get built next.",
  },
  {
    title: "Polybaskets Season 2 is LIVE",
    type: "video",
    date: "2026-04",
    link: "https://x.com/adityakrx/status/2049115914780774564",
    featured: true,
    summary: "Deploy your gasless agent into A2A battles, bet with free CHIP tokens, grind the leaderboard, and compete for more than 1.7M VARA in total rewards.",
  },
  {
    title: "introducing vara skills - AI agents building dApps autonomously",
    type: "video",
    date: "2026-04",
    link: "https://x.com/adityakrx/status/2041499487085146530",
    featured: true,
    summary: "A launch video for the Vara skill stack showing how AI agents can scaffold, build, test, and ship full dApps with much less manual setup.",
  },
  {
    title: "40min+ full demo - one agent, vara skills, full dApp, done",
    type: "video",
    date: "2026-04",
    link: "https://x.com/adityakrx/status/2042230458180935725",
    featured: true,
    summary: "A longer walkthrough of the full agentic build loop, from idea to working app, using Vara skills end to end in a single flow.",
  },
  {
    title: "polybaskets - ETF for prediction markets walkthrough",
    type: "video",
    date: "2026-02",
    link: "https://x.com/adityakrx/status/2019277664713097446",
    featured: true,
    summary: "A product walkthrough explaining how PolyBaskets bundles prediction market positions into structured baskets and automates the trading flow.",
  },
  {
    title: "introducing polybasket - bundle polymarket outcomes into one basket",
    type: "video",
    date: "2026-01",
    link: "https://x.com/adityakrx/status/2014688067278291428",
  },
  {
    title: "what is vara.eth? - real-time parallel execution on ethereum L1",
    type: "video",
    date: "2025-12",
    link: "https://x.com/adityakrx/status/2003467492430434370",
  },
  {
    title: "vara builders office hours - growwstreams, ecosystem growth, rivr DEX",
    type: "video",
    date: "2026-03",
    link: "https://x.com/adityakrx/status/2030259503980294640",
  },
  {
    title: "office hours with gear CEO - journey and what's coming next",
    type: "talk",
    date: "2026-03",
    link: "https://x.com/i/broadcasts/1wGWjamDkmnKQ",
  },
  {
    title: "growwstreams on vara - real-time payment streams for developers",
    type: "video",
    date: "2025-11",
    link: "https://x.com/adityakrx/status/1991918642163052918",
  },
  {
    title: "k-blackbox - correctness-first rust SDK with live CRC32 verification",
    type: "video",
    date: "2025-12",
    link: "https://x.com/adityakrx/status/2008514463528611845",
  },
  {
    title: "ETH-vara bridge launch",
    type: "video",
    date: "2025-05",
    link: "https://x.com/adityakrx/status/1920113181579726888",
  },
  {
    title: "getting started building on vara in under 5 minutes",
    type: "video",
    date: "2025-04",
    link: "https://x.com/adityakrx/status/1912505227116413130",
  },
  {
    title: "sails tutorials - deploy smart contracts on vara, step by step",
    type: "video",
    date: "2025-03",
    link: "https://x.com/adityakrx/status/1903090949103685825",
  },
  {
    title: "vara × goat SDK integration - agents & intents on vara (part 1)",
    type: "video",
    date: "2024-12",
    link: "https://x.com/adityakrx/status/1940271288347656545",
  },
  {
    title: "understanding vara network - what makes it unique, ecosystem & more",
    type: "video",
    date: "2025-02",
    link: "https://x.com/adityakrx/status/1886056039184802069",
  },
  {
    title: "avalanche retro9000 - $40M grant program walkthrough",
    type: "video",
    date: "2024-12",
    link: "https://x.com/adityakrx/status/1866465179254378933",
  },
  {
    title: "building my own L1 using avaCloud on avalanche",
    type: "video",
    date: "2024-12",
    link: "https://x.com/adityakrx/status/1872620624109248706",
  },
  {
    title: "builders building on vara - ecosystem highlight reel",
    type: "video",
    date: "2025-10",
    link: "https://x.com/VaraNetwork_IN/status/1986453238120648990",
  },
  {
    title: "where does the yield actually come from? state of onchain yield",
    type: "thread",
    date: "2026-04",
    link: "https://x.com/adityakrx/status/2037844194333794377",
    featured: true,
  },
  {
    title: "where do builders go in 2025? high performance apps on ETH L1",
    type: "thread",
    date: "2026-03",
    link: "https://x.com/adityakrx/status/2036059896043741630",
    featured: true,
  },
  {
    title: "the hidden courtroom inside prediction markets - who decides the truth?",
    type: "thread",
    date: "2026-03",
    link: "https://x.com/adityakrx/status/2022529296062124404",
    featured: true,
  },
  {
    title: "tokenized stocks - the real question beyond 24/7 trading",
    type: "thread",
    date: "2026-04",
    link: "https://x.com/adityakrx/status/2040230114294968473",
  },
  {
    title: "onchain finance superpowers - programmability + composability via synthetic assets",
    type: "thread",
    date: "2025-09",
    link: "https://x.com/adityakrx/status/1976281331391778943",
  },
  {
    title: "intents and bridges - the architecture of cross-chain UX",
    type: "thread",
    date: "2025-10",
    link: "https://x.com/adityakrx/status/1980886583558471868",
  },
  {
    title: "intent-based design deep dive",
    type: "thread",
    date: "2024-12",
    link: "https://x.com/adityakrx/status/1937005797554397261",
  },
  {
    title: "messari state of vara Q4 2025 - india & APAC ecosystem growth",
    type: "essay",
    date: "2026-03",
    link: "https://x.com/adityakrx/status/2028806412705616032",
  },
  {
    title: "from passkey to smart wallet (ERC-4337) - wallet creation & first-time transaction flow",
    type: "thread",
    date: "2025-02",
    link: "https://x.com/adityakrx/status/1954767427415544104?s=20",
  },
  {
    title: "workshop - hands-on vara building session",
    type: "workshop",
    date: "2025-04",
    link: "https://x.com/adityakrx/status/1906916528152605018",
  },
  {
    title: "workshop - web3 builder activation (stellar/vara)",
    type: "workshop",
    date: "2024-09",
    link: "https://x.com/adityakrx/status/1837631584280654093",
  },
  {
    title: "vara india - developer workshop & onboarding session",
    type: "workshop",
    date: "2025-10",
    link: "https://x.com/VaraNetwork_IN/status/1982773783216996776",
  },
  {
    title: "vara india - builder activation & hands-on coding",
    type: "workshop",
    date: "2025-10",
    link: "https://x.com/VaraNetwork_IN/status/1978523945859993759",
  },
  {
    title: "vara india - ecosystem onboarding & intro session",
    type: "workshop",
    date: "2025-08",
    link: "https://x.com/VaraNetwork_IN/status/1950801019127861715",
  },
  {
    title: "partner at ETH Pragma",
    type: "event",
    date: "2025-09",
    link: "https://x.com/adityakrx/status/1971095045236465940",
    featured: true,
  },
  {
    title: "finalist judge at ETH Global New Delhi",
    type: "event",
    date: "2025-09",
    link: "https://x.com/adityakrx/status/1969372931760537636",
    featured: true,
  },
  {
    title: "won ETH Global hackathon",
    type: "event",
    date: "2025-11",
    link: "https://x.com/adityakrx/status/1994392689287262212",
    featured: true,
  },
];

export const highlights = [
  { label: "ETH Global winner", link: "https://x.com/adityakrx/status/1994392689287262212" },
  { label: "4.8M+ tx · 52K+ baskets on Polybaskets", link: "https://app.polybaskets.xyz/stats" },
  { label: "20+ hackathon wins", link: "https://github.com/Adityaakr" },
  { label: "finalist judge at ETH Global New Delhi", link: "https://x.com/adityakrx/status/1969372931760537636" },
  { label: "partner at ETH Pragma", link: "https://x.com/adityakrx/status/1971095045236465940" },
  { label: "featured in messari state of vara report", link: "https://messari.io/report/state-of-vara-q4-2025" },
  { label: "18,160+ monaris waitlist", link: "https://monaris.co" },
  { label: "25+ workshops & builder activations", link: "https://x.com/adityakrx" },
  { label: "143 public repos", link: "https://github.com/Adityaakr" },
  { label: "vara wiki contributor", link: "https://wiki.vara.network" },
];
