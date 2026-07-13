import { profile } from "../../content/profile";
import profilePhoto from "../../../IMG_2989_VSCO.JPG";
import { Icon } from "../ui/Icon";
import { AboutStatsMotion } from "../ui/AboutStatsMotion";
import { SectionHeading } from "../ui/SectionHeading";
import { ScrollParallax } from "../ui/ScrollParallax";
import { ScrollReveal } from "../ui/ScrollReveal";

export function AboutSection() {
  const deliveryWords = (profile.deliveryScope ?? "").split(" ").filter(Boolean);
  const deliveryLead = deliveryWords.slice(0, -1).join(" ");
  const deliveryTail = deliveryWords.at(-1) ?? "";

  return (
    <section className="section about-section" id="about">
      <SectionHeading title="About Me" withLine />
      <div className="about-content">
        <ScrollReveal direction="left"><ScrollParallax direction={-1} strength={3}><img className="about-photo" src={profilePhoto} alt={`${profile.name} portrait`} /></ScrollParallax></ScrollReveal>
        <ScrollReveal direction="right" className="about-copy">
          {(profile.aboutParagraphs ?? [profile.about]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="about-location"><Icon name="location" size={18} />{profile.location} · {profile.remoteAvailability}</p>
        </ScrollReveal>
      </div>
      <AboutStatsMotion>
        <div className="about-stat"><strong>{profile.yearsCommercialExperience}+</strong><span>YEARS<br />DEVELOPING</span></div>
        <div className="about-stat"><strong>{profile.technologyCount}+</strong><span>TECHNOLOGIES<br />IN STACK</span></div>
        <div className="about-stat about-stat-wide"><strong>{deliveryLead}<br />{deliveryTail}</strong><span>FROM IDEA<br />TO DEPLOYMENT</span></div>
      </AboutStatsMotion>
    </section>
  );
}
