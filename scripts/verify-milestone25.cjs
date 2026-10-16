const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert');

console.log('=== Milestone 25 Verification: Respondent Case Study & Domain Reference Cleanup ===\n');

const rootDir = path.resolve(__dirname, '..');

// 1. Verify Sitemap Contains Exactly 5 Canonical URLs
console.log('Test 1: Verify public/sitemap.xml has 5 canonical URLs');
const sitemapContent = fs.readFileSync(path.join(rootDir, 'public/sitemap.xml'), 'utf8');
const locMatches = Array.from(sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)).map((m) => m[1]);
const expectedUrls = [
  'https://mudassirdandor.vercel.app/',
  'https://mudassirdandor.vercel.app/projects/saylani-registration',
  'https://mudassirdandor.vercel.app/projects/job-application',
  'https://mudassirdandor.vercel.app/projects/barish-alert',
  'https://mudassirdandor.vercel.app/projects/respondent-data-collection',
];
assert.strictEqual(locMatches.length, 5, `Expected 5 sitemap URLs, got ${locMatches.length}`);
for (const u of expectedUrls) {
  assert(locMatches.includes(u), `Missing URL in sitemap: ${u}`);
}
assert(!sitemapContent.includes('mudassiranalyst.vercel.app'), 'Old domain found in sitemap.xml');
console.log('  PASS: public/sitemap.xml has exactly 5 canonical URLs on mudassirdandor.vercel.app.');

// 2. Verify Robots.txt and llms.txt
console.log('\nTest 2: Verify robots.txt and llms.txt');
const robotsContent = fs.readFileSync(path.join(rootDir, 'public/robots.txt'), 'utf8');
assert(robotsContent.includes('Sitemap: https://mudassirdandor.vercel.app/sitemap.xml'));
assert(!robotsContent.includes('mudassiranalyst.vercel.app'), 'Old domain in robots.txt');

const llmsContent = fs.readFileSync(path.join(rootDir, 'public/llms.txt'), 'utf8');
assert(llmsContent.includes('https://mudassirdandor.vercel.app/projects/respondent-data-collection'));
assert(llmsContent.includes('https://saylani-rotibank-mu.vercel.app/'));
assert(llmsContent.includes('https://github.com/mudassirdandor/Saylani_rotibank'));
assert(!llmsContent.includes('mudassiranalyst.vercel.app'), 'Old domain in llms.txt');
console.log('  PASS: robots.txt and llms.txt fully verified.');

// 3. Verify Case Studies Data
console.log('\nTest 3: Verify caseStudies.ts contains all 4 projects');
const { CASE_STUDIES, getCaseStudyBySlug } = require('../src/data/caseStudies.ts');
assert.strictEqual(CASE_STUDIES.length, 4, `Expected 4 case studies, found ${CASE_STUDIES.length}`);

const respondentStudy = getCaseStudyBySlug('respondent-data-collection');
assert(respondentStudy, 'respondent-data-collection not found in caseStudies');
assert.strictEqual(respondentStudy.slugs[0], 'respondent-data-collection');
assert(respondentStudy.slugs.includes('respondent-data-collection-chatbot'));
assert.strictEqual(respondentStudy.liveUrl, 'https://saylani-rotibank-mu.vercel.app/');
assert.strictEqual(respondentStudy.githubUrl, 'https://github.com/mudassirdandor/Saylani_rotibank');
assert.strictEqual(respondentStudy.seo.canonical, 'https://mudassirdandor.vercel.app/projects/respondent-data-collection');
console.log('  PASS: caseStudies.ts verified.');

// 4. Verify Projects Card in projects.ts
console.log('\nTest 4: Verify projects.ts links to respondent case study');
const { PROJECTS } = require('../src/data/projects.ts');
assert.strictEqual(PROJECTS.length, 4, 'Expected 4 projects in projects.ts');
const respondentCard = PROJECTS.find((p) => p.id === 'respondent-data-collection');
assert(respondentCard, 'respondent-data-collection missing in projects.ts');
const mappedStudy = getCaseStudyBySlug(respondentCard.id);
assert(mappedStudy, 'Project card does not map to a case study');
assert.strictEqual(mappedStudy.slugs[0], 'respondent-data-collection');
console.log('  PASS: projects.ts project card mapped successfully.');

// 5. Verify Pre-rendered Static Shell in dist/
console.log('\nTest 5: Verify pre-rendered shell in dist/');
const shellPath = path.join(rootDir, 'dist/projects/respondent-data-collection/index.html');
assert(fs.existsSync(shellPath), 'Pre-rendered shell missing for respondent-data-collection');
const shellHtml = fs.readFileSync(shellPath, 'utf8');
assert(shellHtml.includes('<title>Respondent Data Collection Case Study | Mudassir Javed</title>'));
assert(shellHtml.includes('<link rel="canonical" href="https://mudassirdandor.vercel.app/projects/respondent-data-collection" />'));
assert(shellHtml.includes('property="og:url" content="https://mudassirdandor.vercel.app/projects/respondent-data-collection"'));
assert(shellHtml.includes('property="og:type" content="article"'));
assert(!shellHtml.includes('mudassiranalyst.vercel.app'), 'Old domain found in shell');

// JSON-LD in shell
const jsonLdMatch = shellHtml.match(/<script id="schema-json-ld" type="application\/ld\+json">(.*?)<\/script>/s);
assert(jsonLdMatch, 'JSON-LD missing in respondent shell');
const parsedJsonLd = JSON.parse(jsonLdMatch[1].trim());
assert.strictEqual(parsedJsonLd['@type'], 'TechArticle');
assert.strictEqual(parsedJsonLd.url, 'https://mudassirdandor.vercel.app/projects/respondent-data-collection');
assert.strictEqual(parsedJsonLd.author.name, 'Mudassir Javed');
console.log('  PASS: dist/projects/respondent-data-collection/index.html pre-rendered shell valid.');

// 6. Zero Stale References Check across Active Code
console.log('\nTest 6: Check for zero stale domain references across active directories');
const activeFiles = [
  'index.html',
  'vercel.json',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/llms.txt',
  'public/site.webmanifest',
  'src/App.tsx',
  'src/data/projects.ts',
  'src/data/caseStudies.ts',
  'src/components/sections/Projects.tsx',
  'src/components/sections/CaseStudy.tsx',
  'src/components/sections/CaseStudyNotFound.tsx',
  'scripts/prerender-seo-shells.cjs',
  'scripts/verify-milestone24-1.cjs',
  'scripts/verify-milestone24-2.cjs',
];
for (const file of activeFiles) {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    assert(!content.includes('mudassiranalyst.vercel.app'), `Stale domain found in active file: ${file}`);
  }
}
console.log('  PASS: Zero active references to mudassiranalyst.vercel.app in active code.');

// 7. Local HTTP Server & Routing Test
console.log('\nTest 7: Local HTTP Server verification for canonical routes and redirects');
const vercelConfig = JSON.parse(fs.readFileSync(path.join(rootDir, 'vercel.json'), 'utf8'));
const distDir = path.join(rootDir, 'dist');

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  const redirect = vercelConfig.redirects.find((r) => r.source === urlPath);
  if (redirect) {
    res.writeHead(redirect.permanent ? 308 : 307, {
      Location: redirect.destination,
      'Content-Type': 'text/plain',
    });
    res.end(`Redirecting to ${redirect.destination}`);
    return;
  }

  let filePath = path.join(distDir, urlPath === '/' ? 'index.html' : urlPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath);
    const ext = path.extname(filePath);
    const contentType = ext === '.html' ? 'text/html' : ext === '.json' ? 'application/json' : 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
    return;
  }

  const indexFallback = path.join(distDir, 'index.html');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(fs.readFileSync(indexFallback));
});

function httpGet(port, requestPath) {
  return new Promise((resolve, reject) => {
    http.get({ hostname: '127.0.0.1', port, path: requestPath }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    }).on('error', reject);
  });
}

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;
  try {
    // 7.1 Verify all 4 canonical case-study routes
    const routesToTest = [
      { path: '/projects/saylani-registration', title: 'Saylani Student Registration Case Study' },
      { path: '/projects/job-application', title: 'Job Application System Case Study' },
      { path: '/projects/barish-alert', title: 'Barish Alert Weather App Case Study' },
      { path: '/projects/respondent-data-collection', title: 'Respondent Data Collection Case Study' },
    ];

    for (const r of routesToTest) {
      const res = await httpGet(port, r.path);
      assert.strictEqual(res.statusCode, 200, `Failed for ${r.path}`);
      assert(res.body.includes(r.title), `Title missing for ${r.path}`);
      console.log(`  PASS: GET ${r.path} returned 200 OK.`);
    }

    // 7.2 Verify 308 redirects for aliases
    const aliasesToTest = [
      { from: '/projects/saylani-student-registration', to: '/projects/saylani-registration' },
      { from: '/projects/job-application-system', to: '/projects/job-application' },
      { from: '/projects/respondent-data-collection-chatbot', to: '/projects/respondent-data-collection' },
    ];

    for (const a of aliasesToTest) {
      const res = await httpGet(port, a.from);
      assert.strictEqual(res.statusCode, 308, `Expected 308 for ${a.from}`);
      assert.strictEqual(res.headers.location, a.to, `Expected redirect to ${a.to}`);
      console.log(`  PASS: GET ${a.from} returned 308 redirect to ${a.to}.`);
    }

    console.log('\n=== All Milestone 25 verification checks passed successfully! ===');
  } catch (err) {
    console.error('Milestone 25 Verification Failed:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
