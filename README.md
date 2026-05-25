# Karagateway Website

Next.js 16 + Tailwind CSS 4 website for [Karagateway](https://karagateway.com) — boutique Africa↔Global market-entry advisory.

Built in phases per `KARAGATEWAY_BUILD_SPEC_v2.md`.  
**Current status:** Phase 0 + Phase 1 + Phase 2 (AI assessment) + Phase 3 (chatbot) + Phase 4 (Insights blog) + Design Overhaul — complete.

> ⚠️ **Privacy Policy is incomplete** — all 11 sections (data controller, collection, sharing, retention, legal basis, cookies, GDPR rights, etc.) are missing. Do not launch to EU users until the full policy is added to `src/app/privacy/page.tsx`.  
Phase 5 (CRM + analytics, optional) is documented but not yet built.

---

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in your keys
cp .env.example .env.local
# Edit .env.local — see "Environment variables" below

# 3. Run dev server
npm run dev
# → http://localhost:3000
```

---

## Environment variables

All secrets live in `.env.local` (never committed). Copy from `.env.example`.

| Variable | Where to get it | Required? |
|---|---|---|
| `OPENROUTER_API_KEY` | [openrouter.ai/keys](https://openrouter.ai/keys) — pay-as-you-go, ~$0.10–0.60/M tokens | **Phase 2 (assessment) — default provider** |
| `OPENROUTER_MODEL` | Any OpenRouter model ID — default `meta-llama/llama-3.1-70b-instruct` | Phase 2 |
| `GEMINI_API_KEY` | [aistudio.google.com](https://aistudio.google.com) — **FREE, no credit card** | Phase 3 (chatbot) |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) — paid, pennies/call | Optional (if you switch assessment to `claude`) |
| `AI_PROVIDER_CHATBOT` | `gemini`, `claude`, or `openrouter` — default `gemini` (free) | Phase 3 |
| `AI_PROVIDER_ASSESSMENT` | `openrouter`, `claude`, or `gemini` — default `openrouter` | Phase 2 |
| `RESEND_API_KEY` | [resend.com](https://resend.com) — free tier (3,000 emails/month) | Phase 1 (lead emails) |
| `LEADS_NOTIFY_EMAIL` | Your notification email — default `info@karagateway.com` | Phase 1 |
| `NEXT_PUBLIC_CALCOM_LINK` | Your Cal.com or Calendly URL | Phase 1 (booking CTAs) |

### How to switch AI providers

The backend is **provider-agnostic**. One env var change, no code change:

```bash
# Default: assessment on OpenRouter (pay-as-you-go, EU-safe data policy)
AI_PROVIDER_ASSESSMENT=openrouter
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=meta-llama/llama-3.1-70b-instruct  # or any other OpenRouter model ID

# Switch to Claude if you prefer Anthropic directly
AI_PROVIDER_ASSESSMENT=claude
ANTHROPIC_API_KEY=sk-ant-...

# Free option (but see EU data note below)
AI_PROVIDER_ASSESSMENT=gemini
GEMINI_API_KEY=...
```

**Assessment model — default and data policy:**

The assessment defaults to **`meta-llama/llama-3.1-70b-instruct`** via OpenRouter. Key facts:

- **OpenRouter does not train on API requests** ([privacy policy](https://openrouter.ai/privacy)). This applies regardless of which model you run through OpenRouter.
- Llama 3.1 70B is Meta's open-weights model — capable, well-benchmarked on structured output tasks, and suitable for the assessment's JSON schema.
- Cost: roughly $0.10–$0.40 per million input tokens. A typical assessment call (system prompt ~1,800 tokens + user answers ~200 tokens) costs under $0.001.
- To switch models, change `OPENROUTER_MODEL` to any ID from [openrouter.ai/models](https://openrouter.ai/models) — no code change needed.

**EU data tradeoff:**

Karagateway is EU-based and captures EU business leads in the assessment. OpenRouter's no-training policy is suitable for this. Gemini's **free tier** should be avoided for the assessment — on the free tier, submitted data may be used by Google for model training, and commercial use is excluded for EU/EEA/UK/Switzerland. Gemini is fine for the chatbot (Phase 3), which handles general trade questions without capturing personal data.

---

## Deploy to Vercel

```bash
# First time
npm install -g vercel
vercel login
vercel --prod

# After that: push to main branch and Vercel auto-deploys.
```

Add your environment variables in Vercel → Project → Settings → Environment Variables. Copy from `.env.example`.

---

## How each `/api` route works

| Route | What it does |
|---|---|
| `POST /api/lead` | Receives form submissions (all 3 forms). Validates input, rejects honeypot, rate-limits by IP (5/10min), sends email via Resend, logs if no Resend key. Never leaks errors to the browser. |
| `POST /api/assessment` | *(Phase 2)* Validates multi-step assessment answers → calls `lib/ai.ts` (provider per `AI_PROVIDER_ASSESSMENT`) → returns JSON snapshot → captures lead. |
| `POST /api/chat` | Validates chat transcript (max 20 messages, 2000 chars each), rate-limits by IP (15/10min), calls `lib/ai.ts` (provider per `AI_PROVIDER_CHATBOT`, default free Gemini) → returns `{ reply }`. Graceful error if Gemini is unreachable. |

---

## How the AI guardrails work (plain English)

Every AI feature on this site has hard rules baked into its system prompt:

1. **On-topic only.** The AI answers questions about Africa trade, market entry, and Karagateway's services. If someone asks about something unrelated (weather, coding, recipes), it politely says it can't help with that and redirects.

2. **No firm numbers.** The AI never says "this will cost X" or "processing takes Y days" as a guaranteed fact. It frames everything as "typically" or "generally" and says a human consultation is needed for anything binding. This protects the firm from liability.

3. **No auto-publishing.** AI-drafted content (blog posts) is draft-only — you review and commit it. Nothing goes live without a human reading it first.

4. **Always end with a nudge.** After a substantive answer, the AI suggests booking a consultation. This is the conversion path.

These guardrails are why the AI makes the firm look bigger and faster, without replacing the human judgment that clients are paying for.

---

## How to drop in final images

Image slots are marked with `TODO(human:image-*)` comments in the code. To replace a placeholder:

1. Source a free image (Unsplash or Pexels — free for commercial use, no attribution required for most):
   - Search: "Lagos skyline night", "African European business professionals", "global trade office"
   - Download the image at 2x the display size (e.g. for a 1200px-wide hero, download at 2400px)
2. Convert to WebP if possible (free: squoosh.app or cloudconvert.com)
3. Drop it in `public/images/` at the filename noted in the TODO comment
4. In the component file, replace the placeholder `<div>` with a Next.js `<Image>` tag:
   ```tsx
   import Image from "next/image"
   // ...
   <Image src="/images/hero-bg.jpg" alt="..." fill className="object-cover" />
   ```

For the hero, you want an image with clear foreground/background separation (subject on left, background on right) so the parallax layers work well.

---

## How to change copy

All copy lives directly in the page component files:

| Page | File |
|---|---|
| Home | `src/app/page.tsx` + `src/components/Hero.tsx`, `PremiumServicesBand.tsx`, etc. |
| About | `src/app/about/page.tsx` |
| Services | `src/app/services/page.tsx` |
| Sectors | `src/app/sectors/page.tsx` |
| Our Model | `src/app/model/page.tsx` |
| Partner | `src/app/partner/page.tsx` |
| Contact | `src/app/contact/page.tsx` |
| Nav / Footer | `src/components/Nav.tsx`, `src/components/Footer.tsx` |

Edit the string directly in the file. Next.js hot-reloads in dev mode.

---

## How to add a blog post

Content lives in `src/content/insights/` as MDX files. Each file = one post.

### Option A — Write it yourself

1. Create `src/content/insights/your-post-slug.mdx`
2. Add frontmatter:
   ```mdx
   ---
   title: "Your Post Title"
   slug: "your-post-slug"
   date: "2026-05-24"
   excerpt: "One-sentence summary shown in the listing card."
   tags: ["market-entry", "nigeria"]
   draft: false
   ---
   
   Post content here (Markdown/MDX)…
   ```
3. Commit and push — Vercel deploys automatically, post appears at `/insights/your-post-slug`

Set `draft: true` to commit the file without it appearing on the site. Change to `draft: false` when ready to publish.

### Option B — AI-assisted drafting (internal helper)

A protected `/api/draft` route generates a first draft in Karagateway's voice. You **must** review and edit the output before committing.

**Setup:** add `DRAFT_SECRET=your-random-secret` to `.env.local` and Vercel env vars.

**Usage (from your terminal):**
```bash
curl -s -X POST http://localhost:3000/api/draft \
  -H "Content-Type: application/json" \
  -d '{"secret":"your-random-secret","title":"Top Nigerian Exports in 2026","brief":"Cover agro-processing, textiles, and tech services. Mention NAFDAC and NXP."}' \
  | jq -r '.mdx'
```

The response is valid MDX. Paste it into a new file in `src/content/insights/`, review it carefully, edit as needed, then change `draft: false` and commit. **Never publish AI content without reading it first.**

---

## Expected monthly cost

| Scenario | Cost |
|---|---|
| Chatbot on free Gemini, assessment on OpenRouter (default) | **~$0–$2/month** at launch volumes (< $0.001 per assessment call) |
| Both AI features on free Gemini | **$0** — but see EU data note; not recommended for the assessment |
| Chatbot on Gemini, assessment on Claude Haiku 4.5 | Roughly **$0–$5/month** (Claude assessment costs < $0.01 per submission) |
| Hosting (Vercel Hobby) | **$0** |
| Email (Resend free tier) | **$0** up to 3,000 emails/month |
| **Realistic launch total** | **$0–$2/month** |

If traffic grows significantly, upgrade Vercel to Pro ($20/month) and watch the Gemini rate-limit dashboard.

---

## Logo

- `public/brand/logo-dark.png` — the standard logo (dark charcoal + orange on white), for light-background placements. Used with CSS `mix-blend-mode: multiply` so the white background disappears on cream/white surfaces.
- `public/brand/logo-light.png` — **TODO(human:logo-on-dark)** — needs to be supplied: a standalone PNG of the white/light version of the logo (transparent background). When dropped in, the nav and footer automatically switch to it on dark backgrounds.

The `<Logo />` component (`src/components/Logo.tsx`) is the single source of truth for the logo across the site. Change it once, it updates everywhere.
