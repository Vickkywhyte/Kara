# Karagateway Website

Next.js 16 + Tailwind CSS 4 website for [Karagateway](https://karagateway.com) — boutique Africa↔Global market-entry advisory.

Built in phases per `KARAGATEWAY_BUILD_SPEC_v2.md`.  
**Current status:** Phase 0 (scaffold) + Phase 1 (full site, forms) — complete.  
AI features (Phase 2 assessment, Phase 3 chatbot) come next.

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
| `GEMINI_API_KEY` | [aistudio.google.com](https://aistudio.google.com) — **FREE, no credit card** | Phase 3 (chatbot) |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) — paid, pennies/call | Phase 2 (assessment) |
| `AI_PROVIDER_CHATBOT` | `gemini` or `claude` — default `gemini` (free) | Phase 3 |
| `AI_PROVIDER_ASSESSMENT` | `gemini` or `claude` — default `claude` | Phase 2 |
| `RESEND_API_KEY` | [resend.com](https://resend.com) — free tier (3,000 emails/month) | Phase 1 (lead emails) |
| `LEADS_NOTIFY_EMAIL` | Your notification email — default `info@karagateway.com` | Phase 1 |
| `NEXT_PUBLIC_CALCOM_LINK` | Your Cal.com or Calendly URL | Phase 1 (booking CTAs) |

### How to switch AI providers

The backend is **provider-agnostic**. One env var change, no code change:

```bash
# Run everything free on Gemini
AI_PROVIDER_CHATBOT=gemini
AI_PROVIDER_ASSESSMENT=gemini   # see EU data note below

# Use Claude for the assessment (recommended for EU clients)
AI_PROVIDER_ASSESSMENT=claude
```

**EU data tradeoff (important):** On Gemini's free tier, submitted data may be used by Google for model training, and commercial use is carved out for EU/EEA/UK/Switzerland. Because Karagateway is EU-based (Estonia) and captures EU business leads in the assessment, the default is `claude` for the assessment — cleaner commercial-data terms. The chatbot handles general trade questions (less sensitive), so `gemini` is fine there. If you want to switch the assessment to Gemini, change `AI_PROVIDER_ASSESSMENT=gemini` — but understand the tradeoff first.

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
| `POST /api/chat` | *(Phase 3)* Validates chat transcript → calls `lib/ai.ts` (provider per `AI_PROVIDER_CHATBOT`, default Gemini free) → returns reply. |

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

## How to add a blog post (Phase 4)

*(Phase 4 is not yet built — this is the plan.)*

1. Create a file in `src/content/insights/` named `your-post-slug.mdx`
2. Add frontmatter at the top:
   ```mdx
   ---
   title: "Your Post Title"
   slug: "your-post-slug"
   date: "2026-05-23"
   excerpt: "One-sentence summary."
   tags: ["market-entry", "nigeria"]
   ---
   
   Your post content here…
   ```
3. Commit and push — Vercel deploys automatically
4. The post appears at `/insights/your-post-slug`

AI-drafted posts are written as draft files using Claude Code, then reviewed by you before committing. **Never commit unreviewed AI content.**

---

## Expected monthly cost

| Scenario | Cost |
|---|---|
| Both AI features on free Gemini | **$0** (zero, unless you exceed Gemini's free-tier rate limits) |
| Chatbot on Gemini, assessment on Claude Haiku 4.5 | Roughly **$0–$5/month** depending on traffic (Claude assessment costs < $0.01 per submission) |
| Hosting (Vercel Hobby) | **$0** |
| Email (Resend free tier) | **$0** up to 3,000 emails/month |
| **Realistic launch total** | **$0–$5/month** |

If traffic grows significantly, upgrade Vercel to Pro ($20/month) and watch the Gemini rate-limit dashboard.

---

## Logo

- `public/brand/logo-dark.png` — the standard logo (dark charcoal + orange on white), for light-background placements. Used with CSS `mix-blend-mode: multiply` so the white background disappears on cream/white surfaces.
- `public/brand/logo-light.png` — **TODO(human:logo-on-dark)** — needs to be supplied: a standalone PNG of the white/light version of the logo (transparent background). When dropped in, the nav and footer automatically switch to it on dark backgrounds.

The `<Logo />` component (`src/components/Logo.tsx`) is the single source of truth for the logo across the site. Change it once, it updates everywhere.
