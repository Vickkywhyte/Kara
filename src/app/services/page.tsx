"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Users, Network, Building2, Globe2,
  Globe, Truck, ShieldCheck, TrendingUp, Lightbulb, Handshake,
} from "lucide-react"
import { PageTransition } from "@/components/motion/PageTransition"
import { useLanguage } from "@/context/LanguageContext"

const premiumPhotos = {
  "country-manager": { Icon: Users,     photo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" },
  "channel-partner": { Icon: Network,   photo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80" },
  "soft-landing":    { Icon: Building2, photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
  "localization":    { Icon: Globe2,    photo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" },
}

const supportingPhotos = {
  "trade-facilitation": { Icon: Globe,        photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" },
  "logistics":          { Icon: Truck,        photo: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80" },
  "compliance":         { Icon: ShieldCheck,  photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" },
  "market-access":      { Icon: TrendingUp,   photo: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" },
  "trade-advisory":     { Icon: Lightbulb,    photo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" },
  "investment":         { Icon: Handshake,    photo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80" },
}

export default function ServicesPage() {
  const { t } = useLanguage()

  const premiumServices = [
    { id: "country-manager" as const, ...premiumPhotos["country-manager"], title: t.services.countryManager.title, blurb: t.services.countryManager.blurb, detail: t.services.countryManager.detail, photoAlt: t.services.countryManager.photoAlt },
    { id: "channel-partner" as const, ...premiumPhotos["channel-partner"], title: t.services.channelPartner.title, blurb: t.services.channelPartner.blurb, detail: t.services.channelPartner.detail, photoAlt: t.services.channelPartner.photoAlt },
    { id: "soft-landing"    as const, ...premiumPhotos["soft-landing"],    title: t.services.softLanding.title,    blurb: t.services.softLanding.blurb,    detail: t.services.softLanding.detail,    photoAlt: t.services.softLanding.photoAlt },
    { id: "localization"    as const, ...premiumPhotos["localization"],    title: t.services.localization.title,   blurb: t.services.localization.blurb,   detail: t.services.localization.detail,   photoAlt: t.services.localization.photoAlt },
  ]

  const supportingServices = [
    { id: "trade-facilitation" as const, ...supportingPhotos["trade-facilitation"], title: t.services.tradeFacilitation.title, desc: t.services.tradeFacilitation.desc, photoAlt: t.services.tradeFacilitation.photoAlt },
    { id: "logistics"          as const, ...supportingPhotos["logistics"],          title: t.services.logistics.title,         desc: t.services.logistics.desc,         photoAlt: t.services.logistics.photoAlt },
    { id: "compliance"         as const, ...supportingPhotos["compliance"],         title: t.services.compliance.title,        desc: t.services.compliance.desc,        photoAlt: t.services.compliance.photoAlt },
    { id: "market-access"      as const, ...supportingPhotos["market-access"],      title: t.services.marketAccess.title,      desc: t.services.marketAccess.desc,      photoAlt: t.services.marketAccess.photoAlt },
    { id: "trade-advisory"     as const, ...supportingPhotos["trade-advisory"],     title: t.services.tradeAdvisory.title,     desc: t.services.tradeAdvisory.desc,     photoAlt: t.services.tradeAdvisory.photoAlt },
    { id: "investment"         as const, ...supportingPhotos["investment"],         title: t.services.investment.title,        desc: t.services.investment.desc,        photoAlt: t.services.investment.photoAlt },
  ]

  return (
    <PageTransition>
      {/* Page hero */}
      <section className="pt-32 pb-16" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            {t.services.eyebrow}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 5vw, 3.75rem)", color: "var(--color-charcoal)", lineHeight: 1.1 }}>
            {t.services.heading}
          </h1>
          <div className="mt-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
          <p className="mt-4 max-w-xl" style={{ color: "var(--color-slate)", fontSize: "1.0625rem" }}>
            {t.services.subheading}
          </p>
        </div>
      </section>

      {/* Premium services */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(224,90,34,0.10)", color: "var(--color-brand-orange)" }}>
            {t.services.flagshipLabel}
          </div>
          <h2 className="mt-3 mb-10" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}>
            {t.services.flagshipSub}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumServices.map(({ id, Icon, title, blurb, detail, photo, photoAlt }) => (
              <div key={id} id={id} className="rounded-2xl overflow-hidden scroll-mt-20 group transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ backgroundColor: "var(--color-surface-card)", border: "1px solid rgba(224,90,34,0.18)" }}>
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image src={photo} alt={photoAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-7">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5" style={{ backgroundColor: "rgba(224,90,34,0.10)" }}>
                    <Icon size={22} style={{ color: "var(--color-brand-orange)" }} />
                  </div>
                  <h3 className="mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--color-charcoal)" }}>{title}</h3>
                  <p className="mb-3" style={{ color: "var(--color-slate)", fontSize: "0.9375rem", lineHeight: "1.7" }}>{blurb}</p>
                  <p style={{ color: "var(--color-slate-light)", fontSize: "0.875rem", lineHeight: "1.7" }}>{detail}</p>
                  <Link href="/contact" className="inline-block mt-5 text-sm font-semibold" style={{ color: "var(--color-brand-orange)" }}>
                    {t.services.discuss}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting services */}
      <section className="py-16" style={{ backgroundColor: "var(--color-surface-warm)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}>
            {t.services.supportingLabel}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingServices.map(({ id, Icon, title, desc, photo, photoAlt }) => (
              <div key={id} id={id} className="rounded-xl overflow-hidden scroll-mt-20 group transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.15)" }}>
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image src={photo} alt={photoAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(135,110,75,0.10)" }}>
                    <Icon size={20} style={{ color: "var(--color-brand-gold)" }} />
                  </div>
                  <h3 className="mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}>{title}</h3>
                  <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: "1.65" }}>{desc}</p>
                  <Link href="/contact" className="inline-block mt-4 text-sm font-medium" style={{ color: "var(--color-brand-orange)" }}>
                    {t.services.discuss}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-12 text-center" style={{ background: "linear-gradient(90deg, var(--color-brand-orange), var(--color-brand-terracotta))" }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "white" }}>
            {t.services.ctaHeading}
          </h2>
          <p className="mb-6 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
            {t.services.ctaBody}
          </p>
          <Link href="/contact" className="inline-block text-sm font-semibold px-7 py-3.5 rounded-full bg-white transition-all hover:bg-cream" style={{ color: "var(--color-brand-orange)" }}>
            {t.services.ctaButton}
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}
