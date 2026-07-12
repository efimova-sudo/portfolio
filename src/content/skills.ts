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
    id: "frameworks-apis",
    title: "Frameworks & APIs",
    skills: [
      { name: ".NET" },
      { name: "ASP.NET Core" },
      { name: "REST APIs" },
      { name: "Webhooks" },
      { name: "WordPress" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      { name: "MySQL" },
      { name: "SQL Server" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "SQLite" },
      { name: "Supabase" },
    ],
  },
  {
    id: "programming-web",
    title: "Programming & Web",
    skills: [
      { name: ".NET/C#" },
      { name: "Python" },
      { name: "JavaScript" },
      { name: "SQL" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    id: "cloud-development",
    title: "Cloud & Development Tools",
    skills: [
      { name: "Azure" },
      { name: "AWS" },
      { name: "Docker" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Replit" },
      { name: "Cursor" },
      { name: "Vercel" },
      { name: "Visual Studio" },
      { name: "VS Code" },
    ],
  },
  {
    id: "project-business-tools",
    title: "Project & Business Tools",
    skills: [
      { name: "Jira" },
      { name: "ClickUp" },
      { name: "Notion" },
      { name: "Trello" },
      { name: "Slack" },
      { name: "Figma" },
      { name: "Miro" },
      { name: "GoHighLevel" },
      { name: "QuickBooks" },
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
