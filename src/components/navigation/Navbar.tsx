import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, NAV_CTA, BRAND_INFO } from '../../data/navigation';
import { Link } from '../../context/RouterContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  // Focus management, scroll locking, Escape handling, and focus trap
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      document.body.style.overflow = 'hidden';

      // Move focus into the drawer upon opening
      const focusTimer = requestAnimationFrame(() => {
        if (drawerRef.current) {
          const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length > 0) {
            focusables[0].focus();
          } else {
            drawerRef.current.focus();
          }
        }
      });

      // Trap focus within drawer and handle Escape key
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsOpen(false);
          return;
        }

        if (e.key === 'Tab' && drawerRef.current) {
          const focusables = Array.from(
            drawerRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          );

          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first || !drawerRef.current.contains(document.activeElement)) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last || !drawerRef.current.contains(document.activeElement)) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        cancelAnimationFrame(focusTimer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      // Restore focus to toggle button when closed
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        toggleButtonRef.current?.focus();
      }
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <div className="flex items-center justify-between w-full h-16 md:h-20">
      {/* Brand Identity */}
      <Link
        href="/#home"
        className="group flex items-center gap-2 sm:gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-focus rounded-sm py-1"
      >
        <span className="font-display font-bold text-base sm:text-lg tracking-tight text-text-primary group-hover:text-accent transition-colors whitespace-nowrap">
          {BRAND_INFO.name}
        </span>
        <span className="hidden sm:inline-block font-mono text-[11px] text-text-tertiary border border-border-subtle bg-surface px-1.5 py-0.5 rounded whitespace-nowrap">
          {BRAND_INFO.role}
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav
        aria-label="Primary Navigation"
        className="hidden lg:flex items-center gap-4 xl:gap-8"
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-focus rounded-sm py-1"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={NAV_CTA.href}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-focus"
        >
          {NAV_CTA.label}
        </Link>
      </nav>

      {/* Mobile Menu Toggle Button */}
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors focus-visible:outline-2 focus-visible:outline-focus"
      >
        {isOpen ? (
          <X className="w-5 h-5" aria-hidden="true" />
        ) : (
          <Menu className="w-5 h-5" aria-hidden="true" />
        )}
      </button>

      {/* Mobile Navigation Drawer portaled to document.body to avoid header stacking context constraints */}
      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={drawerRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            tabIndex={-1}
            className="fixed inset-x-0 top-16 bottom-0 z-50 bg-background/98 backdrop-blur-2xl border-t border-border-subtle lg:hidden flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200 motion-reduce:animate-none"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-4 pt-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-text-secondary hover:text-text-primary transition-colors py-2 border-b border-border-subtle focus-visible:outline-2 focus-visible:outline-focus rounded-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-6 pb-4">
              <Link
                href={NAV_CTA.href}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-accent hover:bg-accent-hover rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-focus"
              >
                {NAV_CTA.label}
              </Link>
              <p className="mt-4 text-center font-mono text-xs text-text-tertiary">
                {BRAND_INFO.statement}
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default Navbar;
