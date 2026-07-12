import { profile } from "../../content/profile";
import profilePhoto from "../../../IMG_2989_VSCO.JPG";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";

export function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <SectionHeading title="About Me" withLine />
      <div className="about-content">
        <img className="about-photo" src={profilePhoto} alt={`${profile.name} portrait`} />
        <div className="about-copy">
          {(profile.aboutParagraphs ?? [profile.about]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="about-location"><Icon name="location" size={18} />{profile.location} · {profile.remoteAvailability}</p>
        </div>
      </div>
      <div className="about-stats" aria-label="Professional highlights">
        <div className="about-stat"><strong>{profile.yearsCommercialExperience}+</strong><span>YEARS<br />DEVELOPING</span></div>
        <div className="about-stat"><strong>{profile.technologyCount}+</strong><span>TECHNOLOGIES<br />IN STACK</span></div>
        <div className="about-stat about-stat-wide"><strong>{profile.deliveryScope}</strong><span>FROM IDEA<br />TO DEPLOYMENT</span></div>
      </div>
    </section>
  );
}
