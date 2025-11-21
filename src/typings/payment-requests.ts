/**
 * Payment request types for BTCPay Server API
 */

import type { StoreId } from './common';

/**
 * Base data for payment requests
 */
export interface PaymentRequestBaseData {
  /** The title of the payment request */
  readonly title: string;
  /** The description */
  readonly description?: string | null;
  /** The amount */
  readonly amount?: string | null;
  /** The currency */
  readonly currency?: string | null;
  /** Expiration date timestamp */
  readonly expiryDate?: number | null;
  /** Email address */
  readonly email?: string | null;
  /** Embedded CSS */
  readonly embeddedCSS?: string | null;
  /** Custom CSS link */
  readonly customCSSLink?: string | null;
  /** Whether to allow custom payment amounts */
  readonly allowCustomPaymentAmounts?: boolean;
}

/**
 * Information about a payment request
 */
export interface PaymentRequestData extends PaymentRequestBaseData {
  /** The unique ID of the payment request */
  readonly id: string;
  /** The store ID */
  readonly storeId: StoreId;
  /** The status of the payment request */
  readonly status: 'Pending' | 'Completed' | 'Expired';
  /** Creation timestamp */
  readonly created: number;
  /** Whether the payment request is archived */
  readonly archived: boolean;
}

/**
 * List of payment requests
 */
export interface PaymentRequestDataList {
  /** List of payment requests */
  readonly data: readonly PaymentRequestData[];
}
