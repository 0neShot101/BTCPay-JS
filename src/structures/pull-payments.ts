import type { ApiResponse } from '@typings/client';
import type { StoreId } from '@typings/common';
import type {
  ApprovePayoutRequest,
  CreatePayoutRequest,
  CreatePayoutThroughStoreRequest,
  CreatePullPaymentRequest,
  PayoutData,
  PayoutDataList,
  PullPaymentData,
  PullPaymentDataList,
} from '@typings/pull-payments';
import type { HttpClient } from '@utils/http-client';

export class PullPaymentsClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List pull payments
   * @param storeId - The store ID
   * @param includeArchived - Whether to include archived pull payments
   * @returns Promise resolving to list of pull payments
   */
  public list = async (storeId: StoreId, includeArchived?: boolean): Promise<ApiResponse<PullPaymentDataList>> => {
    return this.client.request<PullPaymentDataList>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/pull-payments`,
      'queryParams': includeArchived !== undefined ? { includeArchived } : undefined,
    });
  };

  /**
   * Create a new pull payment
   * @param storeId - The store ID
   * @param pullPayment - The pull payment creation data
   * @returns Promise resolving to the created pull payment
   */
  public create = async (
    storeId: StoreId,
    pullPayment: CreatePullPaymentRequest,
  ): Promise<ApiResponse<PullPaymentData>> => {
    return this.client.request<PullPaymentData>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/pull-payments`,
      'body': pullPayment,
    });
  };

  /**
   * Get a specific pull payment
   * @param pullPaymentId - The pull payment ID
   * @returns Promise resolving to the pull payment data
   */
  public get = async (pullPaymentId: string): Promise<ApiResponse<PullPaymentData>> => {
    return this.client.request<PullPaymentData>({
      'method': 'GET',
      'path': `/api/v1/pull-payments/${pullPaymentId}`,
    });
  };

  /**
   * Archive a pull payment
   * @param storeId - The store ID
   * @param pullPaymentId - The pull payment ID
   * @returns Promise resolving when the pull payment is archived
   */
  public archive = async (storeId: StoreId, pullPaymentId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/stores/${storeId}/pull-payments/${pullPaymentId}`,
    });
  };

  /**
   * Get payouts for a pull payment
   * @param pullPaymentId - The pull payment ID
   * @param includeCancelled - Whether to include cancelled payouts
   * @returns Promise resolving to list of payouts
   */
  public getPayouts = async (
    pullPaymentId: string,
    includeCancelled?: boolean,
  ): Promise<ApiResponse<PayoutDataList>> => {
    return this.client.request<PayoutDataList>({
      'method': 'GET',
      'path': `/api/v1/pull-payments/${pullPaymentId}/payouts`,
      'queryParams': includeCancelled !== undefined ? { includeCancelled } : undefined,
    });
  };

  /**
   * Create a payout for a pull payment
   * @param pullPaymentId - The pull payment ID
   * @param payout - The payout creation data
   * @returns Promise resolving to the created payout
   */
  public createPayout = async (
    pullPaymentId: string,
    payout: CreatePayoutRequest,
  ): Promise<ApiResponse<PayoutData>> => {
    return this.client.request<PayoutData>({
      'method': 'POST',
      'path': `/api/v1/pull-payments/${pullPaymentId}/payouts`,
      'body': payout,
    });
  };

  /**
   * Get a specific payout
   * @param pullPaymentId - The pull payment ID
   * @param payoutId - The payout ID
   * @returns Promise resolving to the payout data
   */
  public getPayout = async (pullPaymentId: string, payoutId: string): Promise<ApiResponse<PayoutData>> => {
    return this.client.request<PayoutData>({
      'method': 'GET',
      'path': `/api/v1/pull-payments/${pullPaymentId}/payouts/${payoutId}`,
    });
  };
}

export class PayoutsClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List payouts for a store
   * @param storeId - The store ID
   * @param includeCancelled - Whether to include cancelled payouts
   * @returns Promise resolving to list of payouts
   */
  public listStorePayouts = async (
    storeId: StoreId,
    includeCancelled?: boolean,
  ): Promise<ApiResponse<PayoutDataList>> => {
    return this.client.request<PayoutDataList>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/payouts`,
      'queryParams': includeCancelled !== undefined ? { includeCancelled } : undefined,
    });
  };

  /**
   * Create a payout through store
   * @param storeId - The store ID
   * @param payout - The payout creation data
   * @returns Promise resolving to the created payout
   */
  public createStorePayout = async (
    storeId: StoreId,
    payout: CreatePayoutThroughStoreRequest,
  ): Promise<ApiResponse<PayoutData>> => {
    return this.client.request<PayoutData>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/payouts`,
      'body': payout,
    });
  };

  /**
   * Get a specific payout for a store
   * @param storeId - The store ID
   * @param payoutId - The payout ID
   * @returns Promise resolving to the payout data
   */
  public getStorePayout = async (storeId: StoreId, payoutId: string): Promise<ApiResponse<PayoutData>> => {
    return this.client.request<PayoutData>({
      'method': 'GET',
      'path': `/api/v1/stores/${storeId}/payouts/${payoutId}`,
    });
  };

  /**
   * Approve a payout
   * @param storeId - The store ID
   * @param payoutId - The payout ID
   * @param request - The approval request
   * @returns Promise resolving to the updated payout
   */
  public approvePayout = async (
    storeId: StoreId,
    payoutId: string,
    request: ApprovePayoutRequest,
  ): Promise<ApiResponse<PayoutData>> => {
    return this.client.request<PayoutData>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/payouts/${payoutId}`,
      'body': request,
    });
  };

  /**
   * Cancel a payout
   * @param storeId - The store ID
   * @param payoutId - The payout ID
   * @returns Promise resolving when the payout is cancelled
   */
  public cancelPayout = async (storeId: StoreId, payoutId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'DELETE',
      'path': `/api/v1/stores/${storeId}/payouts/${payoutId}`,
    });
  };

  /**
   * Mark payout as paid
   * @param storeId - The store ID
   * @param payoutId - The payout ID
   * @returns Promise resolving when the payout is marked as paid
   */
  public markPayoutPaid = async (storeId: StoreId, payoutId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'method': 'POST',
      'path': `/api/v1/stores/${storeId}/payouts/${payoutId}/mark-paid`,
    });
  };
}
