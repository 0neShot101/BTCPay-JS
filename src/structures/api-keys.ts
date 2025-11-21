/**
 * API Keys client
 */

import type { ApiKeyData, CreateApiKeyRequest } from '@typings/api-keys';
import type { ApiResponse } from '@typings/client';
import type { HttpClient } from '@utils/http-client';

export class ApiKeysClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get current API key information
   * @returns Promise resolving to current API key data
   */
  public getCurrent = async (): Promise<ApiResponse<ApiKeyData>> => {
    return this.client.request<ApiKeyData>({
      'method': 'GET',
      'path': '/api/v1/api-keys/current',
    });
  };

  /**
   * Revoke current API key
   * @returns Promise resolving when the key is revoked
   */
  public deleteCurrent = async (): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': '/api/v1/api-keys/current',
    });
  };

  /**
   * Create a new API key
   * @param apiKey - The API key creation data
   * @returns Promise resolving to the created API key
   */
  public create = async (apiKey: CreateApiKeyRequest): Promise<ApiResponse<ApiKeyData>> => {
    return this.client.request<ApiKeyData>({
      'method': 'POST',
      'path': '/api/v1/api-keys',
      'body': apiKey,
    });
  };

  /**
   * Revoke an API key
   * @param apiKey - The API key to revoke
   * @returns Promise resolving when the key is revoked
   */
  public delete = async (apiKey: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/api-keys/${apiKey}`,
    });
  };

  /**
   * Create an API key for a user
   * @param idOrEmail - The user ID or email
   * @param apiKey - The API key creation data
   * @returns Promise resolving to the created API key
   */
  public createUserApiKey = async (
    idOrEmail: string,
    apiKey: CreateApiKeyRequest,
  ): Promise<ApiResponse<ApiKeyData>> => {
    return this.client.request<ApiKeyData>({
      'method': 'POST',
      'path': `/api/v1/users/${idOrEmail}/api-keys`,
      'body': apiKey,
    });
  };

  /**
   * Revoke a user's API key
   * @param idOrEmail - The user ID or email
   * @param apiKey - The API key to revoke
   * @returns Promise resolving when the key is revoked
   */
  public deleteUserApiKey = async (idOrEmail: string, apiKey: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/users/${idOrEmail}/api-keys/${apiKey}`,
    });
  };
}
