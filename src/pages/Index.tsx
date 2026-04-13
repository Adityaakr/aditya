import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import Highlights from "@/components/Highlights";
import SelectedWork from "@/components/SelectedWork";
import Projects from "@/components/Projects";
import Principles from "@/components/Principles";
import ContentSection from "@/components/ContentSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="noise-overlay">
    <Header />
    <main>
      <Hero />
      <TrustStrip />
      <About />
      <Highlights />
      <SelectedWork />
      <Projects />
      <ContentSection />
      <Principles />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
