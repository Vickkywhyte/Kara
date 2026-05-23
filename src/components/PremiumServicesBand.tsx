import Link from "next/link"
import { Users, Network, Building2, Globe2 } from "lucide-react"

const premiumServices = [
  {
    id: "country-manager",
    Icon: Users,
    title: "Country Manager-as-a-Service",
    blurb:
      "Your on-the-ground representative in Lagos — taking meetings, chasing leads, and reporting weekly, for a fraction of a local hire.",
  },
  {
    id: "channel-partner",
    Icon: Network,
    title: "Channel-Partner & Distributor Sourcing",
    blurb:
      "We shortlist, reference-check in person, and manage the partners who'll actually move your volume.",
  },
  {
    id: "soft-landing",
    Icon: Building2,
    title: "Soft-Landing Package",
    blurb:
      "Incorporation, banking, virtual office, and your first hires — your African entity, set up and running.",
  },
  {
    id: "localization",
    Icon: Globe2,
    title: "Localization & Go-to-Market",
    blurb:
      "Local pricing, local payment rails, local onboarding — your product adapted to how Africa buys.",
  },
]

export function PremiumServicesBand() {
  return (
    <section
      className="py-16 lg:py-20"
      style={{ backgroundColor: "var(--color-surface-warm)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Headline copy */}
        <div className="max-w-3xl mb-12">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--color-charcoal)",
              marginBottom: "1rem",
            }}
          >
            Your team on the ground in Africa.
          </h2>
          <p style={{ color: "var(--color-slate)", fontSize: "1.0625rem", lineHeight: "1.75", maxWidth: "60ch" }}>
            Most firms hand you a report and wish you luck. We become your local presence — taking meetings in Lagos,
            vetting your distributors in person, handling incorporation and your first hires, and adapting your product
            to how Africa actually buys. Market entry, executed.
          </p>
        </div>

        {/* Premium service mini-cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {premiumServices.map(({ id, Icon, title, blurb }) => (
            <Link
              key={id}
              href={`/services#${id}`}
              className="card-hover group block p-6 rounded-xl bg-white border"
              style={{ borderColor: "rgba(135,110,75,0.15)" }}
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4"
                style={{ backgroundColor: "rgba(224,90,34,0.10)" }}
              >
                <Icon size={20} style={{ color: "var(--color-brand-orange)" }} />
              </div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: "var(--color-charcoal)",
                }}
              >
                {title}
              </h3>
              <p style={{ color: "var(--color-slate)", fontSize: "0.875rem", lineHeight: "1.65" }}>
                {blurb}
              </p>
              <span
                className="inline-block mt-4 text-sm font-semibold group-hover:translate-x-1 transition-transform"
                style={{ color: "var(--color-brand-orange)" }}
              >
                Discuss this →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
