# Production Asset Directory & Pipeline

This directory holds all persistent production-ready assets for the portfolio. To replace any placeholder inside the application, simply upload the corresponding image to its specific path listed in the checklist below with the identical filename.

No code modifications are required. If a file is missing, the application's built-in high-fidelity `ContentPlaceholder` fallback system will automatically render a vector mockup with zero layout shifts or errors.

---

## Directory Structure

```
/public/assets/
├── portraits/
├── certificates/
│   ├── google/
│   ├── microsoft/
│   ├── ibm/
│   ├── coursera/
│   ├── credly/
│   └── navttc/
├── projects/
│   ├── saylani-registration/
│   ├── saylani-donation/
│   ├── weather-intelligence/
│   ├── job-application/
│   ├── enterpret-steel/
│   ├── local-seo/
│   ├── lifedrop/
│   └── executive-dashboard/
├── dashboards/
├── workflows/
├── architecture/
├── screenshots/
├── logos/
├── signature/
└── social/
```

---

## Permanent Asset Checklist

### 1. Portraits (`/public/assets/portraits/`)
- [ ] `portrait-main.webp` - Main landing page hero biography portrait (used in `HomeHero.tsx`).
- [ ] `portrait-about.webp` - Professional biography page portrait (used in `About.tsx`).

### 2. Signature (`/public/assets/signature/`)
- [ ] `signature.svg` - Authorized custom consultant signature (used in `ContentPlaceholder.tsx`).

### 3. General Layouts (`/public/assets/dashboards/` & `/public/assets/workflows/`)
- [ ] `dashboards/workspace.webp` - Analyst Workspace screenshot (used in `About.tsx`).
- [ ] `workflows/career-timeline.webp` - Professional career timeline and milestone graphic (used in `About.tsx`).

### 4. Organization Logos (`/public/assets/logos/`)
*Used to dynamically display credential issuers inside the certificate grid (`CertGrid.tsx`):*
- [ ] `google.svg`
- [ ] `microsoft.svg`
- [ ] `ibm.svg`
- [ ] `coursera.svg`
- [ ] `credly.svg`
- [ ] `kaggle.svg`
- [ ] `navttc.svg`

### 5. Certificates (`/public/assets/certificates/`)
*To display certificate images inside the interactive cert grid. Paths follow `/public/assets/certificates/[issuer-folder]/[cert-id].webp`:*

#### Google (`certificates/google/`)
- [ ] `cert-google-bi.webp` - Google Business Intelligence Professional Certificate
- [ ] `cert-google-adv-data.webp` - Google Advanced Data Analytics Professional Certificate
- [ ] `cert-google-data.webp` - Google Data Analytics Professional Certificate
- [ ] `cert-google-pm.webp` - Google Project Management Professional Certificate
- [ ] `cert-google-cybersecurity.webp` - Google Cybersecurity Professional Certificate
- [ ] `cert-google-cloud-analytics.webp` - Google Cloud Analytics Badge
- [ ] `cert-google-sheets.webp` - Google Sheets Advanced Certificate

#### Microsoft (`certificates/microsoft/`)
- [ ] `cert-ms-powerbi.webp` - PL-300 Microsoft Power BI Analyst Certification
- [ ] `cert-ms-excel.webp` - Microsoft Excel Associate Certification

#### IBM (`certificates/ibm/`)
- [ ] `cert-ibm-data-analyst.webp` - IBM Data Analyst Professional Certificate
- [ ] `cert-ibm-cognos.webp` - IBM Cognos BI Specialist Badge

#### Coursera (`certificates/coursera/`)
- [ ] `cert-coursera-sql.webp` - SQL for Data Science Certificate

#### Credly (`certificates/credly/`)
- [ ] `cert-credly-powerbi.webp` - Credly Power BI Verified Milestone Badge

#### NAVTTC (`certificates/navttc/`)
- [ ] `cert-navttc-bi.webp` - NAVTTC Business Intelligence National Qualification

---

### 6. Projects & Case Studies (`/public/assets/projects/`)
*Each project gets its own folder named after its normalized ID. The application maps tabs dynamically to these files:*

#### Digital Student Registration (`projects/saylani-registration/`)
- [ ] `desktop-01.webp` - Primary dashboard view screenshot
- [ ] `tablet-01.webp` - Responsive tablet registration screenshot
- [ ] `mobile-01.webp` - Frontline mobile sign-up screenshot
- [ ] `workflow.webp` - Serverless Google Apps Script workflow diagram
- [ ] `architecture.webp` - System database integration architecture schematic

#### Saylani Rotibank Donation System (`projects/saylani-donation/`)
- [ ] `desktop-01.webp`
- [ ] `tablet-01.webp`
- [ ] `mobile-01.webp`
- [ ] `workflow.webp`
- [ ] `architecture.webp`

#### Weather Intelligence Portal (`projects/weather-intelligence/`)
- [ ] `desktop-01.webp`
- [ ] `tablet-01.webp`
- [ ] `mobile-01.webp`
- [ ] `workflow.webp`
- [ ] `architecture.webp`

#### Job Application Tracker (`projects/job-application/`)
- [ ] `desktop-01.webp`
- [ ] `tablet-01.webp`
- [ ] `mobile-01.webp`
- [ ] `workflow.webp`
- [ ] `architecture.webp`

#### Enterpret Steel Analytics (`projects/enterpret-steel/`)
- [ ] `desktop-01.webp`
- [ ] `tablet-01.webp`
- [ ] `mobile-01.webp`
- [ ] `workflow.webp`
- [ ] `architecture.webp`

#### Local BI & SEO Framework (`projects/local-seo/`)
- [ ] `desktop-01.webp`
- [ ] `tablet-01.webp`
- [ ] `mobile-01.webp`
- [ ] `workflow.webp`
- [ ] `architecture.webp`

#### LifeDrop Platform (`projects/lifedrop/`)
- [ ] `desktop-01.webp`
- [ ] `tablet-01.webp`
- [ ] `mobile-01.webp`
- [ ] `workflow.webp`
- [ ] `architecture.webp`

#### Executive BI Dashboard (`projects/executive-dashboard/`)
- [ ] `desktop-01.webp`
- [ ] `tablet-01.webp`
- [ ] `mobile-01.webp`
- [ ] `workflow.webp`
- [ ] `architecture.webp`
