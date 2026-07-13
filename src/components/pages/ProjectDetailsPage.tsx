import { useEffect } from "react";
import { onboardingCaseStudy as cs } from "../../content/projectOnboardingCaseStudy";
import type { Project } from "../../types/content";
import { Icon } from "../ui/Icon";

type Props = { project?: Project };
const architectureFlow = ["Slack contract", "Extract + normalize", "Validate fields", "Duplicate check", "Open audit run", "Drive workspace", "QuickBooks records", "Material sheet", "Welcome email", "PM dashboard", "Deposit invoice", "Close audit run"];
const failureFlow = ["Raw n8n error", "Extract execution context", "Classify error", "Build normalized failure", "Append audit event", "Update run status", "Send Slack alert"];
const stateExample = { run_id: "RUN-example", workspace: { folder_id: "example", upload_id: "example" }, qb: { customer_id: "example", project_id: "example", estimate_id: "example" }, fm: { sheet_id: "example", sheet_url: "example" } };
const failureExample = { run_id: "RUN-example", failed_step: "QB_ESTIMATE_CREATED", error_type: "API_TRANSIENT", retryable: true, created_resources: { drive_folder_id: "example", qb_project_id: "example" } };

function Flow({ items, compact = false }: { items: readonly string[]; compact?: boolean }) {
  return <div aria-label={items.join(" then ")} className={`case-flow${compact ? " case-flow-compact" : ""}`}>{items.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < items.length - 1 ? <i aria-hidden="true">↓</i> : null}</div>)}</div>;
}

function CaseImage({ src, alt, caption, priority = false }: { src: string; alt: string; caption: string; priority?: boolean }) {
  return <figure className="case-image"><a href={src} target="_blank" rel="noreferrer" aria-label={`${alt}. Open full-size image in a new tab.`}><img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" /></a><figcaption>{caption}</figcaption></figure>;
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
    Object.entries(social).forEach(([property, content]) => { let node = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`); if (!node) { node = document.createElement("meta"); node.setAttribute("property", property); document.head.appendChild(node); created.push(node); } node.content = content; });
    return () => { document.title = oldTitle; if (meta && oldDescription) meta.content = oldDescription; created.forEach((node) => node.remove()); };
  }, [project]);
}

export function ProjectDetailsPage({ project }: Props) {
  useMetadata(project);
  if (!project) return <main className="project-detail project-detail-missing"><p className="eyebrow">PROJECT NOT FOUND</p><h1>That project doesn’t exist.</h1><a className="button button-primary" href="/#projects">Back to projects</a></main>;
  const v = cs.visuals;

  return <main className="project-detail case-study">
    <section className="project-detail-hero">
      <a className="project-back-link" href="/#projects"><Icon name="arrow-right" size={16} />Back to projects</a>
      <div className="case-hero-grid">
        <div className="case-hero-copy">
          <p className="eyebrow">WORKFLOW AUTOMATION · SYSTEMS INTEGRATION</p>
          <h1><span>Project</span><span>Onboarding</span><span>Automation</span></h1>
          <p className="project-detail-summary">{cs.heroIntro}</p>
          <div className="project-detail-actions"><a className="button button-primary" href={project.githubUrl} rel="noreferrer" target="_blank"><Icon name="github" size={18} />View on GitHub</a><a className="button button-resume" href="#architecture">Explore the Workflow</a></div>
        </div>
        <aside className="case-facts" data-spotlight>
          <div className="case-facts-header"><span>PROJECT FACTS</span><span><i />SANDBOX-READY</span></div>
          <div className="case-fact-row"><small>ROLE</small><strong>{cs.role}</strong></div>
          <div className="case-fact-row"><small>PROJECT TYPE</small><strong>{cs.projectType}</strong></div>
          <div className="case-fact-row case-fact-stack"><small>STACK</small><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
        </aside>
      </div>
      {project.images?.[0] ? <CaseImage src={project.images[0].src} alt="n8n workflow overview showing the complete project onboarding process from a signed Slack contract to project setup and audit completion" caption="End-to-end orchestration from signed contract intake to completed project setup." priority /> : null}
    </section>

    <section className="case-section case-overview"><header><p className="eyebrow">01 · OVERVIEW</p><h2>Overview</h2></header><div className="case-copy"><p>Project onboarding often requires a project manager to repeat the same operational checklist after every signed contract: create folders, upload documents, prepare financial records, generate project sheets, update internal trackers, contact the client, and issue the first invoice.</p><p>I built this automation to turn that manual checklist into one governed workflow.</p><p>When a signed PDF contract is uploaded to a designated Slack channel, the system extracts and validates the project data, checks whether the event has already been processed, creates the project infrastructure across connected business systems, and records a complete audit trail.</p><div className="case-attributes">{cs.attributes.map((item) => <span key={item}>{item}</span>)}</div></div><Flow items={cs.flowSummary} compact /></section>

    <section className="case-section"><header><p className="eyebrow">02 · BUSINESS CONTEXT</p><h2>The Problem</h2></header><div className="case-copy"><p>New project onboarding involved multiple repetitive steps across disconnected tools:</p><ul className="case-check-list">{cs.problemItems.map((item) => <li key={item}>{item}</li>)}</ul><p>Although the process was mostly deterministic, every manual handoff created opportunities for delays, duplicate records, missing information, and inconsistent project setup.</p><p>The workflow also needed to validate incoming data, prevent repeated processing, preserve execution history, and give an operator enough context to recover from partial failures.</p></div></section>

    <section className="case-section"><header><p className="eyebrow">03 · END-TO-END PROCESS</p><h2>The Solution</h2><p>The automation uses Slack as the entry point for a new signed contract and coordinates the complete onboarding sequence across operational and financial systems.</p></header><ol className="case-timeline">{cs.workflowSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol><div className="integration-grid">{cs.integrations.map(([name, purpose]) => <article data-spotlight key={name}><h3>{name}</h3><p>{purpose}</p></article>)}</div></section>

    <section className="case-section" id="architecture"><header><p className="eyebrow">04 · SYSTEM DESIGN</p><h2>System Architecture</h2><p>The system follows an orchestrator pattern. The main workflow owns input normalization, validation, deduplication, sequencing, and accumulated workflow state. Focused sub-workflows own separate business responsibilities and return results to the main process.</p></header><div className="architecture-grid">{cs.architectureComponents.map((component) => <article data-spotlight key={component.title}><h3>{component.title}</h3><p>{component.copy}</p></article>)}</div><div className="case-diagram-pair"><Flow items={architectureFlow} /><aside className="case-error-branch" data-spotlight><strong>Any unhandled downstream error</strong><span>↓</span><strong>SYS — Error Handler</strong><span>↓</span><p>Update audit state and notify the operator in Slack</p></aside></div><div className="case-state-note" data-spotlight><h3>Accumulated workflow state</h3><p>Project state is created once and passed through the workflow. Each sub-workflow appends its own result namespace, allowing later steps and the error handler to access IDs of resources already created.</p><pre><code>{JSON.stringify(stateExample, null, 2)}</code></pre><small>Sanitized illustrative state — no real resource IDs.</small></div></section>

    <section className="case-section"><header><p className="eyebrow">05 · WORKFLOW VISUALS</p><h2>Inside the Workflow</h2></header><div className="case-visual-grid"><CaseImage src={v.validationImage} alt="n8n workflow showing Slack intake, contract parsing, validation, and duplicate detection" caption="Validation and duplicate detection run before downstream resources are created." /><CaseImage src={v.workspaceImage} alt="n8n sub-workflow creating the Google Drive project workspace" caption="The workspace sub-workflow creates folders and uploads the contract." /><CaseImage src={v.quickBooksImage} alt="n8n sub-workflow creating QuickBooks records" caption="The QuickBooks sub-workflow owns financial record creation." /><CaseImage src={v.materialsImage} alt="n8n sub-workflow creating the finish material sheet" caption="The material-sheet sub-workflow writes extracted project materials." /><CaseImage src={v.auditImage} alt="n8n system audit service workflow" caption="A reusable system workflow records run-level and step-level history." /><CaseImage src={v.errorHandlerImage} alt="n8n shared error handler workflow" caption="The error workflow normalizes failures, updates audit state, and alerts the operator." /></div></section>

    <section className="case-section"><header><p className="eyebrow">06 · TECHNICAL TRADE-OFFS</p><h2>Key Engineering Decisions</h2></header><div className="case-card-grid">{cs.decisions.map(([title, copy], index) => <article data-spotlight key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="case-section"><header><p className="eyebrow">07 · RELIABILITY</p><h2>Built for Observable Failure, Not Silent Failure</h2><p>Connecting APIs is only part of the automation. The system also needs to show what happened, what succeeded, what failed, and whether repeating an action is safe.</p></header><div className="case-card-grid">{cs.reliability.map(([title, copy]) => <article data-spotlight key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="error-type-list">{cs.errorTypes.map((type) => <code key={type}>{type}</code>)}</div><div className="case-diagram-pair"><Flow items={failureFlow} /><pre className="case-code-card" data-spotlight><code>{JSON.stringify(failureExample, null, 2)}</code><small>Sanitized failure example</small></pre></div></section>

    <section className="case-section"><header><p className="eyebrow">08 · HUMAN-IN-THE-LOOP RECOVERY</p><h2>Operator-Facing Recovery Context</h2></header><div className="case-visual-grid"><CaseImage src={v.invalidPdfErrorImage} alt="Slack error notification for an invalid PDF structure" caption="Pre-run failures surface invalid input before project resources are created." /><CaseImage src={v.missingEmailErrorImage} alt="Slack validation error for a missing client email" caption="Required-field validation gives the operator a specific reason and recovery context." /></div><p className="case-note">An active-run partial-failure screenshot is not available in the repository. The workflow and test plan cover this path; a real sanitized capture will replace this note when available.</p></section>

    <section className="case-section"><header><p className="eyebrow">09 · AUDIT TRAIL</p><h2>Traceable from Trigger to Completion</h2></header><div className="audit-preview" data-spotlight role="region" aria-label="Sanitized audit record example" tabIndex={0}><table><thead><tr>{["run_id", "source_event_id", "status", "started_at", "finished_at", "last_completed_step", "failed_step"].map((field) => <th key={field}>{field}</th>)}</tr></thead><tbody><tr><td>RUN-example</td><td>event-example</td><td><strong>SUCCESS</strong></td><td>2026-06-01 10:00</td><td>2026-06-01 10:02</td><td>AUDIT_RUN_CLOSED</td><td>—</td></tr></tbody></table></div><p className="case-note">Sanitized structured preview based on the sample audit workbook. Run and step records preserve execution history and recovery context.</p></section>

    <section className="case-section"><header><p className="eyebrow">10 · OUTPUTS</p><h2>What a Successful Run Produces</h2><p>A successful contract creates the operational, financial, and communication artifacts required to begin project delivery.</p></header><div className="output-grid">{cs.outputs.map((output) => <div data-spotlight key={output}><span aria-hidden="true">✓</span><p>{output}</p></div>)}</div><div className="sample-result" data-spotlight><p className="eyebrow">FICTIONAL SAMPLE RESULT</p><div><span><small>PROJECT</small><strong>Maya Thompson · Kitchen Remodel</strong></span><span><small>CONTRACT TOTAL</small><strong>$52,500.00</strong></span><span><small>ESTIMATE ITEMS</small><strong>5</strong></span><span><small>DEPOSIT INVOICE</small><strong>$12,500.00</strong></span><span><small>FINAL STATUS</small><strong>SUCCESS</strong></span></div></div></section>

    <section className="case-section"><header><p className="eyebrow">11 · VERIFICATION</p><h2>Testing Beyond the Happy Path</h2><p>The workflow was tested with valid contracts, malformed inputs, missing fields, replayed events, downstream failures, and failures inside the error-handling path.</p></header><div className="test-matrix" data-spotlight role="region" aria-label="Workflow test matrix" tabIndex={0}><table><thead><tr><th>Scenario</th><th>Expected behavior</th></tr></thead><tbody>{cs.tests.map(([scenario, expected]) => <tr key={scenario}><td>{scenario}</td><td>{expected}</td></tr>)}</tbody></table></div><p className="case-note">Test artifacts are available in <code>examples/test-contracts</code>, together with the acceptance plan and synthetic fixtures.</p></section>

    <section className="case-section"><header><p className="eyebrow">12 · BOUNDARIES</p><h2>Scope and Current Limitations</h2></header><div className="scope-grid"><article data-spotlight><h3>Included</h3><ul>{cs.included.map((item) => <li key={item}>{item}</li>)}</ul></article><article data-spotlight><h3>Not included</h3><ul>{cs.excluded.map((item) => <li key={item}>{item}</li>)}</ul></article></div><p className="case-note">These boundaries are intentional. The project focuses on transparent, testable workflow orchestration and a safe recovery model rather than hiding complexity behind uncontrolled automation.</p></section>

    <section className="case-section"><header><p className="eyebrow">13 · OUTCOME</p><h2>Outcome</h2></header><div className="case-copy"><p>The completed system demonstrates how a repetitive operational checklist can be transformed into a maintainable, observable, and reusable automation.</p><p>It provides consistent setup across multiple platforms, validation before side effects, duplicate protection, traceable execution, centralized failure notifications, and clear recovery context.</p><p>The project is a sandbox-ready portfolio implementation rather than a production deployment, but its structure reflects production-oriented automation practices.</p></div><div className="capability-grid">{cs.capabilities.map((item) => <span key={item}>{item}</span>)}</div></section>

    <section className="case-final-cta"><p className="eyebrow">EXPLORE THE IMPLEMENTATION</p><h2>Review the complete system.</h2><p>Review the exported n8n workflows, architecture documentation, test fixtures, sample contracts, outputs, and error-handling design in the repository.</p><div><a className="button button-primary" href={project.githubUrl} rel="noreferrer" target="_blank"><Icon name="github" size={18} />View on GitHub</a><a className="button button-resume" href="/#projects">Back to Projects</a></div></section>
  </main>;
}
