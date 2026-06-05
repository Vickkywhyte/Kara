"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

export function ApplyPageHero() {
  const { t } = useLanguage()
  return (
    <section className="pt-32 pb-10" style={{ backgroundColor: "var(--color-surface-base)" }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <Link
          href="/careers"
          className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors hover:text-[var(--color-brand-orange)]"
          style={{ color: "var(--color-slate)" }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.apply.backLink}
        </Link>
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
          {t.apply.eyebrow}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600,
            color: "var(--color-charcoal)", lineHeight: 1.1, letterSpacing: "-0.025em",
          }}
        >
          {t.apply.heading}
        </h1>
        <div className="mt-4 h-px w-10" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
        <p className="mt-4 text-sm" style={{ color: "var(--color-slate)", lineHeight: 1.75 }}>
          {t.apply.subheading}
        </p>
      </div>
    </section>
  )
}
