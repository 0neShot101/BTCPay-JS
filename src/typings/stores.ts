/**
 * Store-related types for BTCPay Server API
 */

import type { StoreId } from './common.ts';

/**
 * Base data for a store
 */
export interface StoreBaseData {
  /** The name of the store */
  readonly name: string;
  /** The website URL */
  readonly website?: string | null;
  /** The default currency */
  readonly defaultCurrency?: string | null;
}

/**
 * Information about a store
 */
export interface StoreData extends StoreBaseData {
  /** The unique ID of the store */
  readonly id: StoreId;
  /** The default payment method */
  readonly defaultPaymentMethod?: string | null;
}

/**
 * List of stores
 */
export interface StoreDataList {
  /** List of stores */
  readonly data: readonly StoreData[];
  /** Number of stores returned */
  readonly count: number;
  /** Total number of stores */
  readonly total: number;
}

/**
 * Information about a store user
 */
export interface StoreUserData {
  /** The user ID */
  readonly userId: string;
  /** The role of the user in the store */
  readonly role: string;
}

/**
 * List of store users
 */
export interface StoreUserDataList {
  /** List of store users */
  readonly data: readonly StoreUserData[];
}

/**
 * Information about a role
 */
export interface RoleData {
  /** The unique ID of the role */
  readonly id: string;
  /** The name of the role */
  readonly role: string;
  /** List of permissions associated with the role */
  readonly permissions: readonly string[];
  /** Whether it is a server-level role */
  readonly isServerRole: boolean;
}
