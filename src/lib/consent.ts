export type Consent = {
  v: 1
  decided: boolean
  analytics: boolean
}

export const CONSENT_KEY = "kara_consent"

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.v === 1 && typeof parsed.decided === "boolean") return parsed as Consent
    return null
  } catch {
    return null
  }
}

export function writeConsent(analytics: boolean): Consent {
  const consent: Consent = { v: 1, decided: true, analytics }
  if (typeof window !== "undefined") {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
  }
  return consent
}
