import { Project } from "../types";

export const projects: Project[] = [
  // ----------------------------------------------------
  // REAL PROJECTS & CONSULTING CASE STUDIES (7 Items)
  // ----------------------------------------------------
  {
    id: "saylani-form",
    title: "Digital Student Registration & Automation Platform",
    category: "Data Collection Systems",
    isSimulated: false,
    isUnderDevelopment: false,
    status: "Production",
    repoStatus: "Source Available",
    shortDescription: "A streamlined student registration system featuring automated data entry, an FAQ helper, and instant digital ID card generation.",
    description: "A student registration platform built to handle large enrollments easily. It features simple forms that double-check answers as students type, a friendly chatbot to answer common course questions, and an automatic link to Google Sheets for easy record-keeping.",
    businessProblem: "The educational team was overwhelmed by manual data entry. Registrations came in through disconnected forms, leading to duplicate records, manual spreadsheet updates, and a multi-day delay in creating and distributing student ID cards.",
    dataset: "Saylani student registrations, course choices, localized center availability, and educational background records.",
    tools: ["React", "Tailwind CSS", "Dialogflow Chatbots", "Google Apps Script", "Google Sheets API", "Email Automation"],
    analysisSteps: [
      "Designed a mobile-friendly registration form that is easy to fill out on any phone or tablet.",
      "Added instant checks that guide students through course prerequisites as they fill out the form.",
      "Created an instant digital ID generator so students can download their cards immediately after signing up.",
      "Connected the form directly to a centralized Google Sheet, saving hours of manual data copying."
    ],
    businessInsights: [
      "Connecting forms directly to Google Sheets removed copy-paste errors and saved administrative work.",
      "The built-in assistant answered common scheduling and eligibility questions, reducing support emails.",
      "Providing instant digital cards removed printing and shipping delays, allowing courses to start sooner."
    ],
    recommendations: [
      "Set up automated file checking to verify prerequisite documents during upload.",
      "Set up automated text updates to notify students of course start dates.",
      "Add automatic duplicate detection to keep the registration spreadsheet clean."
    ],
    results: [
      { metric: "Data Intake", value: "Fully Automated", improvement: "Form submissions save directly to Google Sheets, eliminating manual data entry" },
      { metric: "Student Support", value: "Automated Help", improvement: "Answers common questions instantly without administrative overhead" },
      { metric: "ID Card Distribution", value: "Instant Download", improvement: "Students get digital cards immediately, saving staff printing time" }
    ],
    githubUrl: "https://github.com/mudassirdandor/saylani-form",
    liveUrl: "https://saylanireg.netlify.app/",
    dashboardType: "Saylani Form",
    metrics: {
      kpis: [
        { label: "Database Layer", value: "Google Sheets", trend: "Connected", isPositive: true },
        { label: "Serverless Relay", value: "Apps Script API", trend: "Active", isPositive: true },
        { label: "PDF Card Render Speed", value: "Instant", trend: "Client-Side", isPositive: true },
        { label: "Intelligent Assistant", value: "Dialogflow NLP", trend: "Enabled", isPositive: true }
      ],
      chartData: [
        { label: "Week 1", value: 12, secondaryValue: 8 },
        { label: "Week 2", value: 24, secondaryValue: 16 },
        { label: "Week 3", value: 48, secondaryValue: 31 },
        { label: "Week 4", value: 85, secondaryValue: 56 },
        { label: "Week 5", value: 120, secondaryValue: 84 }
      ]
    }
  },
  {
    id: "saylani-rotibank",
    title: "Digital Donation Collection Platform",
    category: "Google Workspace Automation",
    isSimulated: false,
    isUnderDevelopment: false,
    status: "Production",
    repoStatus: "Source Available",
    shortDescription: "A donation coordination system that connects local food donors with distribution centers using simple forms and Google Sheets tracking.",
    description: "A simple, mobile-friendly platform designed to connect food donors with local distribution centers. It includes a friendly form assistant to log donation details and connects directly to a live Google Sheet to help center managers plan distribution.",
    businessProblem: "A local food charity had no way of knowing how much food would be donated each day. This led to high food wastage when surplus arrived unannounced, and left volunteers exhausted from answering endless coordination calls.",
    dataset: "Donor coordinates, pledged food types, delivery/pickup schedules, and localized center capacity metrics.",
    tools: ["React", "Dialogflow Chatbots", "Google Apps Script", "Google Sheets API", "Tailwind CSS"],
    analysisSteps: [
      "Built a simple, mobile-first form so donors can easily log details on their phones.",
      "Created a friendly guide that asks donors for quantities and expiration dates step-by-step.",
      "Connected the form directly to a master Google Sheets spreadsheet using Google Apps Script.",
      "Created a clear overview page showing incoming donation counts and delivery volunteer lists."
    ],
    businessInsights: [
      "Automating donation logs freed up volunteers to focus on distribution rather than answering phones.",
      "Grouping donations by neighborhood helped coordinators route pickups efficiently, saving travel time.",
      "Live, clear summaries of incoming food allowed kitchen managers to plan daily meals accurately and reduce waste."
    ],
    recommendations: [
      "Set up automated alerts for nearby volunteers when urgent donations are logged.",
      "Set up simple confirmation text messages to thank donors and keep them updated.",
      "Use basic historical tracking to predict which days will see the highest donation volumes."
    ],
    results: [
      { metric: "Coordination", value: "Real-time Logs", improvement: "Replaced chaotic phone registries with structured entries" },
      { metric: "Logistics", value: "Location Matching", improvement: "Connected donors with nearby centers to keep food fresh" },
      { metric: "Ledger Tracking", value: "Live Google Sheet", improvement: "Helped kitchen managers plan meals accurately, reducing food waste" }
    ],
    githubUrl: "https://github.com/mudassirdandor/Saylani_rotibank",
    liveUrl: "https://saylani-rotibank-mu.vercel.app/",
    dashboardType: "Saylani Roti",
    metrics: {
      kpis: [
        { label: "API Integrations", value: "Dialogflow NLP", trend: "Connected", isPositive: true },
        { label: "Data Pipeline", value: "Google Apps Script", trend: "Active", isPositive: true },
        { label: "Interface Layout", value: "Tailwind CSS", trend: "Responsive", isPositive: true },
        { label: "Sync Latency", value: "Sheets Database", trend: "Real-time", isPositive: true }
      ],
      chartData: [
        { label: "Jan", value: 12, secondaryValue: 8 },
        { label: "Feb", value: 18, secondaryValue: 12 },
        { label: "Mar", value: 25, secondaryValue: 16 },
        { label: "Apr", value: 34, secondaryValue: 24 },
        { label: "May", value: 45, secondaryValue: 31 }
      ]
    }
  },
  {
    id: "weather-app",
    title: "Weather Intelligence Platform",
    category: "Interactive Applications",
    isSimulated: false,
    isUnderDevelopment: false,
    status: "Open Source",
    repoStatus: "Source Available",
    shortDescription: "Fast, ad-free weather application with precise local forecasts and rain alerts designed for easy route planning.",
    description: "A simple, ad-free weather app designed for quick local tracking. It retrieves precise forecasts using the OpenWeatherMap API and provides clear, immediate rain warnings to help local commuters and logistics teams plan their days.",
    businessProblem: "Popular weather websites are cluttered with ads, slow to load, and make it hard to spot sudden rainfall changes. This makes it difficult for local businesses and delivery teams to plan safe routes during heavy Karachi monsoon rains.",
    dataset: "OpenWeatherMap API real-time, historic, and 7-day predictive meteorological metrics.",
    tools: ["React", "TypeScript", "Tailwind CSS", "OpenWeatherMap API", "Geolocation API"],
    analysisSteps: [
      "Wired up the browser's location finder to show the user's local weather instantly.",
      "Designed the search bar to wait until the user finishes typing, saving API costs and database calls.",
      "Created a clean layout that changes its color to match the temperature and weather conditions.",
      "Built a simple, clear banner that highlights immediate rain forecasts and warnings."
    ],
    businessInsights: [
      "Clear, bright alert banners help users prepare for rain and make quick decisions about commuting.",
      "Limiting search updates to wait for typing pauses saved considerable web traffic and API usage fees.",
      "Showing precise neighborhood forecasts is more useful to commuters than broad, city-wide weather summaries."
    ],
    recommendations: [
      "Enable offline features to keep the last loaded forecast visible even when mobile internet drops.",
      "Add simple metrics like humidity levels and wind speed for local logistics planning.",
      "Set up gentle browser notifications for sudden weather changes."
    ],
    results: [
      { metric: "Rain Alerts", value: "Immediate Banners", improvement: "Highlights rain likelihood clearly on the main screen" },
      { metric: "API Performance", value: "400ms Debounce", improvement: "Saves API costs by preventing multiple rapid lookups" },
      { metric: "Location Tracking", value: "Built-in Location", improvement: "Shows exact local weather based on the user's current area" }
    ],
    githubUrl: "https://github.com/mudassirdandor/weatherapp",
    liveUrl: "https://barishalert.netlify.app/",
    dashboardType: "Weather",
    metrics: {
      kpis: [
        { label: "Weather Data Source", value: "OpenWeatherMap API", trend: "Live Connected", isPositive: true },
        { label: "Search Input Lag", value: "400ms Debounce", trend: "Client-Side", isPositive: true },
        { label: "State Animations", value: "Framer Motion", trend: "Enabled", isPositive: true },
        { label: "UI Breakpoints", value: "Fully Responsive", trend: "Mobile Optimized", isPositive: true }
      ],
      chartData: [
        { label: "Mon", value: 24, secondaryValue: 15 },
        { label: "Tue", value: 22, secondaryValue: 12 },
        { label: "Wed", value: 28, secondaryValue: 18 },
        { label: "Thu", value: 31, secondaryValue: 21 },
        { label: "Fri", value: 26, secondaryValue: 16 }
      ]
    }
  },
  {
    id: "enterpret-steel",
    title: "Enterprise Steel Website Recreation",
    category: "Web Development",
    isSimulated: false,
    isUnderDevelopment: false,
    status: "Demonstration",
    repoStatus: "Source Available",
    shortDescription: "A high-performance B2B showcase website built for an industrial manufacturing catalog, focusing on speed and responsive layouts.",
    description: "A clean, professional showcase website built to display industrial steel products. It features a responsive product catalog, structural specifications, and clear navigation designed to help B2B buyers find dimensions and load limits quickly.",
    businessProblem: "Many industrial manufacturing websites are outdated, hard to navigate on mobile, and slow to load. This makes it difficult for corporate buyers to find technical material specs, leading to lost B2B sales inquiries.",
    dataset: "Steel material grades, structural load tolerances, product dimensions, and shipping weights.",
    tools: ["Vite", "Tailwind CSS", "HTML5", "CSS3 Animations", "Framer Motion"],
    analysisSteps: [
      "Studied standard industrial catalogs to design a clear, readable product layout.",
      "Created a flexible, responsive catalog to display steel beams, plates, and pipes neatly.",
      "Optimized high-resolution images to load instantly without slowing down the website.",
      "Added simple, clean navigation effects that make the site feel smooth and professional."
    ],
    businessInsights: [
      "A clean, well-organized catalog helps buyers find the specifications they need without frustration.",
      "Optimizing image formats keeps loading times fast, keeping prospective clients on the page longer.",
      "Making products easy to filter simplifies the path from browsing to requesting a custom quote."
    ],
    recommendations: [
      "Add a simple calculator so buyers can estimate steel weights and shipping volumes directly.",
      "Add a direct inquiry form to capture and organize buyer leads automatically.",
      "Prepare the site for multi-language translations to support international clients."
    ],
    results: [
      { metric: "Responsive Layout", value: "Fully Adaptive", improvement: "Ensures the catalog reads beautifully on both mobile phones and large monitors" },
      { metric: "Page Loading", value: "Under 1 Second", improvement: "Fast asset loading keeps users engaged and prevents exit drop-offs" },
      { metric: "Navigation", value: "Simple Catalog", improvement: "Enables quick and easy filtering of heavy steel categories" }
    ],
    githubUrl: "https://github.com/mudassirdandor/enterpret",
    liveUrl: "https://enterpret-steel.vercel.app/",
    dashboardType: "Steel",
    metrics: {
      kpis: [
        { label: "Frontend Bundler", value: "Vite + React", trend: "Modern Toolchain", isPositive: true },
        { label: "CSS Layout", value: "Tailwind Flex & Grids", trend: "Fully Responsive", isPositive: true },
        { label: "Animation Library", value: "Framer Motion", trend: "Hardware Accelerated", isPositive: true },
        { label: "Image Formats", value: "Optimized WebP", trend: "Lazy Loading Enforced", isPositive: true }
      ],
      chartData: [
        { label: "Plates", value: 120, secondaryValue: 80 },
        { label: "Beams", value: 150, secondaryValue: 95 },
        { label: "Tubes", value: 90, secondaryValue: 60 },
        { label: "Coils", value: 110, secondaryValue: 70 }
      ]
    }
  },
  {
    id: "job-applica",
    title: "Interactive Job Application Workflow",
    category: "Interactive Applications",
    isSimulated: false,
    isUnderDevelopment: false,
    status: "Demonstration",
    repoStatus: "Source Available",
    shortDescription: "A friendly, 4-step job application form designed to reduce completion friction and save incomplete progress automatically.",
    description: "A progressive candidate form that breaks down a long, overwhelming application into four simple, clear steps. It checks for common input errors as applicants type and saves their progress in the background so they never have to start over.",
    businessProblem: "Long, messy, single-page application forms frustrate applicants, leading to high drop-out rates and causing businesses to lose out on top talent during the hiring process.",
    dataset: "Candidate personal profiles, resume files, skill ratings, and progressive wizard session states.",
    tools: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "State Caching"],
    analysisSteps: [
      "Broke down a complex, lengthy hiring sheet into four simple, manageable steps.",
      "Wired up instant, friendly inline checks to catch typo errors in phone numbers or links immediately.",
      "Created a simple, clear progress bar showing applicants exactly how close they are to finishing.",
      "Configured the form to save draft progress automatically, preventing data loss on accidental page reloads."
    ],
    businessInsights: [
      "Dividing questions into short, structured steps encourages applicants to finish the entire form.",
      "Catching typing mistakes early saves candidate frustration and ensures the HR team receives clean data.",
      "Automatically saving draft progress keeps candidate effort safe and ensures higher submission rates."
    ],
    recommendations: [
      "Add a simple file uploader where applicants can drag and drop their resumes easily.",
      "Allow users to pre-fill their contact details automatically with one click.",
      "Track which form pages take the longest time to help simplify questions further."
    ],
    results: [
      { metric: "Progress Saving", value: "Automatic Drafts", improvement: "Saves applicant answers locally, preventing data loss during refreshes" },
      { metric: "Validation", value: "Instant Feedback", improvement: "Catches typo mistakes on emails and phone numbers immediately" },
      { metric: "Form Design", value: "4-Step Flow", improvement: "Transforms long, tedious questions into short, friendly sections" }
    ],
    githubUrl: "https://github.com/mudassirdandor/multi-step-form",
    liveUrl: "https://jobapplica.netlify.app/",
    dashboardType: "JobApplica",
    metrics: {
      kpis: [
        { label: "Total Wizard Steps", value: "4 Modules", trend: "Structured Split", isPositive: true },
        { label: "Caching Method", value: "LocalStorage", trend: "Automatic Save", isPositive: true },
        { label: "Validation Latency", value: "Instant Inline", trend: "Instant Feedback", isPositive: true },
        { label: "Animation Engine", value: "Framer Motion", trend: "Sleek Transitions", isPositive: true }
      ],
      chartData: [
        { label: "Step 1", value: 100, secondaryValue: 100 },
        { label: "Step 2", value: 96, secondaryValue: 98 },
        { label: "Step 3", value: 92, secondaryValue: 95 },
        { label: "Step 4", value: 88, secondaryValue: 94 }
      ]
    }
  },
  {
    id: "lifedrop",
    title: "LifeDrop Emergency Blood Coordination Platform",
    category: "AI Automation",
    isSimulated: false,
    isUnderDevelopment: true,
    status: "In Development",
    repoStatus: "Private Repository",
    shortDescription: "An emergency blood donation and donor matching network designed to connect hospitals with local donors instantly.",
    description: "A real-time coordination platform that connects local blood donors with nearby hospitals during shortages. It includes local matching, fast text-alert notifications for urgent needs, and a clear dashboard for blood inventory tracking.",
    businessProblem: "During critical shortages, hospitals and blood banks struggle to find matched donors quickly. Relying on slow, manual phone lists leads to life-threatening delays and poor coordination during emergencies.",
    dataset: "Anonymized donor registries, blood group compatibility metrics, localized emergency request queues, and blood inventory files.",
    tools: ["React", "TypeScript", "Tailwind CSS", "Firebase Auth", "Firestore", "Cloud Functions", "Twilio API", "Gemini API"],
    analysisSteps: [
      "Built a simple, clear matching table to cross-reference donor and recipient blood types.",
      "Set up immediate, localized text-alert broadcasts to match available donors near hospitals.",
      "Created an easy-to-use hospital panel to log urgent shortages and track donation statuses.",
      "Built a simple inventory screen to help managers monitor current stock levels and plan collection drives."
    ],
    businessInsights: [
      "Sending direct text alerts based on local areas helps mobilize donors in minutes rather than hours.",
      "Keeping a clear, shared inventory list helps nearby blood banks share stock and reduce waste.",
      "Allowing donors to book and check their own times reduces the daily call volume for clinic staff."
    ],
    recommendations: [
      "Add a simple directions link to help donors navigate easily to the closest center.",
      "Set up simple confirmation text messages to make donor scheduling even easier.",
      "Use basic history data to identify which months typically see fewer active donations."
    ],
    results: [
      { metric: "Outreach Speed", value: "Under 5 Minutes", improvement: "Replaces slow, manual phone lists with instant, targeted text alerts" },
      { metric: "Inventory Care", value: "Visual Status", improvement: "Allows team leads to view current blood stocks at a single glance" },
      { metric: "Database", value: "Real-time Updates", improvement: "Ensures all nearby clinics and hospitals view identical, live data" }
    ],
    githubUrl: "https://github.com/mudassirdandor/lifedrop",
    liveUrl: "#",
    dashboardType: "LifeDrop",
    metrics: {
      kpis: [
        { label: "Development Status", value: "In Development", trend: "Under Construction", isPositive: true },
        { label: "Alert Engine", value: "Twilio SMS", trend: "Configured", isPositive: true },
        { label: "Planned Database", value: "Firebase Firestore", trend: "Schema Locked", isPositive: true },
        { label: "Predictive Module", value: "Gemini AI", trend: "Integration Ready", isPositive: true }
      ],
      chartData: [
        { label: "Week 1", value: 35, secondaryValue: 40 },
        { label: "Week 2", value: 48, secondaryValue: 55 },
        { label: "Week 3", value: 62, secondaryValue: 70 },
        { label: "Week 4", value: 78, secondaryValue: 85 },
        { label: "Week 5", value: 92, secondaryValue: 95 }
      ]
    }
  },
  {
    id: "local-bi-framework",
    title: "Quetta Local SEO Expert (Local Business Intelligence)",
    category: "Local Business Intelligence",
    isSimulated: false,
    isUnderDevelopment: false,
    status: "Research",
    repoStatus: "Private Repository",
    shortDescription: "A structured local marketing framework built to help physical-location businesses grow their local visibility and foot traffic.",
    description: "A practical marketing and analysis framework designed to help local businesses attract more customers. By fixing map addresses, optimizing local directories, and tracking search terms, it helps multi-site businesses increase physical foot traffic.",
    businessProblem: "Local businesses often lose nearby customers because of incorrect map listings, inconsistent phone numbers, or low visibility on search results. This prevents local searchers from finding their physical doors.",
    dataset: "Google Business Profile clickstreams, competitive geo-grid coordinates, local organic listings, and citation completeness indexes.",
    tools: ["Google Maps API", "GBP API Integration", "Geospatial Heatmapping", "Citation Auditing", "Local SEO Optimization"],
    analysisSteps: [
      "Created a five-stage process covering coordinates, local citations, client reviews, conversions, and metrics.",
      "Audited local directories to find and fix mismatched business names, addresses, and phone numbers.",
      "Designed neighborhood search tracking to see how often the business appears on local maps.",
      "Mapped customer postcodes to see typical travel patterns and drive-times to each location."
    ],
    businessInsights: [
      "Having inconsistent business listings across minor directories actively lowers your main Google Map rankings.",
      "Adding clear entrance photos and simple driving descriptions significantly boosts direction clicks.",
      "A steady stream of fresh, positive customer reviews is key to staying visible on local search maps."
    ],
    recommendations: [
      "Track keyword movements across different suburban blocks to find visibility gaps.",
      "Set up gentle, automated feedback requests for customers right after their visit.",
      "Double-check map pins to ensure they point exactly to physical entrance doors and parking areas."
    ],
    results: [
      { metric: "Maps Visibility", value: "Local Rank Tracking", improvement: "Identifies search presence across neighborhood blocks" },
      { metric: "Directory Cleanup", value: "Consistent Listings", improvement: "Corrects inaccurate phone numbers and physical addresses" },
      { metric: "Customer Insights", value: "Travel-Time Maps", improvement: "Maps customer travel distances to optimize local marketing placement" }
    ],
    githubUrl: "https://github.com/mudassirdandor",
    liveUrl: "#",
    dashboardType: "Quetta Local SEO Expert",
    metrics: {
      kpis: [
        { label: "Framework Scope", value: "Local SEO Audit", trend: "Analytical Focus", isPositive: true },
        { label: "Local Registry Focus", value: "Citation Alignment", trend: "Data Integrity", isPositive: true },
        { label: "Geospatial Grid", value: "1x1 km Coordinates", trend: "High Resolution", isPositive: true },
        { label: "Data Collection", value: "GBP API Metrics", trend: "Continuous Sourcing", isPositive: true }
      ],
      chartData: [
        { label: "Month 1", value: 65, secondaryValue: 70 },
        { label: "Month 2", value: 74, secondaryValue: 81 },
        { label: "Month 3", value: 85, secondaryValue: 88 },
        { label: "Month 4", value: 92, secondaryValue: 94 },
        { label: "Month 5", value: 99, secondaryValue: 99 }
      ]
    }
  },

  // ----------------------------------------------------
  // INTERACTIVE DASHBOARD SIMULATOR WORKSPACES (13 Items)
  // ----------------------------------------------------
  {
    id: "sales-dashboard",
    title: "Sales Performance & Growth Analytics Dashboard",
    category: "Business Intelligence",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "Interactive multi-region sales performance analytics with product category insights and revenue projections.",
    description: "A comprehensive executive-level Power BI dashboard designed to consolidate sales performance data across global business units, identifying high-margin products and cost-reduction opportunities.",
    businessProblem: "The executive team lacked visibility into real-time margin changes across 4 different regional hubs, leading to delayed decisions on pricing strategies and supply chains.",
    dataset: "Global transactional database detailing SKU-level sales, freight costs, discounts, and customer segments.",
    tools: ["Power BI", "DAX", "SQL Server", "Python", "Power Query"],
    analysisSteps: [
      "Extracted and compiled transactional records from distinct regional SQL databases.",
      "Engineered a dynamic star-schema data model optimizing calculation speeds.",
      "Calculated custom DAX metrics for rolling margin, Year-Over-Year growth, and volume variance.",
      "Conducted anomaly detection in Python to filter out statistical noise from supply chain disruptions."
    ],
    businessInsights: [
      "Discounts exceeding 15% on electronics did not drive proportional volume growth, eroding net margin.",
      "The European region sustained a high average order value but had the longest fulfillment cycles.",
      "B2B bulk orders experienced a steady growth, while retail channels plateaued."
    ],
    recommendations: [
      "Implement automated dynamic discount caps within the CRM to enforce a maximum of 12% discount.",
      "Reallocate logistics partners in Europe to streamline warehouse-to-carrier transfer.",
      "Refocus marketing budgets to focus heavily on the growing B2B channel."
    ],
    results: [
      { metric: "Dataset Scale Modeled", value: "Synthesized E-Commerce", improvement: "Simulated global e-commerce transactional dataset" },
      { metric: "Dynamic Computations", value: "DAX Star-Schema Model", improvement: "Computes rolling regional margins on-the-fly" },
      { metric: "Data Extraction Plan", value: "Optimized SQL Views", improvement: "Compiles transactional records from 4 regional hubs" }
    ],
    githubUrl: "https://github.com/mudassirdandor/sales-performance-analytics",
    liveUrl: "#",
    dashboardType: "Sales",
    metrics: {
      kpis: [
        { label: "Database Scale", value: "Synthesized Transactional", trend: "Multi-Table", isPositive: true },
        { label: "Data Model Style", value: "Star-Schema", trend: "5 Tables", isPositive: true },
        { label: "DAX Custom Measures", value: "Custom Calculations", trend: "High Density", isPositive: true },
        { label: "Analysis Focus", value: "Margin Diagnostics", trend: "Continuous", isPositive: true }
      ],
      chartData: [
        { label: "Q1 2025", value: 2.8, secondaryValue: 0.65 },
        { label: "Q2 2025", value: 3.1, secondaryValue: 0.72 },
        { label: "Q3 2025", value: 3.4, secondaryValue: 0.81 },
        { label: "Q4 2025", value: 4.1, secondaryValue: 0.98 },
        { label: "Q1 2026", value: 4.3, secondaryValue: 1.05 }
      ]
    }
  },
  {
    id: "financial-dashboard",
    title: "Corporate Financial Intelligence & Cash Flow Analytics",
    category: "Business Intelligence",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "Executive dashboard tracking balance sheet health, operating expenses, and predicting cash flow runway.",
    description: "An advanced dashboard designed for CFOs that monitors accounts receivable, accounts payable, operating expenses, and forecasts working capital runway.",
    businessProblem: "Uncoordinated cash collections led to seasonal liquidity constraints, requiring expensive short-term financing to cover operating expenses.",
    dataset: "Historical ledger data, AP/AR aging reports, and department-level operating expense logs.",
    tools: ["Power BI", "SQL (PostgreSQL)", "DAX", "Predictive Analytics"],
    analysisSteps: [
      "Created unified PostgreSQL views combining ledger items across legacy and new accounting systems.",
      "Built aging bucket calculations using DAX to track late invoices across aging cohorts.",
      "Implemented a statistical seasonal forecast model to project AP/AR cash flow dynamics.",
      "Formatted executive visualizations adhering to high-density financial layout standards."
    ],
    businessInsights: [
      "The Average Collection Period (DSO) had risen, tying up significant capital.",
      "Three major enterprise clients represented the vast majority of outstanding balances past due.",
      "Office rental and software SaaS overlapping licenses comprised unnecessary OPEX overhead."
    ],
    recommendations: [
      "Introduce early-payment net incentives to accelerate enterprise collections.",
      "Automate email payment reminders for invoices approaching their upcoming and past-due thresholds.",
      "Consolidate duplicate SaaS software licenses under a central enterprise agreement."
    ],
    results: [
      { metric: "Financial Ledger Schema", value: "Unified Ledger Views", improvement: "Synthesizes multi-unit balance sheets" },
      { metric: "Aging Calculations", value: "Dynamic DAX Buckets", improvement: "Tracks accounts receivable timelines (aging cohorts)" },
      { metric: "Forecast Modeling", value: "Seasonal Projections", improvement: "Illustrates cash flow and runway scenarios" }
    ],
    githubUrl: "https://github.com/mudassirdandor/corporate-finance-bi",
    liveUrl: "#",
    dashboardType: "Financial",
    metrics: {
      kpis: [
        { label: "Ledger Scale", value: "Synthesized Accounts", trend: "Balanced", isPositive: true },
        { label: "Aging Categories", value: "Aging Buckets", trend: "Stable", isPositive: true },
        { label: "Forecasting Period", value: "Runway Projected", trend: "Projected", isPositive: true },
        { label: "SQL Views Programmed", value: "Custom Schema Views", trend: "Validated", isPositive: true }
      ],
      chartData: [
        { label: "Jan", value: 420, secondaryValue: 390 },
        { label: "Feb", value: 480, secondaryValue: 410 },
        { label: "Mar", value: 510, secondaryValue: 430 },
        { label: "Apr", value: 550, secondaryValue: 460 },
        { label: "May", value: 610, secondaryValue: 480 },
        { label: "Jun", value: 680, secondaryValue: 510 }
      ]
    }
  },
  {
    id: "hr-analytics",
    title: "HR Analytics: Talent Retention & Flight Risk Predictor",
    category: "Interactive Applications",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "Data model identifying key drivers of employee turnover and mapping out departments at risk.",
    description: "An analytics platform that analyzes workforce demographics, compensation, performance reviews, and survey sentiment to pinpoint active drivers of employee attrition.",
    businessProblem: "The engineering and customer support departments experienced an unexpected spike in voluntary turnover, resulting in high recruiting costs.",
    dataset: "Anonymized employee records covering tenure, compensation ratios, promotion cycles, and quarterly satisfaction surveys.",
    tools: ["Python", "Pandas", "Scikit-Learn", "Seaborn", "Power BI"],
    analysisSteps: [
      "Engineered feature sets mapping salary percentiles relative to market averages.",
      "Built a Logistic Regression and Random Forest model to score active flight risk.",
      "Extracted key feature importances to establish the structural causes of turnover.",
      "Deployed a simplified risk scoring matrix directly into an HR executive dashboard."
    ],
    businessInsights: [
      "Employees who did not receive promotions or horizontal role changes within consecutive reviews had higher churn probability.",
      "Salary compression was significant: veterans made less than recent external hires in identical grades.",
      "Direct manager feedback scores below threshold values was a primary predictor of Support department attrition."
    ],
    recommendations: [
      "Establish an automated 'Tenure Milestones' alert system in HR notifying managers of review points.",
      "Initiate an out-of-cycle salary parity audit to correct tenure compression discrepancies.",
      "Deploy mandatory management training for team leads with high sentiment drop-offs."
    ],
    results: [
      { metric: "Predictive Classification", value: "Scikit-Learn Models", improvement: "Trained Random Forest classifiers to predict attrition risk" },
      { metric: "Feature Engineering", value: "Comp Ratios & Tenure", improvement: "Calculates flight probability relative to market standards" },
      { metric: "Oversight Console", value: "Power BI Risk Scorecard", improvement: "Aggregates attrition drivers by management division" }
    ],
    githubUrl: "https://github.com/mudassirdandor/hr-attrition-risk",
    liveUrl: "#",
    dashboardType: "HR",
    metrics: {
      kpis: [
        { label: "Anonymized Records", value: "Synthesized HR File", trend: "Balanced", isPositive: true },
        { label: "Classifier Deployed", value: "Random Forest Model", trend: "Scikit-Learn", isPositive: true },
        { label: "Primary Features", value: "Tenure & Pay Parity", trend: "Engineered", isPositive: true },
        { label: "Visualization Tool", value: "Power BI / Seaborn", trend: "Dual Connect", isPositive: true }
      ],
      chartData: [
        { label: "Eng", value: 24, secondaryValue: 14 },
        { label: "Sales", value: 18, secondaryValue: 12 },
        { label: "Support", value: 28, secondaryValue: 15 },
        { label: "Finance", value: 8, secondaryValue: 6 },
        { label: "Marketing", value: 15, secondaryValue: 10 }
      ]
    }
  },
  {
    id: "customer-churn",
    title: "SaaS Customer Churn & Lifetime Value Optimization",
    category: "Interactive Applications",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "SaaS predictive churn model and segment analysis mapping product usage directly to revenue leakage.",
    description: "A subscription-based analytics solution focusing on tracking active customer health scores, modeling churn probability, and optimizing Customer Lifetime Value (CLTV).",
    businessProblem: "A subscription software provider saw an increase in monthly user churn, representing high monthly recurring revenue loss.",
    dataset: "Product usage clickstreams (active days, feature interactions), support ticket histories, and subscription tier databases.",
    tools: ["Python", "PostgreSQL", "Power BI", "Scikit-Learn", "Matplotlib"],
    analysisSteps: [
      "Aggregated clickstream logs into hourly, weekly, and monthly customer activity profiles.",
      "Constructed a usage health index based on frequency of core feature utilization.",
      "Trained a gradient-boosted classifier to segment clients into distinct risk bands.",
      "Created a live dashboard listing active enterprise clients in high-risk categories for priority account management."
    ],
    businessInsights: [
      "Customers who did not integrate their workspaces shortly after signup had a high churn rate in month 1.",
      "A drop in core exports/reports generation predicted contract cancellation as an early warning.",
      "Support ticket response times exceeding thresholds increased churn probability."
    ],
    recommendations: [
      "Redesign the onboarding workflow with mandatory in-app integrations walkthroughs.",
      "Trigger automated re-engagement emails when core feature usage drops.",
      "Route support tickets of high-value, high-risk segments to a dedicated fast-response queue."
    ],
    results: [
      { metric: "Predictive Analytics", value: "Gradient-Boosted Model", improvement: "Trained classification algorithms to segment user churn risks" },
      { metric: "Usage Health Indexing", value: "Rolling Clickstreams", improvement: "Models customer engagement based on login frequencies" },
      { metric: "Account Oversight", value: "Live Scorecard Dashboards", improvement: "Highlights simulated subscription accounts in high-risk categories" }
    ],
    githubUrl: "https://github.com/mudassirdandor/saas-churn-prediction",
    liveUrl: "#",
    dashboardType: "Churn",
    metrics: {
      kpis: [
        { label: "Telemetry Dataset", value: "Synthesized Clickstreams", trend: "Balanced", isPositive: true },
        { label: "Predictive Algorithm", value: "Gradient Boosting", trend: "Trained Model", isPositive: true },
        { label: "Risk Categories", value: "Distinct Bands", trend: "Configured", isPositive: true },
        { label: "Optimization Target", value: "SaaS Lifetime Value", trend: "Defined Model", isPositive: true }
      ],
      chartData: [
        { label: "Month 1", value: 100, secondaryValue: 100 },
        { label: "Month 2", value: 85, secondaryValue: 92 },
        { label: "Month 3", value: 72, secondaryValue: 88 },
        { label: "Month 4", value: 65, secondaryValue: 84 },
        { label: "Month 5", value: 58, secondaryValue: 81 }
      ]
    }
  },
  {
    id: "retail-analytics",
    title: "Retail Merchandising & Basket Analysis Optimization",
    category: "Interactive Applications",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "Association rule mining and inventory optimization for a multi-outlet consumer goods retail group.",
    description: "An analytics program discovering hidden product associations (market baskets) and aligning store inventories to reduce stockouts on correlated items.",
    businessProblem: "Inefficient product bundling and stockouts during regional promotions led to missed sales opportunities and high transfer costs between outlets.",
    dataset: "Point-of-sale receipt records, vendor delivery lead times, and warehouse stock levels.",
    tools: ["Python", "SQL", "Apriori Algorithm", "Power BI", "Excel"],
    analysisSteps: [
      "Extracted historical transaction tables using SQL to filter invalid/void entries.",
      "Executed Market Basket Analysis using Python to discover high-confidence product pairs.",
      "Engineered automated safety stock reorder thresholds based on demand standard deviation.",
      "Designed an interactive heat map dashboard visualizing product affinity scores."
    ],
    businessInsights: [
      "Premium organic dairy buyers had a high statistical likelihood of purchasing organic whole-wheat bakery items.",
      "Promotional displays pairing high-affinity items on end-cap shelves increased basket size.",
      "Safety stock calculation errors led to persistent stockouts in high-demand items during major holidays."
    ],
    recommendations: [
      "Re-design in-store shelving structures to display organic dairy alongside bakery products.",
      "Introduce a dynamic bundling discount on high-association product pairs (e.g., buy dairy, get bread at a bundled discount).",
      "Deploy localized seasonal safety stock calculations to account for local community events."
    ],
    results: [
      { metric: "Affinity Data Mining", value: "Apriori Association", improvement: "Uncovers product relationships from transactional receipts" },
      { metric: "Reorder Trigger Planning", value: "Safety Stock Equations", improvement: "Calculates optimal inventory thresholds to avoid stockouts" },
      { metric: "Layout Strategy Visuals", value: "Product Affinity Heatmaps", improvement: "Maps out purchase correlation scores across categories" }
    ],
    githubUrl: "https://github.com/mudassirdandor/retail-basket-analytics",
    liveUrl: "#",
    dashboardType: "Retail",
    metrics: {
      kpis: [
        { label: "Analyzed Receipts", value: "Synthesized Receipts", trend: "Balanced", isPositive: true },
        { label: "Data Mining Algorithm", value: "Apriori Association", trend: "Rule Extraction", isPositive: true },
        { label: "Inventory Thresholds", value: "Dynamic Safety Stock", trend: "Optimized", isPositive: true },
        { label: "Visual Diagnostics", value: "Affinity Heatmaps", trend: "High Contrast", isPositive: true }
      ],
      chartData: [
        { label: "Organic Dairy", value: 45, secondaryValue: 68 },
        { label: "Specialty Wine", value: 32, secondaryValue: 48 },
        { label: "Fresh Bakery", value: 62, secondaryValue: 75 },
        { label: "Gourmet Snacks", value: 28, secondaryValue: 35 },
        { label: "Imported Cheese", value: 39, secondaryValue: 52 }
      ]
    }
  },
  {
    id: "ngo-monitoring",
    title: "NGO Program Monitoring & Resource Allocation Framework",
    category: "Business Intelligence",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "A specialized performance tracking dashboard assessing program reach and asset efficiency.",
    description: "An impact-oriented Business Intelligence suite designed for international development organizations to track program KPIs, budget burn rates, and resource deployment transparency.",
    businessProblem: "The donor monitoring team struggled to verify asset distribution timelines and field outcome metrics across distinct regional operations.",
    dataset: "Project budgets, logistical shipping dispatch records, quarterly regional field surveys, and active medical/educational supply inventories.",
    tools: ["Power BI", "Excel Advanced", "Statistics", "Geospatial Analysis"],
    analysisSteps: [
      "Standardized regional survey formats in Excel using advanced data validation tools.",
      "Integrated GIS coordinate streams into Power BI to construct distribution routes.",
      "Analyzed resource supply lags using statistical variance analysis to highlight bottlenecked regions.",
      "Created unified regional scorecard dashboards for direct distribution to key program donors."
    ],
    businessInsights: [
      "Supply shipments to the northern hub experienced custom documentation errors.",
      "Program spending burn rates were heavily skewed: allocated budgets were spent in the final days of the grant cycle.",
      "Primary health outreach metrics improved when local mobile units visited twice a month rather than once."
    ],
    recommendations: [
      "Standardize customs compliance documentation via an automated pre-shipment checklist.",
      "Implement quarterly spending reviews to enforce steady budget deployment throughout the grant lifecycle.",
      "Reallocate field supplies to support a bi-weekly mobile clinic rotation schedule."
    ],
    results: [
      { metric: "Compliance Reporting", value: "Donor KPI Scorecards", improvement: "Standardizes program evaluation templates" },
      { metric: "Logistics Optimization", value: "GIS Coordinate Tracking", improvement: "Visualizes supply transit routes and delays in Power BI" },
      { metric: "Variance Calculations", value: "Statistical Deviation", improvement: "Analyzes budget burn rates and resource dispatch lags" }
    ],
    githubUrl: "https://github.com/mudassirdandor/ngo-impact-bi",
    liveUrl: "#",
    dashboardType: "NGO",
    metrics: {
      kpis: [
        { label: "Regional Units", value: "Simulated Hubs", trend: "Balanced", isPositive: true },
        { label: "Mapping Method", value: "GIS Route Integration", trend: "Visualized", isPositive: true },
        { label: "KPI Categories", value: "Budget, Logistics, Reach", trend: "Standardized", isPositive: true },
        { label: "Reporting Format", value: "Power BI Views", trend: "Donor Direct", isPositive: true }
      ],
      chartData: [
        { label: "Region A", value: 85, secondaryValue: 92 },
        { label: "Region B", value: 64, secondaryValue: 71 },
        { label: "Region C", value: 92, secondaryValue: 96 },
        { label: "Region D", value: 45, secondaryValue: 58 },
        { label: "Region E", value: 78, secondaryValue: 84 }
      ]
    }
  },
  {
    id: "healthcare-dashboard",
    title: "Clinical Operations & Patient Throughput Analytics",
    category: "Business Intelligence",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "Operational performance dashboard tracking patient waiting times, ER occupancy, and clinical outcomes.",
    description: "An advanced, high-availability analytics dashboard built for hospital administrators to monitor patient care cycles, resource usage, and readmission patterns.",
    businessProblem: "Overcrowding in the emergency department led to long wait times and an increase in patients leaving without being seen.",
    dataset: "Electronic health records (EHR) timestamped at check-in, triage, bed allocation, treatment, and discharge.",
    tools: ["Power BI", "SQL (SQL Server)", "Statistical Forecasting", "DAX"],
    analysisSteps: [
      "Extracted patient journey timestamp logs and built clean database views.",
      "Calculated complex time intervals (triage-to-bed, bed-to-discharge) using advanced DAX.",
      "Constructed a predictive model to forecast peak ER occupancy based on local flu trends.",
      "Designed a critical KPI dashboard featuring real-time clinical alerts."
    ],
    businessInsights: [
      "Moderate-priority patients experienced the longest waiting times, frequently exceeding thresholds.",
      "Peak arrival times concentrated heavily on weekends, where staffing was below capacity.",
      "The readmission rate within 30 days for cardiovascular patients was correlated with premature discharge metrics."
    ],
    recommendations: [
      "Establish a 'Fast-Track' treatment unit specifically for minor procedures.",
      "Re-align clinical staff shifts to increase weekend coverage during peak hours.",
      "Implement a structured post-discharge follow-up protocol for high-risk cardiac cases."
    ],
    results: [
      { metric: "Operational Bottlenecks", value: "Timestamp Interval DAX", improvement: "Calculates wait times between check-in, triage, and bed allocation" },
      { metric: "Occupancy Forecasting", value: "Time-Series Projections", improvement: "Illustrates emergency department peak arrival hour scenarios" },
      { metric: "Resource Scheduling", value: "Staff Shifts Re-Alignment", improvement: "Optimizes clinical roster planning against triage surges" }
    ],
    githubUrl: "https://github.com/mudassirdandor/healthcare-operations-bi",
    liveUrl: "#",
    dashboardType: "Healthcare",
    metrics: {
      kpis: [
        { label: "EHR Log Records", value: "Synthesized Timestamps", trend: "Balanced", isPositive: true },
        { label: "Interval Metrics", value: "Triage-to-Bed Duration", trend: "DAX Formulated", isPositive: true },
        { label: "Peak Forecast Method", value: "Time-Series Analysis", trend: "Predictive", isPositive: true },
        { label: "Dashboard Alerts", value: "RAG Status Indicators", trend: "Active", isPositive: true }
      ],
      chartData: [
        { label: "Mon", value: 180, secondaryValue: 120 },
        { label: "Tue", value: 160, secondaryValue: 105 },
        { label: "Wed", value: 175, secondaryValue: 115 },
        { label: "Thu", value: 190, secondaryValue: 130 },
        { label: "Fri", value: 240, secondaryValue: 185 },
        { label: "Sat", value: 290, secondaryValue: 240 },
        { label: "Sun", value: 275, secondaryValue: 215 }
      ]
    }
  },
  {
    id: "supply-chain-dashboard",
    title: "Supply Chain Optimization & Logistics Analytics",
    category: "Business Intelligence",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "Interactive operations tracking evaluating freight efficiency, carrier SLA compliance, and warehouse logistics.",
    description: "An operational logistics dashboard designed for supply chain managers to analyze delivery times, carrier performance, route efficiency, and fuel expense anomalies.",
    businessProblem: "Late shipments rose, causing manufacturing delays and client chargebacks.",
    dataset: "ERP shipment logs, carrier invoices, GPS route files, and factory reception schedules.",
    tools: ["Power BI", "SQL Server", "DAX", "Geospatial Mapping", "Python"],
    analysisSteps: [
      "Cleaned messy carrier transit reports in Python using pattern matching algorithms.",
      "Modeled carrier delivery variances using statistical standard deviation formulas.",
      "Engineered automated carrier SLA scorecards using advanced DAX logic.",
      "Integrated interactive maps to trace high-delay, high-cost shipping corridors."
    ],
    businessInsights: [
      "Certain carriers on the Midwest route had equipment delays.",
      "Overlapping routing paths between warehouses led to redundant shipping expenses.",
      "Receiving docks had a labor bottleneck on Mondays, delaying container unloading."
    ],
    recommendations: [
      "Renegotiate or terminate contracts with poor-performing carriers on specific lanes.",
      "Consolidate regional shipments to use hub-and-spoke routing structures.",
      "Introduce a flexible Sunday night staffing shift at unloading docks to prepare for Monday morning volume."
    ],
    results: [
      { metric: "Logistics Diagnostics", value: "Transit Delay Variances", improvement: "Analyzes standard deviations of delivery delays in Power BI" },
      { metric: "Partner Evaluations", value: "Carrier SLA Scorecards", improvement: "Scores shipping performance and SLA compliance across lanes" },
      { metric: "Unloading Lead Planning", value: "Dock Allocation Models", improvement: "Identifies receiving bottlenecks during peak Monday arrivals" }
    ],
    githubUrl: "https://github.com/mudassirdandor/supply-chain-logistics-bi",
    liveUrl: "#",
    dashboardType: "Supply Chain",
    metrics: {
      kpis: [
        { label: "ERP Log Scale", value: "Synthesized Shipments", trend: "Balanced", isPositive: true },
        { label: "SLA Scorecard Metrics", value: "Carrier On-Time Rate", trend: "DAX Modeled", isPositive: true },
        { label: "Route Visualization", value: "Interactive Transit Maps", trend: "Geospatial", isPositive: true },
        { label: "Data Cleaning Tool", value: "Python Pattern Match", trend: "Automated", isPositive: true }
      ],
      chartData: [
        { label: "Route A", value: 3.4, secondaryValue: 2.1 },
        { label: "Route B", value: 4.8, secondaryValue: 3.2 },
        { label: "Route C", value: 2.1, secondaryValue: 1.8 },
        { label: "Route D", value: 5.6, secondaryValue: 3.5 },
        { label: "Route E", value: 3.9, secondaryValue: 2.6 }
      ]
    }
  },
  {
    id: "business-performance",
    title: "Strategic Business Performance & OKR Balance Scorecard",
    category: "Business Intelligence",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "A multi-department executive scorecard tracking company OKRs, productivity metrics, and gross margin goals.",
    description: "An organizational performance console linking operations, sales, customer support, and financial goals into a single executive dashboard.",
    businessProblem: "Organizational silos led to misaligned priorities: the sales team overcommitted on features, and engineering missed delivery targets, while customer satisfaction declined.",
    dataset: "Jira velocity logs, CRM pipeline metrics, Zendesk satisfaction ratings, and general ledger performance.",
    tools: ["Power BI", "SQL", "DAX", "Data Modeling"],
    analysisSteps: [
      "Designed a unified data schema with shared date and division dimensions.",
      "Constructed custom KPI status indicators (Red-Amber-Green) based on dynamic target metrics.",
      "Engineered automated team productivity indicators incorporating task weightings.",
      "Implemented role-based security to control data exposure across departments."
    ],
    businessInsights: [
      "Engineering velocity was negatively affected when sales pipelines experienced sudden surges in non-standard requests.",
      "Customer support CSAT scores were correlated with engineering deployment cycles.",
      "Sales commission structures rewarded deal volume over customer retention metrics, resulting in short-term bookings but long-term churn."
    ],
    recommendations: [
      "Integrate product management approval triggers directly into the high-value sales pipeline.",
      "Form a cross-functional post-release stabilization squad to address early release bugs.",
      "Align sales commission parameters to reward long-term subscription renewals (12+ months)."
    ],
    results: [
      { metric: "Performance Metrics", value: "Shared Date Dimensions", improvement: "Links CRM pipeline and support tickets in a single model" },
      { metric: "Target Trackers", value: "RAG Status Indicators", improvement: "Applies dynamic targets to monitor team OKR completion rates" },
      { metric: "Security Schema", value: "Role-Based Data Filters", improvement: "Implements access control configurations across divisions" }
    ],
    githubUrl: "https://github.com/mudassirdandor/executive-okr-scorecard",
    liveUrl: "#",
    dashboardType: "Business Performance",
    metrics: {
      kpis: [
        { label: "Siloed Datasets Linked", value: "Jira, CRM, Zendesk", trend: "Integrated Model", isPositive: true },
        { label: "Target Status Flags", value: "Dynamic RAG Colors", trend: "DAX Coded", isPositive: true },
        { label: "Data Security Model", value: "Row-Level Filters (RLS)", trend: "Configured", isPositive: true },
        { label: "Analysis Framework", value: "Balanced Scorecard", trend: "Corporate Standard", isPositive: true }
      ],
      chartData: [
        { label: "Q1", value: 64, secondaryValue: 70 },
        { label: "Q2", value: 72, secondaryValue: 75 },
        { label: "Q3", value: 85, secondaryValue: 88 },
        { label: "Q4", value: 91, secondaryValue: 92 }
      ]
    }
  },
  {
    id: "gbp-analytics",
    title: "Google Business Profile Optimization & Maps Analytics",
    category: "Local Business Intelligence",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "Local Business Intelligence dashboard transforming search visibility and maps data into localized foot-traffic analytics.",
    description: "An innovative Local BI platform that extracts, models, and visualizes Google Business Profile performance metrics to measure localized demand and drive regional marketing decisions.",
    businessProblem: "A multi-location clinic group lacked quantitative insights into maps search impressions, phone call conversions, and navigation requests, leading to arbitrary regional marketing budgets.",
    dataset: "Google Business Profile API streams including search terms, call triggers, direction request origins, and star ratings across multiple clinics.",
    tools: ["Python", "GBP API", "Power BI", "GeoPandas", "Local Market Insights"],
    analysisSteps: [
      "Built automated Python scripts to fetch historical Google Business metrics through API requests.",
      "Engineered localized geospatial demand heatmaps using patient postal code coordinates.",
      "Conducted semantic sentiment analysis on clinic reviews to isolate common location issues.",
      "Assembled a multi-site Power BI console summarizing customer search paths and conversion ratios."
    ],
    businessInsights: [
      "Clinics in specific suburbs experienced high direction request volumes but low appointment bookings due to poor entrance signage.",
      "Many phone calls occurred during specific morning hours, leading to dropped-call rates due to front-desk bottlenecks.",
      "Positive reviews containing targeted phrases experienced a higher click-through-rate on local maps."
    ],
    recommendations: [
      "Update GBP location descriptions with precise driving, parking, and clinic entrance instructions.",
      "Deploy an automated virtual receptionist during morning peak hours.",
      "Develop a system triggering SMS review requests immediately following patient check-outs."
    ],
    results: [
      { metric: "GBP API Extraction", value: "Python Automated Scripts", improvement: "Retrieves search terms, calls, and direction clicks via API" },
      { metric: "Geospatial Analysis", value: "Postal Code Grids", improvement: "Maps out location catchment areas and drive-times" },
      { metric: "Review Sentiment Mining", value: "Sentiment Word Analysis", improvement: "Isolates common patient complaints across clinic locations" }
    ],
    githubUrl: "https://github.com/mudassirdandor/gbp-local-analytics",
    liveUrl: "#",
    dashboardType: "Google Business",
    metrics: {
      kpis: [
        { label: "Simulated Locations", value: "Multiple Clinics Modeled", trend: "Balanced", isPositive: true },
        { label: "Data Retrieval Method", value: "Python GBP API Calls", trend: "Scheduled Script", isPositive: true },
        { label: "Geospatial Focus", value: "Catchment Mapping", trend: "High Contrast", isPositive: true },
        { label: "Review NLP Tool", value: "Sentiment Tokenization", trend: "Sentiment Aggregated", isPositive: true }
      ],
      chartData: [
        { label: "Site North", value: 120, secondaryValue: 145 },
        { label: "Site South", value: 95, secondaryValue: 130 },
        { label: "Site East", value: 110, secondaryValue: 152 },
        { label: "Site West", value: 80, secondaryValue: 112 },
        { label: "Site Central", value: 160, secondaryValue: 210 }
      ]
    }
  },
  {
    id: "local-seo-dashboard",
    title: "Local SEO Performance & Competitive Share-of-Voice",
    category: "Local Business Intelligence",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "Localized search visibility rankings dashboard modeling neighborhood search presence and competitor gaps.",
    description: "A competitive intelligence system mapping business search visibility, ranking changes, and local maps share-of-voice against top local industry rivals.",
    businessProblem: "A home services brand was losing market share to new competitors in fast-growing suburbs due to unmonitored keyword movements and poor geo-targeted content.",
    dataset: "Geo-grid rank tracking coordinates, competitor maps search positions, search volume data, and local citation listings.",
    tools: ["Power BI", "SQL", "Geo-Grid Coordinates", "Local Citations Analysis"],
    analysisSteps: [
      "Extracted rank listings across a geographical grid overlaying major target suburbs.",
      "Modeled localized Share-of-Voice (SoV) percentage metrics across distinct neighborhood areas.",
      "Identified critical gaps in local business citations and directories compared to core competitors.",
      "Synthesized rank indexes, citation health scores, and regional volumes into a tactical marketing console."
    ],
    businessInsights: [
      "Competitors dominated maps rankings on high-volume keywords in eastern neighborhoods due to localized citation clusters.",
      "Directory listings had inconsistencies: many citations featured inaccurate telephone numbers or old operating hours.",
      "Our search position dropped on weekends, matching a reduction in client review velocity."
    ],
    recommendations: [
      "Execute a targeted local link-building campaign focusing on neighborhood community sites.",
      "Deploy an automated citation synchronization program to audit and fix all address details across major directories.",
      "Launch a weekend review promotion campaign encouraging immediate customer satisfaction feedback."
    ],
    results: [
      { metric: "Competitive Assessment", value: "Share-of-Voice (SoV) Grids", improvement: "Measures ranking positions across target suburban areas" },
      { metric: "Listing Integrity Audit", value: "Citation Consistency Scan", improvement: "Uncovers name/phone inconsistencies across directories" },
      { metric: "Review Velocity Correlation", value: "Weekend Ranking Models", improvement: "Compares weekend rank drops to review submission speeds" }
    ],
    githubUrl: "https://github.com/mudassirdandor/local-seo-sov-tracker",
    liveUrl: "#",
    dashboardType: "Local SEO",
    metrics: {
      kpis: [
        { label: "Search Grid Coverage", value: "Geographical Grid", trend: "Balanced", isPositive: true },
        { label: "Citation Directories", value: "Directory Citations Scan", trend: "Data Integrity", isPositive: true },
        { label: "Competitive Metric", value: "Share-of-Voice (SoV)", trend: "Dynamic", isPositive: true },
        { label: "Reporting Console", value: "Power BI Search Board", trend: "Operational", isPositive: true }
      ],
      chartData: [
        { label: "Week 1", value: 31, secondaryValue: 42 },
        { label: "Week 2", value: 33, secondaryValue: 41 },
        { label: "Week 3", value: 38, secondaryValue: 43 },
        { label: "Week 4", value: 42, secondaryValue: 45 },
        { label: "Week 5", value: 48, secondaryValue: 49 }
      ]
    }
  },
  {
    id: "ai-reporting-assistant",
    title: "AI-Assisted Automated Reporting Engine",
    category: "AI Automation",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "An automated data extraction and LLM reporting integration that delivers natural-language intelligence.",
    description: "A serverless pipeline that extracts key database metrics, structures them into clean JSON files, and uses LLM agents to draft professional monthly performance briefs for company stakeholders.",
    businessProblem: "The business analysts spent significant hours per month manually writing static text summaries explaining financial and operational charts to department executives.",
    dataset: "Consolidated SQL analytics tables, historical report structures, and executive writing style manuals.",
    tools: ["Python", "Gemini API", "PostgreSQL", "Workflow Automation", "Markdown"],
    analysisSteps: [
      "Engineered automated SQL scripts summarizing weekly/monthly performance variance.",
      "Designed prompt templates that guide the LLM to write professional, objective financial analysis.",
      "Integrated automated email pipelines delivering compiled markdown reports directly to stakeholders.",
      "Built a web console to allow analysts to preview, refine, and sign off on drafts before dispatch."
    ],
    businessInsights: [
      "Automating the drafting step eliminated human data-transcription errors completely.",
      "Executives read reports earlier when delivered as structured, concise bullet points rather than complex PDFs.",
      "Analysts reclaimed valuable time, redirecting active focus to deep-dive predictive modeling instead of manual reporting."
    ],
    recommendations: [
      "Incorporate department-specific metric dictionaries into the LLM system prompt to ensure precise jargon matches.",
      "Expand the automation workflow to support draft generation for quarterly investor briefs.",
      "Train analysts to use the system's human-in-the-loop validation dashboard to speed up reviews."
    ],
    results: [
      { metric: "Variance Explanations", value: "Automated SQL Scripts", improvement: "Prepares weekly/monthly metric summaries from database tables" },
      { metric: "Prompt Pipeline", value: "Structured LLM Prompting", improvement: "Generates professional briefs in clean markdown files" },
      { metric: "Verification Dashboard", value: "Human-in-the-Loop UI", improvement: "Enables analysts to preview, edit, and sign off on summaries" }
    ],
    githubUrl: "https://github.com/mudassirdandor/ai-reporting-assistant",
    liveUrl: "#",
    dashboardType: "AI Assistant",
    metrics: {
      kpis: [
        { label: "Summarized Tables", value: "Weekly Variance SQL", trend: "Automated", isPositive: true },
        { label: "Automated Draft Output", value: "Markdown Reports", trend: "Immediate", isPositive: true },
        { label: "Model Architecture", value: "Structured LLM Prompting", trend: "Balanced", isPositive: true },
        { label: "User Control Interface", value: "Verification Dashboard", trend: "Active Gate", isPositive: true }
      ],
      chartData: [
        { label: "Jan", value: 14.0, secondaryValue: 0.25 },
        { label: "Feb", value: 14.0, secondaryValue: 0.25 },
        { label: "Mar", value: 14.0, secondaryValue: 0.25 },
        { label: "Apr", value: 14.0, secondaryValue: 0.25 },
        { label: "May", value: 14.0, secondaryValue: 0.25 }
      ]
    }
  },
  {
    id: "education-analytics",
    title: "University Student Success & Academic Performance Scorecard",
    category: "Interactive Applications",
    isSimulated: true,
    isUnderDevelopment: false,
    status: "Demonstration",
    shortDescription: "An institutional scorecard tracing academic risk factors, course completion rates, and student retention trends.",
    description: "An administrative intelligence dashboard for university deans designed to pinpoint students at risk of withdrawing, analyze enrollment pipelines, and optimize course allocation resources.",
    businessProblem: "A mid-sized state university faced a drop in sophomore retention, resulting in a severe decline in tuition revenue and institutional ranking metrics.",
    dataset: "Anonymized student registry records covering GPA scores, financial aid distributions, learning management system (LMS) log activity, and demographic enrollment grids.",
    tools: ["Power BI", "SQL (PostgreSQL)", "DAX", "Python (Pandas)"],
    analysisSteps: [
      "Aggregated clickstream activity from the digital LMS (Canvas) to model student engagement indexes.",
      "Calculated semester-over-semester GPA drops and enrollment patterns via complex DAX measures.",
      "Engineered an academic risk index that flags students with low LMS logins and declining midterm scores.",
      "Constructed a high-level balance scorecard showing retention and enrollment funnels for executive committees."
    ],
    businessInsights: [
      "Sophomores on partial financial aid who logged into the LMS infrequently had a higher attrition rate.",
      "A drop in sophomore GPA between semester 1 and 2 was a primary predictor of early dropout.",
      "Under-funded departments experienced higher class drop-out rates due to larger average class sizes."
    ],
    recommendations: [
      "Introduce early proactive tutoring and counseling interventions for students flagged as 'High Risk' in Canvas.",
      "Establish a micro-grant funding pool to assist partial-aid students facing sudden balance holds.",
      "Optimize faculty resource scheduling to reduce core sophomore introductory class sizes."
    ],
    results: [
      { metric: "LMS Engagement Scoring", value: "Canvas Clickstream Modeling", improvement: "Calculates student activity scores from login patterns" },
      { metric: "Student Attrition Models", value: "GPA Variance Indicators", improvement: "Flags student dropout risk before mid-term withdrawal dates" },
      { metric: "Academic Resources", value: "Enrollment Pipeline Tracking", improvement: "Illustrates retention curves to optimize faculty allocations" }
    ],
    githubUrl: "https://github.com/mudassirdandor/student-success-bi",
    liveUrl: "#",
    dashboardType: "Education",
    metrics: {
      kpis: [
        { label: "Student Registry Scale", value: "Synthesized Student Registry", trend: "Balanced", isPositive: true },
        { label: "Engagement Source", value: "Canvas LMS Clickstreams", trend: "Activity Matrix", isPositive: true },
        { label: "Attrition Indicators", value: "GPA & LMS Drops", trend: "Calculated", isPositive: true },
        { label: "Scorecard Visuals", value: "Dean Balance Board", trend: "High Density", isPositive: true }
      ],
      chartData: [
        { label: "Liberal Arts", value: 72, secondaryValue: 81 },
        { label: "Engineering", value: 89, secondaryValue: 92 },
        { label: "Business", value: 85, secondaryValue: 88 },
        { label: "Sciences", value: 80, secondaryValue: 84 },
        { label: "Education", value: 68, secondaryValue: 74 }
      ]
    }
  }
];
