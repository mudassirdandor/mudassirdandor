import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { badgesData, Badge } from "../data/badges";
import { getRevealVariants, VIEWPORT_CONFIG } from "../utils/motion";

interface RecognitionShowcaseProps {
  onNavigate: (page: string) => void;
}

interface BadgeDetails {
  type: string;
  description: string;
}

const getBadgeDetails = (badgeId: string): BadgeDetails => {
  const detailsMap: Record<string, BadgeDetails> = {
    "google-data-analytics": {
      type: "Professional Certificate",
      description: "Equips learners with in-depth training in data processing, analysis, visualization, and programming languages like R and SQL.",
    },
    "google-adv-data-analytics": {
      type: "Professional Certificate",
      description: "Advanced curriculum focusing on statistical modeling, machine learning algorithms, and high-level predictive analytics using Python.",
    },
    "google-business-intelligence": {
      type: "Professional Certificate",
      description: "Covers data warehousing, ETL pipelines, custom dashboard design, and translating business requirements into technical BI assets.",
    },
    "google-project-management": {
      type: "Professional Certificate",
      description: "Provides comprehensive preparation for project leadership, Agile methodologies, scrum frameworks, and strategic resource allocation.",
    },
    "google-cybersecurity": {
      type: "Professional Certificate",
      description: "Focuses on security operations, threat detection, network protection, incident response, and scripting for cybersecurity analysts.",
    },
    "google-ux-design": {
      type: "Professional Certificate",
      description: "Comprehensive training in user experience research, design sprints, wireframing, high-fidelity prototyping, and usability testing.",
    },
    "google-it-support": {
      type: "Professional Certificate",
      description: "Foundational training in networking, hardware troubleshooting, operating systems, system administration, and technical support protocols.",
    },
    "google-it-automation": {
      type: "Professional Certificate",
      description: "Advanced automation workflows utilizing Python, git version control, system orchestration, and scalable IT infrastructure scripting.",
    },
    "google-digital-marketing": {
      type: "Professional Certificate",
      description: "Covers multi-channel customer acquisition, e-commerce optimization, SEO strategy, paid marketing metrics, and brand positioning.",
    },
    "google-agile-essentials": {
      type: "Specialization Certificate",
      description: "Validates fluency in Agile values, scrum practices, sprint planning, and modern team collaboration frameworks.",
    },
    "google-network-security": {
      type: "Technical Qualification",
      description: "Advanced security concepts including secure protocols, cryptographic standards, firewalls, and defense-in-depth network topology.",
    },
    "google-data-analysis-with-python": {
      type: "Technical Qualification",
      description: "Hands-on data science workflows using Python libraries including NumPy, Pandas, Matplotlib, and Seaborn for statistical modeling.",
    },
    "google-ux-practitioner": {
      type: "Professional Qualification",
      description: "Validates hands-on competency in product design, low-fidelity wireframing, interactive workflows, and digital user research.",
    },
    "google-cloud-fundamentals": {
      type: "Cloud Certification",
      description: "Comprehensive overview of Google Cloud services, architectural components, deployment strategies, and security paradigms.",
    },
    "derive-insights-from-bigquery-data-skill-badge": {
      type: "Google Cloud Skill Badge",
      description: "Verifies hands-on expertise in querying large datasets, writing optimized SQL joins, and extracting valuable business intelligence with Google BigQuery.",
    },
    "analyze-and-visualize-looker-data-skill-badge": {
      type: "Google Cloud Skill Badge",
      description: "Validates practical proficiency in creating Looker dashboards, modeling data with LookML, and enabling self-service analytics.",
    },
    "engineer-ai-agents-with-agent-development-kit-adk": {
      type: "Google Cloud Skill Badge",
      description: "Validates skills in design, deployment, and optimization of generative AI agents utilizing Google Vertex AI and the Agent Development Kit (ADK).",
    },
    "google-ai-essentials": {
      type: "Specialization Certificate",
      description: "Foundational expertise in using generative AI tools to automate tasks, summarize text, draft emails, and boost everyday productivity.",
    },
    "google-prompting-essentials": {
      type: "Specialization Certificate",
      description: "Mastering practical generative AI prompts, chain-of-thought orchestration, model fine-tuning guidance, and ethical AI utilization.",
    },
    "google-educator-l1": {
      type: "Professional Qualification",
      description: "Demonstrates fundamental digital literacy and classroom technology integration across core Google Workspace for Education tools.",
    },
    "google-educator-l2": {
      type: "Professional Qualification",
      description: "Validates advanced instructional design, complex collaboration methodologies, and technical integration of digital classrooms.",
    },
    "google-workspace-admin": {
      type: "Enterprise Administration",
      description: "Covers domain configuration, user directory provisioning, access control, software integrations, and mobile device policies.",
    },
    "google-workspace-security": {
      type: "Enterprise Security",
      description: "Focuses on threat management, data loss prevention rules, custom routing controls, security reports, and advanced auditing.",
    },
    "gcloud-bigquery-ml-badge": {
      type: "Google Cloud Skill Badge",
      description: "Validates hands-on knowledge of training, evaluating, and deploying machine learning models directly inside Google BigQuery using SQL.",
    },
    "google-analytics-individual": {
      type: "Professional Certification",
      description: "Official credential demonstrating proficiency in Google Analytics 4 (GA4) configuration, event tracking, custom reports, and data analysis.",
    },
    "google-data-driven-decision-making": {
      type: "Specialization Certificate",
      description: "Focuses on data evaluation frameworks, identifying biases, structuring quantitative evidence, and driving business decisions.",
    },
    "google-digital-customer-engagement": {
      type: "Specialization Certificate",
      description: "Validates mastery in optimizing touchpoints, retention strategies, feedback loops, and customer relationship management.",
    },
    "google-stakeholder-management": {
      type: "Specialization Certificate",
      description: "Equips professionals with skills for expectations alignment, clear communication, risk mitigation, and collaborative negotiation.",
    },
    "gcloud-manage-looker-models-badge": {
      type: "Google Cloud Skill Badge",
      description: "Demonstrates advanced skill in defining views, designing dimensional models, and writing complex LookML for reliable enterprise analytics.",
    },
  };

  return detailsMap[badgeId] || {
    type: "Professional Credential",
    description: "Official digital credential issued by leading industry providers, validating core professional competencies and technical skill domains.",
  };
};

export default function RecognitionShowcase({ onNavigate }: RecognitionShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = getRevealVariants("upward", shouldReduceMotion);

  // Exclude badges without physical images from the homepage carousel
  const carouselBadges = badgesData.filter((badge) => {
    const nonExistentIds = [
      "google-ux-design",
      "google-ux-practitioner",
      "google-cloud-fundamentals",
      "google-ai-essentials",
      "google-educator-l1",
      "google-educator-l2",
      "google-workspace-admin",
      "google-workspace-security",
    ];
    return !nonExistentIds.includes(badge.id);
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedModalBadge, setSelectedModalBadge] = useState<Badge | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + carouselBadges.length) % carouselBadges.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselBadges.length);
  };

  const handleSelectBadge = (index: number) => {
    setActiveIndex(index);
  };

  const handleBadgeClick = (badge: Badge, index: number) => {
    setActiveIndex(index);
    setSelectedModalBadge(badge);
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Prevent background scrolling while modal is open and handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedModalBadge(null);
      }
    };
    if (selectedModalBadge) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedModalBadge]);

  // Get cyclic badges for the 7 positions: offsets [-3, -2, -1, 0, 1, 2, 3]
  const offsets = [-3, -2, -1, 0, 1, 2, 3];
  
  const getCyclicBadgeInfo = (offset: number) => {
    const idx = (activeIndex + offset + carouselBadges.length) % carouselBadges.length;
    return {
      badge: carouselBadges[idx],
      index: idx,
    };
  };

  const activeBadge = carouselBadges[activeIndex];

  // Helper to render high-fidelity fallback vector emblem for the badge
  const renderFallbackEmblem = (badge: Badge, isCenter: boolean) => {
    const isGoogle = badge.provider.toLowerCase().includes("google");
    const initials = badge.title
      .split(" ")
      .filter((w) => w.length > 0)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

    return (
      <div
        className={`w-full h-full rounded-full flex flex-col items-center justify-center relative transition-all duration-300 ${
          isCenter
            ? "bg-slate-900 text-white border-2 border-blue-600 shadow-md"
            : "bg-slate-100 text-slate-500 border border-slate-200"
        }`}
      >
        {/* Abstract Inner Pattern */}
        {isCenter && (
          <div className="absolute inset-0.5 rounded-full border border-blue-400/30 animate-pulse" />
        )}
        <span
          className={`font-mono font-bold leading-none tracking-tight ${
            isCenter ? "text-[14px]" : "text-[10px]"
          }`}
        >
          {initials}
        </span>
        <span
          className={`font-sans font-semibold uppercase tracking-widest scale-75 block text-center leading-none ${
            isCenter ? "text-[6px] text-blue-400" : "text-[4.5px] text-slate-400"
          }`}
        >
          {isGoogle ? "GGL" : "CRD"}
        </span>
      </div>
    );
  };

  return (
    <motion.section
      id="recognition-showcase"
      className="py-8 md:py-10 bg-slate-50 border-b border-slate-200 px-6 md:px-8 relative"
      aria-label="Professional Recognition Showcase"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={variants}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-2 md:gap-3">
        {/* Header Row: Title & Explore All side-by-side (Graceful mobile wrapping) */}
        <div className="flex flex-row items-center justify-between flex-wrap gap-2">
          <h2 className="text-[18px] md:text-[20px] font-bold text-slate-950 font-display tracking-tight">
            Professional Recognition
          </h2>
          <button
            onClick={() => onNavigate("certifications")}
            className="flex items-center gap-1 text-[13px] font-mono text-slate-600 hover:text-blue-600 font-bold tracking-wider uppercase transition-colors cursor-pointer group bg-transparent border-none p-0"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Carousel Belt Container (Occupies 85-90% on Desktop, breathing space) */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4">
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-slate-300 transition-all shadow-3xs hover:shadow-2xs cursor-pointer active:scale-95 flex-shrink-0"
            aria-label="Previous badge"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Transparent Floating Badge Strip */}
          <div className="flex-grow flex items-center justify-center overflow-hidden py-1.5 relative">
            <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 px-2 w-full" aria-hidden="true">
              {offsets.map((offset) => {
                const { badge, index } = getCyclicBadgeInfo(offset);
                const isCenter = offset === 0;
                const hasError = imageErrors[badge.id];

                // Precise responsive size mapping & opacities
                let sizeClass = "";
                let opacityClass = "";
                let activeClasses = "";

                if (offset === -3 || offset === 3) {
                  // Far outer Left/Right (Desktop: 56px, Hidden on Mobile/Tablet)
                  sizeClass = "hidden md:flex md:w-[56px] md:h-[56px]";
                  opacityClass = "opacity-70 hover:opacity-100";
                  activeClasses = "";
                } else if (offset === -2 || offset === 2) {
                  // Outer Left/Right (Desktop: 68px, Mobile: 56px)
                  sizeClass = "w-[56px] h-[56px] md:w-[68px] md:h-[68px]";
                  opacityClass = "opacity-80 hover:opacity-100";
                  activeClasses = "";
                } else if (offset === -1 || offset === 1) {
                  // Neighbour Left/Right (Desktop: 82px, Mobile: 70px)
                  sizeClass = "w-[70px] h-[70px] md:w-[82px] md:h-[82px]";
                  opacityClass = "opacity-90 hover:opacity-100";
                  activeClasses = "";
                } else {
                  // Center Active (Desktop: 115px, Mobile: 90px)
                  sizeClass = "w-[90px] h-[90px] md:w-[115px] md:h-[115px]";
                  opacityClass = "opacity-100";
                  activeClasses = "shadow-md ring-2 ring-blue-600 ring-offset-2 ring-offset-slate-50";
                }

                return (
                  <button
                    key={`${badge.id}-${offset}`}
                    onClick={() => handleBadgeClick(badge, index)}
                    className={`rounded-full transition-all duration-200 ease-out cursor-pointer relative flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${sizeClass} ${opacityClass} ${activeClasses} hover:scale-105 active:scale-95`}
                    title={badge.title}
                  >
                    {!hasError ? (
                      <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-2xs flex items-center justify-center p-0.5">
                        <img
                          src={badge.image}
                          alt={badge.title}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError(badge.id)}
                        />
                      </div>
                    ) : (
                      renderFallbackEmblem(badge, isCenter)
                    )}

                    {/* Blue Indicator Dot for Center */}
                    {isCenter && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-slate-300 transition-all shadow-3xs hover:shadow-2xs cursor-pointer active:scale-95 flex-shrink-0"
            aria-label="Next badge"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Active Badge Meta Row: Tight Connected Vertical Information Stack */}
        <div className="text-center mt-0.5 animate-fade-in px-4 flex flex-col items-center gap-0.5 md:gap-1 max-w-xl mx-auto">
          {/* Verified Chip */}
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/50 mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[9px] font-semibold font-mono text-emerald-700 uppercase tracking-wider">
              Verified Credential
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-[13.5px] md:text-[14.5px] font-bold text-slate-900 tracking-tight leading-tight">
            {activeBadge.title}
          </h3>

          {/* Provider */}
          <span className="text-slate-500 font-medium text-[11px] md:text-[11.5px] font-mono uppercase tracking-wider">
            {activeBadge.provider}
          </span>

          {/* Verify Link */}
          <a
            href={activeBadge.verificationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[11px] text-blue-600 hover:text-blue-700 font-mono font-bold hover:underline mt-0.5"
          >
            <span>Verify Badge</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Premium Badge Modal */}
      <AnimatePresence>
        {selectedModalBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModalBadge(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-2xl w-full overflow-hidden relative flex flex-col md:flex-row z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Large Badge Image */}
              <div className="w-full md:w-[280px] bg-slate-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-100 flex-shrink-0">
                <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] flex items-center justify-center bg-white rounded-full p-2 shadow-2xs">
                  <img
                    src={selectedModalBadge.image}
                    alt={selectedModalBadge.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Side: Information */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[10px] font-semibold font-mono uppercase tracking-wider text-blue-600 block mb-1">
                    {selectedModalBadge.provider}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-tight mb-2">
                    {selectedModalBadge.title}
                  </h3>
                  
                  {/* Credential Type */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-600 mb-4">
                    Type: {getBadgeDetails(selectedModalBadge.id).type}
                  </span>

                  {/* Description */}
                  <p className="text-slate-600 text-[13px] leading-relaxed mb-6">
                    {getBadgeDetails(selectedModalBadge.id).description}
                  </p>
                </div>

                {/* Stacked on mobile, side-by-side on desktop */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto w-full">
                  <a
                    href={selectedModalBadge.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-center text-xs font-bold transition-all duration-200 shadow-3xs shadow-blue-500/10 hover:shadow-2xs cursor-pointer flex items-center justify-center gap-1.5 animate-pulse"
                    style={{ animationDuration: '3s' }}
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedModalBadge(null)}
                    className="sm:flex-none sm:px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-center text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

