import type { Metadata } from "next"
import Link from "next/link"
import { PageTransition } from "@/components/motion/PageTransition"
import { ApplyForm } from "./ApplyForm"

export const metadata: Metadata = { title: "Express Interest — Careers" }

const validRoles = [
  "business-development",
  "compliance-due-diligence",
  "trade-operations",
  "general",
]

interface Props {
  searchParams: Promise<{ role?: string }>
}

export default async function ApplyPage({ searchParams }: Props) {
  const params = await searchParams
  const defaultRole = validRoles.includes(params.role ?? "") ? (params.role ?? "general") : "general"

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-10" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors hover:text-[var(--color-brand-orange)]"
            style={{ color: "var(--color-slate)" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Careers
          </Link>
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
            Express Interest
          </h1>
          <div className="mt-4 h-px w-10" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
          <p
            className="mt-4 text-sm"
            style={{ color: "var(--color-slate)", lineHeight: 1.75 }}
          >
            Keep it brief. We read every submission.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <ApplyForm defaultRole={defaultRole} />
        </div>
      </section>
    </PageTransition>
  )
}
