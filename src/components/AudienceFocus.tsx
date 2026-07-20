import React from "react";
import { MapPin, Briefcase, Cpu } from "lucide-react";
import { motion } from "motion/react";
import ExecutiveCard from "./ExecutiveCard";

export default function AudienceFocus() {
  const audiences = [
    {
      icon: <MapPin className="w-5 h-5 text-executive-blue" />,
      tag: "Local Growth",
      title: "Local Businesses & Startups",
      desc: "For local clinics, stores, service providers, and startups wanting to grow their presence on Google Maps, understand customer foot traffic, and set up simple tracking systems."
    },
    {
      icon: <Briefcase className="w-5 h-5 text-executive-blue" />,
      tag: "Operations & Impact",
      title: "Organizations, NGOs & Teams",
      desc: "For business managers, teams, NGOs, and community groups requiring clear dashboards, automated workflows, and straightforward reporting to make reliable decisions."
    },
    {
      icon: <Cpu className="w-5 h-5 text-executive-blue" />,
      tag: "Knowledge & Growth",
      title: "Professionals, Researchers & Students",
      desc: "For researchers, students, recruiters, and freelancers looking for verified statistics assistance, automated spreadsheet scripts, or a trusted partner to handle custom tech tasks."
    }
  ];

  return (
    <section 
      id="audience-focus" 
      className="py-20 bg-slate-50 border-b border-slate-200 px-6 md:px-8 relative overflow-hidden"
      aria-label="Target Engagement Sectors"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left space-y-2">
          <span className="text-[12px] font-mono tracking-widest text-executive-blue uppercase font-bold block">
            Target Focus Group
          </span>
          <h2 className="text-[clamp(2.1rem,3vw,2.5rem)] font-bold tracking-[-0.01em] text-slate-950 font-display leading-[1.2]">
            Who I Partner With
          </h2>
          <p className="text-[16px] text-slate-700 leading-[1.7] font-sans max-w-[700px]">
            Practical digital systems and data solutions built to fit your specific goals and daily workflows.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((aud, index) => (
            <ExecutiveCard
              key={index}
              level={1}
              className="h-full"
            >
              <div className="p-6 flex flex-col justify-between h-full w-full">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 mb-5 shadow-inner">
                    {aud.icon}
                  </div>
                  <span className="text-[12px] font-mono text-executive-blue uppercase tracking-widest font-bold block mb-1.5">
                    {aud.tag}
                  </span>
                  <h3 className="text-[18px] md:text-[20px] font-bold text-slate-950 font-display mb-3 leading-snug">
                    {aud.title}
                  </h3>
                  <p className="text-[16px] text-slate-700 leading-relaxed font-sans">
                    {aud.desc}
                  </p>
                </div>
              </div>
            </ExecutiveCard>
          ))}
        </div>
      </div>
    </section>
  );
}
