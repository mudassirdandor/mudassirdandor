# PORTFOLIO V6.5 — UX Hypothesis Registry & Evidence Feedback Loop

> **RULE**: Never mark any hypothesis as `Supported` or `Rejected` without documented human behavioral or telemetry evidence. All initial entries remain strictly `Proposed` or `Testing`.

---

## Hypothesis Structure
Every entry must include:
- **ID**: `H-###`
- **Target Persona**: `Recruiter (Profile A)`, `Technical Reviewer (Profile B)`, or `Business Client (Profile C)`
- **Observation**: Specific friction, hesitation, or behavior observed in sessions or telemetry
- **Evidence Baseline**: Documented participant logs, drop-off events, or search fail events
- **Hypothesis**: The causal reasoning connecting the friction to a structural or content issue
- **Proposed Change**: The minimal, non-disruptive intervention
- **Measurement Criteria**: The metric or task time threshold that will prove or disprove the hypothesis
- **Status**: `Proposed` | `Testing` | `Supported` | `Rejected` | `Inconclusive`

---

## Initial Hypothesis Register

### H-001: Recruiter CV Retrieval Velocity
- **ID:** H-001
- **Target Persona:** Profile A (Technical Recruiter)
- **Observation:** Recruiters on mobile viewports may not see the desktop navbar "Download CV" action.
- **Evidence Baseline:** Code inspection shows navbar button is hidden on `<sm` viewports; sticky bottom bar / quick access strip provides alternative on mobile.
- **Hypothesis:** Adding a high-visibility candidate quick-access strip on the `/about` and `/contact` screens ensures mobile recruiters locate the CV in < 15 seconds.
- **Proposed Change:** Monitor `cv_download` telemetry by source (`navbar` vs `about_strip` vs `contact_bar`) and compare mobile vs desktop conversion velocity.
- **Measurement Criteria:** Average time to download CV < 15 seconds on mobile; zero REC-02 task drop-outs.
- **Status:** `Proposed`

---

### H-002: Technical Credibility vs. Synthetic Demonstration Skepticism
- **ID:** H-002
- **Target Persona:** Profile B (Data / BI Professional)
- **Observation:** Technical reviewers often mistrust portfolio dashboards that feature generic or polished numbers without data lineage.
- **Evidence Baseline:** Behavioral tendency of senior engineers to look for SQL schemas, CTEs, and explicit limitation notes before accepting claims.
- **Hypothesis:** Clearly categorizing projects into explicit status badges (Production vs Demonstration vs Research) and surfacing architecture schemas increases reviewer trust without misrepresenting client work.
- **Proposed Change:** Track `case_study_open`, `evidence_open`, and code tab dwell times.
- **Measurement Criteria:** Technical participants spend > 30 seconds inspecting code tabs and cite honest limitations as a positive factor in think-aloud sessions.
- **Status:** `Proposed`

---

### H-003: Non-Technical Business Client Conversion Channel Preference
- **ID:** H-003
- **Target Persona:** Profile C (Business Owner / Decision Maker)
- **Observation:** Small-to-medium business owners in South Asian and Middle Eastern markets prefer instant WhatsApp chats over multi-field contact forms.
- **Evidence Baseline:** `whatsapp_click` vs `contact_submit` ratio in baseline telemetry.
- **Hypothesis:** Providing an instant WhatsApp button with pre-filled context increases consultation initiation rate by > 30% compared to form-only funnels.
- **Proposed Change:** Maintain parallel WhatsApp and consultation form actions across desktop and mobile.
- **Measurement Criteria:** Relative volume and completion rate between `whatsapp_click` and `contact_submit`.
- **Status:** `Testing`

---

### H-004: Decision Intelligence Simulator Engagement
- **ID:** H-004
- **Target Persona:** Profile B & Profile C
- **Observation:** Interactive simulators are frequently ignored if perceived as decorative animations rather than interactive diagnostic tools.
- **Evidence Baseline:** `decision_engine_scenario` event rate among home page visitors.
- **Hypothesis:** Framing scenarios around concrete operational questions (e.g. "Hospital Blood Shortage", "Supply Chain Lead Times") triggers active interaction from > 20% of visitors who scroll past the hero.
- **Proposed Change:** Analyze event distribution between `decision_engine_scenario` and `page_view`.
- **Measurement Criteria:** Rate of scenario selection and tab inspection; participant feedback in BIZ-04.
- **Status:** `Proposed`

---

### H-005: Search Intent & Knowledge Graph Coverage
- **ID:** H-005
- **Target Persona:** Cross-Persona
- **Observation:** Visitors using the Command Palette (`⌘K`) may search with natural-language phrases (e.g. "can you automate my excel reports") rather than keywords.
- **Evidence Baseline:** `search_query` events flagged with `isZeroResult: true` or categorized as `unknown`.
- **Hypothesis:** Expanding the synonyms and intent mappings in `knowledgeGraph.ts` to cover consulting requests reduces zero-result search queries to < 5%.
- **Proposed Change:** Review zero-result telemetry categories periodically and add matching alias nodes to the knowledge graph.
- **Measurement Criteria:** `search_query` zero-result rate drops below 5% across 50 observed queries.
- **Status:** `Proposed`

---

### H-006: External Credential Verification Reliability
- **ID:** H-006
- **Target Persona:** Profile A & Profile B
- **Observation:** External credential platform links (Coursera, Credly) occasionally fail or require login walls on corporate networks.
- **Evidence Baseline:** `credential_external_click` telemetry events.
- **Hypothesis:** Displaying raw Credential IDs and verifiable dates directly on the credential card allows recruiters to verify authenticity even if the external redirect is blocked by corporate firewalls.
- **Proposed Change:** Ensure every credential card in `CertGrid.tsx` displays Credential ID, issue date, and issuing authority inline.
- **Measurement Criteria:** 100% of participants in REC-04 succeed in verifying credentials either online or via inline credential ID.
- **Status:** `Testing` (Code implementation verified; awaiting live participant confirmation)
