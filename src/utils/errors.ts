/**
 * Error classes for BTCPay Server API
 */

import type { ProblemDetails, ValidationProblemDetails } from '@typings/common.ts';

export class BTCPayError extends Error {
  public readonly statusCode?: number;
  public readonly details?: ProblemDetails;

  constructor(message: string, statusCode?: number, details?: ProblemDetails) {
    super(message);
    this.name = 'BTCPayError';
    if (statusCode !== undefined) this.statusCode = statusCode;
    if (details !== undefined) this.details = details;
    Object.setPrototypeOf(this, BTCPayError.prototype);
  }
}

export class BTCPayValidationError extends BTCPayError {
  public readonly validationErrors?: Record<string, string[]>;

  constructor(message: string, statusCode?: number, details?: ValidationProblemDetails) {
    super(message, statusCode, details);
    this.name = 'BTCPayValidationError';
    if (details?.errors !== undefined) this.validationErrors = details.errors;
    Object.setPrototypeOf(this, BTCPayValidationError.prototype);
  }
}

export class BTCPayNetworkError extends BTCPayError {
  public readonly originalError?: Error;

  constructor(message: string, originalError?: Error) {
    super(message);
    this.name = 'BTCPayNetworkError';
    if (originalError !== undefined) this.originalError = originalError;
    Object.setPrototypeOf(this, BTCPayNetworkError.prototype);
  }
}

export class BTCPayAuthenticationError extends BTCPayError {
  constructor(message: string, statusCode?: number, details?: ProblemDetails) {
    super(message, statusCode, details);
    this.name = 'BTCPayAuthenticationError';
    Object.setPrototypeOf(this, BTCPayAuthenticationError.prototype);
  }
}
