/**
 * Invoice-related types for BTCPay Server API
 */

import type { StoreId, UnixTimestamp } from './common.ts';

/** Status of an invoice */
export type InvoiceStatus = 'New' | 'Processing' | 'Expired' | 'Invalid' | 'Settled';

/**
 * Options for the invoice checkout page
 */
export interface InvoiceCheckoutOptions {
  /** Speed policy for the transaction */
  readonly speedPolicy?: 'HighSpeed' | 'MediumSpeed' | 'LowSpeed' | 'LowMediumSpeed' | null;
  /** Allowed payment methods */
  readonly paymentMethods?: readonly string[] | null;
  /** Expiration time in minutes */
  readonly expirationMinutes?: number | null;
  /** Monitoring time in minutes */
  readonly monitoringMinutes?: number | null;
  /** Payment tolerance percentage */
  readonly paymentTolerance?: number | null;
  /** Redirect URL after payment */
  readonly redirectURL?: string | null;
  /** Whether to redirect automatically */
  readonly redirectAutomatically?: boolean | null;
  /** Whether a refund email is required */
  readonly requiresRefundEmail?: boolean | null;
  /** Checkout type (e.g., "V1", "V2") */
  readonly checkoutType?: string | null;
  /** Default language for the checkout page */
  readonly defaultLanguage?: string | null;
}

/**
 * Request body for creating a new invoice
 */
export interface CreateInvoiceRequest {
  /** Amount to be paid */
  readonly amount?: string | null;
  /** Currency code */
  readonly currency?: string | null;
  /** Metadata associated with the invoice */
  readonly metadata?: Record<string, unknown> | null;
  /** Checkout options */
  readonly checkout?: InvoiceCheckoutOptions | null;
  /** Receipt data */
  readonly receipt?: Record<string, unknown> | null;
  /** Additional search terms */
  readonly additionalSearchTerms?: readonly string[] | null;
}

/**
 * Information about an invoice
 */
export interface InvoiceData {
  /** The unique ID of the invoice */
  readonly id: string;
  /** The ID of the store */
  readonly storeId: StoreId;
  /** The amount of the invoice */
  readonly amount: string;
  /** The currency of the invoice */
  readonly currency: string;
  /** The type of the invoice */
  readonly type: string;
  /** The checkout link */
  readonly checkoutLink: string;
  /** Creation timestamp */
  readonly createdTime: UnixTimestamp;
  /** Expiration timestamp */
  readonly expirationTime: UnixTimestamp;
  /** Monitoring expiration timestamp */
  readonly monitoringExpiration: UnixTimestamp;
  /** The status of the invoice */
  readonly status: InvoiceStatus;
  /** Additional status information */
  readonly additionalStatus: string;
  /** Metadata associated with the invoice */
  readonly metadata?: Record<string, unknown>;
}

/**
 * List of invoices
 */
export interface InvoiceDataList {
  /** List of invoices */
  readonly data: readonly InvoiceData[];
  /** Number of invoices returned */
  readonly count: number;
  /** Total number of invoices */
  readonly total: number;
}

/**
 * Request body for updating an invoice
 */
export interface UpdateInvoiceRequest {
  /** Metadata to update */
  readonly metadata?: Record<string, unknown> | null;
}
