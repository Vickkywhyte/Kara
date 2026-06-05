import Link from "next/link"
import { getAllPosts, formatDate } from "@/lib/posts"
import { ArrowRight } from "lucide-react"
import { PageTransition } from "@/components/motion/PageTransition"
import { InsightsHeader, InsightsEmpty, InsightsReadLabel, InsightsCTA } from "./InsightsUI"

export default function InsightsPage() {
  const posts = getAllPosts()

  return (
    <PageTransition>
      <InsightsHeader />

      {/* Post grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          {posts.length === 0 ? (
            <InsightsEmpty />
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
                  <h2
                    className="mb-3"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-charcoal)", lineHeight: 1.35 }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm mb-5" style={{ color: "var(--color-slate)", lineHeight: "1.7" }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--color-slate-light)" }}>
                      {formatDate(post.date)}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                      style={{ color: "var(--color-brand-orange)" }}
                    >
                      <InsightsReadLabel /> <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <InsightsCTA />
    </PageTransition>
  )
}
