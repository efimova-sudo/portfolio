import { projects } from "../../content/projects";
import type { Project } from "../../types/content";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { ScrollParallax } from "../ui/ScrollParallax";
import { ScrollReveal } from "../ui/ScrollReveal";

type ProjectCardProps = {
  project?: Project;
  index: number;
};

function ProjectCard({ project, index }: ProjectCardProps) {
  const actions = [
    { label: "GITHUB", href: project?.githubUrl, icon: "github" as const, external: true },
    ...(project ? (project.demoUrl ? [{ label: "LIVE DEMO", href: project.demoUrl, icon: "external-link" as const, external: true }] : []) : [{ label: "LIVE DEMO", href: undefined, icon: "external-link" as const, external: true }]),
    { label: project ? "VIEW CASE STUDY" : "DETAILS", href: project ? `/projects/${project.slug}` : undefined, icon: "arrow-right" as const, accent: true },
  ];
  const image = project?.images?.[0];
  const technologies = project?.technologies.length ? project.technologies : ["TECH STACK PENDING"];
  const visibleTechnologies = technologies.slice(0, 3);
  const remainingTechnologyCount = technologies.length - visibleTechnologies.length;

  return (
    <ScrollParallax direction={index % 2 === 0 ? 1 : -1} strength={2.5}>
    <ScrollReveal delay={index * 0.08}>
    <article className="project-card" data-spotlight>
      <div className="project-preview">
        {image ? <img src={image.src} alt={image.alt} /> : <><Icon name="image" size={30} /><span>PROJECT PREVIEW</span></>}
      </div>
      <h3>{project?.title ?? "Project title pending"}</h3>
      <div className="project-actions">
        {actions.map((action) => action.href ? <a className={`project-action${action.accent ? " project-action-accent" : ""}`} href={action.href} key={action.label} rel={action.external ? "noreferrer" : undefined} target={action.external ? "_blank" : undefined}><Icon name={action.icon} size={16} />{action.label}</a> : <span className={`project-action is-disabled${action.accent ? " project-action-accent" : ""}`} key={action.label}><Icon name={action.icon} size={16} />{action.label}</span>)}
      </div>
      <div className="project-divider" />
      <p>{project?.shortDescription ?? "Project description, problem, solution, role, and workflow will be added when project materials are provided."}</p>
      <ul className="project-tags">
        {visibleTechnologies.map((technology) => <li key={technology}>{technology}</li>)}
        {remainingTechnologyCount > 0 ? <li aria-label={`${remainingTechnologyCount} more technologies`}>+{remainingTechnologyCount}</li> : null}
      </ul>
      <span className="sr-only">Project {String(index + 1).padStart(2, "0")}</span>
    </article>
    </ScrollReveal>
    </ScrollParallax>
  );
}

export function ProjectsSection() {
  const projectCards: Array<Project | undefined> = [
    ...projects.slice(0, 3),
    ...Array.from({ length: Math.max(0, 3 - projects.length) }, () => undefined),
  ];

  return (
    <section className="section projects-section" id="projects">
      <SectionHeading title="Projects" withLine />
      <div className="projects-grid">
        {projectCards.map((project, index) => <ProjectCard index={index} key={project?.id ?? `placeholder-${index}`} project={project} />)}
      </div>
    </section>
  );
}
