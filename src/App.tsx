import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useSEO } from "./hooks/useSEO";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import AnimatedCounter from "./components/AnimatedCounter";
import ExecutiveRail from "./components/ExecutiveRail";
import NotFound from "./components/NotFound";

import HomeHero from "./components/HomeHero";
import HomeTrustBar from "./components/HomeTrustBar";
import ProblemRegister from "./components/ProblemRegister";
import SolutionsOverview from "./components/SolutionsOverview";
import FeaturedProjects from "./components/FeaturedProjects";
import CertGrid from "./components/CertGrid";
import RecognitionShowcase from "./components/RecognitionShowcase";
import HowIWork from "./components/HowIWork";
import LatestInsights from "./components/LatestInsights";
import Footer from "./components/Footer";

import { 
  SkeletonPulse, 
  TextSkeleton, 
  CardSkeleton, 
  ProjectThumbnailSkeleton, 
  KnowledgeCardSkeleton, 
  ResumePreviewSkeleton 
} from "./components/Skeleton";

// Lazy load large components to reduce initial bundle size & optimize core web vitals
const DashboardSandbox = lazy(() => import("./components/DashboardSandbox"));
const Projects = lazy(() => import("./components/Projects"));
const About = lazy(() => import("./components/About"));
const EvidenceCenter = lazy(() => import("./components/EvidenceCenter"));
const AIAutomation = lazy(() => import("./components/AIAutomation"));
const LocalBI = lazy(() => import("./components/LocalBI"));
const Insights = lazy(() => import("./components/Insights"));
const Solutions = lazy(() => import("./components/Solutions"));
const ConsultingFramework = lazy(() => import("./components/ConsultingFramework"));

function InitialLoader({ onComplete }: { onComplete: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Elegant quick 850ms duration load screen
    const timer = setTimeout(() => {
      onComplete();
    }, 850);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-0 bg-slate-50 z-[9999] flex flex-col items-center justify-center select-none"
      role="status"
      aria-label="Loading Mudassir Javed Portfolio"
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Minimal Monogram Reveal */}
        <motion.div
          initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-16 h-16 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-3xl shadow-lg"
        >
          <span className="font-mono text-xl">M</span>
          <div className="absolute inset-1 rounded-lg bg-white/5" />
        </motion.div>

        {/* Brand Text Reveal */}
        <div className="flex flex-col items-center text-center space-y-1">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="font-bold text-slate-900 tracking-wider text-[17px] font-sans"
          >
            mudassirdandor
          </motion.span>
          <motion.span
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold"
          >
            BI & Data Analytics
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

function PageLoading() {
  return (
    <div 
      className="w-full max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12"
      role="status"
      aria-live="polite"
    >
      <div className="space-y-3">
        <SkeletonPulse className="h-10 w-1/4 rounded-xl" />
        <SkeletonPulse className="h-4.5 w-1/2 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

function BusinessImpactMetrics() {
  return (
    <section className="py-24 bg-white border-t border-slate-200 overflow-hidden relative" aria-label="Business Impact Metrics">
      {/* Background desaturated decorative gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/[0.01] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest text-emerald-600 uppercase">Quantifiable Value Delivery</span>
          </div>
          <h2 className="text-[clamp(2.1rem,3vw,2.5rem)] font-bold tracking-[-0.01em] text-slate-950 font-display leading-[1.2]">
            Business Impact Metrics
          </h2>
          <p className="text-[12px] font-mono text-slate-500 mt-2 uppercase tracking-wider">
            Consolidated operational results across automated systems & local business visibility
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              value: "$420K+",
              label: "Operational Savings",
              sub: "Saved via intelligent AI workflows, automated report generation, and automated process pipelines."
            },
            {
              value: "32%",
              label: "Local Visibility Growth",
              sub: "Average organic ranking improvement on Google Maps for local retail client groups within 90 days."
            },
            {
              value: "99.8%",
              label: "Pipeline Accuracy",
              sub: "Ingestion accuracy and strict schema validation across financial and customer transaction systems."
            },
            {
              value: "11",
              label: "Enterprise Case Studies",
              sub: "Fully detailed analytical frameworks, diagnostics, and customized dashboard solutions deployed."
            }
          ].map((metric, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, boxShadow: "0 10px 25px -8px rgba(0, 0, 0, 0.05)" }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-slate-200/80 transition-all duration-350 hover:bg-white"
            >
              <span className="block text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                <AnimatedCounter value={metric.value} />
              </span>
              <h3 className="text-xs font-bold text-slate-800 mb-1.5">{metric.label}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{metric.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(() => {
    if (typeof window !== "undefined") {
      const isLoaded = sessionStorage.getItem("portfolio-v6-loaded");
      return isLoaded !== "true";
    }
    return true;
  });
  const [activeSection, setActiveSection] = useState("home-hero");
  const [scrollPercent, setScrollPercent] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const navType = useNavigationType();

  const scrollPositions = useRef<Record<string, number>>({});

  // Parse location to find currentPage pageId
  const getPageIdFromPath = (pathname: string): string => {
    switch (pathname) {
      case "/":
        return "home";
      case "/solutions":
        return "solutions";
      case "/projects":
      case "/case-studies":
        return "case-studies";
      case "/evidence-lab":
        return "evidence-lab";
      case "/insights":
        return "insights";
      case "/consulting":
        return "consulting";
      case "/about":
        return "about";
      case "/contact":
        return "contact";
      case "/certifications":
        return "certifications";
      default:
        return "not-found";
    }
  };

  const currentPage = getPageIdFromPath(location.pathname);

  const handleLoaderComplete = () => {
    setIsInitialLoading(false);
    sessionStorage.setItem("portfolio-v6-loaded", "true");
  };

  // Call dynamic production-quality SEO manager
  useSEO({ currentPage });

  // Scroll position logger & restoration
  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.current[location.pathname] = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const savedPos = scrollPositions.current[location.pathname] || 0;
    if (navType === "POP") {
      // Small timeout to allow render of lazy elements
      const timer = setTimeout(() => {
        window.scrollTo(0, savedPos);
      }, 35);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navType]);

  useEffect(() => {
    if (currentPage !== "home") return;

    const handleScroll = () => {
      // Calculate overall page reading progress
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercent(scrolled);

      // Detect active section on scroll
      const sections = [
        "home-hero",
        "featured-projects",
        "solutions-overview",
        "recognition-showcase",
        "how-i-work",
        "latest-insights",
        "contact",
        "global-footer"
      ];

      // Check if at absolute bottom of page to force Footer active state
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection("global-footer");
        return;
      }

      let currentActive = "home-hero";
      const threshold = 160; // Offset alignment matching scroll experience

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentActive = sectionId;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initially to set active section
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReduced ? "auto" : "smooth"
      });
    }
  };

  const handleNavigate = (pageId: string) => {
    let path = "/";
    switch (pageId) {
      case "home":
        path = "/";
        break;
      case "solutions":
        path = "/solutions";
        break;
      case "case-studies":
        path = "/projects";
        break;
      case "evidence-lab":
        path = "/evidence-lab";
        break;
      case "insights":
        path = "/insights";
        break;
      case "consulting":
        path = "/consulting";
        break;
      case "about":
        path = "/about";
        break;
      case "contact":
        path = "/contact";
        break;
      case "certifications":
        path = "/certifications";
        break;
      default:
        path = "/";
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <AnimatePresence mode="wait">
        {isInitialLoading && (
          <InitialLoader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      <Suspense fallback={<PageLoading />}>
        {/* v4.0 BRAND PORTFOLIO CONTAINER */}
        <motion.div 
          initial={{ opacity: isInitialLoading ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-brand-bg-primary text-brand-body min-h-screen selection:bg-blue-100 selection:text-blue-900 flex-1 flex flex-col"
        >
          {/* Sleek top ambient glow bar */}
          <div className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent z-50 pointer-events-none" />

          {/* High-end transparent glass navigation */}
          <Navbar currentPage={currentPage} onNavigate={handleNavigate} activeSection={activeSection} />

          {/* Fixed Guided Reading Navigation Rail */}
          {currentPage === "home" && (
            <ExecutiveRail
              activeSection={activeSection}
              scrollPercent={scrollPercent}
              onScrollToSection={scrollToSection}
            />
          )}

          {/* Main Multi-Page Frame */}
          <main className="w-full relative flex-1 pt-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
              >
                {currentPage === "home" && (
                  <>
                    {/* 1. Hero Frame */}
                    <HomeHero onNavigate={handleNavigate} />
                    
                    {/* 2. Trust & Credentials */}
                    <HomeTrustBar />

                    {/* 3. Featured Case Studies */}
                    <FeaturedProjects onNavigate={handleNavigate} />

                    {/* 4. Challenges I Help Solve */}
                    <ProblemRegister />

                    {/* 5. How I Deliver Results */}
                    <SolutionsOverview onNavigate={handleNavigate} />

                    {/* 6. Professional Recognition */}
                    <RecognitionShowcase onNavigate={handleNavigate} />

                    {/* 7. Working Process */}
                    <HowIWork />

                    {/* 8. Latest Insights */}
                    <LatestInsights onNavigate={handleNavigate} />

                    {/* 9. Contact (Premium Consulting Experience) */}
                    <Contact />
                  </>
                )}

                {currentPage === "solutions" && (
                  <Suspense fallback={
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12">
                      <div className="space-y-3">
                        <SkeletonPulse className="h-10 w-1/4 rounded-xl" />
                        <SkeletonPulse className="h-4.5 w-1/2 rounded" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                      </div>
                    </div>
                  }>
                    <Solutions onNavigate={handleNavigate} />
                  </Suspense>
                )}

                {currentPage === "case-studies" && (
                  <Suspense fallback={
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12">
                      <div className="flex justify-between items-center pb-6 border-b border-slate-150">
                        <SkeletonPulse className="h-10 w-1/4 rounded-xl" />
                        <div className="flex gap-2">
                          <SkeletonPulse className="h-8 w-20 rounded-full" />
                          <SkeletonPulse className="h-8 w-20 rounded-full" />
                          <SkeletonPulse className="h-8 w-20 rounded-full" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ProjectThumbnailSkeleton />
                        <ProjectThumbnailSkeleton />
                        <ProjectThumbnailSkeleton />
                      </div>
                    </div>
                  }>
                    {/* Full Database of 11 case studies */}
                    <Projects featuredOnly={false} onNavigate={handleNavigate} />
                  </Suspense>
                )}

                {currentPage === "evidence-lab" && (
                  <Suspense fallback={
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12">
                      <div className="space-y-3">
                        <SkeletonPulse className="h-10 w-1/3 rounded-xl" />
                        <SkeletonPulse className="h-4.5 w-1/2 rounded" />
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                          <CardSkeleton />
                          <CardSkeleton />
                        </div>
                        <div>
                          <ResumePreviewSkeleton />
                        </div>
                      </div>
                    </div>
                  }>
                    {/* Evidence Center (Supporting artifacts & technical deliverables) */}
                    <EvidenceCenter onNavigate={handleNavigate} />
                  </Suspense>
                )}

                {currentPage === "insights" && (
                  <Suspense fallback={
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12">
                      <div className="space-y-3">
                        <SkeletonPulse className="h-10 w-1/4 rounded-xl" />
                        <SkeletonPulse className="h-4.5 w-1/3 rounded" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProjectThumbnailSkeleton />
                        <ProjectThumbnailSkeleton />
                      </div>
                    </div>
                  }>
                    {/* Specializations & Articles */}
                    <Insights onNavigate={handleNavigate} />
                  </Suspense>
                )}

                {currentPage === "consulting" && (
                  <Suspense fallback={
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12">
                      <div className="space-y-3 text-center max-w-3xl mx-auto">
                        <SkeletonPulse className="h-12 w-2/3 mx-auto rounded-xl" />
                        <SkeletonPulse className="h-4.5 w-1/2 mx-auto rounded" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                      </div>
                    </div>
                  }>
                    {/* Permanent Consulting Framework methodology page */}
                    <ConsultingFramework onNavigate={handleNavigate} />
                  </Suspense>
                )}

                {currentPage === "about" && (
                  <Suspense fallback={
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div>
                          <SkeletonPulse className="w-full aspect-[3/4] rounded-2xl" />
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                          <SkeletonPulse className="h-10 w-1/3 rounded-xl" />
                          <TextSkeleton lines={8} />
                          <div className="grid grid-cols-2 gap-4 pt-4">
                            <KnowledgeCardSkeleton />
                            <KnowledgeCardSkeleton />
                          </div>
                        </div>
                      </div>
                    </div>
                  }>
                    {/* Detailed Profile & Biography (Credibility) */}
                    <About onNavigate={handleNavigate} />
                  </Suspense>
                )}

                {currentPage === "contact" && (
                  <>
                    {/* Partner/Client Connection Console */}
                    <Contact />
                  </>
                )}

                {currentPage === "certifications" && (
                  <Suspense fallback={
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12">
                      <div className="space-y-3">
                        <SkeletonPulse className="h-10 w-1/3 rounded-xl" />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <SkeletonPulse className="h-12 rounded-xl" />
                          <SkeletonPulse className="h-12 rounded-xl" />
                          <SkeletonPulse className="h-12 rounded-xl" />
                          <SkeletonPulse className="h-12 rounded-xl" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, idx) => (
                          <KnowledgeCardSkeleton key={idx} />
                        ))}
                      </div>
                    </div>
                  }>
                    <CertGrid isHomepagePreview={false} onNavigate={handleNavigate} />
                  </Suspense>
                )}

                {currentPage === "not-found" && (
                  <NotFound onNavigate={handleNavigate} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Global Footer */}
          <Footer onNavigate={handleNavigate} />
        </motion.div>
      </Suspense>
    </div>
  );
}

