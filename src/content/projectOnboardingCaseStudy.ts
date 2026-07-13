import validationImage from "../assets/projects/project-onboarding-automation/main-validation-and-deduplication.png";
import workspaceImage from "../assets/projects/project-onboarding-automation/sub-project-workspace.png";
import quickBooksImage from "../assets/projects/project-onboarding-automation/sub-quickbooks-record.png";
import materialsImage from "../assets/projects/project-onboarding-automation/sub-finish-material-sheet.png";
import auditImage from "../assets/projects/project-onboarding-automation/sys-audit-service.png";
import errorHandlerImage from "../assets/projects/project-onboarding-automation/sys-error-handler.png";
import invalidPdfErrorImage from "../assets/projects/project-onboarding-automation/error-invalid-pdf-structure.png";
import missingEmailErrorImage from "../assets/projects/project-onboarding-automation/error-client-email-not-found.png";

export const onboardingCaseStudy = {
  role: "Automation Engineer",
  projectType: "Business Process Automation and Systems Integration",
  heroIntro: "An end-to-end business automation that transforms a signed construction contract into a fully initialized project across operational, financial, and client communication systems.",
  attributes: ["6 connected systems", "Idempotent", "Audit logged", "Centralized error routing"],
  flowSummary: ["Signed contract", "Validate + deduplicate", "Create project workspace", "Financial setup", "Client communication", "Audit + completion"],
  problemItems: [
    "Creating a project folder and organizing the signed contract.",
    "Creating customer, project, estimate, and invoice records in QuickBooks.",
    "Preparing a finish material sheet.",
    "Sending the client welcome email.",
    "Updating the project management dashboard.",
    "Tracking what had already been completed.",
  ],
  workflowSteps: [
    "Download and parse the PDF contract.", "Normalize the client, project, milestone, and material data.",
    "Validate all required fields before creating external resources.", "Check the Slack event ID to prevent duplicate processing.",
    "Open an audit run.", "Create the project folder structure in Google Drive.", "Upload the signed contract.",
    "Create the customer, project, and estimate in QuickBooks.", "Generate the project finish material sheet.",
    "Send the client welcome email.", "Add the project to the internal PM dashboard.",
    "Create and send the deposit invoice.", "Close the audit run with the final workflow status.",
  ],
  integrations: [
    ["Slack", "Workflow trigger and contract intake"], ["n8n", "Workflow orchestration"],
    ["Google Drive", "Project workspace and document storage"], ["QuickBooks Online", "Customer, project, estimate, and invoice records"],
    ["Google Sheets", "Material sheet, PM dashboard, and audit records"], ["Gmail", "Client welcome email"],
  ],
  architectureComponents: [
    { title: "MAIN — New Project Onboarding", copy: "Owns Slack intake, PDF extraction, normalization, validation, deduplication, sequencing, inline communication and financial steps, and the final response." },
    { title: "SUB — Create Project Workspace", copy: "Creates the Google Drive folder structure and uploads the signed contract. Returns folder_id and upload_id." },
    { title: "SUB — Create QB Record", copy: "Creates the QuickBooks customer, project, and estimate. Returns customer_id, project_id, estimate_id, and estimate_number." },
    { title: "SUB — Create Finish Material Sheet", copy: "Creates the project material sheet, writes extracted rows, and returns sheet_id and sheet_url." },
    { title: "SYS — Audit Service", copy: "Provides reusable CREATE_RUN, APPEND_EVENT, and UPDATE_RUN operations." },
    { title: "SYS — Error Handler", copy: "Normalizes and classifies errors, updates audit state, and sends operator-facing Slack notifications." },
  ],
  decisions: [
    ["Deterministic parsing instead of unnecessary AI", "The workflow processes a known proposal template, so deterministic extraction and validation provide more predictable behavior than an LLM-based parser."],
    ["Orchestrator plus focused sub-workflows", "The main workflow coordinates the process while separate workflows own cohesive integration responsibilities."],
    ["Fail-fast validation before side effects", "Required fields are verified before Drive folders, QuickBooks records, emails, sheets, or invoices are created."],
    ["Idempotency through the source event ID", "The Slack event identifier is the deduplication key, so replaying the same event does not repeat downstream side effects."],
    ["Accumulated workflow state", "Every successful step returns the existing state plus its own result namespace for dependent steps, audit records, and recovery context."],
    ["Manual recovery instead of unsafe rollback", "Independent external platforms do not share a transaction boundary, so partial completion is recorded for informed recovery instead of unsafe automatic deletion."],
  ],
  reliability: [
    ["Fail-fast validation", "Missing client data, project details, milestones, or unsupported contract structures stop the process before external side effects."],
    ["Duplicate protection", "The source Slack event ID prevents repeated folders, records, messages, sheets, and invoices."],
    ["Centralized audit logging", "Run and step records track status, successful and failed steps, timestamps, and available resource identifiers."],
    ["Controlled retries", "Automatic retries are reserved for rate limits, timeouts, and selected server errors; invalid input and authentication failures require review."],
    ["Partial-failure awareness", "If a platform fails after earlier resources were created, the system records a partial failure instead of reporting the process as untouched."],
  ],
  errorTypes: ["VALIDATION_FAILED", "EXTRACTION_FAILED", "DUPLICATE_CONFLICT", "API_AUTH_FAILED", "API_RATE_LIMITED", "API_TRANSIENT", "API_PERMANENT", "DATA_CONTRACT_FAILED", "AUDIT_FAILED", "UNKNOWN"],
  tests: [
    ["Valid kitchen remodel contract", "Complete project setup and successful audit run"],
    ["Valid bathroom remodel contract", "Complete setup without relying on one hardcoded project type"],
    ["Valid sunroom contract", "Complete project setup with correct totals and deposit"],
    ["Invalid PDF binary", "Stop before audit run and notify Slack"],
    ["Unsupported contract layout", "Report extraction failure before creating resources"],
    ["Missing client email", "Report validation failure before external side effects"],
    ["Missing project type", "Report validation failure before external side effects"],
    ["Missing milestones", "Stop before financial records are created"],
    ["Replayed Slack event ID", "Skip repeated side effects"],
    ["Broken downstream credential", "Record partial failure and notify the operator"],
    ["Audit logging failure", "Still attempt Slack notification without an error loop"],
  ],
  outputs: ["Google Drive project folder created", "Signed contract uploaded", "QuickBooks customer created", "QuickBooks project created", "QuickBooks estimate created with milestone line items", "Finish material sheet created and populated", "Welcome email sent", "PM dashboard row added", "Deposit invoice created and sent", "Audit run closed with SUCCESS"],
  included: ["Deterministic parsing for a known proposal template", "Validation before downstream side effects", "Idempotent processing through the source event ID", "Drive, QuickBooks, Sheets, Gmail, and Slack integrations", "Run-level and step-level audit logging", "Centralized operator notifications", "Happy-path and failure-path fixtures", "Sandbox-ready workflow exports and synthetic examples"],
  excluded: ["AI interpretation of arbitrary contracts", "Automatic business decisions", "Automatic rollback across independent systems", "Fully automated resume-from-failure workflows", "Production deployment hardening", "A claim of live client production usage"],
  capabilities: ["Workflow architecture", "Separation of responsibilities", "API and platform integrations", "State management", "Idempotency", "Validation before side effects", "Audit logging and observability", "Failure classification", "Human-in-the-loop recovery", "Failure-path testing"],
  visuals: { validationImage, workspaceImage, quickBooksImage, materialsImage, auditImage, errorHandlerImage, invalidPdfErrorImage, missingEmailErrorImage },
} as const;
