"use client"

import { useEffect, useRef, useState } from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import type { Locale } from "@/i18n"

const LANGUAGES: { locale: Locale; label: string }[] = [
  { locale: "en", label: "English" },
  { locale: "fr", label: "Français" },
]

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[var(--color-brand-orange)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded px-1"
        style={{ color: "var(--color-charcoal)" }}
      >
        <Globe size={15} aria-hidden="true" />
        <span>{locale.toUpperCase()}</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Language"
          className="absolute right-0 top-full mt-2 w-36 rounded-xl overflow-hidden z-50"
          style={{
            backgroundColor: "white",
            border: "1px solid rgba(135,110,75,0.15)",
            boxShadow: "0 8px 24px rgba(14,27,45,0.12)",
          }}
        >
          {LANGUAGES.map(({ locale: l, label }) => (
            <button
              key={l}
              role="option"
              aria-selected={locale === l}
              onClick={() => { setLocale(l); setOpen(false) }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left hover:bg-[rgba(224,90,34,0.06)]"
              style={{ color: locale === l ? "var(--color-brand-orange)" : "var(--color-charcoal)" }}
            >
              {label}
              {locale === l && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
