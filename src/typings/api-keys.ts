/**
 * API Key types for BTCPay Server API
 */

/**
 * Information about an API key
 */
export interface ApiKeyData {
  /** The API key string */
  readonly apiKey: string;
  /** Optional label for the key */
  readonly label?: string | null;
  /** List of permissions associated with the key */
  readonly permissions: readonly string[];
  /** The ID of the user who owns the key */
  readonly userId: string;
}

/**
 * Request body for creating a new API key
 */
export interface CreateApiKeyRequest {
  /** Optional label for the key */
  readonly label?: string | null;
  /** List of permissions to grant */
  readonly permissions?: readonly string[];
}
