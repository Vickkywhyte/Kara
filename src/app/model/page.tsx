import type { Metadata } from "next"
import Link from "next/link"
import { FadeUp } from "@/components/motion/FadeUp"
import { PageTransition } from "@/components/motion/PageTransition"

export const metadata: Metadata = { title: "Our Model" }

const phases = [
  {
    number: "01",
    title: "Discover Opportunities",
    tagline: "The right trade starts with the right insight.",
    body: "Research high-demand products both ways; use market data and on-ground intelligence; identify gaps and trends; curate export-ready producers and credible buyers.",
    example: "Ghanaian cocoa co-ops ready for ethical sourcing deals in Europe.",
  },
  {
    number: "02",
    title: "Match & Verify Partners",
    tagline: "Trade needs trust. We help build it.",
    body: "Screen and vet; ensure export readiness (quality, volume, documentation); use trusted networks, site visits, and compliance tools; match on product, capacity, and values.",
    example: "A Baltic dairy producer matched with a licensed African food distributor.",
  },
  {
    number: "03",
    title: "Facilitate the Trade Process",
    tagline: "We simplify the hard stuff.",
    body: "Guide export/import requirements; support logistics, customs, certificates, and licenses; advise on packaging, labeling, and cultural standards; link to trade-finance partners.",
    example: "Nigerian textile exporters guided through EU customs paperwork and shipping routes.",
  },
  {
    number: "04",
    title: "Grow & Scale",
    tagline: "We don't stop at the first shipment.",
    body: "Monitor outcomes; offer insights to improve deals; help expand to new regions and categories; build long-term relationships that compound over time.",
    example: "A Lithuanian solar firm expanding from East Africa to Francophone West Africa.",
  },
]

export default function ModelPage() {
  return (
    <PageTransition>
      {/* Page hero */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: "var(--color-surface-base)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 max-w-3xl">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            How We Work
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
            The Karagateway Trade Loop
          </h1>
          <div className="mb-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
          <p style={{ color: "var(--color-slate)", fontSize: "1.0625rem", lineHeight: "1.75", maxWidth: "60ch" }}>
            We designed our model to be practical, partnership-driven, and adaptable across multiple sectors. It&apos;s a 4-phase
            system that helps African and international businesses trade smarter, faster, and more ethically.
          </p>
        </div>
      </section>

      {/* Phases */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="space-y-12 lg:space-y-16">
            {phases.map(({ number, title, tagline, body, example }, i) => (
              <FadeUp key={number} delay={0}>
                <div
                  className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-start`}
                >
                  {/* Phase number accent */}
                  <div className="flex-shrink-0 lg:w-48 flex lg:flex-col items-center lg:items-start gap-4">
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "5rem",
                        fontWeight: 700,
                        color: "rgba(224,90,34,0.15)",
                        lineHeight: 1,
                        userSelect: "none",
                      }}
                    >
                      {number}
                    </div>
                    {/* Connector line visible on desktop only */}
                    {i < phases.length - 1 && (
                      <div
                        className="hidden lg:block w-px h-16 mt-2"
                        style={{ backgroundColor: "rgba(224,90,34,0.15)", marginLeft: "2.5rem" }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 rounded-2xl"
                    style={{ backgroundColor: "var(--color-surface-card)", border: "1px solid rgba(135,110,75,0.15)" }}>
                    <h2
                      className="mb-2"
                      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}
                    >
                      {title}
                    </h2>
                    <p
                      className="italic mb-4"
                      style={{ color: "var(--color-brand-orange)", fontSize: "1rem" }}
                    >
                      &quot;{tagline}&quot;
                    </p>
                    <p style={{ color: "var(--color-slate)", lineHeight: "1.75", marginBottom: "1rem" }}>
                      {body}
                    </p>
                    <div
                      className="flex gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: "var(--color-surface-warm)" }}
                    >
                      <span style={{ color: "var(--color-brand-amber)", fontSize: "0.875rem" }}>✦</span>
                      <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", fontStyle: "italic" }}>
                        Example: {example}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Closing + CTA — intentional dark accent section */}
      <section
        className="py-16 text-center"
        style={{ background: "linear-gradient(135deg, var(--color-navy) 0%, #1a2a3a 100%)" }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <p
            className="italic mb-6"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", color: "var(--color-cream)" }}
          >
            &quot;Our loop never ends — each cycle strengthens knowledge, trust, and growth.&quot;
          </p>
          <Link
            href="/#assessment"
            className="inline-block text-sm font-semibold px-7 py-3.5 rounded-full transition-all hover:brightness-110"
            style={{ backgroundColor: "var(--color-brand-orange)", color: "white" }}
          >
            Get Started
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}
