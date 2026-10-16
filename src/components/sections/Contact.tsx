import React, { useState, useId } from 'react';
import {
  Mail,
  Calendar,
  MessageCircle,
  Users,
  Handshake,
  MapPin,
  Lock,
  FileText,
  Briefcase,
  ArrowRight,
  BarChart3,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionFrame } from '../layout/SectionFrame';
import { WHATSAPP_CONFIG } from '../../data/navigation';

const GOOGLE_MAPS_QUETTA_URL =
  'https://www.google.com/maps/search/?api=1&query=Quetta%2C%20Balochistan%2C%20Pakistan';

/* Custom SVG Icons for Official Brand Platforms */
function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.201.3-.778.979-.954 1.18-.176.2-.351.226-.653.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.783-1.676-2.084-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.2.05-.377-.025-.527-.075-.15-.678-1.633-.929-2.235-.245-.586-.494-.506-.678-.515-.176-.009-.377-.01-.578-.01-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.909 1.23 3.109c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.728 2.03-1.432.251-.703.251-1.306.176-1.432-.075-.126-.276-.201-.577-.351zM12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.99.59 3.84 1.61 5.39L2 22l4.82-1.64c1.5 1 3.29 1.58 5.22 1.58 5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.06c-1.72 0-3.32-.51-4.67-1.4l-.33-.22-2.87.98.98-2.8-.23-.36c-1-1.41-1.57-3.11-1.57-4.9 0-4.48 3.65-8.13 8.13-8.13s8.13 3.65 8.13 8.13c-.01 4.48-3.66 8.12-8.14 8.12z" />
    </svg>
  );
}

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.13c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63-.73-1.63-1.63-1.63z" />
    </svg>
  );
}

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/* Staggered Animated Floating Label Helper */
function StaggeredFloatingLabel({
  label,
  id,
  isFloated,
  isFocused,
  hasError,
}: {
  label: string;
  id: string;
  isFloated: boolean;
  isFocused: boolean;
  hasError?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-3.5 top-3 z-10 flex items-center select-none font-mono text-xs font-medium tracking-wide bg-transparent"
    >
      {/* Clean rectangular background patch matching the input surface (bg-white) behind the floating label */}
      <span
        className={`absolute -top-[19px] -left-1 px-1 bg-white h-[14px] flex items-center transition-opacity duration-300 -z-10 ${
          isFloated ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <span className="invisible select-none whitespace-nowrap">{label}</span>
      </span>

      {label.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:!transform-none ${
            hasError
              ? 'text-red-600 font-semibold'
              : isFocused
              ? 'text-pine font-semibold'
              : isFloated
              ? 'text-muted-gray font-medium'
              : 'text-muted-gray/70'
          }`}
          style={{
            transform: isFloated ? 'translateY(-23px)' : 'translateY(0)',
            transitionDuration: '500ms',
            transitionDelay: `${index * 38}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </label>
  );
}

export function Contact() {
  const formId = useId();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLink, setSubmittedLink] = useState<string | null>(null);

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please select a topic.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write your message.';
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message must be under 1,000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const subjectLine = `[${formData.subject}] Inquiry from ${formData.name}`;
    const bodyContent = `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.subject}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:mudassirdandor@gmail.com?subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(bodyContent)}`;

    setSubmittedLink(mailtoUrl);

    // Direct client mail handoff
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <SectionFrame
      id="contact"
      className="bg-pine text-porcelain relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28"
    >
      {/* Decorative Background Contour Lines & Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <svg
          className="absolute -right-20 -top-20 w-[600px] h-[600px] opacity-[0.06] text-eucalyptus"
          viewBox="0 0 500 500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M50 250 C 150 150, 350 350, 450 250" />
          <path d="M30 220 C 140 120, 360 380, 470 220" />
          <path d="M10 190 C 130 90, 370 410, 490 190" />
          <path d="M70 280 C 160 180, 340 320, 430 280" />
          <path d="M90 310 C 170 210, 330 290, 410 310" />
          <circle cx="250" cy="250" r="180" strokeDasharray="4 6" />
          <circle cx="250" cy="250" r="230" strokeDasharray="2 8" />
        </svg>

        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-soft-green/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-eucalyptus/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Main 2-Column Contact Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column — Contact Introduction */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Compact Eyebrow */}
            <div className="flex items-center gap-2.5 font-mono text-xs text-soft-green uppercase tracking-wider mb-4">
              <span className="font-semibold">GET IN TOUCH</span>
              <span className="text-eucalyptus/30 font-sans" aria-hidden="true">
                //
              </span>
              <span className="text-eucalyptus/80 text-[11px] sm:text-xs tracking-wide">
                LET'S TURN INSIGHTS INTO OPPORTUNITIES
              </span>
            </div>

            {/* Editorial Headline */}
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-porcelain tracking-tight leading-[1.15] mb-5">
              Let's turn data <span className="text-eucalyptus">into progress.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-porcelain/85 leading-relaxed mb-6 max-w-xl">
              Have a project, an opportunity, or an idea you'd like to discuss? I'd be happy to connect and explore how I can contribute through data, analytics, and practical solutions.
            </p>

            {/* Compact Direct Contact CTAs */}
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2.5 mb-8 text-xs sm:text-sm">
              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP_CONFIG.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-porcelain/90 hover:text-white transition-colors group focus-visible:outline-2 focus-visible:outline-white rounded py-1"
                aria-label="Connect with Mudassir Javed on WhatsApp (opens in new tab)"
              >
                <div className="w-6 h-6 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all flex-shrink-0">
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-porcelain group-hover:text-white">WhatsApp</span>
              </a>

              <span className="text-eucalyptus/30 select-none hidden sm:inline" aria-hidden="true">
                •
              </span>

              {/* Email CTA */}
              <a
                href="mailto:mudassirdandor@gmail.com"
                className="inline-flex items-center gap-2 text-porcelain/90 hover:text-white transition-colors group focus-visible:outline-2 focus-visible:outline-white rounded py-1"
                aria-label="Send direct email to mudassirdandor@gmail.com"
              >
                <div className="w-6 h-6 rounded-full bg-soft-green/20 flex items-center justify-center text-soft-green group-hover:bg-soft-green group-hover:text-pine transition-all flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <span className="font-medium text-porcelain group-hover:text-white">Email Me</span>
              </a>

              <span className="text-eucalyptus/30 select-none hidden sm:inline" aria-hidden="true">
                •
              </span>

              {/* Schedule a Call CTA */}
              <a
                href="mailto:mudassirdandor@gmail.com?subject=Call%20Scheduling%20Request%20-%20Mudassir%20Javed&body=Hi%20Mudassir,%20I%20would%20like%20to%20schedule%20a%20call%20with%20you."
                className="inline-flex items-center gap-2 text-porcelain/90 hover:text-white transition-colors group focus-visible:outline-2 focus-visible:outline-white rounded py-1"
                aria-label="Schedule a call via email inquiry"
              >
                <div className="w-6 h-6 rounded-full bg-soft-green/20 flex items-center justify-center text-soft-green group-hover:bg-soft-green group-hover:text-pine transition-all flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <span className="font-medium text-porcelain group-hover:text-white">Schedule a Call</span>
              </a>
            </div>

            {/* Subtle Divider */}
            <div className="border-t border-eucalyptus/15 pt-7" />

            {/* Contact Information Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Block 1 — Quick Response */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-soft-green/15 flex items-center justify-center text-soft-green flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-soft-green tracking-tight">
                    Quick Response
                  </h3>
                  <p className="text-xs text-eucalyptus/80 leading-relaxed mt-0.5">
                    Available by email and WhatsApp
                  </p>
                </div>
              </div>

              {/* Block 2 — Opportunities */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-soft-green/15 flex items-center justify-center text-soft-green flex-shrink-0 mt-0.5">
                  <Users className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-soft-green tracking-tight">
                    Open to Opportunities
                  </h3>
                  <p className="text-xs text-eucalyptus/80 leading-relaxed mt-0.5">
                    Freelance · Full-time · Consulting
                  </p>
                </div>
              </div>

              {/* Block 3 — Collaboration */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-soft-green/15 flex items-center justify-center text-soft-green flex-shrink-0 mt-0.5">
                  <Handshake className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-soft-green tracking-tight">
                    Collaboration
                  </h3>
                  <p className="text-xs text-eucalyptus/80 leading-relaxed mt-0.5">
                    Data Projects · Partnerships · Research
                  </p>
                </div>
              </div>

              {/* Block 4 — Location (Clickable -> Google Maps) */}
              <a
                href={GOOGLE_MAPS_QUETTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group rounded-lg p-1 -m-1 hover:bg-white/[0.04] transition-colors focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Open Quetta, Balochistan, Pakistan on Google Maps (opens in new tab)"
              >
                <div className="w-8 h-8 rounded-lg bg-soft-green/15 flex items-center justify-center text-soft-green flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-soft-green tracking-tight group-hover:underline">
                    Based in Quetta
                  </h3>
                  <p className="text-xs text-eucalyptus/80 leading-relaxed mt-0.5">
                    Quetta, Balochistan, Pakistan · Open to Remote
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column — Contact Form Panel (~55% width on desktop) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row rounded-2xl bg-porcelain shadow-2xl border border-eucalyptus/50 overflow-hidden text-dark-charcoal">
            {/* Form Side */}
            <div className="flex-1 p-6 sm:p-8 md:p-9 flex flex-col justify-between">
              <div>
                {/* Form Header */}
                <div className="mb-6">
                  <span className="font-mono text-xs text-muted-gray uppercase tracking-wider block mb-1">
                    SEND A MESSAGE
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-dark-charcoal tracking-tight">
                    Start a Conversation
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-gray mt-1 leading-relaxed">
                    Fill out the details below to compose your message. Submitting will open your email application with your message prepared for mudassirdandor@gmail.com.
                  </p>
                </div>

                {/* Form Elements with Animated Floating Labels (No Red Asterisks) */}
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Your Name */}
                    <div>
                      <div className="relative">
                        <StaggeredFloatingLabel
                          label="Your Name"
                          id={`${formId}-name`}
                          isFloated={focusedField === 'name' || formData.name.trim().length > 0}
                          isFocused={focusedField === 'name'}
                          hasError={!!errors.name}
                        />
                        <input
                          id={`${formId}-name`}
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? `${formId}-name-err` : undefined}
                          className={`w-full px-3.5 py-3 rounded-lg bg-white border text-sm text-dark-charcoal focus:outline-none focus:ring-2 focus:ring-pine/25 transition-all ${
                            errors.name ? 'border-red-500' : 'border-soft-border hover:border-pine/50 focus:border-pine'
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p
                          id={`${formId}-name-err`}
                          role="alert"
                          className="mt-1 text-xs text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Your Email */}
                    <div>
                      <div className="relative">
                        <StaggeredFloatingLabel
                          label="Your Email"
                          id={`${formId}-email`}
                          isFloated={focusedField === 'email' || formData.email.trim().length > 0}
                          isFocused={focusedField === 'email'}
                          hasError={!!errors.email}
                        />
                        <input
                          id={`${formId}-email`}
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? `${formId}-email-err` : undefined}
                          className={`w-full px-3.5 py-3 rounded-lg bg-white border text-sm text-dark-charcoal focus:outline-none focus:ring-2 focus:ring-pine/25 transition-all ${
                            errors.email ? 'border-red-500' : 'border-soft-border hover:border-pine/50 focus:border-pine'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p
                          id={`${formId}-email-err`}
                          role="alert"
                          className="mt-1 text-xs text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Subject */}
                  <div>
                    <div className="relative">
                      <StaggeredFloatingLabel
                        label="Subject"
                        id={`${formId}-subject`}
                        isFloated={focusedField === 'subject' || formData.subject.trim().length > 0}
                        isFocused={focusedField === 'subject'}
                        hasError={!!errors.subject}
                      />
                      <select
                        id={`${formId}-subject`}
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? `${formId}-subject-err` : undefined}
                        className={`w-full px-3.5 py-3 rounded-lg bg-white border text-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-pine/25 transition-all cursor-pointer ${
                          errors.subject ? 'border-red-500' : 'border-soft-border hover:border-pine/50 focus:border-pine'
                        } ${formData.subject ? 'text-dark-charcoal' : 'text-transparent'}`}
                      >
                        <option value="" disabled hidden />
                        <option value="Data Analysis" className="text-dark-charcoal">Data Analysis</option>
                        <option value="Business Intelligence" className="text-dark-charcoal">Business Intelligence</option>
                        <option value="Data Visualization" className="text-dark-charcoal">Data Visualization</option>
                        <option value="Research & Statistics" className="text-dark-charcoal">Research &amp; Statistics</option>
                        <option value="Freelance Project" className="text-dark-charcoal">Freelance Project</option>
                        <option value="Career Opportunity" className="text-dark-charcoal">Career Opportunity</option>
                        <option value="Other" className="text-dark-charcoal">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-muted-gray">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.subject && (
                      <p
                        id={`${formId}-subject-err`}
                        role="alert"
                        className="mt-1 text-xs text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Row 3: Your Message */}
                  <div>
                    <div className="relative">
                      <StaggeredFloatingLabel
                        label="Your Message"
                        id={`${formId}-message`}
                        isFloated={focusedField === 'message' || formData.message.trim().length > 0}
                        isFocused={focusedField === 'message'}
                        hasError={!!errors.message}
                      />
                      <textarea
                        id={`${formId}-message`}
                        name="message"
                        rows={4}
                        maxLength={1000}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? `${formId}-message-err` : undefined}
                        className={`w-full px-3.5 py-3 rounded-lg bg-white border text-sm text-dark-charcoal focus:outline-none focus:ring-2 focus:ring-pine/25 transition-all resize-y min-h-[108px] ${
                          errors.message ? 'border-red-500' : 'border-soft-border hover:border-pine/50 focus:border-pine'
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      {errors.message ? (
                        <p
                          id={`${formId}-message-err`}
                          role="alert"
                          className="text-xs text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>{errors.message}</span>
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="font-mono text-[11px] text-muted-gray">
                        {formData.message.length}/1000
                      </span>
                    </div>
                  </div>

                  {/* Submission Status Notice */}
                  {submittedLink && (
                    <div className="p-3.5 rounded-lg bg-soft-green/15 border border-soft-green/40 text-dark-charcoal text-xs sm:text-sm flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-pine flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-pine">Opening your email app...</p>
                        <p className="text-muted-gray mt-0.5 text-xs">
                          Your message is formatted for mudassirdandor@gmail.com. If your email app didn't open automatically,{' '}
                          <a href={submittedLink} className="underline text-pine font-medium hover:text-pine-hover">
                            click here to open it
                          </a>.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-pine hover:bg-pine-hover active:bg-[#152a22] text-porcelain font-display font-semibold text-sm sm:text-base py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine disabled:opacity-60 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Opening Email App...' : 'Open Email App'}</span>
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </button>

                  {/* Submission Clarification Note */}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-gray text-center pt-1">
                    <Lock className="w-3.5 h-3.5 text-muted-gray flex-shrink-0" aria-hidden="true" />
                    <span>This form prepares your message and launches your email app to send directly.</span>
                  </div>
                </form>
              </div>
            </div>

            {/* Decorative Quetta Panel (~35% width on desktop, stacked on mobile) */}
            <div className="md:w-[36%] md:min-w-[210px] flex-shrink-0 flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden bg-[#1B362C] text-porcelain border-t md:border-t-0 md:border-l border-eucalyptus/20">
              {/* Abstract Topographic Contour Background for Quetta Valley */}
              <div className="absolute inset-0 pointer-events-none select-none opacity-20" aria-hidden="true">
                <svg
                  className="w-full h-full object-cover"
                  viewBox="0 0 300 500"
                  fill="none"
                  stroke="#7DAA91"
                  strokeWidth="1.2"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <path d="M-50 100 C 50 80, 150 140, 350 90" />
                  <path d="M-50 140 C 60 110, 180 180, 350 130" />
                  <path d="M-50 190 C 80 160, 200 240, 350 170" />
                  <path d="M-50 240 C 100 200, 190 300, 350 220" />
                  <path d="M-50 290 C 90 260, 220 340, 350 270" />
                  <path d="M-50 340 C 110 320, 210 400, 350 330" />
                  <path d="M-50 400 C 120 370, 240 450, 350 390" />
                  <path d="M-50 450 C 100 420, 200 480, 350 430" />
                </svg>
              </div>

              {/* Ambient Green Glow */}
              <div
                className="absolute top-1/4 right-0 w-48 h-48 rounded-full bg-soft-green/15 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Quote Card */}
              <div className="relative z-10 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/15 p-4 sm:p-5 shadow-sm mb-6">
                <p className="font-display text-sm sm:text-base text-porcelain italic font-medium leading-relaxed">
                  "Good data conversations create real opportunities."
                </p>
                <span className="text-[11px] font-mono text-soft-green mt-2.5 block tracking-wider uppercase">
                  — Mudassir Javed
                </span>
              </div>

              {/* Location Badge (Clickable -> Google Maps) */}
              <a
                href={GOOGLE_MAPS_QUETTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-sm border border-white/15 hover:border-soft-green/40 p-3.5 flex items-center gap-3 transition-all group focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Open Quetta, Balochistan, Pakistan on Google Maps (opens in new tab)"
              >
                <div className="w-8 h-8 rounded-lg bg-soft-green/20 flex items-center justify-center flex-shrink-0 text-soft-green group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-display font-semibold text-xs sm:text-sm text-porcelain group-hover:text-soft-green transition-colors block leading-tight">
                    Quetta, Balochistan
                  </span>
                  <span className="text-[11px] font-mono text-eucalyptus/80 block mt-0.5">
                    Pakistan · View on Map ↗
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Other Ways to Connect */}
        <div className="border-t border-eucalyptus/20 my-10 sm:my-14" />

        <div>
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-porcelain tracking-tight">
              Other Ways to Connect
            </h3>
            <span className="font-mono text-xs text-soft-green uppercase tracking-wider">
              FIND ME ON THESE PLATFORMS
            </span>
          </div>

          {/* Compact Icon-Led Links Row */}
          <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 text-sm">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mudassirdandor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-porcelain/85 hover:text-white transition-colors group focus-visible:outline-2 focus-visible:outline-white rounded py-1"
              aria-label="Visit LinkedIn profile of Mudassir Javed"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-soft-green group-hover:border-soft-green/40 group-hover:bg-soft-green/10 transition-all flex-shrink-0">
                <LinkedInIcon className="w-4 h-4 text-soft-green" />
              </div>
              <span className="font-medium text-xs sm:text-sm text-porcelain group-hover:text-white">
                LinkedIn
              </span>
              <ExternalLink className="w-3 h-3 text-eucalyptus/40 group-hover:text-soft-green transition-colors" aria-hidden="true" />
            </a>

            <span className="text-eucalyptus/20 hidden sm:inline select-none" aria-hidden="true">
              •
            </span>

            {/* GitHub */}
            <a
              href="https://github.com/mudassirdandor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-porcelain/85 hover:text-white transition-colors group focus-visible:outline-2 focus-visible:outline-white rounded py-1"
              aria-label="Visit GitHub repositories of Mudassir Javed"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-soft-green group-hover:border-soft-green/40 group-hover:bg-soft-green/10 transition-all flex-shrink-0">
                <GithubIcon className="w-4 h-4" />
              </div>
              <span className="font-medium text-xs sm:text-sm text-porcelain group-hover:text-white">
                GitHub
              </span>
              <ExternalLink className="w-3 h-3 text-eucalyptus/40 group-hover:text-soft-green transition-colors" aria-hidden="true" />
            </a>

            <span className="text-eucalyptus/20 hidden sm:inline select-none" aria-hidden="true">
              •
            </span>

            {/* Featured Projects */}
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 text-porcelain/85 hover:text-white transition-colors group focus-visible:outline-2 focus-visible:outline-white rounded py-1"
              aria-label="Navigate to Featured Projects section"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-soft-green group-hover:border-soft-green/40 group-hover:bg-soft-green/10 transition-all flex-shrink-0">
                <Briefcase className="w-4 h-4 text-soft-green" aria-hidden="true" />
              </div>
              <span className="font-medium text-xs sm:text-sm text-porcelain group-hover:text-white">
                Featured Projects
              </span>
              <ArrowRight className="w-3 h-3 text-eucalyptus/40 group-hover:text-soft-green transition-colors" aria-hidden="true" />
            </a>

            <span className="text-eucalyptus/20 hidden sm:inline select-none" aria-hidden="true">
              •
            </span>

            {/* CV / Resume */}
            <a
              href="/documents/Mudassir_Javed_CV.pdf"
              download="Mudassir_Javed_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-porcelain/85 hover:text-white transition-colors group focus-visible:outline-2 focus-visible:outline-white rounded py-1"
              aria-label="Download Mudassir Javed CV (PDF)"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-soft-green group-hover:border-soft-green/40 group-hover:bg-soft-green/10 transition-all flex-shrink-0">
                <FileText className="w-4 h-4 text-soft-green" aria-hidden="true" />
              </div>
              <span className="font-medium text-xs sm:text-sm text-porcelain group-hover:text-white">
                Download CV
              </span>
              <ArrowRight className="w-3 h-3 text-eucalyptus/40 group-hover:text-soft-green transition-colors" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Bottom Information Strip */}
        <div className="border-t border-eucalyptus/20 pt-8 mt-12 sm:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-eucalyptus/20">
            {/* Group 1 — Currently Open To */}
            <div className="pt-4 md:pt-0">
              <div className="flex items-center gap-2 font-mono text-[11px] text-soft-green uppercase tracking-wider mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-soft-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-soft-green" />
                </span>
                <span>CURRENTLY OPEN TO</span>
              </div>
              <p className="text-xs sm:text-sm text-porcelain/90 leading-relaxed font-sans">
                Full-time Opportunities · Freelance Projects · Data &amp; Research Collaborations
              </p>
            </div>

            {/* Group 2 — Interested In */}
            <div className="pt-4 md:pt-0 md:pl-8">
              <div className="flex items-center gap-2 font-mono text-[11px] text-soft-green uppercase tracking-wider mb-2">
                <BarChart3 className="w-3.5 h-3.5 text-soft-green" aria-hidden="true" />
                <span>INTERESTED IN</span>
              </div>
              <p className="text-xs sm:text-sm text-porcelain/90 leading-relaxed font-sans">
                Data Analysis · Business Intelligence · Statistics · AI &amp; Automation
              </p>
            </div>

            {/* Group 3 — Location (Clickable -> Google Maps) */}
            <div className="pt-4 md:pt-0 md:pl-8">
              <div className="flex items-center gap-2 font-mono text-[11px] text-soft-green uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 text-soft-green" aria-hidden="true" />
                <span>LOCATION</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-porcelain/90 leading-relaxed font-sans">
                <a
                  href={GOOGLE_MAPS_QUETTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-soft-green hover:underline inline-flex items-center gap-1 transition-colors focus-visible:outline-2 focus-visible:outline-white rounded"
                  aria-label="Open Quetta, Balochistan, Pakistan on Google Maps (opens in new tab)"
                >
                  <span>Quetta, Balochistan, Pakistan</span>
                  <ExternalLink className="w-3 h-3 text-soft-green/70 inline" aria-hidden="true" />
                </a>
                <span className="font-mono text-[11px] text-soft-green bg-white/10 px-2 py-0.5 rounded-full border border-eucalyptus/20">
                  Open to Remote
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionFrame>
  );
}

export default Contact;
