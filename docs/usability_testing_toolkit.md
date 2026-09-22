# PORTFOLIO V6.5 — Human Usability Testing Toolkit & Protocol

> **CRITICAL DIRECTIVE**: This toolkit defines the standardized framework for empirical human sessions. No tests are claimed to have occurred until real participants have executed these protocols.

---

## 1. Core Testing Philosophy: Measure Behavior, Not Opinion

### Do NOT Ask
- ❌ *"Do you like this design?"*
- ❌ *"Does this feel modern?"*
- ❌ *"Would you hire this candidate?"* (Premature opinion before task completion)

### DO Ask
- ✔ *"What would you do next to verify his data modeling capabilities?"*
- ✔ *"Where would you look to find his Master's degree transcript or institution?"*
- ✔ *"What do you think happens after clicking this button?"*
- ✔ *"Which specific piece of information on this screen convinces you this is real work rather than a tutorial?"*
- ✔ *"What is your confidence level (1–5) in finding his direct contact channel?"*

---

## 2. Participant Profiles & Screening

### Profile A: Technical Recruiter / Talent Sourcer
- **Role:** Agency or in-house technical recruiter reviewing 30–80 portfolios/day.
- **Time Window:** 45–90 seconds initial screening horizon.
- **Primary Goal:** Verify role match (BI / Data Analytics / Statistics), retrieve CV, check education, verify contact options.
- **Screening Criteria:** Actively hires or screens candidates for Business Intelligence, Data Analytics, or Full-Stack Data roles.

### Profile B: Data / BI Professional (Hiring Manager / Tech Lead)
- **Role:** Senior Data Engineer, BI Architect, or Analytics Director.
- **Time Window:** 5–15 minutes deep technical evaluation.
- **Primary Goal:** Differentiate genuine engineering from superficial template copies; audit SQL CTEs, DAX models, ETL architectures, and pipeline limitations.
- **Screening Criteria:** Writes or reviews SQL/Python/DAX production code; conducts technical interviews.

### Profile C: Business Owner / Decision Maker (CEO / COO / Clinic Director)
- **Role:** Non-technical or semi-technical operational executive seeking consulting or implementation services.
- **Time Window:** 3–8 minutes commercial solution review.
- **Primary Goal:** Determine if Mudassir understands business ROI, can solve a messy reporting problem, and how to start a project without feeling intimidated.
- **Screening Criteria:** Has commissioned analytics, dashboards, local marketing, or digital workflows for an operating business.

---

## 3. Observation Severity Taxonomy

Every observed friction point, hesitation, or failure is categorized into this strict severity scale:

| Severity | Definition | Criteria for Assignment |
| :--- | :--- | :--- |
| **P0 — Blocker** | Prevents task completion | Participant cannot complete task; abandons session; critical link dead; essential action impossible. |
| **P1 — Critical Friction** | Materially slows or confuses | Participant completes task only after backtracking, misclicks (>2), or expressing severe confusion (>30s delay). |
| **P2 — Minor Friction** | Brief hesitation or awkwardness | Participant pauses briefly (<10s) or chooses a secondary path before finding optimal element. |
| **P3 — Enhancement** | Cosmetic or personal preference | Participant completes task smoothly but offers a stylistic preference or optional alternative expectation. |

*Rule: Never promote subjective opinions (P3) to P0/P1 without reproducible behavioral evidence.*

---

## 4. Participant Task Protocol & Observation Sheets

### Profile A: Technical Recruiter Task Matrix

| Task ID | Task Description | Expected Path | Target Time | Max Friction |
| :--- | :--- | :--- | :--- | :--- |
| **REC-01** | Identify primary job title & domain specialization | Landing page hero / header | < 10s | P2 |
| **REC-02** | Locate and initiate download of PDF CV | Navbar CTA or Candidate Quick Access strip | < 15s | P1 |
| **REC-03** | Verify Master of Science (MSc) in Statistics degree | Navigation to `/about` -> Education section | < 25s | P1 |
| **REC-04** | Verify at least one external Google certification | Navigation to `/certifications` -> External Credly/Coursera link | < 30s | P2 |
| **REC-05** | Locate a live production system deployed commercially | Projects grid -> Filter "Production" | < 40s | P2 |
| **REC-06** | Identify all available direct contact channels | Contact page -> WhatsApp, LinkedIn, Email | < 15s | P1 |

#### Session Observation Sheet Template (Profile A)
```markdown
Participant ID: REC-___
Date & Modality: [Remote / In-Person]
Screen Resolution: [e.g. 1440x900, 390x844]
Browser: [Chrome / Safari / Firefox]

Task: REC-02 (CV Download)
- Task Completion: [SUCCESS / PARTIAL / FAILED / ABANDONED]
- Time to Completion: ___ seconds
- Navigation Method Used: [Navbar Button / About Strip / Command Palette / Contact Bar]
- Hesitation Observed: [None / Paused at Hero / Looked at Footer first]
- Wrong Clicks: ___
- Severity: [P0 / P1 / P2 / P3 / NONE]
- Direct Participant Quote: "..."
- Observed Behavior Notes: ...
```

---

### Profile B: Technical Reviewer Task Matrix

| Task ID | Task Description | Expected Path | Target Time | Max Friction |
| :--- | :--- | :--- | :--- | :--- |
| **TECH-01** | Find an enterprise Business Intelligence project | Navigation to `/projects` or `/case-studies` | < 15s | P2 |
| **TECH-02** | Inspect underlying system architecture diagram | Open project -> Section 02 / Architecture tab | < 45s | P1 |
| **TECH-03** | Locate verified code evidence (SQL CTE / Python / DAX) | Section 08 (Code Artifacts) -> Tab inspection | < 45s | P1 |
| **TECH-04** | Differentiate production vs synthesized demo | Inspect honest status badges and limitations | < 30s | P2 |
| **TECH-05** | Read technical methodology article | Navigation to `/insights` -> Select deep-dive | < 30s | P2 |
| **TECH-06** | Inspect open-source GitHub repository | Case study footer or Command Palette | < 20s | P2 |

---

### Profile C: Business Client Task Matrix

| Task ID | Task Description | Expected Path | Target Time | Max Friction |
| :--- | :--- | :--- | :--- | :--- |
| **BIZ-01** | Explain in your own words what Mudassir does | Landing hero / Problem Register | < 20s | P2 |
| **BIZ-02** | Find a solution matching your business need | Navigation to `/solutions` -> Select category | < 30s | P1 |
| **BIZ-03** | Review the 7-stage consulting framework | Navigation to `/consulting` or How I Work | < 45s | P2 |
| **BIZ-04** | Test the Decision Intelligence Engine simulator | Select scenario -> view modeled business outcome | < 60s | P2 |
| **BIZ-05** | Initiate direct WhatsApp consultation | Click WhatsApp CTA from any page | < 15s | P1 |
| **BIZ-06** | Complete structured consultation inquiry form | Navigation to `/contact` -> Submit scope | < 90s | P1 |
