import { NextRequest, NextResponse } from "next/server"
import { generate } from "@/lib/ai"
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-prompt"

/* ─── Rate limiting (protects free Gemini quota) ────────────────────────── */
const WINDOW_MS      = 10 * 60 * 1000  // 10 minutes
const MAX_REQUESTS   = 15              // 15 messages per IP per window

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
interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

function isValidMessage(m: unknown): m is ChatMessage {
  if (!m || typeof m !== "object") return false
  const msg = m as Record<string, unknown>
  return (
    (msg.role === "user" || msg.role === "assistant") &&
    typeof msg.content === "string" &&
    msg.content.trim().length > 0
  )
}

const MAX_MESSAGES        = 20    // cap transcript length server-side
const MAX_MESSAGE_CHARS   = 2000  // per message

/* ─── POST /api/chat ─────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // Reject honeypot
  if (body.honeypot) {
    return NextResponse.json({ ok: true, reply: "" })
  }

  if (!Array.isArray(body.messages)) {
    return NextResponse.json({ ok: false, error: "messages_required" }, { status: 400 })
  }

  // Sanitize and validate the transcript
  const rawMessages = (body.messages as unknown[]).filter(isValidMessage)
  if (rawMessages.length === 0) {
    return NextResponse.json({ ok: false, error: "messages_empty" }, { status: 400 })
  }

  // Keep only the most recent N messages and cap each message length
  const messages = rawMessages
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, MAX_MESSAGE_CHARS),
    }))

  // The last message must be from the user
  if (messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ ok: false, error: "last_message_must_be_user" }, { status: 400 })
  }

  try {
    const result = await generate({
      system: CHAT_SYSTEM_PROMPT,
      messages,
      maxTokens: 600,
      // Provider from env var (default: gemini — free tier)
    })

    return NextResponse.json({ ok: true, reply: result.text })
  } catch (err) {
    console.error("[chat] AI call failed:", err)
    return NextResponse.json({
      ok: true,
      reply: "I'm having trouble connecting right now. Please try again in a moment, or email us directly at info@karagateway.com.",
    })
  }
}
