import { ExternalLink } from 'lucide-react';
import { Container } from './Container';
import { FOOTER_NAV_ITEMS, FOOTER_SOCIAL_LINKS, BRAND_INFO } from '../../data/navigation';
import { Link } from '../../context/RouterContext';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-eucalyptus/40 border-t border-border-subtle py-12 md:py-16 mt-auto">
      <Container>
        <div className="flex flex-col gap-10">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-16">
            {/* Identity & Career Positioning */}
            <div className="flex flex-col max-w-sm">
              <span className="font-display font-bold text-xl text-pine tracking-tight">
                {BRAND_INFO.name}
              </span>
              <p className="font-mono text-xs text-pine font-semibold uppercase tracking-wider mt-1">
                {BRAND_INFO.role} · {BRAND_INFO.specialization}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mt-3">
                Transforming complex data into clear, actionable insights that support better decisions.
              </p>
              <p className="font-mono text-xs text-text-tertiary tracking-wide mt-2">
                {BRAND_INFO.narrative}
              </p>

              {/* Verified Professional Links */}
              <div className="flex flex-wrap items-center gap-4 mt-5">
                {FOOTER_SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.href.startsWith('http') || link.href.endsWith('.pdf')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    {...(link.href.endsWith('.pdf') ? { download: 'Mudassir_Javed_CV.pdf' } : {})}
                    className="inline-flex items-center text-xs font-mono text-text-tertiary hover:text-pine transition-colors focus-visible:outline-2 focus-visible:outline-focus rounded-sm py-0.5"
                    aria-label={link.ariaLabel}
                  >
                    <span>{link.label}</span>
                    {link.href.startsWith('http') && (
                      <ExternalLink className="w-3 h-3 ml-1 text-text-tertiary" aria-hidden="true" />
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links Grid */}
            <div className="flex flex-col">
              <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider block mb-3">
                Navigation
              </span>
              <nav
                aria-label="Footer Navigation"
                className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-10 gap-y-2.5 text-xs sm:text-sm text-text-secondary"
              >
                {FOOTER_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-focus rounded-sm py-0.5"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom Bar / Copyright */}
          <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-tertiary font-mono">
            <p>© {currentYear} Mudassir Javed. All rights reserved.</p>
            <span className="text-text-tertiary">
              Data Analyst · Business Intelligence &amp; Data Analytics
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
