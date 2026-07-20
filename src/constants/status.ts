/**
 * Application status constants.
 */
export const CONTACT_STATUS = {
  QUEUED: "queued",
  SENT: "sent",
  RECEIVED: "received",
} as const;

export type ContactStatus = typeof CONTACT_STATUS[keyof typeof CONTACT_STATUS];
