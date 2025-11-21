/**
 * Store lightning address API client
 */

import type { ApiResponse } from '@typings/client';
import type { LightningAddressData } from '@typings/payment-methods';
import type { HttpClient } from '@utils/http-client';

export class LightningAddressesClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List lightning addresses configured on a store
   */
  public getLightningAddresses = async (storeId: string): Promise<ApiResponse<LightningAddressData[]>> => {
    return this.client.request<LightningAddressData[]>({
      'path': `/api/v1/stores/${storeId}/lightning-addresses`,
      'method': 'GET',
    });
  };

  /**
   * Get a lightning address configuration by username
   */
  public getLightningAddress = async (
    storeId: string,
    username: string,
  ): Promise<ApiResponse<LightningAddressData>> => {
    return this.client.request<LightningAddressData>({
      'path': `/api/v1/stores/${storeId}/lightning-addresses/${username}`,
      'method': 'GET',
    });
  };

  /**
   * Add or update a lightning address for a store
   */
  public upsertLightningAddress = async (
    storeId: string,
    username: string,
    data: LightningAddressData,
  ): Promise<ApiResponse<LightningAddressData>> => {
    return this.client.request<LightningAddressData>({
      'path': `/api/v1/stores/${storeId}/lightning-addresses/${username}`,
      'method': 'POST',
      'body': data,
    });
  };

  /**
   * Remove a lightning address from a store
   */
  public deleteLightningAddress = async (storeId: string, username: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'path': `/api/v1/stores/${storeId}/lightning-addresses/${username}`,
      'method': 'DELETE',
    });
  };
}
