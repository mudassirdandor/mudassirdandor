/**
 * Standardized backend metadata returned with each response.
 */
export interface BackendMetadata {
  readonly requestId: string;
  readonly timestamp: string;
  readonly durationMs?: number;
  readonly environment?: string;
}

/**
 * Standardized successful API response wrapper.
 */
export interface ApiResponse<T> {
  readonly success: true;
  readonly message?: string;
  readonly requestId: string;
  readonly data: T;
  readonly errors?: any;
  readonly timestamp: string;
  readonly version?: string;
  readonly metadata: BackendMetadata;
}

/**
 * Standardized API error format returned by the client or server.
 */
export interface ApiError {
  readonly success: false;
  readonly message?: string;
  readonly requestId?: string;
  readonly errors?: any;
  readonly timestamp?: string;
  readonly version?: string;
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, string[] | string | undefined> | string;
  };
  readonly metadata?: BackendMetadata;
}

/**
 * Standardized API payload format.
 */
export interface ApiRequest<T> {
  readonly route: string;
  readonly data: T;
}
