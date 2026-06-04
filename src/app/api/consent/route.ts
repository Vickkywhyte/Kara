import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import fs from "fs"
import path from "path"

const LOG_PATH = path.join(process.cwd(), "logs", "consent-log.jsonl")

function ensureLogDir() {
  const dir = path.dirname(LOG_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { policyVersion, timestamp, choice, categories, userAgent, language, url } = body

    if (!policyVersion || !choice || !categories) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const consentId = randomUUID()
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "unknown"

    const record = {
      consentId,
      policyVersion,
      clientTimestamp: timestamp,
      serverTimestamp: new Date().toISOString(),
      choice,
      categories: {
        essential: true,
        analytics: !!categories.analytics,
        marketing: !!categories.marketing,
      },
      ip,
      userAgent,
      language,
      url,
    }

    ensureLogDir()
    fs.appendFileSync(LOG_PATH, JSON.stringify(record) + "\n")

    return NextResponse.json({ consentId })
  } catch (err) {
    console.error("Consent logging error:", err)
    return NextResponse.json({ error: "Logging failed" }, { status: 500 })
  }
}
