import { VITE_API_URL, DEFAULT_HEADERS } from "../config/api";
import { ApiResponse, ApiError } from "../types/api";
import { formatApiError } from "../utils/error";
import { API_MESSAGES } from "../constants/messages";

/**
 * Dispatches an HTTP request with automatic headers, payload serialization, and safety guards.
 * Normalizes all responses into the standard ApiResponse shape or throws an ApiError.
 * 
 * @param method - The HTTP verb (GET, POST, PUT, DELETE).
 * @param path - The resource endpoint path (relative to VITE_API_URL).
 * @param body - The optional request payload body.
 * @param customHeaders - Optional override or additional headers.
 */
async function request<TResponse, TBody = unknown>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: TBody,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<TResponse>> {
  let url = VITE_API_URL || "";
  if (path !== "/" && path !== "") {
    const baseUrlClean = url.replace(/\/$/, "");
    const pathClean = path.startsWith("/") ? path : `/${path}`;
    url = `${baseUrlClean}${pathClean}`;
  }

  const headers = {
    ...DEFAULT_HEADERS,
    ...customHeaders,
  };

  if (method === "POST") {
    headers["Content-Type"] = "text/plain;charset=UTF-8";
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    let responseData: any;

    try {
      responseData = text ? JSON.parse(text) : {};
    } catch {
      // Throw an ApiError for invalid JSON response formats
      const errorPayload: ApiError = {
        success: false,
        error: {
          code: "INVALID_JSON",
          message: API_MESSAGES.ERROR_JSON_PARSE,
          details: text,
        },
      };
      throw errorPayload;
    }

    if (!response.ok || (responseData && responseData.success === false)) {
      const reqId = responseData?.requestId || responseData?.metadata?.requestId || "unknown-request-id";
      const timestampVal = responseData?.timestamp || responseData?.metadata?.timestamp || new Date().toISOString();
      const errorPayload: ApiError = {
        success: false,
        message: responseData?.message,
        requestId: reqId,
        errors: responseData?.errors,
        timestamp: timestampVal,
        version: responseData?.version,
        error: {
          code: responseData?.errors?.[0]?.code || responseData?.error?.code || `HTTP_${response.status}`,
          message: responseData?.message || responseData?.error?.message || `HTTP request failed with status ${response.status}`,
          details: responseData?.errors || responseData?.error?.details || responseData?.details,
        },
        metadata: {
          requestId: reqId,
          timestamp: timestampVal,
          environment: responseData?.metadata?.environment,
          durationMs: responseData?.metadata?.durationMs,
        }
      };
      throw errorPayload;
    }

    const reqId = responseData?.requestId || responseData?.metadata?.requestId || "unknown-request-id";
    const timestampVal = responseData?.timestamp || responseData?.metadata?.timestamp || new Date().toISOString();
    const dataVal = (responseData?.data !== undefined ? responseData.data : responseData) as TResponse;

    return {
      success: true,
      message: responseData?.message,
      requestId: reqId,
      data: dataVal,
      errors: responseData?.errors,
      timestamp: timestampVal,
      version: responseData?.version,
      metadata: {
        requestId: reqId,
        timestamp: timestampVal,
        environment: responseData?.metadata?.environment,
        durationMs: responseData?.metadata?.durationMs,
      }
    };
  } catch (err) {
    // If it's already a standardized ApiError thrown by us, rethrow it directly
    if (err && typeof err === "object" && (err as any).success === false && (err as any).error) {
      throw err;
    }
    // Standardize all network, request-abort, or parsing exceptions
    throw formatApiError(err);
  }
}

/**
 * Reusable, centralized HTTP client helper functions.
 * Protects components from raw fetch invocations.
 */
export const apiClient = {
  /**
   * Dispatches a GET request to retrieve resources.
   */
  get: <T>(path: string, headers?: Record<string, string>) =>
    request<T>("GET", path, undefined, headers),

  /**
   * Dispatches a POST request to create or submit resources.
   */
  post: <T, B = unknown>(path: string, body?: B, headers?: Record<string, string>) =>
    request<T, B>("POST", path, body, headers),

  /**
   * Dispatches a PUT request to update existing resources.
   */
  put: <T, B = unknown>(path: string, body?: B, headers?: Record<string, string>) =>
    request<T, B>("PUT", path, body, headers),

  /**
   * Dispatches a DELETE request to remove resources.
   */
  delete: <T>(path: string, headers?: Record<string, string>) =>
    request<T>("DELETE", path, undefined, headers),
};

export default apiClient;
