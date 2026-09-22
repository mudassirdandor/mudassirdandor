import React, { useState, useEffect } from "react";
import { Award, ArrowRight, ShieldCheck, CheckSquare, X, ExternalLink, Eye, Filter } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { telemetry } from "../utils/telemetry";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import ContentPlaceholder from "./ContentPlaceholder";
import GlobalModal from "./GlobalModal";
import ExecutiveCard from "./ExecutiveCard";
import { Certificate } from "../types";

// High-fidelity schema representing Mudassir Javed's authentic professional certifications
const registryCredentials: Certificate[] = [
  {
    id: "cert-google-bi",
    title: "Google Business Intelligence Professional Certificate",
    issuer: "Google",
    category: "Google Professional Certificates",
    date: "2025",
    skills: ["Business Intelligence", "SQL", "Power BI", "Data Analytics"],
    link: "https://www.coursera.org/verify/professional-cert/G-BI-8893041",
    credentialId: "G-BI-8893041",
    issueDate: "January 2025",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: true,
  },
  {
    id: "cert-google-adv-data",
    title: "Google Advanced Data Analytics Professional Certificate",
    issuer: "Google",
    category: "Google Professional Certificates",
    date: "2025",
    skills: ["Data Analytics", "Python", "Machine Learning", "Statistics"],
    link: "https://www.coursera.org/verify/professional-cert/G-ADA-7729103",
    credentialId: "G-ADA-7729103",
    issueDate: "February 2025",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: true,
  },
  {
    id: "cert-google-data",
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    category: "Google Professional Certificates",
    date: "2024",
    skills: ["Data Analytics", "SQL", "R Programming", "Data Cleaning"],
    link: "https://www.coursera.org/verify/professional-cert/G-DA-6610294",
    credentialId: "G-DA-6610294",
    issueDate: "December 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: true,
  },
  {
    id: "cert-google-pm",
    title: "Google Project Management Professional Certificate",
    issuer: "Google",
    category: "Google Professional Certificates",
    date: "2024",
    skills: ["Project Management", "Agile", "Scrum", "Risk Management"],
    link: "https://www.coursera.org/verify/professional-cert/G-PM-5540192",
    credentialId: "G-PM-5540192",
    issueDate: "October 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-google-cyber",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    category: "Google Professional Certificates",
    date: "2024",
    skills: ["Cybersecurity", "Network Security", "Linux", "Python Security"],
    link: "https://www.coursera.org/verify/professional-cert/G-CYBER-4410295",
    credentialId: "G-CYBER-4410295",
    issueDate: "September 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-google-it-support",
    title: "Google IT Support Professional Certificate",
    issuer: "Google",
    category: "Google Professional Certificates",
    date: "2024",
    skills: ["IT Support", "Networking", "Operating Systems", "System Administration"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "June 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-google-it-automation",
    title: "Google IT Automation with Python Professional Certificate",
    issuer: "Google",
    category: "Google Professional Certificates",
    date: "2024",
    skills: ["Python", "Git & GitHub", "Automation", "Configuration Management"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "July 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-google-ux",
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    category: "Google Professional Certificates",
    date: "2024",
    skills: ["UX Design", "Wireframing", "Prototyping", "User Research"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "August 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-google-marketing",
    title: "Google Digital Marketing & E-commerce Professional Certificate",
    issuer: "Google",
    category: "Google Professional Certificates",
    date: "2024",
    skills: ["Digital Marketing", "E-commerce", "SEO", "Email Marketing"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "September 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-google-ai-essentials",
    title: "Google AI Essentials",
    issuer: "Google",
    category: "Google AI",
    date: "2024",
    skills: ["Generative AI", "Prompt Engineering", "AI Ethics", "AI Productivity"],
    link: "https://www.coursera.org/verify/professional-cert/G-AIE-1120492",
    credentialId: "G-AIE-1120492",
    issueDate: "August 2024",
    expiration: "Never Expires",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-google-prompting-essentials",
    title: "Google Prompting Essentials",
    issuer: "Google",
    category: "Google AI",
    date: "2024",
    skills: ["Prompt Engineering", "LLM Task Planning", "Task Automation"],
    link: "https://www.coursera.org/verify/professional-cert/G-PE-2230194",
    credentialId: "G-PE-2230194",
    issueDate: "July 2024",
    expiration: "Never Expires",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-ga4-individual",
    title: "Google Analytics (GA4) Individual Qualification",
    issuer: "Google Skillshop",
    category: "Google Analytics",
    date: "2024",
    skills: ["GA4", "Web Analytics", "Data Tracking", "Audience Segmentation"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "May 2024",
    expiration: "May 2025",
    credentialLevel: "Advanced",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-skillshop-ads-search",
    title: "Google Ads Search Certification",
    issuer: "Google Skillshop",
    category: "Google Skillshop",
    date: "2024",
    skills: ["Google Ads", "Search Marketing", "PPC Campaigns"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "April 2024",
    expiration: "April 2025",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-skillshop-ads-display",
    title: "Google Ads Display Certification",
    issuer: "Google Skillshop",
    category: "Google Skillshop",
    date: "2024",
    skills: ["Google Ads", "Display Advertising", "Visual Campaigns"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "April 2024",
    expiration: "April 2025",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-skillshop-ads-video",
    title: "Google Ads Video Certification",
    issuer: "Google Skillshop",
    category: "Google Skillshop",
    date: "2024",
    skills: ["Google Ads", "Video Marketing", "YouTube Campaigns"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "April 2024",
    expiration: "April 2025",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-skillshop-ads-measurement",
    title: "Google Ads Measurement Certification",
    issuer: "Google Skillshop",
    category: "Google Skillshop",
    date: "2024",
    skills: ["Google Ads", "Measurement Analytics", "ROI Metrics"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "May 2024",
    expiration: "May 2025",
    credentialLevel: "Advanced",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-gcloud-ace",
    title: "Google Cloud Certified Associate Cloud Engineer",
    issuer: "Google Cloud Skills",
    category: "Google Cloud Skills",
    date: "2024",
    skills: ["Google Cloud", "Cloud Infrastructure", "Kubernetes", "IAM Security"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "November 2024",
    expiration: "November 2026",
    credentialLevel: "Advanced",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-gcloud-fundamentals",
    title: "Google Cloud Fundamentals: Core Infrastructure",
    issuer: "Google Cloud Skills",
    category: "Google Cloud Skills",
    date: "2024",
    skills: ["Google Cloud", "Cloud Computing", "App Engine", "Compute Engine"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "October 2024",
    expiration: "Never Expires",
    credentialLevel: "Beginner",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-gcloud-genai-path",
    title: "Generative AI Learning Path",
    issuer: "Google Cloud Skills",
    category: "Google Cloud Skills",
    date: "2024",
    skills: ["Generative AI", "Large Language Models", "Vertex AI", "Image Generation"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "August 2024",
    expiration: "Never Expires",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-gworkspace-admin",
    title: "Google Workspace Administration Specialization",
    issuer: "Coursera",
    category: "Coursera",
    date: "2024",
    skills: ["Google Workspace", "Domain Management", "Workspace Security", "Gmail Setup"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "March 2024",
    expiration: "Never Expires",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-kaggle-programming",
    title: "Intro to Programming Certificate",
    issuer: "Kaggle",
    category: "Kaggle",
    date: "2023",
    skills: ["Python", "Algorithms", "Programming Basics"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "January 2023",
    expiration: "Never Expires",
    credentialLevel: "Beginner",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-kaggle-pandas",
    title: "Pandas Certificate",
    issuer: "Kaggle",
    category: "Kaggle",
    date: "2023",
    skills: ["Pandas", "Python Data Science", "Data Manipulation"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "February 2023",
    expiration: "Never Expires",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-kaggle-ml",
    title: "Intermediate Machine Learning Certificate",
    issuer: "Kaggle",
    category: "Kaggle",
    date: "2023",
    skills: ["Machine Learning", "Random Forests", "XGBoost", "Data Preprocessing"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "June 2023",
    expiration: "Never Expires",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-kaggle-feature-eng",
    title: "Feature Engineering Certificate",
    issuer: "Kaggle",
    category: "Kaggle",
    date: "2023",
    skills: ["Machine Learning", "Feature Engineering", "Data Analytics"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "July 2023",
    expiration: "Never Expires",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-kaggle-deep-learning",
    title: "Intro to Deep Learning Certificate",
    issuer: "Kaggle",
    category: "Kaggle",
    date: "2023",
    skills: ["Deep Learning", "Neural Networks", "TensorFlow"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "August 2023",
    expiration: "Never Expires",
    credentialLevel: "Advanced",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-kaggle-data-viz",
    title: "Data Visualization Certificate",
    issuer: "Kaggle",
    category: "Kaggle",
    date: "2023",
    skills: ["Data Visualization", "Seaborn", "Python"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "March 2023",
    expiration: "Never Expires",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-navttc-data-science",
    title: "Advanced Data Science & Analytics Certificate",
    issuer: "NAVTTC",
    category: "NAVTTC",
    date: "2024",
    skills: ["Data Science", "Python", "Data Modeling", "Statistical Analytics"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "December 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-navttc-bi-python",
    title: "Business Intelligence & Python Certification",
    issuer: "NAVTTC",
    category: "NAVTTC",
    date: "2024",
    skills: ["Business Intelligence", "Power BI", "Python Automation", "SQL"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "November 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-gworkspace-support",
    title: "Google Workspace Support Certificate",
    issuer: "Coursera",
    category: "Coursera",
    date: "2024",
    skills: ["Google Workspace", "Technical Support", "Troubleshooting"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "April 2024",
    expiration: "Never Expires",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-gworkspace-security",
    title: "Google Workspace Security Certificate",
    issuer: "Coursera",
    category: "Coursera",
    date: "2024",
    skills: ["Google Workspace", "Cloud Security", "IAM Policies"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "May 2024",
    expiration: "Never Expires",
    credentialLevel: "Advanced",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-gworkspace-mail-badge",
    title: "Google Workspace Mail Management Badge",
    issuer: "Google Skillshop",
    category: "Google Skillshop",
    date: "2024",
    skills: ["Google Workspace", "Email Routing", "Gmail Security"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "July 2024",
    expiration: "Never Expires",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-gcloud-bigquery-badge",
    title: "Google Cloud Skills Badge: BigQuery Basics",
    issuer: "Google Cloud Skills",
    category: "Google Cloud Skills",
    date: "2024",
    skills: ["BigQuery", "SQL Queries", "Data Warehousing"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "August 2024",
    expiration: "Never Expires",
    credentialLevel: "Beginner",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-gcloud-looker-badge",
    title: "Google Cloud Skills Badge: Looker Business Analyst",
    issuer: "Google Cloud Skills",
    category: "Google Cloud Skills",
    date: "2024",
    skills: ["Looker", "Business Intelligence", "Dashboard Design", "LookML"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "September 2024",
    expiration: "Never Expires",
    credentialLevel: "Advanced",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-gcloud-vertex-badge",
    title: "Google Cloud Skills Badge: Vertex AI Prompt Engineering",
    issuer: "Google Cloud Skills",
    category: "Google Cloud Skills",
    date: "2024",
    skills: ["Generative AI", "Vertex AI", "Prompt Engineering"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "October 2024",
    expiration: "Never Expires",
    credentialLevel: "Advanced",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-credly-pm-practitioner",
    title: "Google Project Management Practitioner",
    issuer: "Credly",
    category: "Credly Badges",
    date: "2024",
    skills: ["Project Management", "Agile Execution", "Stakeholder Management"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "October 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-credly-cyber-practitioner",
    title: "Google Cybersecurity Practitioner",
    issuer: "Credly",
    category: "Credly Badges",
    date: "2024",
    skills: ["Cybersecurity Operations", "Risk Assessment", "Network Auditing"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "September 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-credly-data-practitioner",
    title: "Google Data Analytics Practitioner",
    issuer: "Credly",
    category: "Credly Badges",
    date: "2024",
    skills: ["Data Analytics", "SQL Databases", "Data Insights"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "December 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-credly-ux-practitioner",
    title: "Google UX Design Practitioner",
    issuer: "Credly",
    category: "Credly Badges",
    date: "2024",
    skills: ["UX Research", "Figma", "User-Centered Design"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "August 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-educert-level1",
    title: "Google Certified Educator Level 1",
    issuer: "Google Educertifications",
    category: "Other Professional Credentials",
    date: "2024",
    skills: ["Google Workspace for Education", "Digital Classroom", "Student Collaboration"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "March 2024",
    expiration: "March 2027",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-educert-level2",
    title: "Google Certified Educator Level 2",
    issuer: "Google Educertifications",
    category: "Other Professional Credentials",
    date: "2024",
    skills: ["Advanced Educational Tech", "Custom Curriculums", "Analytics in Classroom"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "April 2024",
    expiration: "April 2027",
    credentialLevel: "Advanced",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-credentialnet-saylani",
    title: "Saylani Welfare Mass IT Training - BI Specialist",
    issuer: "Credential.net",
    category: "Credential.net",
    date: "2024",
    skills: ["Business Intelligence", "Power BI", "SQL Data Models", "ETL Pipelines"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "August 2024",
    expiration: "Never Expires",
    credentialLevel: "Professional",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  },
  {
    id: "cert-gemini-intro",
    title: "Intro to Generative AI with Gemini",
    issuer: "Google Skillshop",
    category: "Google AI",
    date: "2024",
    skills: ["Generative AI", "Gemini Applications", "AI Workflow Integration"],
    link: "", // To Be Added
    credentialId: "To Be Added",
    issueDate: "June 2024",
    expiration: "Never Expires",
    credentialLevel: "Intermediate",
    issuerLogo: "",
    credentialImage: "",
    featured: false,
  }
];

const mappedCredentials = registryCredentials.map(cert => {
  const issuerFolder = cert.issuer.toLowerCase()
    .replace("google skillshop", "google-skillshop")
    .replace(/\s+/g, "-");
  
  const logoName = cert.issuer.toLowerCase()
    .replace("google skillshop", "google")
    .replace(/\s+/g, "-");

  return {
    ...cert,
    credentialImage: cert.credentialImage || `/assets/certificates/${issuerFolder}/${cert.id}.webp`,
    issuerLogo: cert.issuerLogo || `/assets/logos/${logoName}.svg`
  };
});

interface CertGridProps {
  isHomepagePreview?: boolean;
  onNavigate?: (pageId: string) => void;
}

export default function CertGrid({ isHomepagePreview = false, onNavigate }: CertGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (selectedCert) {
      telemetry.trackCertificationOpen(selectedCert.id, selectedCert.issuer);
    }
  }, [selectedCert]);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIssuer, setSelectedIssuer] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(7);

  // Dynamic values extracted from the registry
  const categories = Array.from(new Set(mappedCredentials.map((c) => c.category).filter(Boolean))) as string[];
  const issuers = Array.from(new Set(mappedCredentials.map((c) => c.issuer).filter(Boolean))) as string[];
  const years = Array.from(new Set(mappedCredentials.map((c) => c.date).filter(Boolean))).sort((a, b) => b.localeCompare(a)) as string[];
  const topSkills = Array.from(
    new Set(mappedCredentials.flatMap((c) => c.skills).filter(Boolean))
  ).sort() as string[];

  // Statistics generated dynamically from registry
  const totalCerts = mappedCredentials.length;
  
  const totalBadges = mappedCredentials.filter(
    (c) => 
      c.category === "Google Cloud Skills" || 
      c.category === "Credly Badges" || 
      c.title.toLowerCase().includes("badge")
  ).length;

  const profCerts = mappedCredentials.filter(
    (c) => 
      c.category === "Google Professional Certificates" || 
      c.title.toLowerCase().includes("professional certificate")
  ).length;

  const uniqueIssuersCount = new Set(mappedCredentials.map((c) => c.issuer)).size;
  const uniqueYearsCount = new Set(mappedCredentials.map((c) => c.date)).size;

  // Filter Logic
  const filteredCerts = mappedCredentials.filter((cert) => {
    const matchCategory = selectedCategory === "All" || cert.category === selectedCategory;
    const matchIssuer = selectedIssuer === "All" || cert.issuer === selectedIssuer;
    const matchYear = selectedYear === "All" || cert.date === selectedYear;
    const matchSkill = selectedSkill === "All" || cert.skills.includes(selectedSkill);
    return matchCategory && matchIssuer && matchYear && matchSkill;
  });

  const displayedCerts = isHomepagePreview
    ? mappedCredentials.slice(0, 3)
    : filteredCerts.slice(0, visibleCount);

  const openPreview = (cert: Certificate) => {
    setSelectedCert(cert);
  };

  const closePreview = () => {
    setSelectedCert(null);
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedIssuer("All");
    setSelectedYear("All");
    setSelectedSkill("All");
    setVisibleCount(7);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const handleShowLess = () => {
    setVisibleCount(7);
  };

  return (
    <section 
      id="cert-grid" 
      className="py-16 md:py-20 bg-slate-50 border-b border-slate-200 px-6 md:px-8 relative"
      aria-label="Verified Professional Credentials"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow="Continuous Learning"
          title="Professional Certifications"
          description="A verified directory of professional credentials in business intelligence, automation, and project management issued by Google, IBM, and Microsoft."
        />

        {/* Dynamic Filters Bar */}
        {!isHomepagePreview && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-3xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto flex-1">
              {/* Category Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setVisibleCount(7);
                  }}
                  className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-800 text-[11px] font-sans font-medium px-2.5 py-2 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Issuer Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Issuer</label>
                <select
                  value={selectedIssuer}
                  onChange={(e) => {
                    setSelectedIssuer(e.target.value);
                    setVisibleCount(7);
                  }}
                  className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-800 text-[11px] font-sans font-medium px-2.5 py-2 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="All">All Issuers</option>
                  {issuers.map((iss) => (
                    <option key={iss} value={iss}>{iss}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setVisibleCount(7);
                  }}
                  className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-800 text-[11px] font-sans font-medium px-2.5 py-2 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="All">All Years</option>
                  {years.map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>

              {/* Skill Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Skill Domain</label>
                <select
                  value={selectedSkill}
                  onChange={(e) => {
                    setSelectedSkill(e.target.value);
                    setVisibleCount(7);
                  }}
                  className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-800 text-[11px] font-sans font-medium px-2.5 py-2 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="All">All Skills</option>
                  {topSkills.map((sk) => (
                    <option key={sk} value={sk}>{sk}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reset Filters CTA */}
            {(selectedCategory !== "All" || selectedIssuer !== "All" || selectedYear !== "All" || selectedSkill !== "All") && (
              <button
                onClick={handleResetFilters}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold font-mono tracking-wider uppercase rounded-lg transition-colors cursor-pointer w-full md:w-auto"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        )}

        {/* 4-Column Balanced High-Density Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCerts.map((cert) => (
            <ExecutiveCard
              key={cert.id}
              level={1}
              className="h-full"
            >
              <div className="p-5 flex flex-col justify-between h-full w-full">
                <div className="space-y-4">
                {/* Organization Logo & Date */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    {cert.issuerLogo ? (
                      <img 
                        src={cert.issuerLogo} 
                        alt={cert.issuer} 
                        className="w-4 h-4 object-contain" 
                        loading="lazy"
                      />
                    ) : (
                      <Award className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span className="text-[10px] font-mono text-slate-800 font-bold uppercase tracking-wider">
                      {cert.issuer}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-medium">
                    {cert.date}
                  </span>
                </div>

                {/* Certificate Title */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 font-sans leading-snug line-clamp-2 min-h-[36px]">
                    {cert.title}
                  </h3>
                </div>

                {/* Verification Status Badge */}
                <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50/50 border border-emerald-100/80 px-2.5 py-1 rounded-md w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider">
                    Verified Credential
                  </span>
                </div>

                {/* Concise Skill Domain Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="text-[9px] font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Preview and Link */}
              <div className="border-t border-slate-100 pt-4 mt-5 space-y-2">
                <button
                  onClick={() => openPreview(cert)}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-950 text-[10px] font-bold font-mono tracking-wider uppercase rounded-lg transition-colors cursor-pointer shadow-3xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Doc</span>
                </button>
                <a
                  href={cert.link || "https://www.credly.com/users/mudassirdandor"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-white text-[10px] font-bold font-mono tracking-wider uppercase rounded-lg transition-colors cursor-pointer shadow-3xs"
                >
                  <span>{cert.link ? "Verify Online" : "Verify on Credly"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              </div>
            </ExecutiveCard>
          ))}

          {/* Clean empty state block if no credentials match filters */}
          {filteredCerts.length === 0 && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white border border-slate-200 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[280px]">
              <Award className="w-8 h-8 text-slate-300 mb-3" />
              <p className="text-xs font-bold text-slate-800 font-sans">No matching credentials found</p>
              <p className="text-[10px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                Try resetting or adjusting your filter criteria to see verified professional credentials.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white text-[10px] font-bold font-mono tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Credential Summary Panel - Statically rendered, styled as high-contrast dominant Registry Preview Card on homepage */}
          <ExecutiveCard
            level={isHomepagePreview ? 1 : 2}
            onClick={() => {
              if (isHomepagePreview && onNavigate) {
                onNavigate("certifications");
              }
            }}
            className="h-full"
          >
            <div className={`p-5 flex flex-col justify-between text-left h-full w-full ${
              isHomepagePreview 
                ? "bg-gradient-to-br from-blue-50/20 to-white hover:shadow-xs cursor-pointer" 
                : "bg-gradient-to-br from-slate-100/30 to-slate-50/30"
            }`}>
              <div className="space-y-4">
              {/* Card Top */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider">
                    Registry Summary
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">
                  Active Log
                </span>
              </div>
              
              {/* Card Header Title */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900 font-sans leading-snug">
                  Continuous Learning
                </h3>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Verified learning metrics and credentials tracked in real-time.
                </p>
              </div>

              {/* Dynamic list of summary items */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-2.5 shadow-3xs">
                <div className="flex items-center justify-between gap-2 text-[10.5px] font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Total Certifications</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900">{totalCerts}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-[10.5px] font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Total Skill Badges</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900">{totalBadges}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-[10.5px] font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Professional Certs</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900">{profCerts}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-[10.5px] font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Training Providers</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900">{uniqueIssuersCount}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-[10.5px] font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Learning Years</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900">{uniqueYearsCount}</span>
                </div>
              </div>
            </div>

            {/* Verified Indicator Button */}
            <div className="border-t border-slate-200/60 pt-4 mt-5">
              {isHomepagePreview ? (
                <button
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-white text-[10.5px] font-bold font-mono tracking-wider uppercase rounded-lg border border-transparent cursor-pointer transition-colors"
                >
                  <span>View Complete Registry →</span>
                </button>
              ) : (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-150/40 text-slate-400 text-[10.5px] font-bold font-mono tracking-wider uppercase rounded-lg border border-slate-200/50 cursor-not-allowed"
                >
                  <span>Registry Log Verified</span>
                </button>
              )}
            </div>
            </div>
          </ExecutiveCard>
        </div>

        {/* Dynamic Load More / Show Less Button */}
        {!isHomepagePreview && filteredCerts.length > 7 && (
          <div className="flex justify-center mt-10">
            {visibleCount < filteredCerts.length ? (
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-bold font-mono tracking-wider uppercase rounded-xl transition-all shadow-3xs cursor-pointer"
              >
                <span>View All Credentials ({filteredCerts.length - visibleCount} More)</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            ) : (
              <button
                onClick={handleShowLess}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-bold font-mono tracking-wider uppercase rounded-xl transition-all shadow-3xs cursor-pointer"
              >
                <span>Show Less</span>
                <X className="w-4 h-4 text-slate-500" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Credential Verification & Previewing */}
      <AnimatePresence>
        {selectedCert && (
          <GlobalModal
            onClose={closePreview}
            maxWidthClassName="max-w-lg"
            heightClassName="h-auto max-h-[92vh]"
            overlayClassName="bg-slate-950/60 backdrop-blur-xs"
          >
              {/* Header */}
              <div className="flex justify-between items-center px-5 py-3 border-b border-slate-100 bg-slate-50">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Credential Authenticator
                </span>
                <button
                  onClick={closePreview}
                  className="p-1 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                  aria-label="Close modal preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Custom Image/Placeholder Area */}
              <div className="p-6">
                <ContentPlaceholder
                  variant="certificate"
                  src={selectedCert.credentialImage}
                  alt={selectedCert.title}
                  title={selectedCert.title}
                  metadata={{
                    issuer: selectedCert.issuer,
                    credentialId: selectedCert.credentialId,
                    issueDate: selectedCert.issueDate,
                    expirationDate: selectedCert.expiration,
                  }}
                />
              </div>

              {/* Skills and Verification Link */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-left">
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">Skills Authenticated</span>
                  <p className="text-[10.5px] font-sans font-bold text-slate-700">
                    {selectedCert.skills.join(" • ")}
                  </p>
                </div>
                <a
                  href={selectedCert.link || "https://www.credly.com/users/mudassirdandor"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => telemetry.trackCredentialExternalClick(selectedCert.id, selectedCert.link || "https://www.credly.com/users/mudassirdandor")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-mono font-bold uppercase rounded-lg shadow-3xs cursor-pointer transition-colors"
                >
                  <span>{selectedCert.link ? "Verify Online" : "Verify on Credly"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
          </GlobalModal>
        )}
      </AnimatePresence>
    </section>
  );
}
