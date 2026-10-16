import { Container } from '../layout/Container';
import { SectionFrame } from '../layout/SectionFrame';
import {
  FEATURED_CERTIFICATIONS,
  TOTAL_CREDENTIALS_STATEMENT,
  ADDITIONAL_CREDENTIAL_AREAS,
} from '../../data/certifications';
import { Chip } from '../ui/Chip';

export function Certifications() {
  return (
    <SectionFrame id="credentials" className="border-t border-border-subtle py-16 sm:py-20 md:py-24 lg:py-28">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-10 sm:mb-12">
          <span className="font-mono text-xs text-pine tracking-wider uppercase mb-3">
            // Credentials
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-pine tracking-tight leading-snug mb-4">
            Continuous learning across analytics and technology.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Combining formal statistical education with industry-recognized professional credentials in data analytics, business intelligence, and cloud platforms.
          </p>
        </div>

        {/* Total Credentials Banner */}
        <div className="p-5 sm:p-6 rounded-xl border border-border-subtle bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 sm:mb-12 shadow-xs">
          <div>
            <span className="font-mono text-[11px] text-pine uppercase tracking-wider font-semibold block mb-1">
              Professional Development Milestone
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-pine tracking-tight">
              {TOTAL_CREDENTIALS_STATEMENT}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Documented portfolio spanning Google professional analytics programs, cloud data platforms, automation, and AI.
            </p>
          </div>
          <span className="font-mono text-xs text-pine px-3 py-1 rounded-full border border-border-subtle bg-eucalyptus shrink-0 self-start sm:self-center font-medium">
            Verified Portfolio
          </span>
        </div>

        {/* Featured Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-10 sm:mb-12">
          {FEATURED_CERTIFICATIONS.map((cert) => (
            <article
              key={cert.id}
              className="p-6 sm:p-7 rounded-xl border border-border-subtle bg-surface hover:border-soft-green transition-all shadow-xs flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Chip variant="eucalyptus" className="font-semibold text-pine">
                    {cert.issuer}
                  </Chip>
                  <span className="font-mono text-[11px] text-text-tertiary">
                    Featured Credential
                  </span>
                </div>

                <h4 className="font-display font-bold text-base sm:text-lg text-pine tracking-tight mb-2 group-hover:text-pine/80 transition-colors">
                  {cert.name}
                </h4>

                <p className="text-xs text-text-secondary leading-relaxed mb-5">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle">
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <Chip key={skill} variant="eucalyptus">
                      {skill}
                    </Chip>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Broader Credential Domains */}
        <div className="p-6 sm:p-8 rounded-xl border border-border-subtle bg-surface shadow-xs">
          <div className="mb-4">
            <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider block">
              Additional Credential Domains &amp; Skill Badges
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {ADDITIONAL_CREDENTIAL_AREAS.map((area) => (
              <div key={area.domain} className="space-y-2">
                <h5 className="font-display font-semibold text-xs sm:text-sm text-pine">
                  {area.domain}
                </h5>
                <ul className="space-y-1.5 list-none p-0 m-0">
                  {area.credentials.map((item) => (
                    <li key={item} className="text-xs text-text-secondary flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-soft-green" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SectionFrame>
  );
}

export default Certifications;
