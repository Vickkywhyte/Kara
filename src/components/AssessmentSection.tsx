"use client"

import { useState } from "react"
import { AssessmentForm } from "./AssessmentForm"
import { AssessmentSnapshot } from "./AssessmentSnapshot"
import type { AssessmentSnapshot as Snapshot } from "@/lib/assessment-prompt"
import { useLanguage } from "@/context/LanguageContext"

type Phase = "form" | "result"

export function AssessmentSection() {
  const { t } = useLanguage()
  const [phase, setPhase]     = useState<Phase>("form")
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [fallback, setFallback] = useState(false)

  const handleComplete = (snap: Snapshot | null, fb: boolean) => {
    setSnapshot(snap)
    setFallback(fb)
    setPhase("result")
    // Scroll to the result
    setTimeout(() => {
      document.getElementById("assessment")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const handleReset = () => {
    setSnapshot(null)
    setFallback(false)
    setPhase("form")
  }

  return (
    <section
      id="assessment"
      className="py-16 lg:py-20 scroll-mt-16"
      style={{ backgroundColor: "var(--color-surface-base)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mx-auto">

          {phase === "form" && (
            <>
              <div className="text-center mb-8">
                <span
                  className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                  style={{ backgroundColor: "rgba(224,90,34,0.10)", color: "var(--color-brand-orange)" }}
                >
                  {t.assessment.badge}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                    color: "var(--color-charcoal)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {t.assessment.heading}
                </h2>
                <p style={{ color: "var(--color-slate)", lineHeight: "1.7", maxWidth: "50ch", margin: "0 auto" }}>
                  {t.assessment.subheading}
                </p>
              </div>

              <div
                className="p-7 rounded-2xl"
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(135,110,75,0.18)",
                  boxShadow: "0 4px 24px rgba(14,27,45,0.07)",
                }}
              >
                <AssessmentForm onComplete={handleComplete} />
              </div>
            </>
          )}

          {phase === "result" && (
            <>
              <h2
                className="text-center mb-8"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "var(--color-charcoal)",
                }}
              >
                {t.assessment.resultHeading}
              </h2>
              <AssessmentSnapshot
                snapshot={snapshot}
                fallback={fallback}
                onReset={handleReset}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
