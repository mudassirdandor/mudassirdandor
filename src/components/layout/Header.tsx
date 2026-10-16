import { Navbar } from '../navigation/Navbar';

export function Header() {
  return (
    <>
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-pine focus:text-porcelain focus:rounded-full focus:shadow-lg focus:outline-2 focus:outline-focus font-medium text-sm pointer-events-auto"
      >
        Skip to main content
      </a>

      {/* Floating navigation system: Desktop top capsule (fixed top-3 sm:top-4) + Mobile bottom bar */}
      <Navbar />
    </>
  );
}

export default Header;
