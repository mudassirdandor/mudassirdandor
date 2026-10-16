const fs = require('fs');
const assert = require('assert');
const path = require('path');

console.log('Running Milestone 24.1 Assertions...');

// 1. Verify robots.txt
const robotsPath = path.resolve('public/robots.txt');
assert(fs.existsSync(robotsPath), 'public/robots.txt must exist');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');
assert(robotsContent.includes('User-agent: *'), 'robots.txt must allow User-agent: *');
assert(robotsContent.includes('Allow: /'), 'robots.txt must contain Allow: /');
assert(robotsContent.includes('Sitemap: https://mudassirdandor.vercel.app/sitemap.xml'), 'robots.txt must point to sitemap.xml');
assert(!robotsContent.includes('Disallow: /'), 'robots.txt must not block public routes');
console.log('✔ public/robots.txt verified (valid directives and sitemap URL)');

// 2. Verify sitemap.xml
const sitemapPath = path.resolve('public/sitemap.xml');
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
assert(sitemapContent.startsWith('<?xml'), 'sitemap.xml must have XML declaration');
assert(sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'sitemap.xml must have valid namespace');

const expectedUrls = [
  'https://mudassirdandor.vercel.app/',
  'https://mudassirdandor.vercel.app/projects/saylani-registration',
  'https://mudassirdandor.vercel.app/projects/job-application',
  'https://mudassirdandor.vercel.app/projects/barish-alert',
  'https://mudassirdandor.vercel.app/projects/respondent-data-collection'
];

const locMatches = Array.from(sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
assert.strictEqual(locMatches.length, 5, `sitemap.xml must contain exactly 5 canonical URLs (found ${locMatches.length})`);
for (const url of expectedUrls) {
  assert(locMatches.includes(url), `sitemap.xml must include canonical URL: ${url}`);
}
assert(!sitemapContent.includes('#'), 'sitemap.xml must not contain URL fragments');
assert(!sitemapContent.includes('saylani-student-registration'), 'sitemap.xml must not include alias URLs');
assert(!sitemapContent.includes('job-application-system'), 'sitemap.xml must not include alias URLs');
assert(!sitemapContent.includes('respondent-data-collection-chatbot'), 'sitemap.xml must not include alias URLs');
console.log('✔ public/sitemap.xml verified (exactly 5 canonical URLs, no aliases or fragments)');

// 3. Verify index.html head tags
const indexPath = path.resolve('index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
assert(indexHtml.includes('<title>Mudassir Javed | Data Analyst | Business Intelligence &amp; Data Analytics</title>'), 'index.html must have approved title');
assert(indexHtml.includes('<meta name="description"'), 'index.html must have meta description');
assert(indexHtml.includes('<link rel="canonical" href="https://mudassirdandor.vercel.app/" />'), 'index.html must have canonical link');
assert(!indexHtml.includes('noindex'), 'index.html must not contain noindex');
console.log('✔ index.html verified (canonical link, approved title & description, indexable)');

// 4. Verify caseStudies.ts canonical slugs and SEO metadata
const { CASE_STUDIES } = require('../src/data/caseStudies.ts');
assert.strictEqual(CASE_STUDIES.length, 4, 'Must have 4 qualified case studies');

const expectedCanonicalSlugs = ['saylani-registration', 'job-application', 'barish-alert', 'respondent-data-collection'];
CASE_STUDIES.forEach((cs, i) => {
  const expectedSlug = expectedCanonicalSlugs[i];
  assert.strictEqual(cs.slugs[0], expectedSlug, `Case study ${cs.id} canonical slug must be ${expectedSlug} at index 0`);
  assert(cs.seo, `Case study ${cs.id} must have seo object`);
  assert(cs.seo.title && cs.seo.title.length > 20, `Case study ${cs.id} must have descriptive title`);
  assert(cs.seo.description && cs.seo.description.length > 50, `Case study ${cs.id} must have descriptive description`);
  assert.strictEqual(cs.seo.canonical, `https://mudassirdandor.vercel.app/projects/${expectedSlug}`, `Case study ${cs.id} canonical must match expected canonical URL`);
  console.log(`✔ Case Study [${expectedSlug}] SEO: Title (${cs.seo.title.length}c), Desc (${cs.seo.description.length}c)`);
});

// 5. Verify vercel.json permanent redirects
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert(Array.isArray(vercelConfig.redirects), 'vercel.json must have redirects array');
const redirSaylani = vercelConfig.redirects.find(r => r.source === '/projects/saylani-student-registration');
assert(redirSaylani && redirSaylani.destination === '/projects/saylani-registration' && redirSaylani.permanent === true, 'vercel.json must redirect saylani-student-registration to saylani-registration');
const redirJob = vercelConfig.redirects.find(r => r.source === '/projects/job-application-system');
assert(redirJob && redirJob.destination === '/projects/job-application' && redirJob.permanent === true, 'vercel.json must redirect job-application-system to job-application');
const redirRespondent = vercelConfig.redirects.find(r => r.source === '/projects/respondent-data-collection-chatbot');
assert(redirRespondent && redirRespondent.destination === '/projects/respondent-data-collection' && redirRespondent.permanent === true, 'vercel.json must redirect respondent-data-collection-chatbot to respondent-data-collection');
assert(Array.isArray(vercelConfig.rewrites) && vercelConfig.rewrites.some(r => r.source === '/(.*)' && r.destination === '/'), 'vercel.json must retain SPA rewrite');
console.log('✔ vercel.json verified (alias 301/308 redirects + SPA rewrites preserved)');

// 6. Verify useDocumentHead hook file
assert(fs.existsSync('src/hooks/useDocumentHead.ts'), 'src/hooks/useDocumentHead.ts must exist');
console.log('✔ src/hooks/useDocumentHead.ts verified');

console.log('\nAll Milestone 24.1 verification assertions PASSED successfully!');
