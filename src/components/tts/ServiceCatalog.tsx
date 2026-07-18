import { useState } from 'react';
import { SERVICES, CATEGORY_LABELS, formatPrice, getServiceById, type ServiceCategory } from '@/data/services';

// Replaces the old 6-card generic Services section with the real, priced
// 27-item catalog. Click a card to expand — shows what it is, what it
// does, cross-sell suggestions, and a checkout CTA.
//
// Recurring items (SEO Optimization, Social Media Management, Professional
// Support) show a "Subscribe" CTA that currently only surfaces a message
// (see square-checkout.ts) since card-on-file collection isn't built yet.
// One-time items redirect straight to a Square-hosted checkout page.

const CATEGORIES: ServiceCategory[] = ['ai-automation', 'web-platform', 'brand-growth'];

function PairsWithChip({ id }: { id: string }) {
  const service = getServiceById(id);
  if (!service) return null;
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wide border border-gold-dim text-gold-dim">
      {service.name}
    </span>
  );
}

function ServiceCard({ id }: { id: string }) {
  const [expanded, setExpanded] = useState(false);
  const [checkoutState, setCheckoutState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  const service = getServiceById(id);
  if (!service) return null;

  async function handleCheckout() {
    setCheckoutState('loading');
    setCheckoutMessage(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId: id }),
      });
      const data = await res.json();

      if (data.type === 'redirect') {
        window.location.href = data.url;
        return;
      }
      if (data.type === 'needs-card-collection') {
        setCheckoutMessage(data.message);
        setCheckoutState('idle');
        return;
      }
      throw new Error('Unexpected checkout response');
    } catch (err) {
      setCheckoutState('error');
      setCheckoutMessage('Something went wrong starting checkout. Try again or contact us directly.');
    }
  }

  return (
    <div className="rounded-2xl border border-subtle bg-[#0d0d1a] overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div>
          <h3 className="font-display text-lg font-bold text-chrome">{service.name}</h3>
          <p className="mt-1 text-sm text-secondary-soft">{service.whatItIs}</p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 pl-4">
          <span className="font-display text-lg font-bold text-gold whitespace-nowrap">
            {formatPrice(service)}
          </span>
          <span className="text-muted-soft">{expanded ? '−' : '+'}</span>
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-subtle pt-5 space-y-5">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-gold-dim mb-1">
              What It Does
            </div>
            <p className="text-sm text-secondary-soft leading-relaxed">{service.whatItDoes}</p>
          </div>

          {service.pairsWith.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-gold-dim mb-2">
                Pairs Well With
              </div>
              <div className="flex flex-wrap gap-2">
                {service.pairsWith.map((pairId) => (
                  <PairsWithChip key={pairId} id={pairId} />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={checkoutState === 'loading'}
            className="w-full px-6 py-3 rounded-lg bg-[var(--gold-bright)] text-[#09090f] font-bold text-sm tracking-wide hover:brightness-110 transition-all disabled:opacity-60"
          >
            {checkoutState === 'loading'
              ? 'Starting checkout…'
              : service.isRecurring
                ? `Subscribe — ${formatPrice(service)}`
                : `Start This Project — ${formatPrice(service)}`}
          </button>

          {checkoutMessage && (
            <p className="text-xs text-secondary-soft">{checkoutMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}

export function ServiceCatalog() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-deep scroll-mt-[68px]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-[640px]">
          <div className="text-[11px] font-mono uppercase tracking-widest text-gold-dim">
            What We Do
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-chrome">
            For companies that need it built.
          </h2>
          <p className="mt-4 text-secondary-soft leading-relaxed">
            27 services across 3 categories. Click any one for exactly what's included —
            no vague packages, no surprises at invoice time.
          </p>
        </div>

        {CATEGORIES.map((cat) => (
          <div key={cat} className="mt-14">
            <h3 className="font-display text-xl font-bold text-chrome mb-6">
              {CATEGORY_LABELS[cat]}
            </h3>
            <div className="grid gap-4">
              {SERVICES.filter((s) => s.category === cat).map((s) => (
                <ServiceCard key={s.id} id={s.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
