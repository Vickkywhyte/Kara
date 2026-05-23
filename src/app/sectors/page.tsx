import type { Metadata } from "next"
import Link from "next/link"
import { Leaf, Factory, ShoppingCart, Cpu, Heart, Zap } from "lucide-react"

export const metadata: Metadata = { title: "Sectors We Serve" }

const sectors = [
  {
    Icon: Leaf,
    title: "Agriculture & Agro-Processing",
    desc: "From export-ready African produce to global agri-food supply chains. We connect growers, processors, and international buyers.",
  },
  {
    Icon: Factory,
    title: "Manufacturing & Industrial Goods",
    desc: "Facilitating the movement of manufactured goods between African factories and global industrial buyers.",
  },
  {
    Icon: ShoppingCart,
    title: "Consumer Goods & Retail",
    desc: "Helping consumer brands enter African retail channels and connecting African consumer products with global markets.",
  },
  {
    Icon: Cpu,
    title: "Technology & Innovation",
    desc: "Bridging global tech solutions with African markets, and helping African tech innovators reach global partners.",
  },
  {
    Icon: Heart,
    title: "Healthcare & Pharmaceuticals",
    desc: "Navigating the complex regulatory environment for health and pharma products on both sides of the trade.",
  },
  {
    Icon: Zap,
    title: "Energy & Natural Resources",
    desc: "Supporting energy transition projects, resource trade, and investment flows between Africa and global markets.",
  },
]

export default function SectorsPage() {
  return (
    <>
      {/* Page hero */}
      <section
        className="pt-32 pb-16"
        style={{ background: "linear-gradient(135deg, var(--color-navy) 0%, #1a2a3a 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            Where We Operate
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "var(--color-cream)",
              lineHeight: 1.1,
            }}
          >
            Industries We Support
          </h1>
          <p className="mt-4 max-w-xl" style={{ color: "rgba(250,247,242,0.7)", fontSize: "1.0625rem" }}>
            Connecting businesses across diverse sectors for global trade opportunities.
          </p>
        </div>
      </section>

      {/* Sectors grid */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="card-hover p-7 rounded-2xl"
                style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.15)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(224,90,34,0.10)" }}
                >
                  <Icon size={24} style={{ color: "var(--color-brand-orange)" }} />
                </div>
                <h3
                  className="mb-3"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", color: "var(--color-charcoal)" }}
                >
                  {title}
                </h3>
                <p style={{ color: "var(--color-slate)", fontSize: "0.9rem", lineHeight: "1.7" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* "Don't see your category?" */}
          <div className="mt-12 text-center py-10 rounded-2xl" style={{ backgroundColor: "var(--color-surface-warm)", border: "1px dashed rgba(135,110,75,0.3)" }}>
            <p style={{ color: "var(--color-slate)", fontSize: "1rem", marginBottom: "1rem" }}>
              Don't see your business category?
            </p>
            <Link
              href="/contact"
              className="inline-block text-sm font-semibold px-6 py-2.5 rounded-full transition-all hover:brightness-110"
              style={{ backgroundColor: "var(--color-brand-orange)", color: "white" }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
