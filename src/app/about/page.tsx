import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Users2, Zap, Award } from "lucide-react"
import { PageTransition } from "@/components/motion/PageTransition"
import { FadeUp } from "@/components/motion/FadeUp"
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid"

export const metadata: Metadata = { title: "About" }

const values = [
  {
    Icon: Shield,
    title: "Trust",
    desc: "Transparent, reliable partnerships built on honest communication and integrity.",
  },
  {
    Icon: Users2,
    title: "Inclusivity",
    desc: "Creating opportunity for African businesses and global partners alike.",
  },
  {
    Icon: Zap,
    title: "Impact",
    desc: "Driving growth, innovation, and sustainable development across markets.",
  },
  {
    Icon: Award,
    title: "Excellence",
    desc: "Professional, high-quality service at every stage of the trade journey.",
  },
]

export default function AboutPage() {
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
            About Us
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
            Connecting Africa and the World
          </h1>
          <div className="mt-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
        </div>
      </section>

      {/* Intro — typographic pull-quote layout, no image */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Pull-quote — large Cormorant display */}
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
                  &ldquo;Karagateway simplifies international trade, helping African producers reach global markets
                  while enabling international businesses to access opportunities across Africa.&rdquo;
                </p>
              </div>
            </FadeUp>

            {/* Body paragraphs */}
            <FadeUp delay={0.15}>
              <div className="space-y-5">
                <p style={{ color: "var(--color-slate)", lineHeight: "1.8" }}>
                  Expert guidance, streamlined cross-border operations, support on both sides to grow confidently.
                </p>
                <p style={{ color: "var(--color-slate)", lineHeight: "1.8" }}>
                  We bridge complex trade processes with real opportunities so businesses can focus on growth and
                  innovation — through expertise, networks, and advisory support that create seamless connections
                  benefiting African producers and global partners alike.
                </p>
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
              Our Team
            </h2>
            <p style={{ color: "var(--color-slate)", lineHeight: "1.8", maxWidth: "65ch", margin: "0 auto" }}>
              Hands-on experience with deep cultural and market insight, backed by a network of advisors and specialists
              across compliance, logistics, and trade. The team leverages knowledge of global and African markets, trade
              regulations, and business culture across every stage — sourcing, logistics, partnerships, compliance,
              market expansion.
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
                Our Vision
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  lineHeight: 1.6,
                }}
              >
                &ldquo;Connecting Africa and the world through trade, opportunity, and innovation that empowers communities
                and showcases excellence.&rdquo;
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
                Our Mission
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  color: "var(--color-charcoal)",
                  lineHeight: 1.6,
                }}
              >
                &ldquo;We help African producers reach global markets and bring global innovations to Africa, guiding
                partnerships from opportunity to impact.&rdquo;
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
            Our Values
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
                  <h3
                    className="mb-2"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", color: "var(--color-charcoal)" }}
                  >
                    {title}
                  </h3>
                  <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: "1.65" }}>{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Impact — intentional dark accent section */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, var(--color-navy) 0%, #1a2a3a 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2
            className="mb-6"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-cream)" }}
          >
            Our Impact
          </h2>
          <p style={{ color: "rgba(250,247,242,0.75)", lineHeight: "1.8", maxWidth: "65ch", margin: "0 auto 2rem" }}>
            Karagateway empowers African producers to access global markets while connecting international businesses
            to African opportunities. Our partnerships foster growth, knowledge exchange, and innovation that makes
            trade more equitable, sustainable, and impactful for all sides.
          </p>
          <Link
            href="/contact"
            className="inline-block text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: "var(--color-brand-orange)", color: "white" }}
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}
