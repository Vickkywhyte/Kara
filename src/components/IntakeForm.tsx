"use client"

import { useState } from "react"

interface FormState {
  name: string
  business: string
  goal: string
  email: string
  honeypot: string
}

export function IntakeForm() {
  const [form, setForm] = useState<FormState>({
    name: "", business: "", goal: "", email: "", honeypot: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.honeypot) return // silent bot rejection
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `Business/Sector: ${form.business}\n\nGoal: ${form.goal}`,
          source: "home-intake",
        }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong. Please email us directly at info@karagateway.com")
    }
  }

  return (
    <section
      id="assessment"
      className="py-16 lg:py-20"
      style={{ backgroundColor: "var(--color-surface-base)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-center mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--color-charcoal)",
            }}
          >
            Start Your Trade Journey
          </h2>
          <p className="text-center mb-10" style={{ color: "var(--color-slate)", lineHeight: "1.7" }}>
            Tell us a little about your business and goals. A member of our team will get in touch within 24 hours.
          </p>

          {status === "success" ? (
            <div
              className="text-center py-12 px-8 rounded-2xl"
              style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.2)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  color: "var(--color-charcoal)",
                  marginBottom: "0.75rem",
                }}
              >
                Thanks for reaching out.
              </p>
              <p style={{ color: "var(--color-slate)" }}>
                Thanks for providing your information — a member of our team will get in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                aria-hidden="true"
                tabIndex={-1}
                className="sr-only"
                autoComplete="off"
              />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  Your name <span style={{ color: "var(--color-brand-orange)" }}>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={200}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{
                    border: "1px solid rgba(74,90,107,0.3)",
                    backgroundColor: "white",
                    color: "var(--color-charcoal)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="business"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  Type of business / sector
                </label>
                <input
                  id="business"
                  name="business"
                  type="text"
                  maxLength={300}
                  value={form.business}
                  onChange={handleChange}
                  placeholder="e.g. EU agri-food manufacturer exploring Nigeria"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{
                    border: "1px solid rgba(74,90,107,0.3)",
                    backgroundColor: "white",
                    color: "var(--color-charcoal)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  Expansion goal / interest / message
                </label>
                <textarea
                  id="goal"
                  name="goal"
                  rows={4}
                  maxLength={2000}
                  value={form.goal}
                  onChange={handleChange}
                  placeholder="Tell us what you're trying to achieve…"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none"
                  style={{
                    border: "1px solid rgba(74,90,107,0.3)",
                    backgroundColor: "white",
                    color: "var(--color-charcoal)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  Email <span style={{ color: "var(--color-brand-orange)" }}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{
                    border: "1px solid rgba(74,90,107,0.3)",
                    backgroundColor: "white",
                    color: "var(--color-charcoal)",
                  }}
                />
              </div>

              {errorMsg && (
                <p className="text-sm" style={{ color: "#c0392b" }}>{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 disabled:opacity-60"
                style={{ backgroundColor: "var(--color-brand-orange)" }}
              >
                {status === "loading" ? "Sending…" : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
