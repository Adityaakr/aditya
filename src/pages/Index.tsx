import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import SelectedWork from "@/components/SelectedWork";
import Projects from "@/components/Projects";
import Principles from "@/components/Principles";
import WritingTalks from "@/components/WritingTalks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Header />
    <main>
      <Hero />
      <TrustStrip />
      <About />
      <SelectedWork />
      <Projects />
      <Principles />
      <WritingTalks />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;
