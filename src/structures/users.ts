/**
 * Users API client
 */

import type { ApiResponse } from '@typings/client';
import type { ApplicationUserData, CreateUserRequest, UpdateUserRequest } from '@typings/users';
import type { HttpClient } from '@utils/http-client';

export class UsersClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get current user information
   * @returns Promise resolving to current user data
   */
  public getCurrentUser = async (): Promise<ApiResponse<ApplicationUserData>> => {
    return this.client.request<ApplicationUserData>({
      'method': 'GET',
      'path': '/api/v1/users/me',
    });
  };

  /**
   * Update current user information
   * @param user - The update data
   * @returns Promise resolving to updated user data
   */
  public updateCurrentUser = async (user: UpdateUserRequest): Promise<ApiResponse<ApplicationUserData>> => {
    return this.client.request<ApplicationUserData>({
      'method': 'PUT',
      'path': '/api/v1/users/me',
      'body': user,
    });
  };

  /**
   * Delete current user
   * @returns Promise resolving when the user is deleted
   */
  public deleteCurrentUser = async (): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': '/api/v1/users/me',
    });
  };

  /**
   * Create a new user
   * @param user - The user creation data
   * @returns Promise resolving to the created user
   */
  public createUser = async (user: CreateUserRequest): Promise<ApiResponse<ApplicationUserData>> => {
    return this.client.request<ApplicationUserData>({
      'method': 'POST',
      'path': '/api/v1/users',
      'body': user,
    });
  };

  /**
   * Get a specific user by ID or email
   * @param idOrEmail - The user ID or email
   * @returns Promise resolving to the user data
   */
  public getUser = async (idOrEmail: string): Promise<ApiResponse<ApplicationUserData>> => {
    return this.client.request<ApplicationUserData>({
      'method': 'GET',
      'path': `/api/v1/users/${idOrEmail}`,
    });
  };

  /**
   * Delete a specific user by ID or email
   * @param idOrEmail - The user ID or email
   * @returns Promise resolving when the user is deleted
   */
  public deleteUser = async (idOrEmail: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/users/${idOrEmail}`,
    });
  };
}
