/**
 * User-related types for BTCPay Server API
 */

/**
 * Information about a user
 */
export interface ApplicationUserData {
  /** The unique ID of the user */
  readonly id: string;
  /** The email address */
  readonly email: string;
  /** Whether the email is confirmed */
  readonly emailConfirmed: boolean;
  /** Whether email confirmation is required */
  readonly requiresEmailConfirmation: boolean;
  /** Creation timestamp */
  readonly created?: number | null;
  /** List of roles assigned to the user */
  readonly roles?: readonly string[];
  /** The name of the user */
  readonly name?: string | null;
  /** The URL of the user's profile image */
  readonly imageUrl?: string | null;
}

/**
 * Request body for creating a new user
 */
export interface CreateUserRequest {
  /** The email address */
  readonly email: string;
  /** The password */
  readonly password?: string | null;
  /** Whether the user is an administrator */
  readonly isAdministrator?: boolean;
  /** The name of the user */
  readonly name?: string | null;
  /** The URL of the user's profile image */
  readonly imageUrl?: string | null;
}

/**
 * Request body for updating a user
 */
export interface UpdateUserRequest {
  /** The email address */
  readonly email?: string | null;
  /** The name of the user */
  readonly name?: string | null;
  /** The URL of the user's profile image */
  readonly imageUrl?: string | null;
  /** The current password (required for changing password) */
  readonly currentPassword?: string | null;
  /** The new password */
  readonly newPassword?: string | null;
}
