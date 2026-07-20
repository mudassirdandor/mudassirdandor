# Architectural Blueprint & System Design

This document details the architectural layout, modular separation of concerns, and data flows within the Decision Intelligence Portfolio application.

---

## 🛠️ Design Philosophy & Core Principles

The application is structured to ensure absolute predictability, scalability, and performance. We adhere strictly to the following principles:
- **No Global Component Bloat:** Rather than consolidating all variables and views into a single file (e.g., `App.tsx`), logic is compartmentalized into dedicated services, hooks, utilities, constants, types, and components.
- **Unidirectional Data Flow:** Data streams flows from database records or API endpoints to service wrappers, through custom React hooks to manage asynchronous UI states, and finally to pure presentational components.
- **Decoupled API Client:** Network transmission protocols (`fetch`, serialization, standard headers) are completely isolated from components, allowing backend endpoints to be changed without modifying any UI structures.

---

## 🏗️ Layered Architecture

```text
┌────────────────────────────────────────────────────────┐
│                      PRESENTATION                      │
│   (App.tsx, components/Navbar, DashboardSandbox, etc)  │
└───────────────────────────┬────────────────────────────┘
                            │ uses hooks
┌───────────────────────────▼────────────────────────────┐
│                  CUSTOM REACT HOOKS                    │
│      (useContactForm.ts, useResumeDownload.ts)         │
└───────────────────────────┬────────────────────────────┘
                            │ triggers services
┌───────────────────────────▼────────────────────────────┐
│                    SERVICE CLIENT                      │
│    (contactService.ts, resumeService.ts, apiClient.ts) │
└───────────────────────────┬────────────────────────────┘
                            │ fetches data
┌───────────────────────────▼────────────────────────────┐
│                   UTILITIES & CONFIG                   │
│          (apiClient.ts, error.ts, request.ts)          │
└────────────────────────────────────────────────────────┘
```

### 1. Presentation Layer (`src/components/`, `src/App.tsx`)
- Presentational elements designed with high visual density, structured negative space, and responsive grids.
- Components never make direct network calls (`fetch` / `axios` / `xmlhttprequest`). Instead, they interface with customized state hooks.
- Leverages `motion` for spatial transitions and item expansions.

### 2. Hook Layer (`src/hooks/`)
- Encapsulates state variables (`isLoading`, `isSuccess`, `error`) and async operations.
- Translates raw service exceptions into standard descriptive user notification logs.
- Prevents infinite visual rerendering by memoizing status changes and stabilizing array/object triggers.

### 3. Service Layer (`src/services/`)
- Defines business models (e.g., submitting contact forms, registering/tracking professional resume download telemetry).
- Utilizes the decoupled `apiClient` to transmit payload packages over standard HTTP methods.

### 4. Integration & Utilities (`src/utils/`, `src/config/`)
- **`apiClient.ts`:** Wraps standard web `fetch` with pre-configured headers, payload serialization protocols, and automatic response formatting.
- **`request.ts`:** Formulates the standardized business request envelope, injecting client metadata.
- **`error.ts`:** Standardizes multi-channel exceptions (network failure, API error payloads, generic execution bugs) into a single predictable `ApiError` interface.

---

## 📊 Core Data Flows

### A. Contact Form Submission Lifecycle
1. User enters data in `Contact.tsx` and triggers the submit action.
2. Form parameters are dispatched to `useContactForm.ts` hook.
3. The hook runs frontend validations, toggles `isLoading = true`, and invokes `contactService.submitForm()`.
4. `contactService` formats the parameters using `buildApiRequest` from `request.ts` and routes the post-packet through `apiClient.post()`.
5. `apiClient` wraps the packet in standard headers and initiates the asynchronous `fetch()` query to `VITE_API_URL`.
6. **Backend Processing (Google Apps Script Router):**
   - **Step 6.1 (Request Entry):** Router captures the request, generates a unique Request ID, and logs `INFO Router Incoming Request`.
   - **Step 6.2 (Input Validation):** Standard schema validators check for the presence of mandatory inputs. Any validation failure terminates early and outputs a standard error response immediately.
   - **Step 6.3 (Primary Transaction):** If valid, `ContactService.createContact` inserts the contact record as an auditable row in the `Contacts` Google Sheet and records `INFO ContactService Contact Created`.
   - **Step 6.4 (Secondary Alerts - Failure Resilience):** The engine triggers `EmailService` inside protective try-catch boundaries. 
     - Dispatches a client confirmation email and logs `INFO EmailService Client Confirmation Sent` (including Recipient Email, Reference Number, and Subject).
     - Dispatches an admin notification email to the site owner and logs `INFO EmailService Owner Notification Sent`.
     - *Note:* Any email dispatch exception is swallowed and logged so that contact storage remains successful and does not interrupt the final client response.
   - **Step 6.5 (Workflow Conclusion):** The backend writes a final audit log `INFO ContactService Workflow Completed` with Details: `"Contact stored and post-processing completed."`
7. Upon API resolution:
   - **Success:** State variables are updated, inputs are flushed, and an success toast is shown.
   - **Failure:** The raw exception is formatted via `formatApiError` in `error.ts` and rendered as a descriptive error panel.

---

## 🔒 Security & Data Integrity

- **Environment Separation:** API endpoints and secret variables are strictly loaded through standard environmental config profiles (`.env` and `.env.example`).
- **No Exposed Keys:** Client credentials, database secrets, or third-party tokens are never committed to code or sent directly to browsers.
- **Client Sanitization:** Conversational AI prompts and code previews are executed inside isolated simulation scopes (sandboxed templates) to prevent XSS injection.
