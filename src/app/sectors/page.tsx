import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Leaf, Factory, ShoppingCart, Cpu, Heart, Zap } from "lucide-react"
import { PageTransition } from "@/components/motion/PageTransition"
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid"

export const metadata: Metadata = { title: "Sectors We Serve" }

const sectors = [
  {
    Icon: Leaf,
    title: "Agriculture & Agro-Processing",
    desc: "From export-ready African produce to global agri-food supply chains. We connect growers, processors, and international buyers.",
    // TODO(human:sector-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
    photoAlt: "African agriculture farm",
  },
  {
    Icon: Factory,
    title: "Manufacturing & Industrial Goods",
    desc: "Facilitating the movement of manufactured goods between African factories and global industrial buyers.",
    // TODO(human:sector-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Factory manufacturing",
  },
  {
    Icon: ShoppingCart,
    title: "Consumer Goods & Retail",
    desc: "Helping consumer brands enter African retail channels and connecting African consumer products with global markets.",
    // TODO(human:sector-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Retail products store",
  },
  {
    Icon: Cpu,
    title: "Technology & Innovation",
    desc: "Bridging global tech solutions with African markets, and helping African tech innovators reach global partners.",
    // TODO(human:sector-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Technology innovation office",
  },
  {
    Icon: Heart,
    title: "Healthcare & Pharmaceuticals",
    desc: "Navigating the complex regulatory environment for health and pharma products on both sides of the trade.",
    // TODO(human:sector-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Healthcare pharmaceutical",
  },
  {
    Icon: Zap,
    title: "Energy & Natural Resources",
    desc: "Supporting energy transition projects, resource trade, and investment flows between Africa and global markets.",
    // TODO(human:sector-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Solar renewable energy",
  },
]

export default function SectorsPage() {
  return (
    <PageTransition>
      {/* Page hero */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: "var(--color-surface-base)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            Where We Operate
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "var(--color-charcoal)",
              lineHeight: 1.1,
            }}
          >
            Industries We Support
          </h1>
          <div className="mt-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
          <p className="mt-5 max-w-xl" style={{ color: "var(--color-slate)", fontSize: "1.0625rem" }}>
            Connecting businesses across diverse sectors for global trade opportunities.
          </p>
        </div>
      </section>

      {/* Sectors grid */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map(({ Icon, title, desc, photo, photoAlt }) => (
              <StaggerItem key={title}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.15)" }}
                >
                  {/* Image header */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={photo}
                      alt={photoAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-7">
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
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          {/* "Don't see your category?" */}
          <div className="mt-12 text-center py-10 rounded-2xl" style={{ backgroundColor: "var(--color-surface-warm)", border: "1px dashed rgba(135,110,75,0.3)" }}>
            <p style={{ color: "var(--color-slate)", fontSize: "1rem", marginBottom: "1rem" }}>
              Don&apos;t see your business category?
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
    </PageTransition>
  )
}
