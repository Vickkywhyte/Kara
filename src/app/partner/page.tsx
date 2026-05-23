"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Truck, ShoppingBag, TrendingUp, Check, Calendar, Mail } from "lucide-react"

const partnerTypes = [
  {
    Icon: Package,
    title: "Producers & Suppliers",
    desc: "African producers and exporters ready to reach global buyers.",
  },
  {
    Icon: ShoppingBag,
    title: "Buyers & Distributors",
    desc: "International and African buyers seeking vetted, reliable supply.",
  },
  {
    Icon: Truck,
    title: "Logistics & Service Providers",
    desc: "Freight, customs, compliance, and trade-finance specialists.",
  },
  {
    Icon: TrendingUp,
    title: "Investors & Strategic Partners",
    desc: "Those looking to invest in or partner with the growing Africa trade ecosystem.",
  },
]

const whyPartner = [
  "Access to verified, vetted trade partners on both sides",
  "Simplified, end-to-end trade processes",
  "Market insights and growth opportunities",
  "Ethical and transparent collaboration at every stage",
]

interface PartnerForm {
  name: string
  company: string
  partnerType: string
  interest: string
  email: string
  honeypot: string
}

function PartnerForm() {
  const [form, setForm] = useState<PartnerForm>({
    name: "", company: "", partnerType: "", interest: "", email: "", honeypot: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.honeypot) return
    setStatus("loading")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `Company: ${form.company}\nPartner type: ${form.partnerType}\nInterest: ${form.interest}`,
          source: "partner-form",
        }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const inputStyle = {
    border: "1px solid rgba(74,90,107,0.3)",
    backgroundColor: "white",
    color: "var(--color-charcoal)",
  }

  if (status === "success") {
    return (
      <div className="text-center py-10 px-6 rounded-2xl" style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.2)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", color: "var(--color-charcoal)", marginBottom: "0.5rem" }}>
          Application received.
        </p>
        <p style={{ color: "var(--color-slate)" }}>
          Thanks for providing your information — a member of our team will get in touch within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange}
        aria-hidden="true" tabIndex={-1} className="sr-only" autoComplete="off" />

      {[
        { id: "name",    label: "Your name",     type: "text",  placeholder: "Jane Smith", required: true },
        { id: "company", label: "Company / organisation", type: "text", placeholder: "Acme Ltd", required: false },
        { id: "email",   label: "Email",         type: "email", placeholder: "jane@company.com", required: true },
      ].map(({ id, label, type, placeholder, required }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
            {label} {required && <span style={{ color: "var(--color-brand-orange)" }}>*</span>}
          </label>
          <input
            id={id} name={id} type={type} required={required} maxLength={200}
            value={(form as unknown as Record<string, string>)[id]} onChange={handleChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
            style={inputStyle}
          />
        </div>
      ))}

      <div>
        <label htmlFor="partnerType" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
          Partner type
        </label>
        <select
          id="partnerType" name="partnerType"
          value={form.partnerType} onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg text-sm outline-none"
          style={inputStyle}
        >
          <option value="">Select…</option>
          <option>Producer / Supplier</option>
          <option>Buyer / Distributor</option>
          <option>Logistics / Service Provider</option>
          <option>Investor / Strategic Partner</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
          How can we partner?
        </label>
        <textarea
          id="interest" name="interest" rows={4} maxLength={2000}
          value={form.interest} onChange={handleChange}
          placeholder="Tell us about your business and what you're looking for…"
          className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
          style={inputStyle}
        />
      </div>

      {status === "error" && (
        <p className="text-sm" style={{ color: "#c0392b" }}>
          Something went wrong. Email us directly at info@karagateway.com
        </p>
      )}

      <button
        type="submit" disabled={status === "loading"}
        className="w-full py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60"
        style={{ backgroundColor: "var(--color-brand-orange)" }}
      >
        {status === "loading" ? "Sending…" : "Submit"}
      </button>
    </form>
  )
}

export default function PartnerPage() {
  return (
    <>
      {/* Page hero */}
      <section
        className="pt-32 pb-16"
        style={{ background: "linear-gradient(135deg, var(--color-navy) 0%, #1a2a3a 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            Join Our Network
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "var(--color-cream)",
              lineHeight: 1.1,
              maxWidth: "16ch",
            }}
          >
            Partner With Us
          </h1>
          <p className="mt-4 max-w-2xl" style={{ color: "rgba(250,247,242,0.75)", fontSize: "1.0625rem", lineHeight: "1.75" }}>
            Karagateway partners with producers, exporters, importers, and service providers to create seamless
            trade opportunities across Africa and the world. By joining our network you gain access to verified
            partners, market insights, compliance expertise, and end-to-end support.
          </p>
        </div>
      </section>

      {/* Who can partner */}
      <section className="py-16" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2
            className="mb-8"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}
          >
            Who can partner with us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnerTypes.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl"
                style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.15)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(224,90,34,0.10)" }}
                >
                  <Icon size={20} style={{ color: "var(--color-brand-orange)" }} />
                </div>
                <h3 className="mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}>{title}</h3>
                <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: "1.65" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section className="py-12" style={{ backgroundColor: "var(--color-surface-warm)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2
            className="mb-7"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}
          >
            Why partner with Karagateway?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyPartner.map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded-xl bg-white"
                style={{ border: "1px solid rgba(135,110,75,0.12)" }}>
                <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-brand-orange)" }} />
                <span style={{ color: "var(--color-slate)", fontSize: "0.9rem" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 contact paths */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2
            className="mb-10 text-center"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}
          >
            Three ways to get started
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Path A — Form */}
            <div
              className="lg:col-span-2 p-8 rounded-2xl"
              style={{ backgroundColor: "var(--color-surface-card)", border: "1px solid rgba(135,110,75,0.18)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--color-brand-orange)" }}
                >
                  A
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", color: "var(--color-charcoal)" }}>
                  Partner intake form
                </h3>
              </div>
              <PartnerForm />
            </div>

            {/* Paths B & C */}
            <div className="flex flex-col gap-6">
              {/* Path B — Book a call */}
              <div
                className="p-6 rounded-2xl flex flex-col gap-4"
                style={{ backgroundColor: "var(--color-navy)", color: "var(--color-cream)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "var(--color-brand-amber)", color: "var(--color-navy)" }}
                  >
                    B
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem" }}>Schedule a call</h3>
                </div>
                <p style={{ color: "rgba(250,247,242,0.7)", fontSize: "0.875rem", lineHeight: "1.65" }}>
                  Book a free 30-minute consultation directly in our calendar.
                </p>
                {/* TODO(human:calcom-link) — replace # with your Cal.com / Calendly URL */}
                <a
                  href={process.env.NEXT_PUBLIC_CALCOM_LINK || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full transition-all hover:brightness-110 w-fit"
                  style={{ backgroundColor: "var(--color-brand-orange)", color: "white" }}
                >
                  <Calendar size={15} />
                  Book a Call
                </a>
              </div>

              {/* Path C — Email */}
              <div
                className="p-6 rounded-2xl flex flex-col gap-4"
                style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.2)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: "var(--color-brand-gold)" }}
                  >
                    C
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}>
                    Email us directly
                  </h3>
                </div>
                <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: "1.65" }}>
                  For quick questions or if you prefer direct email.
                </p>
                <a
                  href="mailto:info@karagateway.com"
                  className="flex items-center gap-2 text-sm font-semibold w-fit transition-colors hover:underline"
                  style={{ color: "var(--color-brand-orange)" }}
                >
                  <Mail size={15} />
                  info@karagateway.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
