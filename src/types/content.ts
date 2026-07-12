export type Link = {
  label: string;
  href?: string;
  external?: boolean;
};

export type Profile = {
  name?: string;
  professionalTitle: "AI Solutions & Automation Engineer";
  shortPositioning: string;
  about: string;
  aboutParagraphs?: string[];
  yearsCommercialExperience: 6;
  technologyCount?: number;
  deliveryScope?: string;
  location?: string;
  remoteAvailability?: string;
  photo?: {
    src: string;
    alt: string;
  };
};

export type Service = {
  id: string;
  title: string;
  description?: string;
};

export type Skill = {
  name: string;
  level?: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  skills: Skill[];
  featured?: boolean;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  role: string;
  technologies: string[];
  architecture?: {
    summary?: string;
    steps?: string[];
    image?: {
      src: string;
      alt: string;
    };
  };
  githubUrl?: string;
  demoUrl?: string;
  images?: Array<{
    src: string;
    alt: string;
  }>;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  technologies: string[];
};

export type PreviousWorkItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  externalUrl?: string;
  images?: Array<{
    src: string;
    alt: string;
  }>;
};

export type EducationItem = {
  id: string;
  institution: string;
  qualification: string;
  field?: string;
  endDate?: string;
};
