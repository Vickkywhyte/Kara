import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/PageTransition"
import { ApplyForm } from "./ApplyForm"
import { ApplyPageHero } from "./ApplyPageHero"

export const metadata: Metadata = {
  title: "Express Interest — Careers",
  description: "Apply to join KaraGateway and be part of the team connecting Europe and Africa through structured transparent trade.",
}

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
      <ApplyPageHero />

      {/* Form */}
      <section className="pb-20" style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <ApplyForm defaultRole={defaultRole} />
        </div>
      </section>
    </PageTransition>
  )
}
