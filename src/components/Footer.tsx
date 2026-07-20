import React from "react";
import { Database, Linkedin, Github, Mail, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { getRevealVariants, VIEWPORT_CONFIG } from "../utils/motion";

interface FooterProps {
  onNavigate: (pageId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const shouldReduceMotion = useReducedMotion();
  const revealVariants = getRevealVariants("fade", shouldReduceMotion);

  return (
    <motion.footer 
      id="global-footer" 
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className="bg-white border-t border-slate-200 py-16 px-6 md:px-8 relative overflow-hidden"
      aria-label="Administrative Footer"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Upper footer grid layout: 5 thematic columns in a single row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6 lg:gap-8 xl:gap-10">
          
          {/* Logo Column */}
          <div className="space-y-4">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            >
              <div className="relative w-8 h-8 rounded bg-executive-blue flex items-center justify-center font-bold text-white text-xs">
                <span className="font-mono">M</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-slate-900 tracking-wider text-sm">
                  mudassirdandor
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                  BI & ANALYTICS
                </span>
              </div>
            </button>
            <p className="text-[13px] text-slate-600 max-w-sm leading-relaxed font-sans font-medium">
              Developing automated reporting pipelines, interactive analytics dashboards, and localized SEO optimization systems that translate scattered data into operational intelligence.
            </p>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-slate-500 font-medium">
              <span className="font-semibold text-slate-700 font-sans">Focus:</span>
              <span className="font-sans">Business Intelligence</span>
              <span className="text-slate-300">•</span>
              <span className="font-sans">Workflow Automation</span>
              <span className="text-slate-300">•</span>
              <span className="font-sans">Data Analytics</span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">
              Platform
            </h4>
            <ul className="space-y-2.5 pt-1.5 flex flex-col">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="text-[13px] font-sans font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="text-[13px] font-sans font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("consulting")}
                  className="text-[13px] font-sans font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Consulting Framework
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="text-[13px] font-sans font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">
              Solutions
            </h4>
            <ul className="space-y-2.5 pt-1.5 flex flex-col">
              <li>
                <button
                  onClick={() => onNavigate("solutions")}
                  className="text-[13px] font-sans font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Business Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("solutions")}
                  className="text-[13px] font-sans font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Workflow Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("solutions")}
                  className="text-[13px] font-sans font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  AI Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("solutions")}
                  className="text-[13px] font-sans font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Local BI
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Knowledge */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">
              Knowledge
            </h4>
            <ul className="space-y-2.5 pt-1.5 flex flex-col">
              <li>
                <button
                  onClick={() => onNavigate("case-studies")}
                  className="text-[13px] font-sans font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("evidence-lab")}
                  className="text-[13px] font-sans font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Evidence Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("insights")}
                  className="text-[13px] font-sans font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Expert Insights
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">
              Connect
            </h4>
            <ul className="space-y-2.5 pt-1.5 flex flex-col">
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="text-[13px] font-sans font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer text-left focus:outline-none inline-flex items-center gap-0.5"
                >
                  Start a Conversation →
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/923112777061?text=${encodeURIComponent("Hello Mudassir,\n\nI visited your portfolio website and would like to discuss a project with you.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Mudassir on WhatsApp"
                  className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-900 transition-colors py-0.5 focus:outline-none"
                >
                  <MessageCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-sans font-medium">WhatsApp Business</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/mudassirdandor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-900 transition-colors py-0.5 focus:outline-none"
                >
                  <Linkedin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-sans font-medium">LinkedIn Professional</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mudassirdandor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-900 transition-colors py-0.5 focus:outline-none"
                >
                  <Github className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-sans font-medium">GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@mudassirdandor.com"
                  className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-900 transition-colors py-0.5 focus:outline-none"
                >
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-sans font-medium">Email Inquiry</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Understated and Factual */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-400 gap-4 pt-8 border-t border-slate-100 text-center sm:text-left">
          <div className="flex items-center gap-1.5 font-semibold text-slate-500">
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>MUDASSIR JAVED • CONSULTING & BI PORTFOLIO</span>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-x-4 gap-y-1">
            <span>Based in Pakistan</span>
            <span className="text-slate-200">|</span>
            <span>Available Worldwide</span>
            <span className="text-slate-200">|</span>
            <span className="text-slate-500 font-medium">© 2026 Mudassir Javed</span>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
