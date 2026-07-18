import { createFileRoute } from "@tanstack/react-router";
import { startCheckout } from "@/server/square-checkout";

// POST /api/checkout — body: { serviceId: string }
// Returns either { type: "redirect", url } for one-time Square Checkout
// Links, or { type: "needs-card-collection", message } for recurring
// items (see src/server/square-checkout.ts for why subscriptions can't
// use a simple redirect flow yet).
export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { serviceId?: string };
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (!body.serviceId) {
          return new Response(JSON.stringify({ error: "Missing serviceId" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const result = await startCheckout(body.serviceId);
          return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Checkout creation failed:", error);
          return new Response(
            JSON.stringify({ error: "Checkout could not be created. Try again shortly." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
