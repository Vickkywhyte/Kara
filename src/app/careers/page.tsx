"use client"

import Link from "next/link"
import { PageTransition } from "@/components/motion/PageTransition"
import { useLanguage } from "@/context/LanguageContext"
import type { Translations } from "@/i18n/en"

type RoleData = {
  id: string
  title: string; location: string; locationNote: string; summary: string
  responsibilities: string[]; lookingFor: string[]
  responsibilitiesLabel: string; lookingForLabel: string; expressInterest: string
}

function RoleCard({ role }: { role: RoleData }) {
  return (
    <article
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.12)", boxShadow: "0 4px 24px rgba(14,27,45,0.05)" }}
    >
      <div className="px-7 py-6 lg:px-10 lg:py-8" style={{ borderBottom: "1px solid rgba(135,110,75,0.1)" }}>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.375rem, 3vw, 1.75rem)", fontWeight: 600,
              color: "var(--color-charcoal)", lineHeight: 1.2, letterSpacing: "-0.02em",
            }}
          >
            {role.title}
          </h2>
          <div className="flex flex-wrap gap-2 flex-shrink-0 pt-1">
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(224,90,34,0.1)", color: "var(--color-brand-orange)", border: "1px solid rgba(224,90,34,0.2)" }}>
              {role.location}
            </span>
            {role.locationNote && (
              <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(74,90,107,0.07)", color: "var(--color-slate)", border: "1px solid rgba(74,90,107,0.12)" }}>
                {role.locationNote}
              </span>
            )}
          </div>
        </div>
        <p style={{ color: "var(--color-slate)", fontSize: "0.9375rem", lineHeight: 1.7 }}>{role.summary}</p>
      </div>

      <div className="px-7 py-6 lg:px-10 lg:py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--color-charcoal)", letterSpacing: "-0.01em" }}>
            {role.responsibilitiesLabel}
          </h3>
          <ul className="space-y-2.5">
            {role.responsibilities.map((item, i) => (
              <li key={i} className="flex gap-3" style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: "var(--color-brand-orange)" }} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--color-charcoal)", letterSpacing: "-0.01em" }}>
            {role.lookingForLabel}
          </h3>
          <ul className="space-y-2.5">
            {role.lookingFor.map((item, i) => (
              <li key={i} className="flex gap-3" style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-7 py-5 lg:px-10" style={{ borderTop: "1px solid rgba(135,110,75,0.1)", backgroundColor: "rgba(253,248,242,0.6)" }}>
        <Link
          href={`/careers/apply?role=${role.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ backgroundColor: "var(--color-brand-orange)", color: "white", ["--tw-ring-color" as string]: "var(--color-brand-orange)" }}
        >
          {role.expressInterest}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default function CareersPage() {
  const { t } = useLanguage()

  const roles: RoleData[] = [
    {
      id: "business-development",
      title: t.careers.bd.title, location: t.careers.bd.location, locationNote: t.careers.bd.locationNote, summary: t.careers.bd.summary,
      responsibilities: [t.careers.bd.r1, t.careers.bd.r2, t.careers.bd.r3, t.careers.bd.r4, t.careers.bd.r5],
      lookingFor: [t.careers.bd.l1, t.careers.bd.l2, t.careers.bd.l3, t.careers.bd.l4, t.careers.bd.l5],
      responsibilitiesLabel: t.careers.responsibilitiesLabel, lookingForLabel: t.careers.lookingForLabel, expressInterest: t.careers.expressInterest,
    },
    {
      id: "compliance-due-diligence",
      title: t.careers.compliance.title, location: t.careers.compliance.location, locationNote: t.careers.compliance.locationNote, summary: t.careers.compliance.summary,
      responsibilities: [t.careers.compliance.r1, t.careers.compliance.r2, t.careers.compliance.r3, t.careers.compliance.r4, t.careers.compliance.r5],
      lookingFor: [t.careers.compliance.l1, t.careers.compliance.l2, t.careers.compliance.l3, t.careers.compliance.l4, t.careers.compliance.l5],
      responsibilitiesLabel: t.careers.responsibilitiesLabel, lookingForLabel: t.careers.lookingForLabel, expressInterest: t.careers.expressInterest,
    },
    {
      id: "trade-operations",
      title: t.careers.operations.title, location: t.careers.operations.location, locationNote: t.careers.operations.locationNote, summary: t.careers.operations.summary,
      responsibilities: [t.careers.operations.r1, t.careers.operations.r2, t.careers.operations.r3, t.careers.operations.r4, t.careers.operations.r5],
      lookingFor: [t.careers.operations.l1, t.careers.operations.l2, t.careers.operations.l3, t.careers.operations.l4, t.careers.operations.l5],
      responsibilitiesLabel: t.careers.responsibilitiesLabel, lookingForLabel: t.careers.lookingForLabel, expressInterest: t.careers.expressInterest,
    },
  ]

  return (
    <PageTransition>
      <section className="pt-32 pb-10" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            {t.careers.eyebrow}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600,
              color: "var(--color-charcoal)", lineHeight: 1.1, letterSpacing: "-0.025em",
            }}
          >
            {t.careers.heading}
          </h1>
          <div className="mt-4 h-px w-10" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
          <p className="mt-6 text-base lg:text-lg" style={{ color: "var(--color-slate)", lineHeight: 1.75, maxWidth: "56ch" }}>
            {t.careers.intro}
          </p>
        </div>
      </section>

      <section className="pb-16" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 space-y-8">
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
          <div className="rounded-2xl px-7 py-7 lg:px-10 lg:py-8" style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.18)" }}>
            <p style={{ color: "var(--color-slate)", fontSize: "0.9375rem", lineHeight: 1.75 }}>
              {t.careers.closingBody}
            </p>
            <div className="mt-5">
              <Link
                href="/careers/apply"
                className="text-sm font-semibold hover:underline focus:outline-none focus-visible:underline"
                style={{ color: "var(--color-brand-orange)" }}
              >
                {t.careers.closingCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
