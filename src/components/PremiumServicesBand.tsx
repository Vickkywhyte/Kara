"use client"

import Link from "next/link"
import Image from "next/image"
import { Users, Network, Building2, Globe2 } from "lucide-react"
import { StaggerGrid, StaggerItem } from "./motion/StaggerGrid"
import { useLanguage } from "@/context/LanguageContext"

const photos = {
  "country-manager": { photo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80", Icon: Users },
  "channel-partner": { photo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80", Icon: Network },
  "soft-landing":    { photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", Icon: Building2 },
  "localization":    { photo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80", Icon: Globe2 },
}

export function PremiumServicesBand() {
  const { t } = useLanguage()
  const premiumServices = [
    { id: "country-manager" as const, ...photos["country-manager"], title: t.premiumServices.countryManager.title, blurb: t.premiumServices.countryManager.blurb, photoAlt: t.premiumServices.countryManager.photoAlt },
    { id: "channel-partner" as const, ...photos["channel-partner"], title: t.premiumServices.channelPartner.title,  blurb: t.premiumServices.channelPartner.blurb,  photoAlt: t.premiumServices.channelPartner.photoAlt },
    { id: "soft-landing"    as const, ...photos["soft-landing"],    title: t.premiumServices.softLanding.title,     blurb: t.premiumServices.softLanding.blurb,     photoAlt: t.premiumServices.softLanding.photoAlt },
    { id: "localization"    as const, ...photos["localization"],    title: t.premiumServices.localization.title,    blurb: t.premiumServices.localization.blurb,    photoAlt: t.premiumServices.localization.photoAlt },
  ]
  return (
    <section
      className="py-16 lg:py-20"
      style={{ backgroundColor: "var(--color-surface-warm)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Headline copy */}
        <div className="max-w-3xl mb-12">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--color-charcoal)",
              marginBottom: "1rem",
            }}
          >
            {t.premiumServices.heading}
          </h2>
          <p style={{ color: "var(--color-slate)", fontSize: "1.0625rem", lineHeight: "1.75", maxWidth: "60ch" }}>
            {t.premiumServices.body}
          </p>
        </div>

        {/* Premium service cards with images */}
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {premiumServices.map(({ id, Icon, title, blurb, photo, photoAlt }) => (
            <StaggerItem key={id}>
              <Link
                href={`/services#${id}`}
                className="group block rounded-xl bg-white border overflow-hidden hover:-translate-y-1 transition-transform duration-200"
                style={{ borderColor: "rgba(135,110,75,0.15)" }}
              >
                {/* Image header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={photo}
                    alt={photoAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                {/* Content */}
                <div className="p-6">
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4"
                    style={{ backgroundColor: "rgba(224,90,34,0.10)" }}
                  >
                    <Icon size={20} style={{ color: "var(--color-brand-orange)" }} />
                  </div>
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      color: "var(--color-charcoal)",
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: "1.65" }}>
                    {blurb}
                  </p>
                  <span
                    className="inline-block mt-4 text-sm font-semibold group-hover:translate-x-1 transition-transform"
                    style={{ color: "var(--color-brand-orange)" }}
                  >
                    {t.premiumServices.discuss}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}
