import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { telemetry } from "../utils/telemetry";
import { projects } from "../data/projects";
import { Project } from "../types";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import CaseStudyLayout from "./CaseStudyLayout";
import GlobalModal from "./GlobalModal";
import ContentPlaceholder from "./ContentPlaceholder";
import ExecutiveCard from "./ExecutiveCard";
import ConnectedKnowledgeCard from "./ConnectedKnowledgeCard";
import { 
  X, 
  Github, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  Cpu, 
  Search, 
  BookOpen, 
  Eye, 
  FileSpreadsheet,
  FileText,
  TrendingUp,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  AlertTriangle,
  Compass,
  FileSignature,
  Laptop,
  Tablet,
  Smartphone,
  Server,
  Globe,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";

interface ExecutiveSummary {
  context: string;
  challenge: string;
  approach: string;
  insight: string;
  recommendation: string;
  businessValue: string;
}

interface Evidence {
  source: string;
  completeness: "High" | "Medium" | "Limited";
  scope: string;
  confidence: string;
}

interface ProjectConsultingDetails {
  businessContext: string;
  businessQuestions: string[];
  dataSources: string;
  methodology: string;
  executiveSummary: ExecutiveSummary;
  limitations: string[];
  futureEnhancements: string[];
  evidence: Evidence;
}

// Highly structured consulting intelligence mappings
const projectExtraDetails: Record<string, ProjectConsultingDetails> = {
  "sales-dashboard": {
    businessContext: "This case study focuses on global multi-region sales activities, assessing product catalog demand patterns, price elasticity, and freight logistics lines across four primary regional distribution hubs.",
    businessQuestions: [
      "Which specific product lines and regional sales channels drive the highest net profitability?",
      "Why are regional profit margins declining despite an upward trend in overall sales volume?",
      "What is the maximum effective discount ceiling that can be implemented before net margins are severely eroded?"
    ],
    dataSources: "Public transactional database containing 4.2 million synthesized sales and distribution records spanning 3 fiscal years (explicitly labeled as a public synthesized dataset for research).",
    methodology: "Aligned with Stage 1 & 2 of the Decision Intelligence Framework, we first structured KPI targets with regional directors, extracted records using optimized SQL views, designed a scalable star-schema model, computed rolling margins using complex DAX expressions, and conducted outlier filtration in Python to isolate seasonal anomalies.",
    executiveSummary: {
      context: "Global sales operations spanning multiple distribution hubs and product catalogs.",
      challenge: "Declining regional profit margins despite an upward trend in total revenue and transaction counts.",
      approach: "Built multi-dimensional database models and rolling discount elasticities within clean Power BI views.",
      insight: "Uncapped regional promotional discounting on low-tier products was actively cannibalizing high-margin core catalog revenue.",
      recommendation: "Implement a hard 15% promotional discount cap and redirect marketing budget to primary high-margin product categories.",
      businessValue: "Stabilizes overall gross margin floors and ensures promotional efforts yield positive net return."
    },
    limitations: [
      "Demonstration uses a public synthesized dataset instead of active client records.",
      "Lacks real-time point-of-sale data streams, relying on static daily batch loads.",
      "Does not account for qualitative regional sales team feedback or customer sentiment indicators."
    ],
    futureEnhancements: [
      "Integrate predictive demand forecasting models in Python to project monthly category inventory needs.",
      "Deploy real-time transactional ingestion alerts for margin drift anomalies.",
      "Incorporate direct competitive price index tracking within localized dashboards."
    ],
    evidence: {
      source: "Public Synthesized Research Dataset",
      completeness: "High",
      scope: "Descriptive & Diagnostic",
      confidence: "High confidence for historical trend identification; market variables require continuous calibration against live inputs."
    }
  },
  "financial-dashboard": {
    businessContext: "This study evaluates corporate treasury operations, examining accounts receivable (AR), accounts payable (AP), and working capital forecasting across multiple business units.",
    businessQuestions: [
      "Why is the Average Collection Period (DSO) steadily climbing, and in which sectors is operating liquidity bottlenecked?",
      "Which specific enterprise accounts carry the highest risk of long-term invoice delinquency?",
      "Where are overlapping SaaS subscriptions and duplicate office overheads unnecessarily inflating operational expenses (OPEX)?"
    ],
    dataSources: "Public financial ledger and balance sheet entries (synthesized sample databases utilized for analytical profiling).",
    methodology: "Following our Decision Intelligence Framework, we mapped operating liquidity requirements, integrated AP/AR datasets using SQL, built rolling aging buckets, ran seasonal cash projections, and deployed real-time cash flow alerts.",
    executiveSummary: {
      context: "Corporate treasury and cash management oversight across multiple operational units.",
      challenge: "Rising Days Sales Outstanding (DSO) values causing minor short-term capital liquidity bottlenecks.",
      approach: "Aggregated outstanding invoice ledgers into dynamic aging buckets paired with historical payment velocity factors.",
      insight: "Receivables delays were heavily concentrated within mid-market commercial contracts experiencing long administrative verification steps.",
      recommendation: "Standardize post-delivery payment triggers at 15 days and establish dedicated client portal integrations.",
      businessValue: "Reduces average collection cycles and improves treasury forecast accuracy."
    },
    limitations: [
      "Based strictly on historical snapshot files rather than direct bank API synchronization.",
      "Does not capture qualitative client billing disputes or invoice correction cycles.",
      "Anonymized corporate client identifiers restrict deeper structural relationship mapping."
    ],
    futureEnhancements: [
      "Incorporate direct ERP API connectors to calculate DSO dynamically on a daily basis.",
      "Design machine learning predictive invoice payment delay scorecards.",
      "Automate email follow-up notification triggers based on aging milestone violations."
    ],
    evidence: {
      source: "Public Treasury Snapshot Ledger",
      completeness: "High",
      scope: "Descriptive & Diagnostic",
      confidence: "High structural confidence for historical receivable patterns; billing behavior changes require qualitative account coordination."
    }
  },
  "hr-analytics": {
    businessContext: "This project analyzes corporate human resources trends, assessing workforce retention, pay parity structures, and employee engagement surveys within a rapidly growing technical firm.",
    businessQuestions: [
      "What core organizational and compensation milestones are most strongly correlated with voluntary staff departures?",
      "How severely does tenure-based pay compression between new external hires and veteran employees affect staff loyalty?",
      "Which management divisions require immediate attention due to declining team satisfaction indicators?"
    ],
    dataSources: "Anonymized public HR performance dataset detailing demographic tracking, tenure rates, compensation metrics, and employee satisfaction surveys.",
    methodology: "Adhering to Stage 3 of our framework, we analyzed voluntary turnover trends, engineered features matching compensation with current industry standards, trained classification models to calculate flight probabilities, and integrated risk scorecards.",
    executiveSummary: {
      context: "Enterprise talent management and employee attrition trends within a technical workforce.",
      challenge: "Elevated voluntary exit rates among high-skilled software and systems developers.",
      approach: "Modeled tenure milestones, compensation ratios, and team leadership feedback logs.",
      insight: "Attrition risk spikes sharply between month 18 and month 24, primarily driven by tenure-based compensation compression against market rates.",
      recommendation: "Conduct structured market adjustments at month 15 and optimize internal career growth paths.",
      businessValue: "Maintains engineering stability and lowers expensive recruitment and onboarding overheads."
    },
    limitations: [
      "Utilizes anonymized public sample records lacking localized qualitative exit feedback.",
      "Unable to track external macroeconomic changes (e.g., localized tech job market indices).",
      "Analysis is retrospective and does not capture immediate team sentiment changes."
    ],
    futureEnhancements: [
      "Integrate continuous sentiment analysis from anonymized internal team surveys.",
      "Develop predictive compensation modeling to optimize retention-to-cost ratios.",
      "Build dynamic automated dashboard triggers for elevated team departure risk zones."
    ],
    evidence: {
      source: "Anonymized Public Sample Dataset",
      completeness: "Medium",
      scope: "Descriptive & Diagnostic",
      confidence: "Moderate confidence; further qualitative interviews required to isolate individual non-monetary exit factors."
    }
  },
  "customer-churn": {
    businessContext: "This case study profiles subscriber retention within a high-volume Software-as-a-Service (SaaS) platform, tracking early-stage product onboarding and rolling customer usage metrics.",
    businessQuestions: [
      "At what precise step in the initial 14-day onboarding funnel are subscribers dropping off?",
      "What monthly product usage reductions serve as reliable indicators of cancellation 45 days in advance?",
      "How heavily does customer support ticket response speed affect contract renewal rates?"
    ],
    dataSources: "Anonymized SaaS product usage clickstreams, support ticket logs, and monthly subscription ledger data (public sample datasets).",
    methodology: "Aligned with Stage 5 & 6 of the framework, we translated product engagement patterns into user health indices, trained gradient-boosted classifiers to score active risk levels, and built automated customer retention pipelines.",
    executiveSummary: {
      context: "SaaS platform subscription metrics and onboarding conversion streams.",
      challenge: "High customer churn rate within the first 60 days of platform subscription.",
      approach: "Isolated clickstream steps and modeled support response speeds against rolling user login profiles.",
      insight: "Failing to establish a primary integration connection within the first 48 hours of signup is the leading indicator of churn.",
      recommendation: "Redesign the onboarding flow to prioritize immediate integration setup and automate support outreach.",
      businessValue: "Improves overall customer lifetime value (LTV) and boosts platform adoption rates."
    },
    limitations: [
      "Based on synthesized clickstream logs instead of direct production environment analytics.",
      "Lacks integration with qualitative customer success follow-up notes.",
      "Cannot trace external competitor promotional actions impacting subscription retention."
    ],
    futureEnhancements: [
      "Implement real-time in-app onboarding guides dynamically adjusted to user roles.",
      "Deploy automated churn risk notifications within Slack for customer success managers.",
      "Formulate predictive cohort lifetime value projections."
    ],
    evidence: {
      source: "Public Demonstration Clickstream Data",
      completeness: "Medium",
      scope: "Diagnostic & Predictive",
      confidence: "High confidence for funnel bottleneck diagnostics; predictive scoring requires continuous model retraining."
    }
  },
  "retail-analytics": {
    businessContext: "This study examines point-of-sale (POS) data from a multi-outlet retail operation, tracking product associations, seasonal promotional ROI, and safety stock dynamics.",
    businessQuestions: [
      "Which high-margin consumer products exhibit the strongest statistical likelihood of being purchased together?",
      "How should physical shelf layouts and promotional bundles be optimized to naturally increase average basket size?",
      "Where are safety stock errors leading to avoidable stockouts during high-volume regional promotions?"
    ],
    dataSources: "Public retail point-of-sale transactional database detailing 1.8 million receipts and vendor supply lead times.",
    methodology: "Moving through Stage 3 & 4 of our methodology, we extracted transaction lines, applied the Apriori market basket association algorithm, set dynamic stock reorder points, and mapped purchase affinity patterns onto executive reports.",
    executiveSummary: {
      context: "Multi-location physical retail inventory and transaction patterns.",
      challenge: "Avoidable inventory stockouts during high-volume regional weekend promotions.",
      approach: "Conducted market basket analysis and recalculated safety stock levels based on distributor lead times.",
      insight: "Promotional product bundles did not trigger matching inventory adjustments at surrounding distribution centers.",
      recommendation: "Sync POS inventory thresholds directly with promotional calendars and automate reorder alerts.",
      businessValue: "Reduces inventory stockout losses and optimizes physical shelf spacing."
    },
    limitations: [
      "Relies on historical point-of-sale data without local supplier logistics status.",
      "Does not capture localized weather patterns or traffic fluctuations affecting physical locations.",
      "Demonstrates public sample files instead of live transactional retail databases."
    ],
    futureEnhancements: [
      "Connect automated distributor supply chain APIs for dynamic safety inventory replenishments.",
      "Develop predictive localized seasonal demand models in Python.",
      "Build real-time stock discrepancy check alerts."
    ],
    evidence: {
      source: "Anonymized Public POS Records",
      completeness: "High",
      scope: "Descriptive & Diagnostic",
      confidence: "High confidence for basket association analytics; stockouts are subject to supplier lead time accuracy."
    }
  },
  "ngo-monitoring": {
    businessContext: "This case study focuses on program evaluation and supply distribution transparency for a multi-regional humanitarian development initiative.",
    businessQuestions: [
      "What regional custom procedures or documentation bottlenecks are causing significant cargo shipment delays?",
      "How can budget spending be managed to prevent disproportionate spending surges at the end of grant cycles?",
      "What is the quantitative relationship between field outreach frequency and regional community outcomes?"
    ],
    dataSources: "Anonymized grant budgets, logistical shipment dispatch records, and quarterly regional field surveys (sample databases).",
    methodology: "Aligned with our Decision Intelligence Framework, we standardized field reporting models, integrated GIS mapping tools to trace transit routes, calculated delay variances, and built high-density compliance scorecards.",
    executiveSummary: {
      context: "Multi-regional humanitarian logistics and program implementation transparency.",
      challenge: "Logistical transport bottlenecks causing supply delays and year-end grant spending surges.",
      approach: "Unified distribution logistics databases and analyzed customs clearance intervals.",
      insight: "Shipping delays occurred primarily at two border customs checkpoints due to inconsistent document layouts.",
      recommendation: "Standardize pre-cleared customs documentation templates and establish a central transit depot.",
      businessValue: "Improves vital aid delivery turnaround times and ensures smooth, compliant budget utilization."
    },
    limitations: [
      "Based on quarterly program progress summaries rather than real-time shipment sensor feeds.",
      "Lacks direct qualitative insights from localized field distribution teams.",
      "Anonymized regional codes restrict deeper geopolitical delay assessments."
    ],
    futureEnhancements: [
      "Integrate GPS logistics sensor APIs for real-time cargo tracking.",
      "Deploy automated budget tracking alert systems for regional project managers.",
      "Incorporate local regional risk index tracking."
    ],
    evidence: {
      source: "Public NGO Program Records",
      completeness: "Medium",
      scope: "Descriptive & Diagnostic",
      confidence: "Moderate confidence; logistical delays require verification from local clearing agents."
    }
  },
  "healthcare-dashboard": {
    businessContext: "This study examines clinical operations within a regional healthcare system, focusing on emergency department patient throughput, resource allocation, and cardiovascular readmission patterns.",
    businessQuestions: [
      "Why are emergency room patient waiting times increasing, and what specific arrival hours suffer from the worst bottlenecks?",
      "How should nurse and physician staffing shifts be re-aligned to match peak patient volume periods?",
      "Is patient readmission within 30 days statistically correlated with premature hospital discharge timestamps?"
    ],
    dataSources: "Anonymized publicly available electronic health record (EHR) timestamp logs and emergency room check-in logs.",
    methodology: "Using Stage 2 & 3 of our framework, we gathered and cleaned patient timestamp records, calculated time differences between triage and treatment using DAX, ran occupancy projections, and constructed real-time operational reports.",
    executiveSummary: {
      context: "Emergency department patient flow and clinical throughput metrics.",
      challenge: "Extended emergency room wait times and sub-optimal staff scheduling adjustments.",
      approach: "Analyzed triage-to-treatment intervals and modeled historical arrival frequency patterns.",
      insight: "Triage bottlenecks peak on Mondays from 08:00 to 11:00 due to non-emergent visits from closed clinics.",
      recommendation: "Introduce a fast-track non-emergent clinical path and adjust staff shift starts to 07:30.",
      businessValue: "Reduces overall patient waiting intervals and optimizes operational staff resource allocation."
    },
    limitations: [
      "Based on historical anonymized hospital records with no live emergency flow feed.",
      "Lacks integration with specific clinical outcomes or patient follow-up recovery data.",
      "Analysis excludes secondary transport delay variables (e.g., regional traffic/transit changes)."
    ],
    futureEnhancements: [
      "Integrate predictive occupancy forecasting models to alert triage teams of peak volume risks.",
      "Implement real-time patient status tracking systems.",
      "Formulate patient discharge timing optimizations."
    ],
    evidence: {
      source: "Anonymized Public EHR Records",
      completeness: "High",
      scope: "Descriptive & Diagnostic",
      confidence: "High confidence for operational process diagnostic tracing; medical decisions must be guided by clinical staff."
    }
  },
  "supply-chain-dashboard": {
    businessContext: "This project analyzes logistics and transport operations, evaluating cargo carrier SLA compliance, shipping lane redundancy, and warehouse unloading bottlenecks.",
    businessQuestions: [
      "Which freight carriers consistently fail to meet on-time transit SLA compliance targets?",
      "Where are overlapping shipping paths causing redundant freight expenses across warehouses?",
      "What operational factors are causing unloading delays at receiving docks on Monday mornings?"
    ],
    dataSources: "Public ERP logistics files, carrier invoices, GPS coordinates, and manufacturing reception databases.",
    methodology: "Guided by our analytical methodology, we extracted and cleaned transit files, calculated standard deviations of shipping delays, built dynamic carrier scorecards, and mapped logistics routes using GIS integrations.",
    executiveSummary: {
      context: "Freight transit tracking and warehouse reception efficiency.",
      challenge: "Declining carrier SLA compliance levels leading to production assembly delays.",
      approach: "Calculated transit deviations and mapped route redundancies within visual GIS views.",
      insight: "Carrier SLA failures were concentrated on a single geographic route prone to seasonal weather bottlenecks.",
      recommendation: "Distribute transport load across alternative carrier routes during winter months and renegotiate SLAs.",
      businessValue: "Maintains supply chain delivery consistency and lowers warehouse holding costs."
    },
    limitations: [
      "Relies on historical logistics snapshots instead of real-time container GPS telemetry.",
      "Lacks integration with terminal customs clearance times or port labor strike variables.",
      "Demonstrates public database files rather than private carrier billing logs."
    ],
    futureEnhancements: [
      "Connect live weather APIs to dynamically suggest route changes to carrier networks.",
      "Build machine learning transit time estimation systems.",
      "Develop automated carrier invoice error audit loops."
    ],
    evidence: {
      source: "Public ERP & Logistics Database",
      completeness: "Medium",
      scope: "Descriptive & Diagnostic",
      confidence: "High confidence for descriptive historical performance evaluation; weather factors require predictive models."
    }
  },
  "business-performance": {
    businessContext: "This case study evaluates cross-departmental alignment, examining how sales incentive systems, product development release cycles, and support ticket volumes affect overall company health.",
    businessQuestions: [
      "How do sales commission models focused purely on deal volume affect long-term customer subscription retention?",
      "How does customer support satisfaction (CSAT) correlate with engineering patch cycles?",
      "Why are organizational departments operating in silos, leading to delayed delivery of core OKRs?"
    ],
    dataSources: "Anonymized internal productivity indicators, CRM pipeline logs, and customer support databases (sample data).",
    methodology: "Aligned with Stage 1 & 4 of our framework, we designed a unified schema linking multiple departmental systems, built status monitoring scorecards, calculated team velocity rates, and established clear data access roles.",
    executiveSummary: {
      context: "Cross-departmental company performance and operational alignment monitoring.",
      challenge: "Siloed departmental tracking metrics hiding strategic product-to-sales correlations.",
      approach: "Mapped CRM data with support systems and computed joint correlations across units.",
      insight: "High-volume sales commission structures were incentivizing low-fit clients, causing a subsequent spike in support loads.",
      recommendation: "Sync sales incentives with customer retention milestones and establish a unified dashboard.",
      businessValue: "Fosters executive visibility and aligns operational teams toward shared retention goals."
    },
    limitations: [
      "Uses anonymized sample business performance indicators for demonstration purposes.",
      "Lacks direct integration with daily slack progress metrics or real-time project management platforms.",
      "Excludes external market competitive factors affecting overall retention numbers."
    ],
    futureEnhancements: [
      "Deploy live OKR progress trackers linked dynamically to Jira and Salesforce APIs.",
      "Design predictive indicators for project timeline delays.",
      "Establish automated cross-department anomaly reporting alerts."
    ],
    evidence: {
      source: "Anonymized Corporate Sample Data",
      completeness: "Medium",
      scope: "Descriptive & Alignment",
      confidence: "Moderate confidence; business performance depends heavily on localized human execution and internal alignment."
    }
  },
  "gbp-analytics": {
    businessContext: "This study investigates local marketing analytics, evaluating maps search rankings, client conversion paths, and user sentiment across multiple physical clinic locations.",
    businessQuestions: [
      "Which local suburbs generate the highest volume of direction requests and patient phone calls?",
      "Are phone lines experiencing dropped-call bottlenecks during peak morning hours?",
      "How heavily does review star-rating sentiment influence click-through-rates on Google Maps?"
    ],
    dataSources: "Synthesized Google Business Profile API performance records, click logs, and customer reviews.",
    methodology: "Applying our Local Business Intelligence framework (Stage 5), we automated API data extraction, modeled geospatial patient postal coordinates, performed semantic sentiment analysis on reviews, and assembled multi-site dashboards.",
    executiveSummary: {
      context: "Geospatial local business analytics and local maps search traffic streams.",
      challenge: "Difficulty identifying physical clinic catchment areas and conversion bottlenecks.",
      approach: "Extracted GBP API click logs, mapped coordinate grids, and ran customer sentiment analysis.",
      insight: "High direction request volumes from specific suburbs correlated with high patient conversion, but call drops spiked on Mondays.",
      recommendation: "Deploy an automated front-desk scheduling responder for peak call times and focus geographic ads on top suburbs.",
      businessValue: "Optimizes marketing ad spend placement and lowers prospective client call leakage."
    },
    limitations: [
      "Uses synthesized GBP API mock structures instead of real, private clinic dashboard access.",
      "Does not capture localized direct competitor budget variables.",
      "Lacks live integration with the physical clinic telephony system logs."
    ],
    futureEnhancements: [
      "Integrate direct clinic CRM and VoIP telephony system APIs for comprehensive end-to-end attribution.",
      "Incorporate automated localized ranking grid scrapers for competitors.",
      "Design real-time GBP review alert sentiment responses."
    ],
    evidence: {
      source: "Synthesized Maps Performance Records",
      completeness: "High",
      scope: "Diagnostic & Spatial",
      confidence: "High confidence for spatial trend diagnostic assessment; local algorithms change frequently."
    }
  },
  "local-seo-dashboard": {
    businessContext: "This project maps competitive share-of-voice and organic search presence across local neighborhood areas for a regional home services brand.",
    businessQuestions: [
      "What is our precise local maps search Share-of-Voice across targeted geographical grids?",
      "Which business citation directories contain inaccurate contact details that degrade search authority?",
      "How heavily does weekend customer review velocity impact our local maps ranking position?"
    ],
    dataSources: "Anonymized public search rank coordinates, local directory citations, and competitor search listings.",
    methodology: "Under Stage 5 of the Decision Intelligence Framework, we compiled ranking positions across geographical coordinates, automated citation discrepancy audits, analyzed competitor SEO profiles, and delivered prioritized optimization logs.",
    executiveSummary: {
      context: "Organic search authority and multi-location maps competitive Share-of-Voice.",
      challenge: "Inconsistent directory listings causing loss of maps search rank and visibility.",
      approach: "Conducted automated citation completeness scans and mapped grid ranking coordinate lines.",
      insight: "Over 35% of local web citations contained mismatched address details, severely reducing search crawl authority.",
      recommendation: "Implement a centralized listing management tool and establish a customer review request pipeline.",
      businessValue: "Improves local organic map rankings and boosts inbound organic business leads."
    },
    limitations: [
      "Based on anonymized grid coordinates rather than live production dashboard environments.",
      "Crawl algorithms of search engines are black-boxed and subject to unannounced updates.",
      "Excludes offline competitive promotion influences."
    ],
    futureEnhancements: [
      "Develop real-time ranking alerts for neighborhood keyword modifications.",
      "Sync citation cleanup tools directly with specialized local sync APIs.",
      "Construct predictive rank shifts alerts."
    ],
    evidence: {
      source: "Anonymized Search Rank Grid",
      completeness: "Medium",
      scope: "Descriptive & Diagnostic",
      confidence: "High confidence for citation and ranking alignment; organic variables are subject to search engine changes."
    }
  },
  "ai-reporting-assistant": {
    businessContext: "This project explores AI-assisted operational workflows, focusing on automating high-frequency reporting steps while maintaining rigorous human verification.",
    businessQuestions: [
      "How many analyst hours can be reclaimed monthly by automating standard data-to-text summaries?",
      "How can LLM models be securely guided to produce objective, brand-consistent business briefs?",
      "Does automated reporting eliminate manual copy-paste errors across financial tables?"
    ],
    dataSources: "Synthesized SQL performance tables, writing manuals, and historical reporting formats.",
    methodology: "Incorporating Stage 6 of our framework, we engineered automated database summary views, designed custom LLM prompt templates, structured a secure data flow, and built a human-in-the-loop verification dashboard.",
    executiveSummary: {
      context: "Operational reporting automation and intelligent prompt pipeline engineering.",
      challenge: "Extensive analyst hours lost on manual preparation of monthly text summary reports.",
      approach: "Structured data pipelines feeding descriptive summary prompts into a secure, validation UI.",
      insight: "Automated drafting can reclaim up to 80% of reporting preparation time while retaining precise audit validation.",
      recommendation: "Deploy the assistant purely as a drafting companion under human analyst verification guidelines.",
      businessValue: "Saves critical resource hours and completely eliminates human data transcription errors."
    },
    limitations: [
      "Uses mock performance logs for demonstration instead of a complex live business database.",
      "Subject to LLM generation variability, requiring persistent human-in-the-loop audit oversight.",
      "Lacks automated direct publishing to corporate messaging systems."
    ],
    futureEnhancements: [
      "Incorporate multi-modal chart analysis capabilities.",
      "Build direct workspace API connectors to publish summaries to secure corporate communication rooms.",
      "Formulate custom fine-tuning pipelines."
    ],
    evidence: {
      source: "Synthesized SQL Performance Logs",
      completeness: "Medium",
      scope: "Diagnostic & Automation",
      confidence: "High confidence for structured drafting pipelines; model outputs require absolute human verification."
    }
  },
  "education-analytics": {
    businessContext: "This study examines institutional academic retention rates, evaluating Canvas clickstream engagement records, mid-term grade performance grids, and socio-economic demographics across five university colleges.",
    businessQuestions: [
      "Which colleges experience the highest academic attrition rates and during which semesters?",
      "Can we identify early risk indicators based on student learning system logins?",
      "How heavily does financial aid support prevent sophomore year withdrawal?"
    ],
    dataSources: "Anonymized university administrative database covering student registrations, grades, LMS logs, and financial aid distribution grids.",
    methodology: "Under our Decision Intelligence framework, we constructed a student success pipeline tracking weekly LMS activity, calculated semester GPAs, trained survival analysis models to estimate retention curves, and designed role-based advisor scorecards.",
    executiveSummary: {
      context: "Sophomore year student retention and enrollment funnel stability at a mid-sized state university.",
      challenge: "Sophomore retention fell by 15.4%, creating a severe drop in tuition collections and department resource allocation.",
      approach: "Constructed an automated risk scorecard mapping LMS logins, advisor feedback, and financial holds.",
      insight: "A 0.5 GPA drop between semesters paired with less than 2 Canvas logins per week predicted dropout with 82% accuracy.",
      recommendation: "Launch automated early tutoring alerts for at-risk students and establish a micro-grant pool for partial-aid students.",
      businessValue: "Drives 8.5% retention improvement, reclaiming $620K in sophomore tuition revenue."
    },
    limitations: [
      "Based on retrospective registry snapshot files instead of live student registry synchronization.",
      "Excludes qualitative student counseling interview logs and mental health support interactions.",
      "Demographic information is anonymized, preventing deep geographic analysis."
    ],
    futureEnhancements: [
      "Integrate live counseling center scheduling logs for deeper support mapping.",
      "Deploy automated early warning triggers to academic advisors.",
      "Build predictive models forecasting course enrollment requirements."
    ],
    evidence: {
      source: "Anonymized University Registry Database",
      completeness: "High",
      scope: "Diagnostic & Predictive",
      confidence: "High confidence for institutional risk profiling; individual student motivation factors require personalized follow-up."
    }
  },
  "executive-platform": {
    businessContext: "This study evaluates how this portfolio acts as a clear, interactive dashboard to show real-world solutions and automation workflows in action.",
    businessQuestions: [
      "How can a web dashboard clearly show a developer's problem-solving skills to business owners?",
      "What layout and performance choices keep page loading speeds fast on both mobile and desktop?",
      "How can a simple AI helper make it easier for visitors to understand complex technical projects?"
    ],
    dataSources: "Continuous usage statistics, page load performance logs, and form submissions.",
    methodology: "Designed a responsive React layout with smooth scrolling, added interactive dashboard scenarios for retail, supply chain, and health tracking, integrated a server-side AI assistant to answer data queries, and created simple contact workflows.",
    executiveSummary: {
      context: "Business leads looking to hire a developer who understands both engineering and business goals.",
      challenge: "Standard portfolios only show static code repositories, making it hard for non-technical clients to see how a developer can solve their business problems.",
      approach: "Built an interactive command center combining live simulations, an AI-powered assistant, and simple contact forms.",
      insight: "Showing active, testable solutions helps build trust and clear communication far better than listing past job titles.",
      recommendation: "Regularly refine the AI assistant's system instructions to keep answers friendly, clear, and accurate.",
      businessValue: "Saves time for prospective clients, builds immediate professional trust, and simplifies initial project conversations."
    },
    limitations: [
      "Simulation screens use sample datasets to preserve client and user privacy.",
      "The AI assistant is configured to focus on answering general questions about my experience and skills."
    ],
    futureEnhancements: [
      "Add automated proposal drafts when a user completes the contact form.",
      "Allow users to upload small CSV spreadsheets to test their own data on the dashboard simulator."
    ],
    evidence: {
      source: "Live production website and performance reports.",
      completeness: "High",
      scope: "Interactive portfolio dashboard",
      confidence: "High; verified to run smoothly across all modern web browsers."
    }
  },
  "saylani-form": {
    businessContext: "This study evaluates how to automate a busy student enrollment system using simple web forms, automated sheets databases, and digital ID card generators.",
    businessQuestions: [
      "How can we move a massive paper-and-spreadsheet enrollment system online to stop delays?",
      "How can we use a simple chat helper to answer eligibility and course questions automatically?",
      "How can we generate and send student ID cards instantly without printing and shipping costs?"
    ],
    dataSources: "Anonymized registration lists, class requirements, and timestamp logs.",
    methodology: "Designed a mobile-friendly registration form, added quick validation checks to guide applicants, built a browser-side PDF creator with custom barcodes, and connected the form directly to Google Sheets using Google Apps Script.",
    executiveSummary: {
      context: "Managing thousands of student signups and records at a regional education center.",
      challenge: "Answering endless prerequisite questions and typing student details into spreadsheets manually, leading to typos and delays in delivering ID cards.",
      approach: "Built a simple, automated sign-up page connected to a centralized Google Sheet, with an instant digital ID card downloader.",
      insight: "Handling validation on the front page and connecting it directly to Google Sheets removes manual data-entry delays entirely.",
      recommendation: "Add automated checks to spot duplicate student profiles and keep the spreadsheet clean.",
      businessValue: "Saves the administration team hours of manual typing and lets students download their ID cards in under 2 seconds."
    },
    limitations: [
      "The demo runs on Google Sheets, which can slow down if millions of people write to it at the same time.",
      "Requires occasional updates to the chat helper's answers if course rules change."
    ],
    futureEnhancements: [
      "Add document scanning to check and approve student certificates automatically upon upload.",
      "Integrate automated text notifications to alert students about course start dates."
    ],
    evidence: {
      source: "Saylani Hackathon student registry data.",
      completeness: "High",
      scope: "Automated student registration system",
      confidence: "Verified; successfully processed hundreds of test registrations with zero errors."
    }
  },
  "saylani-rotibank": {
    businessContext: "This study looks at a food donation system that connects neighborhood donors with kitchen managers to coordinate pickups and reduce food waste.",
    businessQuestions: [
      "How can charities track incoming food donations in real-time to avoid spoilage?",
      "How can we map donation locations to make pickup routing easier for volunteer drivers?",
      "Can small teams use free Google Sheets as a reliable database for supply logistics?"
    ],
    dataSources: "Donor locations, bread donation counts, and kitchen capacity tables.",
    methodology: "Built a simple donor form, created a step-by-step assistant to collect donation weights and times, connected submissions directly to Google Sheets using Apps Script, and built a live overview page.",
    executiveSummary: {
      context: "Coordinating food pickups and meals across multiple neighborhood donation points.",
      challenge: "Kitchen managers had no advance notice of incoming food, leading to severe food waste and volunteer exhaustion from endless phone coordination.",
      approach: "Created a simple donor form that logs food quantities directly into a centralized spreadsheet in real-time.",
      insight: "Providing kitchen managers with a live view of incoming donations lets them adjust cooking plans early, saving hundreds of meals from being wasted.",
      recommendation: "Set up automatic alerts for volunteers when high-volume donations are logged nearby.",
      businessValue: "Eliminates endless phone tag, routes pickups efficiently, and keeps food waste below 2%."
    },
    limitations: [
      "Using Google Sheets as a backend is ideal for small teams but may experience lockups under extremely high concurrent write volumes.",
      "Requires stable internet connections for kitchen staff to view the live dashboard."
    ],
    futureEnhancements: [
      "Use historical donor trends to predict weekend donation volumes and plan kitchen staffing.",
      "Add automated text confirmations to thank donors and share the community impact of their donation."
    ],
    evidence: {
      source: "Roti Bank logistics ledger data.",
      completeness: "High",
      scope: "Logistics tracking and workspace integration",
      confidence: "Verified; the synchronization between forms and sheets is stable under multi-user testing."
    }
  },
  "weather-app": {
    businessContext: "This study reviews a lightweight weather dashboard built to deliver localized rain forecasts and alerts without any distracting ads.",
    businessQuestions: [
      "How can we design a clean weather page that highlights rain warnings clearly?",
      "What search and loading strategies help reduce third-party API costs?",
      "How can we use browser location data to update page colors and alerts automatically?"
    ],
    dataSources: "OpenWeatherMap forecast data and browser coordinates.",
    methodology: "Integrated the browser's built-in location finder, added search debouncing to save API volume, built a temperature-responsive layout, and added a clear monsoon alert banner.",
    executiveSummary: {
      context: "Providing quick, localized weather forecasts for local commuters and logistics teams.",
      challenge: "Popular weather websites are cluttered with ads and slow to load, making it hard for users to quickly check immediate rainfall plans.",
      approach: "Developed a simple, ad-free page that checks coordinates instantly and focuses on rain alerts.",
      insight: "Waiting for the user to pause typing before fetching data saves considerable API traffic while keeping the search fast.",
      recommendation: "Add offline caching so users can view their last loaded forecast even when their cell reception drops.",
      businessValue: "Helps commuters make fast routing decisions and optimizes third-party API transaction limits."
    },
    limitations: [
      "Depends on the OpenWeatherMap service availability and rate limits.",
      "Requires users to click 'Allow' on their browser location prompt, with a manual city search fallback."
    ],
    futureEnhancements: [
      "Add humidity and wind speed data for local logistics companies.",
      "Set up gentle browser notifications for sudden storm warnings."
    ],
    evidence: {
      source: "OpenWeatherMap API response logs.",
      completeness: "High",
      scope: "API integration and geolocation tracking",
      confidence: "Verified; search debouncing and location tracking function smoothly."
    }
  },
  "enterpret-steel": {
    businessContext: "This study examines a professional catalog website built for an industrial manufacturing firm, focusing on fast loading speeds and clean B2B layouts.",
    businessQuestions: [
      "How can an industrial company show its product range and engineering credentials online?",
      "How does website loading speed impact B2B buyers looking for technical specs?",
      "How can a clean catalog structure make it easier for buyers to request quotes?"
    ],
    dataSources: "Steel product dimensions, structural grades, and catalog categories.",
    methodology: "Analyzed industrial websites, created a responsive layout, compressed heavy images to WebP formats for faster loading, and added subtle hover effects.",
    executiveSummary: {
      context: "Designing a modern web presence and product catalog for corporate industrial buyers.",
      challenge: "Slow, outdated web catalogs fail to present technical material grades clearly, causing buyers to leave the site without contacting sales.",
      approach: "Built a fast, modern catalog optimized for mobile and desktop, showing products clearly.",
      insight: "Optimizing image sizes and using modern formats can cut page loading times from nearly 5 seconds down to under 1 second.",
      recommendation: "Add a simple calculator so buyers can estimate steel weights and volume before requesting quotes.",
      businessValue: "Keeps professional buyers engaged on the site longer and simplifies the B2B sales inquiry process."
    },
    limitations: [
      "The current demo uses a local product list instead of a live inventory database.",
      "Inquiry forms are simulated and do not connect to an active sales CRM."
    ],
    futureEnhancements: [
      "Connect quote forms directly to the company's internal sales system.",
      "Add multi-language switches to support international buyers."
    ],
    evidence: {
      source: "Page performance reports.",
      completeness: "High",
      scope: "B2B product catalog website",
      confidence: "High; verified to achieve perfect scores on desktop loading and design audits."
    }
  },
  "job-applica": {
    businessContext: "This study evaluates how breaking a long job application into multiple steps with automatic draft saving can improve candidate completion rates.",
    businessQuestions: [
      "Why do long, single-page candidate forms have high abandonment rates?",
      "How can we guide applicants through common typing mistakes as they fill out a form?",
      "How can we protect applicant answers from being lost during accidental refreshes?"
    ],
    dataSources: "Candidate form states and input validation rules.",
    methodology: "Divided a long hiring form into a 4-step wizard, added instant checks for phone and email formats, styled a clean progress bar, and saved draft data locally.",
    executiveSummary: {
      context: "Optimizing the recruitment signup experience for corporate HR teams.",
      challenge: "Long, tedious forms tire out top applicants, leading over half of them to abandon the form before submitting.",
      approach: "Designed a friendly, 4-step wizard that saves applicant draft answers automatically in the background.",
      insight: "Guiding candidates step-by-step and saving their work prevents frustration and boosts final form completions.",
      recommendation: "Allow applicants to drag and drop their resumes to pre-fill their personal details automatically.",
      businessValue: "Preserves high-quality talent pipelines and ensures the recruiting team receives clean, accurate candidate data."
    },
    limitations: [
      "The form is currently a front-end demo and does not connect to an active applicant tracking database.",
      "Resume uploads are simulated in the client browser container."
    ],
    futureEnhancements: [
      "Integrate professional profile sign-ins to populate contact fields with a single click.",
      "Add a simple analytics panel to see which form pages take the longest to complete."
    ],
    evidence: {
      source: "Candidate wizard session logs.",
      completeness: "High",
      scope: "Interactive form wizard",
      confidence: "Verified; candidate progress is saved safely even if the browser tab is accidentally closed."
    }
  },
  "lifedrop": {
    businessContext: "This case study details the design of LifeDrop, an emergency blood donation platform built to match and notify donors near hospitals in real-time.",
    businessQuestions: [
      "How can we speed up donor notification during urgent blood shortages?",
      "What database setup is best for managing secure donor lists with live updates?",
      "How can we display inventory levels to help clinic staff plan donation drives?"
    ],
    dataSources: "Anonymized donor lists, blood compatibility tables, and clinic stock files.",
    methodology: "Programmed compatibility matching rules, set up text alert dispatch routes, built a hospital coordination panel, and configured Firestore for real-time synchronization.",
    executiveSummary: {
      context: "Helping hospitals and local clinics coordinate emergency blood donations.",
      challenge: "During shortages, clinics rely on slow, manual phone lists to find matched donors, leading to delays during emergencies.",
      approach: "Built a simple system that matches blood groups and sends direct text alerts to nearby donors instantly.",
      insight: "Replacing manual outreach with automated, targeted text alerts cuts mobilization times from hours to minutes.",
      recommendation: "Use basic historical trends to predict typical donation drops during winter or holiday seasons.",
      businessValue: "Saves vital clinic response time, helps coordinate donor schedules, and maintains clear stock levels."
    },
    limitations: [
      "Currently in active development, with text alert pathways running in a secure staging sandbox.",
      "Predictive stock forecasts require several months of historical logs for high accuracy."
    ],
    futureEnhancements: [
      "Add routing maps to show donors the fastest drive-time path to the hospital.",
      "Set up a friendly WhatsApp assistant to confirm donor bookings and send reminders."
    ],
    evidence: {
      source: "Firestore real-time sync database and Twilio staging reports.",
      completeness: "High",
      scope: "Emergency health logistics and messaging",
      confidence: "High; donor registries and matching calculations compile and run successfully in test profiles."
    }
  },
  "local-bi-framework": {
    businessContext: "This study outlines a marketing and analysis framework built to help local businesses grow their search visibility and attract more physical foot traffic.",
    businessQuestions: [
      "Why do local clinics and retail shops lose nearby customers despite spending heavily on digital ads?",
      "How do inaccurate directory details across small websites lower rankings on main search maps?",
      "How can mapping customer postcodes help local brands focus their marketing budget?"
    ],
    dataSources: "Google Business Profile metrics, local directory listings, and ranking coordinates.",
    methodology: "Synthesized a five-stage local intelligence process, audited name and phone consistency across major listings, tracked map visibility, and mapped patient travel coordinates.",
    executiveSummary: {
      context: "Improving map visibility and customer conversions for multi-location healthcare and local service brands.",
      challenge: "Inconsistent physical business listings and weak maps coordinates misalign search indexing, leaking offline leads.",
      approach: "Implemented a structured local audit aligning address details, maps pins, and review schedules.",
      insight: "Correcting inconsistent phone and address listings is key to map rankings, while fresh client reviews keep you visible.",
      recommendation: "Use simple ranking overlays to track map position improvements across neighborhood blocks.",
      businessValue: "Drives more direction clicks, corrects outdated business directory listings, and increases phone inquiries."
    },
    limitations: [
      "Listing corrections can take 30 to 90 days to appear depending on search engine crawl speeds.",
      "Improvements are highly dependent on competitor density in each specific neighborhood."
    ],
    futureEnhancements: [
      "Build direct sync tools to push address corrections to multiple directories instantly.",
      "Set up automated feedback requests on check-out receipt systems."
    ],
    evidence: {
      source: "Active local search ranking profiles.",
      completeness: "High",
      scope: "Local business intelligence methodology",
      confidence: "High; has successfully driven verified increases in direction clicks and phone calls for multi-site medical clinics."
    }
  }
};

// Custom interactive screen content mockups
function renderMockScreenContent(projectId: string, device: "desktop" | "tablet" | "mobile") {
  switch (projectId) {
    case "executive-platform":
      return (
        <div className="bg-slate-950 text-slate-100 min-h-full p-4 rounded-lg flex flex-col justify-between font-sans text-left h-full">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-[10px] font-mono text-blue-400 font-semibold uppercase tracking-wider">Executive Intelligence</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h5 className="text-xs font-bold font-display tracking-tight text-white">DECISION PORTFOLIO COMMAND CENTER</h5>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-900 border border-slate-850 p-2 rounded-lg">
                <span className="text-[8px] font-mono text-slate-400 uppercase block">Portfolio Case Studies</span>
                <span className="text-sm font-extrabold text-blue-400 font-mono">20 Total</span>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-2 rounded-lg">
                <span className="text-[8px] font-mono text-slate-400 uppercase block">Pipeline Integrity</span>
                <span className="text-sm font-extrabold text-emerald-400 font-mono">99.8%</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-850 p-2 rounded text-[9px] text-slate-300 leading-normal">
              <span className="text-blue-400 font-bold block mb-0.5">💡 AI Analyst Brief:</span>
              "Analytical frameworks deployed. Portfolio acts as a live interactive simulator bridging code and executive strategy."
            </div>
          </div>
          
          <div className="text-[8px] font-mono text-slate-500 text-center mt-4">
            HTTPS_STAGING_STABLE_V4_UX
          </div>
        </div>
      );

    case "saylani-form":
      return (
        <div className="bg-white text-slate-950 min-h-full p-4 rounded-lg flex flex-col justify-between font-sans text-left border border-slate-200 h-full">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">Saylani Student Portal</span>
              <span className="text-[8px] font-mono text-slate-400 uppercase">SaylaniReg v2</span>
            </div>
            <h5 className="text-xs font-extrabold text-slate-900 uppercase tracking-tight">Student Registration System</h5>
            
            <div className="space-y-2 text-[9px]">
              <div className="bg-slate-50 border border-slate-200 rounded p-1.5 flex justify-between items-center text-slate-600">
                <span>Course: AI Automation</span>
                <span className="text-[8px] font-mono bg-emerald-50 text-emerald-700 px-1 rounded uppercase border border-emerald-100 font-semibold">Eligible</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded p-1.5 flex justify-between items-center text-slate-600">
                <span>Credentials Validation</span>
                <span className="text-[8px] text-blue-600 font-bold uppercase">✔ Valid</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-2 rounded text-[9px] text-emerald-800 leading-normal flex items-start gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1" />
              <p><strong>Success!</strong> Apps Script logged student details to Sheet database. Confirmation ID: #SR-85420.</p>
            </div>
          </div>

          <button className="w-full py-1.5 bg-emerald-600 text-white rounded text-[9px] font-bold uppercase hover:bg-emerald-700 transition-colors mt-3">
            Download Student ID PDF
          </button>
        </div>
      );

    case "saylani-rotibank":
      return (
        <div className="bg-white text-slate-950 min-h-full p-4 rounded-lg flex flex-col justify-between font-sans text-left border border-slate-200 h-full">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-wider">Saylani Roti Bank</span>
              <span className="text-[8px] font-mono text-slate-400 uppercase">Live Metrics</span>
            </div>
            
            <div className="bg-orange-500 text-white p-3 rounded-xl text-center space-y-0.5 shadow-xs">
              <span className="text-[8px] uppercase tracking-wider font-semibold block">Total Loaves Distributed Today</span>
              <span className="text-base font-black font-mono">45,210 Roti</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-2 rounded text-[9px] text-slate-600 space-y-1 leading-normal">
              <span className="font-bold text-slate-800 block">🤖 Active Donor Chatbot:</span>
              <p className="italic">"Pledged 50 fresh food bags. Apps Script synchronized donor coordinates to Master Sheets ledger."</p>
            </div>
          </div>

          <div className="text-[8px] font-mono text-orange-600/60 text-center mt-3">
            ZERO-COST_WORKSPACE_INFRASTRUCTURE
          </div>
        </div>
      );

    case "weather-app":
      return (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white min-h-full p-4 rounded-lg flex flex-col justify-between font-sans text-left relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.05] rounded-full blur-xl" />
          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
              <span className="text-[9px] font-mono text-blue-200 uppercase tracking-widest">Barish Alert</span>
              <span className="text-[8px] font-mono text-blue-200 uppercase">OpenWeatherMap API</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] block text-blue-200">Current Location</span>
                <h5 className="text-sm font-extrabold leading-tight">Karachi, PK</h5>
              </div>
              <span className="text-xl font-black font-mono">18°C</span>
            </div>

            <div className="bg-rose-500 text-white p-2 rounded-lg text-[9px] leading-relaxed flex items-start gap-1.5 border border-rose-400/30">
              <span className="shrink-0 mt-0.5">⚠</span>
              <p><strong>BARISH ALERT:</strong> 78% probability of precipitation in 42 minutes. Re-routing recommended.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[8px] text-blue-100 border-t border-white/10 pt-2 mt-3">
            <span>Humidity: 82%</span>
            <span>Wind speed: 14 km/h</span>
          </div>
        </div>
      );

    case "enterpret-steel":
      return (
        <div className="bg-slate-900 text-slate-100 min-h-full p-4 rounded-lg flex flex-col justify-between font-sans text-left border border-slate-850 h-full">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Enterprise Steel B2B</span>
              <span className="text-[8px] font-mono text-emerald-400">WebP 0.1s Fast Load</span>
            </div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider font-display">Heavy Industrial Plate Catalog</h5>
            
            <div className="flex gap-1">
              {["Plates", "Beams", "Coils"].map((f) => (
                <span key={f} className={`px-2 py-0.5 text-[8px] font-semibold rounded ${f === "Plates" ? "bg-slate-100 text-slate-900" : "bg-slate-800 text-slate-400"}`}>
                  {f}
                </span>
              ))}
            </div>

            <div className="bg-slate-850 border border-slate-800 rounded p-2 text-[9px] text-slate-300 space-y-1.5 leading-normal">
              <div className="flex justify-between font-bold border-b border-slate-800 pb-1">
                <span>Carbon Steel 420-A</span>
                <span className="text-blue-400 font-bold">In Stock</span>
              </div>
              <p className="text-slate-400">Heavy structural tolerance. Dynamic dimensions filterable by custom metric tons.</p>
            </div>
          </div>

          <button className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-colors mt-3">
            Initiate Quote Request
          </button>
        </div>
      );

    case "job-applica":
      return (
        <div className="bg-white text-slate-950 min-h-full p-4 rounded-lg flex flex-col justify-between font-sans text-left border border-slate-200 h-full">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase tracking-wider">JobApplica Wizard</span>
              <span className="text-[8px] font-mono text-slate-400">Step 3 of 4</span>
            </div>

            {/* Dynamic Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] font-mono text-slate-400">
                <span>Application Progress</span>
                <span>75% Complete</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-indigo-600 rounded-full" />
              </div>
            </div>
            
            <div className="space-y-2 text-[9px]">
              <div className="space-y-1">
                <span className="text-slate-400 block uppercase font-bold text-[7px]">Resume Attachment</span>
                <div className="border border-dashed border-indigo-200 bg-indigo-50/20 rounded p-1.5 text-center text-slate-500 font-medium">
                  ✔ mudassir_resume.pdf
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-1.5 rounded flex justify-between items-center text-slate-600">
                <span>Validation check:</span>
                <span className="text-emerald-600 font-bold">Passed ✔</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-2 rounded text-[8px] text-emerald-800 leading-normal mt-2">
            ✔ Auto-saved state. Feel free to reload the browser.
          </div>
        </div>
      );

    case "lifedrop":
      return (
        <div className="bg-white text-slate-950 min-h-full p-4 rounded-lg flex flex-col justify-between font-sans text-left border border-slate-200 h-full">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-red-100 pb-1.5">
              <span className="text-[9px] font-mono text-rose-600 font-bold uppercase tracking-wider">LifeDrop Staging</span>
              <span className="text-[8px] font-mono text-slate-400 uppercase">Active Dispatcher</span>
            </div>

            <div className="bg-rose-50 text-rose-900 p-2.5 rounded-xl border border-rose-100 shadow-xs">
              <span className="text-[7px] font-mono text-rose-600 block uppercase font-bold">Emergency Request Queue</span>
              <p className="text-[10px] font-extrabold leading-normal italic">"B+ Required at City Hospital ER — SMS Alerts Triggered."</p>
            </div>

            {/* Donor compatibilities */}
            <div className="space-y-1 bg-slate-50 p-2 rounded border border-slate-200 text-[8px] text-slate-600 leading-normal">
              <span className="font-bold text-slate-700 block uppercase tracking-wider text-[7px]">Compatible Nearby Donors</span>
              <div className="grid grid-cols-2 gap-1 mt-1 text-center font-mono">
                <span className="bg-rose-50 text-rose-700 p-1 rounded border border-rose-100 font-semibold">Donor ID: #4812 (O-)</span>
                <span className="bg-rose-50 text-rose-700 p-1 rounded border border-rose-100 font-semibold">Donor ID: #2390 (B+)</span>
              </div>
            </div>
          </div>

          <div className="text-[8px] font-mono text-rose-600/60 text-center mt-3">
            EMERGENCY_BLOOD_DISPATCH_COORDINATION
          </div>
        </div>
      );

    case "local-bi-framework":
      return (
        <div className="bg-slate-950 text-slate-100 min-h-full p-4 rounded-lg flex flex-col justify-between font-sans text-left border border-slate-900 h-full">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">LBI Coordinate Grid</span>
              <span className="text-[8px] font-mono text-slate-400 uppercase">Local SEO v4</span>
            </div>
            
            {/* Geo Ranking grid */}
            <div className="space-y-1">
              <span className="text-[7px] font-mono text-slate-400 block uppercase tracking-wider">Neighborhood Google Maps Rankings Grid</span>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { rank: 1, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
                  { rank: 1, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
                  { rank: 2, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
                  { rank: 4, color: "bg-amber-500/20 text-amber-400 border-amber-500/40" },
                  { rank: 1, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
                  { rank: 1, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" },
                  { rank: 5, color: "bg-amber-500/20 text-amber-400 border-amber-500/40" },
                  { rank: 11, color: "bg-rose-500/20 text-rose-400 border-rose-500/40" }
                ].map((n, idx) => (
                  <div key={idx} className={`p-1.5 text-center font-mono font-bold text-[10px] rounded border ${n.color}`}>
                    #{n.rank}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-2 rounded text-[8px] text-slate-300 space-y-1 leading-normal">
              <span className="text-cyan-400 font-bold block uppercase tracking-wider">Citations Sync:</span>
              <p>✔ Verified 100% citation symmetry across 200+ local registries.</p>
            </div>
          </div>

          <div className="text-[8px] font-mono text-cyan-400/60 text-center mt-3">
            LOCATION_INTELLIGENCE_SYSTEMS
          </div>
        </div>
      );

    default:
      return null;
  }
}

function getArchitectureNodes(projectId: string) {
  switch (projectId) {
    case "executive-platform":
      return [
        { id: "1", label: "React View", desc: "Interactive SPA styled with Tailwind & Framer Motion", icon: Laptop },
        { id: "2", label: "State Engines", desc: "Coordinates sandbox KPI comparisons & chat triggers", icon: Cpu },
        { id: "3", label: "Gemini Server", desc: "Server-side LLM processing executive queries", icon: Server },
        { id: "4", label: "Workspace APIs", desc: "Apps Script integration routing database records", icon: Globe }
      ];
    case "saylani-form":
      return [
        { id: "1", label: "Cloned UI", desc: "Saylani Portal interface with active inline validations", icon: Laptop },
        { id: "2", label: "Barcodes Engine", desc: "Client-side compiler generating instant Student ID PDFs", icon: Cpu },
        { id: "3", label: "Serverless Relay", desc: "Google Apps Script receiving POST form bodies", icon: Server },
        { id: "4", label: "Sheets Ledger", desc: "Centralized Workspace document spreadsheet ledger", icon: Database }
      ];
    case "saylani-rotibank":
      return [
        { id: "1", label: "Donor Form", desc: "Food pledging panel optimizing donor inputs", icon: Laptop },
        { id: "2", label: "Dialogflow NLP", desc: "Donor conversational chatbot processing pledges", icon: Cpu },
        { id: "3", label: "Apps Script API", desc: "Serverless web app logging details to database", icon: Server },
        { id: "4", label: "Master Sheet", desc: "Ledger document consolidating totals & depots", icon: Database }
      ];
    case "weather-app":
      return [
        { id: "1", label: "Geolocation API", desc: " Handshake requests coordinates from user device", icon: Globe },
        { id: "2", label: "REST Client", desc: "Queries OpenWeatherMap with debounced keyword searches", icon: Cpu },
        { id: "3", label: "Alert Matrix", desc: "Triggers weather alert banners if humidity > threshold", icon: Laptop },
        { id: "4", label: "Dynamic CSS", desc: "Transitions page colors based on temperature", icon: Server }
      ];
    case "enterpret-steel":
      return [
        { id: "1", label: "Vite SPA", desc: "Highly structured industrial steel portal catalog", icon: Laptop },
        { id: "2", label: "Grids Layout", desc: "Responsive CSS/Tailwind flex grids for B2B catalog", icon: Cpu },
        { id: "3", label: "Asset Optim", desc: "WebP format compressions and image lazy loading", icon: Server },
        { id: "4", label: "Quote CTAs", desc: "Direct route-to-quote conversion forms", icon: Globe }
      ];
    case "job-applica":
      return [
        { id: "1", label: "4-Step Wizard", desc: "Modular state management splitting job form", icon: Laptop },
        { id: "2", label: "RegEx Engine", desc: "Inline validation patterns checking email/URLs", icon: Cpu },
        { id: "3", label: "State Caching", desc: "Local storage caching preserving form fields", icon: Server },
        { id: "4", label: "Uploader", desc: "Drag-and-drop resume attachment parser", icon: Globe }
      ];
    case "lifedrop":
      return [
        { id: "1", label: "Twilio SMS API", desc: "Coordinates automated SMS alerts to geofenced donors", icon: Globe },
        { id: "2", label: "Gemini AI", desc: "Forecasts inventory needs and processes compatibility checks", icon: Cpu },
        { id: "3", label: "Firestore DB", desc: "Firebase real-time tables storing donor and request registries", icon: Database },
        { id: "4", label: "Hospital Portal", desc: "Web dashboard for ER coordinators to submit blood requests", icon: Laptop }
      ];
    case "local-bi-framework":
      return [
        { id: "1", label: "Geo-Grid Maps", desc: " neighborhood coordinates ranking trackers", icon: Globe },
        { id: "2", label: "Citations Audit", desc: "Audits listings across 200+ local registries", icon: Cpu },
        { id: "3", label: "Review Solicit", desc: "Review generation triggers deployed on checkouts", icon: Laptop },
        { id: "4", label: "Conversion Maps", desc: "Heatmaps mapping drive-time routes and calls", icon: Server }
      ];
    default:
      return [];
  }
}

function getWorkflowSteps(projectId: string) {
  switch (projectId) {
    case "executive-platform":
      return [
        { title: "Client Submission", desc: "Visitor logs a question or consulting inquiry in the page's Contact form.", status: "Triggered" },
        { title: "Operational Logs", desc: "State manager cache logs the session parameters and page scroll counts.", status: "Logged" },
        { title: "Strategic Brief", desc: "Gemini AI parses user inquiry and structures a custom, tailored business recommendation.", status: "Rendered" },
        { title: "Apps Script Post", desc: "Submission details routed serverless to Google Sheets with automatic notification.", status: "Dispatched" }
      ];
    case "saylani-form":
      return [
        { title: "Student Intake", desc: "Student fills out the cloned registration web form, selecting a course.", status: "Triggered" },
        { title: "RegEx Checking", desc: "Input fields are validated inline for eligibility, preventing duplicate forms.", status: "Processed" },
        { title: "Apps Script DB", desc: "Serverless POST call saves enrollment parameters to centralized Sheets.", status: "Logged" },
        { title: "PDF Generation", desc: "Browser-side SVG compiler generates an ID card PDF with custom barcodes.", status: "Delivered" }
      ];
    case "saylani-rotibank":
      return [
        { title: "Donation Pledge", desc: "Donor inputs available fresh food quantities and zip code on the site.", status: "Triggered" },
        { title: "Chatbot Processing", desc: "Dialogflow agent structures donor pledge details into a logistical payload.", status: "Processed" },
        { title: "Master Ledger Log", desc: "Apps Script post body writes the coordinate and bag count to Sheets.", status: "Synced" },
        { title: "Roster Distribution", desc: "Live dashboard updates and alerts nearby coordinators for direct depot routing.", status: "Active" }
      ];
    case "weather-app":
      return [
        { title: "Geolocation Hook", desc: "Application requests browser coordinate permissions upon page load.", status: "Triggered" },
        { title: "API Dispatcher", desc: "REST client triggers debounced queries (400ms lag) to OpenWeatherMap.", status: "Dispatched" },
        { title: "Precipitation Check", desc: "Humidity and rain probabilities are verified against alert threshold values.", status: "Processed" },
        { title: "Warning Flash", desc: "Special 'Barish Alert' banners flash across coordinates in Karachi.", status: "Rendered" }
      ];
    case "enterpret-steel":
      return [
        { title: "B2B Visit", desc: "Prospective corporate steel buyer lands on the custom responsive homepage.", status: "Triggered" },
        { title: "Optimized Load", desc: "WebP compressed assets lazy-load instantly, reducing desktop latency to 0.9s.", status: "Delivered" },
        { title: "Catalog Filtration", desc: "Buyer filters steel components by load tolerances and material grades.", status: "Processed" },
        { title: "Quote CTA Click", desc: "Visitor clicks 'Request B2B Quote' call-to-action button, submitting the lead.", status: "Completed" }
      ];
    case "job-applica":
      return [
        { title: "Form Initialization", desc: "Applicant opens the modern progressive recruitment wizard.", status: "Triggered" },
        { title: "State Caching", desc: "Form fields are backed up in local browser cache as the applicant types.", status: "Logged" },
        { title: "RegEx Inline Check", desc: "Fields validate telephone, email, and LinkedIn links automatically.", status: "Processed" },
        { title: "Funnel Submission", desc: "Applicant attaches resume and hits submit, achieving 94.2% completion rate.", status: "Completed" }
      ];
    case "lifedrop":
      return [
        { title: "ER Request Submitted", desc: "Hospital coordinator submits emergency blood deficit request on portal.", status: "Triggered" },
        { title: "Compatibility Filtering", desc: "Database query matches compatibility matrices and geofenced coordinates.", status: "Processed" },
        { title: "SMS Broadcast", desc: "Twilio triggers automatic SMS requests to matched, available donors.", status: "Dispatched" },
        { title: "Donor Mobilized", desc: "Donor confirms and arrives at ER, log metrics written back to Firestore.", status: "Completed" }
      ];
    case "local-bi-framework":
      return [
        { title: "GBP Coordinates Audit", desc: "Establish neighborhood search positions across a 1x1 kilometer grid.", status: "Triggered" },
        { title: "Citation Symmetrics", desc: "Synchronize and fix phone/address listings on 200+ localized registries.", status: "Processed" },
        { title: "Review Velocity Trigger", desc: "Deploy SMS review solicitation requests immediately on checkout terminals.", status: "Active" },
        { title: "Directions Conversion", desc: "Generate geospatial demand maps showing click-to-directions call origins.", status: "Rendered" }
      ];
    default:
      return [];
  }
}

// Custom interactive visual workspace component
function ProjectVisuals({ projectId }: { projectId: string }) {
  const [activeTab, setActiveTab] = useState<"interface" | "architecture" | "workflow">("interface");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const getProjectFolder = (id: string): string => {
    switch (id) {
      case "saylani-form": return "saylani-registration";
      case "saylani-rotibank": return "saylani-donation";
      case "weather-app": return "weather-intelligence";
      case "job-applica": return "job-application";
      case "enterpret-steel": return "enterpret-steel";
      case "local-bi-framework": return "local-seo";
      case "lifedrop": return "lifedrop";
      case "executive-platform": return "executive-dashboard";
      default: return id;
    }
  };

  const activeScreenshots = React.useMemo(() => {
    const folder = getProjectFolder(projectId);
    const screenshots: { src: string; alt: string; caption: string; type: "interface" | "architecture" | "workflow"; device?: "desktop" | "tablet" | "mobile" }[] = [];
    
    // Interface screenshots
    if (projectId === "saylani-form") {
      screenshots.push(
        { src: `/assets/projects/${folder}/desktop-01.webp`, alt: "Registration Portal Homepage", caption: "Standard desktop viewport showing the student intake starting screen.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-02.webp`, alt: "Interactive Registration Form", caption: "Multi-page student intake form with real-time field error validation checking.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-03.webp`, alt: "Generated Student ID Card", caption: "High-density digital identity card generated completely on the client-side as SVG Canvas.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-04.webp`, alt: "Google Sheets Backend Integration", caption: "Centralized Google Sheets ledger syncing student profile records in real-time.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/tablet-01.webp`, alt: "Tablet Student Intake Screen", caption: "Tablet-optimized view with clean spacing and accessible input layouts.", type: "interface", device: "tablet" },
        { src: `/assets/projects/${folder}/mobile-01.webp`, alt: "Mobile Student Profile View", caption: "Mobile-responsive viewport optimized for touch-based form entries in rural classrooms.", type: "interface", device: "mobile" }
      );
    } else if (projectId === "saylani-rotibank") {
      screenshots.push(
        { src: `/assets/projects/${folder}/desktop-01.webp`, alt: "Donation Platform Landing Page", caption: "Desktop overview dashboard displaying donor registration forms.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-02.webp`, alt: "Donation Intakes Pledges Form", caption: "Interactive multi-step donation form verifying bread counts and storage constraints.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-03.webp`, alt: "Pledge Submission Confirmation", caption: "Instant confirmation screen displaying pickup slot timing and coordinates.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-04.webp`, alt: "Google Sheets Logistics Ledger", caption: "Live Google Workspace sheet synchronizing active food stocks for distribution centers.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/tablet-01.webp`, alt: "Tablet Food Coordination Dashboard", caption: "Tablet display for regional kitchen managers planning food intake.", type: "interface", device: "tablet" },
        { src: `/assets/projects/${folder}/mobile-01.webp`, alt: "Mobile Food Donor Form", caption: "Frictionless mobile layout designed for donors listing food donations on-the-go.", type: "interface", device: "mobile" }
      );
    } else if (projectId === "weather-app") {
      screenshots.push(
        { src: `/assets/projects/${folder}/desktop-01.webp`, alt: "Karachi Weather Intelligence Dashboard", caption: "Standard desktop interface showing live real-time conditions and debounced search fields.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-02.webp`, alt: "Dynamic Forecast Grid", caption: "7-day precipitation risk grid mapping forecasted wind, humidity, and temperatures.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/tablet-01.webp`, alt: "Tablet Weather Map", caption: "Tablet spatial layout displaying monsoonal cloud movements.", type: "interface", device: "tablet" },
        { src: `/assets/projects/${folder}/mobile-01.webp`, alt: "Mobile Local Storm Alert View", caption: "Mobile screen displaying monsoon rain warnings (Karachi coordinate alerts).", type: "interface", device: "mobile" }
      );
    } else if (projectId === "enterpret-steel") {
      screenshots.push(
        { src: `/assets/projects/${folder}/desktop-01.webp`, alt: "Enterprise Steel B2B Homepage", caption: "Highly polished desktop landing page showcase for steel manufacturing.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-02.webp`, alt: "B2B Steel Product Catalog", caption: "Dense CSS filterable product catalog highlighting load tolerances and dimensions.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-03.webp`, alt: "Responsive Grid Layout", caption: "Responsive multi-column visual grid showing clean industrial components.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/tablet-01.webp`, alt: "Tablet B2B Catalog View", caption: "Tablet interface displaying heavy plate load tolerances.", type: "interface", device: "tablet" },
        { src: `/assets/projects/${folder}/mobile-01.webp`, alt: "Mobile Product Specs View", caption: "Highly dense mobile datasheet layout for quick field inspections.", type: "interface", device: "mobile" }
      );
    } else if (projectId === "job-applica") {
      screenshots.push(
        { src: `/assets/projects/${folder}/desktop-01.webp`, alt: "Recruitment Wizard Step 1", caption: "First phase of the modular hiring form collecting personal candidate details.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-02.webp`, alt: "Skills Assessment & Progress Tracker", caption: "Step 2 interface with integrated slider metrics and live state progress bar.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-03.webp`, alt: "Resume Uploader & Drag-Drop Panel", caption: "Step 3 file drag-and-drop container validating resume sizes and formats.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/tablet-01.webp`, alt: "Tablet Progress Wizard", caption: "Tablet-optimized multi-step wizard showing state integrity caches.", type: "interface", device: "tablet" },
        { src: `/assets/projects/${folder}/mobile-01.webp`, alt: "Mobile Progressive Application", caption: "Fully responsive multi-step wizard optimized for simple hand-held navigation.", type: "interface", device: "mobile" }
      );
    } else if (projectId === "lifedrop") {
      screenshots.push(
        { src: `/assets/projects/${folder}/desktop-01.webp`, alt: "ER Hospital Coordination Panel", caption: "Hospital portal interface for submitting and logging emergency blood deficits.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-02.webp`, alt: "Geofenced Donor Matching Grid", caption: "Real-time matching table scanning Firestore donor registries based on coordinate distances.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-03.webp`, alt: "Twilio SMS Notification Broadcast Status", caption: "Status log tracking outbound SMS broadcasts to geofenced O-negative donors.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/tablet-01.webp`, alt: "Tablet Blood Bank Overview", caption: "Tablet-optimized screen monitoring live regional clinic blood inventories.", type: "interface", device: "tablet" },
        { src: `/assets/projects/${folder}/mobile-01.webp`, alt: "Mobile Donor Booking Portal", caption: "Fast geofenced response screens allowing donor pledge registration.", type: "interface", device: "mobile" }
      );
    } else if (projectId === "local-bi-framework") {
      screenshots.push(
        { src: `/assets/projects/${folder}/desktop-01.webp`, alt: "Local Search Research Dashboard", caption: "First stage analysis mapping Google Business Profile core search terms.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-02.webp`, alt: "Neighborhood Map Rankings Analysis", caption: "Geospatial coordinate grid illustrating search ranks across a 1x1 kilometer area.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-03.webp`, alt: "Citation completeness Audit Screen", caption: "Registry checker comparing name, phone, address parity across 200+ citations.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/tablet-01.webp`, alt: "Tablet Competitor Grid Map", caption: "Tablet geospatial visualizer showing localized map rankings.", type: "interface", device: "tablet" },
        { src: `/assets/projects/${folder}/mobile-01.webp`, alt: "Mobile Map Presence Dashboard", caption: "Mobile tracking dashboard tracking active conversion rates on direction clicks.", type: "interface", device: "mobile" }
      );
    } else if (projectId === "executive-platform") {
      screenshots.push(
        { src: `/assets/projects/${folder}/desktop-01.webp`, alt: "Executive Portfolio Control Room", caption: "Main landing interface styled with high-contrast corporate typography and negative space.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/desktop-02.webp`, alt: "Interactive Dashboard Sandbox", caption: "Analytical playground showing live simulated charts and margin comparisons.", type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/tablet-01.webp`, alt: "Tablet Navigation Layout", caption: "Tablet-optimized showcase layout of executive analytical modules.", type: "interface", device: "tablet" },
        { src: `/assets/projects/${folder}/mobile-01.webp`, alt: "Mobile Client Experience View", caption: "Elegant single-view layout adapting all portfolio widgets cleanly to smaller viewport ratios.", type: "interface", device: "mobile" }
      );
    } else {
      screenshots.push(
        { src: `/assets/projects/${folder}/desktop-01.webp`, alt: `${projectId} Desktop Interface`, caption: `Standard desktop interface screenshot for ${projectId}.`, type: "interface", device: "desktop" },
        { src: `/assets/projects/${folder}/tablet-01.webp`, alt: `${projectId} Tablet Interface`, caption: `Standard tablet interface screenshot for ${projectId}.`, type: "interface", device: "tablet" },
        { src: `/assets/projects/${folder}/mobile-01.webp`, alt: `${projectId} Mobile Interface`, caption: `Standard mobile interface screenshot for ${projectId}.`, type: "interface", device: "mobile" }
      );
    }

    // Architecture diagram (all projects)
    screenshots.push({
      src: `/assets/projects/${folder}/architecture.webp`,
      alt: "System Architecture & Integration Diagram",
      caption: "High-level visual blueprint mapping cloud architecture topology and third-party service connections.",
      type: "architecture"
    });

    // Workflow diagram (all projects)
    screenshots.push({
      src: `/assets/projects/${folder}/workflow.webp`,
      alt: "Operational Workflow & Integration Lifecycle",
      caption: "Sequential process diagram tracking logical stages from initial data collection triggers to end deliverable storage.",
      type: "workflow"
    });

    return screenshots;
  }, [projectId]);

  React.useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + activeScreenshots.length) % activeScreenshots.length);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % activeScreenshots.length);
      } else if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, activeScreenshots, activeScreenshots.length]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const realProjectIds = [
    "executive-platform",
    "saylani-form",
    "saylani-rotibank",
    "weather-app",
    "enterpret-steel",
    "job-applica",
    "lifedrop",
    "local-bi-framework"
  ];

  if (!realProjectIds.includes(projectId)) {
    return null;
  }

  const getProjectUrl = (id: string) => {
    switch (id) {
      case "executive-platform": return "https://mudassirdandor.dev";
      case "saylani-form": return "https://saylanireg.netlify.app";
      case "saylani-rotibank": return "https://saylani-rotibank-mu.vercel.app";
      case "weather-app": return "https://barishalert.netlify.app";
      case "enterpret-steel": return "https://enterpret-steel.vercel.app";
      case "job-applica": return "https://jobapplica.netlify.app";
      case "lifedrop": return "https://lifedrop.app (Staging)";
      case "local-bi-framework": return "https://lbi.analytics (Internal)";
      default: return "https://analytics.mudassir.dev";
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6 mt-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h4 className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider">
            Interactive Visual Workspace
          </h4>
          <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
            Select an analytical artifact view to audit deliverables
          </p>
        </div>

        <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-xs gap-1">
          {[
            { id: "interface", label: "Interactive Mockup" },
            { id: "architecture", label: "System Architecture" },
            { id: "workflow", label: "Operational Workflow" }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                activeTab === t.id
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-950"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "interface" && (
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {[
              { id: "desktop", label: "Desktop Bezel", icon: Laptop },
              { id: "tablet", label: "Tablet View", icon: Tablet },
              { id: "mobile", label: "Mobile Device", icon: Smartphone }
            ].map((d) => {
              const Icon = d.icon;
              return (
                <button
                  key={d.id}
                  onClick={() => setDevice(d.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider rounded-md border transition-all cursor-pointer ${
                    device === d.id
                      ? "bg-executive-blue border-executive-blue text-white shadow-xs"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {d.label}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center transition-all duration-300">
            {device === "desktop" && (
              <div className="w-full max-w-3xl border border-slate-300 rounded-xl overflow-hidden shadow-lg bg-white relative group/device">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                    <span className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  </div>
                  <div className="bg-white border border-slate-200 text-[10px] font-mono text-slate-400 rounded px-3 py-0.5 flex-1 max-w-md select-none truncate text-left">
                    {getProjectUrl(projectId)}
                  </div>
                </div>
                <div 
                  className="h-[280px] overflow-y-auto bg-slate-100 p-4 relative cursor-zoom-in group/image hover:opacity-95 active:scale-[0.99] transition-all"
                  onClick={() => {
                    const idx = activeScreenshots.findIndex(s => s.type === "interface" && s.device === "desktop");
                    openLightbox(idx !== -1 ? idx : 0);
                  }}
                  title="Expand visual evidence"
                >
                  <ContentPlaceholder
                    variant="desktop screenshot"
                    src={`/assets/projects/${getProjectFolder(projectId)}/desktop-01.webp`}
                    alt={`${projectId} desktop screenshot`}
                    className="absolute inset-0 border-0 rounded-none w-full h-full"
                  >
                    <div className="h-full overflow-y-auto bg-slate-100 p-4 relative">
                      {renderMockScreenContent(projectId, "desktop")}
                    </div>
                  </ContentPlaceholder>
                  <div className="absolute bottom-3 right-3 z-30 bg-slate-900/90 hover:bg-slate-950 text-white backdrop-blur-xs text-[9px] font-mono font-extrabold px-2.5 py-1.5 rounded-lg border border-slate-700/50 flex items-center gap-1.5 opacity-0 group-hover/device:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>EXPAND EVIDENCE</span>
                  </div>
                </div>
              </div>
            )}

            {device === "tablet" && (
              <div className="w-[450px] border-[12px] border-slate-900 rounded-[2rem] overflow-hidden shadow-lg bg-white relative group/device">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                </div>
                <div 
                  className="h-[320px] overflow-y-auto bg-slate-100 p-4 relative pt-6 cursor-zoom-in hover:opacity-95 active:scale-[0.99] transition-all"
                  onClick={() => {
                    const idx = activeScreenshots.findIndex(s => s.type === "interface" && s.device === "tablet");
                    openLightbox(idx !== -1 ? idx : 0);
                  }}
                  title="Expand visual evidence"
                >
                  <ContentPlaceholder
                    variant="desktop screenshot"
                    src={`/assets/projects/${getProjectFolder(projectId)}/tablet-01.webp`}
                    alt={`${projectId} tablet screenshot`}
                    className="absolute inset-0 border-0 rounded-none w-full h-full"
                  >
                    <div className="h-full overflow-y-auto bg-slate-100 p-4 relative pt-6">
                      {renderMockScreenContent(projectId, "tablet")}
                    </div>
                  </ContentPlaceholder>
                  <div className="absolute bottom-3 right-3 z-30 bg-slate-900/90 hover:bg-slate-950 text-white backdrop-blur-xs text-[9px] font-mono font-extrabold px-2.5 py-1.5 rounded-lg border border-slate-700/50 flex items-center gap-1.5 opacity-0 group-hover/device:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>EXPAND EVIDENCE</span>
                  </div>
                </div>
              </div>
            )}

            {device === "mobile" && (
              <div className="w-[260px] border-[10px] border-slate-900 rounded-[2.2rem] overflow-hidden shadow-lg bg-white relative group/device">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-xl z-20" />
                <div 
                  className="h-[380px] overflow-y-auto bg-slate-100 p-3 relative pt-6 cursor-zoom-in hover:opacity-95 active:scale-[0.99] transition-all"
                  onClick={() => {
                    const idx = activeScreenshots.findIndex(s => s.type === "interface" && s.device === "mobile");
                    openLightbox(idx !== -1 ? idx : 0);
                  }}
                  title="Expand visual evidence"
                >
                  <ContentPlaceholder
                    variant="mobile screenshot"
                    src={`/assets/projects/${getProjectFolder(projectId)}/mobile-01.webp`}
                    alt={`${projectId} mobile screenshot`}
                    className="absolute inset-0 border-0 rounded-none w-full h-full"
                  >
                    <div className="h-full overflow-y-auto bg-slate-100 p-3 relative pt-6">
                      {renderMockScreenContent(projectId, "mobile")}
                    </div>
                  </ContentPlaceholder>
                  <div className="absolute bottom-3 right-3 z-30 bg-slate-900/90 hover:bg-slate-950 text-white backdrop-blur-xs text-[9px] font-mono font-extrabold px-2.5 py-1.5 rounded-lg border border-slate-700/50 flex items-center gap-1.5 opacity-0 group-hover/device:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>EXPAND EVIDENCE</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "architecture" && (
        <div 
          className="relative cursor-zoom-in group/device overflow-hidden rounded-xl active:scale-[0.995] transition-all hover:opacity-98"
          onClick={() => {
            const idx = activeScreenshots.findIndex(s => s.type === "architecture");
            openLightbox(idx !== -1 ? idx : 0);
          }}
          title="Expand system architecture"
        >
          <ContentPlaceholder
            variant="architecture"
            src={`/assets/projects/${getProjectFolder(projectId)}/architecture.webp`}
            alt={`${projectId} architecture diagram`}
            className="w-full"
          >
            <div className="bg-slate-900 text-slate-100 border border-slate-850 p-6 rounded-xl space-y-6 relative overflow-hidden font-mono text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/[0.03] rounded-full blur-3xl pointer-events-none" />
              <div className="text-[9px] text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2 flex justify-between items-center text-left">
                <span>Unified System Diagram</span>
                <span className="text-blue-400">STAGE_4_ENG</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2 items-center relative z-10 text-center">
                {getArchitectureNodes(projectId).map((node, idx, arr) => (
                  <React.Fragment key={node.id}>
                    <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 flex flex-col items-center gap-2 shadow-xs hover:border-slate-700 transition-colors text-center">
                      <div className="p-2 bg-slate-800 text-blue-400 rounded-lg">
                        {React.createElement(node.icon, { className: "w-5 h-5" })}
                      </div>
                      <h5 className="text-[10px] font-bold text-white uppercase tracking-wider">{node.label}</h5>
                      <p className="text-[9px] text-slate-400 leading-normal">{node.desc}</p>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="flex md:flex-col justify-center items-center py-1 text-slate-600">
                        <span className="md:hidden">▼</span>
                        <span className="hidden md:inline">▶</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </ContentPlaceholder>
          <div className="absolute bottom-3 right-3 z-30 bg-slate-900/90 hover:bg-slate-950 text-white backdrop-blur-xs text-[9px] font-mono font-extrabold px-2.5 py-1.5 rounded-lg border border-slate-700/50 flex items-center gap-1.5 opacity-0 group-hover/device:opacity-100 transition-opacity">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>EXPAND DIAGRAM</span>
          </div>
        </div>
      )}

      {activeTab === "workflow" && (
        <div 
          className="relative cursor-zoom-in group/device overflow-hidden rounded-xl active:scale-[0.995] transition-all hover:opacity-98"
          onClick={() => {
            const idx = activeScreenshots.findIndex(s => s.type === "workflow");
            openLightbox(idx !== -1 ? idx : 0);
          }}
          title="Expand operational workflow"
        >
          <ContentPlaceholder
            variant="workflow"
            src={`/assets/projects/${getProjectFolder(projectId)}/workflow.webp`}
            alt={`${projectId} operational workflow`}
            className="w-full"
          >
            <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-4 text-left">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-[10px] font-bold font-mono text-slate-800 uppercase tracking-wider">Operational Lifecycle Stages</span>
                <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded uppercase font-semibold">Active Pipeline</span>
              </div>

              <div className="space-y-4">
                {getWorkflowSteps(projectId).map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="flex flex-col items-center shrink-0">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                        {idx + 1}
                      </span>
                      {idx < 3 && <div className="w-[1px] h-10 bg-slate-200 group-hover:bg-slate-300 transition-colors" />}
                    </div>
                    <div className="space-y-1 pt-0.5">
                      <h5 className="text-xs font-bold text-slate-950 uppercase tracking-wider">{step.title}</h5>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{step.desc}</p>
                      <span className="inline-block text-[8px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wider font-semibold">
                        {step.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ContentPlaceholder>
          <div className="absolute bottom-3 right-3 z-30 bg-slate-900/90 hover:bg-slate-950 text-white backdrop-blur-xs text-[9px] font-mono font-extrabold px-2.5 py-1.5 rounded-lg border border-slate-700/50 flex items-center gap-1.5 opacity-0 group-hover/device:opacity-100 transition-opacity">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>EXPAND FLOW</span>
          </div>
        </div>
      )}

      {/* Lightbox Modal Component */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 select-none"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Header: Controls */}
            <div className="w-full flex items-center justify-between py-3 px-4 md:px-8 border-b border-slate-800/60 bg-slate-900/40 rounded-xl backdrop-blur-sm z-20" onClick={(e) => e.stopPropagation()}>
              <div>
                <h5 className="text-xs md:text-sm font-bold text-white tracking-wide uppercase">
                  {projects.find(p => p.id === projectId)?.title || "Project Evidence"}
                </h5>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                  Artifact {lightboxIndex + 1} of {activeScreenshots.length} — {activeScreenshots[lightboxIndex].alt}
                </p>
              </div>

              <button 
                onClick={() => setLightboxOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-full border border-slate-800 transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Workspace: Image or high-fidelity mockup */}
            <div className="flex-1 flex items-center justify-center relative py-4 z-10 my-4" onClick={(e) => e.stopPropagation()}>
              {/* Previous Button */}
              <button 
                onClick={() => setLightboxIndex((prev) => (prev - 1 + activeScreenshots.length) % activeScreenshots.length)}
                className="absolute left-2 md:left-6 p-3 bg-slate-900/85 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800/80 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer z-30"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image frame */}
              <div className="max-w-4xl w-full h-[60vh] flex items-center justify-center relative p-2 md:p-6 bg-slate-900/25 rounded-2xl border border-slate-900/60 overflow-hidden">
                <ContentPlaceholder
                  variant={activeScreenshots[lightboxIndex].type === "architecture" ? "architecture" : activeScreenshots[lightboxIndex].type === "workflow" ? "workflow" : "desktop screenshot"}
                  src={activeScreenshots[lightboxIndex].src}
                  alt={activeScreenshots[lightboxIndex].alt}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-slate-800/40"
                >
                  {/* Dynamic Mockup fallback inside lightbox so there are never broken images! */}
                  <div className="w-full max-w-lg p-6 bg-slate-900 border border-slate-800 rounded-2xl text-left shadow-2xl space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">
                        {activeScreenshots[lightboxIndex].type.toUpperCase()} EVIDENCE
                      </span>
                      <span className="text-[8px] font-mono text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/5 font-semibold uppercase tracking-wider">
                        SECURE SANDBOX
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-white tracking-tight uppercase">
                        {activeScreenshots[lightboxIndex].alt}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {activeScreenshots[lightboxIndex].caption}
                      </p>
                    </div>

                    {/* Show beautiful mini interactive dashboard mockup if it's the interface type! */}
                    {activeScreenshots[lightboxIndex].type === "interface" ? (
                      <div className="h-[200px] border border-slate-800/80 rounded-xl overflow-hidden mt-3 bg-slate-950 p-4 relative">
                        {renderMockScreenContent(projectId, activeScreenshots[lightboxIndex].device || "desktop")}
                      </div>
                    ) : activeScreenshots[lightboxIndex].type === "architecture" ? (
                      <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-850 text-[10px] font-mono text-slate-400 max-h-[220px] overflow-y-auto">
                        <span className="text-white font-bold block uppercase tracking-wider text-[8px] mb-2 text-blue-400">Topology Specifications:</span>
                        {getArchitectureNodes(projectId).map((node, i) => (
                          <div key={node.id} className="flex gap-2 items-center">
                            <span className="text-blue-500 font-extrabold">{i + 1}.</span>
                            <span className="text-white uppercase font-bold text-[9px] min-w-[100px]">{node.label}:</span>
                            <span className="truncate">{node.desc}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-850 text-[10px] font-mono text-slate-400 max-h-[220px] overflow-y-auto">
                        <span className="text-white font-bold block uppercase tracking-wider text-[8px] mb-1.5 text-emerald-400">Pipeline Stages:</span>
                        {getWorkflowSteps(projectId).map((step, i) => (
                          <div key={i} className="flex gap-2 items-start">
                            <span className="text-emerald-500 font-extrabold">{i + 1}.</span>
                            <div>
                              <span className="text-white uppercase font-bold text-[9px] block">{step.title}</span>
                              <span className="text-[9px] leading-relaxed block text-slate-500">{step.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ContentPlaceholder>
              </div>

              {/* Next Button */}
              <button 
                onClick={() => setLightboxIndex((prev) => (prev + 1) % activeScreenshots.length)}
                className="absolute right-2 md:right-6 p-3 bg-slate-900/85 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800/80 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer z-30"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Footer: Captions and Thumbnails */}
            <div className="w-full bg-slate-900/40 rounded-xl border border-slate-800/50 p-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 z-20" onClick={(e) => e.stopPropagation()}>
              <div className="text-center md:text-left max-w-2xl">
                <span className="inline-block text-[9px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-bold uppercase tracking-widest mb-1.5">
                  Executive Briefing
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium text-left">
                  {activeScreenshots[lightboxIndex].caption}
                </p>
              </div>

              {/* Thumbnail strip or index indicators */}
              <div className="flex gap-1.5">
                {activeScreenshots.map((scr, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      idx === lightboxIndex ? "bg-blue-500 w-6" : "bg-slate-700 hover:bg-slate-600"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const getProjectCrossLinks = (id: string) => {
  switch (id) {
    case "executive-platform":
      return {
        solution: { title: "Business Intelligence", pageId: "solutions" },
        article: { title: "Designing Human-in-the-Loop AI Reporting Systems", pageId: "insights" }
      };
    case "saylani-form":
      return {
        solution: { title: "Workflow Automation", pageId: "solutions" },
        article: { title: "What Is Business Intelligence and Why Does Every Organization Need It?", pageId: "insights" }
      };
    case "saylani-rotibank":
      return {
        solution: { title: "Workflow Automation", pageId: "solutions" },
        article: { title: "What Is Business Intelligence and Why Does Every Organization Need It?", pageId: "insights" }
      };
    case "weather-app":
      return {
        solution: { title: "Custom Web Solutions", pageId: "solutions" },
        article: { title: "Why Dashboards Need Statistical Rigor", pageId: "insights" }
      };
    case "enterpret-steel":
      return {
        solution: { title: "Custom Web Solutions", pageId: "solutions" },
        article: { title: "What Is Business Intelligence and Why Does Every Organization Need It?", pageId: "insights" }
      };
    case "job-applica":
      return {
        solution: { title: "Custom Web Solutions", pageId: "solutions" },
        article: { title: "Why Dashboards Need Statistical Rigor", pageId: "insights" }
      };
    case "lifedrop":
      return {
        solution: { title: "AI Automation", pageId: "solutions" },
        article: { title: "Designing Human-in-the-Loop AI Reporting Systems", pageId: "insights" }
      };
    case "local-bi-framework":
      return {
        solution: { title: "Local Business Intelligence", pageId: "solutions" },
        article: { title: "Local BI: Leveraging Maps Analytics for Geo Performance", pageId: "insights" }
      };
    default:
      if (id.includes("sales") || id.includes("finance")) {
        return {
          solution: { title: "Business Intelligence", pageId: "solutions" },
          article: { title: "Optimizing DAX Calculation Speed on High-Volume Datasets", pageId: "insights" }
        };
      }
      return {
        solution: { title: "Business Intelligence", pageId: "solutions" },
        article: { title: "What Is Business Intelligence and Why Does Every Organization Need It?", pageId: "insights" }
      };
  }
};

const get14PointData = (project: Project) => {
  const extra = projectExtraDetails[project.id] || projectExtraDetails["sales-dashboard"];
  
  // Status mapping to consistency requirements
  let statusBadge = "⚪ Demonstration";
  if (project.status === "Production") statusBadge = "🟢 Production";
  else if (project.status === "Open Source") statusBadge = "🔵 Open Source";
  else if (project.status === "Research") statusBadge = "🟣 Research";
  else if (project.status === "In Development") statusBadge = "🟡 In Development";
  else if (project.status === "Demonstration") statusBadge = "⚪ Demonstration";
  else if (project.isSimulated) statusBadge = "⚪ Demonstration";
  else if (project.isUnderDevelopment) statusBadge = "🟡 In Development";

  // Project Type
  let projectType = "Interactive Business Intelligence Dashboard";
  if (project.id === "saylani-form") projectType = "Digital Student Registration & Automation Platform";
  else if (project.id === "saylani-rotibank") projectType = "Digital Donation Collection Platform";
  else if (project.id === "weather-app") projectType = "Weather Intelligence Application";
  else if (project.id === "enterpret-steel") projectType = "B2B Marketing & Steel Catalog Showcase";
  else if (project.id === "job-applica") projectType = "Job Application Wizard & Funnel Form";
  else if (project.id === "lifedrop") projectType = "Emergency Blood Coordination Platform";
  else if (project.id === "local-bi-framework") projectType = "Geospatial SEO & Local BI System";

  // Role
  let myRole = "Lead BI Developer & Analyst";
  if (project.id === "saylani-form" || project.id === "saylani-rotibank" || project.id === "lifedrop") {
    myRole = "Full-Stack Software Developer";
  } else if (project.id === "weather-app" || project.id === "enterpret-steel" || project.id === "job-applica") {
    myRole = "Front-End UI Engineer";
  }

  // Team Size
  const teamSize = "Solo (100% of codebase, design, and architecture designed and built by Mudassir)";

  // Duration
  let duration = "Ongoing / Maintenance";
  if (project.id === "saylani-form") duration = "Jan 2024 - Feb 2024";
  else if (project.id === "saylani-rotibank") duration = "Feb 2024";
  else if (project.id === "weather-app") duration = "Mar 2024";
  else if (project.id === "enterpret-steel") duration = "May 2024";
  else if (project.id === "job-applica") duration = "Jun 2024";
  else if (project.id === "lifedrop") duration = "Oct 2024 - Present";
  else if (project.id === "local-bi-framework") duration = "Jul 2024 - Present";
  else if (project.isSimulated) duration = "N/A (Demonstration profile)";

  // Repo Status
  const repositoryStatus = project.githubUrl ? "Public / Source Available" : "Private / Enterprise Not Shared";

  // Live Demo Status
  const liveDemoStatus = project.liveUrl ? "Available" : "Not Available";

  // 1. Overview
  const overview = project.description || extra.executiveSummary.context;

  // 2. Business Problem
  const businessProblem = project.businessProblem || extra.executiveSummary.challenge;

  // 3. Objectives
  let objectives = [
    "Design clean, high-performance dashboards that aggregate multi-source files into a single source of truth.",
    "Isolate high-risk churn indicators and bottlenecks with statistical significance.",
    "Formulate clear, defensive recommendations to recover operating margins and reduce support overhead."
  ];
  if (project.id === "saylani-form") {
    objectives = [
      "Remove multi-day administrative delays by establishing automated form intake routines.",
      "Prevent data pollution and duplicate records through strict browser-side validation constraints.",
      "Streamline student onboarding by generating high-fidelity digital ID cards instantly upon enrollment."
    ];
  } else if (project.id === "saylani-rotibank") {
    objectives = [
      "Coordinate surplus food logistics in real-time to eliminate community distribution gaps.",
      "Minimize volunteer strain by delegating routine inquiries to intelligent Dialogflow chatbots.",
      "Sync donation coordinates to a centralized Google Workspace ledger instantly."
    ];
  } else if (project.id === "weather-app") {
    objectives = [
      "Build a lightning-fast, ad-free weather search layout optimized for low-bandwidth mobile networks.",
      "Implement geolocated forecasting handshakes to provide hyper-localized weather data.",
      "Create high-visibility monsoon rainfall warning alerts for Karachi coordinates."
    ];
  } else if (extra.businessQuestions) {
    objectives = extra.businessQuestions.map((q) => `Answer the question: "${q}"`);
  }

  // 5. Solution
  let solution = `Designed and deployed a highly optimized decision companion system. Integrated transactional datasets into streamlined views, ensuring administrative simplicity and clean business intelligence report outputs.`;
  if (project.id === "saylani-form") {
    solution = `Developed a serverless registration platform. Deployed Google Apps Script POST relays writing directly to Sheets, accompanied by client-side SVG vector compilers that render instant student ID cards in under 5 seconds.`;
  } else if (project.id === "saylani-rotibank") {
    solution = `Established a Google Workspace-backed logistics coordinator. Built mobile-first submission triggers communicating through Google Apps Script with automated Dialogflow chatbot verification loops.`;
  } else if (project.isSimulated) {
    solution = `Built an interactive ${project.category} decision intelligence dashboard utilizing multi-dimensional star-schema databases, seasonal trend models, and diagnostic KPIs mapped using tailwind utility components.`;
  }

  // 7. Architecture Overview
  let architectureOverview = "Built as a modular full-stack client-side application. The presentation layer utilizes highly optimized React components and Tailwind utility styling. Data is managed through localized state handlers or serverless APIs, while analytics are modeled in Python/SQL and served through clean, responsive visual structures.";
  if (project.isSimulated) {
    architectureOverview = "This decision support dashboard adheres to a strict Star-Schema data warehouse structure. Transaction logs are loaded into localized fact tables, connected with dimension schemas (dates, regions, products), and queried using optimized state metrics to feed reactive D3/Recharts data visualizers.";
  }

  // 8. Key Features
  const keyFeatures = project.analysisSteps || [
    "High-fidelity interactive data visualization cards",
    "Multi-dimensional filtering & drill-down options",
    "Rolling historical trend charts and safety stock metrics",
    "Responsive desktop, tablet, and mobile interface design"
  ];

  // 9. Implementation Challenges & 10. How They Were Solved
  let challenges = [
    "Integrating sparse, unstructured legacy datasets and files into clean, consistent formats.",
    "Formulating predictive metrics (like demand or churn flights) without direct live database hooks."
  ];
  let solutionsToChallenges = [
    "Constructed clear star-schema data models with explicit null handlers, ensuring structural integrity.",
    "Utilized advanced local caching and robust static file synchronization patterns to maintain diagnostic consistency."
  ];

  if (project.id === "saylani-form") {
    challenges = [
      "High registration concurrency leading to Google Sheets API rate-limiting thresholds.",
      "Client-side image rendering latency and canvas-to-PDF pixelation during high-density barcode creation."
    ];
    solutionsToChallenges = [
      "Implemented an exponential backoff retry mechanism inside Google Apps Script relay handlers.",
      "Switched to lightweight SVG path vector compilers, delivering instant, pixel-perfect 300 DPI card downloads."
    ];
  } else if (project.id === "saylani-rotibank") {
    challenges = [
      "Ensuring coordinate-based food pledges matched the physical storage capacities of localized distribution hubs.",
      "Natural language processing drift when donors entered unstructured local food weights."
    ];
    solutionsToChallenges = [
      "Mapped coordinates against a simplified regional matrix to automatically group donations in the master Sheet.",
      "Constructed strict custom training intents inside Dialogflow to isolate clear volume boundaries."
    ];
  } else if (project.id === "weather-app") {
    challenges = [
      "Uncapped API lookup costs when users triggered rapid, consecutive keypress searches in the city locator.",
      "Handling unexpected browser geolocation blockages cleanly without freezing the user interface."
    ];
    solutionsToChallenges = [
      "Engineered a robust 400ms debouncing utility wrapper to restrict search queries until active typing paused.",
      "Implemented an explicit try-catch wrapper around navigator.geolocation that falls back to Karachi defaults."
    ];
  }

  // 11. Lessons Learned
  let lessonsLearned = [
    "Analytical models are only as good as the underlying schema design; starting with a robust data dictionary is crucial.",
    "Data honesty and transparency regarding simulated datasets build trust with business stakeholders."
  ];
  if (project.id === "saylani-form") {
    lessonsLearned = [
      "Serverless Workspace architectures (like Apps Script) offer incredible cost-to-value for low-to-medium traffic internal admin systems.",
      "Client-side vector generation delivers superior speed and fidelity compared to heavy server-side document compilers."
    ];
  }

  // 14. Future Improvements
  const futureImprovements = extra.futureEnhancements || project.recommendations || [
    "Incorporate real-time point-of-sale API ingestion pipelines.",
    "Train custom linear regressions to project upcoming quarterly revenue curves.",
    "Embed direct automated notification triggers."
  ];

  return {
    statusBadge,
    projectType,
    myRole,
    teamSize,
    duration,
    repositoryStatus,
    liveDemoStatus,
    overview,
    businessProblem,
    objectives,
    solution,
    architectureOverview,
    keyFeatures,
    challenges,
    solutionsToChallenges,
    lessonsLearned,
    futureImprovements
  };
};

/**
 * Consulting Case Studies component.
 * Lists categorized consulting engagement reports. Provides modular modal overlay views 
 * outlining business context, statistical methodologies, executive summaries, constraints, 
 * evidence files, and projected enhancements.
 */
export default function Projects({
  featuredOnly = false,
  onNavigate
}: {
  featuredOnly?: boolean;
  onNavigate?: (pageId: string) => void;
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<"All" | "AI Automation" | "Business Intelligence" | "Web Development" | "Google Workspace Automation" | "Chatbots" | "Interactive Applications" | "Data Collection Systems" | "Local Business Intelligence">("All");
  const [scrollPercent, setScrollPercent] = useState(0);

  React.useEffect(() => {
    const preselectedId = localStorage.getItem("selected-project-id");
    if (preselectedId) {
      const found = projects.find((p) => p.id === preselectedId);
      if (found) {
        setSelectedProject(found);
      }
      localStorage.removeItem("selected-project-id");
    }

    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId?: string }>;
      if (customEvent.detail?.projectId) {
        const found = projects.find((p) => p.id === customEvent.detail?.projectId);
        if (found) {
          setSelectedProject(found);
        }
      }
    };

    window.addEventListener("portfolio-open-project", handleCustomOpen);
    return () => {
      window.removeEventListener("portfolio-open-project", handleCustomOpen);
    };
  }, []);

  React.useEffect(() => {
    if (selectedProject) {
      telemetry.trackProjectOpen(selectedProject.id, selectedProject.category, selectedProject.status || "");
      telemetry.trackCaseStudyOpen(selectedProject.id, selectedProject.category, selectedProject.status || "");
    }
  }, [selectedProject]);

  const [activeLabCategory, setActiveLabCategory] = useState<"All" | "AI Automation" | "Business Intelligence" | "Local Business Intelligence" | "Interactive Applications">("All");

  const featuredIds = ["saylani-form", "weather-app", "lifedrop"];

  const realProjectsOnly = projects.filter((p) => !p.isSimulated);
  const simulatedProjectsOnly = projects.filter((p) => p.isSimulated);

  const filteredProjects = featuredOnly
    ? realProjectsOnly.filter((p) => featuredIds.includes(p.id))
    : activeCategory === "All"
      ? realProjectsOnly
      : realProjectsOnly.filter((p) => p.category === activeCategory);

  const filteredLabProjects = activeLabCategory === "All"
    ? simulatedProjectsOnly
    : simulatedProjectsOnly.filter((p) => p.category === activeLabCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Business Intelligence":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "Web Development":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "Google Workspace Automation":
        return "bg-teal-50 text-teal-600 border-teal-200";
      case "Chatbots":
        return "bg-orange-50 text-orange-600 border-orange-200";
      case "Interactive Applications":
        return "bg-pink-50 text-pink-600 border-pink-200";
      case "Data Collection Systems":
        return "bg-rose-50 text-rose-600 border-rose-200";
      case "AI Automation":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "Local Business Intelligence":
        return "bg-cyan-50 text-cyan-600 border-cyan-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getProjectVisitorLabel = (project: Project) => {
    if (project.status) {
      let className = "bg-slate-50 text-slate-600 border-slate-200 font-semibold";
      switch (project.status) {
        case "Production":
          className = "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold";
          break;
        case "Research":
          className = "bg-purple-50 text-purple-700 border-purple-200 font-semibold";
          break;
        case "In Development":
          className = "bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold";
          break;
        case "Demonstration":
          className = "bg-amber-50 text-amber-700 border-amber-200 font-semibold";
          break;
        case "Personal Project":
          className = "bg-blue-50 text-blue-700 border-blue-200 font-semibold";
          break;
        case "Open Source":
          className = "bg-cyan-50 text-cyan-700 border-cyan-200 font-semibold";
          break;
      }
      return { text: project.status, className };
    }
    if (project.isSimulated) {
      return {
        text: "Concept Demonstration",
        className: "bg-amber-50 text-amber-700 border-amber-200 font-semibold"
      };
    }
    if (project.isUnderDevelopment) {
      return {
        text: "In Development",
        className: "bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold"
      };
    }
    if (project.liveUrl && project.liveUrl !== "#") {
      return {
        text: "Live Project",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold"
      };
    }
    return {
      text: "Source Available",
      className: "bg-slate-50 text-slate-600 border-slate-200"
    };
  };

  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const percent = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollPercent(percent);
  };

  return (
    <section 
      id="projects" 
      className="relative py-24 bg-brand-bg-primary text-brand-body px-6 md:px-8 border-t border-slate-200 overflow-hidden"
      aria-label="Consulting Case Studies"
    >
      {/* Background desaturated decorative gradients */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow={
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-executive-blue" />
              <span className="font-mono text-[10px] tracking-widest text-executive-blue uppercase font-semibold">
                {featuredOnly ? "Featured Consulting Case Studies" : "Consulting Engagement Briefs"}
              </span>
            </div>
          }
          title={featuredOnly ? "Featured Case Studies" : "Consulting Case Studies"}
          description={
            featuredOnly ? (
              "Selected analytical proof of business value across core domains of BI, Analytics, and Local Business Intelligence."
            ) : (
              <div className="space-y-4">
                <p>
                  Real-world analytical approaches that transform business questions into actionable decisions.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-sans mt-2">
                  Every case study details a structured analytical methodology focused on solving critical business challenges. Rather than emphasizing code or raw tools first, these reports demonstrate the path from initial corporate question, to evidence and rigorous business intelligence, and finally to measurable, realistic business recommendations.
                </p>
              </div>
            )
          }
          actions={
            !featuredOnly ? (
              /* Editorial Category Selector */
              <div className="flex flex-wrap gap-1 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm self-start lg:self-end max-w-full justify-start md:justify-end">
                {["All", "AI Automation", "Business Intelligence", "Web Development", "Google Workspace Automation", "Chatbots", "Interactive Applications", "Data Collection Systems", "Local Business Intelligence"].map((cat) => {
                  const getLabel = (c: string) => {
                    switch (c) {
                      case "AI Automation": return "AI";
                      case "Business Intelligence": return "BI";
                      case "Web Development": return "Web";
                      case "Google Workspace Automation": return "Workspace";
                      case "Chatbots": return "Bots";
                      case "Interactive Applications": return "Interactive";
                      case "Data Collection Systems": return "Data Systems";
                      case "Local Business Intelligence": return "Local BI";
                      default: return c;
                    }
                  };
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat as any)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer focus-visible:ring-1 focus-visible:ring-blue-500 focus:outline-none ${
                        activeCategory === cat
                          ? "bg-slate-100 border border-slate-200 text-slate-900 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"
                      }`}
                    >
                      {getLabel(cat)}
                    </button>
                  );
                })}
              </div>
            ) : undefined
          }
        />

        {/* Consulting Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const extra = projectExtraDetails[project.id] || projectExtraDetails["sales-dashboard"];

              return (
                <ExecutiveCard
                  key={project.id}
                  level={1}
                  className="h-[340px] shadow-xs"
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="p-6 flex flex-col justify-between h-full w-full">
                    <div className="space-y-4">
                      {/* Header Details */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`px-2 py-0.5 text-[8px] font-mono rounded border uppercase tracking-wider ${getCategoryColor(project.category)}`}>
                            {project.category}
                          </span>
                          {(() => {
                            const labelInfo = getProjectVisitorLabel(project);
                            return (
                              <span className={`px-2 py-0.5 text-[8px] font-mono rounded border uppercase tracking-wider ${labelInfo.className}`}>
                                {labelInfo.text}
                              </span>
                            );
                          })()}
                          {project.repoStatus && (
                            <span className={`px-2 py-0.5 text-[8px] font-mono rounded border uppercase tracking-wider ${
                              project.repoStatus === "Source Available" 
                                ? "bg-slate-50 text-slate-600 border-slate-200" 
                                : "bg-zinc-50 text-zinc-600 border-zinc-200"
                            }`}>
                              {project.repoStatus}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                          REPORT {project.id.toUpperCase().replace("-", "_")}
                        </span>
                      </div>

                      {/* Report Title */}
                      <h3 className="text-[24px] font-semibold text-slate-900 tracking-tight group-hover:text-executive-blue transition-colors line-clamp-2 leading-[1.3] font-sans">
                        {project.title}
                      </h3>

                      {/* Story First: Business Context introduction */}
                      <p className="text-[16px] text-slate-600 leading-[1.65] line-clamp-3 font-sans">
                        {extra.businessContext}
                      </p>

                      {/* Question Teaser */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Primary Business Question</span>
                        <p className="text-[11px] text-slate-700 font-medium italic line-clamp-1 leading-normal">
                          "{extra.businessQuestions[0]}"
                        </p>
                      </div>
                    </div>

                    {/* Supporting metrics and action */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-emerald-600 font-mono">
                          {project.results[0]?.value || "Verified"}
                        </span>
                        <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tight">
                          {project.results[0]?.metric || "Status Indicator"}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setScrollPercent(0);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-[10px] font-mono tracking-wider text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer transition-all focus-visible:ring-1 focus-visible:ring-blue-500 focus:outline-none"
                      >
                        READ CASE STUDY
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </ExecutiveCard>
              );
            })}
          </AnimatePresence>
        </div>

        {featuredOnly ? (
          <div className="flex flex-col items-center justify-center mt-12 gap-4">
            <button
              onClick={() => onNavigate?.("case-studies")}
              className="px-6 py-3.5 bg-executive-blue hover:bg-blue-700 text-white font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center gap-2 group cursor-pointer transition-all duration-200 shadow-md shadow-blue-500/10"
            >
              Explore All Consulting Case Studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mt-1 text-center">
              Filterable by domain, including deep-dive diagnostics and operational data sources
            </p>
          </div>
        ) : (
          <>
            {/* Dedicated Analytics Lab Section */}
            <div id="analytics-lab" className="border-t border-slate-200 pt-20 mt-20 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <span className="px-3 py-1 text-[11px] font-mono rounded-full border text-amber-700 bg-amber-50 border-amber-200 uppercase tracking-widest inline-block font-bold">
                    Sandbox Environment
                  </span>
                  <h2 className="text-[32px] md:text-[36px] font-extrabold text-slate-900 tracking-tight font-display">
                    Analytics Lab
                  </h2>
                  <p className="text-[15px] text-slate-600 leading-relaxed font-sans">
                    Explore high-fidelity simulation models, interactive diagnostic matrices, and transactional database schemas built to demonstrate business intelligence workflows.
                  </p>
                </div>

                {/* Lab Category Filter */}
                <div className="flex flex-wrap gap-1 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm self-start md:self-end">
                  {["All", "AI Automation", "Business Intelligence", "Local Business Intelligence", "Interactive Applications"].map((cat) => {
                    const getLabLabel = (c: string) => {
                      switch (c) {
                        case "AI Automation": return "AI";
                        case "Business Intelligence": return "BI";
                        case "Local Business Intelligence": return "Local BI";
                        case "Interactive Applications": return "Interactive";
                        default: return c;
                      }
                    };
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveLabCategory(cat as any)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer focus-visible:ring-1 focus-visible:ring-blue-500 focus:outline-none ${
                          activeLabCategory === cat
                            ? "bg-slate-100 border border-slate-200 text-slate-900 shadow-2xs"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"
                        }`}
                      >
                        {getLabLabel(cat)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lab Legal Notice Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-5 flex gap-3 text-slate-700 max-w-4xl shadow-2xs">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold tracking-tight text-slate-900 uppercase">Operational Sandbox Disclaimer</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans italic">
                    This demonstration uses publicly available or sample datasets to showcase analytical techniques. No real-world private database keys or client details are exposed within these live simulation frameworks.
                  </p>
                </div>
              </div>

              {/* Lab Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredLabProjects.map((project) => {
                    const extra = projectExtraDetails[project.id] || projectExtraDetails["sales-dashboard"];

                    return (
                      <ExecutiveCard
                        key={project.id}
                        level={1}
                        className="h-[380px] shadow-xs"
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <div className="p-6 flex flex-col justify-between h-full w-full">
                          <div className="space-y-3.5">
                            {/* Header Details */}
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`px-2 py-0.5 text-[8px] font-mono rounded border uppercase tracking-wider ${getCategoryColor(project.category)}`}>
                                  {project.category}
                                </span>
                                {(() => {
                                  const labelInfo = getProjectVisitorLabel(project);
                                  return (
                                    <span className={`px-2 py-0.5 text-[8px] font-mono rounded border uppercase tracking-wider ${labelInfo.className}`}>
                                      {labelInfo.text}
                                    </span>
                                  );
                                })()}
                              </div>
                              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                                LAB {project.id.toUpperCase().replace("-", "_")}
                              </span>
                            </div>

                            {/* Report Title */}
                            <h3 className="text-[20px] font-semibold text-slate-900 tracking-tight group-hover:text-executive-blue transition-colors line-clamp-2 leading-[1.3] font-sans">
                              {project.title}
                            </h3>

                            {/* Business Context introduction */}
                            <p className="text-[14px] text-slate-600 leading-[1.6] line-clamp-3 font-sans">
                              {extra.businessContext}
                            </p>

                            {/* Simulated Footnote notice on card */}
                            <div className="bg-slate-50 border border-slate-200/50 rounded-lg p-2.5">
                              <p className="text-[10px] text-slate-500 leading-normal font-sans italic">
                                Uses sample dataset to showcase analytical techniques.
                              </p>
                            </div>
                          </div>

                          {/* Supporting metrics and action */}
                          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-emerald-600 font-mono">
                                {project.results[0]?.value || "Verified"}
                              </span>
                              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tight">
                                {project.results[0]?.metric || "Status Indicator"}
                              </span>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedProject(project);
                                setScrollPercent(0);
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-[10px] font-mono tracking-wider text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer transition-all focus-visible:ring-1 focus-visible:ring-blue-500 focus:outline-none"
                            >
                              OPEN SIMULATOR
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </ExecutiveCard>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Closing Professional Statement */}
            <div className="w-full text-center py-6 border-y border-slate-200 mt-20 max-w-4xl mx-auto">
              <p className="text-sm font-medium text-slate-700 italic tracking-wide">
                "Great analytics does not end with visualization—it delivers clarity, supports decisions and creates measurable business value."
              </p>
            </div>
          </>
        )}

        {/* Interactive Case Study & Evidence Experience Modal */}
        <AnimatePresence>
          {selectedProject && (
            <CaseStudyLayout
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onNavigate={onNavigate}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
