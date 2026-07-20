/**
 * Clean structure for visible form fields on the client-side Contact Form.
 */
export interface ContactFormFields {
  readonly fullName: string;
  readonly email: string;
  readonly organization?: string;
  readonly subject: string;
  readonly message: string;
}

/**
 * Payload structure for sending a contact message to the backend.
 * Includes automatically injected metadata fields.
 */
export interface ContactRequest {
  readonly fullName: string;
  readonly email: string;
  readonly organization?: string;
  readonly subject: string;
  readonly message: string;
  readonly source: string;
  readonly page: string;
}

/**
 * Format of validation error details returned for bad inputs.
 */
export interface ValidationError {
  readonly field: keyof ContactRequest;
  readonly message: string;
}

/**
 * Response payload structure when a contact submission succeeds.
 */
export interface ContactResponse {
  readonly success?: boolean;
  readonly message?: string;
}
