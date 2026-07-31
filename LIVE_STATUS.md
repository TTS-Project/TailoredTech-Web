# TTS Live Status
*Last updated: 2026-07-31 — first verified run + Netlify connector status confirmed dead*
*This file is the source of truth for Deploy Verification checks. Claude reads AND writes this file directly via GitHub — no manual upload step required.*

---

## Repos & Deploy Targets

| Project | Repo | Branch | Last Verified SHA | Verified At |
|---|---|---|---|---|
| TailoredTechSolutions.org | TTS-Project/TailoredTech-Web | main | e854251576b30894bb51cad8d0ff961c8169e323 | 2026-07-31 |
| TTS Mobile App | TTS-Project/TailoredTechMobile | Agriculture | 11f6e0d793c6d52d08f747c7b4039ea02ab1e133 | 2026-07-31 |

**Netlify Site ID:** e91fc546-35ba-4468-87c5-f404cc2f5ee4 · team slug: tailoredtechsolutions

### Netlify connector — CONFIRMED DEAD, do not retry (2026-07-31)
The Netlify MCP connector has been non-functional for weeks. Not a one-off glitch, not fixable by toggling or reauthorizing this session. **Stop suggesting reconnection in future checks.** No alternative API path exists via Composio either (checked directly — only Vercel tools surface, no Netlify toolkit at all).

**Ceiling without it:** `curl -sI` against the live URL confirms the site responds (200 OK) but cannot confirm which commit is deployed — no build-ID/last-modified header exposed this way. Treat this as permanent until one of the two paths below is set up.

**Two actual fixes available — neither depends on the broken connector or account recovery:**
1. **Build Hook** (solves the manual-deploy-trigger problem): Andrew generates a Build Hook URL once in Netlify dashboard (Site settings → Build & deploy → Build hooks → Add build hook). Once he has that URL, Claude can trigger a deploy directly via `curl -X POST <hook-url>` — no login, no OAuth, no MCP needed.
2. **Personal Access Token** (solves the deploy-verification problem): Andrew generates a PAT in Netlify (User settings → Applications → New access token). Pasted per-session when exact verification is wanted, Claude queries `api.netlify.com/api/v1/sites/{site_id}/deploys` directly for exact commit SHA + deploy state. Never stored — it's a credential, not status data, and doesn't belong in a committed file.

Until either exists, Deploy Verification will report Netlify status as "site responds, commit unconfirmed" and stop there — not guess further.

---

## Open Items (carry forward until RESOLVED, each requires evidence to close)

| Item | Status | Evidence |
|---|---|---|
| SQUARE_SUBSCRIPTION_PLAN_VARIATION_ID | OPEN | Confirmed via code search: reference still present in `src/server/square-checkout.ts` at current HEAD (2026-07-31) |
| Square webhook signature verification | OPEN | Read `supabase/functions/square-webhook/index.ts` directly. Explicit comment: "Left unimplemented here deliberately — do not deploy to production until signature verification is added." |
| Webhook does not record purchased service | OPEN (new, found 2026-07-31) | Same file, second TODO: payment is recorded but which service/item was purchased is not — no `services_purchased` row is written. Item name needs to travel from checkout → Square order → webhook. |
| Placeholder testimonials (Testimonials.tsx) | NOT CHECKED 2026-07-31 | Not verified this run — check next pass |
| Terra Farming iOS compliance (privacy manifest, Login w/ Apple, WebView restrictions, deep links) | NOT CHECKED 2026-07-31 | Not verified this run — check next pass |
| Ameer Al Saati removal from TTS web copy | RESOLVED (2026-07-15) | Confirmed complete across five files per prior session. Do not reintroduce without explicit instruction. |
| Netlify account access | Andrew confirmed connector-side, not account-side (2026-07-31) | Site itself unaffected — lockout risk is separate from the connector issue and hasn't been raised as an active account-recovery need |

---

## Verified-Clean (checked 2026-07-31, no action needed)

- `.gitignore` on both repos properly excludes `.env` / `.env.*`, allows only `.env.example`.
- `square-webhook/index.ts` uses `Deno.env.get()` for secrets — no hardcoded credentials found in reviewed files.

---

## Standing Cautionary Flags

- Terra Farming `.env` exposure — the standing example of what "flag immediately, don't let it pass" means. Treat any future similar exposure with the same severity.
- Any webhook stub is the same category — a stub is not "done" because a route exists.
- Do not mark testimonials RESOLVED without seeing an actual client quote in the file, not just the placeholder gone.
- Do not re-suggest Netlify MCP reconnection — confirmed dead for weeks as of 2026-07-31. Only re-open this if Andrew explicitly says the connector situation has changed.

---

## How This File Gets Updated

Claude reads this file directly from GitHub at the start of every Deploy Verification run — no upload, no Project-knowledge dependency. At the end of each run, Claude commits the updated version back to this same path. The only manual step left is running the check itself — and, separately, setting up the Build Hook / PAT above if exact Netlify verification is wanted.
