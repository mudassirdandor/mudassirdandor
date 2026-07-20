# API Specifications & Data Contracts

This document defines the exact data schemas, request payloads, response envelopes, and error objects utilized for client-server communication in the portfolio application.

---

## 🛰️ Base Configuration

All API requests route through the base address specified by the `VITE_API_URL` environment variable:
- **Default/Mock Base:** `https://script.google.com/macros/s/AKfycbwElmY8OvTo_Bb5PpRwx71X44VHKkBnY-WwavPXzLJg2VCdEn6ZfMTfWZyVtOJxd3vJ/exec`
- **Headers Protocol:**
  - `Content-Type`: `text/plain;charset=utf-8` (Google Apps Script cross-origin standard)

---

## 📦 Request Envelope

Every outbound POST query is wrapped in a standardized metadata envelope to support diagnostic auditing:

```typescript
interface ApiRequestEnvelope<T> {
  action: string;      // The target server function to execute
  timestamp: string;   // ISO 8601 string of request initialization
  data: T;             // The target functional payload
}
```

---

## 📑 API Endpoints & Interfaces

### 1. Contact Form Submission
- **Method:** `POST`
- **Target Action:** `submit_contact`
- **Path:** `/` (Base Address)

#### Outbound Payload:
```json
{
  "action": "submit_contact",
  "timestamp": "2026-07-02T12:00:00.000Z",
  "data": {
    "name": "Alex Mercer",
    "email": "alex.mercer@corporate.com",
    "company": "Mercer Consulting Group",
    "message": "We would like to discuss a multi-region Power BI architecture engagement."
  }
}
```

#### Successful Response (`200 OK`):
```json
{
  "success": true,
  "data": {
    "status": "success",
    "message": "Form submitted successfully."
  }
}
```

---

### 2. Resume Download Tracking
- **Method:** `POST`
- **Target Action:** `track_resume_download`
- **Path:** `/` (Base Address)

#### Outbound Payload:
```json
{
  "action": "track_resume_download",
  "timestamp": "2026-07-02T12:05:00.000Z",
  "data": {
    "referrer": "https://linkedin.com/in/mudassirdandor",
    "userAgent": "Mozilla/5.0 ... Chrome/120.0.0.0 Safari/537.36",
    "timestamp": 1782993900000
  }
}
```

#### Successful Response (`200 OK`):
```json
{
  "success": true,
  "data": {
    "status": "success",
    "message": "Download tracked successfully."
  }
}
```

---

## ⚠️ Error Envelope & Statuses

When a network anomaly, data validation mismatch, or server exception occurs, the system formats the failure into a consistent, easily readable error layout:

```typescript
interface ApiError {
  message: string;          // Human-readable, descriptive explanation of the exception
  status?: number | string; // The HTTP status code or functional category string
  raw?: any;                // The original exception payload for client console tracing
}
```

### Common Exception Codes:

| Code / Category | Description | Root Cause / Resolution |
| :--- | :--- | :--- |
| `NETWORK_ERROR` | Unable to connect to host. | Check local connectivity or DNS status. |
| `API_ERROR` | Backend rejected the structured envelope. | Payload was missing mandatory properties or key actions. |
| `SERVER_ERROR` | Internal server exception. | Script or spreadsheet backend failed execution bounds. |
