"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export function InsightsHeader() {
  const { t } = useLanguage()
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--color-surface-base)" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
          style={{ backgroundColor: "rgba(224,90,34,0.08)", color: "var(--color-brand-amber)" }}
        >
          {t.insights.eyebrow}
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            color: "var(--color-charcoal)",
            lineHeight: 1.15,
            marginBottom: "1.25rem",
          }}
        >
          {t.insights.heading}
        </h1>
        <div className="mx-auto mb-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
        <p style={{ color: "var(--color-slate)", fontSize: "1.0625rem", lineHeight: "1.75", maxWidth: "52ch", margin: "0 auto" }}>
          {t.insights.body}
        </p>
      </div>
    </section>
  )
}

export function InsightsEmpty() {
  const { t } = useLanguage()
  return (
    <p className="text-center py-16" style={{ color: "var(--color-slate)" }}>
      {t.insights.empty}
    </p>
  )
}

export function InsightsReadLabel() {
  const { t } = useLanguage()
  return <>{t.insights.read}</>
}

export function InsightsCTA() {
  const { t } = useLanguage()
  return (
    <section className="py-16" style={{ backgroundColor: "var(--color-surface-warm)" }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2
          className="mb-4"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}
        >
          {t.insights.ctaHeading}
        </h2>
        <p className="mb-7" style={{ color: "var(--color-slate)", lineHeight: "1.75" }}>
          {t.insights.ctaBody}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110"
          style={{ backgroundColor: "var(--color-brand-orange)" }}
        >
          {t.insights.ctaButton} <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}
