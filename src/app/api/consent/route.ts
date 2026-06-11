import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { randomUUID } from "crypto"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/* ─── Rate limiting ──────────────────────────────────────────────────────── */
const WINDOW_MS  = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 10            // 10 consent records per IP per window

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

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const body = await req.json()
    const { policyVersion, timestamp, choice, categories, userAgent, language, url } = body

    if (!policyVersion || !choice || !categories) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const consentId = randomUUID()

    const { error } = await supabase.from("consent_log").insert({
      consent_id:       consentId,
      policy_version:   policyVersion,
      client_timestamp: timestamp,
      server_timestamp: new Date().toISOString(),
      choice,
      essential:        true,
      analytics:        !!categories.analytics,
      marketing:        !!categories.marketing,
      ip_address:       ip,
      user_agent:       userAgent,
      language,
      url,
    })

    if (error) {
      console.error("Supabase consent insert error:", error)
      return NextResponse.json({ error: "Logging failed" }, { status: 500 })
    }

    return NextResponse.json({ consentId })
  } catch (err) {
    console.error("Consent route error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
