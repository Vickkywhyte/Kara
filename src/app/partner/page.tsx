"use client"

import { useState } from "react"
import { Package, Truck, ShoppingBag, TrendingUp, Check, Calendar, Mail } from "lucide-react"
import { PageTransition } from "@/components/motion/PageTransition"
import { useLanguage } from "@/context/LanguageContext"
import type { Translations } from "@/i18n/en"

interface PartnerFormState {
  name: string; company: string; partnerType: string; interest: string; email: string; honeypot: string
}

function PartnerForm({ t }: { t: Translations }) {
  const [form, setForm] = useState<PartnerFormState>({
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
          name: form.name, email: form.email,
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

  const inputStyle = { border: "1px solid rgba(74,90,107,0.3)", backgroundColor: "white", color: "var(--color-charcoal)" }

  if (status === "success") {
    return (
      <div className="text-center py-10 px-6 rounded-2xl" style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.2)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", color: "var(--color-charcoal)", marginBottom: "0.5rem" }}>
          {t.partner.successHeading}
        </p>
        <p style={{ color: "var(--color-slate)" }}>{t.partner.successBody}</p>
      </div>
    )
  }

  const fields = [
    { id: "name",    label: t.partner.form.nameLabel,    type: "text",  placeholder: t.partner.form.namePlaceholder,    required: true },
    { id: "company", label: t.partner.form.companyLabel, type: "text",  placeholder: t.partner.form.companyPlaceholder, required: false },
    { id: "email",   label: t.partner.form.emailLabel,   type: "email", placeholder: t.partner.form.emailPlaceholder,   required: true },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} aria-hidden="true" tabIndex={-1} className="sr-only" autoComplete="off" />
      {fields.map(({ id, label, type, placeholder, required }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
            {label} {required && <span style={{ color: "var(--color-brand-orange)" }}>*</span>}
          </label>
          <input id={id} name={id} type={type} required={required} maxLength={200} value={(form as unknown as Record<string, string>)[id]} onChange={handleChange} placeholder={placeholder} className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all" style={inputStyle} />
        </div>
      ))}

      <div>
        <label htmlFor="partnerType" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
          {t.partner.form.typeLabel}
        </label>
        <select id="partnerType" name="partnerType" value={form.partnerType} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle}>
          <option value="">{t.partner.form.typePlaceholder}</option>
          <option>{t.partner.form.typeProducer}</option>
          <option>{t.partner.form.typeBuyer}</option>
          <option>{t.partner.form.typeLogistics}</option>
          <option>{t.partner.form.typeInvestor}</option>
          <option>{t.partner.form.typeOther}</option>
        </select>
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-charcoal)" }}>
          {t.partner.form.messageLabel}
        </label>
        <textarea id="interest" name="interest" rows={4} maxLength={2000} value={form.interest} onChange={handleChange} placeholder={t.partner.form.messagePlaceholder} className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none" style={inputStyle} />
      </div>

      {status === "error" && <p className="text-sm" style={{ color: "#c0392b" }}>{t.partner.form.errorMsg}</p>}

      <button type="submit" disabled={status === "loading"} className="w-full py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60" style={{ backgroundColor: "var(--color-brand-orange)" }}>
        {status === "loading" ? t.partner.form.sending : t.partner.form.submit}
      </button>
    </form>
  )
}

export default function PartnerPage() {
  const { t } = useLanguage()

  const partnerTypes = [
    { Icon: Package,    title: t.partner.producers.title,    desc: t.partner.producers.desc },
    { Icon: ShoppingBag,title: t.partner.buyers.title,       desc: t.partner.buyers.desc },
    { Icon: Truck,      title: t.partner.logisticsType.title, desc: t.partner.logisticsType.desc },
    { Icon: TrendingUp, title: t.partner.investors.title,    desc: t.partner.investors.desc },
  ]

  const whyPartner = [t.partner.benefit1, t.partner.benefit2, t.partner.benefit3, t.partner.benefit4]

  return (
    <PageTransition>
      <section className="pt-32 pb-16" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            {t.partner.eyebrow}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 5vw, 3.75rem)", color: "var(--color-charcoal)", lineHeight: 1.1, maxWidth: "16ch" }}>
            {t.partner.heading}
          </h1>
          <div className="mt-5 mb-4 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
          <p className="max-w-2xl" style={{ color: "var(--color-slate)", fontSize: "1.0625rem", lineHeight: "1.75" }}>
            {t.partner.intro}
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="mb-8" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}>
            {t.partner.whoHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnerTypes.map(({ Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl" style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.15)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(224,90,34,0.10)" }}>
                  <Icon size={20} style={{ color: "var(--color-brand-orange)" }} />
                </div>
                <h3 className="mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}>{title}</h3>
                <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: "1.65" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12" style={{ backgroundColor: "var(--color-surface-warm)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="mb-7" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}>
            {t.partner.whyHeading}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyPartner.map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 rounded-xl bg-white" style={{ border: "1px solid rgba(135,110,75,0.12)" }}>
                <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-brand-orange)" }} />
                <span style={{ color: "var(--color-slate)", fontSize: "0.9rem" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="mb-10 text-center" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}>
            {t.partner.waysHeading}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-8 rounded-2xl" style={{ backgroundColor: "var(--color-surface-card)", border: "1px solid rgba(135,110,75,0.18)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "var(--color-brand-orange)" }}>A</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", color: "var(--color-charcoal)" }}>Partner intake form</h3>
              </div>
              <PartnerForm t={t} />
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl flex flex-col gap-4" style={{ backgroundColor: "var(--color-navy)", color: "var(--color-cream)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "var(--color-brand-amber)", color: "var(--color-navy)" }}>B</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem" }}>{t.partner.scheduleHeading}</h3>
                </div>
                <p style={{ color: "rgba(250,247,242,0.7)", fontSize: "0.875rem", lineHeight: "1.65" }}>{t.partner.scheduleBody}</p>
                <a href="https://cal.com/karagateway-ufveeu/30min?overlayCalendar=true" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full transition-all hover:brightness-110 w-fit" style={{ backgroundColor: "var(--color-brand-orange)", color: "white" }}>
                  <Calendar size={15} />
                  {t.partner.scheduleButton}
                </a>
              </div>

              <div className="p-6 rounded-2xl flex flex-col gap-4" style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.2)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "var(--color-brand-gold)" }}>C</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}>{t.partner.emailHeading}</h3>
                </div>
                <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: "1.65" }}>{t.partner.emailBody}</p>
                <a href="mailto:info@karagateway.com" className="flex items-center gap-2 text-sm font-semibold w-fit transition-colors hover:underline" style={{ color: "var(--color-brand-orange)" }}>
                  <Mail size={15} />
                  info@karagateway.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
