import { useEffect, useRef } from "react";
import { onboardingCaseStudy as cs } from "../../content/projectOnboardingCaseStudy";
import type { Project } from "../../types/content";
import { Icon } from "../ui/Icon";
import { HeroParticles } from "../ui/HeroParticles";
import { KineticHeading } from "../ui/KineticHeading";
import { ParticleDivider } from "../ui/ParticleDivider";
import { ScrollGlintLine } from "../ui/ScrollGlintLine";
import { ScrollParallax } from "../ui/ScrollParallax";
import { ScrollReveal } from "../ui/ScrollReveal";

type Props = { project?: Project };

const failureFlow = [
  "Raw n8n error",
  "Extract execution context",
  "Classify error",
  "Build normalized failure",
  "Append audit event",
  "Update run status",
  "Send Slack alert",
] as const;

function CaseImage({ src, alt, caption, priority = false }: { src: string; alt: string; caption: string; priority?: boolean }) {
  return (
    <figure className="case-image case-hover-card" data-spotlight>
      <a href={src} target="_blank" rel="noreferrer" aria-label={`${alt}. Open full-size image in a new tab.`}>
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function SectionHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="case-section-header">
      <div className="case-title-line"><KineticHeading>{title}</KineticHeading><ScrollGlintLine /></div>
      {intro ? <p>{intro}</p> : null}
    </header>
  );
}

function OverviewFlow() {
  return (
    <div className="overview-flow-panel case-hover-card" data-spotlight aria-label={cs.flowSummary.join(" then ")}>
      {cs.flowSummary.map((item, index) => (
        <div className="overview-flow-step" key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  );
}

function WorkflowSnake() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const steps = Array.from(diagram.querySelectorAll<HTMLElement>(".workflow-snake-steps li"));
    let frame = 0;

    const reset = () => {
      steps.forEach((step) => {
        step.style.setProperty("--step-glow", "0");
        step.classList.remove("is-nearest-step");
      });
    };

    const update = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let nearestIndex = -1;
        let nearestDistance = Number.POSITIVE_INFINITY;

        steps.forEach((step, index) => {
          const node = step.querySelector<HTMLElement>("i") ?? step;
          const bounds = node.getBoundingClientRect();
          const distance = Math.hypot(event.clientX - (bounds.left + bounds.width / 2), event.clientY - (bounds.top + bounds.height / 2));
          step.style.setProperty("--step-glow", "0");
          step.classList.remove("is-nearest-step");
          if (distance < nearestDistance) {
            nearestIndex = index;
            nearestDistance = distance;
          }
        });

        if (nearestIndex >= 0) {
          steps[nearestIndex]?.style.setProperty("--step-glow", "1");
          steps[nearestIndex]?.classList.add("is-nearest-step");
        }
      });
    };

    diagram.addEventListener("pointermove", update, { passive: true });
    diagram.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      reset();
      diagram.removeEventListener("pointermove", update);
      diagram.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div className="workflow-snake case-hover-card" data-spotlight aria-label="Detailed workflow sequence" ref={diagramRef}>
      <div className="workflow-snake-header"><span>DETAILED WORKFLOW SEQUENCE</span><strong>13 AUTOMATED STEPS</strong></div>
      <svg aria-hidden="true" className="workflow-snake-line" viewBox="0 0 1180 660" preserveAspectRatio="none">
        <defs>
          <linearGradient id="workflow-path-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff7433" />
            <stop offset="0.52" stopColor="#ff334e" />
            <stop offset="1" stopColor="#ff3ca6" />
          </linearGradient>
        </defs>
        <path className="workflow-path-underlay" d="M 100 135 H 1040 C 1100 135 1138 170 1138 225 C 1138 280 1100 315 1040 315 H 140 C 80 315 42 350 42 405 C 42 460 80 495 140 495 H 1040" />
        <path className="workflow-path-accent" d="M 100 135 H 1040 C 1100 135 1138 170 1138 225 C 1138 280 1100 315 1040 315 H 140 C 80 315 42 350 42 405 C 42 460 80 495 140 495 H 1040" />
      </svg>
      <ol className="workflow-snake-steps">
        {cs.workflowSteps.map((step, index) => <li key={step}><i aria-hidden="true" /><strong>STEP {String(index + 1).padStart(2, "0")}</strong><p>{step}</p></li>)}
      </ol>
    </div>
  );
}

function ArchitectureCard({ title, copy, image, alt }: { title: string; copy: string; image: string; alt: string }) {
  return (
    <article className="architecture-card case-hover-card" data-spotlight>
      <div className="architecture-media"><img src={image} alt={alt} loading="lazy" decoding="async" /></div>
      <div className="architecture-card-body"><h3>{title}</h3><span aria-hidden="true" /><p>{copy}</p></div>
    </article>
  );
}

function FailurePipeline() {
  return (
    <div className="failure-pipeline" data-spotlight aria-label={failureFlow.join(" then ")}>
      {failureFlow.map((step, index) => (
        <div className="failure-pipeline-group" key={step}>
          <strong className="failure-pipeline-step" data-spotlight>{step}</strong>
          {index < failureFlow.length - 1 ? <span aria-hidden="true">→</span> : null}
        </div>
      ))}
    </div>
  );
}

function ErrorTypeMarquee() {
  return (
    <div className="error-type-marquee" aria-label={`Error categories: ${cs.errorTypes.join(", ")}`}>
      <div className="error-type-marquee-track">
        {[0, 1].map((copyIndex) => (
          <div className="error-type-list error-type-marquee-group" aria-hidden={copyIndex === 1 ? "true" : undefined} key={copyIndex}>
            {cs.errorTypes.map((type) => <code key={`${copyIndex}-${type}`}>{type}</code>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function CapabilityMarquee() {
  return (
    <div className="capability-marquee" aria-label={`Demonstrated capabilities: ${cs.capabilities.join(", ")}`}>
      <div className="capability-marquee-track">
        {[0, 1].map((copyIndex) => (
          <div className="capability-grid capability-marquee-group" aria-hidden={copyIndex === 1 ? "true" : undefined} key={copyIndex}>
            {cs.capabilities.map((item) => <span key={`${copyIndex}-${item}`}>{item}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function useMetadata(project?: Project) {
  useEffect(() => {
    if (!project) return;
    const oldTitle = document.title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const oldDescription = meta?.content;
    document.title = "Project Onboarding Automation Case Study | Anastasia Efimova";
    if (meta) meta.content = "An end-to-end n8n project onboarding automation integrating Slack, Google Drive, QuickBooks, Google Sheets, and Gmail with validation, audit logging, idempotency, and centralized error handling.";
    const social = { "og:title": project.title, "og:description": "A production-minded n8n workflow that turns a signed contract into a complete project setup across operational and financial systems.", "og:image": project.images?.[0]?.src ?? "" };
    const created: HTMLMetaElement[] = [];
    Object.entries(social).forEach(([property, content]) => {
      let node = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute("property", property);
        document.head.appendChild(node);
        created.push(node);
      }
      node.content = content;
    });
    return () => {
      document.title = oldTitle;
      if (meta && oldDescription) meta.content = oldDescription;
      created.forEach((node) => node.remove());
    };
  }, [project]);
}

export function ProjectDetailsPage({ project }: Props) {
  useMetadata(project);
  if (!project) return <main className="project-detail project-detail-missing"><p className="eyebrow">PROJECT NOT FOUND</p><h1>That project doesn’t exist.</h1><a className="button button-primary" href="/#projects">Back to projects</a></main>;

  const v = cs.visuals;
  const architectureImages = [v.mainImage, v.workspaceImage, v.quickBooksImage, v.materialsImage, v.auditImage, v.errorHandlerImage];
  const leftTestIndexes = new Set([0, 2, 3, 4, 5, 8]);
  const testTables = [
    cs.tests.filter((_, index) => leftTestIndexes.has(index)),
    cs.tests.filter((_, index) => !leftTestIndexes.has(index)),
  ];

  return (
    <main className="project-detail case-study">
      <section className="project-detail-hero">
        <HeroParticles obstacleSelector=".case-facts-motion" />
        <a className="project-back-link" href="/#projects"><Icon name="arrow-right" size={16} />Back to projects</a>
        <div className="case-hero-grid">
          <div className="case-hero-copy">
            <p className="eyebrow">WORKFLOW AUTOMATION · SYSTEMS INTEGRATION</p>
            <KineticHeading as="h1" hero><span>Project</span><span>Onboarding</span><span>Automation</span></KineticHeading>
            <ScrollReveal className="case-hero-details">
              <p className="project-detail-summary">{cs.heroIntro}</p>
              <div className="project-detail-actions">
                <a className="button button-primary" href={project.githubUrl} rel="noreferrer" target="_blank"><Icon name="github" size={18} />View on GitHub</a>
                <a className="button button-resume" href="#architecture">Explore the Workflow</a>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal className="case-facts-motion" direction="right" delay={0.08}>
            <aside className="case-facts case-hover-card" data-spotlight>
              <div className="case-facts-header"><span>PROJECT FACTS</span><span><i />LIVE WORKFLOW</span></div>
              <div className="case-fact-row"><small>ROLE</small><strong>{cs.role}</strong></div>
              <div className="case-fact-row"><small>PROJECT TYPE</small><strong>{cs.projectType}</strong></div>
              <div className="case-fact-row case-fact-stack"><small>STACK</small><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
            </aside>
          </ScrollReveal>
        </div>
        {project.images?.[0] ? <ScrollParallax className="case-hero-image-motion" strength={2}><ScrollReveal><CaseImage src={project.images[0].src} alt="Complete project onboarding workflow overview" caption="End-to-end orchestration from signed contract intake to completed project setup." priority /></ScrollReveal></ScrollParallax> : null}
      </section>

      <section className="case-section case-overview">
        <SectionHeader title="Overview" />
        <div className="case-two-column case-overview-content">
          <ScrollReveal className="case-copy" direction="left" distance={96}>
            <p>Project onboarding often requires a project manager to repeat the same operational checklist after every signed contract: create folders, upload documents, prepare financial records, generate project sheets, update internal trackers, contact the client, and issue the first invoice.</p>
            <p>I built this automation to turn that manual checklist into one governed workflow.</p>
            <p>When a signed PDF contract is uploaded to a designated Slack channel, the system extracts and validates the project data, checks whether the event has already been processed, creates the project infrastructure across connected business systems, and records a complete audit trail.</p>
            <div className="case-attributes">{cs.attributes.map((item) => <span key={item}>{item}</span>)}</div>
          </ScrollReveal>
          <ScrollReveal direction="right" distance={96}><OverviewFlow /></ScrollReveal>
        </div>
      </section>

      <section className="case-section">
        <SectionHeader title="The Problem" />
        <div className="case-two-column case-problem-columns">
          <ScrollReveal direction="left" distance={96}><p>New project onboarding involved multiple repetitive steps across disconnected tools:</p><ul className="case-check-list">{cs.problemItems.map((item) => <li key={item}>{item}</li>)}</ul></ScrollReveal>
          <ScrollReveal className="case-copy" direction="right" distance={96}>
            <p>Although the process was mostly deterministic, completing these repetitive steps manually was not an effective use of time. That effort could be better spent on higher-value project work, while manual handoffs also increased the risk of delays, duplicate records, missing information, and inconsistent project setup.</p>
            <p>The workflow also needed to validate incoming data, prevent repeated processing, preserve execution history, and give an operator enough context to recover from partial failures.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="case-section case-solution">
        <SectionHeader title="The Solution" intro="The automation uses Slack as the entry point for a new signed contract and coordinates the complete onboarding sequence across operational and financial systems." />
        <ScrollReveal><WorkflowSnake /></ScrollReveal>
        <ScrollReveal delay={0.08}>
          <div className="integration-panel case-hover-card" data-spotlight>
            <div className="integration-grid">{cs.integrations.map(([name, purpose]) => <article className="integration-card" data-spotlight key={name}><h3>{name}</h3><p>{purpose}</p></article>)}</div>
          </div>
        </ScrollReveal>
      </section>

      <section className="case-section" id="architecture">
        <SectionHeader title="Architecture" />
        <div className="case-two-column architecture-intro">
          <ScrollReveal direction="left" distance={96}><p>The system follows an orchestrator pattern. The main workflow owns input normalization, validation, deduplication, sequencing, and accumulated workflow state. Focused sub-workflows own separate business responsibilities and return results to the main process.</p></ScrollReveal>
          <ScrollReveal direction="right" distance={96}><p>Each sub-workflow receives the accumulated project state and returns the same state with its own result namespace. This keeps responsibilities separated while preserving all generated resource IDs for later steps and failure recovery.</p></ScrollReveal>
        </div>
        <ScrollReveal delay={0.08} className="architecture-grid">{cs.architectureComponents.map((component, index) => <ArchitectureCard key={component.title} title={component.title} copy={component.copy} image={architectureImages[index]} alt={`${component.title} workflow`} />)}</ScrollReveal>
      </section>

      <section className="case-section">
        <SectionHeader title="Engineering Decisions" />
        <div className="case-two-column decision-columns">
          {[cs.decisions.slice(0, 3), cs.decisions.slice(3)].map((column, columnIndex) => <ScrollReveal className="decision-column" direction={columnIndex === 0 ? "left" : "right"} distance={96} key={columnIndex}>{column.map(([title, copy], index) => <article className="decision-item" key={title}><span>{String(columnIndex * 3 + index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</ScrollReveal>)}
        </div>
      </section>

      <section className="case-section">
        <SectionHeader title="Reliability and Safety" intro="Connecting APIs is only part of the automation. The system also needs to show what happened, what succeeded, what failed, and whether repeating an action is safe." />
        <ScrollReveal><ErrorTypeMarquee /></ScrollReveal>
        <ScrollReveal delay={0.06} className="reliability-grid">{cs.reliability.map(([title, copy]) => <article className="case-hover-card" data-spotlight key={title}><h3>{title}</h3><p>{copy}</p></article>)}</ScrollReveal>
        <ScrollReveal delay={0.1}><FailurePipeline /></ScrollReveal>
      </section>

      <section className="case-section">
        <SectionHeader title="Results" intro="A successful contract creates the operational, financial, and communication artifacts required to begin project delivery." />
        <ScrollReveal className="outputs-columns">{[cs.outputs.slice(0, 4), cs.outputs.slice(4, 7), cs.outputs.slice(7)].map((column, index) => <div key={index}>{column.map((output) => <p key={output}><span aria-hidden="true">✓</span>{output}</p>)}</div>)}</ScrollReveal>
      </section>

      <section className="case-section case-testing">
        <SectionHeader title="Testing" intro="The workflow was tested with valid contracts, malformed inputs, missing fields, replayed events, downstream failures, and failures inside the error-handling path." />
        <div className="test-matrix-grid">
          {testTables.map((tests, tableIndex) => (
            <ScrollReveal direction={tableIndex === 0 ? "left" : "right"} distance={96} key={tableIndex}>
              <div className="test-matrix case-hover-card" data-spotlight role="region" aria-label={`Workflow test matrix, part ${tableIndex + 1}`} tabIndex={0}>
                <table><thead><tr><th>Scenario</th><th>Expected behavior</th></tr></thead><tbody>{tests.map(([scenario, expected]) => <tr key={scenario}><td>{scenario}</td><td>{expected}</td></tr>)}</tbody></table>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="case-section">
        <SectionHeader title="Outcome" />
        <ScrollReveal className="case-copy outcome-copy"><p>The completed system demonstrates how a repetitive operational checklist can be transformed into a maintainable, observable, and reusable automation.</p><p>It provides consistent setup across multiple platforms, validation before side effects, duplicate protection, traceable execution, centralized failure notifications, and clear recovery context.</p></ScrollReveal>
        <ScrollReveal delay={0.08}><CapabilityMarquee /></ScrollReveal>
      </section>

      <section className="case-closing-statement">
        <ParticleDivider collisionPadding={18} />
      </section>

      <ScrollReveal>
        <section className="case-final-cta case-hover-card" data-spotlight>
          <p className="eyebrow">EXPLORE THE IMPLEMENTATION</p><KineticHeading>Review the complete system.</KineticHeading><p>Review the exported n8n workflows, architecture documentation, test fixtures, sample contracts, outputs, and error-handling design in the repository.</p>
          <div><a className="button button-primary" href={project.githubUrl} rel="noreferrer" target="_blank"><Icon name="github" size={18} />View on GitHub</a><a className="button button-resume" href="/#projects">Back to Projects</a></div>
        </section>
      </ScrollReveal>
    </main>
  );
}
