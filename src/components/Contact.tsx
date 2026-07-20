import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import { getRevealVariants, VIEWPORT_CONFIG } from "../utils/motion";
import { 
  Send, 
  CheckCircle2, 
  Loader2, 
  Database
} from "lucide-react";
import { useContactForm } from "../hooks/useContactForm";
import { useResumeDownload } from "../hooks/useResumeDownload";
import ExecutiveCard from "./ExecutiveCard";

interface FloatingFieldProps {
  label: string;
  type?: "text" | "email" | "textarea" | "select";
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: string }[];
  rows?: number;
}

function FloatingField({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  disabled = false,
  options = [],
  rows = 4
}: FloatingFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isActive = isFocused || (value !== undefined && value !== null && value !== "");
  const characters = label.split("");
  const isTextarea = type === "textarea";
  const offset = isTextarea ? 40 : 22;

  // Stagger delays based on active/inactive transition
  const charVariants = {
    inactive: (i: number) => ({
      y: shouldReduceMotion ? 0 : [-6, 0],
      opacity: [1, 0.65],
      transition: shouldReduceMotion 
        ? { duration: 0 } 
        : {
            y: {
              type: "spring",
              stiffness: 280,
              damping: 24,
              delay: (characters.length - 1 - i) * 0.012,
            },
            opacity: {
              duration: 0.2,
              delay: (characters.length - 1 - i) * 0.012,
            }
          }
    }),
    active: (i: number) => ({
      y: shouldReduceMotion ? 0 : [6, 0],
      opacity: [0.65, 1],
      transition: shouldReduceMotion 
        ? { duration: 0 } 
        : {
            y: {
              type: "spring",
              stiffness: 280,
              damping: 24,
              delay: i * 0.012,
            },
            opacity: {
              duration: 0.2,
              delay: i * 0.012,
            }
          }
    })
  };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 350, damping: 28 };

  return (
    <div className="relative w-full text-left">
      {/* Editorial Floating Label with character animation */}
      <motion.div
        className="absolute pointer-events-none flex flex-wrap items-center font-sans font-semibold tracking-wide select-none z-10 text-[10px] sm:text-xs"
        animate={{
          left: "16px",
          x: "0%",
          top: isActive ? "0px" : isTextarea ? "28px" : "27px",
          y: "-50%",
          scale: isActive ? 0.82 : 1,
          color: isFocused ? "#2563eb" : "#64748b"
        }}
        style={{
          transformOrigin: "left center"
        }}
        transition={transition}
      >
        <span className="relative flex flex-wrap items-center bg-white px-1.5 leading-none">
          {characters.map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={charVariants}
              animate={isActive ? "active" : "inactive"}
              className="inline-block"
            >
              {char === " " ? "\u00a0" : char}
            </motion.span>
          ))}
        </span>
      </motion.div>

      {/* Inputs */}
      {isTextarea ? (
        <textarea
          rows={rows}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className="w-full bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-4 text-xs text-slate-800 focus:outline-none transition-all disabled:opacity-50 shadow-3xs resize-none"
        />
      ) : type === "select" ? (
        <div className="relative w-full h-[54px]">
          <select
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            className="w-full h-full bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 text-xs text-slate-800 focus:outline-none cursor-pointer transition-all disabled:opacity-50 shadow-3xs appearance-none pr-10"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[9px] font-sans">
            ▼
          </div>
        </div>
      ) : (
        <input
          type={type}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className="w-full h-[54px] bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 text-xs text-slate-800 focus:outline-none transition-all disabled:opacity-50 shadow-3xs"
        />
      )}
    </div>
  );
}

/**
 * Enterprise client engagement panel and validation contact console.
 * Redesigned as a high-fidelity executive consultation experience.
 */
export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    subject: "Business Intelligence",
    message: ""
  });
  
  const [projectGoals, setProjectGoals] = useState("");
  const [expectedTimeline, setExpectedTimeline] = useState("");
  const [messageText, setMessageText] = useState("");

  const { isLoading, error, isSuccess, requestId, submit, reset } = useContactForm();
  const { 
    isLoading: isResumeLoading, 
    error: resumeError, 
    download: downloadResume 
  } = useResumeDownload();
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSuccess && successRef.current) {
      successRef.current.focus();
    }
  }, [isSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    const fullMessage = `[PROJECT GOALS]
${projectGoals || "Not Specified"}

[EXPECTED TIMELINE]
${expectedTimeline || "Not Specified"}

[ADDITIONAL MESSAGE]
${messageText || "Not Specified"}`;

    try {
      await submit({
        ...formData,
        message: fullMessage
      });
    } catch {
      // Handled by standard hook error structures
    }
  };

  const subjectOptions = [
    { label: "Business Intelligence", value: "Business Intelligence" },
    { label: "Power BI Dashboard", value: "Power BI Dashboard" },
    { label: "Data Analytics", value: "Data Analytics" },
    { label: "Workflow Automation", value: "Workflow Automation" },
    { label: "Database Engineering", value: "Database Engineering" },
    { label: "AI Automation", value: "AI Automation" },
    { label: "Local Business Intelligence", value: "Local Business Intelligence" },
    { label: "Research & Statistics", value: "Research & Statistics" },
    { label: "Other", value: "Other" }
  ];

  return (
    <motion.section 
      id="contact" 
      variants={getRevealVariants("upward", shouldReduceMotion)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className="relative py-24 bg-white text-slate-800 px-6 md:px-8 border-t border-slate-200 overflow-hidden"
    >
      {/* Background visual orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/[0.01] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid: Left copy & links, Right form card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: CTA & Info (≈35%) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <ExecutiveSectionHeader
              eyebrow="Get In Touch"
              title="Let's Talk About Your Project"
              description="Have a question about your databases, want to automate a weekly spreadsheet, or need an interactive dashboard built? I would love to chat. No project is too small, and we can discuss your needs in plain English."
            />

            {/* Response Information */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl text-left shadow-3xs">
                <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">Expected Response</span>
                <span className="text-xs font-bold text-slate-800 leading-tight block">Within 24 hours</span>
              </div>
              <div className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl text-left shadow-3xs">
                <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">How we can chat</span>
                <span className="text-xs font-bold text-slate-800 leading-tight block">Meet, WhatsApp, Email</span>
              </div>
              <div className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl text-left shadow-3xs">
                <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">Where I work</span>
                <span className="text-xs font-bold text-slate-800 leading-tight block">Remote Worldwide</span>
              </div>
              <div className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl text-left shadow-3xs">
                <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">My status</span>
                <span className="text-xs font-bold text-slate-800 leading-tight block">Available now</span>
              </div>
            </div>

            {/* Direct Contact Info Toolbar */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3 sm:gap-4 md:gap-5">
                
                {/* WhatsApp */}
                <a 
                  href={`https://wa.me/923112777061?text=${encodeURIComponent("Hello Mudassir,\n\nI visited your portfolio website and would like to discuss a project with you.")}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="Chat on WhatsApp"
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-green-600 hover:-translate-y-0.5 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer active:scale-97"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.003-2.637-1.017-5.114-2.873-6.973C16.647 1.912 14.16 1.887 11.5 1.887c-5.44 0-9.863 4.42-9.866 9.865-.001 1.745.457 3.447 1.328 4.964L1.925 21.147l4.722-1.239zm12.393-7.555c-.29-.145-1.714-.847-1.978-.942-.264-.096-.456-.145-.648.145-.191.29-.741.942-.907 1.133-.166.19-.332.215-.622.07-2.92-1.457-4.815-4.004-5.523-5.225-.19-.328-.02-.505.145-.669.148-.148.332-.387.498-.581.165-.194.22-.323.332-.538.113-.215.056-.402-.028-.548-.084-.145-.648-1.56-.888-2.137-.234-.563-.473-.486-.648-.495-.166-.008-.356-.01-.547-.01-.191 0-.503.072-.767.359-.264.288-1.01.986-1.01 2.404 0 1.418 1.031 2.788 1.176 2.98.145.195 2.03 3.1 4.916 4.346.686.297 1.223.474 1.64.607.69.219 1.317.188 1.812.114.551-.082 1.714-.7 1.956-1.378.24-.678.24-1.261.17-1.378-.073-.118-.264-.191-.556-.337z"/>
                  </svg>
                </a>

                {/* Email */}
                <a 
                  href="mailto:malikmudassir1997@gmail.com"
                  aria-label="Email"
                  title="Send Email"
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:-translate-y-0.5 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer active:scale-97"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-1.35 1.465-2.114 2.545-1.3l9.455 7.091 9.455-7.091C22.535 3.343 24 4.107 24 5.457z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/mudassirdandor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="Connect on LinkedIn"
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-blue-700 hover:-translate-y-0.5 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer active:scale-97"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com/mudassirdandor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="View GitHub"
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-950 hover:-translate-y-0.5 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer active:scale-97"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>

                {/* Resume Download */}
                <button 
                  type="button"
                  disabled={isResumeLoading}
                  onClick={() => {
                    downloadResume().catch(() => {});
                  }}
                  aria-label="Download Resume"
                  title="Download Resume (PDF)"
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:-translate-y-0.5 hover:scale-102 transition-all duration-200 ease-in-out cursor-pointer active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResumeLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                  ) : (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V6h10v2z"/>
                    </svg>
                  )}
                </button>

                {/* Location (Passive, non-clickable) */}
                <span 
                  title="Balochistan, Pakistan"
                  className="w-10 h-10 flex items-center justify-center text-slate-400 cursor-default"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </span>

              </div>
              {resumeError && (
                <div 
                  role="alert"
                  aria-live="polite"
                  className="text-[9px] font-medium text-red-600 pt-2 pl-1 text-left"
                >
                  Unable to start the download. Please try again.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact Form / Success Panel (≈65%) */}
          <ExecutiveCard
            level={1}
            className="lg:col-span-8 shadow-sm"
          >
            <div className="p-5 md:p-6 relative h-full w-full">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                  {/* Accessibility Error Announcement */}
                  {error && (
                    <div 
                      role="alert" 
                      aria-live="polite" 
                      className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 text-left space-y-2"
                    >
                      <p className="font-semibold">Submission Failed</p>
                      <p className="text-[11px] text-red-600">
                        {error.error.code === "NETWORK_FAILURE" 
                          ? "Unable to reach the server. Please try again." 
                          : error.error.message}
                      </p>
                      {error.error.details && typeof error.error.details === "object" && (
                        <ul className="list-disc pl-4 text-[10px] text-red-600/90 space-y-0.5">
                          {Object.entries(error.error.details).map(([field, msgs]) => {
                            const messageStr = Array.isArray(msgs) ? msgs.join(", ") : String(msgs);
                            return (
                              <li key={field}>
                                <span className="capitalize">{field}</span>: {messageStr}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name input */}
                    <FloatingField
                      label="Full Name"
                      type="text"
                      required
                      disabled={isLoading}
                      value={formData.fullName}
                      onChange={(val) => setFormData({ ...formData, fullName: val })}
                    />

                    {/* Organization input */}
                    <FloatingField
                      label="Organization (Optional)"
                      type="text"
                      disabled={isLoading}
                      value={formData.organization}
                      onChange={(val) => setFormData({ ...formData, organization: val })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Professional Email input */}
                    <FloatingField
                      label="Professional Email"
                      type="email"
                      required
                      disabled={isLoading}
                      value={formData.email}
                      onChange={(val) => setFormData({ ...formData, email: val })}
                    />

                    {/* Project/Dashboard Selection */}
                    <FloatingField
                      label="Project Type"
                      type="select"
                      disabled={isLoading}
                      value={formData.subject}
                      onChange={(val) => setFormData({ ...formData, subject: val })}
                      options={subjectOptions}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Project Goals */}
                    <FloatingField
                      label="Project Goals"
                      type="text"
                      disabled={isLoading}
                      value={projectGoals}
                      onChange={(val) => setProjectGoals(val)}
                    />

                    {/* Expected Timeline */}
                    <FloatingField
                      label="Expected Timeline"
                      type="text"
                      disabled={isLoading}
                      value={expectedTimeline}
                      onChange={(val) => setExpectedTimeline(val)}
                    />
                  </div>

                  {/* Message input */}
                  <FloatingField
                    label="Tell me about your business challenge, current workflow, or project goals."
                    type="textarea"
                    rows={4}
                    disabled={isLoading}
                    value={messageText}
                    onChange={(val) => setMessageText(val)}
                  />

                  {/* Form submit button */}
                  <div className="space-y-3 pt-2">
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={!isLoading && !shouldReduceMotion ? { y: -2, scale: 1.01 } : {}}
                      whileTap={!isLoading && !shouldReduceMotion ? { scale: 0.98 } : {}}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="group/btn w-full py-3 bg-executive-blue hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 font-bold text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:cursor-not-allowed shadow-sm text-white relative overflow-hidden"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white/70" />
                          Sending message...
                        </>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          <span>Discuss Your Project</span>
                          <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">
                            →
                          </span>
                        </span>
                      )}
                    </motion.button>
                    
                    {/* Microcopy message */}
                    <p className="text-[10px] text-slate-400 text-center font-sans">
                      No spam, ever. I will read your message and reply via email or WhatsApp within a day.
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  ref={successRef}
                  tabIndex={-1}
                  aria-live="polite"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center flex flex-col items-center space-y-6 focus:outline-none"
                >
                  {/* Success Check circle */}
                  <div className="p-4 bg-green-50 text-green-600 rounded-full border border-green-200 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  {/* Success texts */}
                  <div className="space-y-2 text-left">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 text-center">Message Sent Successfully</h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto text-center leading-relaxed">
                      Thank you, <strong className="text-slate-800">{formData.fullName}</strong>. Your enquiry has been received successfully. I will review it and respond as soon as possible.
                    </p>
                  </div>

                  {/* Receipt block */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[10px] text-slate-600 text-left w-full max-w-sm space-y-1.5 shadow-3xs">
                    <div className="flex justify-between pb-1.5 border-b border-slate-200 text-blue-600 font-semibold">
                      <span>SUBMISSION RECEIPT</span>
                      <span>SUCCESS</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Reference Number:</span>
                      <span className="text-slate-900 select-all font-semibold">{requestId || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recipient:</span>
                      <span>Mudassir Javed</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Project Interest:</span>
                      <span>{formData.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Timestamp (UTC):</span>
                      <span>
                        {new Date().toISOString().slice(0, 19).replace("T", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Reset form button */}
                  <motion.button
                    type="button"
                    whileHover={!shouldReduceMotion ? { scale: 1.02, y: -1 } : {}}
                    whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    onClick={() => {
                      reset();
                      setFormData({
                        fullName: "",
                        email: "",
                        organization: "",
                        subject: "Business Intelligence",
                        message: ""
                      });
                      setProjectGoals("");
                      setExpectedTimeline("");
                      setMessageText("");
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-[10px] font-semibold uppercase tracking-wider text-slate-600 hover:text-slate-800 cursor-pointer transition-colors shadow-3xs"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </ExecutiveCard>

        </div>

        {/* Outer Section footer */}
        <div className="pt-20 border-t border-slate-200 mt-20 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-400 gap-4 text-center sm:text-left">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>Mudassir Javed • Business Intelligence Portfolio</span>
          </div>
          <div>
            <span>Based in Balochistan • Available for Projects Worldwide</span>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
