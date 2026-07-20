import type { Project } from "../types/content";
import casaBawiPreview from "../assets/images/casa-bawi/casa-bawi-preview.png";
import {
  mainOrchestration,
  mainOverview,
  mainValidationAndDeduplication as validationAndDeduplication,
  subProjectWorkspace as projectWorkspace,
  sysErrorHandler as errorHandler,
} from "../assets/images/project-onboarding-automation";

export const projects: Project[] = [
  {
    id: "ai-client-delivery-kit",
    slug: "ai-client-delivery-kit",
    title: "AI Client Delivery Kit",
    shortDescription: "A reusable, reviewable, and client-safe operating system for packaging AI-assisted delivery across prompts, automation, validation, and handoff.",
    detailDescription: "A compact delivery-operations toolkit that turns one-off AI work into a versioned, testable, review-gated system with client configuration, prompt operations, GitHub automation, security controls, and handoff documentation.",
    problem: "AI-assisted client work often starts as useful but unstructured chat activity that is difficult to review, repeat, adapt, secure, or transfer to another owner.",
    solution: "A configurable delivery kit combines versioned prompts, explicit client context, dry-run Python automation, CI validation, quality review, sample outputs, and security-first handoff guidance.",
    role: "Designed the delivery operating model, prompt library conventions, client configuration contract, Python automation, GitHub Actions workflows, test suite, security posture, sample outputs, and handoff documentation.",
    technologies: ["Python", "YAML", "GitHub Actions", "Claude", "ChatGPT", "GitHub MCP", "pytest"],
    githubUrl: "https://github.com/efimova-sudo/ai-client-delivery-kit",
  },
  {
    id: "project-onboarding-automation",
    slug: "project-onboarding-automation",
    title: "Project Onboarding Automation",
    shortDescription: "An end-to-end n8n workflow that converts a signed contract into a fully initialized project across multiple business systems.",
    detailDescription: "An end-to-end n8n system that turns a signed contract into a fully initialized project across Slack, Google Drive, QuickBooks, Google Sheets, and Gmail—with validation, duplicate protection, audit logging, and centralized error handling.",
    problem: "Project managers repeatedly perform the same deterministic checklist after every signed contract: create the project workspace, upload the contract, prepare financial and material records, send client communications, update tracking sheets, and issue the deposit invoice. Manual execution is slow and creates opportunities for missed or duplicated steps.",
    solution: "A governed n8n automation watches Slack for signed PDF contracts, extracts structured project data, validates required fields, deduplicates by Slack event ID, and delegates external side effects to focused sub-workflows. It creates the Drive workspace, QuickBooks records, finish-material sheet, welcome email, PM tracker row, and deposit invoice while maintaining run-level audit records and centralized Slack error notifications.",
    role: "Designed and implemented the end-to-end automation architecture, n8n orchestration and sub-workflows, API integrations, deterministic PDF extraction, validation, idempotency, audit logging, error handling, test fixtures, and technical documentation.",
    technologies: ["n8n", "JavaScript", "Slack", "QuickBooks Online", "Google Drive", "Google Sheets", "Gmail", "REST APIs"],
    architecture: {
      summary: "An orchestrator workflow owns validation, deduplication, sequencing, and final state. Cohesive sub-workflows own Drive, QuickBooks, and material-sheet operations; shared system workflows own audit logging and error handling.",
      steps: [
        "Receive and download a signed PDF contract from Slack.",
        "Extract and validate client, project, milestone, and finish-material data before side effects.",
        "Check the Slack event ID against the audit store to prevent duplicate processing.",
        "Create the Google Drive workspace and upload the signed contract.",
        "Create QuickBooks customer, project, estimate, and deposit-invoice records.",
        "Create the finish-material sheet, send the Gmail welcome email, and update the PM dashboard.",
        "Record run and step-level audit context and route failures to a shared Slack error handler.",
      ],
      image: { src: mainOrchestration, alt: "Main n8n project onboarding orchestration workflow" },
    },
    githubUrl: "https://github.com/efimova-sudo/project-onboarding-automation",
    images: [
      { src: mainOverview, alt: "Complete n8n onboarding automation workflow overview" },
      { src: mainOrchestration, alt: "Main orchestration workflow in n8n" },
      { src: validationAndDeduplication, alt: "Validation and duplicate prevention workflow" },
      { src: projectWorkspace, alt: "Google Drive project workspace sub-workflow" },
      { src: errorHandler, alt: "Shared n8n system error handler workflow" },
    ],
  },
  {
    id: "casa-bawi",
    slug: "casa-bawi",
    title: "Casa Bawi Website",
    shortDescription: "A modern, responsive website concept for Casa Bawi, designed and developed to present the brand with a polished visual system, clear content flow, and smooth user experience.",
    detailDescription: "A brand-forward website for Casa Bawi combining visual direction, responsive interface design, and frontend implementation into a polished web presence.",
    problem: "Casa Bawi needed a refined digital presence that could communicate the atmosphere of the brand, organize key content clearly, and feel crafted across desktop and mobile screens.",
    solution: "Designed and built a responsive website with a strong visual identity, structured sections, focused calls to action, and a production deployment on Vercel.",
    role: "Developer and designer.",
    technologies: ["React", "TypeScript", "CSS", "Responsive Design", "Vercel"],
    githubUrl: "https://github.com/lucabudgen2-lang/casa-bawi-8",
    demoUrl: "https://casa-bawi-8.vercel.app/",
    hasCaseStudy: false,
    images: [
      { src: casaBawiPreview, alt: "Casa Bawi website preview" },
    ],
  },
];
