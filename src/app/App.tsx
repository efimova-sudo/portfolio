import { Header } from "../components/layout/Header";
import { AboutSection } from "../components/sections/AboutSection";
import { ContactSection } from "../components/sections/ContactSection";
import { HeroSection } from "../components/sections/HeroSection";
import { PreviousWorkSection } from "../components/sections/PreviousWorkSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { SkillsSection } from "../components/sections/SkillsSection";

export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <PreviousWorkSection />
        <ContactSection />
      </main>
    </>
  );
}
