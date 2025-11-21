/**
 * Webhook types for BTCPay Server API
 */

/**
 * Base data for a webhook
 */
export interface WebhookDataBase {
  /** The URL to send the webhook to */
  readonly url: string;
  /** Whether the webhook is enabled */
  readonly enabled?: boolean;
  /** Whether to automatically redeliver failed webhooks */
  readonly automaticRedelivery?: boolean;
  /** The secret used to sign the webhook */
  readonly secret?: string | null;
  /** Configuration for authorized events */
  readonly authorizedEvents?: {
    /** Whether to subscribe to all events */
    readonly everything?: boolean;
    /** List of specific events to subscribe to */
    readonly specificEvents?: readonly string[];
  };
}

/**
 * Request body for creating a webhook
 */
export interface WebhookDataCreate extends WebhookDataBase {}

/**
 * Request body for updating a webhook
 */
export interface WebhookDataUpdate extends WebhookDataBase {}

/**
 * Information about a webhook
 */
export interface WebhookData extends WebhookDataBase {
  /** The unique ID of the webhook */
  readonly id: string;
}

/**
 * List of webhooks
 */
export interface WebhookDataList {
  /** List of webhooks */
  readonly data: readonly WebhookData[];
}

/**
 * Information about a webhook delivery
 */
export interface WebhookDeliveryData {
  /** The unique ID of the delivery */
  readonly id: string;
  /** The webhook ID */
  readonly webhookId: string;
  /** Timestamp of the delivery */
  readonly timestamp: number;
  /** HTTP status code returned by the endpoint */
  readonly httpCode?: number | null;
  /** Status of the delivery */
  readonly status: 'Pending' | 'HttpSuccess' | 'HttpError' | 'Failed';
  /** Error message if failed */
  readonly errorMessage?: string | null;
}

/**
 * List of webhook deliveries
 */
export interface WebhookDeliveryList {
  /** List of webhook deliveries */
  readonly data: readonly WebhookDeliveryData[];
}
