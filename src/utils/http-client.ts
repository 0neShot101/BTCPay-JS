/**
 * HTTP client for BTCPay Server API
 */

import { BTCPayAuthenticationError, BTCPayError, BTCPayNetworkError, BTCPayValidationError } from './errors';
import { isProblemDetails, isValidationProblemDetails } from './type-guards';

import type { ApiResponse, BTCPayClientConfig, RequestOptions } from '@typings/client';

export class HttpClient {
  private readonly config: BTCPayClientConfig;

  constructor(config: BTCPayClientConfig) {
    this.config = config;
  }

  private buildUrl = (path: string, queryParams?: RequestOptions['queryParams']): string => {
    const url = new URL(path, this.config.baseUrl);

    if (queryParams === undefined) return url.toString();

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item !== null && item !== undefined) url.searchParams.append(key, String(item));
        });
        return;
      }

      url.searchParams.append(key, String(value));
    });

    return url.toString();
  };

  private buildHeaders = (
    customHeaders?: Record<string, string>,
    isFormData: boolean = false,
  ): Record<string, string> => {
    const defaultHeaders: Record<string, string> = {
      'Authorization': `token ${this.config.apiKey}`,
    };

    if (isFormData === false) defaultHeaders['Content-Type'] = 'application/json';

    return {
      ...defaultHeaders,
      ...customHeaders,
    };
  };

  private handleError = async (response: Response): Promise<never> => {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json') === true;

    let errorData: unknown;

    if (isJson === true) {
      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }
    }

    const errorMessage = response.statusText.length > 0 ? response.statusText : 'Unknown error';

    if (response.status === 401) {
      throw new BTCPayAuthenticationError(
        errorMessage,
        response.status,
        isProblemDetails(errorData) ? errorData : undefined,
      );
    }

    if (response.status === 422 || response.status === 400) {
      if (isValidationProblemDetails(errorData)) {
        throw new BTCPayValidationError(errorData.detail || errorMessage, response.status, errorData);
      }
    }

    if (isProblemDetails(errorData)) {
      throw new BTCPayError(errorData.detail || errorMessage, response.status, errorData);
    }

    throw new BTCPayError(errorMessage, response.status);
  };

  public request = async <T>(options: RequestOptions): Promise<ApiResponse<T>> => {
    const url = this.buildUrl(options.path, options.queryParams);
    const bodyIsFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
    const headers = this.buildHeaders(options.headers, bodyIsFormData);

    const fetchOptions: globalThis.RequestInit = {
      'method': options.method,
      headers,
      'signal': this.config.timeout ? AbortSignal.timeout(this.config.timeout) : null,
    };

    if (options.body !== undefined && options.method !== 'GET') {
      fetchOptions.body = bodyIsFormData ? (options.body as FormData) : JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, fetchOptions);

      if (response.ok === false) await this.handleError(response);

      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json') === true;

      let data: T;

      if (response.status === 204 || isJson === false) {
        data = null as T;
      } else {
        const jsonData = await response.json();
        data = jsonData as T;
      }

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      return {
        data,
        'status': response.status,
        'headers': responseHeaders,
      };
    } catch (error) {
      if (error instanceof BTCPayError) throw error;

      if (error instanceof Error) {
        throw new BTCPayNetworkError(`Network error: ${error.message}`, error);
      }

      throw new BTCPayNetworkError('Unknown network error');
    }
  };
}
