import PageShell from "@/components/PageShell";
import Intro from "@/components/Intro";
import Publications from "@/components/Publications";
import ProjectsList from "@/components/ProjectsList";
import Videos from "@/components/Videos";

const Index = () => (
  <PageShell>
    <Intro />
    <Publications moreHref="/content" />
    <ProjectsList heading="Projects" limit={4} moreHref="/experiments" />
    <Videos />
  </PageShell>
);

export default Index;
