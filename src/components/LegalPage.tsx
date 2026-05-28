import Link from "next/link"
import { PageTransition } from "./motion/PageTransition"

type LegalPage = "privacy-policy" | "terms-and-conditions" | "cookie-policy"

interface LegalPageProps {
  title: string
  lastUpdated: string
  currentPage: LegalPage
  children: React.ReactNode
}

const relatedLinks: Record<LegalPage, { href: string; label: string }[]> = {
  "privacy-policy": [
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/cookie-policy",        label: "Cookie Policy" },
  ],
  "terms-and-conditions": [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/cookie-policy",  label: "Cookie Policy" },
  ],
  "cookie-policy": [
    { href: "/privacy-policy",        label: "Privacy Policy" },
    { href: "/terms-and-conditions",  label: "Terms & Conditions" },
  ],
}

export function LegalPage({ title, lastUpdated, currentPage, children }: LegalPageProps) {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-10" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            Legal
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
            {title}
          </h1>
          <div className="mt-4 h-px w-10" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
          <p className="mt-4 text-sm" style={{ color: "var(--color-slate-light)" }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          {/* White reading card */}
          <div
            className="rounded-2xl px-7 py-8 lg:px-10 lg:py-10"
            style={{
              backgroundColor: "white",
              border: "1px solid rgba(135,110,75,0.12)",
              boxShadow: "0 4px 24px rgba(14,27,45,0.05)",
            }}
          >
            <div className="prose-legal">
              {children}
            </div>
          </div>

          {/* Cross-links */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(135,110,75,0.12)" }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-slate-light)" }}>
              Related legal documents
            </p>
            <div className="flex flex-wrap gap-3">
              {relatedLinks[currentPage].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm px-4 py-2 rounded-full transition-all hover:brightness-105"
                  style={{
                    backgroundColor: "rgba(224,90,34,0.08)",
                    color: "var(--color-brand-orange)",
                    border: "1px solid rgba(224,90,34,0.18)",
                  }}
                >
                  {label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
