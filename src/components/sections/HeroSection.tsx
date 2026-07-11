import { contacts } from "../../content/contacts";
import { profile } from "../../content/profile";

export function HeroSection() {
  return (
    <section className="hero section" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Portfolio draft / 2026</p>
        <p className="hero-name">{profile.name ?? "Name pending resume"}</p>
        <h1>
          AI Solutions &amp; <span>Automation Engineer</span>
        </h1>
        <p className="hero-summary">{profile.shortPositioning}</p>
        <div className="hero-actions" aria-label="Primary links">
          <a className="button button-primary" href="#projects">
            View projects
          </a>
          {contacts.slice(1).map((contact) =>
            contact.href ? (
              <a className="button" href={contact.href} key={contact.label}>
                {contact.label}
              </a>
            ) : (
              <span className="button button-disabled" key={contact.label}>
                {contact.label}
              </span>
            ),
          )}
        </div>
      </div>
      <div className="hero-media" aria-label="Profile image placeholder">
        {profile.photo ? (
          <img src={profile.photo.src} alt={profile.photo.alt} />
        ) : (
          <p>Photo / visual pending</p>
        )}
      </div>
    </section>
  );
}
