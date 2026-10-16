export interface CaseStudyWorkflowStep {
  title: string;
  description: string;
}

export interface CaseStudyField {
  name: string;
  detail: string;
}

export interface CaseStudySEO {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  jsonLd: Record<string, unknown>;
}

export interface CaseStudy {
  id: string;
  slugs: string[];
  seo: CaseStudySEO;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  liveUrl: string;
  githubUrl: string;
  image: string;
  imageAlt: string;
  overview: string;
  problemContext: string[];
  dataAndInputs: {
    description: string;
    source: string;
    fields: CaseStudyField[];
  };
  approachAndWorkflow: {
    summary: string;
    steps: CaseStudyWorkflowStep[];
  };
  processingAndAnalysis: {
    summary: string;
    points: string[];
  };
  resultsAndOutputs: {
    summary: string;
    outputs: string[];
  };
  toolsAndTechnologies: string[];
  keyTakeaway: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'saylani-student-registration',
    slugs: ['saylani-registration', 'saylani-student-registration'],
    seo: {
      title: 'Saylani Student Registration Case Study | Mudassir Javed',
      description:
        'Case study on automated student data collection, client-side input validation, image preprocessing, and dynamic credential badge generation by Mudassir Javed.',
      canonical: 'https://mudassirdandor.vercel.app/projects/saylani-registration',
      ogImage: 'https://mudassirdandor.vercel.app/images/projects/saylani-registration.webp',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'Saylani Student Registration System Case Study',
        name: 'Saylani Student Registration System',
        description:
          'Case study on automated student data collection, client-side input validation, image preprocessing, and dynamic credential badge generation by Mudassir Javed.',
        url: 'https://mudassirdandor.vercel.app/projects/saylani-registration',
        image: 'https://mudassirdandor.vercel.app/images/projects/saylani-registration.webp',
        author: {
          '@type': 'Person',
          name: 'Mudassir Javed',
          url: 'https://mudassirdandor.vercel.app/',
        },
        inLanguage: 'en-US',
      },
    },
    title: 'Saylani Student Registration System',
    subtitle: 'Automated Student Data Collection, Dynamic Image Preprocessing, and Digital Credential Generation',
    category: 'Data Collection & Automation',
    role: 'Frontend & Workflow Developer',
    liveUrl: 'https://saylanireg.netlify.app/',
    githubUrl: 'https://github.com/mudassirdandor/saylani-form',
    image: '/images/projects/saylani-registration.webp',
    imageAlt: 'Saylani Student Registration System interface with conversational chatbot assistant',
    overview:
      'A structured web-based student registration portal engineered to collect student applicant data across Pakistan. It combines client-side input validation, image preprocessing and cropping, deterministic roll number assignment, an embedded Dialogflow virtual assistant for applicant support, and automated generation of printable double-sided student ID cards with dynamic QR verification.',
    problemContext: [
      'Vocational training programs handle high applicant volumes across multiple technical tracks (Artificial Intelligence, Web Development, Graphic Design).',
      'Unstructured or manual data entry often leads to inconsistent national identity formats, missing photographs, and invalid age entries.',
      'Manual verification and card printing introduce administrative bottlenecks that delay class onboarding.',
    ],
    dataAndInputs: {
      description:
        'The registration interface collects and normalizes applicant identity, contact details, educational background, and digital portrait assets.',
      source: 'Direct user submission via web form and conversational assistant',
      fields: [
        { name: 'Full Name & Father Name', detail: 'Primary student identity fields with whitespace trimming' },
        { name: 'National Identity (CNIC / B-Form)', detail: 'Formatted and masked to standard 13-digit format (XXXXX-XXXXXXX-X)' },
        { name: 'Contact Phone', detail: 'Mobile number normalized with carrier prefix masking (03XX-XXXXXXX)' },
        { name: 'Email Address', detail: 'Validated email format used for communication records' },
        { name: 'Date of Birth (DOB)', detail: 'Dynamic age calculation to enforce program eligibility (>= 13 years)' },
        { name: 'Course Selection', detail: 'Categorized into Artificial Intelligence, Web Development, or Graphic Design' },
        { name: 'Education & Hardware', detail: 'Prior qualification levels and laptop ownership indicator' },
        { name: 'Student Photograph', detail: 'User-provided file cropped to passport proportions (<1MB) before Base64 serialization' },
      ],
    },
    approachAndWorkflow: {
      summary:
        'The application orchestrates information flow across intake, validation, image preprocessing, identifier generation, and document compilation.',
      steps: [
        {
          title: '1. Structured Input & Guidance',
          description:
            'Applicants enter details through a grouped grid form while an integrated Dialogflow "Student_assistant" messenger is available to answer common enrollment questions.',
        },
        {
          title: '2. Client-Side Input Formatting',
          description:
            'Interactive input event listeners automatically format phone and CNIC numbers with standard separators, preventing malformed identity entries.',
        },
        {
          title: '3. Image Crop & Preprocessing',
          description:
            'Uploaded photos open in a Cropper.js modal allowing students to frame their portrait. The cropped canvas is downsampled (max 800x800px) and converted to Base64 to ensure storage efficiency.',
        },
        {
          title: '4. Course Identifier Generation',
          description:
            'Upon submission validation, the system constructs a deterministic roll number using course-specific prefixes (AIC for AI, WMA for Web Dev, GD for Graphic Design) combined with a randomized 6-digit identifier.',
        },
        {
          title: '5. Credential Compilation & PDF Export',
          description:
            'Validated student data is stored in LocalStorage and forwarded to the ID Card view, where html2pdf.js and qrcode-generator compile a printable two-sided credential badge with dynamic QR code.',
        },
      ],
    },
    processingAndAnalysis: {
      summary:
        'Data hygiene and transformation rules applied throughout the client lifecycle to guarantee consistent records:',
      points: [
        'Dynamic Age Validation: Calculates exact age from Date of Birth and prevents form submission if applicant is under 13 years old.',
        'Regex Pattern Masking: Enforces XXXXX-XXXXXXX-X for CNIC inputs and 03XX-XXXXXXX for Pakistani mobile carriers.',
        'Canvas Compression: Constrains student photograph dimensions and applies JPEG compression to mitigate browser memory and LocalStorage overflow.',
        'Prefix Mapping: Maps human-readable course names to institutional abbreviations (AIC, WMA, GD) for structured roll number indexing.',
      ],
    },
    resultsAndOutputs: {
      summary:
        'Verified end-to-end deliverables produced by the running system:',
      outputs: [
        'Production web registration application deployed and operational at saylanireg.netlify.app.',
        'Clean client-side validation preventing malformed or underage submissions.',
        'Automated double-sided student ID card generation with course code, photo, student details, and QR verification token.',
        'Instant one-click downloadable PDF output powered by client-side document compilation.',
      ],
    },
    toolsAndTechnologies: [
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3',
      'Cropper.js',
      'html2pdf.js',
      'qrcode-generator',
      'Google Dialogflow Messenger',
      'Google reCAPTCHA',
    ],
    keyTakeaway:
      'Demonstrates end-to-end data intake architecture: capturing raw human inputs, validating formats, transforming binary media into optimized structures, and programmatically assembling verifiable credential documents without backend friction.',
  },
  {
    id: 'job-application-system',
    slugs: ['job-application', 'job-application-system'],
    seo: {
      title: 'Job Application System Case Study | Mudassir Javed',
      description:
        'Case study on multi-step progressive form architecture, field-level validation gates, and real-time completion tracking engineered by Mudassir Javed.',
      canonical: 'https://mudassirdandor.vercel.app/projects/job-application',
      ogImage: 'https://mudassirdandor.vercel.app/images/projects/job-application.webp',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'Job Application Data Collection System Case Study',
        name: 'Job Application Data Collection System',
        description:
          'Case study on multi-step progressive form architecture, field-level validation gates, and real-time completion tracking engineered by Mudassir Javed.',
        url: 'https://mudassirdandor.vercel.app/projects/job-application',
        image: 'https://mudassirdandor.vercel.app/images/projects/job-application.webp',
        author: {
          '@type': 'Person',
          name: 'Mudassir Javed',
          url: 'https://mudassirdandor.vercel.app/',
        },
        inLanguage: 'en-US',
      },
    },
    title: 'Job Application Data Collection System',
    subtitle: 'Multi-Step Progressive Form Architecture, Field-Level Validation Gates, and Real-Time Completion Tracking',
    category: 'Structured Data & Form Design',
    role: 'Frontend Developer',
    liveUrl: 'https://jobapplica.netlify.app/',
    githubUrl: 'https://github.com/mudassirdandor/multi-step-form',
    image: '/images/projects/job-application.webp',
    imageAlt: 'Multi-step Job Application digital workflow with progress indicator and structured input forms',
    overview:
      'A responsive multi-step employment data collection system designed to collect applicant profiles across six logical stages. It implements progressive validation gates that enforce data integrity before advancing to subsequent stages, calculates real-time completion progress, and provides a unified review summary for user confirmation prior to submission.',
    problemContext: [
      'Single-page job applications with dozens of required inputs suffer from high abandonment rates and frequent data entry oversights.',
      'Allowing applicants to skip required sections results in incomplete candidate pools that require administrative follow-ups.',
      'Applicants lack visibility into how much information remains before final submission.',
    ],
    dataAndInputs: {
      description:
        'Structured candidate data captured across six dedicated domain steps:',
      source: 'Direct applicant input through staged digital form panels',
      fields: [
        { name: 'Step 1: Personal Information', detail: 'Legal full name, date of birth, gender, and national identification' },
        { name: 'Step 2: Contact Details', detail: 'Email address, phone number, residential address, and city location' },
        { name: 'Step 3: Educational Background', detail: 'Highest qualification, institution attended, completion year, and field of study' },
        { name: 'Step 4: Professional Experience', detail: 'Prior job title, employer, employment duration, and core responsibilities' },
        { name: 'Step 5: Skills & Preferences', detail: 'Technical proficiencies, availability timeline, and expected work mode' },
        { name: 'Step 6: Review & Confirmation', detail: 'Aggregated view of all prior inputs for applicant verification' },
      ],
    },
    approachAndWorkflow: {
      summary:
        'Progressive disclosure methodology ensuring user cognitive load is minimized while data completeness is maximized.',
      steps: [
        {
          title: '1. Staged Panel Activation',
          description:
            'Only one step panel is active at any time. Earlier and later steps remain hidden to focus attention on the active section.',
        },
        {
          title: '2. Granular Step Validation Gate',
          description:
            'When the applicant clicks "Next", custom validation algorithms evaluate each required field in the current step. Navigation is halted and field-level error messages are displayed if any criteria fail.',
        },
        {
          title: '3. Progress Indicator Synchronization',
          description:
            'The progress bar width and percentage label recalculate dynamically as candidates advance, providing clear completion feedback (0% to 100%).',
        },
        {
          title: '4. Accessible Tablist Navigation',
          description:
            'Step indicators use semantic ARIA roles (tablist, tab, tabpanel, aria-selected) allowing screen readers and keyboard users to navigate between completed steps.',
        },
        {
          title: '5. Comprehensive Review Stage',
          description:
            'Step 6 compiles all captured key-value pairs into a clean preview card so candidates can review their submission before dispatching.',
        },
      ],
    },
    processingAndAnalysis: {
      summary:
        'Client-side logic maintaining form state and enforcing validation constraints:',
      points: [
        'Step Boundary Guarding: Prevents advancing to step N+1 unless step N satisfies validity checks.',
        'Dynamic Progress Calculation: Computes percentage ratio: (currentStep - 1) / (totalSteps - 1) * 100.',
        'Accessible DOM State Management: Updates aria-selected, tabpanel visibility, and focus indicators synchronously.',
        'Input Error Clear Hooks: Real-time event listeners that clear error states immediately when the user inputs valid data.',
      ],
    },
    resultsAndOutputs: {
      summary:
        'Observable system outputs and verified behavior:',
      outputs: [
        'Live responsive web application deployed at jobapplica.netlify.app.',
        'Zero-dependency form validation preventing incomplete candidate records.',
        'Real-time visual progress feedback bar and step indicators.',
        'Structured pre-submission summary view ensuring applicant data verification.',
      ],
    },
    toolsAndTechnologies: [
      'HTML5 (Semantic Forms)',
      'Tailwind CSS',
      'JavaScript (ES6+)',
      'WAI-ARIA Accessibility Standards',
      'DOM API',
    ],
    keyTakeaway:
      'Emphasizes the foundational principle of data engineering and analysis: data quality begins at collection. Preventing bad data at the point of ingestion avoids costly data cleaning and missing-value imputation later in the pipeline.',
  },
  {
    id: 'barish-alert',
    slugs: ['barish-alert'],
    seo: {
      title: 'Barish Alert Weather App Case Study | Mudassir Javed',
      description:
        'Case study on meteorological API telemetry ingestion, dynamic unit transformations, exponential backoff retries, and dashboard reporting by Mudassir Javed.',
      canonical: 'https://mudassirdandor.vercel.app/projects/barish-alert',
      ogImage: 'https://mudassirdandor.vercel.app/images/projects/barish-alert.webp',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'Barish Alert Weather Application Case Study',
        name: 'Barish Alert — Weather Application',
        description:
          'Case study on meteorological API telemetry ingestion, dynamic unit transformations, exponential backoff retries, and dashboard reporting by Mudassir Javed.',
        url: 'https://mudassirdandor.vercel.app/projects/barish-alert',
        image: 'https://mudassirdandor.vercel.app/images/projects/barish-alert.webp',
        author: {
          '@type': 'Person',
          name: 'Mudassir Javed',
          url: 'https://mudassirdandor.vercel.app/',
        },
        inLanguage: 'en-US',
      },
    },
    title: 'Barish Alert — Weather Application',
    subtitle: 'Third-Party Meteorological API Ingestion, Dynamic Unit Transformations, and Resilient Multi-Metric Visual Reporting',
    category: 'API Data & Visualization',
    role: 'Frontend & API Integration Developer',
    liveUrl: 'https://barishalert.netlify.app/',
    githubUrl: 'https://github.com/mudassirdandor/weatherapp',
    image: '/images/projects/barish-alert.webp',
    imageAlt: 'Barish Alert Weather application presenting live meteorological metrics and 5-day forecast cards',
    overview:
      'A responsive weather intelligence dashboard that ingests live meteorological data and 5-day forecasts from OpenWeatherMap APIs. Built with modular JavaScript, it implements geolocation and text-based geocoding, client-side unit transformation formulas, exponential backoff network retries, response caching, and a multi-variable dashboard presenting temperature, humidity, atmospheric pressure, wind velocity, and visibility.',
    problemContext: [
      'Public weather APIs produce nested, raw JSON payloads in Kelvin units with multi-dimensional forecast arrays that must be parsed, filtered, and converted for human consumption.',
      'Mobile users often experience intermittent network drops and repeated queries for the same city, which can trigger API rate-limit throttling without caching.',
      'Users need both immediate snapshot conditions and multi-day temporal forecast trends in a clean visual layout.',
    ],
    dataAndInputs: {
      description:
        'External telemetry ingested from OpenWeatherMap REST endpoints alongside device GPS coordinates:',
      source: 'OpenWeatherMap Weather & 5-Day Forecast APIs; browser Geolocation API',
      fields: [
        { name: 'Geographic Coordinates', detail: 'Latitude and Longitude derived from GPS or Geocoding API' },
        { name: 'Ambient Temperature', detail: 'Raw Kelvin values converted dynamically to Celsius (°C) and Fahrenheit (°F)' },
        { name: 'Feels-Like Metric', detail: 'Apparent temperature factoring humidity and wind chill' },
        { name: 'Relative Humidity', detail: 'Percentage of atmospheric moisture' },
        { name: 'Wind Velocity', detail: 'Wind speed converted to kilometers per hour (km/h)' },
        { name: 'Atmospheric Pressure', detail: 'Barometric pressure measured in hectopascals (hPa)' },
        { name: 'Optical Visibility', detail: 'Maximum sight distance in kilometers' },
        { name: '5-Day Forecast Matrix', detail: 'Temporal timeseries array sampled at 3-hour intervals' },
      ],
    },
    approachAndWorkflow: {
      summary:
        'Structured pipeline from location resolution to resilient data fetching, transformation, and visual rendering.',
      steps: [
        {
          title: '1. Location Resolution',
          description:
            'Users can trigger browser geolocation (navigator.geolocation) or input a city query, which queries the OpenWeather geocoding endpoint to resolve coordinate pairs.',
        },
        {
          title: '2. Resilient API Fetching with Exponential Backoff',
          description:
            'Requests are mediated through a retry handler with exponential backoff to handle transient network hiccups gracefully without crashing the UI.',
        },
        {
          title: '3. Response Caching Layer',
          description:
            'Cached responses in memory prevent duplicate API calls when searching for recently queried cities within the session.',
        },
        {
          title: '4. Mathematical Transformation Pipeline',
          description:
            'Converts thermodynamic Kelvin temperatures to user-selected Celsius or Fahrenheit units and formats atmospheric readings into standardized metrics.',
        },
        {
          title: '5. Multi-Metric Dashboard & Trend Visuals',
          description:
            'Renders current weather cards, atmospheric condition grids, a 5-day forecast strip, and saves query history in LocalStorage for quick recall.',
        },
      ],
    },
    processingAndAnalysis: {
      summary:
        'Data transformations and analytical algorithms implemented in client modules:',
      points: [
        'Thermodynamic Unit Conversion: Formulas T(°C) = T(K) - 273.15 and T(°F) = (T(K) - 273.15) * 9/5 + 32 applied dynamically upon unit toggle.',
        'Exponential Backoff Logic: Automatically doubles delay time on consecutive failed fetches before surfacing error states.',
        'Temporal Timeseries Aggregation: Groups 3-hour forecast timestamps into discrete 24-hour daily forecast summaries.',
        'History State Persistence: Manages FIFO queue of recent search queries serialized to LocalStorage.',
      ],
    },
    resultsAndOutputs: {
      summary:
        'Operational outcomes and observable dashboard features:',
      outputs: [
        'Live weather dashboard deployed at barishalert.netlify.app.',
        'Real-time atmospheric telemetry cards displaying current temperature, feels-like, humidity, wind, pressure, and visibility.',
        '5-day prospective meteorological forecast card grid.',
        'Instantaneous unit toggle between metric (°C) and imperial (°F) without page reload.',
        'Persistent search history list enabling rapid re-querying.',
      ],
    },
    toolsAndTechnologies: [
      'JavaScript (ES6+ Modules)',
      'OpenWeatherMap REST API',
      'HTML5 Geolocation API',
      'Tailwind CSS',
      'LocalStorage API',
      'Modern Asynchronous Fetch API',
    ],
    keyTakeaway:
      'Highlights experience working with real-time external API pipelines: error-resilient fetching, data transformation and unit conversions, in-memory caching, and multi-variable metric presentation.',
  },
  {
    id: 'respondent-data-collection',
    slugs: ['respondent-data-collection', 'respondent-data-collection-chatbot'],
    seo: {
      title: 'Respondent Data Collection Case Study | Mudassir Javed',
      description:
        'Case study on automated respondent data collection, Google Sheets integration, and Google Apps Script email notification workflows by Mudassir Javed.',
      canonical: 'https://mudassirdandor.vercel.app/projects/respondent-data-collection',
      ogImage: 'https://mudassirdandor.vercel.app/images/projects/respondent-chatbot.webp',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'Respondent Data Collection Chatbot & Workflow Case Study',
        name: 'Respondent Data Collection Chatbot',
        description:
          'Case study on automated respondent data collection, Google Sheets integration, and Google Apps Script email notification workflows by Mudassir Javed.',
        url: 'https://mudassirdandor.vercel.app/projects/respondent-data-collection',
        image: 'https://mudassirdandor.vercel.app/images/projects/respondent-chatbot.webp',
        author: {
          '@type': 'Person',
          name: 'Mudassir Javed',
          url: 'https://mudassirdandor.vercel.app/',
        },
        inLanguage: 'en-US',
      },
    },
    title: 'Respondent Data Collection Chatbot',
    subtitle: 'Structured Donor & Respondent Data Intake, Google Sheets Record Archival, and Automated Notification Routing',
    category: 'Data Collection & Automation',
    role: 'Frontend & Automation Developer',
    liveUrl: 'https://saylani-rotibank-mu.vercel.app/',
    githubUrl: 'https://github.com/mudassirdandor/Saylani_rotibank',
    image: '/images/projects/respondent-chatbot.webp',
    imageAlt: 'Respondent and Donor Data Collection Chatbot with conversational interaction interface',
    overview:
      'A web-based data collection portal and conversational interface developed to capture respondent and donor inquiries. The system combines an intuitive web interface with an embedded Dialogflow conversational assistant, automated submission processing via Google Apps Script, structured record storage in Google Sheets, and automated notification routing to the project owner\'s inbox. Designed to test real-world automated intake pipelines without administrative overhead.',
    problemContext: [
      'Community assistance and donation intake workflows typically rely on manual messaging or unassisted web forms that suffer from high drop-off and incomplete inputs.',
      'Manual monitoring of spreadsheets or contact forms introduces administrative latency that delays outreach to donors and respondents.',
      'The project required an accessible, low-friction conversational interface that captures verified respondent attributes and dispatches immediate notification alerts upon submission.',
    ],
    dataAndInputs: {
      description:
        'The interface and conversational workflow collect structured respondent contact, inquiry, and donation intent details:',
      source: 'Direct user interaction via web application interface and embedded Dialogflow conversational assistant',
      fields: [
        { name: 'Respondent Name', detail: 'Full personal or organization name for identity attribution' },
        { name: 'Contact Email', detail: 'Email address used for record tracking and verification' },
        { name: 'Phone Number', detail: 'Contact number for direct donor or respondent coordination' },
        { name: 'Inquiry Category', detail: 'Type of engagement (donation offer, food assistance, or volunteer interest)' },
        { name: 'Contribution Details', detail: 'Specific food items, quantity, or logistical preferences for intake' },
        { name: 'Location / City', detail: 'Geographic reference for local distribution and resource routing' },
        { name: 'Submission Timestamp', detail: 'ISO standard datetime recorded automatically upon trigger execution' },
      ],
    },
    approachAndWorkflow: {
      summary:
        'End-to-end data pipeline connecting user interaction, automation scripts, spreadsheet persistence, and notification dispatch.',
      steps: [
        {
          title: '1. Conversational Intake & Form Interaction',
          description:
            'Visitors navigate the web application and interact with the conversational assistant or submission interface to submit respondent details and contribution information.',
        },
        {
          title: '2. Submission Validation & Parameter Extraction',
          description:
            'Inputs are captured and structured into key-value pairs representing respondent identity, contact information, and contribution attributes.',
        },
        {
          title: '3. Google Apps Script Trigger Execution',
          description:
            'Upon form completion, a configured Google Apps Script webhook/trigger receives the submission payload for automated serverless processing.',
        },
        {
          title: '4. Google Sheets Record Storage',
          description:
            'The automation appends a new chronological record into a designated Google Spreadsheet, creating a permanent, audit-ready data repository.',
        },
        {
          title: '5. Owner Email Notification Dispatch',
          description:
            'Google Apps Script executes automated email notification routing to dispatch an instant summary of the submission details directly to the project owner\'s inbox.',
        },
      ],
    },
    processingAndAnalysis: {
      summary:
        'Data handling, transformation, and automation mechanics applied during the submission lifecycle:',
      points: [
        'Payload Normalization: Incoming conversational parameters are cleansed of redundant whitespace and mapped to standard spreadsheet column definitions.',
        'Append-Only Auditing: Submissions are appended as discrete chronological rows with automated timestamping to maintain data integrity.',
        'Serverless Automation Trigger: Google Apps Script acts as a lightweight serverless middleware connecting the frontend intake to cloud spreadsheets without requiring dedicated backend server hosting.',
        'Notification Templating: The automation formats submission fields into a clear, scannable notification message sent to the owner inbox.',
        'Demo Environment Consideration: As a demonstration deployment, the live application demonstrates the interaction flow while notification dispatch is scoped to the verified project owner.',
      ],
    },
    resultsAndOutputs: {
      summary:
        'Verified deliverables and operational capabilities of the deployed system:',
      outputs: [
        'Live interactive demonstration hosted on Vercel at saylani-rotibank-mu.vercel.app.',
        'Open-source frontend repository published on GitHub (mudassirdandor/Saylani_rotibank).',
        'Embedded Dialogflow virtual assistant for interactive conversational guidance.',
        'Structured automated intake pipeline logging entries into Google Sheets.',
        'Automated email notification workflow alerting the project owner upon new respondent submission.',
        'Zero-maintenance serverless automation eliminating manual data transcription.',
      ],
    },
    toolsAndTechnologies: [
      'Google Apps Script',
      'Google Sheets',
      'Dialogflow Messenger',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'HTML5 / CSS3',
      'Vercel Hosting',
    ],
    keyTakeaway:
      'Demonstrates the integration of conversational intake with cloud automation tools (Google Apps Script & Google Sheets) to create self-managing data pipelines that capture structured information and deliver instant notifications without infrastructure maintenance.',
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  const normalized = slug.trim().toLowerCase();
  return CASE_STUDIES.find((cs) => cs.slugs.includes(normalized) || cs.id === normalized);
}
