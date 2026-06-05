"use client"

import { useState } from "react"
import { Phone, Mail, Calendar } from "lucide-react"
import { PageTransition } from "@/components/motion/PageTransition"
import { SocialLinks } from "@/components/SocialLinks"
import { useLanguage } from "@/context/LanguageContext"
import type { Translations } from "@/i18n/en"

interface ContactFormState {
  name: string; company: string; region: string; interest: string; email: string; honeypot: string
}

function ContactForm({ t }: { t: Translations }) {
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
          name: form.name, email: form.email,
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

  const inputStyle = { border: "1px solid rgba(74,90,107,0.3)", backgroundColor: "white", color: "var(--color-charcoal)" }

  const fields = [
    { id: "name",     label: t.contact.fields.name,     type: "text",  placeholder: t.contact.fields.namePlaceholder,     required: true },
    { id: "company",  label: t.contact.fields.company,   type: "text",  placeholder: t.contact.fields.companyPlaceholder,  required: false },
    { id: "region",   label: t.contact.fields.region,    type: "text",  placeholder: t.contact.fields.regionPlaceholder,   required: false },
    { id: "interest", label: t.contact.fields.interest,  type: "text",  placeholder: t.contact.fields.interestPlaceholder, required: false },
    { id: "email",    label: t.contact.fields.email,     type: "email", placeholder: t.contact.fields.emailPlaceholder,    required: true },
  ]

  return status === "success" ? (
    <div className="py-10 text-center px-6 rounded-2xl" style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.2)" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", color: "var(--color-charcoal)", marginBottom: "0.5rem" }}>
        {t.contact.successHeading}
      </p>
      <p style={{ color: "var(--color-slate)" }}>{t.contact.successBody}</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} aria-hidden="true" tabIndex={-1} className="sr-only" autoComplete="off" />
      {fields.map(({ id, label, type, placeholder, required }) => (
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
        <p className="text-sm" style={{ color: "#c0392b" }}>{t.contact.errorMsg}</p>
      )}
      <button type="submit" disabled={status === "loading"} className="w-full py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60" style={{ backgroundColor: "var(--color-brand-orange)" }}>
        {status === "loading" ? t.contact.sending : t.contact.submit}
      </button>
    </form>
  )
}

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <PageTransition>
      <section className="pt-32 pb-16" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            {t.contact.eyebrow}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 5vw, 3.75rem)", color: "var(--color-charcoal)", lineHeight: 1.1 }}>
            {t.contact.heading}
          </h1>
          <div className="mt-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
        </div>
      </section>

      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}>
                {t.contact.formHeading}
              </h2>
              <ContactForm t={t} />
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", color: "var(--color-charcoal)" }}>
                  {t.contact.detailsHeading}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="tel:+37253945725" className="flex items-center gap-3 text-sm hover:text-[var(--color-brand-orange)] transition-colors" style={{ color: "var(--color-slate)" }}>
                      <Phone size={16} style={{ color: "var(--color-brand-orange)" }} />
                      +372 5394 5725
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@karagateway.com" className="flex items-center gap-3 text-sm hover:text-[var(--color-brand-orange)] transition-colors" style={{ color: "var(--color-slate)" }}>
                      <Mail size={16} style={{ color: "var(--color-brand-orange)" }} />
                      info@karagateway.com
                    </a>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-xl" style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.2)" }}>
                <h3 className="mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}>
                  {t.contact.callHeading}
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--color-slate)" }}>{t.contact.callBody}</p>
                <a
                  href="https://cal.com/karagateway-ufveeu/30min?overlayCalendar=true"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full w-fit transition-all hover:brightness-110"
                  style={{ backgroundColor: "var(--color-brand-orange)", color: "white" }}
                >
                  <Calendar size={14} />
                  {t.contact.callButton}
                </a>
              </div>

              <div>
                <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}>
                  {t.contact.followHeading}
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
