/**
 * HTTP client configuration and types
 */

/**
 * Configuration options for the BTCPay Client
 */
export interface BTCPayClientConfig {
  /** The base URL of your BTCPay Server instance */
  readonly baseUrl: string;
  /** Your API key */
  readonly apiKey: string;
  /** Request timeout in milliseconds (optional) */
  readonly timeout?: number;
}

/**
 * Options for making an HTTP request
 */
export interface RequestOptions {
  /** HTTP method */
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** Request path relative to base URL */
  readonly path: string;
  /** Request body data (use FormData for multipart requests) */
  readonly body?: unknown | FormData | undefined;
  /** Query parameters */
  readonly queryParams?:
    | Record<string, string | number | boolean | readonly (string | number | boolean)[] | null | undefined>
    | undefined;
  /** Custom headers */
  readonly headers?: Record<string, string> | undefined;
}

/**
 * Standard API response wrapper
 * @template T - The type of the response data
 */
export interface ApiResponse<T> {
  /** The response body data */
  readonly data: T;
  /** HTTP status code */
  readonly status: number;
  /** Response headers */
  readonly headers: Record<string, string>;
}
