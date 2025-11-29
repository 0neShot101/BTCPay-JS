# BTCPay-JS

<p align="center">
	<a href="https://www.npmjs.com/package/@oneshot101/btcpay-js"><img src="https://img.shields.io/npm/v/@oneshot101/btcpay-js?style=for-the-badge&logo=npm&logoColor=white" alt="npm version"></a>
	<a href="https://www.npmjs.com/package/@oneshot101/btcpay-js"><img src="https://img.shields.io/npm/dm/@oneshot101/btcpay-js?style=for-the-badge&logo=npm&logoColor=white" alt="npm downloads"></a>
	<a href="https://bun.sh"><img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Runs on Bun"></a>
	<a href="https://typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
	<a href="https://eslint.org"><img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint"></a>
	<a href="https://prettier.io"><img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier"></a>
	<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT"></a>
</p>

`@oneshot101/btcpay-js` is a type-safe BTCPay Server toolkit that wraps every major REST surface (stores, invoices, lightning, pull payments, webhooks, files) so you can focus on payment flows instead of shepherding raw HTTP requests.

## Highlights

- **Typed front to back.** Requests, responses, and pagination helpers mirror BTCPay's schemas, so autocomplete tells you exactly what's available.
- **One client, all endpoints.** Stores, invoices, pull payments, notifications, lightning, and wallet calls live behind `BTCPayClient`.
- **Bun and Node native.** Relies only on the platform `fetch`, ships zero runtime deps, and respects `AbortSignal.timeout`.
- **Problem-details aware.** `BTCPayError`, `BTCPayValidationError`, and `BTCPayAuthenticationError` surface the server's context without parsing JSON manually.
- **File uploads and query helpers.** Send multipart form data, array query params, and custom headers exactly how BTCPay expects them.

## Resource map

`BTCPayClient` exposes purpose-built sub-clients so you can stay close to the REST API while keeping code tidy.

| Namespace                                        | Description                                                                        |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `client.stores`                                  | Create stores, manage payment configurations, upload rate rules.                   |
| `client.invoices(storeId)`                       | Store-scoped invoices with pagination, status/order filters, and checkout updates. |
| `client.pullPayments` / `client.payouts`         | Automate split payouts and mark paid in one place.                                 |
| `client.lightning` / `client.lightningAddresses` | Query LN nodes, open invoices, and manage Lightning Address aliases.               |
| `client.apps`                                    | Drive PoS, Crowdfund, and Payment Button app endpoints.                            |
| `client.paymentMethods` / `client.wallets`       | Inspect on-chain wallets, generate addresses, list payment methods.                |
| `client.notifications`                           | Subscribe to server events and mark notifications as read.                         |
| `client.webhooks()`                              | Register, rotate secrets, and test webhooks without manual curl sessions.          |

## Installation

```bash
# npm
npm install @oneshot101/btcpay-js

# pnpm
pnpm add @oneshot101/btcpay-js

# yarn
yarn add @oneshot101/btcpay-js

# bun
bun add @oneshot101/btcpay-js
```

## Quick start

```ts
import { BTCPayClient } from '@oneshot101/btcpay-js';

const client = new BTCPayClient({
  baseUrl: 'https://btcpay.your-domain.tld',
  apiKey: process.env.BTCPAY_API_KEY!,
  timeout: 10_000,
});

const storeId = 'ABC123';

const { data: invoice } = await client.invoices(storeId).createInvoice({
  amount: '42',
  currency: 'USD',
  metadata: { orderId: 'order-9000' },
  checkout: { redirectURL: 'https://your-app.dev/thanks' },
});

console.log(invoice.checkoutLink);
```

That snippet spins up the client, targets a store, and creates a BTCPay invoice with metadata plus a redirect URL. Need store data or lightning invoices first? All of those live on the same client so you can chain calls without juggling constructors.

### Store-scoped invoices on tap

```ts
const invoices = await client.invoices(storeId).getInvoices({
  status: ['New', 'Processing'],
  orderId: ['order-9000'],
  textSearch: 'order-9000',
});

console.log(invoices.data.map(({ id, amount }) => ({ id, amount })));
```

Pagination cursors, text search, and status enums are typed so you can move from pending invoices to completed ones without guessing parameter names.

## Error handling with context

```ts
import { BTCPayAuthenticationError, BTCPayValidationError, BTCPayNetworkError } from '@oneshot101/btcpay-js';

try {
  await client.invoices(storeId).createInvoice(body);
} catch (error) {
  if (error instanceof BTCPayAuthenticationError) {
    rotateKey();
    return;
  }

  if (error instanceof BTCPayValidationError) {
    console.error(error.validationErrors);
  }

  if (error instanceof BTCPayNetworkError) {
    alertOps(error.message);
  }

  throw error;
}
```

The SDK mirrors BTCPay's `ProblemDetails`, so validation errors ship the exact field map the server rejected and auth failures short-circuit before you retry.

## Recipes

- **Webhook bootstrap:** `client.webhooks().create(storeId, { url, secret, events: ['InvoiceSettled'] })` then stash the returned signing secret.
- **Lightning address lookup:** `client.lightningAddresses.getLightningAddress(storeId, username)` to show routing stats before exposing an address in your UI.
- **Automated payouts:** pair `client.pullPayments.create(storeId, payload)` with `client.payouts.approvePayout(storeId, payoutId, request)` to pay contributors on a schedule.
- **File inventory:** `client.files.list()` enumerates uploaded media so you can link them without revisiting the dashboard.

## Links

- GitHub: https://github.com/0neShot101/BTCPay-JS
- npm: https://www.npmjs.com/package/@oneshot101/btcpay-js
- License: MIT
