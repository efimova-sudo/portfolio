import type { Project } from "../types/content";
import mainOverview from "../assets/projects/project-onboarding-automation/main-overview.png";
import mainOrchestration from "../assets/projects/project-onboarding-automation/main-orchestration.png";
import validationAndDeduplication from "../assets/projects/project-onboarding-automation/main-validation-and-deduplication.png";
import projectWorkspace from "../assets/projects/project-onboarding-automation/sub-project-workspace.png";
import errorHandler from "../assets/projects/project-onboarding-automation/sys-error-handler.png";
import slackError from "../assets/projects/project-onboarding-automation/error-client-email-not-found.png";

export const projects: Project[] = [
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
      { src: slackError, alt: "Operator-facing missing client email error in Slack" },
    ],
  },
];
