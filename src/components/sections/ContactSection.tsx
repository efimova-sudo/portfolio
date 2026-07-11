import { contacts } from "../../content/contacts";
import { SectionHeading } from "../ui/SectionHeading";

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let’s build useful systems."
        description="Contact links will become active when the resume and profile details are provided."
      />
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.label}>
            {contact.href ? (
              <a href={contact.href}>{contact.label}</a>
            ) : (
              <span>{contact.label} — pending</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
