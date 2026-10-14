import { ArrowLeft, ArrowRight, FileQuestion } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionFrame } from '../layout/SectionFrame';
import { Link } from '../../context/RouterContext';
import { CASE_STUDIES } from '../../data/caseStudies';
import { useDocumentHead } from '../../hooks/useDocumentHead';

interface CaseStudyNotFoundProps {
  attemptedSlug: string;
}

export function CaseStudyNotFound({ attemptedSlug }: CaseStudyNotFoundProps) {
  useDocumentHead({
    title: 'Case Study Not Found | Mudassir Javed',
    description:
      'The requested project case study could not be found. Explore verified data analytics and workflow case studies by Mudassir Javed.',
    canonical: 'https://mudassiranalyst.vercel.app/',
    noindex: true,
  });

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-28">
      <SectionFrame>
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            {/* Visual Icon */}
            <div className="w-16 h-16 rounded-2xl bg-eucalyptus/60 border border-border-subtle flex items-center justify-center mx-auto mb-6 text-pine">
              <FileQuestion className="w-8 h-8" aria-hidden="true" />
            </div>

            <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider mb-2 block">
              // 404 — Project Case Study Not Found
            </span>

            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-pine tracking-tight mb-4">
              Case Study Not Found
            </h1>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8">
              No published case study matches the requested slug{' '}
              <code className="font-mono text-xs text-pine bg-surface border border-border-subtle px-1.5 py-0.5 rounded">
                {attemptedSlug}
              </code>
              . You can explore one of the verified project case studies below, or return to the main portfolio.
            </p>

            {/* List of Available Case Studies */}
            <div className="text-left mb-10 p-6 rounded-2xl bg-surface border border-border-subtle shadow-xs">
              <h2 className="font-mono text-xs text-pine uppercase tracking-wider mb-4 font-semibold">
                Available Case Studies:
              </h2>
              <div className="flex flex-col gap-3">
                {CASE_STUDIES.map((study) => (
                  <Link
                    key={study.id}
                    href={`/projects/${study.slugs[0]}`}
                    className="group flex items-center justify-between p-3.5 rounded-xl border border-border-subtle hover:border-soft-green hover:bg-eucalyptus/20 transition-all focus-visible:outline-2 focus-visible:outline-focus"
                  >
                    <div>
                      <span className="font-display font-medium text-sm text-pine block group-hover:text-pine-hover">
                        {study.title}
                      </span>
                      <span className="font-mono text-[11px] text-text-tertiary block">
                        {study.category}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-pine group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Return Button */}
            <Link
              href="/#work"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-medium text-white bg-pine hover:bg-pine-hover transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-focus"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Return to Portfolio Overview</span>
            </Link>
          </div>
        </Container>
      </SectionFrame>
    </div>
  );
}
