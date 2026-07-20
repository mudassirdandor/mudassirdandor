import { ApiError } from "../types/api";
import { API_MESSAGES } from "../constants/messages";

/**
 * Standardizes any caught error (e.g. network failure, parsed backend error response, or syntax errors)
 * into a typed ApiError structure.
 * 
 * @param error - The raw caught error.
 * @returns A standardized ApiError object.
 */
export function formatApiError(error: unknown): ApiError {
  const timestamp = new Date().toISOString();

  if (error && typeof error === "object") {
    // If it is already a standardized ApiError, return it directly
    const maybeApiError = error as Partial<ApiError>;
    if (maybeApiError.success === false && maybeApiError.error) {
      const reqId = maybeApiError.requestId || maybeApiError.metadata?.requestId;
      return {
        success: false,
        requestId: reqId,
        timestamp: maybeApiError.timestamp || timestamp,
        version: maybeApiError.version,
        error: {
          code: maybeApiError.error.code || "API_ERROR",
          message: maybeApiError.error.message || API_MESSAGES.ERROR_GENERIC,
          details: maybeApiError.error.details,
        },
        metadata: {
          requestId: reqId || "unknown",
          timestamp: maybeApiError.metadata?.timestamp || maybeApiError.timestamp || timestamp,
          environment: maybeApiError.metadata?.environment,
          durationMs: maybeApiError.metadata?.durationMs,
        },
      };
    }

    // Check if it's a DOMException or TypeError associated with network dropouts
    const jsError = error as Error;
    const isNetwork = jsError.message?.toLowerCase().includes("network") || 
                      jsError.message?.toLowerCase().includes("failed to fetch") ||
                      jsError.message?.toLowerCase().includes("load failed");

    if (isNetwork) {
      return {
        success: false,
        error: {
          code: "NETWORK_FAILURE",
          message: API_MESSAGES.ERROR_NETWORK,
        },
      };
    }

    // Handle generic JS Error objects
    return {
      success: false,
      error: {
        code: jsError.name || "RUNTIME_ERROR",
        message: jsError.message || API_MESSAGES.ERROR_RUNTIME,
      },
    };
  }

  // Handle cases where a non-object or string was thrown
  return {
    success: false,
    error: {
      code: "UNKNOWN_EXCEPTION",
      message: String(error || API_MESSAGES.ERROR_UNKNOWN),
    },
  };
}
