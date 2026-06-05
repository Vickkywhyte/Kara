"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useConsent } from "@/context/ConsentContext"
import { useLanguage } from "@/context/LanguageContext"

const NAVY   = "#0A2540"
const ORANGE = "#E8620A"

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={`Toggle ${label}`}
      onClick={onToggle}
      className="flex-shrink-0 relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2"
      style={{
        backgroundColor: on ? ORANGE : "rgba(255,255,255,0.25)",
        ["--tw-ring-color" as string]: ORANGE,
      }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
        style={{ transform: on ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  )
}

export function CookieBanner() {
  const { bannerVisible, categories, accept, reject, savePreferences, openPreferences } = useConsent()
  const { t } = useLanguage()
  const [expanded, setExpanded]   = useState(false)
  const [analytics, setAnalytics] = useState(categories?.analytics ?? false)
  const [marketing, setMarketing] = useState(categories?.marketing ?? false)

  const handleReopen = () => {
    setAnalytics(categories?.analytics ?? false)
    setMarketing(categories?.marketing ?? false)
    setExpanded(false)
    openPreferences()
  }

  return (
    <>
      {/* ── Floating "Cookie Settings" button (visible after consent saved) ── */}
      <AnimatePresence>
        {!bannerVisible && (
          <motion.button
            key="settings-fab"
            onClick={handleReopen}
            className="fixed bottom-4 left-4 z-50 px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2"
            style={{
              backgroundColor: NAVY,
              ["--tw-ring-color" as string]: ORANGE,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            aria-label={t.cookie.openSettings}
          >
            {t.cookie.settingsLabel}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Main banner ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            key="banner"
            role="region"
            aria-label="Cookie consent"
            className="fixed bottom-0 inset-x-0 z-[60] px-4 pb-4 pt-3"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div
              className="max-w-2xl mx-auto rounded-2xl px-6 py-5"
              style={{
                backgroundColor: NAVY,
                boxShadow: "0 -4px 32px rgba(0,0,0,0.25), 0 8px 32px rgba(0,0,0,0.15)",
              }}
            >
              {/* Heading + copy */}
              <p className="mb-1 font-semibold text-white" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>
                {t.cookie.bannerHeading}
              </p>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                {t.cookie.bannerBody}{" "}
                <Link href="/cookie-policy" className="underline hover:text-white transition-colors">Cookie Policy</Link>{" "}
                &amp;{" "}
                <Link href="/privacy-policy" className="underline hover:text-white transition-colors">Privacy Policy</Link>.
              </p>

              {/* Expandable preferences panel */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    key="prefs"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="space-y-2 pt-1">
                      {/* Essential — always on */}
                      <div className="flex items-center justify-between gap-4 rounded-xl px-4 py-3"
                        style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                        <div>
                          <p className="text-xs font-semibold text-white">{t.cookie.essential}</p>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {t.cookie.essentialDesc}
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "rgba(232,98,10,0.18)", color: ORANGE }}>
                          {t.cookie.alwaysOn}
                        </span>
                      </div>

                      {/* Analytics */}
                      <div className="flex items-center justify-between gap-4 rounded-xl px-4 py-3"
                        style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                        <div>
                          <p className="text-xs font-semibold text-white">{t.cookie.analytics}</p>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {t.cookie.analyticsDesc}
                          </p>
                        </div>
                        <Toggle on={analytics} onToggle={() => setAnalytics(v => !v)} label={t.cookie.analytics} />
                      </div>

                      {/* Marketing */}
                      <div className="flex items-center justify-between gap-4 rounded-xl px-4 py-3"
                        style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                        <div>
                          <p className="text-xs font-semibold text-white">{t.cookie.marketing}</p>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {t.cookie.marketingDesc}
                          </p>
                        </div>
                        <Toggle on={marketing} onToggle={() => setMarketing(v => !v)} label={t.cookie.marketing} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => accept()}
                  className="flex-1 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2"
                  style={{ backgroundColor: ORANGE, ["--tw-ring-color" as string]: ORANGE }}
                >
                  {t.cookie.acceptAll}
                </button>
                <button
                  onClick={() => reject()}
                  className="flex-1 px-4 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2"
                  style={{
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "white",
                    ["--tw-ring-color" as string]: ORANGE,
                  }}
                >
                  {t.cookie.essentialOnly}
                </button>
                {expanded ? (
                  <button
                    onClick={() => savePreferences(analytics, marketing)}
                    className="flex-1 px-4 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      color: "white",
                      ["--tw-ring-color" as string]: ORANGE,
                    }}
                  >
                    {t.cookie.savePrefs}
                  </button>
                ) : (
                  <button
                    onClick={() => setExpanded(true)}
                    className="flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2"
                    style={{ color: "rgba(255,255,255,0.7)", ["--tw-ring-color" as string]: ORANGE }}
                  >
                    {t.cookie.managePrefs}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
