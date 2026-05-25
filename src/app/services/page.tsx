"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  Users, Network, Building2, Globe2,
  Globe, Truck, ShieldCheck, TrendingUp, Lightbulb, Handshake,
  ChevronDown, ChevronUp,
} from "lucide-react"
import { PageTransition } from "@/components/motion/PageTransition"

const premiumServices = [
  {
    id: "country-manager",
    Icon: Users,
    title: "Country Manager-as-a-Service",
    blurb:
      "Your on-the-ground representative in Lagos — taking meetings, chasing leads, and reporting weekly, for a fraction of a local hire.",
    detail:
      "Retainer + commission model. We attend meetings on your behalf, follow up with leads, handle regulatory legwork, and send weekly updates. You get the coverage of a Lagos office without the fixed overhead.",
    // TODO(human:service-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Business meeting in Africa office",
  },
  {
    id: "channel-partner",
    Icon: Network,
    title: "Channel-Partner & Distributor Sourcing",
    blurb:
      "We shortlist, reference-check in person, and manage the partners who'll actually move your volume.",
    detail:
      "Finder's fee + management retainer. We do the on-the-ground vetting your desk search can't — site visits, reference calls, capacity checks — then stay on to manage the relationship through first shipments.",
    // TODO(human:service-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Handshake in warehouse distribution",
  },
  {
    id: "soft-landing",
    Icon: Building2,
    title: "Soft-Landing Package",
    blurb:
      "Incorporation, banking, virtual office, and your first hires — your African entity, set up and running.",
    detail:
      "One-off setup fee + ongoing admin retainer. Covers CAC registration, tax registration, corporate bank account setup, and virtual office. Employment/payroll is partnered to a licensed EoR provider.",
    // TODO(human:service-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Modern office building",
  },
  {
    id: "localization",
    Icon: Globe2,
    title: "Localization & Go-to-Market",
    blurb:
      "Local pricing, local payment rails, local onboarding — your product adapted to how Africa buys.",
    detail:
      "Project-based per market-launch sprint. We adapt your pricing, integrate local payment methods (Paystack, Flutterwave, OPay, M-Pesa, MTN MoMo), localize your KYC flows, and align your product with how African buyers make decisions.",
    // TODO(human:service-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Mobile payment on phone",
  },
]

const tradeFacilitationItems = [
  { n: 1, title: "Buyer & Supplier Sourcing and Introductions",     desc: "Identify and warm-introduce vetted counterparties on either side — export-ready African producers ↔ credible global buyers. Matchmaking done by a trusted human, not an algorithm." },
  { n: 2, title: "Partner Vetting & Reference Checks",              desc: "In-person and site-visit verification of a potential supplier or distributor: capacity, volume, and documentation — where on-the-ground presence beats a desk search." },
  { n: 3, title: "Export-Readiness Assessment",                     desc: "Review a producer's quality, volume, packaging, labeling, and documentation against target-market requirements; flag gaps before a deal is attempted." },
  { n: 4, title: "Documentation & Paperwork Guidance",              desc: "Explain and help assemble the export/import document set (invoices, packing lists, certificates of origin, required permits) — guidance and coordination." },
  { n: 5, title: "Customs & Logistics Coordination",                desc: "Connect partners to vetted freight forwarders and customs agents; coordinate the hand-off; advise on routes and incoterms. We orchestrate; licensed providers execute." },
  { n: 6, title: "Certification & Compliance Navigation",           desc: "Map which certifications a product needs for a given market and shepherd the application — as guidance, routed to specialists for anything binding." },
  { n: 7, title: "Trade-Finance & Payment Introductions",           desc: "Connect partners to trade-finance providers and local payment rails; advise on payment-risk structuring (milestones, escrow via third parties). We introduce and advise; we do not hold or move funds." },
  { n: 8, title: "Sample & First-Shipment Coordination",            desc: "Manage the logistics of samples and the critical first pilot shipment — the stage where most new trade relationships break." },
  { n: 9, title: "Packaging, Labeling & Cultural Adaptation Advice",desc: "Align a product's presentation with the destination market's regulations and buyer expectations." },
  { n: 10, title: "Post-Deal Follow-Through & Relationship Management", desc: "Monitor the first 3–6 months of a new trade relationship, resolve friction, and tee up repeat orders." },
]

const supportingServices = [
  {
    id: "trade-facilitation",
    Icon: Globe,
    title: "Trade Facilitation",
    desc: "End-to-end support across the full trade process — from sourcing and vetting to first shipment and beyond.",
    hasList: true,
    // TODO(human:service-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Cargo shipping port",
  },
  {
    id: "logistics",
    Icon: Truck,
    title: "Logistics & Supply Chain",
    desc: "Connecting you to vetted freight, customs, and logistics partners for seamless movement of goods.",
    hasList: false,
    // TODO(human:service-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Freight logistics trucks",
  },
  {
    id: "compliance",
    Icon: ShieldCheck,
    title: "Compliance & Regulatory Guidance",
    desc: "Navigating the regulatory landscape so your products meet requirements on both sides of the trade.",
    hasList: false,
    // TODO(human:service-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Business documents signing",
  },
  {
    id: "market-access",
    Icon: TrendingUp,
    title: "Market Access & Business Development",
    desc: "Opening doors to new markets through our networks and on-the-ground intelligence.",
    hasList: false,
    // TODO(human:service-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Business growth meeting",
  },
  {
    id: "trade-advisory",
    Icon: Lightbulb,
    title: "Trade Advisory & Strategy",
    desc: "Strategic guidance for businesses entering or expanding in African and global markets.",
    hasList: false,
    // TODO(human:service-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Strategy consulting team",
  },
  {
    id: "investment",
    Icon: Handshake,
    title: "Investment & Partnership Facilitation",
    desc: "Connecting investors, strategic partners, and businesses to forge relationships that unlock growth.",
    hasList: false,
    // TODO(human:service-image) — swap for a custom brand photo
    photo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Investment partnership handshake",
  },
]

function TradeFacilitationExpand() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-5 border-t pt-5" style={{ borderColor: "rgba(135,110,75,0.15)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm font-medium transition-colors"
        style={{ color: "var(--color-brand-orange)" }}
      >
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {open ? "Hide" : "See"} the 10 specific activities we deliver
      </button>
      {open && (
        <ol className="mt-5 space-y-4 list-none">
          {tradeFacilitationItems.map(({ n, title, desc }) => (
            <li key={n} className="flex gap-4">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ backgroundColor: "rgba(224,90,34,0.12)", color: "var(--color-brand-orange)" }}
              >
                {n}
              </span>
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "0.25rem" }}>{title}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--color-slate)", lineHeight: "1.6" }}>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default function ServicesPage() {
  return (
    <PageTransition>
      {/* Page hero */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: "var(--color-surface-base)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            What We Do
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "var(--color-charcoal)",
              lineHeight: 1.1,
            }}
          >
            Trade is just the beginning.
          </h1>
          <div className="mt-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
          <p className="mt-4 max-w-xl" style={{ color: "var(--color-slate)", fontSize: "1.0625rem" }}>
            Our end-to-end services ensure your products move smoothly, globally.
          </p>
        </div>
      </section>

      {/* Premium services */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: "rgba(224,90,34,0.10)", color: "var(--color-brand-orange)" }}>
            Flagship Services
          </div>
          <h2
            className="mt-3 mb-10"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}
          >
            Our highest-value, on-the-ground offerings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumServices.map(({ id, Icon, title, blurb, detail, photo, photoAlt }) => (
              <div
                key={id}
                id={id}
                className="rounded-2xl overflow-hidden scroll-mt-20"
                style={{ backgroundColor: "var(--color-surface-card)", border: "1px solid rgba(224,90,34,0.18)" }}
              >
                {/* Image header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={photo}
                    alt={photoAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Content */}
                <div className="p-7">
                  <div
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5"
                    style={{ backgroundColor: "rgba(224,90,34,0.10)" }}
                  >
                    <Icon size={22} style={{ color: "var(--color-brand-orange)" }} />
                  </div>
                  <h3
                    className="mb-3"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--color-charcoal)" }}
                  >
                    {title}
                  </h3>
                  <p className="mb-3" style={{ color: "var(--color-slate)", fontSize: "0.9375rem", lineHeight: "1.7" }}>
                    {blurb}
                  </p>
                  <p style={{ color: "var(--color-slate-light)", fontSize: "0.875rem", lineHeight: "1.7" }}>
                    {detail}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block mt-5 text-sm font-semibold"
                    style={{ color: "var(--color-brand-orange)" }}
                  >
                    Discuss this →
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
          <h2
            className="mb-10"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-charcoal)" }}
          >
            Full-spectrum trade support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingServices.map(({ id, Icon, title, desc, hasList, photo, photoAlt }) => (
              <div
                key={id}
                id={id}
                className="rounded-xl overflow-hidden scroll-mt-20"
                style={{ backgroundColor: "white", border: "1px solid rgba(135,110,75,0.15)" }}
              >
                {/* Image header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={photo}
                    alt={photoAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Content */}
                <div className="p-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(135,110,75,0.10)" }}
                  >
                    <Icon size={20} style={{ color: "var(--color-brand-gold)" }} />
                  </div>
                  <h3
                    className="mb-2"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", color: "var(--color-charcoal)" }}
                  >
                    {title}
                  </h3>
                  <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: "1.65" }}>{desc}</p>
                  {hasList && <TradeFacilitationExpand />}
                  <Link
                    href="/contact"
                    className="inline-block mt-4 text-sm font-medium"
                    style={{ color: "var(--color-brand-orange)" }}
                  >
                    Discuss this →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section
        className="py-12 text-center"
        style={{ background: "linear-gradient(90deg, var(--color-brand-orange), var(--color-brand-terracotta))" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "white" }}
          >
            Not sure which service fits?
          </h2>
          <p className="mb-6 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
            Book a free 30-minute consultation and we&apos;ll map your situation to the right engagement.
          </p>
          <Link
            href="/contact"
            className="inline-block text-sm font-semibold px-7 py-3.5 rounded-full bg-white transition-all hover:bg-cream"
            style={{ color: "var(--color-brand-orange)" }}
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}
