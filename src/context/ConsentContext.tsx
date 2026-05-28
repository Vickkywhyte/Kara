"use client"

import {
  createContext, useCallback, useContext, useEffect, useState, type ReactNode,
} from "react"
import { readConsent, writeConsent, type Consent } from "@/lib/consent"

interface ConsentContextValue {
  consent: Consent | null
  bannerVisible: boolean
  panelOpen: boolean
  accept: () => void
  reject: () => void
  savePreferences: (analytics: boolean) => void
  openPreferences: () => void
  closePanel: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<Consent | null>(null)
  const [bannerVisible, setBannerVisible] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    const existing = readConsent()
    setConsentState(existing)
    if (!existing?.decided) setBannerVisible(true)
  }, [])

  const accept = useCallback(() => {
    setConsentState(writeConsent(true))
    setBannerVisible(false)
    setPanelOpen(false)
  }, [])

  const reject = useCallback(() => {
    setConsentState(writeConsent(false))
    setBannerVisible(false)
    setPanelOpen(false)
  }, [])

  const savePreferences = useCallback((analytics: boolean) => {
    setConsentState(writeConsent(analytics))
    setBannerVisible(false)
    setPanelOpen(false)
  }, [])

  const openPreferences = useCallback(() => {
    setBannerVisible(false)
    setPanelOpen(true)
  }, [])

  const closePanel = useCallback(() => {
    setPanelOpen(false)
    // Reshow banner if the user still hasn't decided
    setConsentState((prev) => {
      if (!prev?.decided) setBannerVisible(true)
      return prev
    })
  }, [])

  return (
    <ConsentContext.Provider value={{
      consent, bannerVisible, panelOpen,
      accept, reject, savePreferences, openPreferences, closePanel,
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
