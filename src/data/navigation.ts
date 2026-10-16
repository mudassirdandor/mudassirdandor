export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  ariaLabel: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];

export const NAV_CTA: NavItem = {
  label: "Let's Talk",
  href: '#contact',
};

export const FOOTER_NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Skills', href: '#skills' },
  { label: 'Selected Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#credentials' },
  { label: 'Professional Philosophy', href: '#approach' },
  { label: 'Contact', href: '#contact' },
];

export const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Email',
    href: 'mailto:mudassirdandor@gmail.com',
    ariaLabel: 'Send email to mudassirdandor@gmail.com',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mudassirdandor',
    ariaLabel: 'Visit LinkedIn profile of Mudassir Javed',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/mudassirdandor',
    ariaLabel: 'Visit GitHub repositories of Mudassir Javed',
  },
  {
    label: 'CV (PDF)',
    href: '/documents/Mudassir_Javed_CV.pdf',
    ariaLabel: 'Download CV of Mudassir Javed (PDF)',
  },
];

export const BRAND_INFO = {
  name: 'Mudassir Javed',
  role: 'Data Analyst',
  specialization: 'Business Intelligence & Data Analytics',
  statement: 'Mudassir Javed — Data Analyst | Business Intelligence & Data Analytics',
  narrative: 'Statistics → Data → Insights → Decisions',
};

export const WHATSAPP_CONFIG = {
  rawNumber: '03112777061',
  internationalNumber: '923112777061',
  url: 'https://wa.me/923112777061?text=Hello%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20professional%20opportunity.',
};

