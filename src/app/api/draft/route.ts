/**
 * POST /api/draft — internal-only AI drafting helper.
 *
 * Protected by DRAFT_SECRET env var. Never exposed to the public; the
 * founder calls it from curl or a local script to generate a first draft
 * of an Insights post in Karagateway's voice, then reviews and commits it.
 *
 * Request body: { secret: string, title: string, brief?: string }
 * Response:     { ok: true, mdx: string }  — paste into src/content/insights/<slug>.mdx
 */

import { NextRequest, NextResponse } from "next/server"
import { generate } from "@/lib/ai"

const DRAFTING_SYSTEM = `You are a content writer for Karagateway — a boutique Africa↔Global market-entry advisory firm with on-the-ground presence in Lagos, Nigeria.

Write in Karagateway's editorial voice: authoritative but accessible, specific rather than vague, warm but never cheerful-corporate. The audience is international business leaders and African exporters who have practical trade questions.

Rules:
- Write substantive, accurate content about Africa trade, market entry, compliance, and Karagateway's services
- Never invent statistics — use hedged language ("typically," "in most cases") when specific figures are not verifiable
- Include a disclaimer if the post covers legal/regulatory topics: "This article is general educational guidance and should not be relied on as legal, financial, or regulatory advice."
- End every post with a brief call-to-action to book a consultation at Karagateway
- Use ## and ### headings, bullet lists where appropriate, and short paragraphs
- Length: 600–900 words of body copy (not counting the MDX frontmatter)
- Output ONLY valid MDX with frontmatter — no extra commentary, no code fences

Frontmatter schema (always include all fields):
---
title: "Post title"
slug: "url-safe-kebab-case-slug"
date: "YYYY-MM-DD"
excerpt: "One compelling sentence that summarises the post (shown in listing cards)."
tags: ["tag1", "tag2"]
draft: true
---

Note: set draft: true so the founder reviews before publishing (change to false to publish).`

export async function POST(req: NextRequest) {
  const secret = process.env.DRAFT_SECRET
  if (!secret) {
    return NextResponse.json({ ok: false, error: "DRAFT_SECRET not configured" }, { status: 500 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (body.secret !== secret) {
    // Respond identically to a missing field to avoid leaking whether the endpoint exists
    return NextResponse.json({ ok: false, error: "title_required" }, { status: 400 })
  }

  const title = typeof body.title === "string" ? body.title.trim().slice(0, 300) : ""
  if (!title) {
    return NextResponse.json({ ok: false, error: "title_required" }, { status: 400 })
  }

  const brief = typeof body.brief === "string" ? body.brief.trim().slice(0, 2000) : ""

  const prompt = brief
    ? `Write a Karagateway Insights post with the title: "${title}"\n\nBrief / key points to cover:\n${brief}`
    : `Write a Karagateway Insights post with the title: "${title}"`

  try {
    const result = await generate({
      system: DRAFTING_SYSTEM,
      messages: [{ role: "user", content: prompt }],
      maxTokens: 1800,
    })

    return NextResponse.json({ ok: true, mdx: result.text, provider: result.provider })
  } catch (err) {
    console.error("[draft] AI call failed:", err)
    return NextResponse.json({ ok: false, error: "ai_failed" }, { status: 500 })
  }
}
