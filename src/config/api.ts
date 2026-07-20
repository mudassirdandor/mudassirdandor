/**
 * Backend API base configuration.
 * Exposes the VITE_API_URL environment variable and standard API parameters.
 */

// The base endpoint of the backend API, fetched from Vite's environment variables.
export const VITE_API_URL = (import.meta as any).env.VITE_API_URL || "https://script.google.com/macros/s/AKfycbwElmY8OvTo_Bb5PpRwx71X44VHKkBnY-WwavPXzLJg2VCdEn6ZfMTfWZyVtOJxd3vJ/exec";

// Standard versioning code for API communication.
export const API_VERSION = "v1";

// Default request headers.
export const DEFAULT_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};
