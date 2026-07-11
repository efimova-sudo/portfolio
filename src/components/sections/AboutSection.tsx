import { profile } from "../../content/profile";
import { SectionHeading } from "../ui/SectionHeading";

export function AboutSection() {
  return (
    <section className="section about-grid" id="about">
      <SectionHeading
        eyebrow="Engineering foundation"
        title="Backend depth for practical AI systems"
      />
      <div className="about-copy">
        <p>{profile.about}</p>
        <div className="experience-stat">
          <strong>{profile.yearsCommercialExperience}</strong>
          <span>years of commercial development</span>
        </div>
      </div>
    </section>
  );
}
