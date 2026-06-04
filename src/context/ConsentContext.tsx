"use client"

import {
  createContext, useCallback, useContext, useEffect, useState, type ReactNode,
} from "react"
import {
  hasConsented, readConsentPrefs, logConsent,
  type ConsentCategories, type ConsentChoice,
} from "@/lib/consent"

interface ConsentContextValue {
  categories: ConsentCategories | null
  bannerVisible: boolean
  accept: () => void
  reject: () => void
  savePreferences: (analytics: boolean, marketing: boolean) => void
  openPreferences: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ConsentCategories | null>(null)
  const [bannerVisible, setBannerVisible] = useState(false)

  useEffect(() => {
    if (!hasConsented()) {
      setBannerVisible(true)
    } else {
      setCategories(readConsentPrefs())
    }
  }, [])

  const doConsent = useCallback(async (choice: ConsentChoice, cats: ConsentCategories) => {
    await logConsent(choice, cats)
    setCategories(cats)
    setBannerVisible(false)
  }, [])

  const accept = useCallback(() => {
    doConsent("accept_all", { essential: true, analytics: true, marketing: true })
  }, [doConsent])

  const reject = useCallback(() => {
    doConsent("reject_non_essential", { essential: true, analytics: false, marketing: false })
  }, [doConsent])

  const savePreferences = useCallback((analytics: boolean, marketing: boolean) => {
    doConsent("custom", { essential: true, analytics, marketing })
  }, [doConsent])

  const openPreferences = useCallback(() => {
    setBannerVisible(true)
  }, [])

  return (
    <ConsentContext.Provider value={{
      categories, bannerVisible,
      accept, reject, savePreferences, openPreferences,
    }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error("useConsent must be inside ConsentProvider")
  return ctx
}
