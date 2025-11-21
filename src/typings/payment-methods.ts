/**
 * Payment method types for BTCPay Server API
 */

import type { PaymentMethodId } from '@typings/common';

/** List of histogram window types returned by the server */
export type HistogramWindow = 'Week' | 'Month' | 'Year';

/** Config payloads accepted by payment method endpoints */
export type PaymentMethodConfig = OnChainPaymentMethodBaseData | Record<string, unknown> | string | null;

/** Generic payment method data */
export interface GenericPaymentMethodData {
  /** Identifier of the payment method (example: BTC-CHAIN) */
  readonly paymentMethodId: PaymentMethodId;
  /** Whether the payment method is enabled */
  readonly enabled: boolean;
  /** Optional crypto code exposed by some endpoints */
  readonly cryptoCode?: string;
  /** Configuration payload, shape depends on the method type */
  readonly config?: PaymentMethodConfig;
}

/** Payload for updating a payment method */
export interface UpdatePaymentMethodConfig {
  /** Whether to enable the payment method */
  readonly enabled?: boolean | null;
  /** Configuration override */
  readonly config?: PaymentMethodConfig;
}

/** Base data for on-chain payment methods */
export interface OnChainPaymentMethodBaseData {
  /** The derivation scheme */
  readonly derivationScheme?: string;
  /** Optional label displayed in UI */
  readonly label?: string | null;
  /** Account key path */
  readonly accountKeyPath?: string | null;
}

/** Overview of an on-chain wallet */
export interface OnChainWalletOverviewData {
  readonly balance: string;
  readonly unconfirmedBalance: string;
  readonly confirmedBalance: string;
}

/** Histogram of historic wallet balances */
export interface HistogramData {
  readonly type: HistogramWindow;
  readonly balance: string;
  readonly series: readonly string[];
  readonly labels: readonly number[];
}

/** Wallet feerate details */
export interface OnChainWalletFeeRateData {
  readonly feeRate: number;
}

/** Receive address data */
export interface OnChainWalletAddressData {
  readonly address: string;
  readonly keyPath?: string | null;
  readonly paymentLink?: string | null;
}

/** Wallet transaction label */
export interface LabelData {
  readonly type?: string;
  readonly text?: string;
}

/** Information about an on-chain wallet transaction */
export interface OnChainWalletTransactionData {
  /** Transaction hash reported by the server */
  readonly transactionHash?: string | null;
  /** Legacy alias returned by older nodes */
  readonly transactionId?: string | null;
  readonly comment?: string | null;
  readonly amount: string;
  readonly blockHash?: string | null;
  readonly blockHeight?: string | number | null;
  readonly confirmations?: string | number | null;
  readonly timestamp: number;
  readonly status: 'Unconfirmed' | 'Confirmed' | 'Replaced';
  readonly labels?: readonly LabelData[];
}

/** Request body for creating an on-chain transaction */
export interface CreateOnChainTransactionRequest {
  readonly destinations: readonly {
    readonly destination: string;
    readonly amount?: string | null;
    readonly subtractFromAmount?: boolean;
  }[];
  readonly feerate?: number | null;
  readonly proceedWithPayjoin?: boolean | null;
  readonly proceedWithBroadcast?: boolean | null;
  readonly noChange?: boolean | null;
  readonly rbf?: boolean | null;
  readonly excludeUnconfirmed?: boolean | null;
  readonly selectedInputs?: readonly string[] | null;
}

/** Request body for patching metadata about a transaction */
export interface PatchOnChainTransactionRequest {
  readonly comment?: string | null;
  readonly labels?: readonly string[] | null;
}

/** Information about an on-chain wallet UTXO */
export interface OnChainWalletUTXOData {
  readonly comment?: string;
  readonly amount: string;
  readonly link?: string;
  readonly outpoint: string;
  readonly timestamp: number;
  readonly keyPath?: string;
  readonly address?: string;
  readonly confirmations: number;
  readonly labels?: readonly LabelData[];
}

/** Wallet object identifier */
export interface OnChainWalletObjectId {
  readonly type: string;
  readonly id: string;
}

/** Wallet object link request */
export interface AddOnChainWalletObjectLinkRequest extends OnChainWalletObjectId {
  readonly data?: Record<string, unknown>;
}

/** Link information between wallet objects */
export interface OnChainWalletObjectLink {
  readonly type: string;
  readonly id: string;
  readonly linkData?: Record<string, unknown>;
  readonly objectData?: Record<string, unknown> | null;
}

/** Wallet graph object */
export interface OnChainWalletObjectData extends OnChainWalletObjectId {
  readonly data?: Record<string, unknown>;
  readonly links?: readonly OnChainWalletObjectLink[] | null;
}

/** Generated wallet preview address entry */
export interface OnChainPaymentMethodPreviewResultAddressItem {
  readonly keyPath: string;
  readonly address: string;
}

/** Result of preview endpoints */
export interface OnChainPaymentMethodPreviewResultData {
  readonly addresses: readonly OnChainPaymentMethodPreviewResultAddressItem[];
}

/** Wallet generation payload */
export interface GenerateOnChainWalletRequest {
  readonly label?: string;
  readonly existingMnemonic?: string;
  readonly passphrase?: string;
  readonly accountNumber?: number;
  readonly savePrivateKeys?: boolean;
  readonly importKeysToRPC?: boolean;
  readonly wordList?:
    | 'English'
    | 'Japanese'
    | 'Spanish'
    | 'ChineseSimplified'
    | 'ChineseTraditional'
    | 'French'
    | 'PortugueseBrazil'
    | 'Czech';
  readonly wordCount?: 12 | 15 | 18 | 21 | 24;
  readonly scriptPubKeyType?: 'Legacy' | 'Segwit' | 'SegwitP2SH' | 'TaprootBIP86';
}

/** Store lightning address configuration */
export interface LightningAddressData {
  readonly username: string;
  readonly currencyCode?: string | null;
  readonly min?: string | null;
  readonly max?: string | null;
  readonly invoiceMetadata?: Record<string, unknown> | null;
}
