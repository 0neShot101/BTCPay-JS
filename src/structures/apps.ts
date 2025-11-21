import type {
  AppBaseData,
  AppItemStats,
  AppSalesStats,
  CrowdfundAppData,
  CrowdfundAppRequest,
  PointOfSaleAppData,
  PointOfSaleAppRequest,
} from '@typings/apps';
import type { ApiResponse } from '@typings/client';
import type { FileData } from '@typings/server';
import type { HttpClient } from '@utils/http-client';

export class AppsClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List apps for a single store
   * @param storeId - The store ID to list apps for
   * @returns Promise resolving to an array of apps
   */
  public list = async (storeId: string): Promise<ApiResponse<AppBaseData[]>> => {
    return this.client.request<AppBaseData[]>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/apps`,
    });
  };

  /**
   * List all apps accessible by the current user (across stores)
   */
  public listAll = async (): Promise<ApiResponse<AppBaseData[]>> => {
    return this.client.request<AppBaseData[]>({
      'method': 'GET',
      'path': '/api/v1/apps',
    });
  };

  /**
   * Fetch base information for any app
   */
  public get = async (appId: string): Promise<ApiResponse<AppBaseData>> => {
    return this.client.request<AppBaseData>({
      'method': 'GET',
      'path': `/api/v1/apps/${appId}`,
    });
  };

  /**
   * Create a Point of Sale app
   */
  public createPointOfSaleApp = async (
    storeId: string,
    payload: PointOfSaleAppRequest & { readonly appName: string },
  ): Promise<ApiResponse<PointOfSaleAppData>> => {
    return this.client.request<PointOfSaleAppData>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/apps/pos`,
      'body': payload,
    });
  };

  /**
   * Update a Point of Sale app
   */
  public updatePointOfSaleApp = async (
    appId: string,
    payload: PointOfSaleAppRequest,
  ): Promise<ApiResponse<PointOfSaleAppData>> => {
    return this.client.request<PointOfSaleAppData>({
      'method': 'PUT',
      'path': `/api/v1/apps/pos/${appId}`,
      'body': payload,
    });
  };

  /**
   * Get full Point of Sale app details (template, items, etc.)
   */
  public getPointOfSaleApp = async (appId: string): Promise<ApiResponse<PointOfSaleAppData>> => {
    return this.client.request<PointOfSaleAppData>({
      'method': 'GET',
      'path': `/api/v1/apps/pos/${appId}`,
    });
  };

  /**
   * Create a Crowdfund app
   */
  public createCrowdfundApp = async (
    storeId: string,
    payload: CrowdfundAppRequest & { readonly appName: string },
  ): Promise<ApiResponse<CrowdfundAppData>> => {
    return this.client.request<CrowdfundAppData>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/apps/crowdfund`,
      'body': payload,
    });
  };

  /**
   * Get full Crowdfund app details
   */
  public getCrowdfundApp = async (appId: string): Promise<ApiResponse<CrowdfundAppData>> => {
    return this.client.request<CrowdfundAppData>({
      'method': 'GET',
      'path': `/api/v1/apps/crowdfund/${appId}`,
    });
  };

  /**
   * Delete an app (base endpoint)
   */
  public delete = async (appId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/apps/${appId}`,
    });
  };

  /**
   * Upload an item image for an app (provide FormData with a `file` field)
   */
  public uploadItemImage = async (appId: string, formData: FormData): Promise<ApiResponse<FileData>> => {
    return this.client.request<FileData>({
      'method': 'POST',
      'path': `/api/v1/apps/${appId}/image`,
      'body': formData,
    });
  };

  /**
   * Delete an uploaded item image
   */
  public deleteItemImage = async (appId: string, fileId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/apps/${appId}/image/${fileId}`,
    });
  };

  /**
   * Retrieve sales statistics for an app
   */
  public getSalesStats = async (
    appId: string,
    options?: { readonly numberOfDays?: number },
  ): Promise<ApiResponse<AppSalesStats>> => {
    return this.client.request<AppSalesStats>({
      'method': 'GET',
      'path': `/api/v1/apps/${appId}/sales`,
      'queryParams': options,
    });
  };

  /**
   * Retrieve top-selling items for an app
   */
  public getTopItems = async (
    appId: string,
    options?: { readonly count?: number; readonly offset?: number },
  ): Promise<ApiResponse<AppItemStats[]>> => {
    return this.client.request<AppItemStats[]>({
      'method': 'GET',
      'path': `/api/v1/apps/${appId}/top-items`,
      'queryParams': options,
    });
  };
}
