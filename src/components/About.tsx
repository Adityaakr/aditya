const About = () => (
  <section id="about" className="py-24 px-6 lg:px-8 border-t border-border/60">
    <div className="mx-auto max-w-[860px]">
      <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/50 mb-3">
        about
      </p>
      <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-foreground mb-10">
        a bit about me
      </h2>
      <div className="space-y-5 max-w-[600px]">
        <p className="text-base md:text-[1.0625rem] text-muted-foreground leading-[1.75]">
          currently i work on developer adoption, technical education, ecosystem growth, and builder support across web3.
        </p>
        <p className="text-base md:text-[1.0625rem] text-muted-foreground leading-[1.75]">
          alongside that, i'm building{" "}
          <span className="text-foreground font-semibold">monaris</span> — a private finance product for the stablecoin era focused on cashflow, payfi rails, and better financial UX.
        </p>
        <p className="text-base md:text-[1.0625rem] text-muted-foreground leading-[1.75]">
          over the years, i've worked across developer relations, community, product storytelling, technical content, ecosystem activation, and growth.
        </p>
      </div>
    </div>
  </section>
);

export default About;
