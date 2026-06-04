import en, { type Translations } from "./en"
import fr from "./fr"
import et from "./et"

export type { Translations }
export type Locale = "en" | "fr" | "et"

export const locales: Record<Locale, Translations> = { en, fr, et }

export const LOCALE_STORAGE_KEY = "kgw_locale"

export function getTranslations(locale: Locale): Translations {
  return locales[locale]
}

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en"
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === "en" || stored === "fr" || stored === "et") return stored
  const lang = navigator.language.slice(0, 2).toLowerCase()
  if (lang === "fr") return "fr"
  if (lang === "et") return "et"
  return "en"
}
