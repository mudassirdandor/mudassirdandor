const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert');

console.log('=== Milestone 24.2 Verification: Social Metadata, Structured Data & Search Enhancements ===\n');

const rootDir = path.resolve(__dirname, '..');

// 1. Verify public/site.webmanifest
console.log('Test 1: Verify public/site.webmanifest tokens and structure');
const manifestPath = path.join(rootDir, 'public/site.webmanifest');
assert(fs.existsSync(manifestPath), 'public/site.webmanifest must exist');
const manifestContent = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert(manifestContent.name && manifestContent.name.includes('Mudassir Javed'), 'Manifest name missing');
assert(manifestContent.short_name === 'Mudassir Javed', 'Manifest short_name mismatch');
assert.strictEqual(manifestContent.theme_color, '#25483C', 'Manifest theme_color must match authoritative Deep Pine token #25483C');
assert.strictEqual(manifestContent.background_color, '#F5F7F4', 'Manifest background_color must match Porcelain token #F5F7F4');
assert(Array.isArray(manifestContent.icons) && manifestContent.icons.length > 0, 'Manifest icons missing');
console.log('  PASS: site.webmanifest valid with authoritative #25483C theme_color.');

// 2. Verify public/llms.txt
console.log('\nTest 2: Verify public/llms.txt content');
const llmsPath = path.join(rootDir, 'public/llms.txt');
assert(fs.existsSync(llmsPath), 'public/llms.txt must exist');
const llmsContent = fs.readFileSync(llmsPath, 'utf8');
assert(llmsContent.includes('Mudassir Javed'), 'llms.txt must mention Mudassir Javed');
assert(llmsContent.includes('MSc in Statistics'), 'llms.txt must mention education');
assert(llmsContent.includes('https://mudassiranalyst.vercel.app/projects/saylani-registration'), 'Saylani URL missing');
assert(llmsContent.includes('https://mudassiranalyst.vercel.app/projects/job-application'), 'Job Application URL missing');
assert(llmsContent.includes('https://mudassiranalyst.vercel.app/projects/barish-alert'), 'Barish Alert URL missing');
assert(llmsContent.includes('/documents/Mudassir_Javed_CV.pdf'), 'CV link missing');
console.log('  PASS: llms.txt valid and grounded.');

// 3. Verify Referenced Image Assets
console.log('\nTest 3: Verify referenced images exist in public/ and have valid specs');
const ogImagePath = path.join(rootDir, 'public/images/og-portfolio.png');
assert(fs.existsSync(ogImagePath), 'public/images/og-portfolio.png must exist');
const ogBuffer = fs.readFileSync(ogImagePath);
const ogWidth = ogBuffer.readUInt32BE(16);
const ogHeight = ogBuffer.readUInt32BE(20);
assert.strictEqual(ogWidth, 1200, 'OG image width must be 1200');
assert.strictEqual(ogHeight, 630, 'OG image height must be 630');
console.log(`  PASS: public/images/og-portfolio.png exists with exact dimensions ${ogWidth}x${ogHeight}px.`);

const projectImages = [
  'public/images/projects/saylani-registration.webp',
  'public/images/projects/job-application.webp',
  'public/images/projects/barish-alert.webp',
];
for (const img of projectImages) {
  const p = path.join(rootDir, img);
  assert(fs.existsSync(p), `Image asset missing: ${img}`);
  assert(fs.statSync(p).size > 0, `Image asset empty: ${img}`);
  console.log(`  PASS: Project asset verified: ${img}`);
}

// 4. Verify index.html tags and JSON-LD
console.log('\nTest 4: Verify index.html contains manifest, Deep Pine theme-color, Open Graph, Twitter, and JSON-LD');
const indexHtmlPath = path.join(rootDir, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
assert(indexHtml.includes('<link rel="manifest" href="/site.webmanifest" />'), 'Manifest link missing in index.html');
assert(indexHtml.includes('<meta name="theme-color" content="#25483C" />'), 'Theme color #25483C missing in index.html');
assert(indexHtml.includes('property="og:title"'), 'og:title missing in index.html');
assert(indexHtml.includes('property="og:description"'), 'og:description missing in index.html');
assert(indexHtml.includes('property="og:image" content="https://mudassiranalyst.vercel.app/images/og-portfolio.png"'), 'og:image mismatch in index.html');
assert(indexHtml.includes('property="og:url" content="https://mudassiranalyst.vercel.app/"'), 'og:url missing in index.html');
assert(indexHtml.includes('name="twitter:card" content="summary_large_image"'), 'twitter:card missing in index.html');
assert(indexHtml.includes('name="twitter:image" content="https://mudassiranalyst.vercel.app/images/og-portfolio.png"'), 'twitter:image mismatch in index.html');
assert(indexHtml.includes('id="schema-json-ld"'), 'script#schema-json-ld missing in index.html');

// Validate index.html JSON-LD
const indexJsonLdMatch = indexHtml.match(/<script id="schema-json-ld" type="application\/ld\+json">(.*?)<\/script>/s);
assert(indexJsonLdMatch, 'Could not find JSON-LD in index.html');
const indexJsonLd = JSON.parse(indexJsonLdMatch[1].trim());
assert.strictEqual(indexJsonLd['@context'], 'https://schema.org', 'Index JSON-LD context invalid');
assert(Array.isArray(indexJsonLd['@graph']), 'Index JSON-LD must contain @graph');
const websiteNode = indexJsonLd['@graph'].find((n) => n['@type'] === 'WebSite');
const personNode = indexJsonLd['@graph'].find((n) => n['@type'] === 'Person');
assert(websiteNode && websiteNode.url === 'https://mudassiranalyst.vercel.app/', 'WebSite schema node invalid');
assert(personNode && personNode.name === 'Mudassir Javed', 'Person schema node invalid');
assert.strictEqual(personNode.image, 'https://mudassiranalyst.vercel.app/images/og-portfolio.png', 'Person image mismatch');
console.log('  PASS: index.html tags and JSON-LD valid.');

// 5. Verify dist static pre-rendered shells
console.log('\nTest 5: Verify dist/ contains pre-rendered HTML shells for canonical routes');
const distDir = path.join(rootDir, 'dist');
const routes = [
  {
    slug: 'saylani-registration',
    title: 'Saylani Student Registration Case Study | Mudassir Javed',
    canonical: 'https://mudassiranalyst.vercel.app/projects/saylani-registration',
    image: 'https://mudassiranalyst.vercel.app/images/projects/saylani-registration.webp',
  },
  {
    slug: 'job-application',
    title: 'Job Application System Case Study | Mudassir Javed',
    canonical: 'https://mudassiranalyst.vercel.app/projects/job-application',
    image: 'https://mudassiranalyst.vercel.app/images/projects/job-application.webp',
  },
  {
    slug: 'barish-alert',
    title: 'Barish Alert Weather App Case Study | Mudassir Javed',
    canonical: 'https://mudassiranalyst.vercel.app/projects/barish-alert',
    image: 'https://mudassiranalyst.vercel.app/images/projects/barish-alert.webp',
  },
];

for (const route of routes) {
  const shellPath = path.join(distDir, 'projects', route.slug, 'index.html');
  assert(fs.existsSync(shellPath), `Pre-rendered shell missing for /projects/${route.slug}`);
  const shellHtml = fs.readFileSync(shellPath, 'utf8');
  assert(shellHtml.includes(`<title>${route.title}</title>`), `Title mismatch in /projects/${route.slug}`);
  assert(shellHtml.includes(`<link rel="canonical" href="${route.canonical}" />`), `Canonical mismatch in /projects/${route.slug}`);
  assert(shellHtml.includes(`property="og:url" content="${route.canonical}"`), `og:url mismatch in /projects/${route.slug}`);
  assert(shellHtml.includes('property="og:type" content="article"'), `og:type must be article in /projects/${route.slug}`);
  assert(shellHtml.includes(`property="og:image" content="${route.image}"`), `og:image mismatch in /projects/${route.slug}`);
  assert(shellHtml.includes(`name="twitter:url" content="${route.canonical}"`), `twitter:url mismatch in /projects/${route.slug}`);
  assert(shellHtml.includes(`name="twitter:image" content="${route.image}"`), `twitter:image mismatch in /projects/${route.slug}`);

  // Parse JSON-LD in shell
  const shellJsonLdMatch = shellHtml.match(/<script id="schema-json-ld" type="application\/ld\+json">(.*?)<\/script>/s);
  assert(shellJsonLdMatch, `JSON-LD missing in shell for /projects/${route.slug}`);
  const shellJsonLd = JSON.parse(shellJsonLdMatch[1].trim());
  assert.strictEqual(shellJsonLd['@context'], 'https://schema.org', `Invalid context in /projects/${route.slug}`);
  assert.strictEqual(shellJsonLd['@type'], 'TechArticle', `Invalid @type in /projects/${route.slug}`);
  assert.strictEqual(shellJsonLd.url, route.canonical, `Invalid JSON-LD URL in /projects/${route.slug}`);
  assert(shellJsonLd.author && shellJsonLd.author.name === 'Mudassir Javed', `Invalid author in /projects/${route.slug}`);
  assert.strictEqual(shellJsonLd.image, route.image, `Invalid JSON-LD image in /projects/${route.slug}`);
  console.log(`  PASS: Static pre-rendered shell valid for /projects/${route.slug}`);
}

// 6. Local HTTP Server Verification for Canonical Paths & Redirects
console.log('\nTest 6: Local HTTP Server Verification for Canonical Paths and Alias Redirects');

// Load vercel.json configuration
const vercelConfig = JSON.parse(fs.readFileSync(path.join(rootDir, 'vercel.json'), 'utf8'));

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  // 1. Check vercel.json redirects
  const redirect = vercelConfig.redirects.find((r) => r.source === urlPath);
  if (redirect) {
    res.writeHead(redirect.permanent ? 308 : 307, {
      Location: redirect.destination,
      'Content-Type': 'text/plain',
    });
    res.end(`Redirecting to ${redirect.destination}`);
    return;
  }

  // 2. Serve static files from dist
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

  // 3. Fallback to dist/index.html (SPA rewrite)
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
    // 6.1 Test Root Canonical Path
    const rootRes = await httpGet(port, '/');
    assert.strictEqual(rootRes.statusCode, 200);
    assert(rootRes.body.includes('<title>Mudassir Javed | Data Analyst | Business Intelligence &amp; Data Analytics</title>'));
    assert(rootRes.body.includes('property="og:image" content="https://mudassiranalyst.vercel.app/images/og-portfolio.png"'));
    console.log('  PASS: HTTP GET / served 200 with homepage metadata and og-portfolio.png.');

    // 6.2 Test Saylani Canonical Path
    const saylaniRes = await httpGet(port, '/projects/saylani-registration');
    assert.strictEqual(saylaniRes.statusCode, 200);
    assert(saylaniRes.body.includes('<title>Saylani Student Registration Case Study | Mudassir Javed</title>'));
    assert(saylaniRes.body.includes('property="og:image" content="https://mudassiranalyst.vercel.app/images/projects/saylani-registration.webp"'));
    console.log('  PASS: HTTP GET /projects/saylani-registration served 200 with case study metadata.');

    // 6.3 Test Saylani Alias 308 Redirect
    const saylaniAliasRes = await httpGet(port, '/projects/saylani-student-registration');
    assert.strictEqual(saylaniAliasRes.statusCode, 308);
    assert.strictEqual(saylaniAliasRes.headers.location, '/projects/saylani-registration');
    console.log('  PASS: HTTP GET /projects/saylani-student-registration returned 308 redirect to /projects/saylani-registration.');

    // 6.4 Test Job Application Canonical Path
    const jobRes = await httpGet(port, '/projects/job-application');
    assert.strictEqual(jobRes.statusCode, 200);
    assert(jobRes.body.includes('<title>Job Application System Case Study | Mudassir Javed</title>'));
    console.log('  PASS: HTTP GET /projects/job-application served 200 with case study metadata.');

    // 6.5 Test Job Application Alias 308 Redirect
    const jobAliasRes = await httpGet(port, '/projects/job-application-system');
    assert.strictEqual(jobAliasRes.statusCode, 308);
    assert.strictEqual(jobAliasRes.headers.location, '/projects/job-application');
    console.log('  PASS: HTTP GET /projects/job-application-system returned 308 redirect to /projects/job-application.');

    // 6.6 Test Barish Alert Canonical Path
    const barishRes = await httpGet(port, '/projects/barish-alert');
    assert.strictEqual(barishRes.statusCode, 200);
    assert(barishRes.body.includes('<title>Barish Alert Weather App Case Study | Mudassir Javed</title>'));
    console.log('  PASS: HTTP GET /projects/barish-alert served 200 with case study metadata.');

    console.log('\n=== All Milestone 24.2 assertions & HTTP server tests passed successfully! ===');
  } catch (err) {
    console.error('Verification failed:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
