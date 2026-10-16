import { ArrowDown, MessageSquare } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionFrame } from '../layout/SectionFrame';
import { HeroIllustration } from './hero/HeroIllustration';
import { Chip } from '../ui/Chip';

export function Hero() {
  return (
    <SectionFrame id="home" className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">
      {/* ============================================================== */}
      {/* LIGHTWEIGHT HERO BACKGROUND (Milestone 20.3)                   */}
      {/* Zero pointer tracking, pure CSS atmospheric glow & static grid */}
      {/* ============================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        {/* Layer A: Light Atmospheric Glow (High-efficiency CSS radial gradients) */}
        <div
          className="absolute inset-0 [background:radial-gradient(circle_at_50%_72%,rgba(220,231,223,0.85)_0%,rgba(220,231,223,0.3)_40%,transparent_70%),radial-gradient(ellipse_at_50%_80%,rgba(125,170,145,0.2)_0%,transparent_55%)] lg:[background:radial-gradient(circle_at_74%_46%,rgba(220,231,223,0.85)_0%,rgba(220,231,223,0.25)_42%,transparent_70%),radial-gradient(ellipse_at_70%_72%,rgba(125,170,145,0.18)_0%,rgba(125,170,145,0.04)_36%,transparent_58%)]"
        />

        {/* Layer B & C: Minimal Analytical Grid & Subtle Static Contours */}
        <svg
          className="absolute inset-0 w-full h-full [mask-image:radial-gradient(circle_at_50%_72%,black_0%,black_30%,transparent_68%)] lg:[mask-image:radial-gradient(circle_at_74%_46%,black_0%,black_35%,transparent_72%)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 2:1 Isometric Grid Pattern */}
            <pattern
              id="hero-bg-isogrid"
              width="48"
              height="27.7128"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 13.8564 L 24 0 L 48 13.8564 L 24 27.7128 Z"
                fill="none"
                stroke="#25483C"
                strokeWidth="0.75"
                strokeOpacity="0.045"
              />
            </pattern>
          </defs>

          {/* Masked Static Isometric Grid */}
          <rect
            width="100%"
            height="100%"
            fill="url(#hero-bg-isogrid)"
          />

          {/* Layer C: Static, extremely subtle contour arcs behind illustration */}
          <g fill="none" stroke="#25483C" strokeWidth="1" strokeOpacity="0.05">
            {/* Mobile / Tablet Centered Contours */}
            <g className="lg:hidden">
              <ellipse cx="50%" cy="72%" rx="280" ry="160" strokeDasharray="6 8" />
              <ellipse cx="50%" cy="72%" rx="400" ry="220" />
            </g>
            {/* Desktop Centered Contours */}
            <g className="hidden lg:block">
              <ellipse cx="74%" cy="46%" rx="340" ry="190" strokeDasharray="6 8" />
              <ellipse cx="74%" cy="46%" rx="480" ry="265" />
            </g>
          </g>
        </svg>
      </div>

      <Container className="relative">
        {/* Main Two-Column Hero Grid on Desktop / Stack on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* Left Column — Content and Typography strictly preserved */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start z-10">
            {/* Eyebrow / Professional Category */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-surface text-xs font-mono text-text-tertiary mb-6 sm:mb-8 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-soft-green" aria-hidden="true" />
              <span className="text-text-secondary font-medium">DATA ANALYST · BUSINESS INTELLIGENCE &amp; DATA ANALYTICS</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-6xl tracking-tight text-pine leading-[1.15] sm:leading-[1.1] mb-6">
              Turning Data Into Clear,{' '}
              <span className="text-pine">Actionable Insight.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mb-8 sm:mb-10">
              I’m Mudassir Javed, a Data Analyst with an MSc in Statistics, specializing in Business Intelligence and Data Analytics. I combine statistical thinking, analytical tools, and strong technical capabilities to turn structured data into useful insights and practical solutions.
            </p>

            {/* Calls to Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#work"
                className="group inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-accent hover:bg-accent-hover rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-focus shadow-xs hover:shadow-sm"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-medium text-text-primary bg-surface/90 hover:bg-surface border border-border-base hover:border-border-hover rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-focus shadow-xs"
              >
                <MessageSquare className="w-4 h-4 mr-2 text-text-tertiary" aria-hidden="true" />
                <span>Let's Talk</span>
              </a>
            </div>
          </div>

          {/* Right Column — Living Data Infrastructure Interactive Isometric Illustration */}
          <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end relative w-full my-4 lg:my-0">
            <HeroIllustration />
          </div>
        </div>

        {/* Key Competencies Strip (Milestone 21 - Unified Chip Design System) */}
        <div className="w-full mt-10 sm:mt-12 lg:mt-14 pt-6 sm:pt-7 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5 lg:gap-6 text-xs">
          <span className="font-mono text-text-tertiary uppercase tracking-wider text-[11px] sm:text-xs font-semibold shrink-0">
            Key Competencies
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <Chip variant="surface">MSc Statistics</Chip>
            <Chip variant="surface">Business Intelligence</Chip>
            <Chip variant="surface">Data Analytics</Chip>
            <Chip variant="surface">Python · SQL · Power BI</Chip>
          </div>
        </div>
      </Container>
    </SectionFrame>
  );
}

export default Hero;
