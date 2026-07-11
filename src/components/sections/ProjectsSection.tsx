import { projects } from "../../content/projects";
import { EmptyState } from "../ui/EmptyState";
import { SectionHeading } from "../ui/SectionHeading";

export function ProjectsSection() {
  return (
    <section className="section" id="projects">
      <SectionHeading
        eyebrow="Selected systems"
        title="Featured AI & Automation Projects"
        description="Automation, AI workflow, agent, and integration case studies will live here."
      />
      {projects.length === 0 ? (
        <EmptyState message="Project case studies are waiting for confirmed source material." />
      ) : (
        <div className="card-grid">
          {projects.map((project) => (
            <article className="content-card" key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.shortDescription}</p>
              <ul className="tag-list">
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
