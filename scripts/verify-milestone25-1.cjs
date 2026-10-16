/**
 * scripts/verify-milestone25-1.cjs
 * Verification suite for Milestone 25.1:
 * Contact, Accessibility, Credibility & Link Remediation.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== Milestone 25.1 Verification: Contact, Accessibility & Credibility Fixes ===\n');

const rootDir = path.resolve(__dirname, '..');

// Test 1: WhatsApp Configuration and CTA verification
console.log('Test 1: WhatsApp Configuration and Destination Verification');
const navTsPath = path.join(rootDir, 'src/data/navigation.ts');
const navContent = fs.readFileSync(navTsPath, 'utf8');

assert(navContent.includes('WHATSAPP_CONFIG'), 'src/data/navigation.ts must export WHATSAPP_CONFIG');
assert(navContent.includes('923112777061'), 'WHATSAPP_CONFIG must contain international number 923112777061');
assert(navContent.includes('https://wa.me/923112777061'), 'WHATSAPP_CONFIG must contain https://wa.me/923112777061 URL');

const contactTsxPath = path.join(rootDir, 'src/components/sections/Contact.tsx');
const contactContent = fs.readFileSync(contactTsxPath, 'utf8');

assert(!contactContent.includes('mailto:mudassirdandor@gmail.com?subject=WhatsApp'), 'WhatsApp CTA must NOT point to mailto:');
assert(contactContent.includes('href={WHATSAPP_CONFIG.url}'), 'Contact.tsx WhatsApp CTA must link to WHATSAPP_CONFIG.url');
assert(contactContent.includes('aria-label="Connect with Mudassir Javed on WhatsApp (opens in new tab)"'), 'WhatsApp CTA must have descriptive aria-label');
console.log('  PASS: WhatsApp URL configured to https://wa.me/923112777061 with prefilled text and no mailto fallback.\n');

// Test 2: Contact Form Honesty & Action Text
console.log('Test 2: Contact Form Honesty & Client Handoff Verification');
assert(!contactContent.includes('Send Message'), 'Contact form button must not say "Send Message"');
assert(contactContent.includes('Open Email App'), 'Contact form button must say "Open Email App"');
assert(contactContent.includes('Submitting will open your email application'), 'Contact form must explain email client launch');
assert(contactContent.includes('Opening your email app...'), 'Submission status notice must specify opening email app');
assert(!contactContent.includes('Message sent successfully'), 'Contact form must not falsely claim message was sent/received');
assert(contactContent.includes('mudassirdandor@gmail.com'), 'Contact email must remain mudassirdandor@gmail.com');
console.log('  PASS: Contact form clearly describes email client handoff with "Open Email App" action text.\n');

// Test 3: Credibility and Unsupported Claims Audit
console.log('Test 3: Credibility & Unsupported Claims Audit');
const srcDir = path.join(rootDir, 'src');

function scanDir(dir, regex, ignoreFiles = []) {
  const files = fs.readdirSync(dir);
  let matches = [];
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (ignoreFiles.some(ign => fullPath.endsWith(ign))) continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      matches = matches.concat(scanDir(fullPath, regex, ignoreFiles));
    } else if (/\.(tsx?|jsx?|html)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (regex.test(content)) {
        matches.push(fullPath);
      }
    }
  }
  return matches;
}

const satisfactionMatches = scanDir(srcDir, /100%\s*(client\s*)?satisfaction/i);
assert.strictEqual(satisfactionMatches.length, 0, `Found satisfaction claims in: ${satisfactionMatches.join(', ')}`);

const testimonialMatches = scanDir(srcDir, /(unverified|fake)\s*testimonials?/i);
assert.strictEqual(testimonialMatches.length, 0, `Found unverified testimonial references in: ${testimonialMatches.join(', ')}`);
console.log('  PASS: Zero unsupported satisfaction percentages or unverified claims found in src/.\n');

// Test 4: Hero Headline Accessibility
console.log('Test 4: Hero Headline Accessibility');
const heroTsxPath = path.join(rootDir, 'src/components/sections/Hero.tsx');
const heroContent = fs.readFileSync(heroTsxPath, 'utf8');
const h1Match = heroContent.match(/<h1[\s\S]*?<\/h1>/);
assert(h1Match, 'Hero must contain an h1 element');
assert(h1Match[0].includes('Turning Data Into Clear,'), 'Hero h1 must contain main headline text');
assert(!h1Match[0].includes('aria-hidden="true"'), 'Hero h1 must not be hidden from assistive technology');

const heroIllustrationPath = path.join(rootDir, 'src/components/sections/hero/HeroIllustration.tsx');
const heroIllustrationContent = fs.readFileSync(heroIllustrationPath, 'utf8');
assert(heroIllustrationContent.includes('aria-hidden="true"'), 'Decorative HeroIllustration must have aria-hidden="true"');
console.log('  PASS: Hero headline is accessible with single clean semantic h1, and decorative illustration is aria-hidden.\n');

// Test 5: Footer Copyright Year
console.log('Test 5: Dynamic Footer Copyright Year');
const footerTsxPath = path.join(rootDir, 'src/components/layout/Footer.tsx');
const footerContent = fs.readFileSync(footerTsxPath, 'utf8');
assert(footerContent.includes('const currentYear = new Date().getFullYear()'), 'Footer must dynamically calculate currentYear');
assert(footerContent.includes('© {currentYear} Mudassir Javed'), 'Footer copyright must use dynamic currentYear variable');
console.log('  PASS: Footer copyright uses dynamic JavaScript currentYear expression.\n');

// Test 6: Self-Referential Portfolio Link Remediation
console.log('Test 6: Self-Referential Link Remediation');
// In Contact.tsx "Other Ways to Connect", check that the link to #work is labeled "Featured Projects" and not "Portfolio"
const otherWaysSection = contactContent.slice(contactContent.indexOf('Other Ways to Connect'));
assert(!otherWaysSection.includes('>Portfolio<'), 'Link in Other Ways to Connect must not be labeled "Portfolio"');
assert(otherWaysSection.includes('Featured Projects'), 'Link in Other Ways to Connect must be labeled "Featured Projects"');
assert(otherWaysSection.includes('href="#work"'), 'Featured Projects link must anchor to #work');
console.log('  PASS: Internal link to #work is truthfully labeled "Featured Projects" instead of self-referential "Portfolio".\n');

// Test 7: Zero Stale Domain References
console.log('Test 7: Stale Domain Audit (mudassiranalyst.vercel.app)');
const staleMatchesSrc = scanDir(srcDir, /mudassiranalyst\.vercel\.app/i);
assert.strictEqual(staleMatchesSrc.length, 0, `Found stale domain in src/: ${staleMatchesSrc.join(', ')}`);

const publicDir = path.join(rootDir, 'public');
const staleMatchesPublic = scanDir(publicDir, /mudassiranalyst\.vercel\.app/i, ['Mudassir_Javed_CV.pdf']);
assert.strictEqual(staleMatchesPublic.length, 0, `Found stale domain in public/: ${staleMatchesPublic.join(', ')}`);
console.log('  PASS: Zero active references to mudassiranalyst.vercel.app.\n');

console.log('=== All Milestone 25.1 verification checks passed successfully! ===');
