import { NextRequest, NextResponse } from "next/server"
import { generate } from "@/lib/ai"
import {
  ASSESSMENT_SYSTEM_PROMPT,
  ASSESSMENT_USER_TEMPLATE,
  type AssessmentAnswers,
  type AssessmentSnapshot,
} from "@/lib/assessment-prompt"
import { sendLeadNotification } from "@/lib/send-lead"

/* ─── Rate limiting (stricter than /api/lead — AI calls cost money) ────────── */
const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 3            // 3 assessments per IP per hour

const ipWindows = new Map<string, { count: number; start: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const win = ipWindows.get(ip)
  if (!win || now - win.start > WINDOW_MS) {
    ipWindows.set(ip, { count: 1, start: now })
    return false
  }
  if (win.count >= MAX_REQUESTS) return true
  win.count++
  return false
}

/* ─── Validation ─────────────────────────────────────────────────────────── */
const REQUIRED = ["companyName", "sector", "targetMarket", "stage", "biggestConcern", "email"] as const

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(v: unknown, max: number): string {
  return String(v ?? "").trim().slice(0, max)
}

/* ─── JSON parsing with fallback ─────────────────────────────────────────── */
function parseSnapshot(raw: string): AssessmentSnapshot | null {
  try {
    // Strip any accidental markdown code fences the model might add
    const clean = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim()
    const parsed = JSON.parse(clean)
    // Basic shape check — five required string keys
    if (
      typeof parsed.tradeProfile === "string" &&
      typeof parsed.corridorOpportunity === "string" &&
      typeof parsed.karagatewayFit === "string" &&
      typeof parsed.nextStep === "string" &&
      typeof parsed.questionForYou === "string"
    ) {
      return parsed as AssessmentSnapshot
    }
    return null
  } catch {
    return null
  }
}

/* ─── POST /api/assessment ───────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // Validate required fields
  for (const field of REQUIRED) {
    if (!body[field]) {
      return NextResponse.json({ ok: false, error: `${field}_required` }, { status: 400 })
    }
  }

  const answers: AssessmentAnswers = {
    companyName:    sanitize(body.companyName,    200),
    sector:         sanitize(body.sector,         100),
    targetMarket:   sanitize(body.targetMarket,   100),
    stage:          sanitize(body.stage,          100),
    tried:          sanitize(body.tried,          1000),
    biggestConcern: sanitize(body.biggestConcern, 200),
    email:          sanitize(body.email,          200),
  }

  if (!isValidEmail(answers.email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 })
  }

  // Capture lead immediately — before the AI call — so we never lose it
  const leadMessage = [
    `Company: ${answers.companyName}`,
    `Sector: ${answers.sector}`,
    `Target market: ${answers.targetMarket}`,
    `Stage: ${answers.stage}`,
    `Tried: ${answers.tried || "—"}`,
    `Biggest concern: ${answers.biggestConcern}`,
  ].join("\n")

  // Fire-and-forget — don't await so it doesn't delay the AI response
  sendLeadNotification({
    name: answers.companyName,
    email: answers.email,
    message: leadMessage,
    source: "assessment",
    timestamp: new Date().toISOString(),
  }).catch((err) => console.error("[assessment] lead notification failed:", err))

  // Call the AI
  let snapshot: AssessmentSnapshot | null = null
  let providerUsed: string = "unknown"

  try {
    const result = await generate({
      system: ASSESSMENT_SYSTEM_PROMPT,
      messages: [{ role: "user", content: ASSESSMENT_USER_TEMPLATE(answers) }],
      maxTokens: 1200,
      json: true,
      // Provider from env var (default: claude per AI_PROVIDER_ASSESSMENT)
    })
    providerUsed = result.provider
    snapshot = parseSnapshot(result.text)

    if (!snapshot) {
      console.error("[assessment] JSON parse failed. Raw output:", result.text.slice(0, 500))
    }
  } catch (err) {
    const e = err as Record<string, unknown>
    console.error("[assessment] AI call failed — full debug:", {
      message:    e?.message,
      status:     e?.status,
      statusCode: e?.statusCode,
      code:       e?.code,
      stack:      e?.stack,
      raw:        String(err),
    })
    // snapshot stays null — we return the graceful fallback below
  }

  if (!snapshot) {
    // Graceful fallback: lead is already captured; show human-consultation CTA
    return NextResponse.json({
      ok: true,
      fallback: true,
      snapshot: null,
    })
  }

  // Append the snapshot content to the lead notification (best-effort)
  sendLeadNotification({
    name: answers.companyName,
    email: answers.email,
    message: `${leadMessage}\n\n--- AI SNAPSHOT ---\n${JSON.stringify(snapshot, null, 2)}`,
    source: "assessment-snapshot",
    timestamp: new Date().toISOString(),
  }).catch(() => {/* already logged above */})

  return NextResponse.json({
    ok: true,
    fallback: false,
    snapshot,
    provider: providerUsed,
  })
}
