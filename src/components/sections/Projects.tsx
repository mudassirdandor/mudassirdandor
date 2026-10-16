import { ExternalLink, ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionFrame } from '../layout/SectionFrame';
import { PROJECTS } from '../../data/projects';
import { getCaseStudyBySlug } from '../../data/caseStudies';
import { Chip } from '../ui/Chip';
import { Link } from '../../context/RouterContext';

function GithubIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
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

export function Projects() {
  // Sticky top offsets for the desktop project card stacking sequence (inspired by Professional Philosophy)
  const stickyTopOffsets = [
    'lg:top-24',
    'lg:top-28',
    'lg:top-32',
    'lg:top-36',
  ];

  return (
    <SectionFrame id="work" className="border-t border-border-subtle py-16 sm:py-20 md:py-24 lg:py-28">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-12 sm:mb-16">
          <span className="font-mono text-xs text-forest tracking-wider uppercase mb-3">
            // Selected Work
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-pine tracking-tight leading-snug mb-4">
            Projects built around data, systems, and practical problems.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            My projects demonstrate how I apply analytical thinking and technical skills to real-world data workflows, structured collection, and applications.
          </p>
        </div>

        {/* Scroll-Driven Stacking Cards Sequence on Desktop / Sequential Flow on Narrow Screens */}
        <div className="relative flex flex-col gap-8 md:gap-12 lg:gap-16 pb-20 sm:pb-28 lg:pb-36">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            const caseStudy = getCaseStudyBySlug(project.id);

            return (
              <article
                key={project.id}
                style={{
                  transitionDuration: '240ms',
                }}
                className={`group p-6 sm:p-8 lg:p-10 rounded-2xl md:rounded-[28px] border border-border-subtle bg-surface/98 backdrop-blur-md shadow-md hover:shadow-xl hover:border-soft-green/70 transition-all duration-240 lg:sticky ${stickyTopOffsets[index]} motion-reduce:static motion-reduce:transform-none overflow-hidden`}
              >
                <div
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-8 lg:gap-12`}
                >
                  {/* Project Information Side */}
                  <div className="flex-1 w-full flex flex-col justify-between">
                    <div>
                      {/* Category & Featured Badge */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs text-pine font-medium uppercase tracking-wider">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="font-mono text-[10px] text-pine font-medium bg-eucalyptus border border-border-subtle px-2 py-0.5 rounded">
                            Featured Project
                          </span>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-pine tracking-tight mb-4 group-hover:text-pine/80 transition-colors">
                        {caseStudy ? (
                          <Link
                            href={`/projects/${caseStudy.slugs[0]}`}
                            className="hover:underline focus-visible:outline-2 focus-visible:outline-focus rounded-sm"
                          >
                            {project.title}
                          </Link>
                        ) : (
                          project.title
                        )}
                      </h3>

                      {/* Project Description */}
                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Capabilities / Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.capabilities.map((cap) => (
                          <Chip key={cap} variant="eucalyptus">
                            {cap}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center gap-3.5 text-sm">
                      {caseStudy && (
                        <Link
                          href={`/projects/${caseStudy.slugs[0]}`}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-white bg-pine hover:bg-pine-hover transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-focus"
                          aria-label={`Read case study for ${project.title}`}
                        >
                          <span>Case Study</span>
                          <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
                        </Link>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-pine hover:text-pine-hover border border-border-subtle bg-surface hover:bg-eucalyptus/40 transition-colors focus-visible:outline-2 focus-visible:outline-focus"
                          aria-label={`View live project for ${project.title}`}
                        >
                          <span>Live App</span>
                          <ExternalLink className="w-4 h-4 ml-1.5" aria-hidden="true" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-text-secondary hover:text-pine border border-border-subtle bg-surface hover:bg-eucalyptus/30 transition-colors focus-visible:outline-2 focus-visible:outline-focus"
                          aria-label={`View GitHub repository for ${project.title}`}
                        >
                          <GithubIcon className="w-4 h-4 mr-1.5 text-text-tertiary" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Screenshot / Visual Window Side */}
                  <div className="flex-1 w-full">
                    <div className="rounded-xl overflow-hidden border border-border-subtle bg-surface shadow-md transition-all duration-300 group-hover:border-soft-green">
                      {/* Window Header Frame */}
                      <div className="px-4 py-2.5 bg-eucalyptus/50 border-b border-border-subtle flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-soft-border" />
                          <span className="w-2.5 h-2.5 rounded-full bg-soft-border" />
                          <span className="w-2.5 h-2.5 rounded-full bg-soft-border" />
                        </div>
                        <span className="font-mono text-[10px] text-text-tertiary truncate max-w-[200px]">
                          {project.liveUrl ? new URL(project.liveUrl).hostname : project.title}
                        </span>
                      </div>

                      {/* Project Screenshot Link */}
                      {caseStudy ? (
                        <Link
                          href={`/projects/${caseStudy.slugs[0]}`}
                          tabIndex={-1}
                          aria-hidden="true"
                          className="block relative overflow-hidden aspect-[16/10] bg-porcelain"
                        >
                          <img
                            src={project.image}
                            alt={project.imageAlt}
                            width={2560}
                            height={1600}
                            className="w-full h-full object-cover object-top group-hover:scale-[1.015] transition-transform duration-240 motion-reduce:transform-none"
                            loading="lazy"
                            decoding="async"
                          />
                        </Link>
                      ) : project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={-1}
                          aria-hidden="true"
                          className="block relative overflow-hidden aspect-[16/10] bg-porcelain"
                        >
                          <img
                            src={project.image}
                            alt={project.imageAlt}
                            width={2560}
                            height={1600}
                            className="w-full h-full object-cover object-top group-hover:scale-[1.015] transition-transform duration-240 motion-reduce:transform-none"
                            loading="lazy"
                            decoding="async"
                          />
                        </a>
                      ) : (
                        <div className="relative overflow-hidden aspect-[16/10] bg-porcelain">
                          <img
                            src={project.image}
                            alt={project.imageAlt}
                            width={2560}
                            height={1600}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </SectionFrame>
  );
}

export default Projects;
