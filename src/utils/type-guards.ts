/**
 * Type guards for runtime type checking
 */

import type { ProblemDetails, ValidationProblemDetails } from '@typings/common.ts';

export const isProblemDetails = (value: unknown): value is ProblemDetails => {
  if (typeof value !== 'object') return false;
  if (value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    (typeof obj.type === 'string' || obj.type === undefined) &&
    (typeof obj.title === 'string' || obj.title === undefined) &&
    (typeof obj.status === 'number' || obj.status === undefined) &&
    (typeof obj.detail === 'string' || obj.detail === undefined) &&
    (typeof obj.instance === 'string' || obj.instance === undefined)
  );
};

export const isValidationProblemDetails = (value: unknown): value is ValidationProblemDetails => {
  if (isProblemDetails(value) === false) return false;

  const obj = value as Record<string, unknown>;

  if (obj.errors === undefined) return true;
  if (typeof obj.errors !== 'object') return false;
  if (obj.errors === null) return false;

  const errors = obj.errors as Record<string, unknown>;

  return Object.values(errors).every(val => Array.isArray(val) === true && val.every(item => typeof item === 'string'));
};

export const isRecord = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object') return false;
  if (value === null) return false;
  if (Array.isArray(value) === true) return false;
  return true;
};
