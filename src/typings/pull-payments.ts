/**
 * Pull payment and payout types for BTCPay Server API
 */

/**
 * Information about a pull payment
 */
export interface PullPaymentData {
  /** The unique ID of the pull payment */
  readonly id: string;
  /** The name of the pull payment */
  readonly name?: string | null;
  /** The description */
  readonly description?: string | null;
  /** The currency */
  readonly currency: string;
  /** The amount */
  readonly amount: string;
  /** The period in seconds */
  readonly period?: number | null;
  /** BOLT11 expiration in seconds */
  readonly bolt11Expiration?: number | null;
  /** Whether the pull payment is archived */
  readonly archived: boolean;
  /** The view link */
  readonly viewLink: string;
  /** Start timestamp */
  readonly startsAt?: number | null;
  /** Expiration timestamp */
  readonly expiresAt?: number | null;
  /** Whether to auto-approve claims */
  readonly autoApproveClaims: boolean;
}

/**
 * List of pull payments
 */
export interface PullPaymentDataList {
  /** List of pull payments */
  readonly data: readonly PullPaymentData[];
}

/**
 * Request body for creating a pull payment
 */
export interface CreatePullPaymentRequest {
  /** The name of the pull payment */
  readonly name?: string | null;
  /** The description */
  readonly description?: string | null;
  /** The amount */
  readonly amount: string;
  /** The currency */
  readonly currency: string;
  /** Start timestamp */
  readonly startsAt?: number | null;
  /** Expiration timestamp */
  readonly expiresAt?: number | null;
  /** Allowed payout methods */
  readonly payoutMethods?: readonly string[] | null;
  /** Whether to auto-approve claims */
  readonly autoApproveClaims?: boolean;
  /** BOLT11 expiration in seconds */
  readonly BOLT11Expiration?: number | null;
}

/** State of a payout */
export type PayoutState = 'AwaitingApproval' | 'AwaitingPayment' | 'InProgress' | 'Completed' | 'Cancelled';

/**
 * Information about a payout
 */
export interface PayoutData {
  /** The unique ID of the payout */
  readonly id: string;
  /** The pull payment ID */
  readonly pullPaymentId?: string | null;
  /** The date timestamp */
  readonly date: number;
  /** The amount */
  readonly amount: string;
  /** The payment method */
  readonly paymentMethod: string;
  /** The destination address */
  readonly destination: string;
  /** The state of the payout */
  readonly state: PayoutState;
  /** Payment proof data */
  readonly paymentProof?: Record<string, unknown> | null;
}

/**
 * List of payouts
 */
export interface PayoutDataList {
  /** List of payouts */
  readonly data: readonly PayoutData[];
}

/**
 * Request body for creating a payout
 */
export interface CreatePayoutRequest {
  /** The destination address */
  readonly destination: string;
  /** The amount */
  readonly amount?: string | null;
  /** The payment method */
  readonly paymentMethod: string;
}

/**
 * Request body for creating a payout through a store
 */
export interface CreatePayoutThroughStoreRequest extends CreatePayoutRequest {
  /** Whether to approve the payout automatically */
  readonly approved?: boolean;
}

/**
 * Request body for approving a payout
 */
export interface ApprovePayoutRequest {
  /** The revision number */
  readonly revision?: number;
  /** The rate rule */
  readonly rateRule?: string | null;
}
