import { projects } from "../../content/projects";
import type { Project } from "../../types/content";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";

type ProjectCardProps = {
  project?: Project;
  index: number;
};

function ProjectCard({ project, index }: ProjectCardProps) {
  const actions = [
    { label: "GITHUB", href: project?.githubUrl, icon: "github" as const },
    { label: "LIVE DEMO", href: project?.demoUrl, icon: "external-link" as const },
    { label: "DETAILS", href: project ? `/projects/${project.slug}` : undefined, icon: "arrow-right" as const, accent: true },
  ];
  const image = project?.images?.[0];

  return (
    <article className="project-card">
      <div className="project-preview">
        {image ? <img src={image.src} alt={image.alt} /> : <><Icon name="image" size={30} /><span>PROJECT PREVIEW</span></>}
      </div>
      <h3>{project?.title ?? "Project title pending"}</h3>
      <div className="project-actions">
        {actions.map((action) => action.href ? <a className={`project-action${action.accent ? " project-action-accent" : ""}`} href={action.href} key={action.label}><Icon name={action.icon} size={16} />{action.label}</a> : <span className={`project-action is-disabled${action.accent ? " project-action-accent" : ""}`} key={action.label}><Icon name={action.icon} size={16} />{action.label}</span>)}
      </div>
      <div className="project-divider" />
      <p>{project?.shortDescription ?? "Project description, problem, solution, role, and workflow will be added when project materials are provided."}</p>
      <ul className="project-tags">
        {(project?.technologies.length ? project.technologies : ["TECH STACK PENDING"]).map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
      <span className="sr-only">Project {String(index + 1).padStart(2, "0")}</span>
    </article>
  );
}

export function ProjectsSection() {
  const projectCards: Array<Project | undefined> = projects.length
    ? projects
    : Array.from({ length: 3 }, () => undefined);

  return (
    <section className="section projects-section" id="projects">
      <SectionHeading title="Projects" withLine />
      <div className="projects-grid">
        {projectCards.map((project, index) => <ProjectCard index={index} key={project?.id ?? `placeholder-${index}`} project={project} />)}
      </div>
    </section>
  );
}
