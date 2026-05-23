# Karagateway — Website Revamp Build Specification (v2)

> **This document is written to be handed directly to Claude Code.** It is the single source of truth for rebuilding the Karagateway website with: an AI Market-Entry Assessment tool, a grounded trade chatbot (runnable **100% free** on Google Gemini), AI-assisted content, expanded trade-facilitation services, a cinematic African-European visual system, and rewritten copy. Read it top to bottom before writing any code. Build in the phases described in Section 9 — do not attempt everything at once.
>
> **v2 additions:** (1) a concrete, feasible **Trade Facilitation activity set** (Section 5.5a); (2) a **free AI integration** path via Google Gemini with a provider-agnostic backend and an honest EU-data tradeoff (Sections 2.3, 3.1, 7.1a); (3) a full **cinematic visual / design system** with a zero-budget asset pipeline (Section 6).

---

## 0. How to use this document (instructions to Claude Code)

- Treat **Section 1 (Project Context)** and **Section 2 (Guardrails)** as binding. Every decision must respect them.
- Build **phase by phase** (Section 9). After each phase, stop, summarize what was built, and wait for the human to test before continuing.
- The human is a **non-technical / low-budget founder building solo with Claude Code**. Optimize every choice for: (a) lowest running cost, (b) fewest moving parts, (c) free tiers wherever possible. When two approaches work, pick the cheaper, simpler one and say why.
- **Never** put an API key in client-side code. All Claude API calls go through a serverless function. This is non-negotiable (Section 2).
- When you need a decision the human must make (a domain, an API key, a Calendly link), **stop and ask** rather than inventing a placeholder that silently breaks in production. Use clearly-marked `TODO(human):` comments for anything they must supply.
- Prefer editing real files over describing changes. Keep commits small and logically grouped.

---

## 1. Project context

### 1.1 What Karagateway actually is
Karagateway is **not** a generic trade marketplace. It is a **boutique Africa↔Global market-entry advisory and execution firm**, operated by a founder with on-the-ground presence in Lagos (expanding to one other African city). The real, differentiated, high-margin services are:

1. **Country-Manager-as-a-Service** — the founder acts as the on-the-ground representative in Lagos for 3–7 EU/global clients simultaneously (meetings, lead follow-up, regulatory legwork, weekly updates, events). Retainer + commission.
2. **Distributor / Reseller / Channel-Partner Sourcing** — shortlisting, reference-checking, contracting, and managing channel partners in Nigeria/Kenya/Ghana. Finder's fee + management retainer.
3. **Soft-Landing Package** — incorporation (CAC), tax registration, corporate bank account setup, virtual office, first hires. Setup fee + retainer. (Payroll/employment is **partnered out** to an EoR — Karagateway sources and recruits, the EoR handles compliance.)
4. **Localization & Go-to-Market Adaptation** — local-currency pricing, local payment methods (Paystack, Flutterwave, OPay, M-Pesa, MTN MoMo), KYC flows for local ID systems (NIN, BVN), cultural/lead-gen adaptation. Project-based per market launch.

Plus the broader supporting services already on the site: Trade Facilitation, Logistics & Supply Chain, Compliance & Regulatory Guidance, Market Access & Business Development, Trade Advisory & Strategy, Investment & Partnership Facilitation.

### 1.2 The strategic moat (this drives every product decision)
**The moat is trust + physical on-the-ground presence, not technology.** AI must make the founder *faster and look bigger than a one-person firm*, and must capture and qualify leads. AI must **never** replace the human judgment that clients are paying for, and must never auto-publish compliance claims or auto-match partners. A fully automated marketplace would destroy the premium — explicitly out of scope.

### 1.3 Audience
- **Primary:** EU/global SME decision-makers (founders, heads of expansion) exploring entry into African markets (Nigeria first, then Kenya/Ghana).
- **Secondary:** African producers/exporters seeking global buyers; logistics providers; investors.

### 1.4 Sectors served
Agriculture & Agro-Processing; Manufacturing & Industrial Goods; Consumer Goods & Retail; Technology & Innovation; Healthcare & Pharmaceuticals; Energy & Natural Resources.

### 1.5 Known contact + brand facts (from the existing site)
- Phone: **+372 5394 5725** (Estonia number)
- Email: **info@karagateway.com**
- LinkedIn company, X/Twitter (@karagateway), Instagram, Facebook — links to be supplied by human as `TODO(human:social-links)`.
- Existing host: **Vercel** (the prior site metadata pointed to `karagateway.vercel.app`). Brand theme color seen in metadata: **`#876e4b`** (a tan/gold). Treat this as a *starting* brand color, not a mandate — see Section 6 on design.
- Domain: **karagateway.com**

---

## 2. Guardrails (binding constraints)

### 2.1 Security
- **No API keys in the browser, ever.** The Claude API key lives only in a server environment variable (`ANTHROPIC_API_KEY`) and is used only inside serverless functions.
- All AI features call the model through a backend endpoint the site owns (`/api/...`). The browser talks to *your* endpoint; only the endpoint talks to Anthropic.
- Validate and rate-limit every public endpoint (Section 8) to prevent someone draining the API budget.
- No collection of sensitive personal/financial data in any form (no bank details, no ID numbers). Forms collect business contact info only.

### 2.2 AI behavior
- The chatbot and assessment tool answer **only** questions within Karagateway's domain (Africa trade, market entry, the company's services). They must **politely decline / redirect** off-topic questions rather than guess.
- **No fabricated specifics.** The AI must not state exact figures, fees, processing times, or legal/regulatory facts as guaranteed. It frames them as *general guidance* and routes the user to a human consultation for anything binding. This protects the firm's credibility, which is its core asset.
- All AI-generated *content* (blog posts, insights) is **draft-only for human review**, never auto-published.
- Every AI surface ends a substantive answer with a soft call-to-action toward booking a consultation.

### 2.3 Cost
- **Default to free.** The chatbot runs on **Google Gemini's free tier** (no cost, no credit card). The site can launch with **zero AI spend**.
- The lead-capturing **assessment** defaults to **Claude (paid, pennies per submission)** for cleaner EU commercial-data terms (Section 7.1a), but can be switched to free Gemini via config if the founder accepts the data tradeoff.
- The backend is **provider-agnostic** (Section 7.1a): swapping a feature between Gemini and Claude is a one-line config change, never a rewrite.
- Apply **prompt caching** (Claude) / **context caching** (Gemini) on system prompts, and keep `max_tokens` and system prompts lean.
- Respect free-tier rate limits with **exponential-backoff retries** on 429 responses (Section 7.1a).

---

## 3. Recommended tech stack (lowest-cost, simplest path)

Chosen to match a solo, non-technical, no-budget founder deploying on Vercel:

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router)** | One project gives both the website *and* the serverless API routes — no separate backend to manage. First-class on Vercel. |
| Hosting | **Vercel (free Hobby tier)** | Already in use; free; serverless functions included; Git push to deploy. |
| Styling | **Tailwind CSS** | Fast, no separate CSS files to wrangle, great with Claude Code. |
| Components | Hand-built + a few **shadcn/ui** primitives | Avoids heavy dependencies; keeps the site distinctive (Section 6). |
| AI | **Provider-agnostic** — **Google Gemini (free tier)** for the chatbot, optionally **Anthropic Messages API** for the assessment | Called only from `/api` routes. Gemini's free tier costs nothing and needs no credit card; see Section 7.1a for which feature goes where and the EU-data tradeoff. |
| Forms / leads | **Form → serverless route → email + lightweight store** | See Section 8.4. Start with email (Resend free tier) + a simple table. Upgrade to a CRM later. |
| Booking | **Cal.com embed** (open-source, free tier) or Calendly | Section 8.5. |
| Content store | **Markdown files in the repo** (MDX) for the blog/insights | Zero database cost; version-controlled; Claude Code can draft posts as files. |

> If the human already started a non-Next setup (e.g. Vite + React static), Claude Code should ask before migrating. The cleanest path is Next.js because it bundles the API layer the AI features require.

### 3.1 Environment variables (`.env.local`, never committed)
```
# AI providers — the backend is provider-agnostic (see Section 7.1a). You can run
# 100% free on Gemini, or use Claude for the assessment. Set whichever you use.
GEMINI_API_KEY=           # TODO(human): FREE, no credit card — from aistudio.google.com
ANTHROPIC_API_KEY=        # TODO(human): optional/paid — from console.anthropic.com (for the assessment, recommended for EU data terms)
AI_PROVIDER_CHATBOT=gemini      # gemini | claude  — default free
AI_PROVIDER_ASSESSMENT=claude   # gemini | claude  — see Section 7.1a for the EU-data tradeoff

RESEND_API_KEY=           # TODO(human): for lead-notification emails (optional, free tier)
LEADS_NOTIFY_EMAIL=info@karagateway.com
NEXT_PUBLIC_CALCOM_LINK=  # TODO(human): your Cal.com or Calendly booking URL
```

---

## 4. Sitemap & page structure

Rebuild the existing structure (the source content is in Section 5) but **lead with the premium services**. Pages/sections:

1. **Home** — hero, quick snapshot, animated stats, the **AI Market-Entry Assessment** as the hero conversion element, premium-services teaser, model loop teaser, CTA.
2. **About** — Connecting Africa and the World; Team; Vision; Mission; Values; Impact; Get in touch.
3. **Services** — full grid. **Reorder so the four premium services (1.1 above) appear first and most prominently**, with the six supporting services below. Each service is a tile with a short description and a "Discuss this" CTA that opens booking or the contact form prefilled with that service.
4. **Sectors We Serve** — 6-sector grid.
5. **Our Model** — "The Karagateway Trade Loop," the 4-phase system (replaces any "How it works"). Remove the old AI-generated icons noted in the source; clean iconography only.
6. **Partner With Us** — partner types, why partner, and the partner intake form (Section 8.4) with three contact paths (form / book a call / email).
7. **Insights & Resources** — blog/MDX index. Launch with 3–4 seed articles (drafted by AI, human-reviewed). *Phase 4.*
8. **Contact / Get Started** — form + phone + email + socials.
9. Global: **Chatbot widget** (Section 8.2) available on every page.

### 4.1 Navigation
Primary nav: Home · Services · Our Model · Sectors · Partner · Insights · Contact. Persistent "Start Your Trade Journey" button (opens the assessment or the intake form). Persistent, subtle chatbot launcher bottom-right.

---

## 5. Copy & content (rewrite + source of truth)

Use this as the canonical copy. Where it says **[REWRITE]**, the existing copy was generic — replace with the sharper version provided.

### 5.1 Home — hero
- **Headline:** "Where Global Innovations and Opportunities Meet African Excellence"
- **Tagline:** "We help businesses across continents discover new markets, forge partnerships, and grow sustainably."
- **Primary CTA button:** **"Start Your Trade Journey"** (opens the AI assessment). Secondary: **"Partner with Us."**
- **Quick snapshot:** "Bringing the world's innovations to Africa — and Africa's excellence to the world through trade."
- **Animated stats:** 🌍 2 continents already connected · 📦 50+ products sourced · 🤝 Trusted by 5+ SMEs, governments & trade groups.

### 5.2 Home — premium services teaser **[REWRITE — this is the most important copy change]**
Add a band directly under the hero that surfaces the real offer instead of generic "we facilitate trade." Suggested copy:

> **Your team on the ground in Africa.**
> Most firms hand you a report and wish you luck. We become your local presence — taking meetings in Lagos, vetting your distributors in person, handling incorporation and your first hires, and adapting your product to how Africa actually buys. Market entry, executed.

With four mini-cards linking to the premium services (Country Manager-as-a-Service, Channel-Partner Sourcing, Soft-Landing, Localization).

### 5.3 "Start Your Trade Journey" form (fallback / non-assessment path)
Free-text fields: Name · Type of business / sector · Expansion goal / interest / message · Contact info (email). Submit button labeled **"Submit"** (not "Get started"). On success: "Thanks for providing your information — a member of our team will get in touch within 24 hours."

### 5.4 About Us (use existing, lightly tightened)
- **Intro:** Karagateway simplifies international trade, helping African producers reach global markets while enabling international businesses to access opportunities across Africa. Expert guidance, streamlined cross-border operations, support on both sides to grow confidently.
- **Bridge paragraph:** We bridge complex trade processes with real opportunities so businesses can focus on growth and innovation — through expertise, networks, and advisory support that create seamless connections benefiting African producers and global partners alike.
- **Our Team:** Hands-on experience with deep cultural and market insight, backed by a network of advisors and specialists across compliance, logistics, and trade. The team leverages knowledge of global and African markets, trade regulations, and business culture across every stage — sourcing, logistics, partnerships, compliance, market expansion.
- **Vision:** "Connecting Africa and the world through trade, opportunity, and innovation that empowers communities and showcases excellence."
- **Mission:** "We help African producers reach global markets and bring global innovations to Africa, guiding partnerships from opportunity to impact."
- **Values:** **Trust** (transparent, reliable partnerships) · **Inclusivity** (opportunity for African businesses and global partners alike) · **Impact** (growth, innovation, sustainable development) · **Excellence** (professional, high-quality service). Render each with an icon.
- **Impact:** Karagateway empowers African producers to access global markets while connecting international businesses to African opportunities; partnerships foster growth, knowledge exchange, and innovation. Optional world-map graphic of trade connections.

### 5.5 Services — headline & tiles
- **Headline:** "Trade is just the beginning."
- **Description:** "Our end-to-end services ensure your products move smoothly, globally."

**Premium services (show first):**
| Service | One-line for the tile |
|---|---|
| Country Manager-as-a-Service | "Your on-the-ground representative in Lagos — taking meetings, chasing leads, and reporting weekly, for a fraction of a local hire." |
| Channel-Partner & Distributor Sourcing | "We shortlist, reference-check in person, and manage the partners who'll actually move your volume." |
| Soft-Landing Package | "Incorporation, banking, virtual office, and your first hires — your African entity, set up and running." |
| Localization & Go-to-Market | "Local pricing, local payment rails, local onboarding — your product adapted to how Africa buys." |

**Supporting services (show below):** Trade Facilitation (globe/handshake) · Logistics & Supply Chain (shipping/truck) · Compliance & Regulatory Guidance (checklist) · Market Access & Business Development (chart) · Trade Advisory & Strategy (lightbulb/graph) · Investment & Partnership Facilitation (network).

#### 5.5a Trade Facilitation — concrete activities (the feasible, in-scope set)
The original site treated "Trade Facilitation" as a single vague tile. Break it into the **specific, deliverable activities the firm can realistically do** (a solo, on-the-ground founder with a local network — no warehouses, no balance sheet, no licenses required). These are the day-to-day "trade is just the beginning" deliverables that sit underneath the four premium services. Render as an expandable list or sub-grid under the Trade Facilitation tile / on a dedicated Services detail section:

1. **Buyer & supplier sourcing and introductions** — identify and warm-introduce vetted counterparties on either side (export-ready African producers ↔ credible global buyers). The firm's local network is the value; this is matchmaking *done by a trusted human*, not an automated marketplace.
2. **Partner vetting & reference checks** — in-person/site-visit verification of a potential supplier or distributor: do they actually have the capacity, volume, and documentation they claim. (This is where on-the-ground presence beats a desk search.)
3. **Export-readiness assessment** — review a producer's quality, volume, packaging, labeling, and documentation against target-market requirements; flag gaps before a deal is attempted.
4. **Documentation & paperwork guidance** — explain and help assemble the export/import document set (invoices, packing lists, certificates of origin, required permits) — *guidance and coordination*, not acting as a licensed customs broker.
5. **Customs & logistics coordination** — connect partners to vetted freight forwarders / customs agents and coordinate the hand-off; advise on routes and incoterms. The firm orchestrates; licensed providers execute.
6. **Certification & compliance navigation** — map which certifications/registrations a product needs for a given market (e.g. for Nigeria: the relevant agencies for regulated goods) and shepherd the application — *as guidance, routed to specialists for anything binding*.
7. **Trade-finance & payment introductions** — connect partners to trade-finance providers and the right local payment rails (Paystack, Flutterwave, OPay, M-Pesa, MTN MoMo); advise on payment-risk structuring (e.g. milestones, escrow via third parties). The firm introduces and advises; it does **not** hold or move client funds.
8. **Sample & first-shipment coordination** — manage the logistics of samples and the critical first pilot shipment, the stage where most new trade relationships break.
9. **Packaging, labeling & cultural adaptation advice** — align a product's presentation with the destination market's regulations and buyer expectations.
10. **Post-deal follow-through & relationship management** — monitor the first 3–6 months of a new trade relationship, resolve friction, and tee up repeat orders (this feeds directly into the "Grow & Scale" phase of the model and into recurring retainers).

**Boundary (keep in scope, protect the model):** the firm **facilitates, coordinates, vets, and advises** — it does not become a licensed customs broker, a freight carrier, a bank, or a money-transmitter, and it does not hold client funds or take title to goods. Every regulated execution step is routed to a vetted licensed partner. This keeps the business legally light, asset-light, and centered on its real moat: trust and local presence. Public copy should describe these as benefits ("we coordinate your first shipment end-to-end"), not as regulated services the firm performs itself.

> **Note:** In public-facing tiles, describe the premium services in benefit terms (as above). Keep specific pricing (retainers, fees) **out** of public copy — those belong in a consultation. Pricing reference is retained internally in Section 5.9.

### 5.6 Sectors We Serve
- **Headline:** "Industries We Support." **Description:** "Connecting businesses across diverse sectors for global trade opportunities."
- Tiles: Agriculture & Agro-Processing (leaf/farm) · Manufacturing & Industrial Goods (factory/gears) · Consumer Goods & Retail (cart) · Technology & Innovation (laptop/lightbulb) · Healthcare & Pharmaceuticals (medical cross) · Energy & Natural Resources (solar/bolt). Footer line: "Don't see your business category? Get in touch."

### 5.7 Our Model — "The Karagateway Trade Loop"
Intro: "We designed our model to be practical, partnership-driven, and adaptable across multiple sectors. It's a 4-phase system that helps African and international businesses trade smarter, faster, and more ethically."
1. **Discover Opportunities** — "The right trade starts with the right insight." Research high-demand products both ways; use market data + on-ground intelligence; identify gaps and trends; curate export-ready producers and credible buyers. *Example: Ghanaian cocoa co-ops ready for ethical sourcing deals in Europe.*
2. **Match & Verify Partners** — "Trade needs trust. We help build it." Screen and vet; ensure export readiness (quality, volume, documentation); use trusted networks, site visits, compliance tools; match on product, capacity, values. *Example: a Baltic dairy producer with a licensed African food distributor.*
3. **Facilitate the Trade Process** — "We simplify the hard stuff." Guide export/import requirements; support logistics, customs, certificates, licenses; advise on packaging, labeling, cultural standards; link to trade-finance partners. *Example: Nigerian textile exporters with EU customs paperwork and shipping routes.*
4. **Grow & Scale** — "We don't stop at the first shipment." Monitor outcomes; offer insights to improve deals; help expand to new regions/categories; build long-term relationships. *Example: a Lithuanian solar firm expanding from East Africa to Francophone West Africa.*
Closing: "Our loop never ends — each cycle strengthens knowledge, trust, and growth." CTA: **Get Started**. **Remove the old AI-generated icons** from this section per the source note; use clean, consistent iconography.

### 5.8 Partner With Us
Intro: "Karagateway partners with producers, exporters, importers, and service providers to create seamless trade opportunities across Africa and the world. By joining our network you gain access to verified partners, market insights, compliance expertise, and end-to-end support."
- **Who can partner:** Producers & Suppliers · Buyers & Distributors · Logistics & Service Providers · Investors & Strategic Partners (each with an icon and one-line description from the source).
- **Why partner:** Access verified partners · Simplified trade processes · Market insights & growth opportunities · Ethical & transparent collaboration.
- **Three contact paths:** (A) Direct partner intake form — fields in Section 8.4; (B) **Schedule a call** (Cal.com); (C) Email (mailto). Form success message: "Thanks for providing your information — a member of our team will get in touch within 24 hours."

### 5.9 Internal pricing reference (DO NOT publish on the site — for AI lead-qualification context only, kept server-side)
- Country Manager-as-a-Service: €1,500–3,500/month retainer per client + commission on closed deals/hires.
- Channel-Partner Sourcing: €5–12K finder's fee + €500–1,500/month management retainer.
- Soft-Landing: €4–8K one-off setup + ongoing admin retainer (employment/payroll partnered to an EoR such as Workpay/Workforce Africa/Native Teams).
- Localization & GTM: project-based, €3–10K per market-launch sprint.

> This pricing is **internal context only**. The AI may use it to gauge fit and qualify a lead's seriousness, but must **not** quote exact figures as firm prices — it points the user to a consultation for pricing.

### 5.10 Contact
Form (Name, Company, Region, Trade interest) + Phone +372 5394 5725 + info@karagateway.com + social links (`TODO(human:social-links)`).

---

## 6. Design direction & cinematic visual system

This site must look like a **high-end financial / tech brand** (reference mood: Stripe, Monzo, with A24-film cinematic richness) — ambitious, trustworthy, sophisticated, globally connected. Not a busy SaaS template, not flat clip-art. The firm sells trust and seniority; the visual system is part of the credibility.

### 6.1 Core aesthetic
- **Concept:** a seamless fusion of **African and European aesthetics** — warm earth tones (terracotta, gold, savanna amber) contrasted with refined European minimalism (cream, slate, navy). Premium, editorial, generous negative space, confident typography, restraint over clutter.
- **Mood words to encode in every choice:** ambitious · trustworthy · sophisticated · globally-connected.
- **Banned:** flat vectors, cartoon styles, generic stock-photo clichés, "AI slop" (Inter/Roboto/Arial defaults, purple-gradient-on-white, cookie-cutter card grids, uniform rounded corners everywhere).

### 6.2 Color system (CSS variables / Tailwind theme tokens)
Build a cohesive token set fusing the two palettes. Suggested direction (Claude Code may refine for contrast/accessibility but must keep the fusion concept):
- **Warm/African:** terracotta, gold (anchor on the existing brand `#876e4b` as the gold), savanna amber.
- **Cool/European:** cream (off-white base), slate, deep navy (for depth and trust).
- Use a **dominant neutral base with sharp warm-gold accents** — not an even rainbow. Define light and dark surface tokens; the hero can run dark/cinematic, content sections lighter and editorial.

### 6.3 Typography
- Distinctive **display face** for headings (characterful — a refined serif or a high-contrast display sans reads "premium advisory") paired with a **clean, highly readable body face**. Avoid Inter/Roboto/Arial/system defaults. Use a free, self-hostable family (e.g. via Fontsource) so there's no licensing cost.

### 6.4 Motion & depth (cinematic, performance-aware)
Translate the "cinematic, motion-ready" brief into **lightweight, code-driven** effects (no heavy video files that blow the free hosting bandwidth):
- **Parallax-ready layered hero:** compose the hero from separate depth layers (background scene → mid geometric elements → foreground content) so they can shift on scroll/pointer.
- **Floating geometric elements & gentle particle/data-flow effects** suggesting connectivity — implemented in CSS/Canvas, kept subtle, paused under `prefers-reduced-motion`.
- **One orchestrated page-load reveal per page** (staggered `animation-delay`), plus the **animated stats counter** on the home hero and subtle tile hover states.
- **Transition treatments from the brief:** overlapping **diagonal slices** between sections, smooth **gradient reveals**, and **depth-of-field** shifts (CSS blur on background layers) — used sparingly at high-impact moments, not everywhere.
- **Performance budget:** prioritize CSS/Canvas over large media; lazy-load anything heavy; the cinematic feel comes from composition and motion, not multi-MB video. Target a good mobile Lighthouse score (the African-side audience is heavily mobile).

### 6.5 Imagery & art direction (the visual brief)
**Target look (art-direction brief to use when sourcing or generating images):**

> Ultra-high-definition, cinematic web assets for a premium global-trade platform. Seamless fusion of African and European aesthetics — warm earth tones (terracotta, gold, savanna amber) against refined European minimalism (cream, slate, navy). **Realistic, high-fidelity photography (not illustrations)** of diverse African and European business professionals collaborating — shaking hands, reviewing documents on premium devices. Background scenes: modern glass-and-stone architecture with African-textile accents; sunrise over the Lagos skyline merging with London/Paris landmarks. Composition built for motion: clear foreground/midground/background separation for parallax, room for overlapping diagonal slices and gradient reveals, shallow depth-of-field. Mood: ambitious, trustworthy, sophisticated, globally connected. High-end financial/tech-brand feel (Stripe / Monzo / A24). No flat vectors, no cartoons. Deliver hero crops in **16:9 and 2:1**, with foreground subjects separable from background for layered/parallax integration.

**How to actually get these on a ZERO budget (important — the founder cannot pay):**
1. **Free stock photography (recommended primary source):** pull realistic, high-resolution images matching the brief from **Unsplash, Pexels, and Pexels-style free libraries** (free for commercial use, no attribution required for most). Search terms: "African European business meeting," "Lagos skyline," "diverse professionals handshake," "global trade office." Curate for the warm-meets-minimal palette. *This is the realistic path for launch.*
2. **Free AI image generation (optional, for unique hero/atmosphere shots):** the brief in this section is written to be **pasted directly into a free image generator** — e.g. Google's image generation in **Google AI Studio (free tier)**, Bing/Microsoft Image Creator, or similar no-cost tools — to produce bespoke hero backgrounds. **Caveat:** review for realism (AI can produce uncanny faces/hands) and, for anything customer-facing, prefer real stock photos of people; use AI mainly for *backgrounds, textures, and atmospheric layers*, not for fake "client" faces.
3. **Layer separation for parallax:** for hero depth, either pick images with a clear subject/background, or separate a subject from its background using a **free** tool (e.g. browser-based background removers) to create the foreground PNG layer. Provide all image slots as `TODO(human:image)` with the exact crop/aspect noted, so the founder can drop finals in without touching code.
4. **Optimization:** serve images via Next.js `<Image>` (automatic resizing/lazy-load); export at sensible sizes; use `webp/avif`. Keep total hero payload small to protect free-tier bandwidth.

**Placeholders:** until real assets are supplied, generate tasteful CSS gradient-mesh / geometric placeholder layers in the brand palette (never ship lorem-ipsum grey boxes or stock-photo clichés). The site must look intentional even before final imagery lands.

### 6.6 Accessibility & responsiveness
Mobile-first; WCAG-aware contrast (verify the gold-on-light and text-on-dark-hero combinations pass); fully keyboard-navigable; all motion respects `prefers-reduced-motion`; images carry meaningful `alt` text.

---

## 7. AI feature specs

### 7.1 Models & current pricing (verified May 2026)
Per million tokens (input / output):
- **Claude Haiku 4.5** — $1.00 / $5.00 — *cheapest Claude; default for the paid assessment.*
- **Claude Sonnet 4.6** — $3.00 / $15.00 — *use only if assessment quality needs it.*
- **Claude Opus 4.7** — $5.00 / $25.00 — *not needed for this site.*
Cost levers to apply: **prompt caching** (up to ~90% off the cached system-prompt portion) and tight `max_tokens`. A typical assessment call (a few thousand input tokens, ~800 output) on Haiku 4.5 costs well under one US cent. Model IDs change over time — Claude Code should confirm the exact current model string from the Anthropic SDK/docs at build time rather than hard-coding from memory.

### 7.1a Free AI option (Google Gemini) + provider-agnostic backend
**You can run this site for free.** Google's Gemini API has a genuine free tier — **no cost, no credit card** — with capable models (Gemini 2.5 Flash / Flash-Lite). Get a key at aistudio.google.com.

**The honest tradeoffs (Claude Code must surface these in the README):**
- **Rate limits (free tier, as of early 2026):** roughly Flash ≈ 10 requests/min & 250/day; Flash-Lite ≈ 15 requests/min & 1,000/day; 2.5 Pro ≈ 5 requests/min & 100/day. Fine for a low-traffic launch. **Required mitigation:** exponential-backoff retry (1s→2s→4s→8s) on `429` responses, plus the per-IP rate limiting already in Section 8.3.
- **Data/privacy + EU caveat — important for THIS business:** On Gemini's **free tier, submitted data may be used by Google for model training**, and Google's free-tier **commercial-use permission carves out the EU/EEA/UK/Switzerland.** Karagateway is EU-based (Estonia) and serves EU clients. This is **not legal advice**, but it means: do **not** route the lead-capturing assessment (which collects EU business prospects' details) through the free Gemini tier by default.

**Recommended split:**
- **Chatbot → Gemini free tier.** It answers general, non-sensitive trade questions; high volume; free is ideal.
- **Assessment → Claude (paid, pennies each).** It captures EU business leads' information; cleaner commercial-data terms; cost is negligible. Can be switched to Gemini via `AI_PROVIDER_ASSESSMENT=gemini` only if the founder explicitly accepts the data tradeoff.

**Provider-agnostic architecture (build this way):**
- Create a single internal module `lib/ai.ts` exposing one function, e.g. `generate({ system, messages, json, maxTokens, provider })`, that dispatches to either a Gemini adapter or a Claude adapter based on the `provider` argument (defaulting from the `AI_PROVIDER_*` env vars).
- Both adapters return the same normalized shape so `/api/chat` and `/api/assessment` never care which provider is active.
- Switching providers = changing one env var. No feature rewrite, no lock-in. This lets the founder start 100% free and selectively upgrade later.
- Confirm exact current model IDs for both providers from their official docs at build time.

### 7.2 Feature A — AI Market-Entry Assessment tool (flagship)
**Goal:** a EU/global SME answers a short structured set of questions and instantly receives a personalized 1-page "Market-Entry Snapshot." Doubles as the strongest lead-capture on the site.

**UX flow:**
1. Multi-step form (one question per step, progress indicator). Fields:
   - Company name (free text)
   - Sector (select from the 6 sectors + "Other")
   - Target market (Nigeria / Kenya / Ghana / "Other / not sure")
   - Stage (Just exploring / Have a product, no Africa presence / Already trading, want to scale)
   - What have you tried so far? (free text, optional)
   - Biggest concern (select: Finding partners / Regulation & compliance / Logistics / Local payments & pricing / Hiring & setup / Don't know yet)
   - Contact email (required to view the full snapshot — this is the lead capture)
2. On submit, the browser POSTs answers to `/api/assessment`. The route calls `lib/ai.generate()` (default provider Claude Haiku 4.5; switchable to Gemini per Section 7.1a) with a system prompt encoding Karagateway's expertise, the relevant African-market context, and the guardrails.
3. The model returns a structured snapshot rendered as a clean one-pager:
   - A short tailored summary of their situation
   - Likely key steps for their sector × market
   - Relevant local bodies/considerations *as general guidance* (e.g. for Nigeria: CAC for incorporation, NAFDAC for regulated goods, local payment rails) — **framed as guidance, never as guaranteed fact**
   - A rough sense of sequence/timeline ("typically", never a promise)
   - **Which Karagateway services fit** (mapped from their answers)
   - A clear CTA: "Book a free consultation to turn this into a plan."
4. The lead (all answers + email + the generated snapshot) is saved/notified server-side (Section 8.4).

**Output format:** instruct the model to return JSON with fixed keys (`summary`, `key_steps[]`, `local_considerations[]`, `recommended_services[]`, `timeline_note`, `cta`) so the front-end renders it reliably. Parse defensively; if parsing fails, show a graceful fallback and still capture the lead.

**System-prompt requirements:** encode (a) the firm's services and which answer-patterns map to which service, (b) accurate, conservative African-market context, (c) the guardrails from Section 2.2 verbatim (no firm figures, guidance-only, always route to consultation), (d) a warm, expert, concise tone.

### 7.3 Feature B — Grounded trade chatbot (embeddable widget)
**Goal:** a bottom-right chat launcher on every page that answers visitor questions about Africa trade and Karagateway's services, qualifies intent, and nudges toward booking.

**Behavior:**
- Knowledge is **grounded in Karagateway's own content** — pass the site's services/model/about copy (Section 5) into the system prompt as context (it's small enough to fit and cache). No external RAG/vector DB needed at launch; this keeps it free and simple. **Provider: free Gemini tier by default** (Section 7.1a), via `lib/ai.ts`.
- Strictly on-topic: answers Africa-trade / market-entry / company questions; politely declines unrelated requests ("I'm Karagateway's trade assistant — I can help with African market entry and our services. For that other topic I'd point you elsewhere.").
- Never quotes firm prices or guarantees regulatory specifics (Section 2.2); offers to book a consultation for anything binding.
- After a few exchanges or on any buying-intent signal, surfaces the **Book a consultation** button.
- Conversation state lives in the browser for the session; each request sends the running transcript to `/api/chat`. Keep the system prompt cached.

**UI:** small launcher button → panel with message list, input, send. Branded to the site. Clear "powered by AI — for general guidance" microcopy so visitors don't treat answers as binding advice (reinforces the credibility guardrail).

### 7.4 Feature C — AI-assisted content engine (Insights & Resources) — *later phase*
**Goal:** consistent SEO content for the Insights section, drafted with AI, **human-reviewed before publish**.
- Content lives as **MDX files in the repo** (no CMS cost). Each post = one file with frontmatter (title, slug, date, excerpt, tags).
- Provide an **internal-only** drafting helper (a script or a protected `/api/draft` route gated behind a secret, or simply done in Claude Code itself) that drafts a post from a title/brief in the firm's voice. Output is a draft file the founder edits and commits. **No public-facing auto-generation, no auto-publish.**
- Seed topics (from the source doc): "Top African Products in Demand Across Europe"; "EU Trade Compliance Essentials for African Exporters"; "Market Entry Checklist: Exporting to Africa." Add a "Trade Talks with Karagateway" series page stub for future podcast/video.

---

## 8. Backend / integration specs

### 8.1 API routes (Next.js, server-side only)
- `POST /api/assessment` — validate input → call `lib/ai.generate()` (provider per `AI_PROVIDER_ASSESSMENT`, default Claude; cached system prompt, JSON output) → persist+notify lead → return snapshot.
- `POST /api/chat` — validate transcript → call `lib/ai.generate()` (provider per `AI_PROVIDER_CHATBOT`, default free Gemini; cached system prompt) → return reply.
- `POST /api/lead` — generic intake (Start Your Trade Journey form, Partner form, Contact form) → persist+notify.
- (Later) `POST /api/draft` — protected content drafting; not public.
- All AI routes go through `lib/ai.ts` (Section 7.1a) and implement exponential-backoff retry on provider `429` responses.

### 8.2 Chatbot widget
Self-contained React component mounted globally; talks only to `/api/chat`. No third-party chat SaaS.

### 8.3 Rate limiting & abuse protection (REQUIRED)
- Per-IP rate limit on `/api/chat` and `/api/assessment` (e.g. a small fixed window). Use Vercel KV (free tier) or an in-memory limiter as a minimum.
- Cap transcript length and `max_tokens` server-side. Reject oversized payloads.
- This directly protects the founder's API budget — treat as a launch requirement, not a nice-to-have.

### 8.4 Leads → notification + store
- **Minimum viable:** on any lead, send an email to `LEADS_NOTIFY_EMAIL` via **Resend** (free tier) and append the lead to a simple store. Cheapest store options, in order: Vercel KV / a free Postgres (e.g. Neon free tier) / or, if truly avoiding all infra at first, a structured email is acceptable for launch.
- Fields captured: everything the form collected + timestamp + source page + (for assessment) the generated snapshot.
- **Upgrade path (document, don't build yet):** pipe leads into HubSpot free CRM later so follow-up doesn't live in an inbox. Given long sales cycles and multiple simultaneous clients, a CRM matters — but it's a Phase 5 enhancement.

### 8.5 Booking
- Embed **Cal.com** (open-source, free tier) or Calendly via `NEXT_PUBLIC_CALCOM_LINK`. Used by the "Book a consultation" CTAs across the assessment, chatbot, services tiles, and Partner page.

### 8.6 Forms — security
- Server-side validation on every field; basic spam protection (honeypot field + the rate limiter). No CAPTCHA-bypassing, no collecting sensitive financial/ID data.

---

## 9. Build phases (do these in order; stop for human testing between each)

**Phase 0 — Scaffold & deploy skeleton.** Next.js + Tailwind project; deploy a "hello world" to Vercel; wire env vars; confirm the deploy pipeline works. *Deliver: a live URL.*

**Phase 1 — Site rebuild with rewritten copy (no AI yet).** All pages/sections from Sections 4–6 with the Section 5 copy, premium services led first, design direction applied, fully responsive. Contact/intake forms POST to `/api/lead` with email notification. Cal.com booking embedded. *Deliver: a complete, launchable marketing site.*

**Phase 2 — AI Market-Entry Assessment (flagship).** Build `lib/ai.ts` (provider-agnostic adapter, Section 7.1a) + `/api/assessment` + the multi-step form + snapshot renderer + lead capture, with guardrails and caching. Default to Claude Haiku 4.5 for the assessment; only escalate to Sonnet 4.6 if quality testing requires it. *Deliver: working assessment that captures leads.*

**Phase 3 — Grounded chatbot widget (free).** Build `/api/chat` (default provider **free Gemini**) + the global widget, grounded in site content, on-topic-only, with exponential-backoff on 429s, per-IP rate limiting, and a booking CTA. *Deliver: live, zero-cost chatbot.*

**Phase 4 — Insights & Resources + AI-assisted drafting.** MDX blog, 3–4 human-reviewed seed posts, internal drafting helper. *Deliver: content section live.*

**Phase 5 (optional, later) — CRM + analytics.** Pipe leads to HubSpot free tier; add privacy-respecting analytics (e.g. Plausible/Umami). *Document now, build when there's lead volume to justify it.*

---

## 10. Acceptance criteria (definition of done per feature)

- **No API key is ever present in client-bundled code.** (Verify the production bundle.)
- Every AI surface refuses off-topic questions and never quotes firm prices or guarantees regulatory facts.
- Assessment returns a coherent, sector/market-tailored snapshot and captures the lead even if model output parsing fails.
- Chatbot stays on-topic, ends with a booking nudge on intent, and is rate-limited.
- All forms validate server-side, notify the founder, and store the lead.
- Site is responsive, accessible (keyboard + contrast + reduced-motion), and passes a Lighthouse pass on mobile.
- Running cost at launch is effectively just per-use API tokens (pennies) on otherwise free tiers; document the expected monthly cost range in the README.

---

## 11. Out of scope (do not build)
- An automated buyer↔seller matching marketplace or matching "algorithm" (contradicts the trust moat).
- Any fine-tuned/custom-trained model (unnecessary; off-the-shelf API + prompt is sufficient).
- Auto-publishing of AI content.
- Collection of any sensitive financial or government-ID data.
- Heavyweight CRM/infra before there's lead volume to justify it.

---

## 12. README requirements (Claude Code must produce this)
A root `README.md` covering: local setup, the full env-var list and where to get each key (including the **free** Gemini key from AI Studio), **how to switch AI providers** between free Gemini and paid Claude via the `AI_PROVIDER_*` env vars and the EU-data tradeoff (Section 7.1a), how to deploy to Vercel, how each `/api` route works, how to add a blog post (drop an MDX file), how to change copy, **how to drop in final images** at the `TODO(human:image)` slots and the recommended free image sources, the expected monthly cost range (can be **$0** if both AI features run on Gemini), and a plain-English "how the AI guardrails work" section the non-technical founder can understand.

---

*End of specification. Build in phases. When a human decision is required, stop and ask rather than guessing.*
