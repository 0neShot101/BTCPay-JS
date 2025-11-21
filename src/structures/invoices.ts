/**
 * Invoice management API client
 */

import type { ApiResponse } from '@typings/client';
import type {
  CreateInvoiceRequest,
  InvoiceData,
  InvoiceDataList,
  InvoiceStatus,
  UpdateInvoiceRequest,
} from '@typings/invoices';
import type { HttpClient } from '@utils/http-client';

export interface GetInvoicesOptions {
  readonly status?: readonly InvoiceStatus[];
  readonly orderId?: readonly string[];
  readonly textSearch?: string;
  readonly startDate?: number;
  readonly endDate?: number;
  readonly skip?: number;
  readonly take?: number;
}

export class InvoicesClient {
  private readonly client: HttpClient;
  private readonly storeId: string;

  constructor(client: HttpClient, storeId: string) {
    this.client = client;
    this.storeId = storeId;
  }

  /**
   * Get invoices for a store
   * @param options - Filtering options for listing invoices
   * @returns Promise resolving to the list of invoices
   */
  public getInvoices = async (options?: GetInvoicesOptions): Promise<ApiResponse<InvoiceDataList>> => {
    if (options === undefined) {
      return this.client.request<InvoiceDataList>({
        'method': 'GET',
        'path': `/api/v1/stores/${this.storeId}/invoices`,
      });
    }

    return this.client.request<InvoiceDataList>({
      'method': 'GET',
      'path': `/api/v1/stores/${this.storeId}/invoices`,
      'queryParams': options as Record<
        string,
        string | number | boolean | readonly (string | number | boolean)[] | null | undefined
      >,
    });
  };

  /**
   * Get a specific invoice
   * @param invoiceId - The ID of the invoice to retrieve
   * @returns Promise resolving to the invoice data
   */
  public getInvoice = async (invoiceId: string): Promise<ApiResponse<InvoiceData>> => {
    return this.client.request<InvoiceData>({
      'method': 'GET',
      'path': `/api/v1/stores/${this.storeId}/invoices/${invoiceId}`,
    });
  };

  /**
   * Create a new invoice
   * @param data - The invoice creation data
   * @returns Promise resolving to the created invoice
   */
  public createInvoice = async (data: CreateInvoiceRequest): Promise<ApiResponse<InvoiceData>> => {
    return this.client.request<InvoiceData>({
      'method': 'POST',
      'path': `/api/v1/stores/${this.storeId}/invoices`,
      'body': data,
    });
  };

  /**
   * Update invoice metadata
   * @param invoiceId - The ID of the invoice to update
   * @param data - The update data
   * @returns Promise resolving to the updated invoice
   */
  public updateInvoice = async (invoiceId: string, data: UpdateInvoiceRequest): Promise<ApiResponse<InvoiceData>> => {
    return this.client.request<InvoiceData>({
      'method': 'PUT',
      'path': `/api/v1/stores/${this.storeId}/invoices/${invoiceId}`,
      'body': data,
    });
  };

  /**
   * Archive an invoice
   * @param invoiceId - The ID of the invoice to archive
   * @returns Promise resolving when the invoice is archived
   */
  public archiveInvoice = async (invoiceId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/stores/${this.storeId}/invoices/${invoiceId}`,
    });
  };

  /**
   * Mark invoice as invalid
   * @param invoiceId - The ID of the invoice to mark as invalid
   * @returns Promise resolving to the updated invoice
   */
  public markInvoiceInvalid = async (invoiceId: string): Promise<ApiResponse<InvoiceData>> => {
    return this.client.request<InvoiceData>({
      'method': 'POST',
      'path': `/api/v1/stores/${this.storeId}/invoices/${invoiceId}/status`,
      'body': { 'status': 'Invalid' },
    });
  };

  /**
   * Mark invoice as settled
   * @param invoiceId - The ID of the invoice to mark as settled
   * @returns Promise resolving to the updated invoice
   */
  public markInvoiceSettled = async (invoiceId: string): Promise<ApiResponse<InvoiceData>> => {
    return this.client.request<InvoiceData>({
      'method': 'POST',
      'path': `/api/v1/stores/${this.storeId}/invoices/${invoiceId}/status`,
      'body': { 'status': 'Settled' },
    });
  };
}
