"use client"

import {
  createContext, useCallback, useContext, useEffect, useState, type ReactNode,
} from "react"
import {
  type Locale, type Translations,
  getTranslations, detectLocale, LOCALE_STORAGE_KEY,
} from "@/i18n"

interface LanguageContextValue {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always render English on the server — switch after mount to avoid hydration mismatch
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    setLocaleState(detectLocale())
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(LOCALE_STORAGE_KEY, next)
  }, [])

  return (
    <LanguageContext.Provider value={{ locale, t: getTranslations(locale), setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider")
  return ctx
}
