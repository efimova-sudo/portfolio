import { ReactLenis } from "lenis/react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { AboutSection } from "../components/sections/AboutSection";
import { ContactSection } from "../components/sections/ContactSection";
import { HeroSection } from "../components/sections/HeroSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { SpotlightController } from "../components/ui/SpotlightController";
import { ParticleDivider } from "../components/ui/ParticleDivider";

export function App() {
  const content = (
    <>
      <Header />
      <SpotlightController />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ParticleDivider />
        <ContactSection />
      </main>
      <Footer />
    </>
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return content;
  }

  return (
    <ReactLenis
      options={{
        anchors: true,
        autoRaf: true,
        lerp: 0.11,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      }}
      root
    >
      {content}
    </ReactLenis>
  );
}
