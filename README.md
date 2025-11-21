# BTCPay-JS

**Type-safe Node.js and Bun SDK for the BTCPay Server HTTP API.**

BTCPay-JS wraps every public BTCPay Server endpoint with first-class TypeScript support, predictable error handling, and a developer ergonomics layer that matches the mental model of the original REST API.

## Table of contents

- [Why BTCPay-JS?](#why-btcpay-js)
- [Requirements](#requirements)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Working with resources](#working-with-resources)
- [Error handling](#error-handling)
- [Advanced configuration](#advanced-configuration)
- [Local development](#local-development)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

## Why BTCPay-JS?

- **Full coverage**: Stores, invoices, wallets, apps, payouts, pull-payments, lightning, notifications, server management, and webhooks ship as dedicated clients.
- **First-class TypeScript**: Strong types for every request and response, plus discriminated error classes (`BTCPayError`, `BTCPayValidationError`, etc.).
- **Modern runtime support**: Works anywhere `fetch` and `AbortController` are available (Node.js ≥ 18, Bun ≥ 1.0, Deno via npm specifier).
- **Zero-config HTTP layer**: Authorization header management, JSON serialization, multipart form data, query string handling, and timeout support are handled for you.
- **Ergonomic API surface**: Fluent helpers (`client.invoices(storeId)`, `client.webhooks()`) mirror the way you already use BTCPay Server.

## Requirements

- Node.js **18+** or Bun **1.0+** (both ship the built-in `fetch` implementation used by the SDK).
- A BTCPay Server instance with an API key that has the permissions you plan to exercise.

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
  baseUrl: 'https://pay.example.com/',
  apiKey: process.env.BTCPAY_API_KEY!,
  timeout: 10_000, // optional; defaults to no timeout
});

const storeId = '2e23292d-3f3d-4f34-8c0c-9dcafe915b12';

// Create an invoice
const { data: invoice } = await client.invoices(storeId).createInvoice({
  amount: '125.00',
  currency: 'USD',
  metadata: { orderId: 'ORDER-1001', customerEmail: 'satoshi@example.com' },
  checkout: {
    redirectURL: 'https://shop.example.com/thank-you',
    requiresRefundEmail: true,
  },
});

console.log(invoice.checkoutLink);
```

The SDK always returns an `ApiResponse<T>` object so you have access to the response body (`data`), HTTP status, and headers.

## Working with resources

`BTCPayClient` exposes purpose-built sub-clients. Some are accessed directly as properties, while others need a store context. The table below summarizes the most common entry points:

| Accessor                                                         | Description                                                                               |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `client.stores`, `client.users`, `client.server`, `client.files` | Global BTCPay administration helpers.                                                     |
| `client.apiKeys`, `client.notifications`                         | Create and revoke API keys, list device notifications.                                    |
| `client.apps`, `client.paymentMethods`, `client.wallets`         | Manage apps, payment methods, on-chain wallets, and related settings.                     |
| `client.lightning`, `client.lightningAddresses`                  | Create invoices, channels, addresses, and manage LNURL withdraw/pay flows.                |
| `client.pullPayments`, `client.payouts`                          | Work with pull-payment schedules and individual payout mutations.                         |
| `client.invoices(storeId)`                                       | Returns an `InvoicesClient` bound to one store ID so you can list/create/update invoices. |
| `client.paymentRequests()`                                       | Manage standalone payment requests independent of stores.                                 |
| `client.webhooks()`                                              | Create/list/update webhooks and inspect their delivery history.                           |

### Listing invoices

```ts
const invoicesClient = client.invoices(storeId);
const { data: invoiceList } = await invoicesClient.getInvoices({
  status: ['New', 'Processing'],
  take: 25,
});

invoiceList.data.forEach(entry => {
  console.log(entry.id, entry.status, entry.amount);
});
```

### Managing webhooks

```ts
const webhooks = client.webhooks();

const { data: createdWebhook } = await webhooks.create(storeId, {
  url: 'https://shop.example.com/webhooks/btcpay',
  enabled: true,
  authorizedEvents: { everything: true },
  secret: process.env.BTCPAY_WEBHOOK_SECRET,
});

await webhooks.redeliverWebhook(storeId, createdWebhook.id, 'delivery-id');
```

### Using wallets

```ts
const { data: wallet } = await client.wallets.getWalletOverview(storeId, 'BTC-onchain');
const { data: feerate } = await client.wallets.getWalletFeeRate(storeId, 'BTC-onchain', 3);
```

Every method is fully typed, so your editor will autocomplete payloads and highlight missing or extra fields.

## Error handling

All methods either resolve to `ApiResponse<T>` or throw one of the custom error classes:

- `BTCPayAuthenticationError`: Missing/invalid token or insufficient permissions (HTTP 401).
- `BTCPayValidationError`: The server returned a detailed validation payload (HTTP 400/422). Includes `validationErrors` for field-level issues.
- `BTCPayError`: Catch-all for non-validation server errors. Exposes `statusCode` and the server-supplied `ProblemDetails` when available.
- `BTCPayNetworkError`: Networking issues or unexpected low-level failures. Includes the original error for logging.

```ts
try {
  await client.stores.getStore(storeId);
} catch (error) {
  if (error instanceof BTCPayValidationError) {
    console.error('Validation failed', error.validationErrors);
  } else if (error instanceof BTCPayAuthenticationError) {
    console.error('Check your API key');
  } else {
    console.error('Unhandled BTCPay error', error);
  }
}
```

## Advanced configuration

- **Timeouts**: Pass a `timeout` in milliseconds to the constructor to automatically cancel long-running HTTP requests via `AbortSignal.timeout`.
- **Custom headers**: Most helper methods expose `options` objects with `headers` so you can add idempotency keys or tracing metadata.
- **Multipart/form-data**: Methods that accept `FormData` (for example, file uploads) automatically skip `Content-Type` so native boundary handling stays intact.
- **Query parameters**: Arrays, booleans, and numbers are serialized for you. Pass `undefined`/`null` to omit optional parameters.

## Local development

Clone the repo and install dependencies with your preferred package manager (Bun is the default here):

```bash
bun install
```

Available scripts:

- `bun run dev` — Type-check in watch mode while you iterate.
- `bun run build` — Emit ESM output to `dist/` and rewrite path aliases via `tsc-alias`.
- `bun run lint` / `bun run lint:check` — ESLint with TypeScript support.
- `bun run format` / `bun run format:check` — Prettier enforcement.
- `bun run typecheck` — CI-friendly type checking with no emit.
- `bun run clean` — Remove the `dist/` directory.

## FAQ

**Does this work in the browser?**

The SDK targets server runtimes. While technically compatible with environments that expose `fetch`, you should avoid embedding your BTCPay API key in browser bundles.

**Does it track BTCPay Server releases?**

Yes. Each release is versioned following semver and aligns with the latest public BTCPay Server API schema at publish time.

**How are breaking changes communicated?**

Breaking changes increment the major version and are documented in the release notes and changelog (coming soon).

## Contributing

Issues and pull requests are welcome. Please:

1. Fork and create a feature branch.
2. Run `bun run lint` and `bun run typecheck` before opening a PR.
3. Add or update documentation/tests whenever you extend the public API.

## License

MIT © Andrew
