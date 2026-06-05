"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export function InsightArticleCTA() {
  const { t } = useLanguage()
  return (
    <div
      className="mt-10 p-6 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, var(--color-navy) 0%, #1a2a3a 100%)",
        color: "var(--color-cream)",
      }}
    >
      <h2
        className="mb-3"
        style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--color-cream)" }}
      >
        {t.insights.articleCtaHeading}
      </h2>
      <p className="text-sm mb-5" style={{ color: "rgba(250,247,242,0.75)", lineHeight: "1.75" }}>
        {t.insights.articleCtaBody}
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110"
        style={{ backgroundColor: "var(--color-brand-orange)" }}
      >
        {t.insights.articleCtaButton} <ArrowRight size={14} />
      </Link>
    </div>
  )
}

export function InsightBackLink() {
  const { t } = useLanguage()
  return (
    <Link
      href="/insights"
      className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--color-brand-orange)]"
      style={{ color: "var(--color-slate)" }}
    >
      <ArrowLeft size={14} />
      {t.insights.articleBackLink}
    </Link>
  )
}

export function InsightAllLink() {
  const { t } = useLanguage()
  return (
    <Link
      href="/insights"
      className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[var(--color-brand-orange)]"
      style={{ color: "var(--color-brand-orange)" }}
    >
      ← {t.insights.backLink}
    </Link>
  )
}
