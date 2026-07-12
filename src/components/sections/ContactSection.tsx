import { contacts } from "../../content/contacts";
import { profile } from "../../content/profile";
import { Icon, type IconName } from "../ui/Icon";

const contactIcons: Record<string, IconName> = {
  Email: "email",
  WhatsApp: "whatsapp",
  Telegram: "telegram",
  LinkedIn: "linkedin",
  GitHub: "github",
};

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <h2>Let’s build smarter systems.</h2>
      <div className="contact-panels">
        <div className="contact-directory">
          <div className="contact-directory-header"><span>CONTACTS</span><span className="availability"><i />AVAILABLE</span></div>
          {contacts.filter((contact) => contact.label in contactIcons).map((contact) => {
            const content = <><span className="contact-icon"><Icon name={contactIcons[contact.label]} size={22} /></span><span className="contact-copy"><small>{contact.label.toUpperCase()}</small><strong>{contact.href ?? "Contact link pending"}</strong></span><Icon name="arrow-up-right" size={20} /></>;
            return contact.href ? <a className="contact-item" href={contact.href} key={contact.label}>{content}</a> : <span className="contact-item is-disabled" key={contact.label}>{content}</span>;
          })}
        </div>
        <div className="direct-contact">
          <div className="direct-contact-copy"><span className="direct-contact-icon"><Icon name="email" size={28} /></span><p className="direct-contact-eyebrow">DIRECT LINE</p><h3>Talk to me directly.</h3><p>Whether you’re exploring AI, streamlining operations, or connecting the tools your business already uses, let’s build a solution that’s reliable, scalable, and easy to maintain.</p></div>
          <div className="direct-contact-bottom">
            <div className="direct-contact-actions">
              <span className="direct-button direct-button-primary is-disabled">EMAIL ME <Icon name="email" size={18} /></span>
              <span className="direct-button is-disabled">WRITE ON WHATSAPP <Icon name="whatsapp" size={18} /></span>
            </div>
            <div className="contact-location"><Icon name="location" size={20} /><span><small>BASED IN</small><strong>{profile.location} · {profile.remoteAvailability}</strong></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
