"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import type { AssessmentSnapshot } from "@/lib/assessment-prompt"

/* ─── Step definitions ───────────────────────────────────────────────────── */
const SECTORS = [
  "Agriculture & Agro-Processing",
  "Manufacturing & Industrial Goods",
  "Consumer Goods & Retail",
  "Technology & Innovation",
  "Healthcare & Pharmaceuticals",
  "Energy & Natural Resources",
  "Other",
]

const TARGET_MARKETS = [
  "Nigeria",
  "Kenya",
  "Ghana",
  "Other African market",
  "Not sure yet",
]

const STAGES = [
  "Just exploring — haven't committed yet",
  "Have a product, no Africa presence yet",
  "Already trading in Africa, want to scale",
]

const CONCERNS = [
  "Finding the right partners",
  "Regulation & compliance",
  "Logistics & supply chain",
  "Local payments & pricing",
  "Hiring & entity setup",
  "I don't know yet",
]

const TOTAL_STEPS = 7

/* ─── Shared input styles ────────────────────────────────────────────────── */
const inputBase = "w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
const inputStyle: React.CSSProperties = {
  border: "1px solid rgba(74,90,107,0.3)",
  backgroundColor: "white",
  color: "var(--color-charcoal)",
}

interface FormData {
  companyName: string
  sector: string
  targetMarket: string
  stage: string
  tried: string
  biggestConcern: string
  email: string
}

interface AssessmentFormProps {
  onComplete: (snapshot: AssessmentSnapshot | null, fallback: boolean) => void
}

export function AssessmentForm({ onComplete }: AssessmentFormProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>({
    companyName: "", sector: "", targetMarket: "",
    stage: "", tried: "", biggestConcern: "", email: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const set = (field: keyof FormData, value: string) =>
    setData((d) => ({ ...d, [field]: value }))

  const canAdvance = (): boolean => {
    if (step === 1) return data.companyName.trim().length > 0
    if (step === 2) return data.sector.length > 0
    if (step === 3) return data.targetMarket.length > 0
    if (step === 4) return data.stage.length > 0
    if (step === 5) return true // optional free-text
    if (step === 6) return data.biggestConcern.length > 0
    if (step === 7) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    return false
  }

  const next = () => { if (canAdvance() && step < TOTAL_STEPS) setStep((s) => s + 1) }
  const back = () => { if (step > 1) setStep((s) => s - 1) }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step < TOTAL_STEPS) { e.preventDefault(); next() }
  }

  const submit = async () => {
    if (!canAdvance()) return
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (res.status === 429) {
        setError("You've already run a few assessments recently. Please wait an hour or email us directly at info@karagateway.com.")
        setSubmitting(false)
        return
      }
      if (!res.ok) throw new Error("Server error")
      onComplete(json.snapshot, json.fallback)
    } catch {
      setError("Something went wrong. Your details have been saved — we'll follow up by email.")
      onComplete(null, true)
    }
    setSubmitting(false)
  }

  const progress = Math.round((step / TOTAL_STEPS) * 100)

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium" style={{ color: "var(--color-slate)" }}>
            Step {step} of {TOTAL_STEPS}
          </span>
          <span className="text-xs" style={{ color: "var(--color-slate-light)" }}>
            {progress}% complete
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(74,90,107,0.12)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: "var(--color-brand-orange)" }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="min-h-[200px]">

        {step === 1 && (
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-charcoal)" }}>
              What's your company name?
            </label>
            <p className="text-sm mb-4" style={{ color: "var(--color-slate)" }}>
              We personalise your snapshot to your situation.
            </p>
            <input
              type="text" autoFocus maxLength={200}
              value={data.companyName} onChange={(e) => set("companyName", e.target.value)}
              onKeyDown={handleKey}
              placeholder="e.g. Acme Foods GmbH"
              className={inputBase} style={inputStyle}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-charcoal)" }}>
              Which sector best describes {data.companyName || "your business"}?
            </label>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {SECTORS.map((s) => (
                <button
                  key={s} type="button"
                  onClick={() => { set("sector", s); setTimeout(next, 180) }}
                  className="text-left px-4 py-3 rounded-lg text-sm transition-all"
                  style={{
                    border: data.sector === s
                      ? "2px solid var(--color-brand-orange)"
                      : "1px solid rgba(74,90,107,0.25)",
                    backgroundColor: data.sector === s ? "rgba(224,90,34,0.06)" : "white",
                    color: "var(--color-charcoal)",
                    fontWeight: data.sector === s ? 600 : 400,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-charcoal)" }}>
              Which market are you targeting first?
            </label>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {TARGET_MARKETS.map((m) => (
                <button
                  key={m} type="button"
                  onClick={() => { set("targetMarket", m); setTimeout(next, 180) }}
                  className="text-left px-4 py-3 rounded-lg text-sm transition-all"
                  style={{
                    border: data.targetMarket === m
                      ? "2px solid var(--color-brand-orange)"
                      : "1px solid rgba(74,90,107,0.25)",
                    backgroundColor: data.targetMarket === m ? "rgba(224,90,34,0.06)" : "white",
                    color: "var(--color-charcoal)",
                    fontWeight: data.targetMarket === m ? 600 : 400,
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-charcoal)" }}>
              Where are you in the process?
            </label>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {STAGES.map((s) => (
                <button
                  key={s} type="button"
                  onClick={() => { set("stage", s); setTimeout(next, 180) }}
                  className="text-left px-4 py-3 rounded-lg text-sm transition-all"
                  style={{
                    border: data.stage === s
                      ? "2px solid var(--color-brand-orange)"
                      : "1px solid rgba(74,90,107,0.25)",
                    backgroundColor: data.stage === s ? "rgba(224,90,34,0.06)" : "white",
                    color: "var(--color-charcoal)",
                    fontWeight: data.stage === s ? 600 : 400,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-charcoal)" }}>
              What have you already tried or explored?{" "}
              <span className="font-normal" style={{ color: "var(--color-slate-light)" }}>(optional)</span>
            </label>
            <p className="text-sm mb-4" style={{ color: "var(--color-slate)" }}>
              Even a rough answer helps us tailor your snapshot. Skip if you haven't started.
            </p>
            <textarea
              rows={4} maxLength={1000} autoFocus
              value={data.tried} onChange={(e) => set("tried", e.target.value)}
              placeholder="e.g. Attended a trade fair, spoke to a distributor, commissioned market research…"
              className={`${inputBase} resize-none`} style={inputStyle}
            />
          </div>
        )}

        {step === 6 && (
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-charcoal)" }}>
              What's your biggest concern right now?
            </label>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {CONCERNS.map((c) => (
                <button
                  key={c} type="button"
                  onClick={() => { set("biggestConcern", c); setTimeout(next, 180) }}
                  className="text-left px-4 py-3 rounded-lg text-sm transition-all"
                  style={{
                    border: data.biggestConcern === c
                      ? "2px solid var(--color-brand-orange)"
                      : "1px solid rgba(74,90,107,0.25)",
                    backgroundColor: data.biggestConcern === c ? "rgba(224,90,34,0.06)" : "white",
                    color: "var(--color-charcoal)",
                    fontWeight: data.biggestConcern === c ? 600 : 400,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--color-charcoal)" }}>
              Where should we send your snapshot?
            </label>
            <p className="text-sm mb-4" style={{ color: "var(--color-slate)" }}>
              Your personalised Market-Entry Snapshot appears on the next screen.
              We'll also send a copy to your email so you have it for reference.
            </p>
            <input
              type="email" autoFocus maxLength={200}
              value={data.email} onChange={(e) => set("email", e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit() } }}
              placeholder="jane@company.com"
              className={inputBase} style={inputStyle}
            />
            {error && (
              <p className="mt-3 text-sm" style={{ color: "#c0392b" }}>{error}</p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="button" onClick={back}
          className={`flex items-center gap-1 text-sm transition-opacity ${step === 1 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          style={{ color: "var(--color-slate)" }}
        >
          <ChevronLeft size={16} /> Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button" onClick={next} disabled={!canAdvance()}
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all disabled:opacity-40"
            style={{ backgroundColor: "var(--color-brand-orange)" }}
          >
            Next
          </button>
        ) : (
          <button
            type="button" onClick={submit}
            disabled={!canAdvance() || submitting}
            className="px-7 py-2.5 rounded-full text-sm font-semibold text-white transition-all disabled:opacity-50 hover:brightness-110"
            style={{ backgroundColor: "var(--color-brand-orange)" }}
          >
            {submitting ? "Generating your snapshot…" : "Get My Snapshot"}
          </button>
        )}
      </div>

      {/* AI disclosure */}
      <p className="mt-4 text-xs text-center" style={{ color: "var(--color-slate-light)" }}>
        Powered by AI — for general guidance only. Specific advice comes from a consultation with our team.
      </p>
    </div>
  )
}
