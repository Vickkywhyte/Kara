"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useConsent } from "@/context/ConsentContext"

/* ─── Preferences panel ───────────────────────────────────────── */

function PreferencesPanel() {
  const { consent, savePreferences, accept, closePanel } = useConsent()
  const [analyticsOn, setAnalyticsOn] = useState(consent?.analytics ?? false)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Trap focus inside the panel
  useEffect(() => {
    closeRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [closePanel])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={closePanel}
      />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="prefs-title"
        className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-lg rounded-2xl p-6 sm:p-8"
        style={{
          backgroundColor: "var(--color-surface-base)",
          border: "1px solid rgba(135,110,75,0.18)",
          boxShadow: "0 24px 60px rgba(14,27,45,0.18)",
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2
            id="prefs-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--color-charcoal)" }}
          >
            Cookie Preferences
          </h2>
          <button
            ref={closeRef}
            onClick={closePanel}
            aria-label="Close cookie preferences"
            className="p-1.5 rounded-lg transition-colors hover:bg-[rgba(14,27,45,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
            style={{ color: "var(--color-slate)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Essential row */}
        <div
          className="flex items-start justify-between gap-4 p-4 rounded-xl mb-3"
          style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.12)" }}
        >
          <div>
            <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-charcoal)", marginBottom: "0.2rem" }}>
              Essential cookies
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--color-slate)", lineHeight: "1.6" }}>
              Required for the website to function. These cannot be switched off.
            </p>
          </div>
          <span
            className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full mt-0.5"
            style={{ backgroundColor: "rgba(224,90,34,0.10)", color: "var(--color-brand-orange)" }}
          >
            Always on
          </span>
        </div>

        {/* Analytics row */}
        <div
          className="flex items-start justify-between gap-4 p-4 rounded-xl mb-6"
          style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.12)" }}
        >
          <div>
            <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-charcoal)", marginBottom: "0.2rem" }}>
              Analytics cookies
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--color-slate)", lineHeight: "1.6" }}>
              Help us understand how visitors use the site so we can improve it. No analytics cookies are set unless you turn these on.
            </p>
          </div>
          {/* Toggle */}
          <button
            role="switch"
            aria-checked={analyticsOn}
            aria-label="Toggle analytics cookies"
            onClick={() => setAnalyticsOn((v) => !v)}
            className="flex-shrink-0 relative mt-0.5 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
            style={{
              backgroundColor: analyticsOn ? "var(--color-brand-orange)" : "rgba(14,27,45,0.15)",
            }}
          >
            <span
              className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200"
              style={{ transform: analyticsOn ? "translateX(20px)" : "translateX(0)" }}
            />
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={() => savePreferences(analyticsOn)}
            className="flex-1 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
            style={{
              border: "1px solid rgba(14,27,45,0.2)",
              color: "var(--color-charcoal)",
            }}
          >
            Save preferences
          </button>
          <button
            onClick={accept}
            className="flex-1 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
            style={{ backgroundColor: "var(--color-brand-orange)" }}
          >
            Accept all
          </button>
        </div>
      </motion.div>
    </>
  )
}

/* ─── Main banner ─────────────────────────────────────────────── */

export function CookieBanner() {
  const { bannerVisible, panelOpen, accept, reject, openPreferences } = useConsent()

  return (
    <AnimatePresence>
      {panelOpen && <PreferencesPanel key="panel" />}

      {bannerVisible && !panelOpen && (
        <motion.div
          key="banner"
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-0 inset-x-0 z-[60] px-4 pb-4 pt-3"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        >
          <div
            className="max-w-4xl mx-auto rounded-2xl px-5 py-4 sm:px-7 sm:py-5"
            style={{
              backgroundColor: "var(--color-surface-base)",
              border: "1px solid rgba(135,110,75,0.18)",
              boxShadow: "0 -4px 32px rgba(14,27,45,0.10), 0 8px 32px rgba(14,27,45,0.08)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Copy */}
              <div className="flex-1 min-w-0">
                <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-charcoal)", marginBottom: "0.25rem" }}>
                  We value your privacy
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--color-slate)", lineHeight: "1.55" }}>
                  We use essential cookies to make our site work. With your consent, we also use analytics cookies to improve it.{" "}
                  <Link href="/cookie-policy" className="underline hover:text-[var(--color-brand-orange)] transition-colors">
                    Cookie Policy
                  </Link>{" "}
                  &amp;{" "}
                  <Link href="/privacy-policy" className="underline hover:text-[var(--color-brand-orange)] transition-colors">
                    Privacy Policy
                  </Link>.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                <button
                  onClick={accept}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
                  style={{ backgroundColor: "var(--color-brand-orange)" }}
                >
                  Accept all
                </button>
                <button
                  onClick={reject}
                  className="px-4 py-2 rounded-full text-xs font-semibold transition-all hover:bg-[rgba(14,27,45,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)]"
                  style={{ border: "1px solid rgba(14,27,45,0.18)", color: "var(--color-charcoal)" }}
                >
                  Reject non-essential
                </button>
                <button
                  onClick={openPreferences}
                  className="px-4 py-2 text-xs font-medium underline underline-offset-2 transition-colors hover:text-[var(--color-brand-orange)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded"
                  style={{ color: "var(--color-slate)" }}
                >
                  Manage preferences
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
