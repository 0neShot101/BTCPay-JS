/**
 * Server-related types for BTCPay Server API
 */

/**
 * Information about the BTCPay Server instance
 */
export interface ApplicationServerInfoData {
  /** The version of the server */
  readonly version: string;
  /** The onion address */
  readonly onion?: string | null;
  /** List of supported payment methods */
  readonly supportedPaymentMethods: readonly string[];
  /** Whether the server is fully synced */
  readonly fullySynced: boolean;
  /** Sync status for each crypto code */
  readonly syncStatus: readonly {
    readonly cryptoCode: string;
    readonly nodeInformation?: {
      readonly blockCount: number;
      readonly headers: number;
    };
    readonly chainHeight: number;
    readonly syncPercentage: number;
  }[];
}

/**
 * Email settings for the server
 */
export interface ServerEmailSettings {
  /** SMTP server address */
  readonly server?: string | null;
  /** SMTP port */
  readonly port?: number | null;
  /** SMTP username */
  readonly username?: string | null;
  /** SMTP password */
  readonly password?: string | null;
  /** From email address */
  readonly from?: string | null;
  /** Whether to enable SSL */
  readonly enableSSL?: boolean;
}

/**
 * Response for getting email settings
 */
export interface GetServerEmailSettings extends ServerEmailSettings {}

/**
 * Request body for updating email settings
 */
export interface UpdateServerEmailSettings extends ServerEmailSettings {}

/**
 * Health status of the server
 */
export interface ApplicationHealthData {
  /** Whether the server is synchronized */
  readonly synchronized: boolean;
}

/**
 * Information about an uploaded file
 */
export interface FileData {
  /** The unique ID of the file */
  readonly id: string;
  /** The URL of the file */
  readonly url: string;
  /** The original filename */
  readonly originalName: string;
  /** The size of the file in bytes */
  readonly size: number;
  /** Upload timestamp */
  readonly timestamp: number;
}
