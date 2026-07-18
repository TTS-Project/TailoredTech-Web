// Full service catalog — 26 items across 3 categories (Premium Business
// Website removed 2026-07 as a duplicate of Professional Business Website
// (5-8 Pages) — flag Andrew if this was the wrong one to keep).
//
// Structural Engineering items (Engineering Report, Structural Calculations,
// Construction Review) are intentionally excluded per standing instruction
// to keep SE work separate from TTS.
//
// Copy status: FIRST DRAFT. Written from typical industry scope for
// services at these names/price points — NOT verified against actual
// TTS delivery process. Andrew: review every description before this
// goes live.

export type ServiceCategory = 'ai-automation' | 'web-platform' | 'brand-growth';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  priceCents: number;
  isRecurring: boolean; // true = billed monthly via Square Subscriptions
  whatItIs: string;
  whatItDoes: string;
  pairsWith: string[]; // array of other service `id`s
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  'ai-automation': 'AI & Automation',
  'web-platform': 'Web & Platform Development',
  'brand-growth': 'Brand & Growth',
};

export const SERVICES: Service[] = [
  // ─────────────────────────────────────────────
  // AI & AUTOMATION
  // ─────────────────────────────────────────────
  {
    id: 'ai-consultation',
    name: 'AI Consultation',
    category: 'ai-automation',
    priceCents: 4995,
    isRecurring: false,
    whatItIs: 'A paid strategy session to diagnose where AI can actually save you time or money — not a sales call.',
    whatItDoes: '45–60 minute call reviewing your current workflows, identifying 2–3 automation opportunities, and a follow-up summary with recommended next steps and rough cost ranges.',
    pairsWith: ['ai-workflow-automation', 'custom-ai-agent'],
  },
  {
    id: 'ai-crm-automation',
    name: 'AI CRM Automation',
    category: 'ai-automation',
    priceCents: 499595,
    isRecurring: false,
    whatItIs: 'Automation layered onto your existing CRM (HubSpot, Salesforce, Pipedrive, etc.) — not a new CRM.',
    whatItDoes: 'Auto-tagging and scoring leads, triggered follow-up sequences, data enrichment on new contacts, and pipeline-stage automation rules built around how your team actually sells.',
    pairsWith: ['ai-lead-qualification-bot', 'business-analytics-dashboard'],
  },
  {
    id: 'ai-lead-qualification-bot',
    name: 'AI Lead Qualification Bot',
    category: 'ai-automation',
    priceCents: 299595,
    isRecurring: false,
    whatItIs: 'A conversational bot (web chat or form-based) that screens inbound leads before a human ever touches them.',
    whatItDoes: 'Asks qualifying questions, scores fit against your criteria, routes hot leads to sales immediately and nurtures the rest automatically.',
    pairsWith: ['ai-crm-automation', 'ai-customer-support-assistant'],
  },
  {
    id: 'ai-voice-receptionist',
    name: 'AI Voice Receptionist',
    category: 'ai-automation',
    priceCents: 399595,
    isRecurring: false,
    whatItIs: 'An AI-powered phone system that answers incoming calls when your team can’t.',
    whatItDoes: 'Answers calls in a natural voice, books appointments directly into your calendar, routes urgent calls to a real person, and takes detailed messages for everything else.',
    pairsWith: ['booking-system', 'ai-customer-support-assistant'],
  },
  {
    id: 'ai-workflow-automation',
    name: 'AI Workflow Automation',
    category: 'ai-automation',
    priceCents: 299595,
    isRecurring: false,
    whatItIs: 'Custom automation connecting the tools you already use — the productized version of our core consulting service, scoped to a defined set of workflows rather than an open-ended engagement.',
    whatItDoes: 'Maps 3–5 of your most repetitive manual processes and replaces them with automated, unsupervised workflows across your existing software stack.',
    pairsWith: ['ai-crm-automation', 'ai-document-automation'],
  },
  {
    id: 'ai-business-templates',
    name: 'AI Business Templates',
    category: 'ai-automation',
    priceCents: 14900,
    isRecurring: false,
    whatItIs: 'A downloadable library of pre-built AI prompt and workflow templates for common business tasks.',
    whatItDoes: 'Ready-to-use templates for things like email drafting, meeting summaries, proposal generation, and reporting — self-serve, not custom-built for you.',
    pairsWith: ['ai-prompt-library', 'ai-consultation'],
  },
  {
    id: 'ai-customer-support-assistant',
    name: 'AI Customer Support Assistant',
    category: 'ai-automation',
    priceCents: 249500,
    isRecurring: false,
    whatItIs: 'An AI assistant that handles routine customer questions across chat and/or email.',
    whatItDoes: 'Answers FAQs instantly, triages complex issues to your human team with context attached, and operates 24/7 without added headcount.',
    pairsWith: ['ai-lead-qualification-bot', 'ai-voice-receptionist'],
  },
  {
    id: 'ai-document-automation',
    name: 'AI Document Automation',
    category: 'ai-automation',
    priceCents: 199500,
    isRecurring: false,
    whatItIs: 'Automation for document-heavy processes — both extracting data from incoming documents and generating outgoing ones.',
    whatItDoes: 'Pulls structured data out of invoices, contracts, or forms automatically, and/or auto-generates standardized documents (proposals, reports, contracts) from templates and live data.',
    pairsWith: ['database-integration', 'complete-custom-crm'],
  },
  {
    id: 'ai-prompt-library',
    name: 'AI Prompt Library',
    category: 'ai-automation',
    priceCents: 9900,
    isRecurring: false,
    whatItIs: 'A static, downloadable reference product — not a live tool.',
    whatItDoes: 'A curated set of tested prompts organized by use case (sales, marketing, ops, support) that you can copy into any AI tool you already use.',
    pairsWith: ['ai-business-templates', 'ai-consultation'],
  },
  {
    id: 'custom-ai-agent',
    name: 'Custom AI Agent',
    category: 'ai-automation',
    priceCents: 699900,
    isRecurring: false,
    whatItIs: 'A single, purpose-built autonomous agent designed around one specific job in your business — the mid-tier between a templated automation and a full enterprise system.',
    whatItDoes: 'Handles one defined, end-to-end responsibility (e.g., inbox triage, order processing, research compilation) without human supervision, integrated into your existing tools.',
    pairsWith: ['ai-workflow-automation', 'database-integration'],
  },
  {
    id: 'enterprise-ai-system',
    name: 'Enterprise AI System',
    category: 'ai-automation',
    priceCents: 1449500,
    isRecurring: false,
    whatItIs: 'The top-tier package — a multi-agent AI system covering several interconnected functions across your business, not one isolated task.',
    whatItDoes: 'Multiple coordinated AI agents/workflows working across departments (e.g., sales, support, and ops simultaneously), with centralized monitoring and reporting.',
    pairsWith: ['business-analytics-dashboard', 'complete-custom-crm'],
  },

  // ─────────────────────────────────────────────
  // WEB & PLATFORM DEVELOPMENT
  // ─────────────────────────────────────────────
  {
    id: 'professional-business-website',
    name: 'Professional Business Website (5-8 Pages)',
    category: 'web-platform',
    priceCents: 99500,
    isRecurring: false,
    whatItIs: 'A full multi-page business website built to production standard.',
    whatItDoes: 'Up to 8 distinct pages (Home, About, Services, individual service pages, Contact, etc.), full navigation structure, mobile-responsive, contact form wired to your email, basic on-page SEO.',
    pairsWith: ['brand-identity-package', 'seo-optimization'],
  },
  {
    id: 'ecommerce-website',
    name: 'E-commerce Website',
    category: 'web-platform',
    priceCents: 499500,
    isRecurring: false,
    whatItIs: 'A full online store — not a landing page with a “buy” button, an actual product catalog and checkout system.',
    whatItDoes: 'Product listings with variants/inventory, cart and checkout flow, Square payment processing, order confirmation emails, and an admin view to manage products and orders.',
    pairsWith: ['database-integration', 'business-analytics-dashboard'],
  },
  {
    id: 'employee-dashboard',
    name: 'Employee Dashboard',
    category: 'web-platform',
    priceCents: 549500,
    isRecurring: false,
    whatItIs: 'An internal tool for your team, not a client- or customer-facing product.',
    whatItDoes: 'Role-based login, task/project visibility, internal reporting views, and whatever core workflows your team runs day-to-day — scoped per client during discovery.',
    pairsWith: ['database-integration', 'ai-workflow-automation'],
  },
  {
    id: 'database-integration',
    name: 'Database Integration',
    category: 'web-platform',
    priceCents: 299500,
    isRecurring: false,
    whatItIs: 'Connecting a client’s existing systems to a proper database backend — not a product on its own, a foundational layer other products build on.',
    whatItDoes: 'Structures and migrates data into a production database (Postgres/Supabase or similar), builds the connections between your existing tools and that database, and sets up backups/access control.',
    pairsWith: ['employee-dashboard', 'complete-custom-crm'],
  },
  {
    id: 'booking-system',
    name: 'Booking System',
    category: 'web-platform',
    priceCents: 499500,
    isRecurring: false,
    whatItIs: 'A scheduling/appointment system — for services, consultations, events, or facility bookings.',
    whatItDoes: 'Public-facing calendar for clients to book available slots, automated confirmation and reminder emails/texts, and an admin view to manage availability and see upcoming bookings.',
    pairsWith: ['ai-voice-receptionist', 'client-portal'],
  },
  {
    id: 'client-portal',
    name: 'Client Portal',
    category: 'web-platform',
    priceCents: 499500,
    isRecurring: false,
    whatItIs: 'A gated area for a business’s own clients to log in and see their project/account status.',
    whatItDoes: 'Client login, project/order status tracking, document or deliverable access, and messaging — scoped per client.',
    pairsWith: ['booking-system', 'complete-custom-crm'],
  },
  {
    id: 'complete-custom-crm',
    name: 'Complete Custom CRM',
    category: 'web-platform',
    priceCents: 999500,
    isRecurring: false,
    whatItIs: 'A fully custom CRM built from scratch, not a customization layer on top of HubSpot/Salesforce (that’s AI CRM Automation, above).',
    whatItDoes: 'Contact records, pipeline stages, activity logging, reporting, and team permissions — designed around how this specific business actually operates rather than a generic template.',
    pairsWith: ['database-integration', 'business-analytics-dashboard'],
  },
  {
    id: 'crm-templates',
    name: 'CRM Templates',
    category: 'web-platform',
    priceCents: 19900,
    isRecurring: false,
    whatItIs: 'A downloadable, self-serve product — pre-built CRM structure templates, not custom development.',
    whatItDoes: 'Ready-made pipeline/contact-tracking templates for businesses not ready for a full custom build.',
    pairsWith: ['ai-business-templates', 'complete-custom-crm'],
  },
  {
    id: 'business-analytics-dashboard',
    name: 'Business Analytics Dashboard',
    category: 'web-platform',
    priceCents: 249500,
    isRecurring: false,
    whatItIs: 'A reporting/visibility layer — takes existing business data and makes it visible and actionable, not a data source itself.',
    whatItDoes: 'Custom dashboard pulling from your existing systems showing the metrics that actually matter — revenue trends, conversion rates, operational KPIs — built around real decisions, not vanity metrics.',
    pairsWith: ['database-integration', 'ai-crm-automation'],
  },

  // ─────────────────────────────────────────────
  // BRAND & GROWTH
  // ─────────────────────────────────────────────
  {
    id: 'brand-identity-package',
    name: 'Brand Identity Package',
    category: 'brand-growth',
    priceCents: 199500,
    isRecurring: false,
    whatItIs: 'A complete visual brand foundation — one-time deliverable, not an ongoing service.',
    whatItDoes: 'Logo design, color palette, typography system, and basic brand guidelines document.',
    pairsWith: ['professional-business-website', 'content-creation-package'],
  },
  {
    id: 'business-growth-plan',
    name: 'Business Growth Plan',
    category: 'brand-growth',
    priceCents: 69900,
    isRecurring: false,
    whatItIs: 'A strategic document, not a piece of software — the business-side counterpart to technical Strategy & Advisory consulting.',
    whatItDoes: 'Analysis of current position, market opportunity, and a written roadmap with concrete next steps and priorities over a defined period.',
    pairsWith: ['ai-consultation', 'business-analytics-dashboard'],
  },
  {
    id: 'content-creation-package',
    name: 'Content Creation Package',
    category: 'brand-growth',
    priceCents: 74900,
    isRecurring: false,
    whatItIs: 'A batch of finished content, not an ongoing subscription — a defined deliverable per purchase.',
    whatItDoes: 'A set number of pieces (blog posts, website copy, social captions) written to fill out a site or campaign that would otherwise launch with placeholder text.',
    pairsWith: ['professional-business-website', 'social-media-management'],
  },
  {
    id: 'seo-optimization',
    name: 'SEO Optimization',
    category: 'brand-growth',
    priceCents: 6995,
    isRecurring: true,
    whatItIs: 'Ongoing search optimization work, not a one-time audit.',
    whatItDoes: 'Continuous on-page optimization, keyword tracking, and technical SEO maintenance to build and hold search rankings over time.',
    pairsWith: ['professional-business-website', 'content-creation-package'],
  },
  {
    id: 'social-media-management',
    name: 'Social Media Management',
    category: 'brand-growth',
    priceCents: 150000,
    isRecurring: true,
    whatItIs: 'Hands-off, ongoing social media operation — not a one-time content batch.',
    whatItDoes: 'Regular posting cadence across active platforms, content calendar planning, and basic engagement/community management.',
    pairsWith: ['content-creation-package', 'brand-identity-package'],
  },
  {
    id: 'professional-support',
    name: 'Professional Support',
    category: 'brand-growth',
    priceCents: 24900,
    isRecurring: true,
    whatItIs: 'An ongoing maintenance/support retainer — not tied to a single project, sits underneath whatever else a client has already bought.',
    whatItDoes: 'Priority response on bugs or issues, minor updates and adjustments to delivered work, and a direct line to your team without re-negotiating scope for every small request.',
    pairsWith: [],
  },
];

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function formatPrice(service: Service): string {
  const amount = (service.priceCents / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return service.isRecurring ? `$${amount}/mo` : `$${amount}`;
}
