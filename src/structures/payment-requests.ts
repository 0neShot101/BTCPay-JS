/**
 * Payment Requests API client
 */

import type { ApiResponse } from '@typings/client';
import type { StoreId } from '@typings/common';
import type { InvoiceData } from '@typings/invoices';
import type { PaymentRequestBaseData, PaymentRequestData, PaymentRequestDataList } from '@typings/payment-requests';
import type { HttpClient } from '@utils/http-client';

export class PaymentRequestsClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List payment requests
   * @param storeId - The store ID
   * @returns Promise resolving to list of payment requests
   */
  public list = async (storeId: StoreId): Promise<ApiResponse<PaymentRequestDataList>> => {
    return this.client.request<PaymentRequestDataList>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/payment-requests`,
    });
  };

  /**
   * Create a new payment request
   * @param storeId - The store ID
   * @param paymentRequest - The payment request creation data
   * @returns Promise resolving to the created payment request
   */
  public create = async (
    storeId: StoreId,
    paymentRequest: PaymentRequestBaseData,
  ): Promise<ApiResponse<PaymentRequestData>> => {
    return this.client.request<PaymentRequestData>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/payment-requests`,
      'body': paymentRequest,
    });
  };

  /**
   * Get a specific payment request
   * @param storeId - The store ID
   * @param paymentRequestId - The payment request ID
   * @returns Promise resolving to the payment request data
   */
  public get = async (storeId: StoreId, paymentRequestId: string): Promise<ApiResponse<PaymentRequestData>> => {
    return this.client.request<PaymentRequestData>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/payment-requests/${paymentRequestId}`,
    });
  };

  /**
   * Update a payment request
   * @param storeId - The store ID
   * @param paymentRequestId - The payment request ID
   * @param paymentRequest - The update data
   * @returns Promise resolving to the updated payment request
   */
  public update = async (
    storeId: StoreId,
    paymentRequestId: string,
    paymentRequest: PaymentRequestBaseData,
  ): Promise<ApiResponse<PaymentRequestData>> => {
    return this.client.request<PaymentRequestData>({
      'method': 'PUT',
      'path': `/api/v1/stores/${storeId}/payment-requests/${paymentRequestId}`,
      'body': paymentRequest,
    });
  };

  /**
   * Archive a payment request
   * @param storeId - The store ID
   * @param paymentRequestId - The payment request ID
   * @returns Promise resolving when the payment request is archived
   */
  public archive = async (storeId: StoreId, paymentRequestId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/stores/${storeId}/payment-requests/${paymentRequestId}`,
    });
  };

  /**
   * Pay a payment request
   * @param storeId - The store ID
   * @param paymentRequestId - The payment request ID
   * @param options - Payment options
   * @returns Promise resolving to the created invoice
   */
  public pay = async (
    storeId: StoreId,
    paymentRequestId: string,
    options?: {
      readonly amount?: string;
      readonly allowPendingInvoiceReuse?: boolean;
    },
  ): Promise<ApiResponse<InvoiceData>> => {
    return this.client.request<InvoiceData>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/payment-requests/${paymentRequestId}/pay`,
      'body': options,
    });
  };
}
