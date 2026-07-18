import { createFileRoute } from "@tanstack/react-router";
import { subscribeWithCard } from "@/server/square-checkout";

// POST /api/create-subscription
// body: { serviceId: string, email: string, cardSourceId: string, givenName?: string }
// cardSourceId comes from Square's Web Payments SDK card.tokenize() call —
// never send raw card numbers here.
export const Route = createFileRoute("/api/create-subscription")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: {
          serviceId?: string;
          email?: string;
          cardSourceId?: string;
          givenName?: string;
        };

        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (!body.serviceId || !body.email || !body.cardSourceId) {
          return new Response(
            JSON.stringify({ error: "Missing serviceId, email, or cardSourceId" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        try {
          const subscription = await subscribeWithCard(
            body.serviceId,
            body.email,
            body.cardSourceId,
            body.givenName
          );
          return new Response(JSON.stringify({ success: true, subscription }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Subscription creation failed:", error);
          return new Response(
            JSON.stringify({
              error:
                error instanceof Error
                  ? error.message
                  : "Subscription could not be created. Try again shortly.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
