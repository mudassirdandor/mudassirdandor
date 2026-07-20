# Development Roadmap

Master execution plan for Portfolio V6, structured as independent, low-risk, incremental sprints to ensure continuous build stability and professional visual design.

---

## Phase 1: Homepage Foundation

### Module: Structure & Sequencing

#### Sprint 1.1: Homepage Structural Reordering
- **Objective**: Re-sequence the homepage components inside App.tsx to match the exact authoritative layout order.
- **Editable Components**: `src/App.tsx` (structural configuration only)
- **Expected Result**: Homepage sections render in exact order: Hero → Case Studies → Services → Challenges → Professional Recognition → Working Process → Insights → Contact.

---

## Phase 2: Homepage Components

### Module: Hero & Evidence

#### Sprint 2.1: Hero Framing & Trust Bar
- **Objective**: Establish premium first-viewport presentation under 95vh height, followed immediately by Trust Bar logo anchors.
- **Editable Components**: `src/components/HomeHero.tsx`, `src/components/HomeTrustBar.tsx`
- **Expected Result**: Compact under-95vh hero with Trust Bar partially visible above the fold on standard desktop viewports.

#### Sprint 2.2: Featured Case Studies Grid
- **Objective**: Lay out the featured high-impact case study cards immediately after the trust bar.
- **Editable Components**: `src/components/FeaturedProjects.tsx`
- **Expected Result**: Clean grid rendering featured portfolio pieces with outstanding outcome metrics.

### Module: Capability Sections

#### Sprint 2.3: Services Overview
- **Objective**: Present the core three operational consulting services (Business Intelligence, AI Automation, Local BI) in a clean modular overview.
- **Editable Components**: `src/components/SolutionsOverview.tsx`
- **Expected Result**: A well-structured grid highlighting consulting packages with clear outcomes.

#### Sprint 2.4: Challenges & Problem Register
- **Objective**: Present the executive challenges registry mapping problems to direct resolutions.
- **Editable Components**: `src/components/ProblemRegister.tsx`
- **Expected Result**: Interactive cards mapping business challenges to delivered analytics answers.

### Module: Professional Recognition

#### Sprint 2.5: Professional Recognition — Section Layout
- **Objective**: Build the outer section structure, header, and grid shell for the certification credentials area.
- **Editable Components**: `src/components/CertGrid.tsx`
- **Expected Result**: Semantic section container with Manrope display header matching the design system rules.

#### Sprint 2.6: Professional Recognition — Statistics Row
- **Objective**: Integrate a high-contrast KPI statistic summary row showing total count of certifications and domain hours.
- **Editable Components**: `src/components/CertGrid.tsx`
- **Expected Result**: JetBrains Mono data counts highlighting domain mastery.

#### Sprint 2.7: Professional Recognition — Horizontal Badge Carousel
- **Objective**: Implement a smooth, responsive horizontal badge carousel for direct visual inspection of active credentials.
- **Editable Components**: `src/components/CertGrid.tsx`
- **Expected Result**: Scrollable grid/flex rail rendering credentials cleanly.

#### Sprint 2.8: Professional Recognition — Active Badge Details
- **Objective**: Add interactive selection/modal state displaying rich details of the active selected certificate.
- **Editable Components**: `src/components/CertGrid.tsx`
- **Expected Result**: Dynamic focus panel showing credential name, issuer, and validation ID on click.

#### Sprint 2.9: Professional Recognition — Platform Verification Icons
- **Objective**: Embed verified external link/check icons from `lucide-react` directly into the badges.
- **Editable Components**: `src/components/CertGrid.tsx`
- **Expected Result**: Standardized verification indicators next to each credential name.

#### Sprint 2.10: Professional Recognition — Mobile Behavior
- **Objective**: Optimize the layout behavior of the badge carousel, statistics, and detail cards for mobile viewports.
- **Editable Components**: `src/components/CertGrid.tsx`
- **Expected Result**: Touch targets ≥44px and safe column stacks on narrow screens.

#### Sprint 2.11: Professional Recognition — Accessibility
- **Objective**: Apply high-contrast foreground values, semantic HTML landmarks, and aria attributes to the grid and panels.
- **Editable Components**: `src/components/CertGrid.tsx`
- **Expected Result**: Passed accessibility audits for screen reader navigation and keyboard controls.

#### Sprint 2.12: Professional Recognition — Final Polish
- **Objective**: Refine alignment, pixel-perfect borders, and spacing offsets on the credential showcase.
- **Editable Components**: `src/components/CertGrid.tsx`
- **Expected Result**: Locked, polished presentation matching the 03_DESIGN_SYSTEM_LOCK.md layout requirements.

### Module: Operations & Lead Capture

#### Sprint 2.13: Working Process
- **Objective**: Lay out the step-by-step engagement workflow for incoming consulting clients.
- **Editable Components**: `src/components/HowIWork.tsx`
- **Expected Result**: Clean step blocks detailing phases from diagnostic to deployment.

#### Sprint 2.14: Latest Insights Feed
- **Objective**: Implement the thought-leadership strategic article feed cards.
- **Editable Components**: `src/components/LatestInsights.tsx`
- **Expected Result**: Clean horizontal list of the latest analytics articles.

#### Sprint 2.15: Contact Console Gateway
- **Objective**: Implement the lead acquisition form matching CRM schemas.
- **Editable Components**: `src/components/ContactConsole.tsx`
- **Expected Result**: Form inputs with custom validation routed to standard contact handlers.

---

## Phase 3: Global Design System

### Module: Theming & Foundations

#### Sprint 3.1: Tailwind Theme & Utility Locks
- **Objective**: Enforce the exact typography definitions, custom executive colors, and global spacing in tailwind theme.
- **Editable Components**: `src/index.css`
- **Expected Result**: All layout typography classes and color rules perfectly aligned with `03_DESIGN_SYSTEM_LOCK.md`.

#### Sprint 3.2: Standard Button & Input Elements
- **Objective**: Standardize borders, button variants, hover elevations, and border-radii across all inputs.
- **Editable Components**: `src/components/Navbar.tsx`, `src/components/ContactConsole.tsx`, common buttons.
- **Expected Result**: Fully locked button/input states across the workspace.

---

## Phase 4: Motion & Interactions

### Module: Fluid Transitions

#### Sprint 4.1: Motion Global Config
- **Objective**: Configure basic slide/fade page transitions and hover interactions using spring settings.
- **Editable Components**: `src/App.tsx`, active navigation wrappers
- **Expected Result**: Smooth, lightweight transitions across sections and route navigation.

---

## Phase 5: Individual Pages

### Module: Secondary Layouts

#### Sprint 5.1: Case Studies Detail Hub
- **Objective**: Build the dedicated full-database projects showcase page.
- **Editable Components**: `src/components/Projects.tsx`, `src/components/CaseStudyLayout.tsx`
- **Expected Result**: Filtering controls for all historical studies with detailed case layouts.

#### Sprint 5.2: Solutions Matrix
- **Objective**: Construct the exhaustive individual Services detail page.
- **Editable Components**: `src/components/Solutions.tsx`
- **Expected Result**: Comprehensive service deep dives with clear execution strategies.

#### Sprint 5.3: Evidence Lab & Support Portal
- **Objective**: Build the dedicated Evidence Center showcasing supporting assets and tools.
- **Editable Components**: `src/components/EvidenceCenter.tsx`
- **Expected Result**: Interactive code widgets, download managers, and validated credentials grid.

#### Sprint 5.4: Insights & Articles Archive
- **Objective**: Assemble the strategic long-form insights reader and archive.
- **Editable Components**: `src/components/Insights.tsx`, `src/components/ArticleLayout.tsx`
- **Expected Result**: Clean reading layout utilizing proper typographical hierarchy.

#### Sprint 5.5: About Digital Headquarters
- **Objective**: Build the detailed biography and platform introduction page.
- **Editable Components**: `src/components/About.tsx`
- **Expected Result**: Clean biography sections, timelines, and credentials.

---

## Phase 6: Quality Assurance

### Module: Performance & Verification

#### Sprint 6.1: SEO, Core Web Vitals, & Image Audit
- **Objective**: Perform strict lazy loading audits and verify page canonicals, meta tags, and alt descriptions.
- **Editable Components**: `src/hooks/useSEO.ts`, global image loaders.
- **Expected Result**: Impeccable search ranking readiness and zero cumulative layout shifts.
