/**
 * Store management API client
 */

import type { ApiResponse } from '@typings/client';
import type { StoreBaseData, StoreData, StoreDataList, StoreUserDataList } from '@typings/stores';
import type { HttpClient } from '@utils/http-client';

export class StoresClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get all stores accessible by the current user
   * @returns Promise resolving to the list of stores
   */
  public getStores = async (): Promise<ApiResponse<StoreDataList>> => {
    return this.client.request<StoreDataList>({
      'method': 'GET',
      'path': '/api/v1/stores',
    });
  };

  /**
   * Get a specific store by ID
   * @param storeId - The ID of the store to retrieve
   * @returns Promise resolving to the store data
   */
  public getStore = async (storeId: string): Promise<ApiResponse<StoreData>> => {
    return this.client.request<StoreData>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}`,
    });
  };

  /**
   * Create a new store
   * @param data - The store creation data
   * @returns Promise resolving to the created store
   */
  public createStore = async (data: StoreBaseData): Promise<ApiResponse<StoreData>> => {
    return this.client.request<StoreData>({
      'method': 'POST',
      'path': '/api/v1/stores',
      'body': data,
    });
  };

  /**
   * Update an existing store
   * @param storeId - The ID of the store to update
   * @param data - The update data
   * @returns Promise resolving to the updated store
   */
  public updateStore = async (storeId: string, data: StoreBaseData): Promise<ApiResponse<StoreData>> => {
    return this.client.request<StoreData>({
      'method': 'PUT',
      'path': `/api/v1/stores/${storeId}`,
      'body': data,
    });
  };

  /**
   * Delete a store
   * @param storeId - The ID of the store to delete
   * @returns Promise resolving when the store is deleted
   */
  public deleteStore = async (storeId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/stores/${storeId}`,
    });
  };

  /**
   * Get users associated with a store
   * @param storeId - The ID of the store
   * @returns Promise resolving to the list of store users
   */
  public getStoreUsers = async (storeId: string): Promise<ApiResponse<StoreUserDataList>> => {
    return this.client.request<StoreUserDataList>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/users`,
    });
  };
}
