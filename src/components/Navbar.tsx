import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X, FileText, Loader2, AlertCircle } from "lucide-react";
import { useResumeDownload } from "../hooks/useResumeDownload";

interface NavbarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
  activeSection?: string;
}

/**
 * High-fidelity glassmorphic sticky Navigation Bar.
 * Integrates Multi-page state with layout indicators and CV downloading controls.
 */
export default function Navbar({ currentPage, onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  
  const shouldReduceMotion = useReducedMotion();
  const { isLoading: isResumeLoading, download: downloadResume } = useResumeDownload();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Solutions", id: "solutions" },
    { label: "Case Studies", id: "case-studies" },
    { label: "Evidence Lab", id: "evidence-lab" },
    { label: "Insights", id: "insights" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" }
  ];

  const getIsItemActive = (itemId: string) => {
    if (currentPage !== "home") {
      return currentPage === itemId;
    }
    
    // On home page, synchronize navbar highlight with active scroll section
    switch (activeSection) {
      case "home-hero":
      case "recognition-showcase":
      case "how-i-work":
        return itemId === "home";
      case "featured-projects":
        return itemId === "case-studies";
      case "solutions-overview":
        return itemId === "solutions";
      case "latest-insights":
        return itemId === "insights";
      case "contact":
      case "global-footer":
        return itemId === "contact";
      default:
        return itemId === "home";
    }
  };

  const navigateTo = (pageId: string) => {
    setIsOpen(false);
    onNavigate(pageId);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDownloadResume = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await downloadResume();
    } catch (err) {
      setShowErrorToast(true);
      setTimeout(() => {
        setShowErrorToast(false);
      }, 4000);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 border-b border-slate-200/80 backdrop-blur-xl py-2.5 shadow-xs"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2.5 group cursor-pointer focus-visible:ring-1 focus-visible:ring-blue-500 focus:outline-none active:scale-[0.98] rounded-lg p-1 transition-transform hover:-translate-y-0.5"
          aria-label="mudassirdandor - Back to top"
        >
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-base shadow-md group-hover:scale-105 transition-all group-hover:shadow-blue-500/10">
            <span className="font-mono text-sm">M</span>
            <div className="absolute inset-0.5 rounded-[6px] bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="font-bold text-slate-900 tracking-wider text-[15px] font-sans">
              mudassirdandor
            </span>
            <span className="text-[10.5px] font-mono text-slate-500 group-hover:text-blue-600 transition-colors">
              BI & DATA ANALYTICS
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/80 border border-slate-200/80 rounded-full px-2 py-1.5 backdrop-blur-md shadow-xs">
          {navItems.map((item) => {
            const isActive = getIsItemActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-[15px] font-medium tracking-wide transition-all cursor-pointer focus-visible:ring-1 focus-visible:ring-blue-500 focus:outline-none ${
                  isActive
                    ? "text-slate-950 font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeBubble"
                    className="absolute inset-0 bg-slate-100/80 border border-slate-200/50 rounded-full"
                    transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Resume CTA Action Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={handleDownloadResume}
            disabled={isResumeLoading}
            className="flex items-center gap-1.5 px-4 py-2 bg-executive-blue text-white hover:bg-blue-700 active:scale-[0.98] text-[15px] font-semibold rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer transition-all focus-visible:ring-1 focus-visible:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
            aria-label="Download Professional CV"
          >
            {isResumeLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-white" />
            )}
            {isResumeLoading ? "Loading..." : "Download Resume"}
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-950 bg-white/80 border border-slate-200/80 rounded-lg cursor-pointer focus-visible:ring-1 focus-visible:ring-blue-500 focus:outline-none"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white/95 border-b border-slate-200 backdrop-blur-2xl p-6 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`text-left py-2.5 px-3 rounded-lg text-[15px] font-medium transition-colors focus-visible:ring-1 focus-visible:ring-blue-500 focus:outline-none ${
                      isActive
                        ? "bg-slate-50 text-blue-600 font-semibold border-l-2 border-blue-500"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex flex-col gap-2">
              <button
                onClick={handleDownloadResume}
                disabled={isResumeLoading}
                className="w-full flex items-center justify-center gap-1.5 py-3 bg-executive-blue text-white active:scale-[0.98] text-[15px] font-semibold rounded-lg cursor-pointer focus-visible:ring-1 focus-visible:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Download Professional CV"
              >
                {isResumeLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <FileText className="w-4 h-4 text-white" />
                )}
                {isResumeLoading ? "Loading..." : "Download Resume"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CV Download Status Toast */}
      <AnimatePresence>
        {showErrorToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 text-slate-800 rounded-xl p-4 shadow-2xl flex items-center gap-3 max-w-sm backdrop-blur-xl"
            role="alert"
          >
            <div className="p-1.5 bg-red-50 text-red-500 rounded-lg">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-900 block">Download Failed</span>
              <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
                Unable to start the download. Please try again.
              </p>
            </div>
            <button
              onClick={() => setShowErrorToast(false)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer self-start p-0.5 hover:bg-slate-50 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
