import type { SkillCategory } from "../types/content";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-automation",
    title: "AI & Automation",
    skills: [
      { name: "n8n" },
      { name: "LLM workflows" },
      { name: "Prompt engineering" },
      { name: "AI agents fundamentals" },
      { name: "RAG fundamentals" },
      { name: "Workflow automation" },
      { name: "Human-in-the-loop" },
      { name: "Error handling" },
      { name: "Logging" },
      { name: "Codex" },
      { name: "Claude" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: ".NET/C#" },
      { name: "ASP.NET Core" },
      { name: "Python" },
      { name: "JavaScript" },
    ],
  },
  {
    id: "apis-integrations",
    title: "APIs & Integrations",
    skills: [
      { name: "REST APIs" },
      { name: "Webhooks" },
      { name: "GoHighLevel" },
      { name: "QuickBooks" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [{ name: "SQL" }],
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    skills: [{ name: "Azure" }, { name: "AWS" }, { name: "Docker" }],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Cursor" },
      { name: "Replit" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "WordPress" },
      { name: "Jira" },
      { name: "ClickUp" },
      { name: "Notion" },
      { name: "Trello" },
      { name: "Slack" },
      { name: "Figma" },
      { name: "Miro" },
    ],
  },
];

export const softSkills = [
  "Analytical thinking",
  "Problem-solving",
  "Fast learning",
  "Technical communication",
  "Cross-functional collaboration",
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "Fluent" },
  { name: "Russian", level: "Native" },
];
