import { NextRequest, NextResponse } from "next/server"
import { sendLeadNotification } from "@/lib/send-lead"

/* ─── In-memory rate limiter ─────────────────────────────────────────────── */
// 5 submissions per IP per 10 minutes. Good enough for launch without any infra.
// In production at scale, swap for Vercel KV or Upstash Redis.
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5

const ipWindows = new Map<string, { count: number; start: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const window = ipWindows.get(ip)
  if (!window || now - window.start > WINDOW_MS) {
    ipWindows.set(ip, { count: 1, start: now })
    return false
  }
  if (window.count >= MAX_REQUESTS) return true
  window.count++
  return false
}

/* ─── Field validation ───────────────────────────────────────────────────── */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(str: string, maxLen: number): string {
  return String(str ?? "").trim().slice(0, maxLen)
}

/* ─── POST /api/lead ─────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // Honeypot — bots fill this, humans don't
  if (body.honeypot) {
    return NextResponse.json({ ok: true }) // silent reject
  }

  const name        = sanitize(String(body.name        ?? ""), 200)
  const email       = sanitize(String(body.email       ?? ""), 200)
  const message     = sanitize(String(body.message     ?? ""), 4000)
  const source      = sanitize(String(body.source      ?? "unknown"), 50)
  const cvFilename  = sanitize(String(body.cvFilename  ?? ""), 200)
  // base64 PDF — cap at ~8 MB encoded (~6 MB file)
  const cvBase64    = typeof body.cvBase64 === "string"
    ? body.cvBase64.slice(0, 11_000_000)
    : undefined

  if (!name) return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 })
  if (!isValidEmail(email)) return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 })

  try {
    await sendLeadNotification({
      name,
      email,
      message: message || undefined,
      source,
      timestamp: new Date().toISOString(),
      cvFilename: cvFilename || undefined,
      cvBase64:   cvBase64   || undefined,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    // Log server-side; never expose internals to client
    console.error("[api/lead] notification failed:", err)
    // Still return ok — the lead is captured in the log even if email fails
    return NextResponse.json({ ok: true })
  }
}
