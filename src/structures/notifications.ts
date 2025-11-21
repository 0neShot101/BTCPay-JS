/**
 * Notifications API client
 */

import type { ApiResponse } from '@typings/client';
import type { StoreId } from '@typings/common';
import type {
  NotificationData,
  NotificationSettingsData,
  UpdateNotification,
  UpdateNotificationSettingsRequest,
} from '@typings/notifications';
import type { HttpClient } from '@utils/http-client';

export class NotificationsClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List notifications
   * @param options - Filtering options
   * @returns Promise resolving to list of notifications
   */
  public list = async (options?: {
    readonly seen?: boolean;
    readonly skip?: number;
    readonly take?: number;
    readonly storeId?: readonly StoreId[];
  }): Promise<ApiResponse<readonly NotificationData[]>> => {
    return this.client.request<readonly NotificationData[]>({
      'method': 'GET',
      'path': '/api/v1/users/me/notifications',
      'queryParams': options as Record<string, string | number | boolean | readonly (string | number | boolean)[]>,
    });
  };

  /**
   * Get a specific notification
   * @param notificationId - The notification ID
   * @returns Promise resolving to the notification data
   */
  public get = async (notificationId: string): Promise<ApiResponse<NotificationData>> => {
    return this.client.request<NotificationData>({
      'method': 'GET',
      'path': `/api/v1/users/me/notifications/${notificationId}`,
    });
  };

  /**
   * Update a notification
   * @param notificationId - The notification ID
   * @param notification - The update data
   * @returns Promise resolving to the updated notification
   */
  public update = async (
    notificationId: string,
    notification: UpdateNotification,
  ): Promise<ApiResponse<NotificationData>> => {
    return this.client.request<NotificationData>({
      'method': 'PUT',
      'path': `/api/v1/users/me/notifications/${notificationId}`,
      'body': notification,
    });
  };

  /**
   * Delete a notification
   * @param notificationId - The notification ID
   * @returns Promise resolving when the notification is deleted
   */
  public delete = async (notificationId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/users/me/notifications/${notificationId}`,
    });
  };

  /**
   * Get notification settings
   * @returns Promise resolving to notification settings
   */
  public getSettings = async (): Promise<ApiResponse<NotificationSettingsData>> => {
    return this.client.request<NotificationSettingsData>({
      'method': 'GET',
      'path': '/api/v1/users/me/notification-settings',
    });
  };

  /**
   * Update notification settings
   * @param settings - The update data
   * @returns Promise resolving to the updated settings
   */
  public updateSettings = async (
    settings: UpdateNotificationSettingsRequest,
  ): Promise<ApiResponse<NotificationSettingsData>> => {
    return this.client.request<NotificationSettingsData>({
      'method': 'PUT',
      'path': '/api/v1/users/me/notification-settings',
      'body': settings,
    });
  };
}
