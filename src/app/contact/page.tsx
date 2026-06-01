"use client"

import { useState } from "react"
import { Phone, Mail, Calendar } from "lucide-react"
import { PageTransition } from "@/components/motion/PageTransition"
import { SocialLinks } from "@/components/SocialLinks"

interface ContactFormState {
  name: string
  company: string
  region: string
  interest: string
  email: string
  honeypot: string
}

function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({
    name: "", company: "", region: "", interest: "", email: "", honeypot: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          message: `Company: ${form.company}\nRegion: ${form.region}\nTrade interest: ${form.interest}`,
          source: "contact-page",
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

  return status === "success" ? (
    <div className="py-10 text-center px-6 rounded-2xl" style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.2)" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", color: "var(--color-charcoal)", marginBottom: "0.5rem" }}>
        Message received.
      </p>
      <p style={{ color: "var(--color-slate)" }}>
        Thanks for providing your information — a member of our team will get in touch within 24 hours.
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange}
        aria-hidden="true" tabIndex={-1} className="sr-only" autoComplete="off" />

      {[
        { id: "name",     label: "Name",              type: "text",  placeholder: "Jane Smith",             required: true },
        { id: "company",  label: "Company",            type: "text",  placeholder: "Your company",           required: false },
        { id: "region",   label: "Region / Country",   type: "text",  placeholder: "e.g. Germany, Nigeria", required: false },
        { id: "interest", label: "Trade interest",     type: "text",  placeholder: "e.g. Market entry into Nigeria", required: false },
        { id: "email",    label: "Email",              type: "email", placeholder: "jane@company.com",       required: true },
      ].map(({ id, label, type, placeholder, required }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
            {label} {required && <span style={{ color: "var(--color-brand-orange)" }}>*</span>}
          </label>
          <input
            id={id} name={id} type={type} required={required} maxLength={300}
            value={(form as unknown as Record<string, string>)[id]} onChange={handleChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
            style={inputStyle}
          />
        </div>
      ))}

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
        {status === "loading" ? "Sending…" : "Send"}
      </button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <PageTransition>
      {/* Page hero */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: "var(--color-surface-base)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            Reach Out
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "var(--color-charcoal)",
              lineHeight: 1.1,
            }}
          >
            Get Started
          </h1>
          <div className="mt-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Form */}
            <div className="lg:col-span-2">
              <h2
                className="mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}
              >
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Sidebar contact info */}
            <div className="space-y-8">
              <div>
                <h3
                  className="mb-4"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", color: "var(--color-charcoal)" }}
                >
                  Contact details
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="tel:+37253945725"
                      className="flex items-center gap-3 text-sm hover:text-[var(--color-brand-orange)] transition-colors"
                      style={{ color: "var(--color-slate)" }}
                    >
                      <Phone size={16} style={{ color: "var(--color-brand-orange)" }} />
                      +372 5394 5725
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:info@karagateway.com"
                      className="flex items-center gap-3 text-sm hover:text-[var(--color-brand-orange)] transition-colors"
                      style={{ color: "var(--color-slate)" }}
                    >
                      <Mail size={16} style={{ color: "var(--color-brand-orange)" }} />
                      info@karagateway.com
                    </a>
                  </li>
                </ul>
              </div>

              {/* Book a call */}
              <div
                className="p-5 rounded-xl"
                style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.2)" }}
              >
                <h3
                  className="mb-2"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}
                >
                  Prefer a call?
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--color-slate)" }}>
                  Book a free 30-minute consultation directly.
                </p>
                <a
                  href="https://cal.com/karagateway-ufveeu/30min?overlayCalendar=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full w-fit transition-all hover:brightness-110"
                  style={{ backgroundColor: "var(--color-brand-orange)", color: "white" }}
                >
                  <Calendar size={14} />
                  Book a Call
                </a>
              </div>

              {/* Socials */}
              <div>
                <h3
                  className="mb-4"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}
                >
                  Follow us
                </h3>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
