"use client"

import { useState, useRef } from "react"
import Link from "next/link"

const roleOptions = [
  { value: "business-development", label: "Business Development & Market Access Lead" },
  { value: "compliance-due-diligence", label: "Compliance & Due Diligence Specialist" },
  { value: "trade-operations", label: "Trade Operations & Transaction Coordinator" },
  { value: "general", label: "General interest" },
]

interface FormState {
  name: string
  email: string
  role: string
  location: string
  linkedin: string
  message: string
  honeypot: string
}

const inputBase = "w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
const inputStyle = {
  border: "1px solid rgba(74,90,107,0.25)",
  backgroundColor: "white",
  color: "var(--color-charcoal)",
}

export function ApplyForm({ defaultRole }: { defaultRole: string }) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    role: defaultRole,
    location: "",
    linkedin: "",
    message: "",
    honeypot: "",
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const fileRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file && file.type !== "application/pdf") {
      e.target.value = ""
      return
    }
    setCvFile(file)
  }

  const selectedRoleLabel =
    roleOptions.find((r) => r.value === form.role)?.label ?? form.role

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.honeypot) return
    setStatus("loading")

    const message = [
      `Role: ${selectedRoleLabel}`,
      `Current location: ${form.location || "Not provided"}`,
      form.linkedin ? `LinkedIn: ${form.linkedin}` : "",
      "",
      "Message:",
      form.message,
    ]
      .filter((l) => l !== undefined)
      .join("\n")
      .trim()

    let cvFilename: string | undefined
    let cvBase64: string | undefined

    if (cvFile) {
      cvFilename = cvFile.name
      cvBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          // Strip the data URL prefix (e.g. "data:application/pdf;base64,")
          resolve(result.split(",")[1] ?? "")
        }
        reader.onerror = reject
        reader.readAsDataURL(cvFile)
      })
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message,
          source: "careers-apply",
          cvFilename,
          cvBase64,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl px-7 py-10 lg:px-10 lg:py-12 text-center"
        style={{
          backgroundColor: "white",
          border: "1px solid rgba(135,110,75,0.12)",
          boxShadow: "0 4px 24px rgba(14,27,45,0.05)",
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "rgba(224,90,34,0.1)" }}
          aria-hidden="true"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-brand-orange)" }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2
          className="mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-charcoal)",
            letterSpacing: "-0.02em",
          }}
        >
          Thanks for your interest.
        </h2>
        <p
          className="mb-6"
          style={{ color: "var(--color-slate)", fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: "44ch", margin: "0 auto 1.5rem" }}
        >
          We review every submission and will be in touch when there&rsquo;s a strong fit.
          Karagateway is in active development — interviews begin as we are ready to hire
          each role.
        </p>
        <Link
          href="/careers"
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline focus:outline-none focus-visible:underline"
          style={{ color: "var(--color-brand-orange)" }}
        >
          ← Back to Careers
        </Link>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl px-7 py-8 lg:px-10 lg:py-10"
      style={{
        backgroundColor: "white",
        border: "1px solid rgba(135,110,75,0.12)",
        boxShadow: "0 4px 24px rgba(14,27,45,0.05)",
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Honeypot */}
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

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
            Full name <span style={{ color: "var(--color-brand-orange)" }} aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={200}
            autoComplete="name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            className={inputBase}
            style={inputStyle}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
            Email <span style={{ color: "var(--color-brand-orange)" }} aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            className={inputBase}
            style={inputStyle}
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
            Which role are you interested in? <span style={{ color: "var(--color-brand-orange)" }} aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="role"
              name="role"
              required
              value={form.role}
              onChange={handleChange}
              className={`${inputBase} appearance-none pr-10 cursor-pointer`}
              style={inputStyle}
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              aria-hidden="true"
              style={{ color: "var(--color-slate)" }}
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
            Current location <span className="text-xs font-normal" style={{ color: "var(--color-slate)" }}>(city, country)</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            maxLength={200}
            autoComplete="address-level2 country-name"
            placeholder="e.g. Lagos, Nigeria"
            value={form.location}
            onChange={handleChange}
            className={inputBase}
            style={inputStyle}
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
            LinkedIn profile{" "}
            <span className="text-xs font-normal" style={{ color: "var(--color-slate)" }}>(optional)</span>
          </label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            maxLength={300}
            autoComplete="url"
            placeholder="https://www.linkedin.com/in/yourname"
            value={form.linkedin}
            onChange={handleChange}
            className={inputBase}
            style={inputStyle}
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
            Tell us briefly why this role and Karagateway interest you{" "}
            <span style={{ color: "var(--color-brand-orange)" }} aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={3000}
            placeholder="A short note — no need for a cover letter. Just tell us who you are and why this."
            value={form.message}
            onChange={handleChange}
            className={`${inputBase} resize-y`}
            style={{ ...inputStyle, minHeight: "7rem" }}
          />
          <p className="mt-1 text-xs" style={{ color: "var(--color-slate)" }}>
            Max 500 words.
          </p>
        </div>

        {/* CV upload */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
            CV / résumé{" "}
            <span className="text-xs font-normal" style={{ color: "var(--color-slate)" }}>(optional, PDF only)</span>
          </label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm transition-colors w-full text-left"
            style={{
              border: "1px dashed rgba(74,90,107,0.3)",
              backgroundColor: "rgba(253,248,242,0.5)",
              color: cvFile ? "var(--color-charcoal)" : "var(--color-slate)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, color: "var(--color-brand-orange)" }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>{cvFile ? cvFile.name : "Choose PDF file…"}</span>
            {cvFile && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setCvFile(null); if (fileRef.current) fileRef.current.value = "" }}
                className="ml-auto text-xs px-2 py-0.5 rounded transition-colors hover:bg-[rgba(74,90,107,0.1)]"
                style={{ color: "var(--color-slate)" }}
                aria-label="Remove selected file"
              >
                Remove
              </button>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            onChange={handleFile}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          />
          <p className="mt-1.5 text-xs" style={{ color: "var(--color-slate)" }}>
            If you&rsquo;d prefer, you can also email your CV directly to{" "}
            <a href="mailto:info@karagateway.com" className="underline hover:no-underline" style={{ color: "var(--color-brand-orange)" }}>
              info@karagateway.com
            </a>
            .
          </p>
        </div>

        {status === "error" && (
          <p className="text-sm" style={{ color: "#c0392b" }}>
            Something went wrong — please try again or email us at{" "}
            <a href="mailto:info@karagateway.com" className="underline">info@karagateway.com</a>.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: "var(--color-brand-orange)",
            ["--tw-ring-color" as string]: "var(--color-brand-orange)",
          }}
        >
          {status === "loading" ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  )
}
