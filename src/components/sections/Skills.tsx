import { Container } from '../layout/Container';
import { SectionFrame } from '../layout/SectionFrame';
import { SKILL_CATEGORIES } from '../../data/skills';

export function Skills() {
  return (
    <SectionFrame id="skills" className="border-t border-border-subtle py-16 sm:py-20 md:py-24 lg:py-28">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-12 sm:mb-16">
          <span className="font-mono text-xs text-pine tracking-wider uppercase mb-3">
            // Analytical Toolkit
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-pine tracking-tight leading-snug mb-4">
            Tools I use to work with data.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            A structured collection of technical tools across programming, business intelligence, data preparation, and modern analytical platforms.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {SKILL_CATEGORIES.map((category) => (
            <article
              key={category.id}
              className="group flex flex-col justify-between p-6 sm:p-7 md:p-8 rounded-xl border border-border-subtle bg-surface shadow-xs hover:border-soft-green transition-all"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="font-mono text-xs font-semibold text-pine px-2 py-0.5 rounded bg-eucalyptus border border-border-subtle">
                    {category.categoryNumber}
                  </span>
                  <span className="font-mono text-[11px] text-text-tertiary uppercase tracking-wider text-right">
                    Toolkit Category
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-pine tracking-tight mb-2 group-hover:text-pine/80 transition-colors">
                  {category.title}
                </h3>

                {/* Category Scope Description */}
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                  {category.description}
                </p>
              </div>

              {/* Tools List with Purpose Descriptions */}
              <div className="pt-4 border-t border-border-subtle">
                <dl
                  className="space-y-3 m-0"
                  aria-label={`Tools in ${category.title}`}
                >
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pb-2.5 border-b border-border-subtle/50 last:border-b-0 last:pb-0"
                    >
                      <dt className="font-mono text-xs sm:text-sm font-semibold text-pine shrink-0 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-soft-green" aria-hidden="true" />
                        <span>{skill.name}</span>
                      </dt>
                      <dd className="text-xs text-text-secondary leading-relaxed sm:text-right m-0">
                        {skill.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </SectionFrame>
  );
}

export default Skills;
