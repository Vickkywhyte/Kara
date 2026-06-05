"use client"

import Link from "next/link"
import { FadeUp } from "@/components/motion/FadeUp"
import { PageTransition } from "@/components/motion/PageTransition"
import { useLanguage } from "@/context/LanguageContext"

export default function ModelPage() {
  const { t } = useLanguage()
  const phases = [
    { number: "01", title: t.model.phase1.title, tagline: t.model.phase1.tagline, body: t.model.phase1.body, example: t.model.phase1.example },
    { number: "02", title: t.model.phase2.title, tagline: t.model.phase2.tagline, body: t.model.phase2.body, example: t.model.phase2.example },
    { number: "03", title: t.model.phase3.title, tagline: t.model.phase3.tagline, body: t.model.phase3.body, example: t.model.phase3.example },
    { number: "04", title: t.model.phase4.title, tagline: t.model.phase4.tagline, body: t.model.phase4.body, example: t.model.phase4.example },
  ]

  return (
    <PageTransition>
      {/* Page hero */}
      <section className="pt-32 pb-16" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 max-w-3xl">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            {t.model.eyebrow}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "var(--color-charcoal)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            {t.model.heading}
          </h1>
          <div className="mb-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
          <p style={{ color: "var(--color-slate)", fontSize: "1.0625rem", lineHeight: "1.75", maxWidth: "60ch" }}>
            {t.model.intro}
          </p>
        </div>
      </section>

      {/* Phases */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="space-y-12 lg:space-y-16">
            {phases.map(({ number, title, tagline, body, example }, i) => (
              <FadeUp key={number} delay={0}>
                <div className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-start`}>
                  <div className="flex-shrink-0 lg:w-48 flex lg:flex-col items-center lg:items-start gap-4">
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "5rem", fontWeight: 700,
                        color: "rgba(224,90,34,0.15)",
                        lineHeight: 1, userSelect: "none",
                      }}
                    >
                      {number}
                    </div>
                    {i < phases.length - 1 && (
                      <div className="hidden lg:block w-px h-16 mt-2" style={{ backgroundColor: "rgba(224,90,34,0.15)", marginLeft: "2.5rem" }} />
                    )}
                  </div>
                  <div className="flex-1 p-8 rounded-2xl" style={{ backgroundColor: "var(--color-surface-card)", border: "1px solid rgba(135,110,75,0.15)" }}>
                    <h2 className="mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}>
                      {title}
                    </h2>
                    <p className="italic mb-4" style={{ color: "var(--color-brand-orange)", fontSize: "1rem" }}>
                      &quot;{tagline}&quot;
                    </p>
                    <p style={{ color: "var(--color-slate)", lineHeight: "1.75", marginBottom: "1rem" }}>{body}</p>
                    <div className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: "var(--color-surface-warm)" }}>
                      <span style={{ color: "var(--color-brand-amber)", fontSize: "0.875rem" }}>✦</span>
                      <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", fontStyle: "italic" }}>
                        {t.model.exampleLabel}{example}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 text-center" style={{ background: "linear-gradient(135deg, var(--color-navy) 0%, #1a2a3a 100%)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <p className="italic mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", color: "var(--color-cream)" }}>
            &quot;{t.model.loop}&quot;
          </p>
          <Link
            href="/#assessment"
            className="inline-block text-sm font-semibold px-7 py-3.5 rounded-full transition-all hover:brightness-110"
            style={{ backgroundColor: "var(--color-brand-orange)", color: "white" }}
          >
            {t.model.cta}
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}
