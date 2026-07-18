import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { getServiceById, formatPrice } from "@/data/services";

// Square Web Payments SDK card-collection page for recurring items.
// Loaded here rather than globally since only this page needs it — keeps
// the SDK script off every other page's load.
//
// Requires VITE_SQUARE_APPLICATION_ID (PUBLIC — safe for client-side,
// distinct from the secret SQUARE_ACCESS_TOKEN) and VITE_SQUARE_LOCATION_ID
// set as build-time env vars.

declare global {
  interface Window {
    Square?: any;
  }
}

const SQUARE_SDK_URL =
  import.meta.env.VITE_SQUARE_ENV === "production"
    ? "https://web.squarecdn.com/v1/square.js"
    : "https://sandbox.web.squarecdn.com/v1/square.js";

export const Route = createFileRoute("/subscribe/$serviceId")({
  component: SubscribePage,
});

function SubscribePage() {
  const { serviceId } = useParams({ from: "/subscribe/$serviceId" });
  const service = getServiceById(serviceId);

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardInstanceRef = useRef<any>(null);

  const [email, setEmail] = useState("");
  const [givenName, setGivenName] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!service) return;

    // Load the Square Web Payments SDK script once, then initialize the
    // card form into cardContainerRef.
    const existing = document.querySelector(`script[src="${SQUARE_SDK_URL}"]`);

    async function initCard() {
      if (!window.Square) return;
      const payments = window.Square.payments(
        import.meta.env.VITE_SQUARE_APPLICATION_ID,
        import.meta.env.VITE_SQUARE_LOCATION_ID
      );
      const card = await payments.card();
      await card.attach(cardContainerRef.current);
      cardInstanceRef.current = card;
      setSdkReady(true);
    }

    if (existing) {
      initCard();
    } else {
      const script = document.createElement("script");
      script.src = SQUARE_SDK_URL;
      script.onload = initCard;
      document.head.appendChild(script);
    }

    return () => {
      cardInstanceRef.current?.destroy?.();
    };
  }, [service]);

  if (!service) {
    return <p>Unknown service.</p>;
  }

  if (!service.isRecurring) {
    return <p>This service isn't a subscription — use the regular checkout instead.</p>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cardInstanceRef.current || !email) return;

    setSubmitting(true);
    setError(null);

    try {
      const tokenResult = await cardInstanceRef.current.tokenize();
      if (tokenResult.status !== "OK") {
        throw new Error(tokenResult.errors?.[0]?.message ?? "Card tokenization failed");
      }

      const res = await fetch("/api/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          email,
          givenName,
          cardSourceId: tokenResult.token,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Subscription failed");

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-[480px] mx-auto py-24 px-6 text-center">
        <h1 className="font-display text-2xl font-bold text-chrome">You're subscribed.</h1>
        <p className="mt-3 text-secondary-soft">
          {service.name} — {formatPrice(service)}. A confirmation will follow shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] mx-auto py-24 px-6">
      <h1 className="font-display text-2xl font-bold text-chrome">Subscribe — {service.name}</h1>
      <p className="mt-2 text-secondary-soft">{formatPrice(service)}, billed monthly.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="text"
          placeholder="Full name"
          value={givenName}
          onChange={(e) => setGivenName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-subtle bg-transparent text-chrome"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-subtle bg-transparent text-chrome"
          required
        />
        <div ref={cardContainerRef} id="square-card-container" />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={!sdkReady || submitting}
          className="w-full px-6 py-3 rounded-lg bg-[var(--gold-bright)] text-[#09090f] font-bold text-sm tracking-wide hover:brightness-110 transition-all disabled:opacity-60"
        >
          {submitting ? "Processing…" : `Subscribe — ${formatPrice(service)}`}
        </button>
      </form>
    </div>
  );
}
