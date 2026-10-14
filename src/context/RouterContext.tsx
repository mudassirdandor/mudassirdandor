import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return;

    // Handle hash links like "#work" or "/#work"
    if (to.startsWith('#')) {
      const hash = to;
      if (window.location.pathname === '/' || window.location.pathname === '') {
        window.history.pushState(null, '', hash);
        const targetId = hash.slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If on another route, navigate to home with hash
        window.history.pushState(null, '', `/${hash}`);
        setCurrentPath('/');
        // Allow DOM to render home before scrolling
        setTimeout(() => {
          const targetId = hash.slice(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }
        }, 50);
      }
      return;
    }

    if (to.startsWith('/#')) {
      const hash = to.slice(1);
      window.history.pushState(null, '', to);
      setCurrentPath('/');
      setTimeout(() => {
        const targetId = hash.slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }, 50);
      return;
    }

    // Direct path navigation (e.g., "/projects/saylani-registration" or "/")
    window.history.pushState(null, '', to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Listen for browser Back/Forward popstate navigation
  useEffect(() => {
    function handlePopState() {
      setCurrentPath(window.location.pathname);
      if (window.location.hash) {
        const targetId = window.location.hash.slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle initial page load with hash if on home
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export function Link({
  href,
  children,
  className,
  onClick,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { navigate } = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // If opening in new tab or external link, let browser handle normally
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.button !== 0 ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      props.target === '_blank'
    ) {
      onClick?.(e);
      return;
    }

    e.preventDefault();
    onClick?.(e);
    navigate(href);
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
