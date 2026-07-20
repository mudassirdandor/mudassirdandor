import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  ExternalLink, 
  UserCheck, 
  HelpCircle, 
  FileCode, 
  Github, 
  Linkedin, 
  Award, 
  Briefcase, 
  Globe, 
  MapPin, 
  GraduationCap, 
  Terminal, 
  Server, 
  BookOpen,
  Share2
} from "lucide-react";

interface PresenceLink {
  label: string;
  url: string;
  displayUrl: string;
  description: string;
  trustSignal: string;
}

interface PresenceGroup {
  id: string;
  title: string;
  description: string;
  links: PresenceLink[];
}

const presenceGroups: PresenceGroup[] = [
  {
    id: "profiles",
    title: "Professional Profiles",
    description: "Primary digital hubs and source code repositories documenting active engineering contributions.",
    links: [
      {
        label: "GitHub Developer Workspace",
        url: "https://github.com/mudassirdandor",
        displayUrl: "github.com/mudassirdandor",
        description: "Central repository hosting open-source code, custom SQL scripts, and analytical pipelines.",
        trustSignal: "Verified Open Source Publisher"
      },
      {
        label: "LinkedIn Professional Network",
        url: "https://www.linkedin.com/in/mudassirdandor",
        displayUrl: "linkedin.com/in/mudassirdandor",
        description: "Primary channel for executive networking, client testimonials, and business consulting inquiries.",
        trustSignal: "Identity Verified Professional"
      },
      {
        label: "Kaggle Data Science Portfolio",
        url: "https://www.kaggle.com/malikzada00",
        displayUrl: "kaggle.com/malikzada00",
        description: "Quantitative notebooks, retail basket datasets, and statistical distributions.",
        trustSignal: "Verified Competitor & Contributor"
      }
    ]
  },
  {
    id: "credentials",
    title: "Professional Credentials",
    description: "Third-party verified achievements, technical badges, and official certifications.",
    links: [
      {
        label: "Google Cloud Skills Profile",
        url: "https://www.skills.google/public_profiles/5b997baa-bcbc-41a7-8f32-3b97bbbc4424",
        displayUrl: "skills.google/.../5b997baa",
        description: "Official public record of cloud competencies, database deployments, and infrastructure badges.",
        trustSignal: "Google Cloud Public Verifiably Linked"
      },
      {
        label: "Credly Badge Registry",
        url: "https://www.credly.com/users/mudassirdandor",
        displayUrl: "credly.com/users/mudassirdandor",
        description: "Consolidated register of academic and enterprise technical badges.",
        trustSignal: "Official Credly Partner Verified"
      },
      {
        label: "Google Educertifications Wallet",
        url: "https://edu.google.accredible.com/profile/mudassirjaved922949/wallet",
        displayUrl: "edu.google.accredible.com/.../wallet",
        description: "Credential wallet containing educational technology and training verifications.",
        trustSignal: "Accredible Verifiable ID"
      },
      {
        label: "Credential.net Professional Wallet",
        url: "https://www.credential.net/profile/mudassirjaved/wallet",
        displayUrl: "credential.net/profile/mudassirjaved",
        description: "Direct verification profile for enterprise analytical specializations.",
        trustSignal: "Secured Blockchain Verification"
      },
      {
        label: "Skillshop Accredible Ledger",
        url: "https://skillshop.accredible.com/profile/b8ed979a-ef44-4211-a86c-d3d467978044",
        displayUrl: "skillshop.accredible.com/.../profile",
        description: "Public credentials ledger for Google Analytics, Maps Platform, and Business Profiles.",
        trustSignal: "Accredible Public Ledger Active"
      }
    ]
  },
  {
    id: "services",
    title: "Professional Service Outlets",
    description: "Verified contract consulting channels providing independent technical execution.",
    links: [
      {
        label: "Freelancer Corporate Console",
        url: "https://www.freelancer.pk/u/MudassirJDev",
        displayUrl: "freelancer.pk/u/MudassirJDev",
        description: "Independent business analyst contract deployment platform with client reviews.",
        trustSignal: "Verified Identity & Payment Ledger"
      },
      {
        label: "Fiverr Enterprise Hub",
        url: "https://www.fiverr.com/users/malikzada97",
        displayUrl: "fiverr.com/users/malikzada97",
        description: "Niche contract delivery workspace specializing in advanced Power BI and Automation briefs.",
        trustSignal: "Level-Verified Active Operator"
      }
    ]
  },
  {
    id: "communities",
    title: "Professional Communities",
    description: "Client communications, technical updates, and regional business discussion hubs.",
    links: [
      {
        label: "Facebook Business Page",
        url: "https://www.facebook.com/mudassirdandor",
        displayUrl: "facebook.com/mudassirdandor",
        description: "Operational updates, case study announcements, and regional consulting discussions.",
        trustSignal: "Official Brand Page Registered"
      }
    ]
  },
  {
    id: "socials",
    title: "Subtle Social Profiles (Low Priority Reference)",
    description: "Auxiliary channels supporting non-technical, localized branding.",
    links: [
      {
        label: "Facebook Professional Bio",
        url: "https://www.facebook.com/malikzadamudassir",
        displayUrl: "facebook.com/malikzadamudassir",
        description: "Secondary communication bridge for client-facing local consultations.",
        trustSignal: "Personal Identity Confirmed"
      },
      {
        label: "Instagram Creative Log",
        url: "https://www.instagram.com/mudassirdandor",
        displayUrl: "instagram.com/mudassirdandor",
        description: "Occasional lifestyle and branding snapshots of work milestones.",
        trustSignal: "Linked Instagram Brand"
      },
      {
        label: "X / Twitter Brand Channel",
        url: "https://x.com/mudassirdandor",
        displayUrl: "x.com/mudassirdandor",
        description: "Industry news shares and analytical micro-commentary.",
        trustSignal: "Verified Brand Username"
      },
      {
        label: "TikTok Technical Shorts",
        url: "https://www.tiktok.com/@mudassirdandor",
        displayUrl: "tiktok.com/@mudassirdandor",
        description: "Short-form video demonstrations of dashboard UI/UX and automation setups.",
        trustSignal: "Linked Social Media Entity"
      }
    ]
  }
];

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  schemaSnippet: string;
}

const faqItems: FAQItem[] = [
  {
    id: "identity",
    question: "Who is Mudassir Javed?",
    answer: "Mudassir Javed is an Executive Decision Intelligence Consultant and Data Specialist operating under the professional brand mudassirdandor. Based in Quetta, Balochistan, Pakistan, he holds an MSc in Statistics from the University of Balochistan and specializes in constructing high-integrity executive dashboards that translate raw, multi-channel corporate datasets into actionable decisions.",
    schemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mudassir Javed",
  "alternateName": "mudassirdandor",
  "jobTitle": "Executive Decision Intelligence Consultant",
  "homeLocation": "Quetta, Balochistan, Pakistan",
  "almaMater": "University of Balochistan",
  "knowsAbout": ["Business Intelligence", "Data Analytics", "AI Automation"]
}`
  },
  {
    id: "specializations",
    question: "What are his primary areas of expertise?",
    answer: "Mudassir specializes in five integrated domains: Business Intelligence (enterprise dashboard design, ETL pipeline creation, semantic modeling), Data Analytics (rigorous statistical reasoning, trend forecasting, diagnostics), AI Automation (LLM agent engineering, serverless workflow relays), Web Development (highly polished executive portfolio hubs), and Local Business Intelligence (Google Maps performance optimization and Share-of-Voice analytics).",
    schemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": {
    "@type": "Person",
    "name": "Mudassir Javed"
  },
  "serviceType": "Decision Intelligence & BI Consulting",
  "areaServed": "Global",
  "offers": [
    "Enterprise Dashboard Engineering",
    "Serverless AI Automation",
    "Local BI Optimizations"
  ]
}`
  },
  {
    id: "tech-stack",
    question: "What technical tools and languages does he use?",
    answer: "His technical stack is fully modern and rigorously applied: Analytics & BI includes Power BI, DAX, Excel Advanced, Star-Schema Modeling, SQL Server, PostgreSQL, and Google Sheets. Languages & Frameworks include Python (Pandas, Numpy, Scikit-Learn), TypeScript, React, Tailwind CSS, and Google Apps Script. AI & Automation includes the Gemini API SDK, custom LLM prompt engineering architectures, and serverless workflow relays.",
    schemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "ComputerLanguage",
  "name": "TypeScript",
  "alternateName": "Python, SQL, DAX, Google Apps Script",
  "description": "Utilized to compile and build secure serverless pipelines, analytical data structures, and dashboard frontends."
}`
  },
  {
    id: "industries",
    question: "Which business sectors has he built solutions for?",
    answer: "Mudassir has successfully designed decision intelligence systems for Healthcare Systems (clinical ER patient wait times and resource scheduling), SaaS & Cloud Software (rolling customer clickstream analyses and predictive monthly churn classifiers), Corporate Finance (aging AP/AR accounts balances modeling and cash runway forecasting), Retail & Consumer Goods (transaction receipt market-basket rule mining), and International NGOs (geospatial resource deployment trackers).",
    schemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": " mudassirdandor Business Intelligence Portfolio",
  "genre": "Enterprise Analytics Solutions",
  "audience": "Corporate Directors & Executive Decision-Makers"
}`
  },
  {
    id: "credentials-faq",
    question: "Are his technical credentials and badges verified?",
    answer: "Yes, every professional credential is verifiably anchored to third-party databases. These include Google Cloud Skills Profiles, official Credly registry badges, Google Education Accredible credentials, and verified Skillshop portfolios. These records mathematically guarantee his foundational capabilities in analytical engineering.",
    schemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalCredential",
  "name": "Google Cloud & Analytics Badges",
  "credentialCategory": "Professional Certification",
  "recognizedBy": {
    "@type": "Organization",
    "name": "Google"
  }
}`
  },
  {
    id: "services-faq",
    question: "What services does he deliver under consultation contracts?",
    answer: "Mudassir offers bespoke consulting briefs including high-end Enterprise Dashboard Engineering (Power BI), secure serverless SQL views and pipeline development, custom CRM/Google Workspace automated scripts, geospatial local demand and drive-time heatmapping, and competitive local rank SEO analysis grids.",
    schemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "mudassirdandor Decision Intelligence Services",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Quetta",
    "addressRegion": "Balochistan",
    "addressCountry": "Pakistan"
  },
  "telephone": "Intake portal on mudassirdandor.com"
}`
  },
  {
    id: "contact-faq",
    question: "How can enterprise clients initiate a contract brief?",
    answer: "Contract inquiries, consulting proposals, and analytics briefs are initiated through the secure intake console on this platform. Direct communication can also be established via LinkedIn (linkedin.com/in/mudassirdandor) or via direct email at malikmudassir1997@gmail.com for verified project reviews.",
    schemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  "contactType": "Professional Consulting Intake",
  "email": "malikmudassir1997@gmail.com",
  "url": "https://mudassirdandor.com/#contact"
}`
  },
  {
    id: "projects-faq",
    question: "What major real-world projects are verifiably documented?",
    answer: "His portfolio details 11 verified projects including the Saylani Student Portal (client-side React engine with automated Apps Script Google Sheets registries), global Star-Schema Power BI Sales diagnostics, Seasonal CFO accounts ledger forecasts, and neighborhood GIS coordinate Maps Share-of-Voice (SoV) ranking matrices.",
    schemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "Project",
  "name": "Saylani Portal Client-Side Sheet Registry",
  "description": "Constructed client-side course registry linking serverless Google Apps Script triggers mapping registries securely."
}`
  }
];

export default function PresenceAndKnowledge() {
  const [activeTab, setActiveTab] = useState<"presence" | "aeo">("presence");
  const [expandedFaq, setExpandedFaq] = useState<Record<string, boolean>>({
    identity: true // Default expanded for immediate AI scraping
  });
  const [showSchemaId, setShowSchemaId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copySchemaToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    // Flash indicator
    const btn = document.getElementById(`copy-btn-${id}`);
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = "Copied JSON-LD!";
      btn.classList.add("bg-emerald-100", "text-emerald-800", "border-emerald-200");
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove("bg-emerald-100", "text-emerald-800", "border-emerald-200");
      }, 1500);
    }
  };

  return (
    <div 
      id="presence-and-knowledge-panel"
      className="bg-white border border-slate-200 rounded-2xl shadow-sm relative overflow-hidden my-16 focus:outline-none"
      role="region"
      aria-label="Verified Digital Presence & AI Knowledge Base"
    >
      {/* Visual background ambient accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/[0.01] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/[0.01] rounded-full blur-[80px] pointer-events-none" />

      {/* Header element */}
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-executive-blue" />
            <span className="font-mono text-[9px] tracking-widest text-executive-blue uppercase font-bold">
              Identity & Verification Console
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 font-sans">
            Mudassir Javed Digital HQ & Knowledge Graph
          </h3>
          <p className="text-xs text-slate-500 max-w-2xl leading-normal font-normal">
            Authoritative professional directory built for both human review and Generative AI search engine indexing (AEO & GEO optimized).
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/50 self-start md:self-center">
          <button
            onClick={() => setActiveTab("presence")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "presence"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
            aria-selected={activeTab === "presence"}
            role="tab"
          >
            Digital Presence Hub
          </button>
          <button
            onClick={() => setActiveTab("aeo")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "aeo"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
            aria-selected={activeTab === "aeo"}
            role="tab"
          >
            AI Knowledge Base
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === "presence" ? (
            <motion.div
              key="presence-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="space-y-8"
              role="tabpanel"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {presenceGroups.slice(0, 4).map((group) => (
                  <div key={group.id} className="space-y-4 bg-slate-50/20 p-5 rounded-xl border border-slate-100 shadow-xs">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-900 font-sans tracking-tight uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-executive-blue" />
                        {group.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-normal leading-normal">
                        {group.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      {group.links.map((link, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white border border-slate-200/80 rounded-lg p-3 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                        >
                          <div className="space-y-1 max-w-[80%]">
                            <span className="block text-xs font-bold text-slate-800 font-sans">
                              {link.label}
                            </span>
                            <span className="block text-[10px] text-slate-500 italic font-normal">
                              {link.description}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[8px] font-mono text-emerald-600 font-bold uppercase bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                              {link.trustSignal}
                            </span>
                          </div>

                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-700 hover:text-executive-blue bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 p-2 rounded-md transition-colors self-start sm:self-center"
                            title={`Navigate to verified ${link.label}`}
                          >
                            <span>Open Link</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subdued Low-priority social profiles */}
              {presenceGroups.slice(4).map((group) => (
                <div key={group.id} className="pt-6 border-t border-slate-100 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-600 font-sans tracking-tight uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      {group.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-normal">
                      {group.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {group.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-50/50 border border-slate-100 hover:border-slate-200 rounded-lg p-2.5 flex items-center justify-between gap-2 group transition-all"
                        title={`Navigate to subtle social link: ${link.label}`}
                      >
                        <div className="space-y-0.5">
                          <span className="block text-[10px] font-bold text-slate-700 group-hover:text-slate-900 font-sans">
                            {link.label.split(" ")[0]} Profile
                          </span>
                          <span className="block text-[9px] text-slate-400 font-mono tracking-tight">
                            {link.displayUrl}
                          </span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
                      </a>
                    ))}
                    {/* Snapchat raw text badge as it has no valid direct redirect without username verification redirects */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-2.5 flex items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="block text-[10px] font-bold text-slate-500 font-sans">
                          Snapchat ID
                        </span>
                        <span className="block text-[9px] text-slate-400 font-mono">
                          mudassirdandor
                        </span>
                      </div>
                      <span className="text-[8px] font-mono text-slate-400 uppercase bg-slate-100 border border-slate-200/50 px-1.5 py-0.5 rounded">
                        Text Key
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="aeo-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="space-y-6"
              role="tabpanel"
            >
              <div className="bg-blue-50/30 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-executive-blue mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-900 font-sans">
                    AEO & GEO Crawl Layer Enabled
                  </span>
                  <p className="text-[10px] text-slate-600 font-normal leading-relaxed">
                    This section presents structured, machine-verified factual questions and answers optimized for LLMs, Google AI Overviews, and neural search indexes. Turn on the <strong>JSON-LD Schema View</strong> to copy structured context directly into your indexer or model context.
                  </p>
                </div>
              </div>

              {/* Accordion Questions */}
              <div className="space-y-3.5">
                {faqItems.map((item) => {
                  const isExpanded = !!expandedFaq[item.id];
                  const isSchemaOpen = showSchemaId === item.id;
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`border rounded-xl transition-colors duration-200 overflow-hidden ${
                        isExpanded ? "border-slate-300 bg-slate-50/10" : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      {/* Question Toggle Box */}
                      <button
                        onClick={() => toggleFaq(item.id)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
                        aria-expanded={isExpanded}
                      >
                        <span className="text-xs md:text-sm font-bold text-slate-900 font-sans">
                          {item.question}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-mono uppercase bg-slate-100 text-slate-500 border border-slate-200/55 px-1.5 py-0.5 rounded">
                            {isExpanded ? "Collapse" : "Expand"}
                          </span>
                        </div>
                      </button>

                      {/* Content Section */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-slate-200/60 p-4 bg-slate-50/20 space-y-4"
                          >
                            <p className="text-xs text-slate-700 leading-relaxed font-normal">
                              {item.answer}
                            </p>

                            {/* Schema Code Toggle Trigger */}
                            <div className="flex items-center gap-3 pt-2">
                              <button
                                onClick={() => setShowSchemaId(isSchemaOpen ? null : item.id)}
                                className={`inline-flex items-center gap-1.5 text-[9px] font-mono font-bold border rounded px-2.5 py-1 transition-colors cursor-pointer ${
                                  isSchemaOpen 
                                    ? "bg-slate-900 border-slate-800 text-white hover:bg-slate-800" 
                                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800"
                                }`}
                              >
                                <FileCode className="w-3 h-3" />
                                <span>{isSchemaOpen ? "Hide Schema View" : "Show Schema View"}</span>
                              </button>

                              {isSchemaOpen && (
                                <button
                                  id={`copy-btn-${item.id}`}
                                  onClick={() => copySchemaToClipboard(item.schemaSnippet, item.id)}
                                  className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 rounded px-2.5 py-1 transition-colors cursor-pointer"
                                >
                                  <span>Copy JSON-LD Schema</span>
                                </button>
                              )}
                            </div>

                            {/* Schema View Code block */}
                            {isSchemaOpen && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-left relative"
                              >
                                <span className="absolute top-2.5 right-2.5 font-mono text-[7px] text-slate-500 uppercase tracking-widest bg-slate-900 px-1.5 py-0.5 rounded">
                                  JSON-LD
                                </span>
                                <pre className="font-mono text-[9px] text-blue-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-48 selection:bg-blue-600/30 selection:text-white">
                                  {item.schemaSnippet}
                                </pre>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust Bottom Banner */}
      <div className="bg-slate-50 border-t border-slate-100 p-4 px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Share2 className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-[8px] text-slate-400 uppercase tracking-wider">
            Verified Entity Graph Status: Active & Synced
          </span>
        </div>
        <span className="font-mono text-[8px] text-slate-400">
          Last Schema Crawl Validation: 2026-07-03
        </span>
      </div>
    </div>
  );
}
