import { services } from "../../content/services";
import { SectionHeading } from "../ui/SectionHeading";

export function ServicesSection() {
  return (
    <section className="section" id="services">
      <SectionHeading eyebrow="Capabilities" title="What I Do" />
      <div className="service-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{service.title}</h3>
            {service.description ? <p>{service.description}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
