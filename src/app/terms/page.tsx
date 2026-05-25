import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/PageTransition"

export const metadata: Metadata = { title: "Terms & Conditions" }

export default function TermsPage() {
  return (
    <PageTransition>
      {/* Page hero */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: "var(--color-surface-base)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-brand-amber)" }}>
            Legal
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "var(--color-charcoal)",
              lineHeight: 1.1,
            }}
          >
            Terms &amp; Conditions
          </h1>
          <div className="mt-5 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div
            className="p-8 lg:p-10 rounded-2xl"
            style={{
              backgroundColor: "white",
              border: "1px solid rgba(135,110,75,0.12)",
              boxShadow: "0 4px 24px rgba(14,27,45,0.06)",
            }}
          >
            {/* TODO(human:terms-content) — Paste full Terms & Conditions text here before launch.
                Recommended sections:
                1. Acceptance of Terms
                2. Services Description
                3. User Obligations
                4. Intellectual Property
                5. Limitation of Liability
                6. Governing Law
                7. Contact Information */}
            <div
              className="flex flex-col items-center justify-center py-16 text-center rounded-xl"
              style={{ backgroundColor: "var(--color-surface-warm)", border: "1px dashed rgba(135,110,75,0.3)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  color: "var(--color-charcoal)",
                  marginBottom: "0.75rem",
                }}
              >
                Terms &amp; Conditions — Content Pending
              </p>
              <p style={{ color: "var(--color-slate)", fontSize: "0.9rem", maxWidth: "42ch" }}>
                This page is ready for your legal text. Paste your full Terms &amp; Conditions into{" "}
                <code style={{ fontSize: "0.8rem", color: "var(--color-brand-orange)" }}>
                  src/app/terms/page.tsx
                </code>{" "}
                before launch.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
