import { Container } from '../layout/Container';
import { SectionFrame } from '../layout/SectionFrame';
import { MapPin, GraduationCap } from 'lucide-react';

const JOURNEY_STEPS = [
  { step: '01', title: 'Statistics', desc: 'Quantitative foundation, research methods, and rigorous reasoning.' },
  { step: '02', title: 'Data Analysis', desc: 'Exploration, structured data cleaning, and pattern identification.' },
  { step: '03', title: 'Business Intelligence', desc: 'KPI tracking, dashboard development, and analytical reporting.' },
  { step: '04', title: 'Insights & Decisions', desc: 'Communicating findings that support practical, executive decisions.' },
];

export function About() {
  return (
    <SectionFrame id="about" className="border-t border-border-subtle py-16 sm:py-20 md:py-24 lg:py-28">
      <Container>
        {/* Row 1: Portrait & Professional Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* Portrait Column (Desktop 5 cols / Mobile 1 col) */}
          <div className="lg:col-span-5 w-full flex flex-col items-center lg:items-start">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none rounded-2xl md:rounded-[24px] border border-border-subtle bg-surface p-2.5 sm:p-3 shadow-xs">
              <div className="relative overflow-hidden rounded-xl md:rounded-[18px] bg-sage/20 border border-border-subtle aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="/images/profile/mudassir-javed.webp"
                  alt="Portrait of Mudassir Javed"
                  width={768}
                  height={1234}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Factual Profile Anchor Details */}
              <div className="pt-3 pb-1 px-1.5 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-pine tracking-tight">Mudassir Javed</span>
                  <span className="text-text-tertiary flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-soft-green" aria-hidden="true" />
                    Quetta, Pakistan
                  </span>
                </div>
                <p className="text-[11px] font-mono text-text-tertiary">
                  Data Analyst · Business Intelligence &amp; Data Analytics
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Column (Desktop 7 cols / Mobile 1 col) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Section Label */}
            <span className="font-mono text-xs text-forest tracking-wider uppercase mb-3">
              // About
            </span>

            {/* Section Heading */}
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-text-primary tracking-tight leading-snug mb-6">
              A statistical foundation with a practical approach to data.
            </h2>

            {/* Narrative Body */}
            <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
              <p>
                My foundation in Statistics shapes the way I approach data: understand the problem, examine the evidence, identify meaningful patterns, and communicate what the data is saying clearly.
              </p>
              <p>
                I have developed practical experience across data collection, structured data workflows, analysis-oriented applications, visualization, automation, and technical projects. My goal is to bring these capabilities together through a focused career in Data Analytics and Business Intelligence.
              </p>
              <p>
                With a combination of statistical education and technical skills, I can work across the journey from raw information to structured data, analysis, visualization, and decision support.
              </p>
            </div>

            {/* Supporting Statement / Callout */}
            <div className="w-full border-l-2 border-soft-green pl-4 sm:pl-5 py-2.5 bg-eucalyptus/30 rounded-r-xl">
              <p className="text-sm sm:text-base italic text-pine font-medium leading-relaxed">
                "Statistics gives me the analytical foundation. Technology gives me the ability to build practical solutions around it."
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: Full Content Width Supporting Cards (MSc Credentials + Analytical Journey) */}
        <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-border-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Narrower Academic Foundation Card (5 cols on lg) */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl border border-border-subtle bg-surface shadow-xs flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-forest uppercase tracking-wider flex items-center gap-1.5 font-medium">
                    <GraduationCap className="w-4 h-4 text-soft-green" aria-hidden="true" />
                    Academic Foundation
                  </span>
                  <span className="font-mono text-xs text-text-tertiary bg-porcelain px-2.5 py-0.5 rounded-full border border-border-subtle">
                    2023
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-text-primary tracking-tight">
                  MSc in Statistics
                </h3>
                <p className="text-sm text-text-tertiary mt-1 font-medium">
                  University of Balochistan
                </p>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-4 pt-4 border-t border-border-subtle">
                  Advanced statistical reasoning, quantitative research methods, probability distributions, hypothesis testing, and the rigorous interpretation of structured empirical data.
                </p>
              </div>

              <div className="pt-2 font-mono text-[11px] text-text-tertiary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-soft-green" />
                <span>Empirical rigor applied to practical business problems</span>
              </div>
            </div>

            {/* Wider Analytical Journey Stepper Card (7 cols on lg) */}
            <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl border border-border-subtle bg-surface shadow-xs flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider font-semibold">
                    Analytical Journey
                  </span>
                  <span className="font-mono text-[11px] text-forest font-medium">
                    End-to-End Workflow
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {JOURNEY_STEPS.map((item) => (
                    <div
                      key={item.step}
                      className="p-3.5 rounded-xl bg-porcelain/60 border border-border-subtle/80 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-forest font-bold px-1.5 py-0.5 rounded bg-eucalyptus/50 border border-border-subtle">
                          {item.step}
                        </span>
                        <h4 className="text-sm font-display font-bold text-text-primary tracking-tight">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 font-mono text-[11px] text-text-tertiary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-soft-green" />
                <span>Iterative analysis grounded in verification at every stage</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionFrame>
  );
}

export default About;
