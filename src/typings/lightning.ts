/**
 * Lightning Network types for BTCPay Server API
 */

/**
 * Information about the Lightning node
 */
export interface LightningNodeInformationData {
  /** List of node URIs */
  readonly nodeURIs: readonly string[];
  /** Current block height */
  readonly blockHeight: number;
}

/**
 * Balance information for the Lightning node
 */
export interface LightningNodeBalanceData {
  /** On-chain balance */
  readonly onchain?: {
    readonly confirmed: string;
    readonly unconfirmed: string;
    readonly reserved: string;
  };
  /** Off-chain (Lightning) balance */
  readonly offchain?: {
    readonly opening: string;
    readonly local: string;
    readonly remote: string;
    readonly closing: string;
  };
}

/**
 * Information about a Lightning invoice
 */
export interface LightningInvoiceData {
  /** The unique ID of the invoice */
  readonly id: string;
  /** The status of the invoice */
  readonly status: 'Unpaid' | 'Paid' | 'Expired';
  /** The BOLT11 invoice string */
  readonly bolt11: string;
  /** Timestamp when the invoice was paid */
  readonly paidAt?: number | null;
  /** Expiration timestamp */
  readonly expiresAt: number;
  /** The amount of the invoice */
  readonly amount: string;
}

/**
 * Request body for creating a Lightning invoice
 */
export interface CreateLightningInvoiceRequest {
  /** Amount to receive */
  readonly amount: string;
  /** Description of the invoice */
  readonly description?: string | null;
  /** Expiration time in seconds */
  readonly expiry?: number | null;
  /** Whether to include private route hints */
  readonly privateRouteHints?: boolean;
}

/**
 * Information about a Lightning payment
 */
export interface LightningPaymentData {
  /** The unique ID of the payment */
  readonly id: string;
  /** The status of the payment */
  readonly status: 'Pending' | 'Complete' | 'Failed';
  /** The BOLT11 invoice string */
  readonly bolt11: string;
  /** The payment preimage */
  readonly preimage?: string | null;
  /** Creation timestamp */
  readonly createdAt: number;
  /** Total amount paid */
  readonly totalAmount: string;
  /** Fee amount paid */
  readonly feeAmount?: string | null;
}

/**
 * Request body for paying a Lightning invoice
 */
export interface PayLightningInvoiceRequest {
  /** The BOLT11 invoice string */
  readonly bolt11: string;
  /** Amount to pay (if not specified in invoice) */
  readonly amount?: string | null;
  /** Maximum fee percentage willing to pay */
  readonly maxFeePercent?: number | null;
  /** Maximum flat fee willing to pay */
  readonly maxFeeFlat?: string | null;
  /** Timeout for sending payment in seconds */
  readonly sendTimeout?: number | null;
}

/**
 * Information about a Lightning channel
 */
export interface LightningChannelData {
  /** The remote node URI */
  readonly remoteNode: string;
  /** Whether the channel is public */
  readonly isPublic: boolean;
  /** Whether the channel is active */
  readonly isActive: boolean;
  /** Channel capacity */
  readonly capacity: string;
  /** Local balance in the channel */
  readonly localBalance: string;
  /** Channel point (txid:output_index) */
  readonly channelPoint: string;
}

/**
 * Request body for opening a Lightning channel
 */
export interface OpenLightningChannelRequest {
  /** The remote node URI */
  readonly nodeURI: string;
  /** Amount to fund the channel with */
  readonly channelAmount: string;
  /** Fee rate for the funding transaction */
  readonly feeRate?: number | null;
}

/**
 * Request body for connecting to a Lightning node
 */
export interface ConnectToNodeRequest {
  /** The node URI to connect to */
  readonly nodeURI: string;
}
