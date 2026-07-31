# TTS Live Status
*Last updated: 2026-07-31 — first verified run*
*This file is the source of truth for Deploy Verification checks. Claude reads AND writes this file directly via GitHub — no manual upload step required.*

---

## Repos & Deploy Targets

| Project | Repo | Branch | Last Verified SHA | Verified At |
|---|---|---|---|---|
| TailoredTechSolutions.org | TTS-Project/TailoredTech-Web | main | e854251576b30894bb51cad8d0ff961c8169e323 | 2026-07-31 |
| TTS Mobile App | TTS-Project/TailoredTechMobile | Agriculture | 11f6e0d793c6d52d08f747c7b4039ea02ab1e133 | 2026-07-31 |

**Netlify Site ID:** e91fc546-35ba-4468-87c5-f404cc2f5ee4 · team slug: tailoredtechsolutions
**Known limitation:** No working Netlify API/MCP connection. `curl -sI` confirms the site responds (200 OK) but cannot confirm which commit is actually deployed — no build-ID or last-modified header exposed. This is a standing gap, not an oversight. Closing it requires either a working Netlify connector or a pasted Netlify personal access token per session (not stored here — token is a secret, never committed).

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

---

## Verified-Clean (checked 2026-07-31, no action needed)

- `.gitignore` on both repos properly excludes `.env` / `.env.*`, allows only `.env.example`.
- `square-webhook/index.ts` uses `Deno.env.get()` for secrets — no hardcoded credentials found in reviewed files.

---

## Standing Cautionary Flags

- Terra Farming `.env` exposure — the standing example of what "flag immediately, don't let it pass" means. Treat any future similar exposure with the same severity.
- Any webhook stub is the same category — a stub is not "done" because a route exists.
- Do not mark testimonials RESOLVED without seeing an actual client quote in the file, not just the placeholder gone.

---

## How This File Gets Updated

Claude reads this file directly from GitHub at the start of every Deploy Verification run — no upload, no Project-knowledge dependency. At the end of each run, Claude commits the updated version back to this same path. The only manual step left is running the check itself.
