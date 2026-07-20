import React from "react";
import { ArrowUpRight, GraduationCap, Building2, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";

interface AboutPreviewProps {
  onNavigate: (pageId: string) => void;
}

export default function AboutPreview({ onNavigate }: AboutPreviewProps) {
  const milestones = [
    {
      icon: <GraduationCap className="w-4 h-4 text-executive-blue" />,
      title: "MSc in Statistics",
      sub: "A solid foundation in data analysis, trends, and math to make sure your numbers are always clean and accurate."
    },
    {
      icon: <Building2 className="w-4 h-4 text-executive-blue" />,
      title: "Practical Experience",
      sub: "Designing easy-to-use dashboards, automated spreadsheets, and tools for local businesses and teams."
    },
    {
      icon: <ShieldAlert className="w-4 h-4 text-executive-blue" />,
      title: "Verified Training",
      sub: "Over 40 professional badges and certs from trusted companies like Google, IBM, and Microsoft."
    }
  ];

  return (
    <section 
      id="about-preview" 
      className="py-24 bg-white border-b border-slate-200 px-6 md:px-8 relative"
      aria-label="Professional Background Preview"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Narrative Copy */}
          <div className="flex flex-col items-start text-left space-y-6">
            <ExecutiveSectionHeader
              eyebrow="A Bit About Me"
              title="Hi, I'm Mudassir Javed."
              description="I'm a technology consultant based in Pakistan. With a background in statistics and a passion for automation, I help teams and businesses turn confusing data into simple, actionable tools."
            />
            
            <div className="space-y-4 text-[16px] text-slate-700 leading-[1.7] font-sans">
              <p>
                I believe technology should make your life easier, not more complicated. That's why I focus on building straightforward solutions—whether that means automating a repetitive spreadsheet task, designing a clean dashboard, or helping a local business get found on Google.
              </p>
              <p>
                I aim to be a helpful, reliable partner. I keep my communication simple, avoid confusing jargon, and focus entirely on building tools that solve your daily challenges and save you valuable time.
              </p>
            </div>

            <button
              onClick={() => onNavigate("about")}
              className="flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-[15px] font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              Read Full Biography & Philosophy
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: Key Milestones */}
          <div className="space-y-6">
            <span className="text-[12px] font-sans tracking-wider text-slate-500 uppercase font-semibold block text-left">
              Key Credentials & Experience
            </span>

            <div className="space-y-4 text-left">
              {milestones.map((mil, idx) => (
                <div 
                  key={idx} 
                  className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors flex gap-4"
                >
                  <div className="p-2 bg-white border border-slate-150 rounded-lg h-fit shrink-0 shadow-3xs">
                    {mil.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[16px] font-semibold text-slate-950 font-sans tracking-wide uppercase">
                      {mil.title}
                    </h3>
                    <p className="text-[16px] text-slate-700 leading-[1.65] font-sans">
                      {mil.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
