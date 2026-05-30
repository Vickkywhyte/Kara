import Image from "next/image"
import { partners } from "@/data/partners"
import type { Partner } from "@/data/partners"
import { FadeUp } from "./motion/FadeUp"

interface PartnersProps {
  title?: string
  intro?: string
  /**
   * Set to false to disable the greyscale-by-default / colour-on-hover treatment.
   * Useful if partner logos already look good at full colour on the section bg.
   */
  greyscaleDefault?: boolean
}

function PartnerCard({ partner, greyscale }: { partner: Partner; greyscale: boolean }) {
  const card = (
    <div
      className="flex items-center justify-center px-6 py-4 rounded-xl transition-all duration-300 group"
      style={{
        backgroundColor: "white",
        border: "1px solid rgba(135,110,75,0.12)",
        boxShadow: "0 1px 4px rgba(14,27,45,0.04)",
      }}
      title={partner.description ?? partner.name}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        width={160}
        height={56}
        className={`h-10 w-auto object-contain transition-all duration-300 select-none${
          greyscale
            ? " grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
            : ""
        }`}
      />
    </div>
  )

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${partner.name} website${partner.description ? ` — ${partner.description}` : ""} (opens in new tab)`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] rounded-xl"
      >
        {card}
      </a>
    )
  }

  return <div role="img" aria-label={partner.name}>{card}</div>
}

export function Partners({
  title = "Our Partners",
  intro = "Working alongside trusted partners across legal, logistics, and trade compliance.",
  greyscaleDefault = true,
}: PartnersProps) {
  // Never render an empty section
  if (partners.length === 0) return null

  // For 1–2 partners: centered row. For 3+: responsive grid.
  const gridClass =
    partners.length === 1
      ? "flex justify-center"
      : partners.length === 2
      ? "flex justify-center gap-6 flex-wrap"
      : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"

  // Cap individual card width when there are very few entries so they don't stretch
  const cardWrap =
    partners.length <= 2 ? "w-full max-w-[220px]" : ""

  return (
    <section
      className="py-14 lg:py-20"
      style={{ backgroundColor: "var(--color-surface-warm)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <FadeUp>
          <div className="mb-10">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-brand-amber)" }}
            >
              Trusted Network
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "var(--color-charcoal)",
                marginBottom: "0.5rem",
              }}
            >
              {title}
            </h2>
            <p style={{ color: "var(--color-slate)", fontSize: "0.9375rem", maxWidth: "52ch" }}>
              {intro}
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className={gridClass}>
            {partners.map((partner) => (
              <div key={partner.name} className={cardWrap}>
                <PartnerCard partner={partner} greyscale={greyscaleDefault} />
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
