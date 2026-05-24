"use client"

import Link from "next/link"
import { CheckCircle2, MapPin, Briefcase, Clock, ArrowRight } from "lucide-react"
import type { AssessmentSnapshot as Snapshot } from "@/lib/assessment-prompt"

interface AssessmentSnapshotProps {
  snapshot: Snapshot | null
  fallback: boolean
  onReset: () => void
}

export function AssessmentSnapshot({ snapshot, fallback, onReset }: AssessmentSnapshotProps) {
  const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK || "#"

  /* ── Graceful fallback (AI failed or parse error) ────────────────────── */
  if (fallback || !snapshot) {
    return (
      <div className="text-center py-10 px-6 rounded-2xl"
        style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.25)" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "rgba(224,90,34,0.12)" }}>
          <CheckCircle2 size={24} style={{ color: "var(--color-brand-orange)" }} />
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-charcoal)", marginBottom: "0.75rem" }}>
          We've got your details.
        </h3>
        <p style={{ color: "var(--color-slate)", lineHeight: "1.75", marginBottom: "1.5rem", maxWidth: "45ch", margin: "0 auto 1.5rem" }}>
          Our trade-intelligence tool hit a hiccup, but your information is safely captured.
          A member of our team will prepare a personalised snapshot and be in touch within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={calLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{ backgroundColor: "var(--color-brand-orange)" }}>
            Book a Free Consultation
          </a>
          <a href="mailto:info@karagateway.com"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{ border: "1px solid rgba(74,90,107,0.3)", color: "var(--color-slate)" }}>
            Email Us Directly
          </a>
        </div>
      </div>
    )
  }

  /* ── Full snapshot ───────────────────────────────────────────────────── */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl"
        style={{ background: "linear-gradient(135deg, var(--color-navy) 0%, #1a2a3a 100%)" }}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-brand-amber)" }}>
            Your Market-Entry Snapshot
          </p>
          <span className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.6)" }}>
            AI — general guidance only
          </span>
        </div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)",
          color: "var(--color-cream)", lineHeight: "1.65" }}>
          {snapshot.summary}
        </p>
      </div>

      {/* Key steps */}
      <div className="p-6 rounded-2xl"
        style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.15)" }}>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 size={18} style={{ color: "var(--color-brand-orange)" }} />
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}>
            Recommended next steps
          </h3>
        </div>
        <ol className="space-y-3">
          {snapshot.key_steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ backgroundColor: "rgba(224,90,34,0.12)", color: "var(--color-brand-orange)" }}>
                {i + 1}
              </span>
              <p style={{ color: "var(--color-charcoal)", fontSize: "0.9rem", lineHeight: "1.65" }}>{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Local considerations */}
      <div className="p-6 rounded-2xl"
        style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.15)" }}>
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={18} style={{ color: "var(--color-brand-gold)" }} />
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}>
            Local market considerations
          </h3>
        </div>
        <ul className="space-y-2">
          {snapshot.local_considerations.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--color-slate)" }}>
              <span className="flex-shrink-0 mt-1" style={{ color: "var(--color-brand-amber)" }}>✦</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended services */}
      <div className="p-6 rounded-2xl"
        style={{ backgroundColor: "white", border: "1px solid rgba(224,90,34,0.2)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase size={18} style={{ color: "var(--color-brand-orange)" }} />
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}>
            Where Karagateway can help you
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {snapshot.recommended_services.map((svc, i) => (
            <Link key={i} href="/services"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:brightness-110"
              style={{ backgroundColor: "rgba(224,90,34,0.10)", color: "var(--color-brand-orange)" }}>
              {svc} <ArrowRight size={11} />
            </Link>
          ))}
        </div>
      </div>

      {/* Timeline note */}
      <div className="p-5 rounded-xl flex gap-3"
        style={{ backgroundColor: "rgba(135,110,75,0.08)", border: "1px solid rgba(135,110,75,0.15)" }}>
        <Clock size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-brand-gold)" }} />
        <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: "1.65" }}>
          <strong style={{ color: "var(--color-charcoal)" }}>Typical timeline: </strong>
          {snapshot.timeline_note}
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center px-4" style={{ color: "var(--color-slate-light)" }}>
        This snapshot is AI-generated general guidance — not legal, financial, or regulatory advice.
        Figures, timelines, and regulatory details are illustrative and may change. Always verify with
        qualified professionals and, for anything binding, book a consultation with our team.
      </p>

      {/* CTA */}
      <div className="p-6 rounded-2xl text-center"
        style={{ background: "linear-gradient(135deg, var(--color-brand-orange), var(--color-brand-terracotta))" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", color: "white",
          marginBottom: "0.5rem" }}>
          Ready to turn this into a plan?
        </p>
        <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.85)", lineHeight: "1.6" }}>
          {snapshot.cta}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={calLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white transition-all hover:bg-cream"
            style={{ color: "var(--color-brand-orange)" }}>
            Book a Free Consultation
          </a>
          <button onClick={onReset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-all hover:bg-white/15"
            style={{ border: "1px solid rgba(255,255,255,0.4)", color: "white" }}>
            Start again
          </button>
        </div>
      </div>
    </div>
  )
}
