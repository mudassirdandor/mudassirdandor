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

function MainContent() {
  const { currentPath } = useRouter();

  // Normalize path (handle trailing slashes)
  const normalizedPath = currentPath.replace(/\/+$/, '') || '/';

  // Check if current route is a project case study route
  if (normalizedPath.startsWith('/projects/')) {
    const slug = normalizedPath.replace('/projects/', '').trim();
    const caseStudy = getCaseStudyBySlug(slug);

    if (caseStudy) {
      return <CaseStudyPage study={caseStudy} />;
    }

    return <CaseStudyNotFound attemptedSlug={slug} />;
  }

  // Handle unmatched non-root routes
  if (normalizedPath !== '/' && normalizedPath !== '/index.html') {
    return <CaseStudyNotFound attemptedSlug={normalizedPath} />;
  }

  // Default Home page experience
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
