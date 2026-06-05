"use client"

import { useConsent } from "@/context/ConsentContext"
import { useLanguage } from "@/context/LanguageContext"

export function CookieSettingsLink() {
  const { openPreferences } = useConsent()
  const { t } = useLanguage()
  return (
    <button
      onClick={openPreferences}
      className="hover:text-[var(--color-brand-orange)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded"
    >
      {t.cookie.settingsLabel}
    </button>
  )
}
