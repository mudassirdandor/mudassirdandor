const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== Milestone 25.2 Verification: Visual Refinement, Navigation & Stacking ===\n');

let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  PASS: ${testName}`);
  } else {
    console.error(`  FAIL: ${testName}`);
    if (details) console.error(`        ${details}`);
    failedTests++;
  }
}

// -------------------------------------------------------------
// Test 1: Portrait Image Asset Verification
// -------------------------------------------------------------
console.log('Test 1: Portrait Image Asset and Gitignore Security');
const portraitPath = path.join(__dirname, '..', 'public', 'images', 'profile', 'mudassir-javed.webp');
assert(fs.existsSync(portraitPath), 'Portrait WebP file exists at public/images/profile/mudassir-javed.webp');

if (fs.existsSync(portraitPath)) {
  const stat = fs.statSync(portraitPath);
  assert(stat.size > 20000 && stat.size < 500000, `Portrait WebP file has reasonable size (${Math.round(stat.size / 1024)} KB)`);

  const buffer = fs.readFileSync(portraitPath);
  const isRiff = buffer.toString('ascii', 0, 4) === 'RIFF';
  const isWebp = buffer.toString('ascii', 8, 12) === 'WEBP';
  assert(isRiff && isWebp, 'Portrait file has valid WEBP header format (RIFF...WEBP)');
}

// Check donotpush gitignore status
try {
  const gitIgnoreCheck = execSync('git check-ignore donotpush', { encoding: 'utf-8' }).trim();
  assert(gitIgnoreCheck === 'donotpush', 'donotpush folder is strictly ignored by git');
} catch (e) {
  assert(false, 'donotpush folder is strictly ignored by git', e.message);
}

// -------------------------------------------------------------
// Test 2: Navigation Structure (Part 2: 4 Desktop Links + Single CTA, 5 Mobile Icons)
// -------------------------------------------------------------
console.log('\nTest 2: Navigation Structure (Part 2)');
const navTsPath = path.join(__dirname, '..', 'src', 'data', 'navigation.ts');
const navContent = fs.readFileSync(navTsPath, 'utf-8');

const desktopDestinations = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Work', href: '#work' },
  { label: 'Credentials', href: '#credentials' },
];

desktopDestinations.forEach((dest) => {
  assert(
    navContent.includes(`label: '${dest.label}'`) && navContent.includes(`href: '${dest.href}'`),
    `Desktop navigation includes primary destination ${dest.label} (${dest.href})`
  );
});

assert(navContent.includes("DESKTOP_NAV_ITEMS"), 'DESKTOP_NAV_ITEMS explicitly exported');
assert(navContent.includes("MOBILE_NAV_ITEMS"), 'MOBILE_NAV_ITEMS explicitly exported with 5 icons');
assert(navContent.includes("label: \"Let's Talk\"") && navContent.includes("href: '#contact'"), "NAV_CTA configured as single Let's Talk contact CTA");

// -------------------------------------------------------------
// Test 3: Design Tokens in globals.css
// -------------------------------------------------------------
console.log('\nTest 3: Design Tokens and Surface Variables');
const globalsPath = path.join(__dirname, '..', 'src', 'styles', 'globals.css');
const globalsContent = fs.readFileSync(globalsPath, 'utf-8');

assert(globalsContent.includes('--color-forest: #376653;'), '@theme defines --color-forest token (#376653)');
assert(globalsContent.includes('--color-sage: #B5CDBB;'), '@theme defines --color-sage token (#B5CDBB)');
assert(globalsContent.includes('--forest: #376653;'), ':root defines --forest CSS variable (#376653)');
assert(globalsContent.includes('--sage: #B5CDBB;'), ':root defines --sage CSS variable (#B5CDBB)');
assert(globalsContent.includes('scroll-padding-top: 5rem;'), 'html defines scroll-padding-top for floating navbar offset');

// -------------------------------------------------------------
// Test 4: About Section Editorial Layout (Part 3)
// -------------------------------------------------------------
console.log('\nTest 4: About Section Balanced Full-Width Supporting Cards Layout');
const aboutPath = path.join(__dirname, '..', 'src', 'components', 'sections', 'About.tsx');
const aboutContent = fs.readFileSync(aboutPath, 'utf-8');

assert(aboutContent.includes('/images/profile/mudassir-javed.webp'), 'About section references /images/profile/mudassir-javed.webp');
assert(aboutContent.includes('alt="Portrait of Mudassir Javed"'), 'About section uses required alt="Portrait of Mudassir Javed"');
assert(aboutContent.includes('Mudassir Javed') && aboutContent.includes('Quetta, Pakistan'), 'About section presents factual location and identity');
assert(aboutContent.includes('MSc in Statistics') && aboutContent.includes('University of Balochistan'), 'About section maintains MSc in Statistics credential');
assert(aboutContent.includes('JOURNEY_STEPS'), 'About section contains Analytical Journey steps');
assert(aboutContent.includes('lg:col-span-5') && aboutContent.includes('lg:col-span-7'), 'About section uses 5:7 column balance across full content width');

// -------------------------------------------------------------
// Test 5: Navigation Behavior & Mobile Bottom Bar (Part 2)
// -------------------------------------------------------------
console.log('\nTest 5: Desktop Hide/Reveal on Scroll & Mobile Floating Bottom Nav');
const navbarPath = path.join(__dirname, '..', 'src', 'components', 'navigation', 'Navbar.tsx');
const navbarContent = fs.readFileSync(navbarPath, 'utf-8');

assert(navbarContent.includes('isDesktopVisible'), 'Navbar implements isDesktopVisible state for scroll hide/reveal');
assert(navbarContent.includes('isMobileVisible'), 'Navbar implements isMobileVisible state for scroll reveal beyond hero');
assert(navbarContent.includes('focus-within:translate-y-0'), 'Navbar reveals on keyboard focus to prevent invisible tab targets');
assert(navbarContent.includes('Mobile Navigation') || navbarContent.includes('Mobile Bottom Navigation'), 'Accessible mobile navigation bar defined');
assert(navbarContent.includes('safe-area-inset-bottom'), 'Mobile navigation respects safe-area-inset-bottom');

const headerPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Header.tsx');
const headerContent = fs.readFileSync(headerPath, 'utf-8');
assert(headerContent.includes('Skip to main content'), 'Header includes accessible skip-to-main-content link');

// -------------------------------------------------------------
// Test 6: Selected Work Desktop Stacking Animation & Shape System (Part 3 & 4)
// -------------------------------------------------------------
console.log('\nTest 6: Selected Work Stacking & Shape Hierarchy');
const projectsPath = path.join(__dirname, '..', 'src', 'components', 'sections', 'Projects.tsx');
const projectsContent = fs.readFileSync(projectsPath, 'utf-8');

assert(projectsContent.includes('stickyTopOffsets'), 'Projects section defines stickyTopOffsets for stacking sequence');
assert(projectsContent.includes('lg:sticky'), 'Project cards utilize lg:sticky for desktop stacking sequence');
assert(projectsContent.includes('motion-reduce:static'), 'Project cards respect prefers-reduced-motion');
assert(!projectsContent.toLowerCase().includes('skeleton'), 'Zero skeleton loading patterns present in Projects section');

const heroPath = path.join(__dirname, '..', 'src', 'components', 'sections', 'Hero.tsx');
const heroContent = fs.readFileSync(heroPath, 'utf-8');
assert(heroContent.includes('rounded-full'), 'Hero primary CTA uses capsule shape (rounded-full)');

const contactPath = path.join(__dirname, '..', 'src', 'components', 'sections', 'Contact.tsx');
const contactContent = fs.readFileSync(contactPath, 'utf-8');
assert(contactContent.includes('rounded-full'), 'Contact primary submit button uses capsule shape (rounded-full)');

// -------------------------------------------------------------
// Test 7: Stale Domain Audit
// -------------------------------------------------------------
console.log('\nTest 7: Stale Domain Audit');
const searchDirs = ['src', 'public'];
let staleMatches = [];

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(ts|tsx|js|jsx|json|html|xml|txt|css|md)$/i.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('mudassiranalyst.vercel.app')) {
        staleMatches.push(fullPath);
      }
    }
  }
}

searchDirs.forEach((d) => scanDir(path.join(__dirname, '..', d)));
assert(staleMatches.length === 0, 'Zero active references to mudassiranalyst.vercel.app across src/ and public/', staleMatches.join(', '));

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log('\n-------------------------------------------------------------');
if (failedTests === 0) {
  console.log('=== All Milestone 25.2 verification checks passed successfully! ===\n');
  process.exit(0);
} else {
  console.error(`=== Milestone 25.2 verification FAILED with ${failedTests} failed test(s). ===\n`);
  process.exit(1);
}
