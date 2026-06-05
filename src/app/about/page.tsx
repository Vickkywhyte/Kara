"use client"

import Link from "next/link"
import { Shield, Users2, Zap, Award } from "lucide-react"
import { PageTransition } from "@/components/motion/PageTransition"
import { FadeUp } from "@/components/motion/FadeUp"
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid"
import { useLanguage } from "@/context/LanguageContext"

const valueIcons = [Shield, Users2, Zap, Award]

export default function AboutPage() {
  const { t } = useLanguage()
  const values = [
    { Icon: Shield,  title: t.about.values.trust.title,       desc: t.about.values.trust.desc },
    { Icon: Users2,  title: t.about.values.inclusivity.title, desc: t.about.values.inclusivity.desc },
    { Icon: Zap,     title: t.about.values.impact.title,      desc: t.about.values.impact.desc },
    { Icon: Award,   title: t.about.values.excellence.title,  desc: t.about.values.excellence.desc },
  ]

  return (
    <PageTransition>
      {/* Page hero */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: "var(--color-surface-base)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "var(--color-brand-amber)" }}
          >
            {t.about.eyebrow}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "var(--color-charcoal)",
              maxWidth: "18ch",
              lineHeight: 1.1,
            }}
          >
            {t.about.heading}
          </h1>
          <div className="mt-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeUp>
              <div>
                <div className="w-8 h-0.5 mb-6" style={{ backgroundColor: "var(--color-brand-orange)" }} />
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    color: "var(--color-charcoal)",
                    lineHeight: 1.45,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.about.quote}&rdquo;
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="space-y-5">
                <p style={{ color: "var(--color-slate)", lineHeight: "1.8" }}>{t.about.body1}</p>
                <p style={{ color: "var(--color-slate)", lineHeight: "1.8" }}>{t.about.body2}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16" style={{ backgroundColor: "var(--color-surface-warm)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <FadeUp>
            <h2
              className="mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-charcoal)" }}
            >
              {t.about.team.heading}
            </h2>
            <p style={{ color: "var(--color-slate)", lineHeight: "1.8", maxWidth: "65ch", margin: "0 auto" }}>
              {t.about.team.body}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeUp>
            <div
              className="p-8 rounded-2xl"
              style={{ backgroundColor: "var(--color-navy)", color: "var(--color-cream)" }}
            >
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ color: "var(--color-brand-amber)" }}
              >
                {t.about.vision.label}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", lineHeight: 1.6 }}>
                &ldquo;{t.about.vision.quote}&rdquo;
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div
              className="p-8 rounded-2xl"
              style={{ backgroundColor: "var(--color-surface-warm)", border: "1px solid rgba(135,110,75,0.2)" }}
            >
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ color: "var(--color-brand-orange)" }}
              >
                {t.about.mission.label}
              </p>
              <p
                style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--color-charcoal)", lineHeight: 1.6 }}
              >
                &ldquo;{t.about.mission.quote}&rdquo;
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ backgroundColor: "var(--color-surface-warm)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2
            className="text-center mb-10"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-charcoal)" }}
          >
            {t.about.values.heading}
          </h2>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, desc }) => (
              <StaggerItem key={title}>
                <div
                  className="p-6 rounded-xl h-full"
                  style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.15)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(224,90,34,0.10)" }}
                  >
                    <Icon size={20} style={{ color: "var(--color-brand-orange)" }} />
                  </div>
                  <h3 className="mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", color: "var(--color-charcoal)" }}>
                    {title}
                  </h3>
                  <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: "1.65" }}>{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Impact */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, var(--color-navy) 0%, #1a2a3a 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2
            className="mb-6"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-cream)" }}
          >
            {t.about.impactSection.heading}
          </h2>
          <p style={{ color: "rgba(250,247,242,0.75)", lineHeight: "1.8", maxWidth: "65ch", margin: "0 auto 2rem" }}>
            {t.about.impactSection.body}
          </p>
          <Link
            href="/contact"
            className="inline-block text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: "var(--color-brand-orange)", color: "white" }}
          >
            {t.about.impactSection.cta}
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}
