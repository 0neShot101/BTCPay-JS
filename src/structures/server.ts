import type { ApiResponse } from '@typings/client';
import type {
  ApplicationHealthData,
  ApplicationServerInfoData,
  FileData,
  GetServerEmailSettings,
  UpdateServerEmailSettings,
} from '@typings/server';
import type { HttpClient } from '@utils/http-client';

export class ServerClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get server information
   * @returns Promise resolving to server info
   */
  public getInfo = async (): Promise<ApiResponse<ApplicationServerInfoData>> => {
    return this.client.request<ApplicationServerInfoData>({
      'method': 'GET',
      'path': '/api/v1/server/info',
    });
  };

  /**
   * Get server health status
   * @returns Promise resolving to health data
   */
  public getHealth = async (): Promise<ApiResponse<ApplicationHealthData>> => {
    return this.client.request<ApplicationHealthData>({
      'method': 'GET',
      'path': '/api/v1/health',
    });
  };

  /**
   * Get server email settings
   * @returns Promise resolving to email settings
   */
  public getEmailSettings = async (): Promise<ApiResponse<GetServerEmailSettings>> => {
    return this.client.request<GetServerEmailSettings>({
      'method': 'GET',
      'path': '/api/v1/server/email',
    });
  };

  /**
   * Update server email settings
   * @param settings - The update data
   * @returns Promise resolving to updated email settings
   */
  public updateEmailSettings = async (
    settings: UpdateServerEmailSettings,
  ): Promise<ApiResponse<GetServerEmailSettings>> => {
    return this.client.request<GetServerEmailSettings>({
      'method': 'PUT',
      'path': '/api/v1/server/email',
      'body': settings,
    });
  };
}

export class FilesClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List uploaded files
   * @returns Promise resolving to list of files
   */
  public list = async (): Promise<ApiResponse<readonly FileData[]>> => {
    return this.client.request<readonly FileData[]>({
      'method': 'GET',
      'path': '/api/v1/files',
    });
  };

  /**
   * Get a specific file
   * @param fileId - The file ID
   * @returns Promise resolving to the file data
   */
  public get = async (fileId: string): Promise<ApiResponse<FileData>> => {
    return this.client.request<FileData>({
      'method': 'GET',
      'path': `/api/v1/files/${fileId}`,
    });
  };

  /**
   * Delete a file
   * @param fileId - The file ID
   * @returns Promise resolving when the file is deleted
   */
  public delete = async (fileId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/files/${fileId}`,
    });
  };
}
