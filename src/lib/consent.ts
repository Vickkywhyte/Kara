export const POLICY_VERSION = "1.0" // Increment this when Privacy or Cookie Policy changes
export const CONSENT_COOKIE_ID = "kgw_consent_id"   // Stores server-issued record ID
export const CONSENT_PREFS_KEY = "kgw_consent_prefs" // Stores granular preferences

export type ConsentChoice = "accept_all" | "reject_non_essential" | "custom"

export type ConsentCategories = {
  essential: true
  analytics: boolean
  marketing: boolean
}

export type ConsentRecord = {
  policyVersion: string
  timestamp: string
  choice: ConsentChoice
  categories: ConsentCategories
  userAgent?: string
  language?: string
  url?: string
}

// ── Read/Write preferences (localStorage — for runtime use) ──────────────
export function readConsentPrefs(): ConsentCategories | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CONSENT_PREFS_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentCategories
  } catch {
    return null
  }
}

export function writeConsentPrefs(categories: ConsentCategories): void {
  if (typeof window === "undefined") return
  localStorage.setItem(CONSENT_PREFS_KEY, JSON.stringify(categories))
}

// ── Check if user has previously consented ───────────────────────────────
export function hasConsented(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem(CONSENT_COOKIE_ID)
}

// ── Check if a specific category is allowed ──────────────────────────────
export function isAllowed(category: keyof ConsentCategories): boolean {
  if (category === "essential") return true
  const prefs = readConsentPrefs()
  if (!prefs) return false
  return !!prefs[category]
}

// ── Log consent to server (AKI audit trail) ──────────────────────────────
export async function logConsent(
  choice: ConsentChoice,
  categories: ConsentCategories
): Promise<void> {
  console.log("logConsent called:", choice, categories)
  const record: ConsentRecord = {
    policyVersion: POLICY_VERSION,
    timestamp: new Date().toISOString(),
    choice,
    categories,
    userAgent: navigator.userAgent,
    language: navigator.language,
    url: window.location.href,
  }

  try {
    const res = await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    })
    if (res.ok) {
      const data = await res.json()
      if (data.consentId) {
        localStorage.setItem(CONSENT_COOKIE_ID, data.consentId)
      }
    }
  } catch {
    // Fallback: store locally if server unreachable
    localStorage.setItem(CONSENT_COOKIE_ID, "local_" + Date.now())
  }

  writeConsentPrefs(categories)
}
