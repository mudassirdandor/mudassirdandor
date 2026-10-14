import { RouterProvider, useRouter } from './context/RouterContext';
import { AppShell } from './components/layout/AppShell';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Expertise } from './components/sections/Expertise';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Certifications } from './components/sections/Certifications';
import { ProfessionalPhilosophy } from './components/sections/ProfessionalPhilosophy';
import { Contact } from './components/sections/Contact';
import { CaseStudyPage } from './components/sections/CaseStudy';
import { CaseStudyNotFound } from './components/sections/CaseStudyNotFound';
import { getCaseStudyBySlug } from './data/caseStudies';
import { useDocumentHead } from './hooks/useDocumentHead';

const HOMEPAGE_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://mudassiranalyst.vercel.app/#website',
      url: 'https://mudassiranalyst.vercel.app/',
      name: 'Mudassir Javed | Data Analyst Portfolio',
      description:
        'Portfolio of Mudassir Javed, Data Analyst specializing in Business Intelligence, data analytics, and automation.',
      publisher: {
        '@id': 'https://mudassiranalyst.vercel.app/#person',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://mudassiranalyst.vercel.app/#person',
      name: 'Mudassir Javed',
      jobTitle: 'Data Analyst',
      url: 'https://mudassiranalyst.vercel.app/',
      image: 'https://mudassiranalyst.vercel.app/images/og-portfolio.png',
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'University of Balochistan',
      },
      knowsAbout: [
        'Data Analytics',
        'Business Intelligence',
        'Statistics',
        'SQL',
        'Python',
        'Power BI',
        'Data Cleaning',
        'Automation',
      ],
      sameAs: [
        'https://www.linkedin.com/in/mudassirjaved/',
        'https://github.com/mudassirdandor',
      ],
    },
  ],
};

function HomePage() {
  useDocumentHead({
    title: 'Mudassir Javed | Data Analyst | Business Intelligence & Data Analytics',
    description:
      'Mudassir Javed is a Data Analyst with an MSc in Statistics, specializing in Business Intelligence and Data Analytics, with practical experience across data, technology, and automation.',
    canonical: 'https://mudassiranalyst.vercel.app/',
    ogTitle: 'Mudassir Javed | Data Analyst | Business Intelligence & Data Analytics',
    ogDescription:
      'Mudassir Javed is a Data Analyst with an MSc in Statistics, specializing in Business Intelligence and Data Analytics, with practical experience across data, technology, and automation.',
    ogUrl: 'https://mudassiranalyst.vercel.app/',
    ogImage: 'https://mudassiranalyst.vercel.app/images/og-portfolio.png',
    ogType: 'website',
    twitterTitle: 'Mudassir Javed | Data Analyst | Business Intelligence & Data Analytics',
    twitterDescription:
      'Mudassir Javed is a Data Analyst with an MSc in Statistics, specializing in Business Intelligence and Data Analytics, with practical experience across data, technology, and automation.',
    twitterImage: 'https://mudassiranalyst.vercel.app/images/og-portfolio.png',
    jsonLd: HOMEPAGE_JSON_LD,
  });

  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <ProfessionalPhilosophy />
      <Contact />
    </>
  );
}

function MainContent() {
  const { currentPath } = useRouter();

  // Normalize path (handle trailing slashes)
  const normalizedPath = currentPath.replace(/\/+$/, '') || '/';

  // Check if current route is a project case study route
  if (normalizedPath.startsWith('/projects/')) {
    const slug = normalizedPath.replace('/projects/', '').trim();
    const caseStudy = getCaseStudyBySlug(slug);

    if (caseStudy) {
      const canonicalSlug = caseStudy.slugs[0];
      if (slug !== canonicalSlug && typeof window !== 'undefined' && window.history.replaceState) {
        window.history.replaceState(null, '', `/projects/${canonicalSlug}`);
      }
      return <CaseStudyPage study={caseStudy} />;
    }

    return <CaseStudyNotFound attemptedSlug={slug} />;
  }

  // Handle unmatched non-root routes
  if (normalizedPath !== '/' && normalizedPath !== '/index.html') {
    return <CaseStudyNotFound attemptedSlug={normalizedPath} />;
  }

  // Default Home page experience
  return <HomePage />;
}

export function App() {
  return (
    <RouterProvider>
      <AppShell>
        <MainContent />
      </AppShell>
    </RouterProvider>
  );
}

export default App;
