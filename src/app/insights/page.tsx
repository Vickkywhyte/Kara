import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts, formatDate } from "@/lib/posts"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Insights & Resources",
  description:
    "Trade intelligence, market-entry guides, and Africa business insights from the Karagateway team.",
}

export default function InsightsPage() {
  const posts = getAllPosts()

  return (
    <div style={{ backgroundColor: "var(--color-surface-base)" }}>
      {/* Header */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
            style={{ backgroundColor: "rgba(212,129,31,0.18)", color: "var(--color-brand-amber)" }}
          >
            Insights & Resources
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              color: "var(--color-cream)",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            Trade intelligence for a connected world
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.0625rem", lineHeight: "1.75", maxWidth: "52ch", margin: "0 auto" }}>
            Market-entry guides, compliance essentials, and practical insights from Karagateway's team — so you can trade smarter across Africa and beyond.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          {posts.length === 0 ? (
            <p className="text-center py-16" style={{ color: "var(--color-slate)" }}>
              Posts coming soon — check back shortly.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="group block p-7 rounded-2xl transition-all card-hover"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid rgba(135,110,75,0.15)",
                    boxShadow: "0 2px 12px rgba(14,27,45,0.05)",
                  }}
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: "rgba(224,90,34,0.08)", color: "var(--color-brand-orange)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2
                    className="mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      color: "var(--color-charcoal)",
                      lineHeight: 1.35,
                    }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm mb-5" style={{ color: "var(--color-slate)", lineHeight: "1.7" }}>
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--color-slate-light)" }}>
                      {formatDate(post.date)}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                      style={{ color: "var(--color-brand-orange)" }}
                    >
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: "var(--color-surface-warm)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "var(--color-charcoal)",
            }}
          >
            Ready to move from reading to doing?
          </h2>
          <p className="mb-7" style={{ color: "var(--color-slate)", lineHeight: "1.75" }}>
            Our team works directly with businesses at every stage of their Africa trade journey. Book a free 30-minute conversation and let&apos;s discuss your specific situation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{ backgroundColor: "var(--color-brand-orange)" }}
          >
            Book a Free Consultation <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  )
}
