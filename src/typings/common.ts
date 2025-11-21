/**
 * Common types used across the BTCPay Server API
 */

/** Unix timestamp in seconds */
export type UnixTimestamp = number;

/** Unique identifier for a store */
export type StoreId = string;

/** Identifier for a payment method (e.g., "BTC", "BTC-LightningNetwork") */
export type PaymentMethodId = string;

/** Identifier for a payout method */
export type PayoutMethodId = string;

/**
 * Standard error response details (RFC 7807)
 */
export interface ProblemDetails {
  /** Error type URI */
  readonly type?: string;
  /** Short, human-readable summary of the problem type */
  readonly title?: string;
  /** HTTP status code */
  readonly status?: number;
  /** Human-readable explanation specific to this occurrence of the problem */
  readonly detail?: string;
  /** URI reference that identifies the specific occurrence of the problem */
  readonly instance?: string;
}

/**
 * Error response for validation failures
 */
export interface ValidationProblemDetails extends ProblemDetails {
  /** Map of field names to validation error messages */
  readonly errors?: Record<string, string[]>;
}
