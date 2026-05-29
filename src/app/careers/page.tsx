import type { Metadata } from "next"
import Link from "next/link"
import { PageTransition } from "@/components/motion/PageTransition"

export const metadata: Metadata = { title: "Careers" }

const roles = [
  {
    id: "business-development",
    title: "Business Development & Market Access Lead",
    location: "Lagos or Tallinn",
    locationNote: "Some travel",
    summary:
      "Owns the top of the funnel — identifying, qualifying and engaging European exporters and African buyers in our priority corridors, and bringing them through the Trade Loop discovery stage.",
    responsibilities: [
      "Build and work a target list of named accounts across the Europe ↔ Africa corridor (priority: agro-processing equipment into Nigeria)",
      "Run outreach sequences and book discovery calls with qualified prospects",
      "Conduct discovery calls using the Karagateway Discovery Script, qualify the opportunity, and complete the Client Intake Form",
      "Maintain a clean, current Pipeline and Outreach Tracker in the operating system",
      "Work closely with the founder on positioning, messaging, and corridor strategy",
    ],
    lookingFor: [
      "Track record in B2B sales, business development, or trade-related advisory — ideally cross-border",
      "Strong written and verbal communication; comfortable in first conversations with senior executives",
      "Self-directed; organised; runs a structured pipeline without being managed daily",
      "Genuine interest in Europe ↔ Africa trade",
      "Comfort with compliance-first selling — no shortcuts, no overpromising",
    ],
  },
  {
    id: "compliance-due-diligence",
    title: "Compliance & Due Diligence Specialist",
    location: "Lagos or Tallinn",
    locationNote: "Remote considered",
    summary:
      "Runs the gate — Karagateway's most important function. Conducts verification of counterparties, partners and clients before any introduction or engagement is made, and maintains the integrity of our trust standard.",
    responsibilities: [
      "Run end-to-end counterparty verifications using the Karagateway Verification & Due-Diligence Playbook",
      "Maintain the Compliance Log with full evidence: registry, sanctions, PEP, adverse-media, and capability checks",
      "Issue Due-Diligence Summary Reports to clients in sourcing engagements",
      "Hold the gate — escalate red flags promptly and document Pass / Decline / Clarify decisions with reasoning",
      "Set and manage re-check schedules on cleared counterparties",
    ],
    lookingFor: [
      "Background in compliance, KYC, due diligence, AML, or investigative research",
      "Comfort with free public-source tooling (OpenSanctions, Sanction Scanner, business registries) and structured open-source intelligence",
      "Meticulous documentation habits; understands that 'Cleared' requires evidence, not opinion",
      "Discretion and judgement; a temperament that holds standards under revenue pressure",
      "Familiarity with Europe ↔ Africa trade regulations is a strong plus",
    ],
  },
  {
    id: "trade-operations",
    title: "Trade Operations & Transaction Coordinator",
    location: "Lagos preferred",
    locationNote: "Remote considered for the right candidate",
    summary:
      "Owns delivery. Manages live engagements from signed proposal to completion, coordinating partners, milestones, and client communication so trade actually moves on schedule.",
    responsibilities: [
      "Manage the engagement timeline for each Live Engagement, from kick-off through to delivery and sign-off",
      "Coordinate Karagateway's partner network — logistics, customs, inspection (SONCAP), legal — on each engagement",
      "Run the weekly client update rhythm; flag risks and blockers early",
      "Maintain the Live Engagements database with accurate, up-to-date status",
      "Support transaction milestones (Form M, SONCAP, shipment coordination) without taking ownership of regulated work",
    ],
    lookingFor: [
      "Experience in trade operations, freight forwarding, supply chain coordination, or international project management",
      "Strong organisational habits; thrives on managing multiple workstreams and deadlines",
      "Comfort coordinating third-party providers without micromanaging them",
      "Understanding of cross-border trade documentation (Form M, SONCAP, Bills of Lading, Letters of Credit) is a strong plus",
      "Calm under pressure; client-facing professionalism",
    ],
  },
]

function RoleCard({ role }: { role: (typeof roles)[number] }) {
  return (
    <article
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "white",
        border: "1px solid rgba(135,110,75,0.12)",
        boxShadow: "0 4px 24px rgba(14,27,45,0.05)",
      }}
    >
      {/* Card header */}
      <div
        className="px-7 py-6 lg:px-10 lg:py-8"
        style={{ borderBottom: "1px solid rgba(135,110,75,0.1)" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
              fontWeight: 600,
              color: "var(--color-charcoal)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {role.title}
          </h2>
          <div className="flex flex-wrap gap-2 flex-shrink-0 pt-1">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(224,90,34,0.1)",
                color: "var(--color-brand-orange)",
                border: "1px solid rgba(224,90,34,0.2)",
              }}
            >
              {role.location}
            </span>
            {role.locationNote && (
              <span
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(74,90,107,0.07)",
                  color: "var(--color-slate)",
                  border: "1px solid rgba(74,90,107,0.12)",
                }}
              >
                {role.locationNote}
              </span>
            )}
          </div>
        </div>
        <p style={{ color: "var(--color-slate)", fontSize: "0.9375rem", lineHeight: 1.7 }}>
          {role.summary}
        </p>
      </div>

      {/* Responsibilities + Looking for */}
      <div className="px-7 py-6 lg:px-10 lg:py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--color-charcoal)",
              letterSpacing: "-0.01em",
            }}
          >
            Key responsibilities
          </h3>
          <ul className="space-y-2.5">
            {role.responsibilities.map((item, i) => (
              <li key={i} className="flex gap-3" style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                <span
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                  style={{ backgroundColor: "var(--color-brand-orange)" }}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--color-charcoal)",
              letterSpacing: "-0.01em",
            }}
          >
            What we&rsquo;re looking for
          </h3>
          <ul className="space-y-2.5">
            {role.lookingFor.map((item, i) => (
              <li key={i} className="flex gap-3" style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                <span
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                  style={{ backgroundColor: "rgba(224,90,34,0.4)" }}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div
        className="px-7 py-5 lg:px-10"
        style={{ borderTop: "1px solid rgba(135,110,75,0.1)", backgroundColor: "rgba(253,248,242,0.6)" }}
      >
        <Link
          href={`/careers/apply?role=${role.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: "var(--color-brand-orange)",
            color: "white",
            ["--tw-ring-color" as string]: "var(--color-brand-orange)",
          }}
        >
          Express interest
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default function CareersPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-10" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "var(--color-brand-amber)" }}
          >
            Join Us
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 600,
              color: "var(--color-charcoal)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Careers at Karagateway
          </h1>
          <div className="mt-4 h-px w-10" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
          <p
            className="mt-6 text-base lg:text-lg"
            style={{ color: "var(--color-slate)", lineHeight: 1.75, maxWidth: "56ch" }}
          >
            Karagateway is building the trusted bridge between European and African trade. We&rsquo;re
            growing a small team in Lagos and Tallinn — people who care about doing trade properly,
            who hold high standards, and who want to help build something that lasts. Below are the
            roles we&rsquo;re building toward. We welcome expressions of interest at any time.
          </p>
        </div>
      </section>

      {/* Role cards */}
      <section className="pb-16" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 space-y-8">
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}

          {/* Closing values section */}
          <div
            className="rounded-2xl px-7 py-7 lg:px-10 lg:py-8"
            style={{
              backgroundColor: "var(--color-surface-warm)",
              border: "1px solid rgba(135,110,75,0.18)",
            }}
          >
            <p style={{ color: "var(--color-slate)", fontSize: "0.9375rem", lineHeight: 1.75 }}>
              We&rsquo;re a compliance-first firm. We facilitate, verify and coordinate; we never hold
              funds or own goods. We hold our partners and ourselves to a high bar. If that sounds
              like the kind of place you&rsquo;d want to work, we&rsquo;d love to hear from you.
            </p>
            <div className="mt-5">
              <Link
                href="/careers/apply"
                className="text-sm font-semibold hover:underline focus:outline-none focus-visible:underline"
                style={{ color: "var(--color-brand-orange)" }}
              >
                Send a general expression of interest →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
