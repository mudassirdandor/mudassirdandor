# Design System Lock

## Typography Rules
**STATUS: LOCKED**

- **Primary Sans-Serif Font (UI/Body)**: **Inter** (sans-serif)
  - Used for standard user interface copy, forms, inputs, descriptions, and structural elements.
  - Weights permitted: `300` (Light), `400` (Regular), `500` (Medium), `600` (Semi-Bold), `700` (Bold).
- **Display Heading Font**: **Manrope**
  - Used for high-level section titles, headers, and hero headlines to inject visual personality and editorial elegance.
  - Weights permitted: `600` (Semi-Bold), `700` (Bold), `800` (Extra-Bold).
- **Technical/Data Font (Mono)**: **JetBrains Mono**
  - Used for technical data, numbers, KPI counts, inline labels, badges, and terminal-inspired elements.
  - Weights permitted: `400` (Regular), `500` (Medium), `600` (Semi-Bold).

---

## Spacing Rules
**STATUS: LOCKED**

All layouts must maintain consistent white space using standard Tailwind increments:
- **Component Padding**: Standard outer-bound padding should be strictly set to `px-6 md:px-8` for parent containers.
- **Section Margins**: Vertical spacing between primary page sections is strictly locked to `py-24` (desktop) and `py-16` (mobile) to promote comfortable visual pacing.
- **Content Gaps**:
  - Vertical spacing within content blocks: `space-y-4` or `space-y-6`.
  - Spacing between section header and start of cards: strictly `mb-16` (desktop) and `mb-12` (mobile).

---

## Container Widths
**STATUS: LOCKED**

- **Main Content Max-Width**: All centered primary containers are locked to a maximum width of `max-w-7xl mx-auto`.
- **Text Block Max-Width**: Readability of body text block layouts must be constrained to a max-width of `max-w-3xl` to avoid uncomfortable line lengths.

---

## Border Radius
**STATUS: LOCKED**

- **Cards and Panels**: Main visual blocks and cards must use a uniform corner rounding of `rounded-2xl` (16px).
- **Inputs & Buttons**: Input fields, buttons, and control elements must use `rounded-xl` (12px).
- **Badges**: Pill-style status flags or metadata tags must use `rounded-full` (9999px).

---

## Shadow Styles
**STATUS: LOCKED**

- **Default State**: Cards must feature a flat, borders-only design on standard renders to maintain an elegant light-mode look: `border border-slate-100 shadow-none`.
- **Interactive Hover State**: Active cards on user hover must transition smoothly to a soft, subtle elevation: `shadow-[0_10px_25px_-8px_rgba(0,0,0,0.05)] hover:border-slate-200/80`.
- **Primary Buttons**: Maintain clean, high-contrast flat states: `shadow-sm hover:shadow-md`.

---

## Button Hierarchy
**STATUS: LOCKED**

- **Primary Action (High Contrast)**:
  - Background: Solid executive blue (`bg-blue-600` / `#2563EB`).
  - Text: High-contrast white (`text-white font-medium`).
  - Hover: Slightly darker shade with soft zoom effect (`hover:bg-blue-700 transition-all duration-200`).
- **Secondary Action (Muted Outline)**:
  - Background: Glass transparent / Soft gray off-white (`bg-white/80 hover:bg-slate-50`).
  - Border: Subtle gray outline (`border border-slate-200`).
  - Text: Dark slate slate gray (`text-slate-800`).
- **Tertiary Action (Inline Text)**:
  - Background: None (`bg-transparent`).
  - Text: Executive blue (`text-blue-600 font-medium hover:text-blue-700`).
  - Accent: Animated underline or arrow icon.

---

## Icon System
**STATUS: LOCKED**

- All icons **MUST** be imported strictly from `lucide-react`. Do not write custom raw SVG components.
- **Visual Weight**: Use a stroke width of `1.5` or `2` depending on complexity. Icons must remain visual indicators, never primary focal points.
- **Color Consistency**: Apply consistent state colors:
  - Neutral icons: `text-slate-400` or `text-slate-500`.
  - Active hover icons: `text-blue-600` or `text-emerald-600`.

---

## Card Hierarchy
**STATUS: LOCKED**

- **Level 1 (Direct Focus Cards)**: Features solid background color `bg-white`, complete clean border, micro-shadow on hover, and custom rounded corner treatment. Used for Featured Case Studies, Services, and Contact console.
- **Level 2 (Support Grid Cards)**: Transparent backgrounds or ultra-light slate overlays `bg-slate-50` with subtle border lines. Used for Challenges, Insights, and Certification sub-blocks.

---

## Responsive Philosophy
**STATUS: LOCKED**

- Responsive breakpoints must adhere strictly to Tailwind defaults: mobile (`sm:`), tablet (`md:`), small laptop (`lg:`), large desktop (`xl:`).
- **Desktop-First Precision**: Create layouts that take full strategic advantage of wide screens (e.g. bento grid arrangements, asymmetric margins).
- **Mobile-First Code**: Ensure touch actions have targets of at least `44px` height and text stays readable on small screen configurations without manual horizontal scrolling.

---

## Animation Philosophy
**STATUS: LOCKED**

- Avoid distracting visual effects. Animations must only be used to direct attention or provide state feedback.
- Use **Motion** transitions for:
  - **Route Transitions**: Clean, fast fade-in with minor upward translation (`initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}`).
  - **Hover Micro-animations**: Delicate spring transitions when hovering interactive cards (`whileHover={{ y: -4 }}`).
  - **Transition Ease**: Use standard spring settings `transition={{ type: "spring", stiffness: 350, damping: 25 }}` or clean `ease-out`.

---

## Performance Philosophy
**STATUS: LOCKED**

- **Asset Optimization**: Standardize lazy loading on off-screen modules (`lazy(() => import(...))`).
- **Core Web Vitals**: Place priority on First Input Delay and Cumulative Layout Shift by enforcing rigid dimensional containers for images and icons.

---

## Hero Viewport Rule
**STATUS: LOCKED**

- The Home Hero block must establish immediate presence but is strictly forbidden from covering more than `95vh` of viewport height to ensure the "Trust Bar" or subsequent section remains partially visible below the fold, urging the visitor to scroll.

---

## Professional Recognition Concept
**STATUS: LOCKED**

- The certification showcase must follow an organic, structured, high-fidelity grid system (40+ certificates listed). It should present verified badges without distracting animations, highlighting academic credibility alongside practical expertise.

---

## Section-Question Mapping Matrix
**STATUS: LOCKED**

Each primary section of the landing page is designed around answering exactly one high-level user question:

1. **Hero Frame**: *"Who is Mudassir Javed and why is he here?"*
2. **Featured Case Studies**: *"What high-value business outcomes has he actually delivered?"*
3. **Services**: *"What specific operational capabilities does he bring to the table?"*
4. **Challenges I Help Solve**: *"Does he understand my business pain points and can he fix them?"*
5. **Professional Recognition**: *"Is he qualified enough to handle our complex requirements?"*
6. **Working Process**: *"How does he work and what is it like to collaborate with him?"*
7. **Latest Insights**: *"Is he a thought leader on the cutting edge of industry trends?"*
8. **Contact**: *"How do I initiate a strategic engagement with him?"*

---

These rules may only be changed with explicit approval from the Product Owner.
