// Server-side Square checkout + subscription logic. Never expose
// SQUARE_ACCESS_TOKEN to the client — all calls happen here, on the server.
//
// Required environment variables (Netlify: Site configuration →
// Environment variables):
//   SQUARE_ACCESS_TOKEN        — secret, server-only. Square Developer
//     Dashboard → Credentials.
//   SQUARE_LOCATION_ID         — Square Developer Dashboard → Locations.
//   SQUARE_ENV                 — 'sandbox' or 'production'.
//   SQUARE_SUBSCRIPTION_PLAN_VARIATION_IDS — JSON map of service id → plan
//     variation ID, e.g. {"seo-optimization":"ABC123",...}. Create these
//     Subscription Plan objects in the Square Dashboard (Catalog →
//     Subscription Plans) FIRST — monthly, cancel-anytime assumed since
//     billing terms were never explicitly confirmed. Change in the
//     Dashboard if a minimum commitment is actually required.

import { getServiceById } from '../data/services';

const SQUARE_BASE_URL =
  process.env.SQUARE_ENV === 'production'
    ? 'https://connect.squareup.com'
    : 'https://connect.squareupsandbox.com';

function getSquareHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
    'Square-Version': '2025-01-23',
  };
}

// ─────────────────────────────────────────────
// ONE-TIME CHECKOUT — Square Checkout Links (Payment Links API)
// ─────────────────────────────────────────────
async function createOneTimeCheckout(serviceId: string): Promise<string> {
  const service = getServiceById(serviceId);
  if (!service) throw new Error(`Unknown service id: ${serviceId}`);

  const response = await fetch(`${SQUARE_BASE_URL}/v2/online-checkout/payment-links`, {
    method: 'POST',
    headers: getSquareHeaders(),
    body: JSON.stringify({
      idempotency_key: crypto.randomUUID(),
      quick_pay: {
        name: service.name,
        price_money: { amount: service.priceCents, currency: 'USD' },
        location_id: process.env.SQUARE_LOCATION_ID,
      },
      checkout_options: {
        redirect_url: 'https://tailoredtechsolutions.org/checkout/success',
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Square checkout creation failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.payment_link.url as string;
}

// ─────────────────────────────────────────────
// RECURRING — Square Customers, Cards, and Subscriptions APIs
// Verify each shape against current Square docs before production use:
//   developer.squareup.com/docs/customers-api/what-it-does
//   developer.squareup.com/docs/cards-api
//   developer.squareup.com/docs/subscriptions-api/overview
// ─────────────────────────────────────────────

async function findOrCreateCustomer(email: string, givenName?: string): Promise<string> {
  // Search for an existing customer by email first — avoids creating
  // duplicate customer records for repeat subscribers.
  const searchRes = await fetch(`${SQUARE_BASE_URL}/v2/customers/search`, {
    method: 'POST',
    headers: getSquareHeaders(),
    body: JSON.stringify({
      query: { filter: { email_address: { exact: email } } },
    }),
  });

  if (searchRes.ok) {
    const searchData = await searchRes.json();
    if (searchData.customers?.length > 0) {
      return searchData.customers[0].id as string;
    }
  }

  const createRes = await fetch(`${SQUARE_BASE_URL}/v2/customers`, {
    method: 'POST',
    headers: getSquareHeaders(),
    body: JSON.stringify({
      idempotency_key: crypto.randomUUID(),
      email_address: email,
      given_name: givenName,
    }),
  });

  if (!createRes.ok) {
    throw new Error(`Square customer creation failed: ${createRes.status} ${await createRes.text()}`);
  }

  const createData = await createRes.json();
  return createData.customer.id as string;
}

async function createCardOnFile(customerId: string, sourceId: string): Promise<string> {
  // sourceId is the token produced client-side by Square's Web Payments SDK
  // (card.tokenize()) — raw card data never touches this server or the
  // client's own code, only Square's hosted tokenization.
  const response = await fetch(`${SQUARE_BASE_URL}/v2/cards`, {
    method: 'POST',
    headers: getSquareHeaders(),
    body: JSON.stringify({
      idempotency_key: crypto.randomUUID(),
      source_id: sourceId,
      card: { customer_id: customerId },
    }),
  });

  if (!response.ok) {
    throw new Error(`Square card creation failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.card.id as string;
}

function getPlanVariationId(serviceId: string): string {
  const map = JSON.parse(process.env.SQUARE_SUBSCRIPTION_PLAN_VARIATION_IDS ?? '{}');
  const planVariationId = map[serviceId];
  if (!planVariationId) {
    throw new Error(
      `No Subscription Plan Variation ID configured for "${serviceId}". ` +
        `Create the plan in Square Dashboard → Catalog → Subscription Plans first, ` +
        `then add its variation ID to SQUARE_SUBSCRIPTION_PLAN_VARIATION_IDS.`
    );
  }
  return planVariationId;
}

async function createSubscription(serviceId: string, customerId: string, cardId: string) {
  const planVariationId = getPlanVariationId(serviceId);

  const response = await fetch(`${SQUARE_BASE_URL}/v2/subscriptions`, {
    method: 'POST',
    headers: getSquareHeaders(),
    body: JSON.stringify({
      idempotency_key: crypto.randomUUID(),
      location_id: process.env.SQUARE_LOCATION_ID,
      plan_variation_id: planVariationId,
      customer_id: customerId,
      card_id: cardId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Square subscription creation failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

// Full recurring flow, called from /api/create-subscription once the
// client has tokenized a card via Square's Web Payments SDK.
export async function subscribeWithCard(
  serviceId: string,
  email: string,
  cardSourceId: string,
  givenName?: string
) {
  const service = getServiceById(serviceId);
  if (!service) throw new Error(`Unknown service id: ${serviceId}`);
  if (!service.isRecurring) throw new Error(`${serviceId} is not a recurring service`);

  const customerId = await findOrCreateCustomer(email, givenName);
  const cardId = await createCardOnFile(customerId, cardSourceId);
  const subscription = await createSubscription(serviceId, customerId, cardId);
  return subscription;
}

// ─────────────────────────────────────────────
// PUBLIC ENTRY POINT for one-time items only. Recurring items go through
// /subscribe/:serviceId (card collection page) → /api/create-subscription
// instead of this function.
// ─────────────────────────────────────────────
export async function startCheckout(serviceId: string) {
  const service = getServiceById(serviceId);
  if (!service) throw new Error(`Unknown service id: ${serviceId}`);

  if (!service.isRecurring) {
    const url = await createOneTimeCheckout(serviceId);
    return { type: 'redirect' as const, url };
  }

  return {
    type: 'needs-card-collection' as const,
    redirectPath: `/subscribe/${serviceId}`,
  };
}
