import type { ApiResponse } from '@typings/client';
import type {
  AddOnChainWalletObjectLinkRequest,
  CreateOnChainTransactionRequest,
  GenerateOnChainWalletRequest,
  GenericPaymentMethodData,
  HistogramData,
  OnChainPaymentMethodPreviewResultData,
  OnChainWalletAddressData,
  OnChainWalletFeeRateData,
  OnChainWalletObjectData,
  OnChainWalletOverviewData,
  OnChainWalletTransactionData,
  OnChainWalletUTXOData,
  PatchOnChainTransactionRequest,
  UpdatePaymentMethodConfig,
} from '@typings/payment-methods';
import type { HttpClient } from '@utils/http-client';

export class PaymentMethodsClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get store payment methods
   * @param storeId - The store ID
   * @param options - Optional filters for includeConfig/onlyEnabled
   * @returns Promise resolving to list of payment methods
   */
  public getPaymentMethods = async (
    storeId: string,
    options?: {
      readonly includeConfig?: boolean;
      readonly onlyEnabled?: boolean;
    },
  ): Promise<ApiResponse<GenericPaymentMethodData[]>> => {
    const queryParams = options
      ? {
          'includeConfig': options.includeConfig,
          'onlyEnabled': options.onlyEnabled,
        }
      : undefined;

    return this.client.request<GenericPaymentMethodData[]>({
      'path': `/api/v1/stores/${storeId}/payment-methods`,
      'method': 'GET',
      'queryParams': queryParams,
    });
  };

  /**
   * Get a specific store payment method
   * @param storeId - The store ID
   * @param paymentMethodId - The payment method ID (e.g., "BTC-CHAIN")
   * @param includeConfig - Whether to include config fields (requires modify permission)
   * @returns Promise resolving to the payment method definition
   */
  public getPaymentMethod = async (
    storeId: string,
    paymentMethodId: string,
    includeConfig?: boolean,
  ): Promise<ApiResponse<GenericPaymentMethodData>> => {
    return this.client.request<GenericPaymentMethodData>({
      'path': `/api/v1/stores/${storeId}/payment-methods/${paymentMethodId}`,
      'method': 'GET',
      'queryParams': includeConfig !== undefined ? { 'includeConfig': includeConfig } : undefined,
    });
  };

  /**
   * Update store payment method
   * @param storeId - The store ID
   * @param paymentMethodId - The payment method ID (e.g., "BTC-CHAIN")
   * @param data - The update data
   * @returns Promise resolving to the updated payment method
   */
  public updatePaymentMethod = async (
    storeId: string,
    paymentMethodId: string,
    data: UpdatePaymentMethodConfig,
  ): Promise<ApiResponse<GenericPaymentMethodData>> => {
    return this.client.request<GenericPaymentMethodData>({
      'path': `/api/v1/stores/${storeId}/payment-methods/${paymentMethodId}`,
      'method': 'PUT',
      'body': data,
    });
  };

  /**
   * Delete a store payment method
   * @param storeId - The store ID
   * @param paymentMethodId - The payment method ID (e.g., "BTC-CHAIN")
   * @returns Promise resolving when deletion succeeds
   */
  public deletePaymentMethod = async (storeId: string, paymentMethodId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'path': `/api/v1/stores/${storeId}/payment-methods/${paymentMethodId}`,
      'method': 'DELETE',
    });
  };
}

export class WalletsClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  private walletPath = (storeId: string, paymentMethodId: string, suffix: string = ''): string => {
    const normalizedSuffix = suffix.length > 0 ? (suffix.startsWith('/') ? suffix : `/${suffix}`) : '';
    return `/api/v1/stores/${storeId}/payment-methods/${paymentMethodId}/wallet${normalizedSuffix}`;
  };

  /**
   * Get on-chain wallet overview
   * @param storeId - The store ID
   * @param paymentMethodId - The payment method ID (e.g., "BTC-CHAIN")
   * @returns Promise resolving to wallet overview
   */
  public getWalletOverview = async (
    storeId: string,
    paymentMethodId: string,
  ): Promise<ApiResponse<OnChainWalletOverviewData>> => {
    return this.client.request<OnChainWalletOverviewData>({
      'path': this.walletPath(storeId, paymentMethodId),
      'method': 'GET',
    });
  };

  /**
   * Get historic wallet balance histogram
   */
  public getWalletHistogram = async (storeId: string, paymentMethodId: string): Promise<ApiResponse<HistogramData>> => {
    return this.client.request<HistogramData>({
      'path': this.walletPath(storeId, paymentMethodId, '/histogram'),
      'method': 'GET',
    });
  };

  /**
   * Fetch recommended feerate for the wallet
   */
  public getWalletFeeRate = async (
    storeId: string,
    paymentMethodId: string,
    blockTarget?: number,
  ): Promise<ApiResponse<OnChainWalletFeeRateData>> => {
    return this.client.request<OnChainWalletFeeRateData>({
      'path': this.walletPath(storeId, paymentMethodId, '/feerate'),
      'method': 'GET',
      'queryParams': blockTarget !== undefined ? { 'blockTarget': blockTarget } : undefined,
    });
  };

  /**
   * Get on-chain wallet receive address
   * @param storeId - The store ID
   * @param paymentMethodId - The payment method ID
   * @param forceGenerate - Force generation of new address
   * @returns Promise resolving to wallet address data
   */
  public getWalletAddress = async (
    storeId: string,
    paymentMethodId: string,
    forceGenerate: boolean = false,
  ): Promise<ApiResponse<OnChainWalletAddressData>> => {
    return this.client.request<OnChainWalletAddressData>({
      'path': this.walletPath(storeId, paymentMethodId, '/address'),
      'method': 'GET',
      'queryParams': { 'forceGenerate': forceGenerate },
    });
  };

  /**
   * Unreserve on-chain wallet address
   * @param storeId - The store ID
   * @param paymentMethodId - The payment method ID
   * @returns Promise resolving to void
   */
  public unreserveWalletAddress = async (storeId: string, paymentMethodId: string): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'path': this.walletPath(storeId, paymentMethodId, '/address'),
      'method': 'DELETE',
    });
  };

  /**
   * Get on-chain wallet transactions
   * @param storeId - The store ID
   * @param paymentMethodId - The payment method ID
   * @param options - Filter options
   * @returns Promise resolving to list of transactions
   */
  public getWalletTransactions = async (
    storeId: string,
    paymentMethodId: string,
    options?: {
      readonly statusFilter?: readonly ('Confirmed' | 'Unconfirmed' | 'Replaced')[];
      readonly labelFilter?: string;
      readonly skip?: number;
      readonly limit?: number;
    },
  ): Promise<ApiResponse<OnChainWalletTransactionData[]>> => {
    const queryParams = options
      ? {
          'statusFilter': options.statusFilter,
          'labelFilter': options.labelFilter,
          'skip': options.skip,
          'limit': options.limit,
        }
      : undefined;

    return this.client.request<OnChainWalletTransactionData[]>({
      'path': this.walletPath(storeId, paymentMethodId, '/transactions'),
      'method': 'GET',
      'queryParams': queryParams,
    });
  };

  /**
   * Create on-chain transaction
   * @param storeId - The store ID
   * @param paymentMethodId - The payment method ID
   * @param data - The transaction creation data
   * @returns Promise resolving to the created transaction
   */
  public createWalletTransaction = async (
    storeId: string,
    paymentMethodId: string,
    data: CreateOnChainTransactionRequest,
  ): Promise<ApiResponse<OnChainWalletTransactionData | string>> => {
    return this.client.request<OnChainWalletTransactionData | string>({
      'path': this.walletPath(storeId, paymentMethodId, '/transactions'),
      'method': 'POST',
      'body': data,
    });
  };

  /**
   * Get specific on-chain transaction
   * @param storeId - The store ID
   * @param paymentMethodId - The payment method ID
   * @param transactionId - The transaction ID
   * @returns Promise resolving to the transaction
   */
  public getWalletTransaction = async (
    storeId: string,
    paymentMethodId: string,
    transactionId: string,
  ): Promise<ApiResponse<OnChainWalletTransactionData>> => {
    return this.client.request<OnChainWalletTransactionData>({
      'path': this.walletPath(storeId, paymentMethodId, `/transactions/${transactionId}`),
      'method': 'GET',
    });
  };

  /**
   * Patch metadata for a specific on-chain transaction
   */
  public patchWalletTransaction = async (
    storeId: string,
    paymentMethodId: string,
    transactionId: string,
    data: PatchOnChainTransactionRequest,
    force?: boolean,
  ): Promise<ApiResponse<OnChainWalletTransactionData>> => {
    return this.client.request<OnChainWalletTransactionData>({
      'path': this.walletPath(storeId, paymentMethodId, `/transactions/${transactionId}`),
      'method': 'PATCH',
      'queryParams': force !== undefined ? { 'force': force } : undefined,
      'body': data,
    });
  };

  /**
   * Fetch wallet UTXOs
   */
  public getWalletUTXOs = async (
    storeId: string,
    paymentMethodId: string,
  ): Promise<ApiResponse<OnChainWalletUTXOData[]>> => {
    return this.client.request<OnChainWalletUTXOData[]>({
      'path': this.walletPath(storeId, paymentMethodId, '/utxos'),
      'method': 'GET',
    });
  };

  /**
   * Generate a new wallet for the payment method
   */
  public generateWallet = async (
    storeId: string,
    paymentMethodId: string,
    data: GenerateOnChainWalletRequest,
  ): Promise<ApiResponse<GenericPaymentMethodData & { readonly mnemonic?: string }>> => {
    return this.client.request<GenericPaymentMethodData & { readonly mnemonic?: string }>({
      'path': this.walletPath(storeId, paymentMethodId, '/generate'),
      'method': 'POST',
      'body': data,
    });
  };

  /**
   * Preview existing wallet addresses
   */
  public getWalletPreview = async (
    storeId: string,
    paymentMethodId: string,
    options?: { readonly offset?: number; readonly count?: number },
  ): Promise<ApiResponse<OnChainPaymentMethodPreviewResultData>> => {
    const queryParams = options
      ? {
          'offset': options.offset,
          'count': options.count,
        }
      : undefined;

    return this.client.request<OnChainPaymentMethodPreviewResultData>({
      'path': this.walletPath(storeId, paymentMethodId, '/preview'),
      'method': 'GET',
      queryParams,
    });
  };

  /**
   * Preview proposed wallet based on derivation scheme
   */
  public previewProposedWallet = async (
    storeId: string,
    paymentMethodId: string,
    payload: { readonly derivationScheme: string },
    options?: { readonly offset?: number; readonly count?: number },
  ): Promise<ApiResponse<OnChainPaymentMethodPreviewResultData>> => {
    const queryParams = options
      ? {
          'offset': options.offset,
          'count': options.count,
        }
      : undefined;

    return this.client.request<OnChainPaymentMethodPreviewResultData>({
      'path': this.walletPath(storeId, paymentMethodId, '/preview'),
      'method': 'POST',
      queryParams,
      'body': payload,
    });
  };

  /**
   * Fetch wallet graph objects
   */
  public getWalletObjects = async (
    storeId: string,
    paymentMethodId: string,
    options?: {
      readonly type?: string;
      readonly ids?: readonly string[];
      readonly includeNeighbourData?: boolean;
    },
  ): Promise<ApiResponse<OnChainWalletObjectData[]>> => {
    const queryParams = options
      ? {
          'type': options.type,
          'ids': options.ids,
          'includeNeighbourData': options.includeNeighbourData,
        }
      : undefined;

    return this.client.request<OnChainWalletObjectData[]>({
      'path': this.walletPath(storeId, paymentMethodId, '/objects'),
      'method': 'GET',
      queryParams,
    });
  };

  /**
   * Add or update a wallet graph object
   */
  public addOrUpdateWalletObject = async (
    storeId: string,
    paymentMethodId: string,
    data: OnChainWalletObjectData,
  ): Promise<ApiResponse<OnChainWalletObjectData>> => {
    return this.client.request<OnChainWalletObjectData>({
      'path': this.walletPath(storeId, paymentMethodId, '/objects'),
      'method': 'POST',
      'body': data,
    });
  };

  /**
   * Get a specific wallet object
   */
  public getWalletObject = async (
    storeId: string,
    paymentMethodId: string,
    objectType: string,
    objectId: string,
    includeNeighbourData?: boolean,
  ): Promise<ApiResponse<OnChainWalletObjectData>> => {
    return this.client.request<OnChainWalletObjectData>({
      'path': this.walletPath(storeId, paymentMethodId, `/objects/${objectType}/${objectId}`),
      'method': 'GET',
      'queryParams': includeNeighbourData !== undefined ? { 'includeNeighbourData': includeNeighbourData } : undefined,
    });
  };

  /**
   * Remove a wallet object
   */
  public removeWalletObject = async (
    storeId: string,
    paymentMethodId: string,
    objectType: string,
    objectId: string,
  ): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'path': this.walletPath(storeId, paymentMethodId, `/objects/${objectType}/${objectId}`),
      'method': 'DELETE',
    });
  };

  /**
   * Add or update a link between wallet objects
   */
  public addOrUpdateWalletObjectLink = async (
    storeId: string,
    paymentMethodId: string,
    objectType: string,
    objectId: string,
    data: AddOnChainWalletObjectLinkRequest,
  ): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'path': this.walletPath(storeId, paymentMethodId, `/objects/${objectType}/${objectId}/links`),
      'method': 'POST',
      'body': data,
    });
  };

  /**
   * Remove a link between wallet objects
   */
  public removeWalletObjectLink = async (
    storeId: string,
    paymentMethodId: string,
    objectType: string,
    objectId: string,
    linkType: string,
    linkId: string,
  ): Promise<ApiResponse<void>> => {
    return this.client.request<void>({
      'path': this.walletPath(
        storeId,
        paymentMethodId,
        `/objects/${objectType}/${objectId}/links/${linkType}/${linkId}`,
      ),
      'method': 'DELETE',
    });
  };
}
