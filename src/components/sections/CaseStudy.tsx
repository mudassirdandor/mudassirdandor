import { ArrowLeft, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionFrame } from '../layout/SectionFrame';
import { Chip } from '../ui/Chip';
import { Link } from '../../context/RouterContext';
import { type CaseStudy, CASE_STUDIES } from '../../data/caseStudies';
import { useDocumentHead } from '../../hooks/useDocumentHead';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface CaseStudyProps {
  study: CaseStudy;
}

export function CaseStudyPage({ study }: CaseStudyProps) {
  // Update document title, description, canonical, OG, Twitter, and structured data
  useDocumentHead({
    title: study.seo.title,
    description: study.seo.description,
    canonical: study.seo.canonical,
    ogTitle: study.seo.title,
    ogDescription: study.seo.description,
    ogUrl: study.seo.canonical,
    ogImage: study.seo.ogImage,
    ogType: 'article',
    twitterTitle: study.seo.title,
    twitterDescription: study.seo.description,
    twitterImage: study.seo.ogImage,
    jsonLd: study.seo.jsonLd,
  });

  // Find previous and next case studies for linear navigation
  const currentIndex = CASE_STUDIES.findIndex((cs) => cs.id === study.id);
  const prevStudy = currentIndex > 0 ? CASE_STUDIES[currentIndex - 1] : null;
  const nextStudy = currentIndex < CASE_STUDIES.length - 1 ? CASE_STUDIES[currentIndex + 1] : null;

  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24">
      <SectionFrame className="py-6 sm:py-8">
        <Container>
          {/* Back Navigation Breadcrumb */}
          <div className="mb-8 sm:mb-10">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-pine transition-colors focus-visible:outline-2 focus-visible:outline-focus py-1 group"
              aria-label="Back to all selected work"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              <span>Back to Selected Work</span>
            </Link>
          </div>

          {/* Header Title Section */}
          <div className="max-w-4xl mb-10 sm:mb-14">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono text-xs text-pine font-medium uppercase tracking-wider">
                // Case Study
              </span>
              <span className="font-mono text-xs text-text-tertiary">·</span>
              <span className="font-mono text-xs text-text-secondary">
                {study.category}
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-pine tracking-tight leading-tight mb-4">
              {study.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
              {study.subtitle}
            </p>

            {/* Action Buttons & Quick Attributes */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border-subtle">
              {study.liveUrl && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-medium text-white bg-pine hover:bg-pine-hover transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-focus"
                  aria-label={`Open live application for ${study.title}`}
                >
                  <span>Live Application</span>
                  <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                </a>
              )}

              {study.githubUrl && (
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-medium text-pine hover:text-pine-hover border border-border-subtle bg-surface hover:bg-eucalyptus/40 transition-colors focus-visible:outline-2 focus-visible:outline-focus"
                  aria-label={`View GitHub repository for ${study.title}`}
                >
                  <GithubIcon className="w-4 h-4 mr-2 text-text-tertiary" />
                  <span>Source Code</span>
                </a>
              )}

              <div className="hidden sm:flex items-center gap-2 ml-auto text-xs font-mono text-text-tertiary">
                <span>Role:</span>
                <span className="text-pine font-medium">{study.role}</span>
              </div>
            </div>
          </div>

          {/* Project Screenshot / Visual Window Frame */}
          <div className="mb-14 sm:mb-20 rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-md">
            <div className="px-4 py-3 bg-eucalyptus/50 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-soft-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-soft-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-soft-border" />
              </div>
              <span className="font-mono text-xs text-text-tertiary truncate max-w-xs">
                {study.liveUrl ? new URL(study.liveUrl).hostname : study.title}
              </span>
            </div>
            <div className="aspect-[16/9] max-h-[560px] bg-porcelain overflow-hidden">
              <img
                src={study.image}
                alt={study.imageAlt}
                width={2560}
                height={1600}
                className="w-full h-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Deep-Dive Case Study Narrative Sections */}
          <div className="flex flex-col gap-12 sm:gap-16 max-w-4xl mx-auto">
            {/* 1. Overview */}
            <section aria-labelledby="section-overview">
              <h2 id="section-overview" className="font-display font-bold text-xl sm:text-2xl text-pine tracking-tight mb-4">
                1. Project Overview
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle shadow-xs">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {study.overview}
                </p>
              </div>
            </section>

            {/* 2. Problem & Context */}
            <section aria-labelledby="section-problem">
              <h2 id="section-problem" className="font-display font-bold text-xl sm:text-2xl text-pine tracking-tight mb-4">
                2. Problem & Context
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle shadow-xs">
                <ul className="flex flex-col gap-3.5">
                  {study.problemContext.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-soft-green mt-2.5 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 3. Data & Inputs */}
            <section aria-labelledby="section-data">
              <h2 id="section-data" className="font-display font-bold text-xl sm:text-2xl text-pine tracking-tight mb-4">
                3. Data & Inputs
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle shadow-xs">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                  {study.dataAndInputs.description}
                </p>

                <div className="text-xs font-mono text-text-tertiary uppercase tracking-wider mb-3">
                  // Input Schema & Captured Attributes
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {study.dataAndInputs.fields.map((field, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-border-subtle bg-porcelain/60 flex flex-col justify-between"
                    >
                      <span className="font-mono text-xs font-medium text-pine mb-1">
                        {field.name}
                      </span>
                      <span className="text-xs text-text-secondary leading-normal">
                        {field.detail}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle flex items-center gap-2 text-xs text-text-tertiary">
                  <span className="font-mono font-medium text-pine">Source:</span>
                  <span>{study.dataAndInputs.source}</span>
                </div>
              </div>
            </section>

            {/* 4. Approach & Workflow */}
            <section aria-labelledby="section-workflow">
              <h2 id="section-workflow" className="font-display font-bold text-xl sm:text-2xl text-pine tracking-tight mb-4">
                4. Approach & System Workflow
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle shadow-xs">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8">
                  {study.approachAndWorkflow.summary}
                </p>

                <div className="flex flex-col gap-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-subtle">
                  {study.approachAndWorkflow.steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 pl-1">
                      <div className="w-6 h-6 rounded-full bg-eucalyptus border border-soft-green text-pine font-mono text-xs font-bold flex items-center justify-center shrink-0 z-10">
                        {idx + 1}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <h3 className="font-display font-semibold text-base text-pine mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. Processing & Analysis */}
            <section aria-labelledby="section-processing">
              <h2 id="section-processing" className="font-display font-bold text-xl sm:text-2xl text-pine tracking-tight mb-4">
                5. Processing & Transformations
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle shadow-xs">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                  {study.processingAndAnalysis.summary}
                </p>

                <ul className="flex flex-col gap-3.5">
                  {study.processingAndAnalysis.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-soft-green mt-2.5 shrink-0" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 6. Results & Outputs */}
            <section aria-labelledby="section-results">
              <h2 id="section-results" className="font-display font-bold text-xl sm:text-2xl text-pine tracking-tight mb-4">
                6. Results & Observable Outputs
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle shadow-xs">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                  {study.resultsAndOutputs.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {study.resultsAndOutputs.outputs.map((out, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-border-subtle bg-porcelain/60 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-pine mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="text-xs sm:text-sm text-text-secondary leading-normal">
                        {out}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. Tools and Technologies */}
            <section aria-labelledby="section-tools">
              <h2 id="section-tools" className="font-display font-bold text-xl sm:text-2xl text-pine tracking-tight mb-4">
                7. Tools & Technical Stack
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle shadow-xs">
                <div className="flex flex-wrap gap-2.5">
                  {study.toolsAndTechnologies.map((tool) => (
                    <Chip key={tool} variant="eucalyptus">
                      {tool}
                    </Chip>
                  ))}
                </div>
              </div>
            </section>

            {/* 8. Key Takeaway */}
            <section aria-labelledby="section-takeaway">
              <h2 id="section-takeaway" className="font-display font-bold text-xl sm:text-2xl text-pine tracking-tight mb-4">
                8. Key Analytical Takeaway
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-eucalyptus/30 border border-soft-green/50 shadow-xs">
                <p className="text-sm sm:text-base text-pine font-medium leading-relaxed">
                  {study.keyTakeaway}
                </p>
              </div>
            </section>
          </div>

          {/* Bottom Case Study Switcher & Return Link */}
          <div className="mt-16 sm:mt-24 pt-8 border-t border-border-subtle max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              {prevStudy ? (
                <Link
                  href={`/projects/${prevStudy.slugs[0]}`}
                  className="group flex flex-col items-start focus-visible:outline-2 focus-visible:outline-focus rounded py-1"
                >
                  <span className="font-mono text-xs text-text-tertiary flex items-center gap-1 group-hover:text-pine transition-colors">
                    <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                    Previous Project
                  </span>
                  <span className="font-display font-semibold text-sm sm:text-base text-pine">
                    {prevStudy.title}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/#work"
                  className="font-mono text-xs text-text-secondary hover:text-pine transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-focus rounded py-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  All Projects
                </Link>
              )}
            </div>

            <Link
              href="/#work"
              className="px-5 py-2.5 rounded-md text-xs font-mono font-medium text-pine hover:text-pine-hover border border-border-subtle bg-surface hover:bg-eucalyptus/30 transition-colors focus-visible:outline-2 focus-visible:outline-focus"
            >
              Back to Overview
            </Link>

            <div>
              {nextStudy ? (
                <Link
                  href={`/projects/${nextStudy.slugs[0]}`}
                  className="group flex flex-col items-end focus-visible:outline-2 focus-visible:outline-focus rounded py-1"
                >
                  <span className="font-mono text-xs text-text-tertiary flex items-center gap-1 group-hover:text-pine transition-colors">
                    Next Project
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="font-display font-semibold text-sm sm:text-base text-pine text-right">
                    {nextStudy.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </Container>
      </SectionFrame>
    </div>
  );
}
