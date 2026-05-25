import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/PageTransition"

export const metadata: Metadata = { title: "Privacy Policy" }

export default function PrivacyPage() {
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
            Privacy Policy
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
            {/* TODO(human): Privacy Policy sections 1–11 are all missing — add the following
                before launch, especially before accepting EU users (GDPR required):
                1. Data Controller Information
                2. What Data We Collect
                3. How We Use Your Data
                4. Data Sharing & Third Parties
                5. Data Retention
                6. Legal Basis for Processing (GDPR)
                7. Cookies & Tracking
                8. Your Rights (access, erasure, portability, objection)
                9. Data Transfers Outside the EEA
                10. Security Measures
                11. Contact & Complaints */}
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
                Privacy Policy — Content Pending
              </p>
              <p style={{ color: "var(--color-slate)", fontSize: "0.9rem", maxWidth: "42ch" }}>
                This page is ready for your legal text. Paste your full Privacy Policy into{" "}
                <code style={{ fontSize: "0.8rem", color: "var(--color-brand-orange)" }}>
                  src/app/privacy/page.tsx
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
