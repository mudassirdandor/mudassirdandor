const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

const routes = [
  {
    slug: 'saylani-registration',
    title: 'Saylani Student Registration Case Study | Mudassir Javed',
    description:
      'Case study on automated student data collection, client-side input validation, image preprocessing, and dynamic credential badge generation by Mudassir Javed.',
    canonical: 'https://mudassirdandor.vercel.app/projects/saylani-registration',
    ogImage: 'https://mudassirdandor.vercel.app/images/projects/saylani-registration.webp',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Saylani Student Registration System Case Study',
      name: 'Saylani Student Registration System',
      description:
        'Case study on automated student data collection, client-side input validation, image preprocessing, and dynamic credential badge generation by Mudassir Javed.',
      url: 'https://mudassirdandor.vercel.app/projects/saylani-registration',
      image: 'https://mudassirdandor.vercel.app/images/projects/saylani-registration.webp',
      author: {
        '@type': 'Person',
        name: 'Mudassir Javed',
        url: 'https://mudassirdandor.vercel.app/',
      },
      inLanguage: 'en-US',
    },
  },
  {
    slug: 'job-application',
    title: 'Job Application System Case Study | Mudassir Javed',
    description:
      'Case study on multi-step progressive form architecture, field-level validation gates, and real-time completion tracking engineered by Mudassir Javed.',
    canonical: 'https://mudassirdandor.vercel.app/projects/job-application',
    ogImage: 'https://mudassirdandor.vercel.app/images/projects/job-application.webp',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Job Application Data Collection System Case Study',
      name: 'Job Application Data Collection System',
      description:
        'Case study on multi-step progressive form architecture, field-level validation gates, and real-time completion tracking engineered by Mudassir Javed.',
      url: 'https://mudassirdandor.vercel.app/projects/job-application',
      image: 'https://mudassirdandor.vercel.app/images/projects/job-application.webp',
      author: {
        '@type': 'Person',
        name: 'Mudassir Javed',
        url: 'https://mudassirdandor.vercel.app/',
      },
      inLanguage: 'en-US',
    },
  },
  {
    slug: 'barish-alert',
    title: 'Barish Alert Weather App Case Study | Mudassir Javed',
    description:
      'Case study on meteorological API telemetry ingestion, dynamic unit transformations, exponential backoff retries, and dashboard reporting by Mudassir Javed.',
    canonical: 'https://mudassirdandor.vercel.app/projects/barish-alert',
    ogImage: 'https://mudassirdandor.vercel.app/images/projects/barish-alert.webp',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Barish Alert Weather Application Case Study',
      name: 'Barish Alert — Weather Application',
      description:
        'Case study on meteorological API telemetry ingestion, dynamic unit transformations, exponential backoff retries, and dashboard reporting by Mudassir Javed.',
      url: 'https://mudassirdandor.vercel.app/projects/barish-alert',
      image: 'https://mudassirdandor.vercel.app/images/projects/barish-alert.webp',
      author: {
        '@type': 'Person',
        name: 'Mudassir Javed',
        url: 'https://mudassirdandor.vercel.app/',
      },
      inLanguage: 'en-US',
    },
  },
];

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

for (const route of routes) {
  const routeDir = path.join(distDir, 'projects', route.slug);
  fs.mkdirSync(routeDir, { recursive: true });

  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(route.title)}</title>`);

  // Replace Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );

  // Replace Canonical
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/s,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // Replace Open Graph
  html = html.replace(
    /<meta property="og:type" content=".*?" \/>/s,
    '<meta property="og:type" content="article" />'
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/s,
    `<meta property="og:url" content="${route.canonical}" />`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/s,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/s,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/s,
    `<meta property="og:image" content="${route.ogImage}" />`
  );

  // Replace Twitter
  html = html.replace(
    /<meta name="twitter:url" content=".*?" \/>/s,
    `<meta name="twitter:url" content="${route.canonical}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/s,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/s,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?" \/>/s,
    `<meta name="twitter:image" content="${route.ogImage}" />`
  );

  // Replace JSON-LD
  const jsonLdString = JSON.stringify(route.jsonLd, null, 2);
  html = html.replace(
    /<script id="schema-json-ld" type="application\/ld\+json">.*?<\/script>/s,
    `<script id="schema-json-ld" type="application/ld+json">\n${jsonLdString}\n    </script>`
  );

  const destFile = path.join(routeDir, 'index.html');
  fs.writeFileSync(destFile, html, 'utf8');
  console.log(`[prerender] Generated static SEO shell for: /projects/${route.slug}`);
}

console.log('[prerender] Completed generating all project SEO shells.');
