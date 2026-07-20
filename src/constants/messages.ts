/**
 * Shared application and validation messages.
 */
export const API_MESSAGES = {
  LOADING: "Submitting your message, please wait...",
  SUCCESS: "Your message has been sent successfully!",
  ERROR_GENERIC: "An error occurred in backend communications.",
  ERROR_RUNTIME: "A local runtime exception occurred.",
  ERROR_UNKNOWN: "An undocumented system exception was caught.",
  ERROR_NETWORK: "Network communication failed. Please check your connection.",
  ERROR_JSON_PARSE: "Invalid server response format received.",
} as const;
