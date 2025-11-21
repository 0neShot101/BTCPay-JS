/**
 * Lightning Network API client
 */

import type { ApiResponse } from '@typings/client';
import type { StoreId } from '@typings/common';
import type {
  ConnectToNodeRequest,
  CreateLightningInvoiceRequest,
  LightningChannelData,
  LightningInvoiceData,
  LightningNodeBalanceData,
  LightningNodeInformationData,
  LightningPaymentData,
  OpenLightningChannelRequest,
  PayLightningInvoiceRequest,
} from '@typings/lightning';
import type { HttpClient } from '@utils/http-client';

export class LightningClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get lightning node information
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code (e.g., "BTC")
   * @returns Promise resolving to node information
   */
  public getStoreNodeInfo = async (
    storeId: StoreId,
    cryptoCode: string,
  ): Promise<ApiResponse<LightningNodeInformationData>> => {
    return this.client.request<LightningNodeInformationData>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/info`,
    });
  };

  /**
   * Get lightning node balance
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code
   * @returns Promise resolving to node balance
   */
  public getStoreNodeBalance = async (
    storeId: StoreId,
    cryptoCode: string,
  ): Promise<ApiResponse<LightningNodeBalanceData>> => {
    return this.client.request<LightningNodeBalanceData>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/balance`,
    });
  };

  /**
   * Create lightning invoice
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code
   * @param request - The invoice creation request
   * @returns Promise resolving to the created invoice
   */
  public createInvoice = async (
    storeId: StoreId,
    cryptoCode: string,
    request: CreateLightningInvoiceRequest,
  ): Promise<ApiResponse<LightningInvoiceData>> => {
    return this.client.request<LightningInvoiceData>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/invoices`,
      'body': request,
    });
  };

  /**
   * Get lightning invoice
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code
   * @param invoiceId - The invoice ID
   * @returns Promise resolving to the invoice data
   */
  public getInvoice = async (
    storeId: StoreId,
    cryptoCode: string,
    invoiceId: string,
  ): Promise<ApiResponse<LightningInvoiceData>> => {
    return this.client.request<LightningInvoiceData>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/invoices/${invoiceId}`,
    });
  };

  /**
   * List lightning invoices
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code
   * @param options - Filtering options
   * @returns Promise resolving to list of invoices
   */
  public getInvoices = async (
    storeId: StoreId,
    cryptoCode: string,
    options?: {
      readonly pendingOnly?: boolean;
      readonly offsetIndex?: number;
    },
  ): Promise<ApiResponse<readonly LightningInvoiceData[]>> => {
    return this.client.request<readonly LightningInvoiceData[]>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/invoices`,
      'queryParams': options as Record<string, string | number | boolean | undefined>,
    });
  };

  /**
   * Pay lightning invoice
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code
   * @param request - The payment request
   * @returns Promise resolving to payment data
   */
  public payInvoice = async (
    storeId: StoreId,
    cryptoCode: string,
    request: PayLightningInvoiceRequest,
  ): Promise<ApiResponse<LightningPaymentData>> => {
    return this.client.request<LightningPaymentData>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/invoices/pay`,
      'body': request,
    });
  };

  /**
   * Get lightning payment
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code
   * @param paymentHash - The payment hash
   * @returns Promise resolving to payment data
   */
  public getPayment = async (
    storeId: StoreId,
    cryptoCode: string,
    paymentHash: string,
  ): Promise<ApiResponse<LightningPaymentData>> => {
    return this.client.request<LightningPaymentData>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/payments/${paymentHash}`,
    });
  };

  /**
   * List lightning payments
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code
   * @param options - Filtering options
   * @returns Promise resolving to list of payments
   */
  public getPayments = async (
    storeId: StoreId,
    cryptoCode: string,
    options?: {
      readonly includePending?: boolean;
      readonly offsetIndex?: number;
    },
  ): Promise<ApiResponse<readonly LightningPaymentData[]>> => {
    return this.client.request<readonly LightningPaymentData[]>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/payments`,
      'queryParams': options as Record<string, string | number | boolean | undefined>,
    });
  };

  /**
   * List lightning channels
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code
   * @returns Promise resolving to list of channels
   */
  public getChannels = async (
    storeId: StoreId,
    cryptoCode: string,
  ): Promise<ApiResponse<readonly LightningChannelData[]>> => {
    return this.client.request<readonly LightningChannelData[]>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/channels`,
    });
  };

  /**
   * Open lightning channel
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code
   * @param request - The open channel request
   * @returns Promise resolving to void
   */
  public openChannel = async (
    storeId: StoreId,
    cryptoCode: string,
    request: OpenLightningChannelRequest,
  ): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/channels`,
      'body': request,
    });
  };

  /**
   * Connect to lightning node
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code
   * @param request - The connect request
   * @returns Promise resolving to void
   */
  public connectToNode = async (
    storeId: StoreId,
    cryptoCode: string,
    request: ConnectToNodeRequest,
  ): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/connect`,
      'body': request,
    });
  };

  /**
   * Get deposit address
   * @param storeId - The store ID
   * @param cryptoCode - The crypto code
   * @returns Promise resolving to deposit address string
   */
  public getDepositAddress = async (storeId: StoreId, cryptoCode: string): Promise<ApiResponse<string>> => {
    return this.client.request<string>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/lightning/${cryptoCode}/address`,
    });
  };
}
