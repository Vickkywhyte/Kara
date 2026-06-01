"use client"

import type { AssessmentSnapshot as Snapshot } from "@/lib/assessment-prompt"

interface AssessmentSnapshotProps {
  snapshot: Snapshot | null
  fallback: boolean
  onReset: () => void
}

const CAL_LINK = "https://cal.com/karagateway-ufveeu/30min?overlayCalendar=true"

const sections = [
  { key: "tradeProfile",        heading: "Your Trade Profile" },
  { key: "corridorOpportunity", heading: "Your Corridor Opportunity" },
  { key: "karagatewayFit",      heading: "Where Karagateway Fits" },
  { key: "nextStep",            heading: "Your Next Step" },
  { key: "questionForYou",      heading: "A Question For You" },
] as const

export function AssessmentSnapshot({ snapshot, fallback, onReset }: AssessmentSnapshotProps) {
  /* ── Fallback ─────────────────────────────────────────────────────────── */
  if (fallback || !snapshot) {
    return (
      <div
        className="rounded-2xl px-7 py-10 text-center"
        style={{
          backgroundColor: "var(--color-surface-warm)",
          border: "1px solid rgba(135,110,75,0.25)",
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "rgba(224,90,34,0.10)" }}
          aria-hidden="true"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: "var(--color-brand-orange)" }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.375rem",
            color: "var(--color-charcoal)",
          }}
        >
          Your details have been received.
        </h3>
        <p
          className="mb-6"
          style={{
            color: "var(--color-slate)",
            lineHeight: "1.75",
            maxWidth: "44ch",
            margin: "0 auto 1.75rem",
          }}
        >
          A member of our team will be in touch within 24 hours.
        </p>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110"
          style={{ backgroundColor: "var(--color-brand-orange)" }}
        >
          Book a Free Consultation
        </a>
      </div>
    )
  }

  /* ── Full snapshot ────────────────────────────────────────────────────── */
  return (
    <div className="space-y-5">
      {/* Header label */}
      <p
        className="text-xs font-semibold tracking-widest uppercase text-center"
        style={{ color: "var(--color-brand-amber)" }}
      >
        Your Market-Entry Snapshot
      </p>

      {/* Five sections */}
      {sections.map(({ key, heading }, index) => {
        const isNextStep = key === "nextStep"
        const isQuestion = key === "questionForYou"

        return (
          <div
            key={key}
            className="rounded-2xl px-6 py-5"
            style={{
              backgroundColor: isQuestion
                ? "var(--color-surface-warm)"
                : "white",
              border: isQuestion
                ? "1px solid rgba(135,110,75,0.18)"
                : "1px solid rgba(135,110,75,0.13)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: "rgba(224,90,34,0.10)",
                  color: "var(--color-brand-orange)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.0625rem",
                  color: "var(--color-charcoal)",
                }}
              >
                {heading}
              </h3>
            </div>

            <p
              style={{
                color: "var(--color-slate)",
                fontSize: "0.9375rem",
                lineHeight: "1.75",
                fontStyle: isQuestion ? "italic" : "normal",
              }}
            >
              {snapshot[key]}
            </p>

            {/* Book a Call CTA lives inside "Your Next Step" */}
            {isNextStep && (
              <div className="mt-5">
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: "var(--color-brand-orange)" }}
                >
                  Book a Free Consultation
                </a>
              </div>
            )}
          </div>
        )
      })}

      {/* Disclaimer */}
      <p className="text-xs text-center px-4" style={{ color: "rgba(74,90,107,0.5)" }}>
        AI-generated general guidance only — not legal, financial, or regulatory advice.
        Always verify specifics with qualified professionals.
      </p>

      {/* Start again */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="text-sm transition-colors hover:text-[var(--color-brand-orange)]"
          style={{ color: "var(--color-slate)" }}
        >
          ← Start again
        </button>
      </div>
    </div>
  )
}
