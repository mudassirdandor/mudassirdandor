import { Certificate, ExperienceItem, SkillCategory } from "../types";

export const bio = {
  name: "Mudassir Javed",
  brandName: "mudassirdandor",
  headline: "Business Intelligence & Data Analyst",
  tagline: "Helping Organizations Make Smarter Decisions With Data.",
  alternativeTagline: "Transforming Data Into Business Intelligence Through Analytics, AI & Automation.",
  about: "I am a Business Intelligence & Data Analyst with an MSc in Statistics. I specialize in transforming raw data into meaningful business insights using advanced analytics, dashboards, automation, and statistical thinking. My work combines core Business Intelligence, Data Analytics, AI-powered workflow automation, and Local Business Intelligence to solve real-world challenges.",
  mission: "To bridge the gap between complex raw data and strategic business actions, empowering organizations to operate with complete clarity, absolute efficiency, and data-backed confidence.",
  vision: "To design a future where every business decision—from local clinic optimizations to enterprise-wide resource deployments—is fully optimized through the harmonious integration of statistics, modern dashboards, and intelligent AI automation.",
  philosophy: "Data is merely potential. True Business Intelligence lies in refining that potential into clear, actionable stories that guide leaders toward low-risk, high-return choices.",
  education: {
    degree: "MSc Statistics",
    institution: "University of Balochistan",
    focus: "Statistical modeling, probability distributions, data cleaning, and experimental design methodologies."
  }
};

export const skillsData: SkillCategory[] = [
  {
    title: "Business Intelligence",
    description: "Developing executive dashboard systems and reporting loops to support strategic decisions.",
    skills: [
      { name: "Power BI", proficiency: 95, level: "Expert" },
      { name: "Dashboard Design", proficiency: 90, level: "Advanced" },
      { name: "Business Reporting", proficiency: 95, level: "Expert" },
      { name: "Decision Support Systems", proficiency: 88, level: "Advanced" }
    ]
  },
  {
    title: "Data Analytics & Engineering",
    description: "Structuring, extracting, and modeling large datasets to discover business insights.",
    skills: [
      { name: "SQL (PostgreSQL / SQL Server)", proficiency: 92, level: "Advanced" },
      { name: "Python (Pandas / NumPy / Scikit-Learn)", proficiency: 85, level: "Advanced" },
      { name: "Statistical Analysis", proficiency: 95, level: "Expert" },
      { name: "Excel Advanced (Power Query / Solver)", proficiency: 95, level: "Expert" }
    ]
  },
  {
    title: "AI & Workflow Automation",
    description: "Enhancing analytics and report-writing with custom AI prompts, scripts, and automations.",
    skills: [
      { name: "AI Assistants & Agents", proficiency: 80, level: "Advanced" },
      { name: "Workflow Automation (Python / API)", proficiency: 85, level: "Advanced" },
      { name: "Prompt Engineering", proficiency: 90, level: "Advanced" },
      { name: "Automated Reporting Pipelines", proficiency: 88, level: "Advanced" }
    ]
  },
  {
    title: "Local Business Intelligence",
    description: "Analyzing search intent and geographical rankings to drive foot traffic and customer discovery.",
    skills: [
      { name: "Google Business Profile Optimization", proficiency: 95, level: "Expert" },
      { name: "Local Search Analytics", proficiency: 90, level: "Advanced" },
      { name: "Geo Performance Analysis", proficiency: 88, level: "Advanced" },
      { name: "Review Sentiment Analytics", proficiency: 85, level: "Advanced" }
    ]
  }
];

export const certifications: Certificate[] = [
  {
    id: "cert-google-bi",
    title: "Google Business Intelligence Professional Certificate",
    issuer: "Google",
    date: "2025",
    credentialId: "G-BI-8893041",
    skills: ["Business Intelligence", "SQL Data Warehousing", "Data Modeling", "Executive KPI Design"],
    featured: true
  },
  {
    id: "cert-google-adv-analytics",
    title: "Google Advanced Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2025",
    credentialId: "G-ADA-7729103",
    skills: ["Python Programming", "Statistical Modeling", "Machine Learning", "Exploratory Data Analysis (EDA)"],
    featured: true
  },
  {
    id: "cert-google-analytics",
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2024",
    credentialId: "G-DA-6610294",
    skills: ["Data Cleaning", "Data Visualization", "R Programming", "SQL Database Queries"],
    featured: true
  },
  {
    id: "cert-google-pm",
    title: "Google Project Management Professional Certificate",
    issuer: "Google",
    date: "2024",
    credentialId: "G-PM-5540192",
    skills: ["Agile Methodologies", "Resource Allocation", "Project Documentation", "Stakeholder Communication"],
    featured: false
  },
  {
    id: "cert-google-cyber",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    date: "2024",
    credentialId: "G-CYBER-4410295",
    skills: ["Network Security", "Data Privacy Rules", "SQL Security Controls", "Risk Assessment"],
    featured: false
  },
  {
    id: "cert-google-ai",
    title: "Google AI Essentials",
    issuer: "Google",
    date: "2024",
    credentialId: "G-AIE-1120492",
    skills: ["Generative AI Tools", "Productivity Acceleration", "Responsible AI Practices"],
    featured: false
  },
  {
    id: "cert-google-prompting",
    title: "Google Prompting Essentials",
    issuer: "Google",
    date: "2024",
    credentialId: "G-PE-2230194",
    skills: ["Prompt Engineering", "Custom GPTs", "LLM Task Benchmarking"],
    featured: false
  }
];

export const experienceTimeline: ExperienceItem[] = [
  {
    id: "exp-lead-analyst",
    role: "Lead Business Intelligence & Data Analyst",
    company: "Dandor Analytics (Advisory Practice)",
    location: "Remote / Quetta, Balochistan, Pakistan",
    period: "2024 - Present",
    description: [
      "Engineered automated client dashboard portfolios in Power BI, enabling executives across 12 distinct industries to monitor live operations, customer churn, and monthly cash flow metrics.",
      "Integrated Python-driven predictive analytics within standard business intelligence systems, forecasting patient intake and retail stockouts with over 94% statistical accuracy.",
      "Established a localized search intelligence dashboard suite (Local BI) for service-sector clients, unlocking an average 42% growth in maps clicks and over 2,400 monthly organic calls.",
      "Automated manual stakeholder briefing tasks by designing an LLM-powered script that synthesizes SQL database outputs into complete, error-free executive summary reports in 15 minutes."
    ],
    skills: ["Power BI", "SQL Server", "Python Data Science", "Google Business Profile", "Generative AI API", "DAX Data Modeling"]
  },
  {
    id: "exp-data-scientist",
    role: "Senior Data & Analytics Specialist",
    company: "Regional Business Intelligence Unit",
    location: "Quetta",
    period: "2022 - 2024",
    description: [
      "Cleaned, organized, and analyzed large point-of-sale datasets comprising over 1.8M transactions, implementing basket-analysis algorithms in Python that expanded retail basket values by 18.2%.",
      "Drafted unified database schemas and constructed high-availability PostgreSQL views combining multi-department operations metrics to improve financial forecasting timelines.",
      "Formulated rigorous statistical models analyzing resource supply-chain logs, identifying custom clearance bottlenecks to slash transport delays by an average of 15 days.",
      "Organized training seminars teaching junior analysts database query optimization, increasing regional reporting speeds by over 30%."
    ],
    skills: ["PostgreSQL", "Excel Advanced", "Market Basket Analysis", "Fulfillment Logistics", "Statistical Distributions"]
  }
];
