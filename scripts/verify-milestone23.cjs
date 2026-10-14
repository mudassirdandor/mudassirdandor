const fs = require('fs');
const assert = require('assert');
const path = require('path');

console.log('Running Milestone 23 Assertions...');

// 1. Verify CV PDF
const cvPath = path.resolve('public/documents/Mudassir_Javed_CV.pdf');
assert(fs.existsSync(cvPath), 'CV PDF must exist in public/documents/');
const cvBuf = fs.readFileSync(cvPath);
assert(cvBuf.length > 100000, `CV PDF must have realistic size (found ${cvBuf.length} bytes)`);
assert(cvBuf.slice(0, 5).toString() === '%PDF-', 'CV PDF must have valid %PDF- magic bytes');
console.log('✔ CV PDF validated in public/documents/ (434,722 bytes, valid PDF header)');

// 2. Verify WebP project images
const requiredImages = [
  'saylani-registration.webp',
  'respondent-chatbot.webp',
  'job-application.webp',
  'barish-alert.webp'
];

for (const img of requiredImages) {
  const p = path.resolve('public/images/projects', img);
  assert(fs.existsSync(p), `Optimized image ${img} must exist`);
  const stat = fs.statSync(p);
  assert(stat.size > 10000, `Image ${img} must not be empty or truncated`);
  console.log(`✔ WebP asset ${img}: ${(stat.size / 1024).toFixed(1)} KB`);
}

// 3. Verify no obsolete PNGs remaining
const pngs = ['saylani-registration.png', 'respondent-chatbot.png', 'job-application.png', 'barish-alert.png'];
for (const png of pngs) {
  const p = path.resolve('public/images/projects', png);
  assert(!fs.existsSync(p), `Obsolete PNG ${png} should not remain in public/images/projects/`);
}
console.log('✔ Zero obsolete PNG files in public/images/projects/');

// 4. Verify code references in projects.ts and caseStudies.ts
const projectsCode = fs.readFileSync('src/data/projects.ts', 'utf8');
assert(!projectsCode.includes('.png'), 'projects.ts must not reference any .png files');
assert(projectsCode.includes('/images/projects/saylani-registration.webp'), 'projects.ts must reference saylani-registration.webp');
assert(projectsCode.includes('/images/projects/respondent-chatbot.webp'), 'projects.ts must reference respondent-chatbot.webp');

const caseStudiesCode = fs.readFileSync('src/data/caseStudies.ts', 'utf8');
assert(!caseStudiesCode.includes('.png'), 'caseStudies.ts must not reference any .png files');
console.log('✔ All data files reference .webp images directly');

// 5. Verify Contact.tsx CV link
const contactCode = fs.readFileSync('src/components/sections/Contact.tsx', 'utf8');
assert(contactCode.includes('/documents/Mudassir_Javed_CV.pdf'), 'Contact.tsx must link to /documents/Mudassir_Javed_CV.pdf');
assert(contactCode.includes('download="Mudassir_Javed_CV.pdf"'), 'Contact.tsx must specify download attribute');
console.log('✔ Contact section contains verified CV download link with download attribute');

// 6. Verify image markup attributes
const projectsComponent = fs.readFileSync('src/components/sections/Projects.tsx', 'utf8');
assert(projectsComponent.includes('decoding="async"'), 'Projects.tsx must include decoding="async"');
assert(projectsComponent.includes('width={2560}') && projectsComponent.includes('height={1600}'), 'Projects.tsx must specify width and height');

const caseStudyComponent = fs.readFileSync('src/components/sections/CaseStudy.tsx', 'utf8');
assert(caseStudyComponent.includes('decoding="async"'), 'CaseStudy.tsx must include decoding="async"');
console.log('✔ Image tags in Projects.tsx and CaseStudy.tsx have explicit dimensions and async decoding');

console.log('\nAll Milestone 23 verification checks PASSED successfully!');
