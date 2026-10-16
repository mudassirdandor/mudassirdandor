import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export interface AppShellProps {
  children?: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary antialiased pb-16 md:pb-0">
      <Header />
      <main id="main-content" className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default AppShell;
