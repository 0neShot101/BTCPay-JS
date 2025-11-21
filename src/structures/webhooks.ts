/**
 * Webhook API client
 */

import type { ApiResponse } from '@typings/client';
import type { StoreId } from '@typings/common';
import type {
  WebhookData,
  WebhookDataCreate,
  WebhookDataList,
  WebhookDataUpdate,
  WebhookDeliveryData,
  WebhookDeliveryList,
} from '@typings/webhooks';
import type { HttpClient } from '@utils/http-client';

export class WebhooksClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List webhooks
   * @param storeId - The store ID
   * @returns Promise resolving to list of webhooks
   */
  public list = async (storeId: StoreId): Promise<ApiResponse<WebhookDataList>> => {
    return this.client.request<WebhookDataList>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/webhooks`,
    });
  };

  /**
   * Create a new webhook
   * @param storeId - The store ID
   * @param webhook - The webhook creation data
   * @returns Promise resolving to the created webhook
   */
  public create = async (storeId: StoreId, webhook: WebhookDataCreate): Promise<ApiResponse<WebhookData>> => {
    return this.client.request<WebhookData>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/webhooks`,
      'body': webhook,
    });
  };

  /**
   * Get a specific webhook
   * @param storeId - The store ID
   * @param webhookId - The webhook ID
   * @returns Promise resolving to the webhook data
   */
  public get = async (storeId: StoreId, webhookId: string): Promise<ApiResponse<WebhookData>> => {
    return this.client.request<WebhookData>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/webhooks/${webhookId}`,
    });
  };

  /**
   * Update a webhook
   * @param storeId - The store ID
   * @param webhookId - The webhook ID
   * @param webhook - The update data
   * @returns Promise resolving to the updated webhook
   */
  public update = async (
    storeId: StoreId,
    webhookId: string,
    webhook: WebhookDataUpdate,
  ): Promise<ApiResponse<WebhookData>> => {
    return this.client.request<WebhookData>({
      'method': 'PUT',
      'path': `/api/v1/stores/${storeId}/webhooks/${webhookId}`,
      'body': webhook,
    });
  };

  /**
   * Delete a webhook
   * @param storeId - The store ID
   * @param webhookId - The webhook ID
   * @returns Promise resolving when the webhook is deleted
   */
  public delete = async (storeId: StoreId, webhookId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/stores/${storeId}/webhooks/${webhookId}`,
    });
  };

  /**
   * Get webhook deliveries
   * @param storeId - The store ID
   * @param webhookId - The webhook ID
   * @param count - Number of deliveries to retrieve
   * @returns Promise resolving to list of deliveries
   */
  public getDeliveries = async (
    storeId: StoreId,
    webhookId: string,
    count?: number,
  ): Promise<ApiResponse<WebhookDeliveryList>> => {
    return this.client.request<WebhookDeliveryList>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/webhooks/${webhookId}/deliveries`,
      'queryParams': count !== undefined ? { count } : undefined,
    });
  };

  /**
   * Get a specific webhook delivery
   * @param storeId - The store ID
   * @param webhookId - The webhook ID
   * @param deliveryId - The delivery ID
   * @returns Promise resolving to the delivery data
   */
  public getDelivery = async (
    storeId: StoreId,
    webhookId: string,
    deliveryId: string,
  ): Promise<ApiResponse<WebhookDeliveryData>> => {
    return this.client.request<WebhookDeliveryData>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/webhooks/${webhookId}/deliveries/${deliveryId}`,
    });
  };

  /**
   * Get webhook delivery request
   * @param storeId - The store ID
   * @param webhookId - The webhook ID
   * @param deliveryId - The delivery ID
   * @returns Promise resolving to the delivery request data
   */
  public getDeliveryRequest = async (
    storeId: StoreId,
    webhookId: string,
    deliveryId: string,
  ): Promise<ApiResponse<Record<string, unknown>>> => {
    return this.client.request<Record<string, unknown>>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/webhooks/${webhookId}/deliveries/${deliveryId}/request`,
    });
  };

  /**
   * Redeliver a webhook
   * @param storeId - The store ID
   * @param webhookId - The webhook ID
   * @param deliveryId - The delivery ID to redeliver
   * @returns Promise resolving to the new delivery ID
   */
  public redeliverWebhook = async (
    storeId: StoreId,
    webhookId: string,
    deliveryId: string,
  ): Promise<ApiResponse<string>> => {
    return this.client.request<string>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/webhooks/${webhookId}/deliveries/${deliveryId}/redeliver`,
    });
  };
}
