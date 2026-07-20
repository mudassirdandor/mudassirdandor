export interface Project {
  id: string;
  title: string;
  category: "AI Automation" | "Business Intelligence" | "Web Development" | "Google Workspace Automation" | "Chatbots" | "Interactive Applications" | "Data Collection Systems" | "Local Business Intelligence";
  shortDescription: string;
  description: string;
  businessProblem: string;
  dataset: string;
  tools: string[];
  analysisSteps: string[];
  businessInsights: string[];
  recommendations: string[];
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
  isSimulated?: boolean;
  isUnderDevelopment?: boolean;
  dashboardType: "Sales" | "Financial" | "HR" | "Churn" | "Retail" | "NGO" | "Healthcare" | "Supply Chain" | "Google Business" | "Local SEO" | "AI Assistant" | "Business Performance" | "Education" | "Executive Platform" | "Saylani Form" | "Saylani Roti" | "Weather" | "Steel" | "JobApplica" | "SignStory" | "Local BI Framework" | "LifeDrop" | "Quetta Local SEO Expert";
  metrics: {
    kpis: { label: string; value: string; trend: string; isPositive: boolean }[];
    chartData: { label: string; value: number; secondaryValue?: number }[];
  };
  status?: "Production" | "Research" | "In Development" | "Demonstration" | "Personal Project" | "Open Source";
  repoStatus?: "Source Available" | "Private Repository";
  projectType?: string;
  myRole?: string;
  teamSize?: string;
  duration?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills: string[];
  featured: boolean;
  category?: string;
  issueDate?: string;
  verificationUrl?: string;
  credentialImage?: string;
  issuerLogo?: string;
  expiration?: string;
  credentialLevel?: string;
  link?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  slug: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  lastUpdated?: string;
  author?: string;
  heroVisual?: "workflow" | "architecture" | "chart" | "infographic" | "screenshot";
  tableOfContents?: string[];
  sections?: { heading: string; content: string }[];
  keyTakeaways?: string[];
  relatedCaseStudies?: { title: string; id?: string }[];
  relatedSolutions?: { title: string; id?: string }[];
  relatedTechnologies?: string[];
  references?: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; proficiency: number; level: string }[];
}
