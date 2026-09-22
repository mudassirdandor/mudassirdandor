import React from "react";
import { Link2, Map, ShieldAlert, BarChart2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import { getContainerVariants, getChildVariants, VIEWPORT_CONFIG } from "../utils/motion";
import ExecutiveCard from "./ExecutiveCard";

export default function ProblemRegister() {
  const shouldReduceMotion = useReducedMotion();
  const container = getContainerVariants();
  const child = getChildVariants("upward", shouldReduceMotion);

  const problems = [
    {
      icon: <Link2 className="w-4 h-4 text-slate-600" />,
      title: "Data Scattered Everywhere",
      desc: "Trapped in disconnected spreadsheets? When records are scattered, finding key metrics takes hours and obscures your true operational performance."
    },
    {
      icon: <Map className="w-4 h-4 text-slate-600" />,
      title: "Hidden from Local Customers",
      desc: "Missing local inquiries? If your profile doesn't rank on Google Maps when nearby customers search, competitors win the business by default."
    },
    {
      icon: <ShieldAlert className="w-4 h-4 text-slate-600" />,
      title: "Wasting Hours on Manual Tasks",
      desc: "Still copy-pasting report data weekly? Repetitive manual tasks and building spreadsheets by hand drains time that could be spent growing your business."
    },
    {
      icon: <BarChart2 className="w-4 h-4 text-slate-600" />,
      title: "Decisions Based on Guesswork",
      desc: "Making expensive guesses? Relying on raw averages and incomplete sheets obscures hidden trends, making strategic planning highly risky."
    }
  ];

  return (
    <section 
      id="problem-register" 
      className="py-16 bg-white border-b border-slate-200 px-6 md:px-8"
      aria-label="Core Problems Addressed"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow="Everyday Bottlenecks"
          title="Challenges I Help Solve"
          description="If you are facing any of these challenges, you don't need over-complicated software—you need simple, practical tools that just work."
        />

        {/* 4-Column Balanced High-Density Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
        >
          {problems.map((prob, index) => (
            <ExecutiveCard 
              key={index} 
              level={2}
              variants={child}
              className="hover:bg-white h-full"
            >
              <div className="flex flex-col text-left p-5 md:p-6 h-full w-full justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-3xs">
                    {prob.icon}
                  </div>
                  <h3 className="text-[17px] md:text-[18px] font-bold text-slate-950 mb-2 font-display leading-snug">
                    {prob.title}
                  </h3>
                  <p className="text-[13.5px] text-slate-600 leading-relaxed font-sans">
                    {prob.desc}
                  </p>
                </div>
              </div>
            </ExecutiveCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
