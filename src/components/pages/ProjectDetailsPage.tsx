import { useEffect } from "react";
import { onboardingCaseStudy as cs } from "../../content/projectOnboardingCaseStudy";
import type { Project } from "../../types/content";
import { Icon } from "../ui/Icon";

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
    <figure className="case-image">
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
      <div className="case-title-line"><h2>{title}</h2><span aria-hidden="true" /></div>
      {intro ? <p>{intro}</p> : null}
    </header>
  );
}

function OverviewFlow() {
  return (
    <div className="overview-flow-panel" aria-label={cs.flowSummary.join(" then ")}>
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
  return (
    <div className="workflow-snake" aria-label="Detailed workflow sequence">
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
    <article className="architecture-card" data-spotlight>
      <div className="architecture-media"><img src={image} alt={alt} loading="lazy" decoding="async" /></div>
      <div className="architecture-card-body"><h3>{title}</h3><span aria-hidden="true" /><p>{copy}</p></div>
    </article>
  );
}

function FailurePipeline() {
  return (
    <div className="failure-pipeline" aria-label={failureFlow.join(" then ")}>
      {failureFlow.map((step, index) => (
        <div className="failure-pipeline-group" key={step}>
          <strong>{step}</strong>
          {index < failureFlow.length - 1 ? <span aria-hidden="true">→</span> : null}
        </div>
      ))}
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

  return (
    <main className="project-detail case-study">
      <section className="project-detail-hero">
        <a className="project-back-link" href="/#projects"><Icon name="arrow-right" size={16} />Back to projects</a>
        <div className="case-hero-grid">
          <div className="case-hero-copy">
            <p className="eyebrow">WORKFLOW AUTOMATION · SYSTEMS INTEGRATION</p>
            <h1><span>Project</span><span>Onboarding</span><span>Automation</span></h1>
            <p className="project-detail-summary">{cs.heroIntro}</p>
            <div className="project-detail-actions">
              <a className="button button-primary" href={project.githubUrl} rel="noreferrer" target="_blank"><Icon name="github" size={18} />View on GitHub</a>
              <a className="button button-resume" href="#architecture">Explore the Workflow</a>
            </div>
          </div>
          <aside className="case-facts" data-spotlight>
            <div className="case-facts-header"><span>PROJECT FACTS</span><span><i />LIVE WORKFLOW</span></div>
            <div className="case-fact-row"><small>ROLE</small><strong>{cs.role}</strong></div>
            <div className="case-fact-row"><small>PROJECT TYPE</small><strong>{cs.projectType}</strong></div>
            <div className="case-fact-row case-fact-stack"><small>STACK</small><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
          </aside>
        </div>
        {project.images?.[0] ? <CaseImage src={project.images[0].src} alt="Complete project onboarding workflow overview" caption="End-to-end orchestration from signed contract intake to completed project setup." priority /> : null}
      </section>

      <section className="case-section case-overview">
        <SectionHeader title="Overview" />
        <div className="case-two-column case-overview-content">
          <div className="case-copy">
            <p>Project onboarding often requires a project manager to repeat the same operational checklist after every signed contract: create folders, upload documents, prepare financial records, generate project sheets, update internal trackers, contact the client, and issue the first invoice.</p>
            <p>I built this automation to turn that manual checklist into one governed workflow.</p>
            <p>When a signed PDF contract is uploaded to a designated Slack channel, the system extracts and validates the project data, checks whether the event has already been processed, creates the project infrastructure across connected business systems, and records a complete audit trail.</p>
            <div className="case-attributes">{cs.attributes.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <OverviewFlow />
        </div>
      </section>

      <section className="case-section">
        <SectionHeader title="The Problem" />
        <div className="case-two-column case-problem-columns">
          <div><p>New project onboarding involved multiple repetitive steps across disconnected tools:</p><ul className="case-check-list">{cs.problemItems.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="case-copy">
            <p>Although the process was mostly deterministic, completing these repetitive steps manually was not an effective use of time. That effort could be better spent on higher-value project work, while manual handoffs also increased the risk of delays, duplicate records, missing information, and inconsistent project setup.</p>
            <p>The workflow also needed to validate incoming data, prevent repeated processing, preserve execution history, and give an operator enough context to recover from partial failures.</p>
          </div>
        </div>
      </section>

      <section className="case-section case-solution">
        <SectionHeader title="The Solution" intro="The automation uses Slack as the entry point for a new signed contract and coordinates the complete onboarding sequence across operational and financial systems." />
        <WorkflowSnake />
        <div className="integration-panel">
          <div className="integration-grid">{cs.integrations.map(([name, purpose]) => <article key={name}><h3>{name}</h3><p>{purpose}</p></article>)}</div>
        </div>
      </section>

      <section className="case-section" id="architecture">
        <SectionHeader title="Architecture" />
        <div className="case-two-column architecture-intro">
          <p>The system follows an orchestrator pattern. The main workflow owns input normalization, validation, deduplication, sequencing, and accumulated workflow state. Focused sub-workflows own separate business responsibilities and return results to the main process.</p>
          <p>Each sub-workflow receives the accumulated project state and returns the same state with its own result namespace. This keeps responsibilities separated while preserving all generated resource IDs for later steps and failure recovery.</p>
        </div>
        <div className="architecture-grid">{cs.architectureComponents.map((component, index) => <ArchitectureCard key={component.title} title={component.title} copy={component.copy} image={architectureImages[index]} alt={`${component.title} workflow`} />)}</div>
      </section>

      <section className="case-section">
        <SectionHeader title="Engineering Decisions" />
        <div className="case-two-column decision-columns">
          {[cs.decisions.slice(0, 3), cs.decisions.slice(3)].map((column, columnIndex) => <div key={columnIndex}>{column.map(([title, copy], index) => <article className="decision-item" key={title}><span>{String(columnIndex * 3 + index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>)}
        </div>
      </section>

      <section className="case-section">
        <SectionHeader title="Reliability and Safety" intro="Connecting APIs is only part of the automation. The system also needs to show what happened, what succeeded, what failed, and whether repeating an action is safe." />
        <div className="error-type-list">{cs.errorTypes.map((type) => <code key={type}>{type}</code>)}</div>
        <div className="reliability-grid">{cs.reliability.map(([title, copy]) => <article data-spotlight key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <FailurePipeline />
      </section>

      <section className="case-section">
        <SectionHeader title="Results" intro="A successful contract creates the operational, financial, and communication artifacts required to begin project delivery." />
        <div className="outputs-columns">{[cs.outputs.slice(0, 4), cs.outputs.slice(4, 7), cs.outputs.slice(7)].map((column, index) => <div key={index}>{column.map((output) => <p key={output}><span aria-hidden="true">✓</span>{output}</p>)}</div>)}</div>
      </section>

      <section className="case-section case-testing">
        <SectionHeader title="Testing" intro="The workflow was tested with valid contracts, malformed inputs, missing fields, replayed events, downstream failures, and failures inside the error-handling path." />
        <div className="test-matrix" data-spotlight role="region" aria-label="Workflow test matrix" tabIndex={0}>
          <table><thead><tr><th>Scenario</th><th>Expected behavior</th></tr></thead><tbody>{cs.tests.map(([scenario, expected]) => <tr key={scenario}><td>{scenario}</td><td>{expected}</td></tr>)}</tbody></table>
        </div>
      </section>

      <section className="case-section">
        <SectionHeader title="Outcome" />
        <div className="case-copy outcome-copy"><p>The completed system demonstrates how a repetitive operational checklist can be transformed into a maintainable, observable, and reusable automation.</p><p>It provides consistent setup across multiple platforms, validation before side effects, duplicate protection, traceable execution, centralized failure notifications, and clear recovery context.</p></div>
        <div className="capability-grid">{cs.capabilities.map((item) => <span key={item}>{item}</span>)}</div>
      </section>

      <section className="case-final-cta">
        <p className="eyebrow">EXPLORE THE IMPLEMENTATION</p><h2>Review the complete system.</h2><p>Review the exported n8n workflows, architecture documentation, test fixtures, sample contracts, outputs, and error-handling design in the repository.</p>
        <div><a className="button button-primary" href={project.githubUrl} rel="noreferrer" target="_blank"><Icon name="github" size={18} />View on GitHub</a><a className="button button-resume" href="/#projects">Back to Projects</a></div>
      </section>
    </main>
  );
}
