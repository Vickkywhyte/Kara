"use client"

import Image from "next/image"
import Link from "next/link"
import { Leaf, Factory, ShoppingCart, Cpu, Heart, Zap } from "lucide-react"
import { PageTransition } from "@/components/motion/PageTransition"
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid"
import { useLanguage } from "@/context/LanguageContext"

const sectorPhotos = [
  { Icon: Leaf,         id: "agriculture",   photo: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80" },
  { Icon: Factory,      id: "manufacturing", photo: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80" },
  { Icon: ShoppingCart, id: "consumer",      photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" },
  { Icon: Cpu,          id: "technology",    photo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
  { Icon: Heart,        id: "healthcare",    photo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80" },
  { Icon: Zap,          id: "energy",        photo: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80" },
] as const

export default function SectorsPage() {
  const { t } = useLanguage()
  const sectors = [
    { ...sectorPhotos[0], title: t.sectors.agriculture.title, desc: t.sectors.agriculture.desc, photoAlt: t.sectors.agriculture.photoAlt },
    { ...sectorPhotos[1], title: t.sectors.manufacturing.title, desc: t.sectors.manufacturing.desc, photoAlt: t.sectors.manufacturing.photoAlt },
    { ...sectorPhotos[2], title: t.sectors.consumer.title, desc: t.sectors.consumer.desc, photoAlt: t.sectors.consumer.photoAlt },
    { ...sectorPhotos[3], title: t.sectors.technology.title, desc: t.sectors.technology.desc, photoAlt: t.sectors.technology.photoAlt },
    { ...sectorPhotos[4], title: t.sectors.healthcare.title, desc: t.sectors.healthcare.desc, photoAlt: t.sectors.healthcare.photoAlt },
    { ...sectorPhotos[5], title: t.sectors.energy.title, desc: t.sectors.energy.desc, photoAlt: t.sectors.energy.photoAlt },
  ]

  return (
    <PageTransition>
      {/* Page hero */}
      <section className="pt-32 pb-16" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            {t.sectors.eyebrow}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "var(--color-charcoal)",
              lineHeight: 1.1,
            }}
          >
            {t.sectors.heading}
          </h1>
          <div className="mt-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
          <p className="mt-5 max-w-xl" style={{ color: "var(--color-slate)", fontSize: "1.0625rem" }}>
            {t.sectors.subheading}
          </p>
        </div>
      </section>

      {/* Sectors grid */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map(({ Icon, id, title, desc, photo, photoAlt }) => (
              <StaggerItem key={id}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.15)" }}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image src={photo} alt={photoAlt} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                  <div className="p-7">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(224,90,34,0.10)" }}>
                      <Icon size={24} style={{ color: "var(--color-brand-orange)" }} />
                    </div>
                    <h3 className="mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", color: "var(--color-charcoal)" }}>{title}</h3>
                    <p style={{ color: "var(--color-slate)", fontSize: "0.9rem", lineHeight: "1.7" }}>{desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <div className="mt-12 text-center py-10 rounded-2xl" style={{ backgroundColor: "var(--color-surface-warm)", border: "1px dashed rgba(135,110,75,0.3)" }}>
            <p style={{ color: "var(--color-slate)", fontSize: "1rem", marginBottom: "1rem" }}>
              {t.sectors.ctaPrompt}
            </p>
            <Link
              href="/contact"
              className="inline-block text-sm font-semibold px-6 py-2.5 rounded-full transition-all hover:brightness-110"
              style={{ backgroundColor: "var(--color-brand-orange)", color: "white" }}
            >
              {t.sectors.ctaLink}
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
