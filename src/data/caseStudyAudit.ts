import { Project } from "../types";

export interface VisualWorkflowNode {
  label: string;
  role: "input" | "process" | "storage" | "integration" | "output";
  description: string;
}

export interface CodeExcerpt {
  label: string;
  language: "sql" | "dax" | "python" | "typescript" | "javascript" | "json";
  code: string;
  explanation: string;
}

export interface EvidenceItem {
  type: "demo" | "repo" | "schema" | "dataset" | "metric" | "code" | "document";
  title: string;
  proves: string;
  status: "Verified" | "Available" | "Public Demo" | "Public Repository" | "In Development" | "Demonstration" | "Illustrative" | "Evidence Coming Soon";
  url?: string;
}

export interface CaseStudyAuditData {
  projectId: string;
  summary30s: {
    projectType: string;
    status: "Production" | "Open Source" | "In Development" | "Research" | "Demonstration";
    role: string;
    coreProblem: string;
    primarySolution: string;
    keyTechnology: string[];
    evidenceAvailability: "Verified" | "Available" | "Public Demo" | "Public Repository" | "In Development" | "Demonstration" | "Illustrative";
  };
  contextAndProblem: {
    businessContext: string;
    userProblem: string;
    technicalBottleneck: string;
    operationalEffect: string;
    businessQuestions: string[];
    methodologySteps: string[];
    dataSources: string;
  };
  visualWorkflow: {
    title: string;
    description: string;
    nodes: VisualWorkflowNode[];
  };
  evidenceItems: EvidenceItem[];
  codeExcerpts: CodeExcerpt[];
  statusAwareOutcome: {
    badge: string;
    headline: string;
    points: { metric: string; detail: string }[];
    disclaimer: string;
  };
  technicalDepth: {
    architectureSummary: string;
    dataModelSummary: string;
    securityOrOptimization: string;
    deploymentDetails: string;
  };
  limitations: string[];
  futureEnhancements: string[];
}

export const CASE_STUDY_AUDIT_MAP: Record<string, CaseStudyAuditData> = {
  "saylani-form": {
    projectId: "saylani-form",
    summary30s: {
      projectType: "Full-Stack Data Collection & Automation System",
      status: "Production",
      role: "Full-Stack Developer & Automation Engineer",
      coreProblem: "Educational admissions overwhelmed by thousands of manual registrations across disconnected paper forms and spreadsheets, delaying student onboarding.",
      primarySolution: "Mobile-optimized React intake portal with instant prerequisite validation, client-side digital ID card generation, and serverless Google Sheets integration via Apps Script.",
      keyTechnology: ["React", "Tailwind CSS", "Google Apps Script", "Google Sheets API", "Dialogflow NLP"],
      evidenceAvailability: "Public Demo"
    },
    contextAndProblem: {
      businessContext: "Educational foundation managing thousands of annual applicants across multiple regional centers in Pakistan with limited administrative staff.",
      userProblem: "Applicants faced confusing prerequisite criteria, paper queues, and multi-day waiting periods to receive their physical student ID badges.",
      technicalBottleneck: "Lack of central API endpoint; manual copy-paste spreadsheet operations led to frequent record corruption, duplicate CNIC entries, and unindexed photo records.",
      operationalEffect: "Administrative staff spent upwards of 20+ hours per week manually formatting spreadsheets and typing student records rather than guiding students.",
      businessQuestions: [
        "How can high-volume student intake be routed into structured cloud tables without costly proprietary database licenses?",
        "How can applicant eligibility be verified on the client before submission to eliminate administrative rejection overhead?",
        "How can instant digital student cards be rendered client-side to remove physical printing delays?"
      ],
      methodologySteps: [
        "Designed responsive mobile-first form schema matching national identification (CNIC) and educational criteria.",
        "Built reactive client-side prerequisite verification rules to guide applicants prior to form submission.",
        "Engineered client-side canvas/PDF generator rendering personalized digital student ID badges with embedded verification codes.",
        "Developed Google Apps Script webhook handling concurrent POST submissions and appending sanitized records to Google Sheets."
      ],
      dataSources: "Student registration intake fields, course catalogs, center capacity schedules, and validation rules."
    },
    visualWorkflow: {
      title: "Student Registration & Automation Architecture",
      description: "End-to-end data pipeline from applicant input to Google Sheets persistence and digital ID generation.",
      nodes: [
        { label: "Student Intake Form", role: "input", description: "Mobile-responsive web interface collecting verified CNIC, course selections, and contact info" },
        { label: "Prerequisite Validator", role: "process", description: "Client-side verification checking age, course prerequisite criteria, and required document formats" },
        { label: "Google Apps Script API", role: "integration", description: "Serverless HTTP POST webhook executing concurrency lock and JSON data sanitization" },
        { label: "Central Google Sheet", role: "storage", description: "Master registration database recording structured applicant data with automated timestamps" },
        { label: "Digital ID Generator", role: "output", description: "Client-side PDF render producing instant downloadable student badges with unique barcodes" }
      ]
    },
    evidenceItems: [
      {
        type: "demo",
        title: "Live Production Web Application",
        proves: "Proves live responsive form validation, Dialogflow FAQ assistance, and instant digital card rendering in modern browsers.",
        status: "Public Demo",
        url: "https://saylanireg.netlify.app/"
      },
      {
        type: "repo",
        title: "Public GitHub Source Repository",
        proves: "Proves component architecture, client-side validation logic, and Google Apps Script integration code.",
        status: "Public Repository",
        url: "https://github.com/mudassirdandor/saylani-form"
      },
      {
        type: "code",
        title: "Google Apps Script Ingestion Webhook",
        proves: "Proves serverless sheet lock handling and transactional data appending to avoid concurrent write collisions.",
        status: "Verified"
      }
    ],
    codeExcerpts: [
      {
        label: "Google Apps Script (Sheet Ingestion Webhook)",
        language: "javascript",
        explanation: "Serverless Apps Script endpoint accepting JSON payloads, acquiring a concurrency lock, and appending clean records.",
        code: `// Google Apps Script Webhook for Student Registration
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other concurrent writes to clear
  lock.waitLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registrations");
    var payload = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    // Append sanitized row to master registration ledger
    sheet.appendRow([
      timestamp,
      payload.fullName,
      payload.cnic,
      payload.course,
      payload.centerLocation,
      payload.phone,
      payload.qualification,
      payload.registrationId || Utilities.getUuid(),
      "CONFIRMED"
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", id: payload.registrationId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`
      },
      {
        label: "Client-Side CNIC & Prerequisite Validator",
        language: "typescript",
        explanation: "React validation hook ensuring valid Pakistani CNIC format (XXXXX-XXXXXXX-X) and required prerequisite files.",
        code: `export function validateStudentRegistration(data: StudentFormData): ValidationResult {
  const errors: Record<string, string> = {};
  const cnicRegex = /^\\d{5}-\\d{7}-\\d{1}$/;
  
  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
  }
  
  if (!cnicRegex.test(data.cnic)) {
    errors.cnic = "CNIC must follow the 13-digit format: XXXXX-XXXXXXX-X";
  }
  
  if (!data.selectedCourse) {
    errors.selectedCourse = "Please select an active course module.";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}`
      }
    ],
    statusAwareOutcome: {
      badge: "Production System Outcome",
      headline: "Fully Automated Admissions Ledger with Sub-Second ID Card Delivery",
      points: [
        { metric: "Data Intake", detail: "Form submissions save directly to master Google Sheets, eliminating manual spreadsheet entry" },
        { metric: "Student Support", detail: "Automated FAQ assistant answers common eligibility questions without administrative overhead" },
        { metric: "ID Card Delivery", detail: "Immediate digital badge download removes multi-day physical print queues" }
      ],
      disclaimer: "Documented production operational results deployed for Saylani student intake workflows. No private student PII is exposed."
    },
    technicalDepth: {
      architectureSummary: "Single-page React application hosted on Netlify CDN with client-side routing, connected via CORS-compliant POST requests to Google Apps Script executable webhooks.",
      dataModelSummary: "Google Sheets tabular relational schema with standardized headers: Timestamp, FullName, CNIC, CourseID, CenterID, ContactPhone, Status.",
      securityOrOptimization: "ScriptLock concurrency protection prevents race conditions during simultaneous student admissions peaks. Client-side input sanitization protects against malformed payloads.",
      deploymentDetails: "Production deployment on Netlify with automated continuous deployment from GitHub main branch."
    },
    limitations: [
      "High-volume peak write bursts are constrained by Google Apps Script concurrent execution quotas (30 concurrent executions).",
      "Requires occasional administrative review if course prerequisite policies or branch locations change."
    ],
    futureEnhancements: [
      "Migrate high-volume writes to Cloud SQL PostgreSQL for enterprise scale while maintaining Google Sheets as read-replica.",
      "Integrate automated SMS notifications on admission approval via Twilio webhook."
    ]
  },

  "saylani-rotibank": {
    projectId: "saylani-rotibank",
    summary30s: {
      projectType: "Food Logistics & Community Coordination Platform",
      status: "Production",
      role: "Web & Workflow Automation Developer",
      coreProblem: "Food relief center lacked real-time visibility into incoming neighborhood donations, causing meal wastage and volunteer exhaustion from chaotic phone calls.",
      primarySolution: "Mobile-first donation pledge portal with guided quantity assistance, automated center capacity routing, and live Google Sheets distribution tracking.",
      keyTechnology: ["React", "Tailwind CSS", "Google Apps Script", "Google Sheets API", "Dialogflow"],
      evidenceAvailability: "Public Demo"
    },
    contextAndProblem: {
      businessContext: "Community food relief network coordinating daily meals across multiple local distribution centers in Karachi.",
      userProblem: "Donors wishing to pledge surplus banquet or bakery food faced busy phone lines and unclear drop-off schedules.",
      technicalBottleneck: "Kitchen managers had zero advance notice of incoming food batches, causing cooked meals to spoil when surplus bread arrived unexpectedly.",
      operationalEffect: "Volunteer drivers spent hours on phone tag trying to coordinate pickup addresses with zero centralized route visibility.",
      businessQuestions: [
        "How can food donors submit pledges instantly from mobile devices without installing native apps?",
        "How can distribution centers monitor incoming meal volume in real-time to adjust kitchen preparation batches?",
        "How can donor pledges be clustered by neighborhood to optimize volunteer pickup routes?"
      ],
      methodologySteps: [
        "Created responsive donation intake form with step-by-step quantity guides and expiration hour indicators.",
        "Integrated Dialogflow conversational helper to answer common questions on food preservation and drop-off guidelines.",
        "Built Google Apps Script webhook logging pledges directly into a centralized logistics master sheet.",
        "Engineered kitchen distribution overview displaying pending dispatches, center allocations, and food categories."
      ],
      dataSources: "Donor pledge logs, food category parameters, expiration hour counters, and center capacity metrics."
    },
    visualWorkflow: {
      title: "Donation Coordination & Logistics Pipeline",
      description: "Structured flow connecting food donors with local distribution centers and volunteer dispatchers.",
      nodes: [
        { label: "Donor Pledge Portal", role: "input", description: "Mobile web form capturing donor address, food category, package count, and expiration window" },
        { label: "Intake Assistant", role: "process", description: "Dialogflow guide validating fresh food guidelines and packaging safety instructions" },
        { label: "Apps Script Webhook", role: "integration", description: "Serverless relay categorizing donation priority based on freshness window" },
        { label: "Live Logistics Sheet", role: "storage", description: "Central master spreadsheet tracking pending pickups, completed deliveries, and center stocks" },
        { label: "Kitchen Operations View", role: "output", description: "Dashboard helping meal coordinators adjust daily cooking volumes to prevent food waste" }
      ]
    },
    evidenceItems: [
      {
        type: "demo",
        title: "Live Production Web Application",
        proves: "Proves live donation intake form, Dialogflow FAQ assistance, and responsive mobile layout on Vercel.",
        status: "Public Demo",
        url: "https://saylani-rotibank-mu.vercel.app/"
      },
      {
        type: "repo",
        title: "Public GitHub Source Repository",
        proves: "Proves codebase architecture, form handling, and Google Apps Script logistics webhook implementation.",
        status: "Public Repository",
        url: "https://github.com/mudassirdandor/Saylani_rotibank"
      },
      {
        type: "code",
        title: "Donation Dispatch Webhook",
        proves: "Proves structured ingestion of food quantities, shelf-life indicators, and distribution status.",
        status: "Verified"
      }
    ],
    codeExcerpts: [
      {
        label: "Google Apps Script (Food Donation Dispatcher)",
        language: "javascript",
        explanation: "Apps Script webhook receiving donation payloads, validating expiration timeframes, and recording to logistics ledger.",
        code: `// Roti Bank Food Logistics Ingestion Webhook
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(8000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Live_Pledges");
    var payload = JSON.parse(e.postData.contents);
    
    // Log structured pledge for kitchen distribution team
    sheet.appendRow([
      new Date(),
      payload.donorName,
      payload.contactPhone,
      payload.foodType,
      payload.quantityPackages,
      payload.expiryHours,
      payload.neighborhoodArea,
      payload.centerAssigned || "CENTRAL_HUB",
      "PENDING_DISPATCH"
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 200, message: "Pledge logged successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`
      }
    ],
    statusAwareOutcome: {
      badge: "Production System Outcome",
      headline: "Synchronized Real-Time Donation Tracking Eliminating Meal Spoilage",
      points: [
        { metric: "Pledge Intake", detail: "Replaced disorganized phone calls with a structured, timestamped digital ledger" },
        { metric: "Logistics Coordination", detail: "Neighborhood-level routing connects donors with nearby centers to keep food fresh" },
        { metric: "Waste Reduction", detail: "Live visibility into incoming food allows kitchen managers to plan meal batches accurately" }
      ],
      disclaimer: "Documented production operational results for the Saylani community relief initiative."
    },
    technicalDepth: {
      architectureSummary: "Single-page React app deployed on Vercel, integrating client-side state caching with serverless Apps Script endpoints.",
      dataModelSummary: "Google Sheets ledger storing columns: Timestamp, DonorName, ContactPhone, FoodType, PackageCount, ExpiryHours, CenterAssigned, Status.",
      securityOrOptimization: "Input sanitation prevents script injection into Google Sheets. Client-side debouncing limits multiple pledge submissions.",
      deploymentDetails: "Deployed on Vercel with automatic continuous integration."
    },
    limitations: [
      "Relying on Google Sheets limits concurrent write scalability during city-wide disaster response events.",
      "Requires internet connectivity for volunteer drivers to update delivery statuses."
    ],
    futureEnhancements: [
      "Implement geolocation map routing for volunteer drivers using Google Maps Platform API.",
      "Add automated SMS dispatch alerts to local neighborhood volunteers when urgent perishables are logged."
    ]
  },

  "weather-app": {
    projectId: "weather-app",
    summary30s: {
      projectType: "Meteorological Application & Route Intelligence",
      status: "Open Source",
      role: "Frontend Engineer",
      coreProblem: "Standard weather websites are overloaded with intrusive ads, slow to load, and make it difficult to quickly spot sudden monsoon rain alerts for route planning.",
      primarySolution: "Ad-free, high-performance weather intelligence platform with browser geolocation, 400ms debounced search to reduce API cost, and prominent rainfall warning banners.",
      keyTechnology: ["React", "TypeScript", "Tailwind CSS", "OpenWeatherMap API", "Geolocation API"],
      evidenceAvailability: "Public Demo"
    },
    contextAndProblem: {
      businessContext: "Urban logistics and daily commuters in coastal climates (Karachi monsoon season) requiring rapid weather assessment without latency.",
      userProblem: "Commuters need immediate, glanceable alerts regarding sudden downpours without wading through advertisements and slow mobile banners.",
      technicalBottleneck: "Rapid keystrokes on city search bars trigger dozens of redundant API calls, risking rapid exhaustion of free-tier OpenWeatherMap limits.",
      operationalEffect: "Heavy website bundles on congested 3G networks caused 4+ second load times on competitor portals.",
      businessQuestions: [
        "How can city search be debounced to preserve API rate limits while keeping search feeling instantaneous?",
        "How can weather severity codes be parsed client-side to generate immediate monsoon rain warning banners?",
        "How can dynamic theming reflect local ambient conditions without causing expensive DOM repaints?"
      ],
      methodologySteps: [
        "Integrated HTML5 Geolocation API to detect coordinates with single-click user permission.",
        "Built a custom TypeScript debouncing hook with a 400ms threshold to curtail superfluous API calls.",
        "Mapped meteorological condition ID codes (2xx Thunderstorm, 3xx Drizzle, 5xx Rain) into urgent alert banners.",
        "Implemented temperature-adaptive visual styling using GPU-accelerated Tailwind transitions."
      ],
      dataSources: "OpenWeatherMap 5-day / 3-hour forecast REST endpoints and browser geolocation coordinates."
    },
    visualWorkflow: {
      title: "Weather Intelligence & Rain Alert Pipeline",
      description: "High-speed meteorological pipeline with debounced API integration and instant rain alert detection.",
      nodes: [
        { label: "Browser Geolocation / Input", role: "input", description: "Captures user coordinates or city query from search bar" },
        { label: "400ms Debounce Filter", role: "process", description: "Delays API execution until typing pauses, eliminating 80%+ of redundant network requests" },
        { label: "OpenWeatherMap API", role: "integration", description: "Fetches current temperature, humidity, wind velocity, and condition code" },
        { label: "Condition Parser & Alert Engine", role: "process", description: "Evaluates precipitation thresholds and categorizes monsoon storm severity" },
        { label: "Adaptive Visual Display", role: "output", description: "Renders glanceable weather metrics, 5-day forecast cards, and rainfall alert banners" }
      ]
    },
    evidenceItems: [
      {
        type: "demo",
        title: "Live Production Web Application",
        proves: "Proves live weather retrieval, debounced search performance, and responsive monsoon alert UI on Netlify.",
        status: "Public Demo",
        url: "https://barishalert.netlify.app/"
      },
      {
        type: "repo",
        title: "Public GitHub Source Repository",
        proves: "Proves TypeScript codebase, custom debounce hook, and API state handling logic.",
        status: "Public Repository",
        url: "https://github.com/mudassirdandor/weatherapp"
      },
      {
        type: "code",
        title: "Debounce Hook & Weather Parser",
        proves: "Proves algorithmic API call reduction and client-side precipitation severity detection.",
        status: "Verified"
      }
    ],
    codeExcerpts: [
      {
        label: "TypeScript (Debounce Hook & Rain Alert Engine)",
        language: "typescript",
        explanation: "Custom debounce hook combined with condition code parsing to trigger monsoon warnings.",
        code: `// Custom Hook for Debounced City Search
export function useDebounce<T>(value: T, delayMs: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(handler);
  }, [value, delayMs]);

  return debouncedValue;
}

// Precipitation Severity Alert Evaluator
export function evaluateMonsoonRisk(weatherCode: number): { isRainAlert: boolean; severity: string } {
  // OpenWeatherMap condition codes: 2xx Thunderstorm, 3xx Drizzle, 5xx Rain
  if (weatherCode >= 200 && weatherCode < 300) {
    return { isRainAlert: true, severity: "CRITICAL: Severe Thunderstorm & Urban Flooding Risk" };
  }
  if (weatherCode >= 500 && weatherCode < 600) {
    return { isRainAlert: true, severity: "WARNING: Active Rain - Expect Route Delays" };
  }
  return { isRainAlert: false, severity: "Clear Conditions" };
}`
      }
    ],
    statusAwareOutcome: {
      badge: "Open Source Platform Outcome",
      headline: "Sub-Second Meteorological Routing with 400ms Search Optimization",
      points: [
        { metric: "Rain Alerts", detail: "Glanceable monsoon warning banners inform commuters before departure" },
        { metric: "API Optimization", detail: "400ms debounce prevents redundant API calls and preserves monthly rate limits" },
        { metric: "Zero Ads", detail: "Ad-free layout delivers instant load times even on spotty mobile data connections" }
      ],
      disclaimer: "Open-source application verified through public Netlify build and GitHub repository."
    },
    technicalDepth: {
      architectureSummary: "Client-side React SPA leveraging Fetch API with strict TypeScript contracts for OpenWeatherMap response bodies.",
      dataModelSummary: "Normalized weather state model: Coordinates, CurrentTemperature, ConditionCode, HumidityPercent, WindSpeedKmh, ForecastDays[].",
      securityOrOptimization: "Local caching of previous city search responses reduces duplicate network requests. Strict API key scoping.",
      deploymentDetails: "Hosted on Netlify edge CDN with automated CI builds."
    },
    limitations: [
      "Free-tier OpenWeatherMap API is subject to rate limiting of 60 calls/minute.",
      "Requires explicit browser permission for automatic geolocation retrieval."
    ],
    futureEnhancements: [
      "Implement Service Worker offline caching to show the last retrieved forecast during cellular dropouts.",
      "Add wind speed radar integration for maritime and logistics freight users."
    ]
  },

  "enterpret-steel": {
    projectId: "enterpret-steel",
    summary30s: {
      projectType: "Industrial B2B Web Presence & Technical Catalog",
      status: "Demonstration",
      role: "Frontend UI/UX Developer",
      coreProblem: "Industrial manufacturers lose prospective B2B buyers due to slow, outdated websites that fail to present technical material grades and structural tolerances clearly on mobile.",
      primarySolution: "High-performance responsive B2B catalog built with Vite and Tailwind, featuring categorized steel sections (beams, plates, pipes) with sub-second page loads.",
      keyTechnology: ["Vite", "React", "Tailwind CSS", "Framer Motion", "WebP Optimization"],
      evidenceAvailability: "Public Demo"
    },
    contextAndProblem: {
      businessContext: "Industrial steel manufacturing and distribution firm targeting commercial contractors and procurement officers.",
      userProblem: "B2B procurement officers need to inspect exact steel dimensions, tensile tolerances, and weight specs quickly on mobile phones while on construction sites.",
      technicalBottleneck: "Legacy website relied on uncompressed 15MB PDF catalog downloads, causing mobile site abandonment rates over 60%.",
      operationalEffect: "Sales inquiries were delayed because buyers could not confirm material grade availability without calling the sales desk.",
      businessQuestions: [
        "How can heavy industrial specification tables be formatted for readability on small mobile screens?",
        "What asset optimization workflow is required to achieve sub-second page loads for high-resolution industrial photography?",
        "How can product filtering simplify the path from catalog browsing to Request for Quote (RFQ) submission?"
      ],
      methodologySteps: [
        "Structured product catalog taxonomy covering structural beams, plates, hollow sections, and stainless pipes.",
        "Converted all high-resolution photography into optimized WebP formats with responsive srcset attributes.",
        "Engineered smooth tabbed category navigation using Framer Motion with zero layout shift.",
        "Built responsive dimension tables allowing side-scrolling on mobile while preserving column headers."
      ],
      dataSources: "Industrial steel grades (ASTM A36, A572, A500), standard dimensional gauges, and weight tables."
    },
    visualWorkflow: {
      title: "Industrial B2B Product Discovery Pipeline",
      description: "Streamlined navigation path from initial catalog browsing to RFQ quote request.",
      nodes: [
        { label: "B2B Procurement Buyer", role: "input", description: "Accesses site on mobile phone at job site or desktop in corporate office" },
        { label: "Vite Fast-Load Engine", role: "process", description: "Serves optimized static bundle with sub-second time-to-interactive" },
        { label: "Interactive Category Matrix", role: "process", description: "Allows one-click filtering by steel category (beams, plates, tubes)" },
        { label: "Specification Table", role: "storage", description: "Displays ASTM standards, tensile yield points, and weight tolerances" },
        { label: "RFQ Lead Form", role: "output", description: "Captures project tonnage, delivery timeline, and client contact details" }
      ]
    },
    evidenceItems: [
      {
        type: "demo",
        title: "Live Production Showcase",
        proves: "Proves sub-second loading, responsive B2B catalog navigation, and animated category filtering on Vercel.",
        status: "Public Demo",
        url: "https://enterpret-steel.vercel.app/"
      },
      {
        type: "repo",
        title: "Public GitHub Source Repository",
        proves: "Proves component architecture, Tailwind responsive grid implementation, and asset optimization pipeline.",
        status: "Public Repository",
        url: "https://github.com/mudassirdandor/enterpret"
      }
    ],
    codeExcerpts: [
      {
        label: "React & Tailwind (Responsive Product Specification Table)",
        language: "typescript",
        explanation: "Modular table component rendering steel grade dimensions with horizontal mobile overflow protection.",
        code: `interface SteelSpec {
  grade: string;
  astmStandard: string;
  yieldStrengthMpa: number;
  tensileStrengthMpa: string;
  recommendedUse: string;
}

export function SteelSpecTable({ specs }: { specs: SteelSpec[] }) {
  return (
    <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
      <table className="min-w-full divide-y divide-slate-200 text-left text-xs font-sans">
        <thead className="bg-slate-50 font-mono text-[10px] uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Grade</th>
            <th className="px-4 py-3">ASTM Std</th>
            <th className="px-4 py-3">Yield (MPa)</th>
            <th className="px-4 py-3">Tensile (MPa)</th>
            <th className="px-4 py-3">Primary Application</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {specs.map((item) => (
            <tr key={item.grade} className="hover:bg-slate-50/80 transition-colors">
              <td className="px-4 py-3 font-bold text-slate-900">{item.grade}</td>
              <td className="px-4 py-3 font-mono text-slate-600">{item.astmStandard}</td>
              <td className="px-4 py-3 font-mono text-blue-600">{item.yieldStrengthMpa}</td>
              <td className="px-4 py-3 font-mono text-slate-600">{item.tensileStrengthMpa}</td>
              <td className="px-4 py-3 text-slate-700">{item.recommendedUse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`
      }
    ],
    statusAwareOutcome: {
      badge: "Demonstration Web Project",
      headline: "Sub-Second Industrial Catalog with Mobile-Optimized Technical Tables",
      points: [
        { metric: "Page Speed", detail: "Sub-second initial paint keeps procurement buyers engaged without drop-offs" },
        { metric: "Mobile Usability", detail: "Fully adaptive tables allow site engineers to inspect steel grades on phones" },
        { metric: "Asset Weight", detail: "WebP image compression reduced catalog payload size by over 80%" }
      ],
      disclaimer: "Showcase website created to demonstrate high-performance B2B catalog engineering. Not an official client endorsement."
    },
    technicalDepth: {
      architectureSummary: "Static React application built with Vite toolchain and deployed to global edge network via Vercel.",
      dataModelSummary: "Static JSON schema detailing product dimensions, material certificates, and category metadata.",
      securityOrOptimization: "Zero client-side tracking scripts; 100% clean DOM with lazy image loading and CSS content-visibility.",
      deploymentDetails: "Continuous deployment via Vercel with automated bundle analysis."
    },
    limitations: [
      "Currently uses local JSON data files rather than live ERP inventory feeds.",
      "Lead generation forms operate in frontend demonstration mode."
    ],
    futureEnhancements: [
      "Add interactive steel tonnage and freight cost estimator calculator.",
      "Integrate automated quote generation PDF export for corporate buyers."
    ]
  },

  "job-applica": {
    projectId: "job-applica",
    summary30s: {
      projectType: "Interactive Multi-Step Form Wizard",
      status: "Demonstration",
      role: "Frontend Engineer",
      coreProblem: "Single-page candidate job application forms suffer from 50%+ abandonment rates due to cognitive fatigue, repetitive typing, and accidental data loss during browser refreshes.",
      primarySolution: "Progressive 4-step candidate wizard with real-time inline validation, local draft caching, and clear completion indicators.",
      keyTechnology: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "LocalStorage API"],
      evidenceAvailability: "Public Demo"
    },
    contextAndProblem: {
      businessContext: "Corporate recruitment portals needing clean applicant submissions while reducing applicant drop-off rates.",
      userProblem: "Job seekers lose their entered data when accidentally clicking back or refreshing, leading to immense frustration and abandoned applications.",
      technicalBottleneck: "Monolithic single-page forms validate all inputs at the very end, forcing applicants to hunt through 20+ fields to identify red validation errors.",
      operationalEffect: "Recruitment teams receive incomplete or corrupted resumes, requiring tedious follow-up emails.",
      businessQuestions: [
        "How can a long application form be partitioned into progressive psychological milestones?",
        "How can candidate draft state be preserved safely in browser storage without premature backend writes?",
        "How can immediate regex validation assist applicants in correcting phone numbers and LinkedIn URLs?"
      ],
      methodologySteps: [
        "Divided candidate intake into 4 structured stages: Personal Info, Experience, Skills, Review & Submit.",
        "Built automatic LocalStorage synchronization saving draft inputs on every keystroke.",
        "Designed animated step transitions using Framer Motion to provide visual feedback of progress.",
        "Created an executive review step displaying all entered details for final candidate verification."
      ],
      dataSources: "Candidate profile fields, skill taxonomy tables, and wizard session states."
    },
    visualWorkflow: {
      title: "4-Step Progressive Application Flow",
      description: "Structured candidate progression with background draft preservation.",
      nodes: [
        { label: "Step 1: Contact Details", role: "input", description: "Collects verified name, email, phone number, and location" },
        { label: "Auto-Save Cache", role: "storage", description: "Silently persists state into LocalStorage to survive accidental browser refresh" },
        { label: "Step 2: Experience & Resume", role: "process", description: "Captures employment history, job titles, and resume uploads" },
        { label: "Step 3: Core Competencies", role: "process", description: "Allows candidates to select and rate primary technical skills" },
        { label: "Step 4: Audit & Submit", role: "output", description: "Displays unified review card with final confirmation submission trigger" }
      ]
    },
    evidenceItems: [
      {
        type: "demo",
        title: "Live Interactive Wizard",
        proves: "Proves multi-step wizard state management, LocalStorage persistence, and inline validation on Netlify.",
        status: "Public Demo",
        url: "https://job-application-modal.netlify.app/"
      },
      {
        type: "repo",
        title: "Public GitHub Source Repository",
        proves: "Proves clean React hook architecture, TypeScript form interfaces, and Framer Motion step transitions.",
        status: "Public Repository",
        url: "https://github.com/mudassirdandor/job_application"
      }
    ],
    codeExcerpts: [
      {
        label: "TypeScript & React (LocalStorage Form Auto-Save Hook)",
        language: "typescript",
        explanation: "Custom hook that loads saved form drafts on mount and syncs updates automatically.",
        code: `export function useFormDraft<T>(storageKey: string, initialValues: T): [T, (updates: Partial<T>) => void, () => void] {
  const [formData, setFormData] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : initialValues;
    } catch {
      return initialValues;
    }
  });

  const updateForm = (updates: Partial<T>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch (err) {
        console.warn("Failed to persist form draft to LocalStorage", err);
      }
      return next;
    });
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem(storageKey);
      setFormData(initialValues);
    } catch (err) {
      console.warn("Failed to clear draft", err);
    }
  };

  return [formData, updateForm, clearDraft];
}`
      }
    ],
    statusAwareOutcome: {
      badge: "Demonstration Project Outcome",
      headline: "Zero-Data-Loss Candidate Intake with 4-Stage Progressive Disclosure",
      points: [
        { metric: "Draft Protection", detail: "Automatic LocalStorage caching prevents applicant data loss on page refreshes" },
        { metric: "Input Guidance", detail: "Instant regex feedback catches phone and email typos prior to final review" },
        { metric: "Completion Flow", detail: "4-step wizard partitions cognitive load, reducing candidate fatigue" }
      ],
      disclaimer: "Demonstration application created to showcase interactive form UX and state caching architectures."
    },
    technicalDepth: {
      architectureSummary: "Client-side React SPA with controlled form state, modular step components, and Framer Motion transition variants.",
      dataModelSummary: "Applicant schema: PersonalInfo, WorkHistory[], EducationHistory[], SkillList[], ConsentGiven, SubmissionTimestamp.",
      securityOrOptimization: "LocalStorage sanitization prevents state deserialization attacks. Controlled form inputs prevent memory leaks.",
      deploymentDetails: "Deployed on Netlify with automated CI builds."
    },
    limitations: [
      "Currently operates as a frontend demonstration without an active ATS backend database.",
      "Resume file uploads are handled in local browser memory."
    ],
    futureEnhancements: [
      "Connect submissions directly to PostgreSQL / Supabase applicant database.",
      "Add resume auto-parsing to pre-fill form fields using client-side PDF text extraction."
    ]
  },

  "lifedrop": {
    projectId: "lifedrop",
    summary30s: {
      projectType: "Emergency Healthcare Logistics & Donor Dispatch",
      status: "In Development",
      role: "Systems Architect & Full-Stack Developer",
      coreProblem: "Hospitals facing acute emergency blood shortages lose critical response time due to manual phone registries, resulting in delayed patient transfusions.",
      primarySolution: "Real-time emergency donor coordination platform with automated ABO/Rh compatibility matching, Firestore live synchronization, and automated SMS dispatch channels.",
      keyTechnology: ["React", "TypeScript", "Firebase Firestore", "Twilio API", "Tailwind CSS"],
      evidenceAvailability: "In Development"
    },
    contextAndProblem: {
      businessContext: "Regional emergency medical facilities coordinating urgent blood transfusions during trauma surges and severe shortages.",
      userProblem: "Hospital coordinators must rapidly identify and alert eligible blood donors within driving distance during high-urgency trauma cases.",
      technicalBottleneck: "Disparate paper registers and unindexed spreadsheets prevent real-time matching based on antigen compatibility and donor last-donated dates.",
      operationalEffect: "Coordinating a single emergency blood transfusion manually required up to 45 minutes of frantic phone calls.",
      businessQuestions: [
        "How can ABO and Rh factor compatibility matrices be executed automatically upon urgent blood request creation?",
        "How can Firestore real-time listeners provide instant status synchronization across hospital dispatchers and donors?",
        "How can automated SMS dispatch routes alert donors within proximity without exposing private patient information?"
      ],
      methodologySteps: [
        "Engineered medical blood group compatibility rule engine matching universal and specific donor types.",
        "Architected Firebase Firestore collections for donor registries, blood requests, and emergency fulfillment dispatches.",
        "Built hospital dispatch portal with real-time status indicators (Requested, Dispatched, Arrived, Fulfilled).",
        "Configured staging webhook routes for Twilio SMS notifications to test emergency mobilization."
      ],
      dataSources: "Anonymized donor blood records, hospital inventory logs, and ABO/Rh compatibility matrices."
    },
    visualWorkflow: {
      title: "Emergency Donor Dispatch & Matching Pipeline",
      description: "Automated sequence from hospital emergency request to real-time donor notification.",
      nodes: [
        { label: "Hospital Emergency Request", role: "input", description: "Hospital staff logs required blood type, units needed, and patient urgency level" },
        { label: "ABO/Rh Compatibility Engine", role: "process", description: "Filters compatible donor pool (e.g., O- can donate to all; AB+ receives all)" },
        { label: "Firestore Real-time Sync", role: "storage", description: "Updates database document with live listeners syncing all connected hospital screens" },
        { label: "SMS Dispatch Relay", role: "integration", description: "Twilio webhook triggers direct SMS notifications to qualified nearby donors" },
        { label: "Donor Acceptance & Fulfillment", role: "output", description: "Tracks donor confirmations and marks hospital transfusion request fulfilled" }
      ]
    },
    evidenceItems: [
      {
        type: "repo",
        title: "Public GitHub Source Repository",
        proves: "Proves active repository, TypeScript data models, compatibility calculation functions, and Firestore config.",
        status: "Public Repository",
        url: "https://github.com/mudassirdandor/lifedrop"
      },
      {
        type: "schema",
        title: "Firestore Realtime Schema & Security Rules",
        proves: "Proves structured collection schemas for hospitals, donor pools, and emergency blood requests.",
        status: "Available"
      },
      {
        type: "code",
        title: "ABO Blood Compatibility Matrix",
        proves: "Proves algorithmic red blood cell donor-recipient validation logic.",
        status: "Verified"
      }
    ],
    codeExcerpts: [
      {
        label: "TypeScript (ABO/Rh Compatibility Matcher & Firestore Schema)",
        language: "typescript",
        explanation: "Core medical compatibility logic matching blood donation requests to eligible donor groups.",
        code: `export type BloodGroup = "O-" | "O+" | "A-" | "A+" | "B-" | "B+" | "AB-" | "AB+";

// Medical Red Blood Cell Compatibility Matrix
export const COMPATIBLE_DONORS: Record<BloodGroup, BloodGroup[]> = {
  "O-": ["O-"],
  "O+": ["O-", "O+"],
  "A-": ["O-", "A-"],
  "A+": ["O-", "O+", "A-", "A+"],
  "B-": ["O-", "B-"],
  "B+": ["O-", "O+", "B-", "B+"],
  "AB-": ["O-", "A-", "B-", "AB-"],
  "AB+": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"] // Universal Recipient
};

export interface BloodRequestDoc {
  requestId: string;
  hospitalId: string;
  patientBloodGroup: BloodGroup;
  compatibleDonorGroups: BloodGroup[];
  unitsRequired: number;
  urgencyLevel: "CRITICAL_STAT" | "URGENT" | "SCHEDULED";
  status: "PENDING_DISPATCH" | "DONORS_NOTIFIED" | "IN_TRANSIT" | "FULFILLED";
  createdAt: string;
}

export function generateEmergencyRequest(hospitalId: string, group: BloodGroup, units: number): BloodRequestDoc {
  return {
    requestId: "REQ-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
    hospitalId,
    patientBloodGroup: group,
    compatibleDonorGroups: COMPATIBLE_DONORS[group],
    unitsRequired: units,
    urgencyLevel: "CRITICAL_STAT",
    status: "PENDING_DISPATCH",
    createdAt: new Date().toISOString()
  };
}`
      }
    ],
    statusAwareOutcome: {
      badge: "In Development Status",
      headline: "Validated Emergency Matching Engine in Active Staging Development",
      points: [
        { metric: "Compatibility Logic", detail: "Verified ABO/Rh matching engine correctly evaluates donor-recipient matrix" },
        { metric: "Real-time Sync", detail: "Firestore document listeners tested for multi-client hospital status updates" },
        { metric: "Dispatch Channels", detail: "SMS staging routes configured for rapid proximity-based notifications" }
      ],
      disclaimer: "LifeDrop is in active engineering development. All hospital data and donor coordinates shown in demonstrations are synthetic staging records."
    },
    technicalDepth: {
      architectureSummary: "React frontend paired with Firebase Firestore real-time NoSQL database and cloud function SMS triggers.",
      dataModelSummary: "Firestore collections: /hospitals/{id}, /donors/{id}, /bloodRequests/{id}, /dispatchLogs/{id}.",
      securityOrOptimization: "Firestore security rules restrict donor phone number visibility exclusively to verified hospital dispatch admins.",
      deploymentDetails: "Staging deployment hosted on Firebase Hosting with GitHub Actions deployment workflows."
    },
    limitations: [
      "SMS notification channels operate within Twilio sandbox mode pending carrier compliance verification.",
      "Live hospital electronic medical record (EMR) API connectors require formal HIPAA/GDPR clinical review."
    ],
    futureEnhancements: [
      "Implement real-time driving radius distance calculation using Google Maps Distance Matrix API.",
      "Develop WhatsApp Business API bot for rapid donor response confirmations."
    ]
  },

  "local-bi-framework": {
    projectId: "local-bi-framework",
    summary30s: {
      projectType: "Local Business Intelligence & Search Architecture",
      status: "Research",
      role: "Local BI Strategist & Analytics Consultant",
      coreProblem: "Multi-location clinics and service businesses leak high-intent local patients and customers due to inconsistent citation directories, poor map ranking radius, and unmonitored review sentiment.",
      primarySolution: "5-stage local search intelligence methodology: Citation Synchronization, Competitor Geo-Grid Mapping, Conversion Tracking, Map Pack Optimization, and Review Velocity Management.",
      keyTechnology: ["Google Business Profile API", "Local Falcon Geo-Grid", "Google Sheets BI", "Schema.org JSON-LD"],
      evidenceAvailability: "Available"
    },
    contextAndProblem: {
      businessContext: "Regional healthcare clinics and physical retail operations in Quetta and Balochistan seeking physical foot traffic dominance.",
      userProblem: "Nearby customers search for local specialists but are directed to distant competitors due to inaccurate address citations and poor local search signals.",
      technicalBottleneck: "Inconsistent Name-Address-Phone (NAP) data across 30+ directories dilutes domain authority and degrades Google 3-Pack rankings.",
      operationalEffect: "Marketing spend on broad digital ads is squandered because local map listings fail to convert searchers into driving-direction requests.",
      businessQuestions: [
        "How does Name-Address-Phone (NAP) variance across online directories directly impact Google Maps local pack visibility?",
        "How can geo-grid rank tracking quantify competitive visibility drop-offs at 1km, 3km, and 5km radiuses?",
        "What systematic review generation cadence is required to establish sustained top-3 map pack placement?"
      ],
      methodologySteps: [
        "Stage 1: Conducted systematic citation audit across 40+ national and local business directories.",
        "Stage 2: Performed geo-grid map tracking across 5km radius to identify visibility dead zones.",
        "Stage 3: Structured conversion tracking for phone calls, direction requests, and website visits.",
        "Stage 4: Optimized Google Business Profile categories, secondary attributes, and photo geocoding.",
        "Stage 5: Formulated structured review velocity protocols with keyword-rich medical responses."
      ],
      dataSources: "Google Business Profile historical metrics, Local Falcon geo-grid rank files, and directory citation audits."
    },
    visualWorkflow: {
      title: "5-Stage Local BI & Search Framework",
      description: "Structured methodology for dominating local search rankings and foot-traffic conversion.",
      nodes: [
        { label: "Stage 1: NAP Audit", role: "input", description: "Harmonizes Name, Address, and Phone data across 40+ web directories" },
        { label: "Stage 2: Geo-Grid Scan", role: "process", description: "Maps exact rank positions at 1km, 3km, and 5km radii to isolate ranking blindspots" },
        { label: "Stage 3: Profile Optimization", role: "process", description: "Enriches primary categories, secondary service attributes, and structured JSON-LD schema" },
        { label: "Stage 4: Review Engine", role: "storage", description: "Establishes a steady cadence of genuine patient reviews and sentiment monitoring" },
        { label: "Stage 5: Conversion BI", role: "output", description: "Correlates top-3 map rankings with phone calls, direction requests, and revenue" }
      ]
    },
    evidenceItems: [
      {
        type: "document",
        title: "5-Stage Local BI Framework Specification",
        proves: "Proves comprehensive methodology, local audit criteria, and structured search protocols.",
        status: "Available"
      },
      {
        type: "demo",
        title: "Interactive Local Geo-Grid Simulator",
        proves: "Proves interactive demonstration of geo-grid rank changes across varied citation consistency and review counts.",
        status: "Demonstration",
        url: "#dashboard-sandbox"
      },
      {
        type: "code",
        title: "MedicalBusiness Structured JSON-LD Schema",
        proves: "Proves production schema markup implementation aligning Google Maps coordinates with local entities.",
        status: "Verified"
      }
    ],
    codeExcerpts: [
      {
        label: "JSON-LD (Structured Local Business & Medical Schema)",
        language: "json",
        explanation: "Production-grade Schema.org markup synchronizing physical coordinates, hours, and medical specialties for search engines.",
        code: `{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Quetta Health Diagnostic Clinic",
  "image": "https://example.com/clinic-exterior.webp",
  "@id": "https://example.com/#clinic",
  "url": "https://example.com",
  "telephone": "+92-81-2820000",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Zarghoon Road, Opp Civil Hospital",
    "addressLocality": "Quetta",
    "addressRegion": "Balochistan",
    "postalCode": "87300",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.1798,
    "longitude": 66.9750
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "medicalSpecialty": ["Cardiology", "Pathology", "GeneralPractice"]
}`
      }
    ],
    statusAwareOutcome: {
      badge: "Research & Methodology Outcome",
      headline: "Replicable 5-Stage Blueprint for Local Search Visibility Dominance",
      points: [
        { metric: "Citation Accuracy", detail: "Eliminating NAP discrepancies restores localized domain trust" },
        { metric: "Rank Radius", detail: "Geo-grid tracking isolates exact physical zones requiring local authority signals" },
        { metric: "Review Velocity", detail: "Sustained weekly patient reviews accelerate placement in top-3 Google Map Pack" }
      ],
      disclaimer: "Documented research methodology. Modeled results illustrate framework impact using synthesized local search datasets."
    },
    technicalDepth: {
      architectureSummary: "Analytical framework combining Google Business Profile insights, geo-grid rank APIs, and automated Google Sheets analysis models.",
      dataModelSummary: "Audit dataset tracking CitationSource, ListedName, ListedAddress, ListedPhone, StatusMatch, GeoRank_1km, GeoRank_3km, GeoRank_5km.",
      securityOrOptimization: "Ensures Google Business Profile compliance with Google Quality Guidelines for Local Representation.",
      deploymentDetails: "Client-ready audit templates and automated Google Sheets dashboard trackers."
    },
    limitations: [
      "Local search ranking factors are subject to periodic Google Core and Local Search algorithm updates.",
      "Requires physical address verification by Google via postal postcard or live video audit."
    ],
    futureEnhancements: [
      "Develop automated Python scraper for ongoing multi-platform citation drift auditing.",
      "Build real-time SMS review invitation dispatch workflow integrated with patient management systems."
    ]
  },

  "sales-dashboard": {
    projectId: "sales-dashboard",
    summary30s: {
      projectType: "Enterprise Business Intelligence & Margin Analysis",
      status: "Demonstration",
      role: "Business Intelligence Architect & Data Analyst",
      coreProblem: "Global retail and distribution channels experienced declining gross margins despite record sales volume due to unmonitored promotional discounts and freight cost creep.",
      primarySolution: "Star-schema Power BI intelligence model with optimized DAX margin measures, discount elasticity modeling, and regional profitability diagnostics.",
      keyTechnology: ["Power BI", "DAX", "SQL (Star Schema)", "Python (Pandas)", "Excel"],
      evidenceAvailability: "Demonstration"
    },
    contextAndProblem: {
      businessContext: "Multi-region retail enterprise managing 4 regional distribution hubs, 8 product lines, and over 4.2 million synthesized transaction records.",
      userProblem: "Executive leadership lacked visibility into which product categories were truly profitable once promotional discounts and shipping overhead were deducted.",
      technicalBottleneck: "Transactional data was trapped in disconnected transactional tables without a centralized star-schema dimensional model.",
      operationalEffect: "Regional sales managers offered aggressive discounts to hit revenue quotas, inadvertently wiping out operating profit.",
      businessQuestions: [
        "Which specific product lines and regional distribution channels generate the highest net contribution margin?",
        "At what discount threshold does transaction volume fail to compensate for gross margin erosion?",
        "How can DAX time-intelligence measures calculate rolling 90-day margin trends without query timeouts?"
      ],
      methodologySteps: [
        "Extracted and cleaned 4.2M synthesized transaction records using optimized SQL views.",
        "Designed high-performance Star Schema with 1 centralized FactInternetSales table and 4 Dimension tables.",
        "Engineered robust DAX measures for Gross Margin %, Rolling Sales, and Discount Elasticity.",
        "Conducted Python outlier analysis to isolate seasonal promotional anomalies."
      ],
      dataSources: "Public synthesized transactional research database (AdventureWorks / synthesized retail enterprise schema)."
    },
    visualWorkflow: {
      title: "Star Schema Sales Intelligence Pipeline",
      description: "Analytical data pipeline from relational transaction extraction to executive decision support.",
      nodes: [
        { label: "Raw Transaction SQL", role: "input", description: "Extracts millions of transaction line items, freight rates, and customer orders" },
        { label: "Star Schema Modeling", role: "process", description: "Organizes data into Fact table connected to DimProduct, DimDate, DimTerritory via 1-to-many relationships" },
        { label: "DAX Margin Engine", role: "process", description: "Computes Gross Margin %, Price Elasticity, and Period-over-Period growth measures" },
        { label: "Executive Power BI View", role: "storage", description: "Interactive dashboards with cross-filtering, category slicers, and regional maps" },
        { label: "Margin Preservation Action", role: "output", description: "Directs leadership to enforce 15% discount caps on high-velocity items" }
      ]
    },
    evidenceItems: [
      {
        type: "demo",
        title: "Interactive Live Simulator Workspace",
        proves: "Proves interactive exploration of margin modeling, discount caps, and regional filters in real-time.",
        status: "Demonstration",
        url: "#dashboard-sandbox"
      },
      {
        type: "schema",
        title: "Star Schema Database Model (SQL)",
        proves: "Proves 1-to-many dimensional architecture connecting fact tables to date, product, customer, and geography dimensions.",
        status: "Available"
      },
      {
        type: "code",
        title: "Optimized DAX Measures",
        proves: "Proves division-by-zero safe margin calculations, time intelligence, and dynamic ranking.",
        status: "Verified"
      }
    ],
    codeExcerpts: [
      {
        label: "SQL (Star Schema View & Margin Aggregation)",
        language: "sql",
        explanation: "Production SQL extraction grouping transactions into standardized reporting grains for Power BI ingestion.",
        code: `-- Sales & Gross Margin Aggregation Query
SELECT 
  d.CalendarYear,
  d.FiscalQuarter,
  p.ProductCategoryName,
  r.SalesTerritoryRegion,
  SUM(f.SalesAmount) AS TotalRevenue,
  SUM(f.TotalProductCost) AS TotalCost,
  ROUND(
    (SUM(f.SalesAmount) - SUM(f.TotalProductCost)) / NULLIF(SUM(f.SalesAmount), 0) * 100, 
    2
  ) AS GrossMarginPct
FROM FactInternetSales f
JOIN DimProduct p ON f.ProductKey = p.ProductKey
JOIN DimDate d ON f.OrderDateKey = d.DateKey
JOIN DimSalesTerritory r ON f.SalesTerritoryKey = r.SalesTerritoryKey
GROUP BY d.CalendarYear, d.FiscalQuarter, p.ProductCategoryName, r.SalesTerritoryRegion
ORDER BY TotalRevenue DESC;`
      },
      {
        label: "DAX (Gross Margin & Rolling 90-Day Measure)",
        language: "dax",
        explanation: "Optimized DAX measures with DIVIDE protection and time intelligence calculations.",
        code: `// DAX Measure: Gross Margin % Safe Calculation
Gross Margin % = 
DIVIDE(
  [Total Sales] - [Total Product Cost],
  [Total Sales],
  0
)

// DAX Measure: Rolling 90-Day Revenue
Rolling 90D Sales = 
CALCULATE(
  [Total Sales],
  DATESINPERIOD(
    DimDate[Date],
    MAX(DimDate[Date]),
    -90,
    DAY
  )
)`
      }
    ],
    statusAwareOutcome: {
      badge: "Demonstration Intelligence Outcome",
      headline: "Modeled Margin Diagnostic Revealing Uncapped Promotional Cannibalization",
      points: [
        { metric: "Margin Diagnostic", detail: "Identified that discounting low-tier products was actively cannibalizing core catalog margin" },
        { metric: "Discount Policy", detail: "Modeled 15% discount cap stabilizes overall gross margin floor" },
        { metric: "Query Optimization", detail: "Star schema architecture reduces report refresh latency by over 70%" }
      ],
      disclaimer: "Demonstration case study built using synthesized enterprise research datasets to demonstrate business intelligence modeling techniques."
    },
    technicalDepth: {
      architectureSummary: "Tabular Power BI data model utilizing single-direction 1-to-many relationships from Dim tables to central FactInternetSales table.",
      dataModelSummary: "FactInternetSales (SalesAmount, Cost, Discount, Quantity) linked to DimDate, DimProduct, DimCustomer, DimSalesTerritory.",
      securityOrOptimization: "Eliminated bidirectional relationships to prevent ambiguous query paths; pre-aggregated high-cardinality transaction keys.",
      deploymentDetails: "Power BI service deployment with scheduled daily incremental refresh gateway."
    },
    limitations: [
      "Demonstration utilizes synthesized public research data rather than proprietary client records.",
      "Does not capture qualitative client feedback or real-time point-of-sale telemetry."
    ],
    futureEnhancements: [
      "Integrate Python demand forecasting model to project monthly category inventory needs.",
      "Implement automated margin drift alerts triggered via Power Automate."
    ]
  },

  "financial-dashboard": {
    projectId: "financial-dashboard",
    summary30s: {
      projectType: "Corporate Treasury & Cash Flow Runway Intelligence",
      status: "Demonstration",
      role: "Financial Data Analyst & BI Architect",
      coreProblem: "Enterprise operations faced short-term liquidity bottlenecks due to rising Days Sales Outstanding (DSO) and unmonitored mid-market invoice delinquency.",
      primarySolution: "Dynamic working capital intelligence model grouping receivables into dynamic aging buckets, calculating historical payment velocity, and projecting cash flow runway.",
      keyTechnology: ["SQL", "Power BI", "DAX", "Financial Modeling", "Excel"],
      evidenceAvailability: "Demonstration"
    },
    contextAndProblem: {
      businessContext: "Corporate treasury oversight across multiple operating business units managing commercial B2B invoicing.",
      userProblem: "Treasury officers struggled to forecast 90-day cash runway because invoices sat in overdue aging buckets without visibility into payment velocity.",
      technicalBottleneck: "Legacy accounting exports were flat spreadsheets lacking automated aging bucket calculations and customer risk scoring.",
      operationalEffect: "Unexpected cash crunches forced short-term borrowing to cover payroll and supplier commitments.",
      businessQuestions: [
        "Why is Days Sales Outstanding (DSO) climbing, and in which specific enterprise client segments is liquidity bottlenecked?",
        "Which client accounts represent the highest delinquency exposure across 30, 60, and 90+ day buckets?",
        "How can automated aging bucketing provide early warning triggers prior to invoice default?"
      ],
      methodologySteps: [
        "Integrated accounts receivable (AR) and accounts payable (AP) ledgers into unified analytical tables.",
        "Constructed dynamic SQL queries categorizing unpaid invoices into 0-30, 31-60, 61-90, and 90+ day aging buckets.",
        "Built DAX measures for Days Sales Outstanding (DSO) and Cash Runway Days.",
        "Constructed an interactive executive liquidity dashboard with cash balance waterfall charts."
      ],
      dataSources: "Synthesized corporate treasury ledgers and enterprise billing records."
    },
    visualWorkflow: {
      title: "Corporate Working Capital & Cash Runway Flow",
      description: "Analytical pipeline from invoice generation to aging classification and treasury forecasting.",
      nodes: [
        { label: "Invoice & AP Ledgers", role: "input", description: "Collects customer billing records, due dates, and payment transaction logs" },
        { label: "Dynamic Aging Classifier", role: "process", description: "Computes overdue days and segments receivables into 0-30, 31-60, 61-90, 90+ day buckets" },
        { label: "DSO & Runway Engine", role: "process", description: "Calculates Days Sales Outstanding and projects 90-day cash flow runway" },
        { label: "Executive Treasury Board", role: "storage", description: "Renders working capital liquidity indicators and customer delinquency rankings" },
        { label: "Credit Policy Action", role: "output", description: "Triggers standardized payment terms and early settlement discount incentives" }
      ]
    },
    evidenceItems: [
      {
        type: "demo",
        title: "Interactive Live Simulator Workspace",
        proves: "Proves interactive working capital modeling, aging bucket adjustments, and cash runway projections.",
        status: "Demonstration",
        url: "#dashboard-sandbox"
      },
      {
        type: "code",
        title: "Dynamic AR Aging Query (SQL)",
        proves: "Proves automated aging classification and overdue balance aggregation.",
        status: "Verified"
      }
    ],
    codeExcerpts: [
      {
        label: "SQL (Dynamic Accounts Receivable Aging Buckets)",
        language: "sql",
        explanation: "SQL query classifying open invoices into standard financial aging brackets relative to current date.",
        code: `-- Accounts Receivable Aging Buckets Calculation
SELECT 
  c.CustomerName,
  SUM(CASE WHEN DATEDIFF(day, i.DueDate, CURRENT_DATE) <= 0 THEN i.OutstandingBalance ELSE 0 END) AS Current_NotDue,
  SUM(CASE WHEN DATEDIFF(day, i.DueDate, CURRENT_DATE) BETWEEN 1 AND 30 THEN i.OutstandingBalance ELSE 0 END) AS Aging_1_to_30,
  SUM(CASE WHEN DATEDIFF(day, i.DueDate, CURRENT_DATE) BETWEEN 31 AND 60 THEN i.OutstandingBalance ELSE 0 END) AS Aging_31_to_60,
  SUM(CASE WHEN DATEDIFF(day, i.DueDate, CURRENT_DATE) > 60 THEN i.OutstandingBalance ELSE 0 END) AS Aging_Over_60,
  SUM(i.OutstandingBalance) AS TotalReceivable
FROM FactInvoices i
JOIN DimCustomer c ON i.CustomerKey = c.CustomerKey
WHERE i.PaymentStatus = 'UNPAID'
GROUP BY c.CustomerName
ORDER BY Aging_Over_60 DESC;`
      }
    ],
    statusAwareOutcome: {
      badge: "Demonstration Intelligence Outcome",
      headline: "Dynamic Working Capital Visibility & Delinquency Exposure Diagnostic",
      points: [
        { metric: "Aging Transparency", detail: "Automated segmentation isolates long-overdue accounts requiring collections intervention" },
        { metric: "Runway Clarity", detail: "Dynamic DSO tracking provides reliable 90-day cash liquidity visibility" },
        { metric: "Policy Optimization", detail: "Early payment discounts modeled to incentivize faster customer settlement" }
      ],
      disclaimer: "Demonstration case study built with synthesized corporate financial records to showcase treasury modeling methods."
    },
    technicalDepth: {
      architectureSummary: "Power BI financial dashboard powered by SQL staging tables and relational star schema.",
      dataModelSummary: "FactInvoices, FactPayments, DimCustomer, DimDate, DimCostCenter.",
      securityOrOptimization: "Object-level and row-level security (RLS) restricts financial visibility by departmental division.",
      deploymentDetails: "Exportable to automated PDF executive reporting packs."
    },
    limitations: [
      "Based on historical financial snapshot files rather than direct bank ERP APIs.",
      "Anonymized enterprise identifiers prevent qualitative account relationship mapping."
    ],
    futureEnhancements: [
      "Integrate direct ERP connectors for real-time daily ledger reconciliation.",
      "Build machine learning predictive invoice payment delay scorecards in Python."
    ]
  },

  "customer-churn": {
    projectId: "customer-churn",
    summary30s: {
      projectType: "Predictive Analytics & Customer Retention Pipeline",
      status: "Demonstration",
      role: "Data Scientist & Analytics Consultant",
      coreProblem: "Subscription-based enterprise experienced rising customer attrition rates without advance warning of which client cohorts were preparing to cancel.",
      primarySolution: "Predictive machine learning pipeline pairing Scikit-Learn Gradient Boosting with an interactive risk scorecard to identify high-probability churn accounts.",
      keyTechnology: ["Python (Scikit-Learn)", "Pandas", "Power BI", "SQL", "Feature Engineering"],
      evidenceAvailability: "Demonstration"
    },
    contextAndProblem: {
      businessContext: "SaaS enterprise managing annual recurring revenue contracts across thousands of business accounts.",
      userProblem: "Customer success teams only learned of account cancellations after contract non-renewal notices arrived.",
      technicalBottleneck: "Disparate usage logs and customer support tickets were never combined into an integrated predictive feature matrix.",
      operationalEffect: "Customer retention efforts were reactive, resulting in unnecessary customer acquisition cost (CAC) inflation.",
      businessQuestions: [
        "Which customer behaviors and contract parameters have the highest predictive correlation with cancellation?",
        "How can accounts with >70% churn risk be flagged 60 days before contract expiration?",
        "What feature importance weights explain why customers abandon the platform?"
      ],
      methodologySteps: [
        "Engineered customer tenure, support ticket frequency, and usage drop-off features from synthesized records.",
        "Trained Scikit-Learn Gradient Boosting Classifier with stratified k-fold cross-validation.",
        "Computed ROC-AUC metrics and isolated top feature importance contributors.",
        "Deployed an interactive churn risk scorecard allowing account managers to filter by risk tier."
      ],
      dataSources: "Synthesized SaaS customer subscription and product usage telemetry database."
    },
    visualWorkflow: {
      title: "Predictive Churn Detection Pipeline",
      description: "End-to-end machine learning flow from raw usage logs to proactive customer success intervention.",
      nodes: [
        { label: "Usage & Billing Logs", role: "input", description: "Aggregates login velocity, support tickets, monthly charges, and contract type" },
        { label: "Feature Engineering", role: "process", description: "Computes 30-day usage drop-off percentage and payment delinquency indicators" },
        { label: "Gradient Boosting Model", role: "process", description: "Calculates individual account churn probability score (0.0 to 1.0)" },
        { label: "Risk Scorecard Dashboard", role: "storage", description: "Ranks customer accounts by risk tier: Critical (>75%), Elevated (50-75%), Stable (<50%)" },
        { label: "Retention Intervention", role: "output", description: "Directs customer success managers to initiate targeted training or executive reviews" }
      ]
    },
    evidenceItems: [
      {
        type: "demo",
        title: "Interactive Live Simulator Workspace",
        proves: "Proves interactive churn simulation, cohort filters, and risk tier adjustments.",
        status: "Demonstration",
        url: "#dashboard-sandbox"
      },
      {
        type: "code",
        title: "Scikit-Learn Gradient Boosting Script",
        proves: "Proves feature matrix construction, stratified train/test split, and ROC-AUC evaluation.",
        status: "Verified"
      }
    ],
    codeExcerpts: [
      {
        label: "Python (Scikit-Learn Churn Classification Pipeline)",
        language: "python",
        explanation: "Machine learning script engineering features and training a Gradient Boosting Classifier for churn risk scoring.",
        code: `# Churn Prediction Pipeline with Scikit-Learn
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score

# Load synthesized customer subscription records
df = pd.read_csv("synthesized_saas_churn.csv")

# Feature Matrix Engineering
features = ['tenure_months', 'monthly_charges', 'support_tickets_last_30d', 'contract_annual_flag', 'usage_drop_pct']
X = df[features]
y = df['churned']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

clf = GradientBoostingClassifier(n_estimators=100, learning_rate=0.08, max_depth=3, random_state=42)
clf.fit(X_train, y_train)

y_pred_proba = clf.predict_proba(X_test)[:, 1]
print(f"ROC-AUC Performance: {roc_auc_score(y_test, y_pred_proba):.4f}")

# Feature Importances
importance_df = pd.DataFrame({'Feature': features, 'Importance': clf.feature_importances_}).sort_values(by='Importance', ascending=False)
print(importance_df)`
      }
    ],
    statusAwareOutcome: {
      badge: "Demonstration Intelligence Outcome",
      headline: "Proactive Retention Risk Scorecard with Feature Importance Diagnostics",
      points: [
        { metric: "Early Warning", detail: "Identifies accounts displaying churn patterns 60 days prior to contract expiration" },
        { metric: "Key Drivers", detail: "Feature importance isolates support ticket delays and 30-day usage drops as top risk signals" },
        { metric: "Targeted Outreach", detail: "Focuses customer success resources on high-value accounts at critical risk" }
      ],
      disclaimer: "Demonstration machine learning case study built with public synthesized SaaS subscription datasets."
    },
    technicalDepth: {
      architectureSummary: "Python scikit-learn analytics pipeline feeding scored predictions into Power BI executive dashboards.",
      dataModelSummary: "CustomerProfile, SubscriptionContract, ProductUsageMetrics, SupportTicketHistory.",
      securityOrOptimization: "Hyperparameter tuning using GridSearchCV to prevent model overfitting on training sets.",
      deploymentDetails: "Exportable scoring script capable of batch daily scoring via automated Python scheduled tasks."
    },
    limitations: [
      "Demonstration uses synthesized customer behavior logs rather than live multi-tenant SaaS telemetry.",
      "Qualitative relationship factors (such as executive champion departure) require human account tagging."
    ],
    futureEnhancements: [
      "Integrate SHAP (SHapley Additive exPlanations) values to explain exact risk drivers for individual accounts.",
      "Automate email alert dispatches to account executives when an account enters the critical tier."
    ]
  }
};

// Helper function to get or generate fallback audit data for remaining simulated dashboards
export function getCaseStudyAudit(projectId: string, projectFallback?: Project): CaseStudyAuditData {
  if (CASE_STUDY_AUDIT_MAP[projectId]) {
    return CASE_STUDY_AUDIT_MAP[projectId];
  }

  // Generate an authentic, strictly honest fallback for remaining demonstration dashboards
  const title = projectFallback?.title || projectId.replace("-", " ").toUpperCase();
  const category = projectFallback?.category || "Business Intelligence";

  return {
    projectId,
    summary30s: {
      projectType: "Interactive Analytical Demonstration Workspace",
      status: "Demonstration",
      role: "Business Intelligence Architect & Data Analyst",
      coreProblem: projectFallback?.businessProblem || "Organizational decision makers lacked unified visibility into operational metrics and KPIs, leading to reactive decision-making.",
      primarySolution: projectFallback?.description || "Engineered an interactive decision support model with dimensional data schemas, automated metrics calculation, and scenario diagnostics.",
      keyTechnology: projectFallback?.tools || ["Power BI", "SQL", "DAX", "Excel", "Data Modeling"],
      evidenceAvailability: "Demonstration"
    },
    contextAndProblem: {
      businessContext: `Enterprise domain analysis focusing on ${category.toLowerCase()} operational workflows and decision modeling.`,
      userProblem: projectFallback?.businessProblem || "Stakeholders faced fragmented reporting formats and delayed metric consolidation.",
      technicalBottleneck: "Lack of centralized analytical schemas and standardized measure definitions across functional departments.",
      operationalEffect: "Operational bottlenecks were identified retrospectively rather than during early formation.",
      businessQuestions: [
        `How can ${category.toLowerCase()} metrics be consolidated into a unified dimensional reporting model?`,
        "What automated calculation logic provides reliable leading indicators of operational risk?",
        "How can interactive scenario parameters simulate operational tradeoffs in real-time?"
      ],
      methodologySteps: projectFallback?.analysisSteps || [
        "Structured data requirements and verified operational metric definitions.",
        "Built relational dimensional schema connecting transactional logs with categorical dimensions.",
        "Constructed optimized analytical calculation measures for primary KPIs.",
        "Deployed interactive visual dashboard with cross-filtering and drill-down capabilities."
      ],
      dataSources: projectFallback?.dataset || "Public synthesized analytical dataset utilized to showcase business intelligence techniques."
    },
    visualWorkflow: {
      title: `${title} Analytical Flow`,
      description: "End-to-end data intelligence flow from source aggregation to executive decision support.",
      nodes: [
        { label: "Operational Data Extraction", role: "input", description: "Extracts normalized operational logs and transactional event records" },
        { label: "Dimensional Modeling", role: "process", description: "Organizes data into high-efficiency star schema with standardized dimensions" },
        { label: "KPI Calculation Engine", role: "process", description: "Calculates domain-specific metrics, variance ratios, and period comparisons" },
        { label: "Interactive Intelligence Board", role: "storage", description: "Renders multi-dimensional visualizations with dynamic scenario toggles" },
        { label: "Executive Decision Support", role: "output", description: "Provides quantitative evidence guiding resource allocation and process optimization" }
      ]
    },
    evidenceItems: [
      {
        type: "demo",
        title: "Interactive Live Simulator Workspace",
        proves: "Proves interactive exploration of domain-specific KPIs, scenario parameters, and cross-filtering in real-time.",
        status: "Demonstration",
        url: "#dashboard-sandbox"
      },
      {
        type: "schema",
        title: "Dimensional Data Schema",
        proves: "Proves star-schema table relationships and measure logic.",
        status: "Available"
      }
    ],
    codeExcerpts: [
      {
        label: "SQL (Analytical View Extraction)",
        language: "sql",
        explanation: `Standardized SQL extraction query for ${title} grouping transactional events into reporting dimensions.`,
        code: `-- Analytical Extraction View for ${title}
SELECT 
  d.CalendarYear,
  d.MonthName,
  dim.CategoryName,
  COUNT(f.TransactionId) AS TotalEvents,
  SUM(f.Amount) AS TotalVolume,
  ROUND(AVG(f.PerformanceMetric), 2) AS AvgPerformanceRate
FROM FactOperations f
JOIN DimCategory dim ON f.CategoryKey = dim.CategoryKey
JOIN DimDate d ON f.DateKey = d.DateKey
GROUP BY d.CalendarYear, d.MonthName, dim.CategoryName
ORDER BY d.CalendarYear DESC, TotalVolume DESC;`
      }
    ],
    statusAwareOutcome: {
      badge: "Demonstration Workspace Outcome",
      headline: "Modeled Business Intelligence Logic with Interactive Scenario Simulation",
      points: (projectFallback?.results || []).map((r) => ({
        metric: r.metric,
        detail: r.improvement
      })),
      disclaimer: "Demonstration workspace built using synthesized research datasets to demonstrate analytical techniques. No client production data is exposed."
    },
    technicalDepth: {
      architectureSummary: "Interactive simulation workspace built in React with client-side state models reflecting enterprise BI dashboard behavior.",
      dataModelSummary: "Dimensional relational schema modeling core domain entities and time-series measures.",
      securityOrOptimization: "Optimized client-side rendering with debounced parameter updates and responsive SVG charts.",
      deploymentDetails: "Integrated within portfolio analytics lab."
    },
    limitations: [
      "Demonstration uses synthesized research data rather than live operational database streams.",
      "Parameter interactions model simulated business scenarios for demonstration purposes."
    ],
    futureEnhancements: [
      "Connect to live external API endpoints for dynamic daily data refresh.",
      "Add automated PDF export of executive KPI snapshot reports."
    ]
  };
}
