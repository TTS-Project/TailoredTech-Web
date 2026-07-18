// Server-side Square checkout creation. Never expose SQUARE_ACCESS_TOKEN
// to the client — all calls happen here, on the server.
//
// Required environment variables (set in Netlify: Site configuration →
// Environment variables):
//   SQUARE_ACCESS_TOKEN        — Square Developer Dashboard → Credentials
//   SQUARE_LOCATION_ID         — Square Developer Dashboard → Locations
//   SQUARE_ENV                — 'sandbox' or 'production'
//   SQUARE_SUBSCRIPTION_PLAN_VARIATION_IDS — JSON map of service id → plan
//     variation ID, e.g. {"seo-optimization":"ABC123",...}. These IDs come
//     from creating Subscription Plan objects in the Square Dashboard
//     (Catalog → Subscription Plans) FIRST — they do not exist yet and
//     must be created before recurring checkout will work. This code will
//     throw a clear error if a recurring item is requested before its
//     plan variation ID is configured.

import { getServiceById, formatPrice } from '../data/services';

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
// Confident this shape is correct — same pattern used successfully before.
// ─────────────────────────────────────────────
async function createOneTimeCheckout(serviceId: string): Promise<string> {
  const service = getServiceById(serviceId);
  if (!service) throw new Error(`Unknown service id: ${serviceId}`);

  const idempotencyKey = crypto.randomUUID();

  const response = await fetch(`${SQUARE_BASE_URL}/v2/online-checkout/payment-links`, {
    method: 'POST',
    headers: getSquareHeaders(),
    body: JSON.stringify({
      idempotency_key: idempotencyKey,
      quick_pay: {
        name: service.name,
        price_money: {
          amount: service.priceCents,
          currency: 'USD',
        },
        location_id: process.env.SQUARE_LOCATION_ID,
      },
      checkout_options: {
        redirect_url: 'https://tailoredtechsolutions.org/checkout/success',
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Square checkout creation failed: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  return data.payment_link.url as string;
}

// ─────────────────────────────────────────────
// RECURRING CHECKOUT — Square Subscriptions
// LESS CERTAIN OF EXACT SHAPE — verify against current Square docs
// (developer.squareup.com/docs/subscriptions-api/overview) before relying
// on this. Assumes monthly, cancel-anytime plans (never confirmed by
// Andrew) — change plan configuration in the Square Dashboard if a
// minimum term is actually required.
// ─────────────────────────────────────────────
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

// A recurring purchase requires a Square Customer with a card on file
// BEFORE a subscription can be created — there is no simple redirect-link
// flow for subscriptions the way there is for one-time payments. This
// typically means: create/find the Square Customer → collect a card via
// Square's Web Payments SDK (client-side tokenization) → attach the card
// to the customer → THEN create the subscription. The card-collection
// step is NOT built yet — this function assumes a cardId already exists.
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
    const errorBody = await response.text();
    throw new Error(`Square subscription creation failed: ${response.status} ${errorBody}`);
  }

  return response.json();
}

// ─────────────────────────────────────────────
// PUBLIC ENTRY POINT — routes to the right flow based on the service
// ─────────────────────────────────────────────
export async function startCheckout(serviceId: string) {
  const service = getServiceById(serviceId);
  if (!service) throw new Error(`Unknown service id: ${serviceId}`);

  if (!service.isRecurring) {
    const url = await createOneTimeCheckout(serviceId);
    return { type: 'redirect' as const, url };
  }

  // Recurring items can't redirect to a simple hosted page the same way —
  // the frontend needs to collect a card first via Square's Web Payments
  // SDK. Signal that to the caller rather than silently failing.
  return {
    type: 'needs-card-collection' as const,
    message: `${service.name} (${formatPrice(service)}) requires card-on-file setup before subscribing.`,
  };
}
