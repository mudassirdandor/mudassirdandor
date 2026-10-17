import { useState, useEffect, useRef } from 'react';
import { User, Layers, Briefcase, Award, Mail } from 'lucide-react';
import { DESKTOP_NAV_ITEMS, MOBILE_NAV_ITEMS, NAV_CTA, BRAND_INFO } from '../../data/navigation';
import { Link } from '../../context/RouterContext';

function getMobileIcon(name?: string) {
  switch (name) {
    case 'User':
      return User;
    case 'Layers':
      return Layers;
    case 'Briefcase':
      return Briefcase;
    case 'Award':
      return Award;
    case 'Mail':
      return Mail;
    default:
      return User;
  }
}

export function Navbar() {
  const [isDesktopVisible, setIsDesktopVisible] = useState(true);
  const [isMobileVisible, setIsMobileVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInteractingRef = useRef(false);
  const isFocusedRef = useRef(false);

  // Helper to schedule or refresh the idle-hide timer (2.5 seconds)
  const startIdleTimer = (delay = 2500) => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      if (!isInteractingRef.current && !isFocusedRef.current) {
        setIsMobileVisible(false);
      }
    }, delay);
  };

  // Scroll listener: Desktop hide/reveal & Mobile show-while-scrolling, hide-when-idle
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollY;

          // Desktop behavior:
          // Visible near top (<= 80px), hides after meaningful downward scrolling (> 15px),
          // reveals on upward scrolling (< -15px)
          if (currentScrollY <= 80) {
            setIsDesktopVisible(true);
          } else {
            if (diff > 15) {
              setIsDesktopVisible(false);
            } else if (diff < -15) {
              setIsDesktopVisible(true);
            }
          }

          // Mobile behavior:
          // Appears as soon as meaningful scrolling begins, remains visible during continuous scrolling,
          // and hides approximately 2.5 seconds after scrolling stops.
          // Hidden initially at the top of the page.
          const isAtTopBoundary = currentScrollY <= 15;
          const isMeaningfulScroll = isAtTopBoundary ? diff > 10 : Math.abs(diff) > 2;

          if (isMeaningfulScroll) {
            setIsMobileVisible(true);
            if (!isInteractingRef.current && !isFocusedRef.current) {
              startIdleTimer(2500);
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  // IntersectionObserver to track active section for mobile navigation
  useEffect(() => {
    const sectionIds = ['about', 'expertise', 'work', 'credentials', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Interaction handlers to prevent hiding while interacting or focused
  const handlePointerDown = () => {
    isInteractingRef.current = true;
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    setIsMobileVisible(true);
  };

  const handlePointerUp = () => {
    isInteractingRef.current = false;
    if (!isFocusedRef.current) {
      startIdleTimer(2500);
    }
  };

  const handlePointerEnter = () => {
    isInteractingRef.current = true;
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    setIsMobileVisible(true);
  };

  const handlePointerLeave = () => {
    isInteractingRef.current = false;
    if (!isFocusedRef.current) {
      startIdleTimer(2500);
    }
  };

  const handleFocus = () => {
    isFocusedRef.current = true;
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    setIsMobileVisible(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const nextTarget = e.relatedTarget as Node | null;
    if (!e.currentTarget.contains(nextTarget)) {
      isFocusedRef.current = false;
      if (!isInteractingRef.current) {
        startIdleTimer(2500);
      }
    }
  };

  const handleNavClick = () => {
    setIsMobileVisible(true);
    startIdleTimer(2500);
  };

  return (
    <>
      {/* ============================================================== */}
      {/* DESKTOP FLOATING NAVBAR (Apple-Style Centered Capsule Pill)     */}
      {/* ============================================================== */}
      <header
        className={`fixed top-3 sm:top-4 z-50 w-full px-3 sm:px-4 pointer-events-none hidden md:flex justify-center transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
          isDesktopVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-24 opacity-0 pointer-events-none focus-within:translate-y-0 focus-within:opacity-100 focus-within:pointer-events-auto'
        }`}
      >
        <div className="w-full max-w-4xl flex justify-center">
          <div className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-surface/90 backdrop-blur-xl border border-border-subtle shadow-xs hover:border-soft-green/40 transition-all duration-200">
            {/* Brand Wordmark */}
            <Link
              href="/#home"
              className="group flex items-center gap-2 shrink-0 focus-visible:outline-2 focus-visible:outline-focus rounded-full px-1.5 py-0.5"
            >
              <span className="w-2 h-2 rounded-full bg-soft-green" aria-hidden="true" />
              <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-pine group-hover:text-pine-hover transition-colors whitespace-nowrap">
                {BRAND_INFO.name}
              </span>
            </Link>

            {/* 4 Essential Desktop Destinations */}
            <nav
              aria-label="Primary Desktop Navigation"
              className="flex items-center gap-1 lg:gap-1.5 px-1 border-l border-border-subtle/80 pl-3 sm:pl-4"
            >
              {DESKTOP_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2.5 py-1 text-xs font-medium text-text-secondary hover:text-pine hover:bg-eucalyptus/30 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-focus whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Single Primary Contact CTA */}
            <div className="flex items-center shrink-0 border-l border-border-subtle/80 pl-3">
              <Link
                href={NAV_CTA.href}
                className="inline-flex items-center justify-center px-3.5 py-1 text-xs font-medium text-porcelain bg-pine hover:bg-pine-hover rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-focus shadow-2xs whitespace-nowrap"
              >
                {NAV_CTA.label}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* MOBILE FLOATING BOTTOM NAVBAR (Show While Scrolling, Hide Idle) */}
      {/* ============================================================== */}
      <nav
        aria-label="Mobile Navigation"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`fixed bottom-3 inset-x-0 z-50 flex justify-center px-4 md:hidden transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
          isMobileVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-16 opacity-0 pointer-events-none focus-within:translate-y-0 focus-within:opacity-100 focus-within:pointer-events-auto'
        }`}
        style={{ marginBottom: 'max(0px, env(safe-area-inset-bottom))' }}
      >
        <div className="pointer-events-auto flex items-center justify-between gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-surface/95 backdrop-blur-xl border border-border-subtle shadow-lg">
          {MOBILE_NAV_ITEMS.map((item) => {
            const sectionTarget = item.href.replace('#', '');
            const isActive = activeSection === sectionTarget;
            const Icon = getMobileIcon(item.iconName);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? 'location' : undefined}
                onClick={handleNavClick}
                className={`relative flex items-center justify-center min-w-[48px] min-h-[48px] w-12 h-12 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-focus ${
                  isActive
                    ? 'text-pine bg-eucalyptus/60 font-semibold shadow-2xs'
                    : 'text-text-tertiary hover:text-pine hover:bg-eucalyptus/30'
                }`}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                {isActive && (
                  <span
                    className="absolute bottom-1 w-1 h-1 rounded-full bg-pine"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
