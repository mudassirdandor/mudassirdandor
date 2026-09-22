import { projects } from "./projects";
import { blogPosts } from "./blog";
import { badgesData } from "./badges";

export type KnowledgeEntityType = 
  | "page" 
  | "case-study" 
  | "article" 
  | "scenario" 
  | "certification" 
  | "skill";

export interface KnowledgeEntity {
  id: string;
  type: KnowledgeEntityType;
  title: string;
  subtitle: string;
  category?: string;
  description: string;
  keywords: string[];
  route?: string;
  actionId?: string; // e.g. project ID, blog ID, scenario ID
  badgeText?: string;
  url?: string;
  metric?: string;
}

export interface ConnectedRelationship {
  relatedProjectIds: string[];
  relatedArticleIds: string[];
  relatedScenarioIds: string[];
  relatedCertificationIds: string[];
  technologies: string[];
  nextRecommendedId?: string;
  contextualReason?: string;
}

// ---------------------------------------------------------------------------
// 1. Navigation Pages
// ---------------------------------------------------------------------------
export const NAVIGATION_PAGES: KnowledgeEntity[] = [
  {
    id: "page-home",
    type: "page",
    title: "Overview & Executive Summary",
    subtitle: "Home Portfolio",
    description: "Main briefing covering quantifiable outcomes, enterprise proof points, and consulting philosophy.",
    keywords: ["home", "overview", "executive", "mudassir", "portfolio", "summary", "main"],
    route: "/"
  },
  {
    id: "page-solutions",
    type: "page",
    title: "Consulting Capabilities & Services",
    subtitle: "Solutions Overview",
    description: "Business Intelligence, Automated Reporting Pipelines, Local SEO Analytics, and AI Automation Systems.",
    keywords: ["solutions", "services", "offerings", "capabilities", "consulting", "bi", "analytics", "business intelligence"],
    route: "/solutions"
  },
  {
    id: "page-case-studies",
    type: "page",
    title: "Client Case Studies & Engagements",
    subtitle: "20 Case Studies & Interactive Models",
    description: "Detailed problem diagnostics, ETL workflows, DAX models, and quantifiable business outcomes.",
    keywords: ["case studies", "projects", "dashboards", "dashboard", "work", "client", "deliverables", "portfolio", "evidence"],
    route: "/projects"
  },
  {
    id: "page-evidence-lab",
    type: "page",
    title: "Technical Evidence & Artifact Lab",
    subtitle: "Architecture & Verification",
    description: "Inspect verifiable schemas, live dashboard prototypes, code repositories, and engineering deliverables.",
    keywords: ["evidence", "lab", "artifacts", "code", "architecture", "verification", "technical", "git"],
    route: "/evidence-lab"
  },
  {
    id: "page-insights",
    type: "page",
    title: "Knowledge Library & Technical Articles",
    subtitle: "Methodology Research",
    description: "In-depth guides on Star Schema modeling, DAX optimization, local maps visibility, and secure AI reporting.",
    keywords: ["insights", "articles", "blog", "research", "methodology", "dax", "star schema", "knowledge"],
    route: "/insights"
  },
  {
    id: "page-certifications",
    type: "page",
    title: "Professional Certifications & Badges",
    subtitle: "Google & Industry Credentials",
    description: "Verified Google Data Analytics, Business Intelligence, Project Management, and Cybersecurity certifications.",
    keywords: ["certifications", "badges", "credentials", "google", "coursera", "verified", "degrees"],
    route: "/certifications"
  },
  {
    id: "page-about",
    type: "page",
    title: "Professional Biography & Career Track",
    subtitle: "About Mudassir Javed",
    description: "Background in data analytics, decision systems, technical milestones, and consulting ethos.",
    keywords: ["about", "bio", "background", "experience", "story", "cv", "resume", "mudassir"],
    route: "/about"
  },
  {
    id: "page-contact",
    type: "page",
    title: "Initiate Consulting Engagement",
    subtitle: "Direct Contact Console",
    description: "Schedule an executive consultation, request a project review, or reach out directly on WhatsApp.",
    keywords: ["contact", "hire", "consult", "email", "whatsapp", "call", "inquiry", "meeting"],
    route: "/contact"
  }
];

// ---------------------------------------------------------------------------
// 2. Interactive Decision Scenarios
// ---------------------------------------------------------------------------
export const DECISION_SCENARIOS: KnowledgeEntity[] = [
  {
    id: "scenario-finance",
    type: "scenario",
    title: "Multi-Source Financial Reconciliation",
    subtitle: "Decision Engine Simulator",
    category: "Financial Analytics & ETL",
    description: "Consolidates 5+ branch spreadsheets into an automated, single-source-of-truth SQL ledger with 98.9% time savings.",
    keywords: ["finance", "reconciliation", "accounting", "ledger", "sql", "dax", "power bi", "invoices", "balance"],
    actionId: "finance",
    badgeText: "Interactive Simulator",
    metric: "98.9% Time Cut"
  },
  {
    id: "scenario-local-seo",
    type: "scenario",
    title: "Local Retail Market Visibility Engine",
    subtitle: "Decision Engine Simulator",
    category: "Local BI & Geo Analytics",
    description: "Overcomes zero-visibility on Google Maps for multi-location retail through neighborhood geo-grid rank tracking.",
    keywords: ["local seo", "google maps", "geospatial", "retail", "footfall", "map pack", "citations", "rank", "seo"],
    actionId: "local-seo",
    badgeText: "Interactive Simulator",
    metric: "#2 Map Pack"
  },
  {
    id: "scenario-ai-workflow",
    type: "scenario",
    title: "AI-Powered Executive Brief Automation",
    subtitle: "Decision Engine Simulator",
    category: "AI & Workflow Automation",
    description: "Automates daily operational logs into structured C-Suite briefings with human-in-the-loop verification.",
    keywords: ["ai", "gemini", "automation", "workflow", "reporting", "c-suite", "executive", "slack", "summarizer"],
    actionId: "ai-workflow",
    badgeText: "Interactive Simulator",
    metric: "<2s Anomaly Alert"
  },
  {
    id: "scenario-statistical-modeling",
    type: "scenario",
    title: "Predictive Demand Forecasting & Pricing",
    subtitle: "Decision Engine Simulator",
    category: "Statistical Decision Science",
    description: "Replaces misleading averages with Monte Carlo simulations and safety stock models to eliminate stockouts.",
    keywords: ["statistics", "monte carlo", "forecasting", "demand", "safety stock", "retail", "pricing", "python", "regression"],
    actionId: "statistical-modeling",
    badgeText: "Interactive Simulator",
    metric: "+14.2% Margin"
  }
];

// ---------------------------------------------------------------------------
// 3. Entity Cross-Reference Mappings (Full 20 Projects, 5 Articles, 4 Scenarios)
// ---------------------------------------------------------------------------
export const KNOWLEDGE_RELATIONSHIPS: Record<string, ConnectedRelationship> = {
  // Core Projects & Live Production Systems
  "saylani-form": {
    relatedProjectIds: ["saylani-rotibank", "job-applica", "lifedrop"],
    relatedArticleIds: ["blog-what-is-bi", "blog-ai-reporting"],
    relatedScenarioIds: ["ai-workflow"],
    relatedCertificationIds: ["google-business-intelligence", "google-project-management"],
    technologies: ["React", "TypeScript", "Google Apps Script", "Google Sheets API", "Dialogflow"],
    nextRecommendedId: "saylani-rotibank",
    contextualReason: "Review the companion humanitarian food donation pipeline built on the same serverless Google Workspace architecture."
  },
  "saylani-rotibank": {
    relatedProjectIds: ["saylani-form", "ngo-monitoring", "lifedrop"],
    relatedArticleIds: ["blog-what-is-bi", "blog-statistics-dashboards"],
    relatedScenarioIds: ["finance", "ai-workflow"],
    relatedCertificationIds: ["google-project-management", "google-data-analytics"],
    technologies: ["React", "Firebase", "Google Sheets", "Google Apps Script"],
    nextRecommendedId: "ngo-monitoring",
    contextualReason: "Compare operational donation coordination with an executive NGO resource tracking and grant monitoring dashboard."
  },
  "weather-app": {
    relatedProjectIds: ["local-bi-framework", "job-applica"],
    relatedArticleIds: ["blog-local-bi-maps", "blog-statistics-dashboards"],
    relatedScenarioIds: ["local-seo"],
    relatedCertificationIds: ["google-data-analytics"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "OpenWeatherMap API", "Geolocation API"],
    nextRecommendedId: "local-bi-framework",
    contextualReason: "Transition from real-time meteorological API pipelines to geospatial coordinate analytics for local business intelligence."
  },
  "enterpret-steel": {
    relatedProjectIds: ["job-applica", "supply-chain-dashboard"],
    relatedArticleIds: ["blog-what-is-bi"],
    relatedScenarioIds: ["finance"],
    relatedCertificationIds: ["google-project-management"],
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    nextRecommendedId: "supply-chain-dashboard",
    contextualReason: "Explore how B2B industrial manufacturing catalogs connect to operational supply chain logistics and carrier SLA diagnostics."
  },
  "job-applica": {
    relatedProjectIds: ["saylani-form", "hr-analytics"],
    relatedArticleIds: ["blog-what-is-bi", "blog-statistics-dashboards"],
    relatedScenarioIds: ["ai-workflow"],
    relatedCertificationIds: ["google-project-management"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "LocalStorage State Caching"],
    nextRecommendedId: "hr-analytics",
    contextualReason: "See how upfront multi-step candidate intake connects to downstream talent retention and employee flight-risk modeling."
  },
  "lifedrop": {
    relatedProjectIds: ["saylani-rotibank", "healthcare-dashboard"],
    relatedArticleIds: ["blog-ai-reporting", "blog-statistics-dashboards"],
    relatedScenarioIds: ["ai-workflow"],
    relatedCertificationIds: ["google-cybersecurity", "google-data-analytics"],
    technologies: ["React", "TypeScript", "Firebase Firestore", "Twilio API", "Gemini API"],
    nextRecommendedId: "healthcare-dashboard",
    contextualReason: "Examine clinical hospital operations and patient throughput metrics related to critical supply shortages."
  },
  "local-bi-framework": {
    relatedProjectIds: ["gbp-analytics", "local-seo-dashboard", "weather-app"],
    relatedArticleIds: ["blog-local-bi-maps"],
    relatedScenarioIds: ["local-seo"],
    relatedCertificationIds: ["google-business-intelligence", "google-data-analytics"],
    technologies: ["Google Maps API", "GBP API", "Geospatial Heatmapping", "Local SEO"],
    nextRecommendedId: "gbp-analytics",
    contextualReason: "Inspect the multi-location clinic dashboard that models Google Business Profile search impressions and direction clicks."
  },

  // Interactive BI Workspaces & Simulations
  "sales-dashboard": {
    relatedProjectIds: ["financial-dashboard", "retail-analytics", "customer-churn"],
    relatedArticleIds: ["blog-dax-optimization", "blog-what-is-bi"],
    relatedScenarioIds: ["finance", "statistical-modeling"],
    relatedCertificationIds: ["google-business-intelligence", "google-data-analytics"],
    technologies: ["Power BI", "DAX", "SQL Server", "Star Schema", "Python"],
    nextRecommendedId: "financial-dashboard",
    contextualReason: "Connect regional sales margins with corporate cash flow runway and accounts receivable balance sheets."
  },
  "financial-dashboard": {
    relatedProjectIds: ["sales-dashboard", "business-performance"],
    relatedArticleIds: ["blog-dax-optimization", "blog-what-is-bi"],
    relatedScenarioIds: ["finance"],
    relatedCertificationIds: ["google-business-intelligence", "google-adv-data-analytics"],
    technologies: ["Power BI", "PostgreSQL", "DAX", "Predictive Analytics"],
    nextRecommendedId: "business-performance",
    contextualReason: "Expand from balance sheet runway to organizational OKR scorecards linking sales commissions and operational burn."
  },
  "hr-analytics": {
    relatedProjectIds: ["customer-churn", "business-performance", "education-analytics"],
    relatedArticleIds: ["blog-statistics-dashboards"],
    relatedScenarioIds: ["statistical-modeling"],
    relatedCertificationIds: ["google-adv-data-analytics", "google-data-analytics"],
    technologies: ["Python", "Pandas", "Scikit-Learn", "Seaborn", "Power BI"],
    nextRecommendedId: "customer-churn",
    contextualReason: "Compare employee attrition classification models with SaaS customer churn and lifetime value optimization."
  },
  "customer-churn": {
    relatedProjectIds: ["retail-analytics", "hr-analytics", "sales-dashboard"],
    relatedArticleIds: ["blog-statistics-dashboards", "blog-dax-optimization"],
    relatedScenarioIds: ["statistical-modeling"],
    relatedCertificationIds: ["google-adv-data-analytics", "google-data-analytics"],
    technologies: ["Python", "Scikit-Learn", "PostgreSQL", "Power BI", "Gradient Boosting"],
    nextRecommendedId: "retail-analytics",
    contextualReason: "Explore market basket affinity and safety stock calculations for retail consumer goods."
  },
  "retail-analytics": {
    relatedProjectIds: ["supply-chain-dashboard", "sales-dashboard", "customer-churn"],
    relatedArticleIds: ["blog-statistics-dashboards", "blog-dax-optimization"],
    relatedScenarioIds: ["statistical-modeling", "finance"],
    relatedCertificationIds: ["google-adv-data-analytics", "google-data-analytics"],
    technologies: ["Python", "SQL", "Apriori Algorithm", "Power BI", "Safety Stock Modeling"],
    nextRecommendedId: "supply-chain-dashboard",
    contextualReason: "Trace how retail stockout models connect to upstream freight logistics and warehouse carrier performance."
  },
  "ngo-monitoring": {
    relatedProjectIds: ["saylani-rotibank", "healthcare-dashboard"],
    relatedArticleIds: ["blog-what-is-bi", "blog-statistics-dashboards"],
    relatedScenarioIds: ["finance"],
    relatedCertificationIds: ["google-project-management", "google-data-analytics"],
    technologies: ["Power BI", "Excel", "GIS Coordinate Mapping", "Variance Analysis"],
    nextRecommendedId: "healthcare-dashboard",
    contextualReason: "Review hospital emergency bed occupancy and triage intervals driven by clinical operational variance."
  },
  "healthcare-dashboard": {
    relatedProjectIds: ["lifedrop", "ngo-monitoring", "education-analytics"],
    relatedArticleIds: ["blog-statistics-dashboards", "blog-dax-optimization"],
    relatedScenarioIds: ["statistical-modeling"],
    relatedCertificationIds: ["google-cybersecurity", "google-business-intelligence"],
    technologies: ["Power BI", "SQL Server", "DAX", "Time-Series Forecasting"],
    nextRecommendedId: "education-analytics",
    contextualReason: "Inspect another public-sector capacity model tracking student retention and institutional academic risk."
  },
  "supply-chain-dashboard": {
    relatedProjectIds: ["retail-analytics", "sales-dashboard", "ngo-monitoring"],
    relatedArticleIds: ["blog-what-is-bi", "blog-statistics-dashboards"],
    relatedScenarioIds: ["finance", "statistical-modeling"],
    relatedCertificationIds: ["google-project-management", "google-data-analytics"],
    technologies: ["Power BI", "SQL Server", "DAX", "Geospatial Mapping", "Python"],
    nextRecommendedId: "retail-analytics",
    contextualReason: "Review the downstream impact of freight shipping delays on retail inventory reorder points."
  },
  "business-performance": {
    relatedProjectIds: ["sales-dashboard", "financial-dashboard", "hr-analytics"],
    relatedArticleIds: ["blog-what-is-bi", "blog-dax-optimization"],
    relatedScenarioIds: ["finance"],
    relatedCertificationIds: ["google-business-intelligence", "google-project-management"],
    technologies: ["Power BI", "SQL", "DAX", "Data Modeling"],
    nextRecommendedId: "sales-dashboard",
    contextualReason: "Examine detailed SKU-level sales performance and regional margin diagnostics."
  },
  "gbp-analytics": {
    relatedProjectIds: ["local-bi-framework", "local-seo-dashboard", "weather-app"],
    relatedArticleIds: ["blog-local-bi-maps"],
    relatedScenarioIds: ["local-seo"],
    relatedCertificationIds: ["google-data-analytics", "google-business-intelligence"],
    technologies: ["Python", "GBP API", "Power BI", "GeoPandas", "Local Market Insights"],
    nextRecommendedId: "local-seo-dashboard",
    contextualReason: "Analyze competitor share-of-voice and citation integrity across neighborhood search grids."
  },
  "local-seo-dashboard": {
    relatedProjectIds: ["local-bi-framework", "gbp-analytics"],
    relatedArticleIds: ["blog-local-bi-maps"],
    relatedScenarioIds: ["local-seo"],
    relatedCertificationIds: ["google-data-analytics"],
    technologies: ["Power BI", "SQL", "Geo-Grid Coordinates", "Local Citations Analysis"],
    nextRecommendedId: "local-bi-framework",
    contextualReason: "Explore the comprehensive 5-stage local search optimization and ranking methodology."
  },
  "ai-reporting-assistant": {
    relatedProjectIds: ["saylani-form", "lifedrop", "sales-dashboard"],
    relatedArticleIds: ["blog-ai-reporting", "blog-what-is-bi"],
    relatedScenarioIds: ["ai-workflow"],
    relatedCertificationIds: ["google-prompting-essentials", "google-ai-essentials"],
    technologies: ["Python", "Gemini API", "PostgreSQL", "Workflow Automation", "Markdown"],
    nextRecommendedId: "saylani-form",
    contextualReason: "See how automated workflows and Dialogflow NLP assistants were deployed in live educational registration."
  },
  "education-analytics": {
    relatedProjectIds: ["saylani-form", "hr-analytics", "business-performance"],
    relatedArticleIds: ["blog-statistics-dashboards", "blog-what-is-bi"],
    relatedScenarioIds: ["statistical-modeling"],
    relatedCertificationIds: ["google-data-analytics", "google-educator-l1"],
    technologies: ["Power BI", "SQL (PostgreSQL)", "DAX", "Python (Pandas)"],
    nextRecommendedId: "saylani-form",
    contextualReason: "Examine the live registration platform built for student intake and automated ID generation."
  },

  // Research Articles
  "blog-what-is-bi": {
    relatedProjectIds: ["saylani-form", "sales-dashboard", "financial-dashboard"],
    relatedArticleIds: ["blog-dax-optimization", "blog-ai-reporting"],
    relatedScenarioIds: ["finance"],
    relatedCertificationIds: ["google-business-intelligence", "google-data-analytics"],
    technologies: ["Power BI", "SQL", "Star Schema", "Data Warehousing"],
    nextRecommendedId: "blog-dax-optimization",
    contextualReason: "Learn practical DAX formulas and table modeling techniques to accelerate report loading speeds."
  },
  "blog-dax-optimization": {
    relatedProjectIds: ["sales-dashboard", "financial-dashboard", "customer-churn"],
    relatedArticleIds: ["blog-what-is-bi", "blog-statistics-dashboards"],
    relatedScenarioIds: ["finance"],
    relatedCertificationIds: ["google-business-intelligence", "google-adv-data-analytics"],
    technologies: ["Power BI", "DAX", "Star Schema", "Query Optimization"],
    nextRecommendedId: "blog-statistics-dashboards",
    contextualReason: "Discover why standard averages distort dashboard conclusions and how to measure true statistical variance."
  },
  "blog-local-bi-maps": {
    relatedProjectIds: ["local-bi-framework", "gbp-analytics", "weather-app"],
    relatedArticleIds: ["blog-statistics-dashboards"],
    relatedScenarioIds: ["local-seo"],
    relatedCertificationIds: ["google-data-analytics", "google-business-intelligence"],
    technologies: ["Google Maps API", "Geocoding", "Spatial Analytics", "Local SEO"],
    nextRecommendedId: "local-bi-framework",
    contextualReason: "Review the production framework applying geo-grid ranking models to physical storefronts."
  },
  "blog-ai-reporting": {
    relatedProjectIds: ["ai-reporting-assistant", "saylani-form", "lifedrop"],
    relatedArticleIds: ["blog-what-is-bi", "blog-statistics-dashboards"],
    relatedScenarioIds: ["ai-workflow"],
    relatedCertificationIds: ["google-prompting-essentials", "google-ai-essentials"],
    technologies: ["Gemini API", "Prompt Engineering", "TypeScript", "Python"],
    nextRecommendedId: "ai-reporting-assistant",
    contextualReason: "Test the simulated automated reporting pipeline with strict prompt guardrails and review gates."
  },
  "blog-statistics-dashboards": {
    relatedProjectIds: ["customer-churn", "retail-analytics", "healthcare-dashboard"],
    relatedArticleIds: ["blog-dax-optimization", "blog-what-is-bi"],
    relatedScenarioIds: ["statistical-modeling"],
    relatedCertificationIds: ["google-adv-data-analytics", "google-data-analytics"],
    technologies: ["Python", "Statistics", "Monte Carlo", "Process Control"],
    nextRecommendedId: "blog-dax-optimization",
    contextualReason: "Examine how Star Schemas and optimized DAX measures prevent performance lag on large statistical models."
  },

  // Decision Simulators
  "finance": {
    relatedProjectIds: ["financial-dashboard", "sales-dashboard", "saylani-rotibank"],
    relatedArticleIds: ["blog-dax-optimization", "blog-what-is-bi"],
    relatedScenarioIds: ["statistical-modeling"],
    relatedCertificationIds: ["google-business-intelligence", "google-data-analytics"],
    technologies: ["SQL", "Power BI", "DAX", "ETL Pipelines"],
    nextRecommendedId: "financial-dashboard",
    contextualReason: "Inspect the full corporate financial dashboard tracking cash runway and aged receivables."
  },
  "local-seo": {
    relatedProjectIds: ["local-bi-framework", "gbp-analytics", "local-seo-dashboard"],
    relatedArticleIds: ["blog-local-bi-maps"],
    relatedScenarioIds: ["ai-workflow"],
    relatedCertificationIds: ["google-data-analytics"],
    technologies: ["Google Maps API", "GBP API", "Geospatial Heatmapping"],
    nextRecommendedId: "local-bi-framework",
    contextualReason: "Explore the live local SEO audit framework for physical storefronts."
  },
  "ai-workflow": {
    relatedProjectIds: ["ai-reporting-assistant", "saylani-form", "lifedrop"],
    relatedArticleIds: ["blog-ai-reporting"],
    relatedScenarioIds: ["finance"],
    relatedCertificationIds: ["google-prompting-essentials", "google-ai-essentials"],
    technologies: ["Gemini API", "Prompt Guardrails", "TypeScript", "Serverless"],
    nextRecommendedId: "blog-ai-reporting",
    contextualReason: "Read the research paper detailing human-in-the-loop review architecture for executive reporting."
  },
  "statistical-modeling": {
    relatedProjectIds: ["customer-churn", "retail-analytics", "healthcare-dashboard"],
    relatedArticleIds: ["blog-statistics-dashboards"],
    relatedScenarioIds: ["finance"],
    relatedCertificationIds: ["google-adv-data-analytics", "google-data-analytics"],
    technologies: ["Python", "Monte Carlo", "Scikit-Learn", "DAX"],
    nextRecommendedId: "blog-statistics-dashboards",
    contextualReason: "Understand the statistical rationale for replacing single-point averages with range bands."
  }
};

// ---------------------------------------------------------------------------
// 4. Global Search & Graph Aggregator
// ---------------------------------------------------------------------------
export function getAllKnowledgeEntities(): KnowledgeEntity[] {
  const entities: KnowledgeEntity[] = [...NAVIGATION_PAGES, ...DECISION_SCENARIOS];

  // Add all projects with truthful, calibrated status badges
  projects.forEach((p) => {
    let calibratedBadge = "Interactive Demonstration";
    if (p.status === "Production") calibratedBadge = "Production System";
    else if (p.status === "Open Source") calibratedBadge = "Open Source";
    else if (p.status === "In Development") calibratedBadge = "In Development";
    else if (p.status === "Research") calibratedBadge = "Research & Methodology";

    entities.push({
      id: p.id,
      type: "case-study",
      title: p.title,
      subtitle: p.category,
      category: p.category,
      description: p.shortDescription || p.description.slice(0, 140) + "...",
      keywords: [
        p.title.toLowerCase(),
        p.id.toLowerCase(),
        p.category.toLowerCase(),
        ...(p.tools || []).map((t) => t.toLowerCase()),
        p.status.toLowerCase(),
        "case study",
        "project"
      ],
      actionId: p.id,
      badgeText: calibratedBadge,
      metric: p.results?.[0]?.value
    });
  });

  // Add all research articles
  blogPosts.forEach((b) => {
    entities.push({
      id: b.id,
      type: "article",
      title: b.title,
      subtitle: `${b.category} · ${b.readTime}`,
      category: b.category,
      description: b.summary,
      keywords: [
        b.title.toLowerCase(),
        b.id.toLowerCase(),
        b.slug.toLowerCase(),
        b.category.toLowerCase(),
        ...(b.relatedTechnologies || []).map((t) => t.toLowerCase()),
        "article",
        "guide",
        "insight",
        "research",
        "methodology"
      ],
      actionId: b.id,
      badgeText: b.readTime
    });
  });

  // Add all verified certifications
  badgesData.forEach((badge) => {
    entities.push({
      id: badge.id,
      type: "certification",
      title: badge.title,
      subtitle: `${badge.provider} Accredited Credential`,
      category: "Credential",
      description: `Official ${badge.provider} professional accreditation with verified credential ID.`,
      keywords: [
        badge.title.toLowerCase(),
        badge.id.toLowerCase(),
        badge.provider.toLowerCase(),
        "certification",
        "badge",
        "credential",
        "verified",
        "google",
        "coursera",
        "credly"
      ],
      actionId: badge.id,
      url: badge.verificationLink,
      badgeText: "Verified Credential"
    });
  });

  // Add verified postgraduate academic credential
  entities.push({
    id: "msc-statistics-degree",
    type: "certification",
    title: "Master of Science (MSc) in Statistics",
    subtitle: "University of Balochistan · Postgraduate Degree",
    category: "Academic Degree",
    description: "Rigorous postgraduate degree in mathematical statistics, probability theory, hypothesis testing, linear modeling, and stochastic processes.",
    keywords: [
      "msc",
      "statistics",
      "msc statistics",
      "degree",
      "education",
      "university of balochistan",
      "academic",
      "qualifications",
      "master of science",
      "mathematics",
      "probability",
      "postgraduate",
      "balochistan"
    ],
    actionId: "page-about",
    badgeText: "MSc Degree",
    metric: "Postgraduate"
  });

  return entities;
}

// ---------------------------------------------------------------------------
// 5. Production-Calibrated Search & Intent Engine
// ---------------------------------------------------------------------------
export function searchKnowledgeGraph(query: string): KnowledgeEntity[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const allEntities = getAllKnowledgeEntities();
  const rawTerms = clean.replace(/[^\w\s-]/g, "").split(/\s+/).filter(Boolean);
  
  // Conversational stop words to discount for raw token bonus
  const stopWords = new Set(["show", "me", "your", "do", "you", "know", "how", "can", "i", "tell", "about", "a", "an", "the", "in", "of", "to", "for", "with"]);
  const meaningfulTerms = rawTerms.filter((t) => !stopWords.has(t));
  const searchTerms = meaningfulTerms.length > 0 ? meaningfulTerms : rawTerms;

  // Conversational & Natural Visitor Intent Classifiers
  const isHireIntent = /hire|work with|recruit|contact|get in touch|consultation/.test(clean);
  const isAboutIntent = /experience|who are you|bio|background|tell me about|education/.test(clean);
  const isBestProjectIntent = /best project|featured project|top project|flagship/.test(clean);
  const isProjectQuery = /project|projects|case stud(y|ies)|portfolio|work/.test(clean);
  const isDashboardQuery = /dashboard|dashboards|bi report|reports/.test(clean);
  const isGoogleCerts = /google cert|certifications|certificates|badges|credentials/.test(clean);

  // Intent dictionary for domain-specific query expansions
  const isPowerBI = clean === "power bi" || clean === "powerbi" || clean === "dax" || clean === "bi" || clean.includes("power bi") || clean.includes("star schema");
  const isSQL = clean === "sql" || clean === "postgres" || clean === "sql server" || clean === "database";
  const isPython = clean === "python" || clean === "pandas" || clean === "scikit-learn" || clean === "machine learning" || clean === "ml" || clean.includes("python");
  const isLocalMaps = clean === "local seo" || clean === "maps" || clean === "google maps" || clean === "gbp" || clean === "seo" || clean.includes("seo");
  const isAI = clean === "ai" || clean === "automation" || clean === "gemini" || clean === "llm" || clean === "dialogflow";
  const isSaylani = clean === "saylani" || clean === "welfare" || clean === "roti" || clean === "student";
  const isLifeDrop = clean === "lifedrop" || clean === "blood" || clean === "emergency";
  const isGoogle = clean === "google" || clean === "coursera" || clean === "credential" || clean === "cert";
  const isStats = clean.includes("msc") || clean.includes("statistics") || clean === "stats" || clean.includes("degree");
  const isETL = clean === "etl" || clean.includes("pipeline") || clean.includes("reconciliation") || clean.includes("star schema");

  const scored = allEntities.map((entity) => {
    let score = 0;
    const titleLower = entity.title.toLowerCase();
    const descLower = entity.description.toLowerCase();
    const categoryLower = (entity.category || "").toLowerCase();
    const idLower = entity.id.toLowerCase();
    const actionLower = (entity.actionId || "").toLowerCase();

    // 1. Direct Title Matches
    if (titleLower === clean) {
      score += 180;
    } else if (titleLower.startsWith(clean)) {
      score += 90;
    } else if (titleLower.includes(clean)) {
      score += 50;
    }

    // 2. Exact ID / Action Matches
    if (idLower === clean || actionLower === clean) {
      score += 140;
    } else if (idLower.includes(clean)) {
      score += 45;
    }

    // 3. Exact Category Matches
    if (categoryLower === clean) {
      score += 55;
    } else if (categoryLower.includes(clean)) {
      score += 25;
    }

    // 4. Token-by-token evaluation using meaningful terms
    let matchedTokensCount = 0;
    searchTerms.forEach((term) => {
      let termMatched = false;
      if (titleLower.includes(term)) {
        score += 30;
        termMatched = true;
      }
      if (categoryLower.includes(term)) {
        score += 18;
        termMatched = true;
      }
      if (entity.keywords.some((k) => k === term)) {
        score += 22;
        termMatched = true;
      } else if (entity.keywords.some((k) => k.includes(term))) {
        score += 12;
        termMatched = true;
      }
      if (descLower.includes(term)) {
        score += 8;
        termMatched = true;
      }
      if (termMatched) matchedTokensCount++;
    });

    // Multi-term coverage bonus
    if (searchTerms.length > 1 && matchedTokensCount === searchTerms.length) {
      score += 40;
    }

    // 5. Conversational High-Level Intent Handling
    if (isHireIntent) {
      if (idLower === "page-contact") score += 250;
      if (idLower === "page-solutions") score += 120;
    }

    if (isAboutIntent) {
      if (idLower === "page-about") score += 250;
      if (idLower === "msc-statistics-degree") score += 140;
    }

    if (isBestProjectIntent) {
      if (idLower === "saylani-form") score += 220;
      if (idLower === "sales-dashboard") score += 190;
      if (idLower === "saylani-rotibank") score += 160;
      if (idLower === "weather-app") score += 150;
    }

    if (isDashboardQuery) {
      if (idLower === "page-case-studies") score += 170;
      if (entity.type === "case-study" && (categoryLower.includes("business intelligence") || titleLower.includes("dashboard"))) {
        score += 130;
      }
    }

    if (isGoogleCerts) {
      if (idLower === "page-certifications") score += 200;
      if (entity.type === "certification") score += 50;
    }

    if (isProjectQuery && entity.type === "case-study") {
      score += 65;
    }

    if (isPython && isProjectQuery) {
      if (entity.type === "case-study" && (entity.keywords.includes("python") || descLower.includes("python"))) {
        score += 160;
      }
    }

    // 6. Intent and Domain-Specific Relevance Boosts
    if (isPowerBI) {
      if (idLower.includes("sales-dashboard") || idLower.includes("financial-dashboard") || idLower.includes("blog-dax-optimization") || idLower.includes("google-business-intelligence")) {
        score += 65;
      }
      if (entity.keywords.includes("power bi") || entity.keywords.includes("dax")) {
        score += 35;
      }
    }

    if (isSQL) {
      if (idLower.includes("sales-dashboard") || idLower.includes("financial-dashboard") || idLower.includes("scenario-finance") || entity.keywords.includes("sql")) {
        score += 50;
      }
    }

    if (isPython && !isProjectQuery) {
      if (idLower.includes("customer-churn") || idLower.includes("hr-analytics") || idLower.includes("retail-analytics") || idLower.includes("google-adv-data-analytics") || idLower.includes("google-it-automation")) {
        score += 60;
      }
    }

    if (isLocalMaps) {
      if (idLower.includes("local-bi-framework") || idLower.includes("scenario-local-seo") || idLower.includes("blog-local-bi-maps") || idLower.includes("gbp-analytics") || idLower.includes("local-seo-dashboard")) {
        score += 70;
      }
    }

    if (isAI) {
      if (idLower.includes("ai-reporting-assistant") || idLower.includes("blog-ai-reporting") || idLower.includes("scenario-ai-workflow") || idLower.includes("saylani-form") || idLower.includes("google-prompting-essentials") || idLower.includes("google-ai-essentials")) {
        score += 60;
      }
    }

    if (isSaylani) {
      if (idLower === "saylani-form" || idLower === "saylani-rotibank") {
        score += 100;
      }
    }

    if (isLifeDrop) {
      if (idLower === "lifedrop") {
        score += 100;
      }
    }

    if (isGoogle && !isGoogleCerts) {
      if (entity.type === "certification") {
        score += 45;
      }
    }

    if (isStats) {
      if (idLower === "msc-statistics-degree") {
        score += 150;
      } else if (idLower.includes("statistics") || idLower === "page-about") {
        score += 70;
      }
    }

    if (isETL) {
      if (idLower.includes("sales-dashboard") || idLower.includes("financial-dashboard") || idLower.includes("scenario-finance") || entity.keywords.includes("etl")) {
        score += 65;
      }
    }

    return { entity, score };
  });

  // Filter matched items and sort deterministically by score descending
  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.entity);
}

// ---------------------------------------------------------------------------
// 6. Connected Data Getter with Specific Context
// ---------------------------------------------------------------------------
export function getEntityConnectedData(entityId: string) {
  const rel = KNOWLEDGE_RELATIONSHIPS[entityId];
  if (!rel) {
    return {
      relatedProjects: [],
      relatedArticles: [],
      relatedScenarios: [],
      relatedCertifications: [],
      technologies: [],
      nextRecommended: null,
      contextualReason: ""
    };
  }

  const relatedProjects = projects.filter((p) => rel.relatedProjectIds.includes(p.id));
  const relatedArticles = blogPosts.filter((b) => rel.relatedArticleIds.includes(b.id));
  const relatedScenarios = DECISION_SCENARIOS.filter((s) => rel.relatedScenarioIds.includes(s.actionId || ""));
  const relatedCertifications = badgesData.filter((c) => rel.relatedCertificationIds.includes(c.id));
  const nextRecommended = rel.nextRecommendedId 
    ? projects.find((p) => p.id === rel.nextRecommendedId) || blogPosts.find((b) => b.id === rel.nextRecommendedId)
    : null;

  return {
    relatedProjects,
    relatedArticles,
    relatedScenarios,
    relatedCertifications,
    technologies: rel.technologies,
    nextRecommended,
    contextualReason: rel.contextualReason || ""
  };
}
