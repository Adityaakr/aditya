import AnimatedSection from "./AnimatedSection";

const link =
  "text-indigo-600 dark:text-indigo-400 hover:underline";

const Intro = () => (
  <AnimatedSection className="mt-10 space-y-5">
    <p className="text-[15px] text-foreground/80 leading-[1.75]">
      Hi, I'm Aditya. I build products, developer ecosystems, and internet-native
      finance. My work sits at the intersection of DeFi, prediction markets, AI
      agents, and privacy, turning protocol-level ideas into things people
      actually use. Lately that means applied cryptography: RAILGUN-based private
      payments, Kohaku on Miden, and batched threshold encryption for fair
      on-chain reveals.
    </p>
    <p className="text-[15px] text-foreground/80 leading-[1.75]">
      I'm part of the DevRel and ecosystem team at{" "}
      <a href="https://vara.network" target="_blank" rel="noopener noreferrer" className={link}>
        Vara Network
      </a>{" "}
      and{" "}
      <a href="https://gear-tech.io" target="_blank" rel="noopener noreferrer" className={link}>
        Gear Foundation
      </a>
      , where I lead developer adoption, technical education, and ecosystem
      growth across web3. Alongside that I'm building{" "}
      <a href="https://monaris.co" target="_blank" rel="noopener noreferrer" className={link}>
        Monaris
      </a>{" "}
      (18,160+ waitlist), a private credit layer for the stablecoin economy, and{" "}
      <a href="https://cusp.fi" target="_blank" rel="noopener noreferrer" className={link}>
        Cusp
      </a>
      , the execution layer for agentic, event-driven capital.
    </p>
    <p className="text-[15px] text-foreground/80 leading-[1.75]">
      I've judged at{" "}
      <a href="https://x.com/adityakrx/status/1969372931760537636" target="_blank" rel="noopener noreferrer" className={link}>
        ETH Global
      </a>
      , partnered at ETH Pragma, won 20+ hackathons, and run 25+ workshops across
      Vara, Avalanche, Stellar, and Solana. Always up for a good
      conversation about crypto, cryptography, or what to build next, feel free
      to reach out.
    </p>
  </AnimatedSection>
);

export default Intro;
