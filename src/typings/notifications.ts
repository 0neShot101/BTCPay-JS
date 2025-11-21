/**
 * Notification types for BTCPay Server API
 */

/**
 * Information about a notification
 */
export interface NotificationData {
  /** The unique ID of the notification */
  readonly id: string;
  /** Creation timestamp */
  readonly createdTime: number;
  /** Whether the notification has been seen */
  readonly seen: boolean;
  /** The body text of the notification */
  readonly body: string;
  /** Optional link associated with the notification */
  readonly actionLink?: string | null;
  /** Optional identifier */
  readonly identifier?: string | null;
}

/**
 * Request body for updating a notification
 */
export interface UpdateNotification {
  /** Update the seen status */
  readonly seen: boolean;
}

/**
 * Notification settings
 */
export interface NotificationSettingsData {
  /** Whether notifications are disabled */
  readonly disabled: boolean;
}

/**
 * Request body for updating notification settings
 */
export interface UpdateNotificationSettingsRequest {
  /** Whether to disable notifications */
  readonly disabled: boolean;
}
