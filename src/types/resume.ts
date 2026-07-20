/**
 * Payload structure for tracking/recording resume download requests.
 */
export interface ResumeRequest {
  readonly source: string;
  readonly page: string;
}

/**
 * Response payload structure when a resume request succeeds.
 * Since the backend is responsible only for tracking, this may be empty.
 */
export interface ResumeResponse {
  readonly success?: boolean;
}
