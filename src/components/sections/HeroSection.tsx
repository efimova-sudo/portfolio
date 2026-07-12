import { contacts } from "../../content/contacts";
import { profile } from "../../content/profile";
import { skillCategories } from "../../content/skills";
import { Icon } from "../ui/Icon";

const socialIcons = {
  Email: "email",
  LinkedIn: "linkedin",
  GitHub: "github",
  WhatsApp: "whatsapp",
} as const;

const terminalSkills = ["n8n", "LLM workflows", "AI agents", ".NET/C#", "ASP.NET Core", "Python", "REST APIs", "SQL", "Azure", "AWS"];

export function HeroSection() {
  return (
    <section className="hero section" id="top">
      <div className="hero-copy">
        <h1>AI Solutions &amp;<br />Automation<br />Engineer.</h1>
        <div className="hero-intro">
          <p>Hi, I’m <strong>{profile.name}.</strong> I design and build AI-powered workflows,</p>
          <p>business automations, agents, and integrations — backed by six years of C#/.NET engineering.</p>
        </div>
        <div className="hero-actions" aria-label="Primary links">
          <a className="button button-primary" href="#projects">
            View Projects
          </a>
          <span className="button button-resume button-disabled"><Icon name="download" size={17} />Resume</span>
        </div>
        <div className="hero-connect">
          <p>Connect with me</p>
          <div className="social-links">
            {contacts.filter((contact) => contact.label in socialIcons).map((contact) => {
              const icon = socialIcons[contact.label as keyof typeof socialIcons];
              return contact.href ? <a aria-label={contact.label} className="social-link" href={contact.href} key={contact.label} rel={contact.external ? "noreferrer" : undefined} target={contact.external ? "_blank" : undefined}><Icon name={icon} size={19} /></a> : <span aria-label={`${contact.label} link pending`} className="social-link is-disabled" key={contact.label}><Icon name={icon} size={19} /></span>;
            })}
          </div>
        </div>
        <p className="hero-location"><Icon name="location" size={16} />{profile.location} · {profile.remoteAvailability}</p>
      </div>
      <div className="hero-terminal" aria-label="Profile summary in a terminal-style card">
        <div className="terminal-header"><span className="terminal-controls"><i /><i /><i /></span><span>anastasia@portfolio — zsh</span></div>
        <div className="terminal-body">
          <p className="terminal-command">~/portfolio › cat profile.json</p>
          <dl className="terminal-data">
            <div><dt>"name":</dt><dd>"{profile.name}"</dd></div>
            <div><dt>"role":</dt><dd>"{profile.professionalTitle}"</dd></div>
            <div><dt>"location":</dt><dd>"{profile.location}"</dd></div>
            <div><dt>"remote":</dt><dd>"Worldwide"</dd></div>
          </dl>
          <p className="terminal-command">~/portfolio › ls ./skills</p>
          <div className="terminal-skills">
            {terminalSkills.filter((name) => name === "AI agents" || skillCategories.some((category) => category.skills.some((skill) => skill.name === name))).map((skill) => <span key={skill}>{skill}</span>)}
          </div>
          <p className="terminal-command">~/portfolio › echo $FOCUS</p>
          <p className="terminal-focus">AI solutions · automation · integrations</p>
        </div>
      </div>
    </section>
  );
}
