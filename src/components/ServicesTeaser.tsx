"use client"

import Link from "next/link"
import {
  Globe2, Truck, ShieldCheck, TrendingUp, Lightbulb, Handshake,
} from "lucide-react"
import { StaggerGrid, StaggerItem } from "./motion/StaggerGrid"
import { useLanguage } from "@/context/LanguageContext"

export function ServicesTeaser() {
  const { t } = useLanguage()
  const supportingServices = [
    { Icon: Globe2,      label: t.servicesTeaser.tradeFacilitation, id: "trade-facilitation" },
    { Icon: Truck,       label: t.servicesTeaser.logistics,         id: "logistics" },
    { Icon: ShieldCheck, label: t.servicesTeaser.compliance,        id: "compliance" },
    { Icon: TrendingUp,  label: t.servicesTeaser.marketAccess,      id: "market-access" },
    { Icon: Lightbulb,   label: t.servicesTeaser.tradeAdvisory,     id: "trade-advisory" },
    { Icon: Handshake,   label: t.servicesTeaser.investment,        id: "investment" },
  ]
  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--color-charcoal)",
                marginBottom: "0.5rem",
              }}
            >
              {t.servicesTeaser.heading}
            </h2>
            <p style={{ color: "var(--color-slate)", maxWidth: "55ch" }}>
              {t.servicesTeaser.subheading}
            </p>
          </div>
          <Link
            href="/services"
            className="flex-shrink-0 text-sm font-semibold"
            style={{ color: "var(--color-brand-orange)" }}
          >
            {t.servicesTeaser.viewAll}
          </Link>
        </div>

        <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {supportingServices.map(({ Icon, label, id }) => (
            <StaggerItem key={id}>
              <Link
                href={`/services#${id}`}
                className="card-hover flex flex-col items-center gap-3 py-6 px-4 rounded-xl text-center h-full"
                style={{
                  backgroundColor: "var(--color-surface-card)",
                  border: "1px solid rgba(135,110,75,0.15)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(135,110,75,0.10)" }}
                >
                  <Icon size={20} style={{ color: "var(--color-brand-gold)" }} />
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--color-slate)", lineHeight: "1.4" }}>
                  {label}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}
