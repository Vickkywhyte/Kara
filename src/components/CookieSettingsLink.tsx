"use client"

import { useConsent } from "@/context/ConsentContext"

export function CookieSettingsLink() {
  const { openPreferences } = useConsent()
  return (
    <button
      onClick={openPreferences}
      className="hover:text-[var(--color-brand-orange)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded"
    >
      Cookie settings
    </button>
  )
}
