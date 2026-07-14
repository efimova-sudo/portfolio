import { useEffect } from "react";
import { aiClientDeliveryKitCaseStudy as cs } from "../../content/aiClientDeliveryKitCaseStudy";
import type { Project } from "../../types/content";
import { Icon } from "../ui/Icon";
import { KineticHeading } from "../ui/KineticHeading";
import { ScrollReveal } from "../ui/ScrollReveal";

type Props = { project: Project };

function SectionHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="dk-section-header">
      <div className="dk-title-line">
        <KineticHeading>{title}</KineticHeading>
        <span aria-hidden="true" />
      </div>
      {intro ? <p>{intro}</p> : null}
    </header>
  );
}

function TagList({ items, label }: { items: readonly string[]; label: string }) {
  return <ul className="dk-tags" aria-label={label}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function TestTable({ tests, index }: { tests: readonly (readonly [string, string])[]; index: number }) {
  return (
    <div className="dk-test-table" role="region" aria-label={`Test matrix part ${index}`} tabIndex={0}>
      <table>
        <thead><tr><th>Scenario</th><th>Expected behavior</th></tr></thead>
        <tbody>{tests.map(([scenario, expected]) => <tr key={scenario}><td>{scenario}</td><td>{expected}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function useMetadata(project: Project) {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    document.title = "AI Client Delivery Kit Case Study | Anastasia Efimova";
    if (description) description.content = project.detailDescription ?? project.shortDescription;
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, [project]);
}

export function AiClientDeliveryKitPage({ project }: Props) {
  useMetadata(project);
  const testTables = [cs.tests.slice(0, 6), cs.tests.slice(6)];

  return (
    <main className="delivery-kit-case">
      <section className="dk-hero">
        <a className="project-back-link" href="/#projects"><Icon name="arrow-right" size={16} />Back to projects</a>
        <div className="dk-hero-grid">
          <div className="dk-hero-copy">
            <p className="eyebrow">AI DELIVERY OPERATIONS · PROMPT OPS · GITHUB AUTOMATION</p>
            <KineticHeading as="h1" hero><span>AI Client</span><span>Delivery Kit</span></KineticHeading>
            <p className="dk-hero-summary">A reusable, reviewable, and client-safe operating system for packaging AI-assisted delivery across prompts, automation, validation, and handoff.</p>
            <div className="dk-actions">
              <a className="button button-primary" href={project.githubUrl} rel="noreferrer" target="_blank"><Icon name="github" size={18} />View on GitHub</a>
              <a className="button button-resume" href="#solution">Explore the system</a>
            </div>
          </div>
          <aside className="dk-facts" data-spotlight>
            <div className="dk-facts-header"><span>PROJECT FACTS</span><span><i />PUBLIC TOOLKIT · v0.2.0</span></div>
            <div className="dk-fact"><small>ROLE</small><strong>{cs.role}</strong></div>
            <div className="dk-fact"><small>PROJECT TYPE</small><strong>{cs.projectType}</strong></div>
            <div className="dk-fact"><small>STACK</small><TagList items={cs.stack} label="Technology stack" /></div>
          </aside>
        </div>
        <ScrollReveal>
          <div className="dk-operating-model" data-spotlight>
            <div className="dk-panel-heading"><span>CLIENT DELIVERY OPERATING MODEL</span><strong>DRY-RUN FIRST / REVIEW GATED</strong></div>
            <div className="dk-model-flow">
              {[
                ["01", "Client config", "Approved context, scope and controls"],
                ["02", "Prompt library", "Versioned tasks with review criteria"],
                ["03", "Validate + automate", "Tests, CI and GitHub digest"],
                ["04", "Deliver + hand off", "Reviewed outputs and operating docs"],
              ].map(([number, title, copy], index) => <div className="dk-model-group" key={title}><article><span>{number}</span><h2>{title}</h2><p>{copy}</p></article>{index < 3 ? <b aria-hidden="true">→</b> : null}</div>)}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="dk-section">
        <SectionHeader title="Overview" />
        <div className="dk-two-column">
          <ScrollReveal className="dk-copy" direction="left" distance={72}>
            <p>AI-assisted client work often begins as effective but one-off chat activity. The outputs may be useful, yet the process is difficult to inspect, repeat, adapt, or hand over safely.</p>
            <p>I built this kit as a compact operating pattern for client delivery: approved context enters through configuration, reusable prompts define the work, automation validates the system, and every external deliverable passes through explicit review and handoff controls.</p>
            <TagList items={cs.attributes} label="Project attributes" />
          </ScrollReveal>
          <ScrollReveal direction="right" distance={72}>
            <div className="dk-flow-card" data-spotlight>{cs.flowSummary.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div>
          </ScrollReveal>
        </div>
      </section>

      <section className="dk-section">
        <SectionHeader title="The Problem" />
        <div className="dk-two-column">
          <ScrollReveal direction="left" distance={72}>
            <p className="dk-column-intro">Without a delivery system, high-value AI work remains fragile:</p>
            <ul className="dk-arrow-list">{cs.problemItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </ScrollReveal>
          <ScrollReveal direction="right" distance={72}>
            <article className="dk-challenge" data-spotlight>
              <span>DESIGN CHALLENGE</span>
              <h3>Make AI delivery repeatable without turning a lightweight workflow into a heavy platform.</h3>
              <i aria-hidden="true" />
              <p>The system needed explicit inputs and outputs, prompt metadata, dry-run automation, network-free tests, least-privilege guidance, human review, and a handoff package that another delivery owner could operate.</p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="dk-section" id="solution">
        <SectionHeader title="The Solution" intro="A configurable delivery pipeline that keeps client context, prompt operations, automation, review, and handoff connected — but independently inspectable." />
        <ScrollReveal><div className="dk-sequence" data-spotlight>
          <div className="dk-panel-heading"><span>END-TO-END DELIVERY SEQUENCE</span><strong>8 GOVERNED STEPS</strong></div>
          <ol>{cs.deliverySteps.map(([number, label]) => <li key={number}><span>{number}</span><b>{label}</b></li>)}</ol>
        </div></ScrollReveal>
        <ScrollReveal delay={0.06}><div className="dk-platforms">{cs.platforms.map(([name, purpose]) => <article key={name}><h3>{name}</h3><p>{purpose}</p></article>)}</div></ScrollReveal>
      </section>

      <section className="dk-section">
        <SectionHeader title="Architecture" />
        <div className="dk-two-column dk-architecture-intro"><p>The kit separates reusable delivery logic from client-specific configuration. Prompts and scripts can evolve in version control while approved context remains explicit and local.</p><p>Human review is a system boundary, not an afterthought. Automation prepares and validates outputs; a delivery owner remains responsible for approval and external sharing.</p></div>
        <ScrollReveal><div className="dk-architecture" data-spotlight>{cs.architecture.map((layer, index) => <div className="dk-architecture-group" key={layer.title}><article><h3>{layer.title}</h3>{layer.items.map(([name, copy]) => <div key={name}><strong>{name}</strong><span>{copy}</span></div>)}</article>{index < cs.architecture.length - 1 ? <b aria-hidden="true">›</b> : null}</div>)}</div></ScrollReveal>
      </section>

      <section className="dk-section">
        <SectionHeader title="Engineering Decisions" />
        <div className="dk-decisions">{cs.decisions.map(([title, copy], index) => <ScrollReveal direction={index < 3 ? "left" : "right"} distance={56} key={title}><article><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article></ScrollReveal>)}</div>
      </section>

      <section className="dk-section">
        <SectionHeader title="Reliability and Safety" intro="The project treats safe data handling, predictable execution, and reviewability as product requirements — not deployment notes." />
        <ScrollReveal><div className="dk-safety-grid">{cs.safetyControls.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></ScrollReveal>
        <ScrollReveal delay={0.06}><div className="dk-review-flow" data-spotlight>{cs.reviewFlow.map((item, index) => <div className="dk-review-group" key={item}><strong>{item}</strong>{index < cs.reviewFlow.length - 1 ? <span aria-hidden="true">→</span> : null}</div>)}</div></ScrollReveal>
        <TagList items={cs.safetyTags} label="Safety controls" />
      </section>

      <section className="dk-section">
        <SectionHeader title="Results" intro="The finished repository packages the operational assets required to adapt, validate, run, review, and transfer an AI-assisted client delivery workflow." />
        <div className="dk-outputs">{[cs.outputs.slice(0, 3), cs.outputs.slice(3, 6), cs.outputs.slice(6)].map((column, index) => <div key={index}>{column.map((item) => <p key={item}><span>✓</span>{item}</p>)}</div>)}</div>
      </section>

      <section className="dk-section">
        <SectionHeader title="Testing" intro="Twelve unit tests cover prompt contracts, dry-run behavior, GitHub request construction, filtering, rate limits, and missing credentials — without requiring live network access." />
        <div className="dk-test-grid">{testTables.map((tests, index) => <ScrollReveal direction={index === 0 ? "left" : "right"} distance={64} key={index}><TestTable index={index + 1} tests={tests} /></ScrollReveal>)}</div>
      </section>

      <section className="dk-section">
        <SectionHeader title="Outcome" />
        <div className="dk-outcome-copy"><p>The kit turns AI delivery from a sequence of private chats into an inspectable system that can be reviewed, adapted, tested, and owned by more than one person.</p><p>It demonstrates practical prompt operations, lightweight automation, explicit safety controls, least-privilege integration guidance, and delivery documentation — without claiming autonomous production behavior or using real client data.</p></div>
        <TagList items={cs.capabilities} label="Demonstrated capabilities" />
      </section>

      <ScrollReveal>
        <section className="dk-final-cta" data-spotlight>
          <p className="eyebrow">EXPLORE THE IMPLEMENTATION</p>
          <KineticHeading>Review the complete delivery system.</KineticHeading>
          <p>Explore the prompts, client configuration, Python automation, GitHub Actions, tests, sample outputs, and handoff documentation in the repository.</p>
          <div className="dk-actions"><a className="button button-primary" href={project.githubUrl} rel="noreferrer" target="_blank"><Icon name="github" size={18} />View on GitHub</a><a className="button button-resume" href="/#projects">Back to Projects</a></div>
        </section>
      </ScrollReveal>
    </main>
  );
}
