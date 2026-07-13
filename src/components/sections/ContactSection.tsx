import { contacts } from "../../content/contacts";
import { profile } from "../../content/profile";
import { Icon, type IconName } from "../ui/Icon";
import { KineticHeading } from "../ui/KineticHeading";
import { ScrollReveal } from "../ui/ScrollReveal";

const contactIcons: Record<string, IconName> = {
  Email: "email",
  WhatsApp: "whatsapp",
  Telegram: "telegram",
  LinkedIn: "linkedin",
  GitHub: "github",
};

export function ContactSection() {
  const email = contacts.find((contact) => contact.label === "Email");
  const whatsapp = contacts.find((contact) => contact.label === "WhatsApp");

  return (
    <section className="section contact-section" id="contact">
      <KineticHeading>Let’s build smarter systems.</KineticHeading>
      <div className="contact-panels">
        <ScrollReveal direction="left">
        <div className="contact-directory" data-spotlight>
          <div className="contact-directory-header"><span>CONTACTS</span><span className="availability"><i />AVAILABLE</span></div>
          {contacts.filter((contact) => contact.label in contactIcons).map((contact) => {
            const content = <><span className="contact-icon"><Icon name={contactIcons[contact.label]} size={22} /></span><span className="contact-copy"><small>{contact.label.toUpperCase()}</small><strong>{contact.value ?? "Contact link pending"}</strong></span><Icon name="arrow-up-right" size={20} /></>;
            return contact.href ? <a className="contact-item" data-spotlight href={contact.href} key={contact.label} rel={contact.external ? "noreferrer" : undefined} target={contact.external ? "_blank" : undefined}>{content}</a> : <span className="contact-item is-disabled" data-spotlight key={contact.label}>{content}</span>;
          })}
        </div>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.08}>
        <div className="direct-contact" data-spotlight>
          <div className="direct-contact-copy"><span className="direct-contact-icon"><Icon name="email" size={28} /></span><p className="direct-contact-eyebrow">DIRECT LINE</p><h3>Talk to me directly.</h3><p>Whether you’re exploring AI, streamlining operations, or connecting the tools your business already uses, let’s build a solution that’s reliable, scalable, and easy to maintain.</p></div>
          <div className="direct-contact-bottom">
            <div className="direct-contact-actions">
              {email?.href ? <a className="direct-button direct-button-primary" href={email.href}>EMAIL ME <Icon name="email" size={18} /></a> : null}
              {whatsapp?.href ? <a className="direct-button" href={whatsapp.href} rel="noreferrer" target="_blank">WRITE ON WHATSAPP <Icon name="whatsapp" size={18} /></a> : null}
            </div>
            <div className="contact-location"><Icon name="location" size={20} /><span><small>BASED IN</small><strong>{profile.location} · {profile.remoteAvailability}</strong></span></div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
