/**
 * App-related types for BTCPay Server API
 */

import type { StoreId } from './common';

/**
 * Base interface for all application types
 */
export interface AppBaseData {
  /** The unique ID of the app */
  readonly id: string;
  /** The display name of the app */
  readonly appName: string;
  /** The ID of the store this app belongs to */
  readonly storeId: StoreId;
  /** Creation timestamp */
  readonly created: number;
  /** The type of the app (e.g., "PointOfSale", "Crowdfund") */
  readonly appType: string;
  /** Whether the app is archived */
  readonly archived?: boolean | null;
}

/**
 * Item definition used by POS and Crowdfund apps
 */
export interface AppItem {
  /** Unique ID of the item */
  readonly id: string;
  /** Display title */
  readonly title: string;
  /** Item description */
  readonly description?: string | null;
  /** Image URL */
  readonly image?: string | null;
  /** Price for fixed/minimum/top-up modes */
  readonly price?: string | null;
  /** How the price behaves */
  readonly priceType?: 'Fixed' | 'Topup' | 'Minimum';
  /** Custom button label */
  readonly buyButtonText?: string | null;
  /** Remaining inventory */
  readonly inventory?: number | null;
  /** Whether the item is hidden */
  readonly disabled?: boolean;
}

/**
 * Shared POS settings
 */
export interface PointOfSaleAppSettings {
  readonly title?: string | null;
  readonly description?: string | null;
  readonly defaultView?: 'Static' | 'Cart' | 'Light' | 'Print' | null;
  readonly showItems?: boolean | null;
  readonly showCustomAmount?: boolean | null;
  readonly showDiscount?: boolean | null;
  readonly showSearch?: boolean | null;
  readonly showCategories?: boolean | null;
  readonly enableTips?: boolean | null;
  readonly currency?: string | null;
  readonly fixedAmountPayButtonText?: string | null;
  readonly customAmountPayButtonText?: string | null;
  readonly tipText?: string | null;
  readonly customTipPercentages?: readonly number[] | null;
  readonly notificationUrl?: string | null;
  readonly redirectUrl?: string | null;
  readonly redirectAutomatically?: boolean | null;
  readonly htmlLang?: string | null;
  readonly htmlMetaTags?: string | null;
  readonly formId?: string | null;
}

/**
 * Payload for creating or updating a Point of Sale app
 */
export interface PointOfSaleAppRequest extends PointOfSaleAppSettings {
  /** Display name of the app (required when creating) */
  readonly appName?: string;
  /** Raw template JSON string */
  readonly template?: string | null;
}

/**
 * Point of Sale app data returned by the API
 */
export interface PointOfSaleAppData extends AppBaseData, PointOfSaleAppSettings {
  /** Raw template JSON string */
  readonly template?: string | null;
  /** Configured items */
  readonly items?: readonly AppItem[] | null;
}

/**
 * Payload for creating a crowdfund app
 */
export interface CrowdfundAppRequest {
  readonly appName?: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly enabled?: boolean | null;
  readonly enforceTargetAmount?: boolean | null;
  readonly startDate?: number | null;
  readonly endDate?: number | null;
  readonly targetCurrency?: string | null;
  readonly targetAmount?: number | null;
  readonly mainImageUrl?: string | null;
  readonly notificationUrl?: string | null;
  readonly tagline?: string | null;
  readonly disqusEnabled?: boolean | null;
  readonly disqusShortname?: string | null;
  readonly soundsEnabled?: boolean | null;
  readonly animationsEnabled?: boolean | null;
  readonly resetEveryAmount?: number | null;
  readonly resetEvery?: string | null;
  readonly displayPerksValue?: boolean | null;
  readonly sortPerksByPopularity?: boolean | null;
  readonly sounds?: readonly string[] | null;
  readonly animationColors?: readonly string[] | null;
  readonly htmlLang?: string | null;
  readonly htmlMetaTags?: string | null;
}

/**
 * Crowdfund app data returned by the API
 */
export type CrowdfundAppData = AppBaseData &
  Omit<CrowdfundAppRequest, 'appName'> & {
    /** Configured perks */
    readonly perks?: readonly AppItem[] | null;
  };

/**
 * Sales statistics returned by `/apps/{appId}/sales`
 */
export interface AppSalesStats {
  /** Overall sales count for the period */
  readonly salesCount: number;
  /** Per-day series */
  readonly series: readonly AppSalesStatsItem[];
}

/**
 * Daily sales datapoint
 */
export interface AppSalesStatsItem {
  /** UNIX timestamp marking the day */
  readonly date: number;
  /** Label formatted for humans */
  readonly label: string;
  /** Sales count for the day */
  readonly salesCount: number;
}

/**
 * Top item statistics returned by `/apps/{appId}/top-items`
 */
export interface AppItemStats {
  /** Item ID */
  readonly itemCode: string;
  /** Item display name */
  readonly title: string;
  /** Number of sales */
  readonly salesCount: number;
  /** Total amount (raw) */
  readonly total: string;
  /** Total amount formatted */
  readonly totalFormatted: string;
}
