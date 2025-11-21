/**
 * Main BTCPay Server API client
 */

import { ApiKeysClient } from '@structures/api-keys';
import { AppsClient } from '@structures/apps';
import { InvoicesClient } from '@structures/invoices';
import { LightningClient } from '@structures/lightning';
import { LightningAddressesClient } from '@structures/lightning-addresses';
import { NotificationsClient } from '@structures/notifications';
import { PaymentMethodsClient, WalletsClient } from '@structures/payment-methods';
import { PaymentRequestsClient } from '@structures/payment-requests';
import { PayoutsClient, PullPaymentsClient } from '@structures/pull-payments';
import { FilesClient, ServerClient } from '@structures/server';
import { StoresClient } from '@structures/stores';
import { UsersClient } from '@structures/users';
import { WebhooksClient } from '@structures/webhooks';
import { HttpClient } from '@utils/http-client';

import type { BTCPayClientConfig } from '@typings/client';

export class BTCPayClient {
  private readonly httpClient: HttpClient;
  public readonly stores: StoresClient;
  public readonly users: UsersClient;
  public readonly apiKeys: ApiKeysClient;
  public readonly notifications: NotificationsClient;
  public readonly server: ServerClient;
  public readonly files: FilesClient;
  public readonly lightning: LightningClient;
  public readonly lightningAddresses: LightningAddressesClient;
  public readonly pullPayments: PullPaymentsClient;
  public readonly payouts: PayoutsClient;
  public readonly apps: AppsClient;
  public readonly paymentMethods: PaymentMethodsClient;
  public readonly wallets: WalletsClient;

  constructor(config: BTCPayClientConfig) {
    this.httpClient = new HttpClient(config);
    this.stores = new StoresClient(this.httpClient);
    this.users = new UsersClient(this.httpClient);
    this.apiKeys = new ApiKeysClient(this.httpClient);
    this.notifications = new NotificationsClient(this.httpClient);
    this.server = new ServerClient(this.httpClient);
    this.files = new FilesClient(this.httpClient);
    this.lightning = new LightningClient(this.httpClient);
    this.lightningAddresses = new LightningAddressesClient(this.httpClient);
    this.pullPayments = new PullPaymentsClient(this.httpClient);
    this.payouts = new PayoutsClient(this.httpClient);
    this.apps = new AppsClient(this.httpClient);
    this.paymentMethods = new PaymentMethodsClient(this.httpClient);
    this.wallets = new WalletsClient(this.httpClient);
  }

  public invoices = (storeId: string): InvoicesClient => {
    return new InvoicesClient(this.httpClient, storeId);
  };

  public webhooks = (): WebhooksClient => {
    return new WebhooksClient(this.httpClient);
  };

  public paymentRequests = (): PaymentRequestsClient => {
    return new PaymentRequestsClient(this.httpClient);
  };
}
