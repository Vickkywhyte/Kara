import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPost, formatDate } from "@/lib/posts"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts(true).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

/* ── MDX component overrides — keep prose on-brand ───────────────────────── */
const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
        color: "var(--color-charcoal)",
        marginTop: "2rem",
        marginBottom: "0.875rem",
        lineHeight: 1.25,
      }}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.125rem",
        color: "var(--color-charcoal)",
        marginTop: "1.5rem",
        marginBottom: "0.625rem",
      }}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} style={{ color: "var(--color-charcoal)", lineHeight: "1.8", marginBottom: "1rem" }} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} style={{ paddingLeft: "1.25rem", marginBottom: "1rem", color: "var(--color-charcoal)" }} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} style={{ paddingLeft: "1.25rem", marginBottom: "1rem", color: "var(--color-charcoal)" }} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} style={{ lineHeight: "1.75", marginBottom: "0.375rem" }} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      style={{
        borderLeft: "3px solid var(--color-brand-orange)",
        paddingLeft: "1.25rem",
        margin: "1.5rem 0",
        color: "var(--color-slate)",
        fontStyle: "italic",
      }}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} style={{ color: "var(--color-charcoal)", fontWeight: 600 }} />
  ),
  hr: () => (
    <hr style={{ border: "none", borderTop: "1px solid rgba(135,110,75,0.18)", margin: "2rem 0" }} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} style={{ color: "var(--color-brand-orange)", textDecoration: "underline" }} />
  ),
}

export default async function InsightPost({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div style={{ backgroundColor: "var(--color-surface-base)" }}>
      {/* Header */}
      <section
        className="py-16 lg:py-20"
        style={{ backgroundColor: "var(--color-surface-base)" }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          {/* Back link */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--color-slate)" }}
          >
            <ArrowLeft size={14} /> All Insights
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: "rgba(224,90,34,0.08)", color: "var(--color-brand-amber)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--color-charcoal)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            {post.title}
          </h1>

          <div className="mb-4 h-px w-12" style={{ backgroundColor: "rgba(224,90,34,0.4)" }} />

          <p style={{ color: "var(--color-slate-light)", fontSize: "0.875rem" }}>
            {formatDate(post.date)}
          </p>
        </div>
      </section>

      {/* Post body */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div
            className="p-8 lg:p-10 rounded-2xl"
            style={{
              backgroundColor: "white",
              border: "1px solid rgba(135,110,75,0.12)",
              boxShadow: "0 4px 24px rgba(14,27,45,0.06)",
            }}
          >
            <MDXRemote source={post.content} components={components} />
          </div>

          {/* Footer CTA */}
          <div
            className="mt-10 p-8 rounded-2xl text-center"
            style={{
              background: "linear-gradient(135deg, var(--color-brand-orange), var(--color-brand-terracotta))",
            }}
          >
            <p
              className="mb-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                color: "white",
              }}
            >
              Ready to discuss your situation?
            </p>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.85)", lineHeight: "1.65" }}>
              This article is general guidance. For advice specific to your product, market, and stage, book a free 30-minute call with our team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-white transition-all hover:bg-opacity-90"
              style={{ color: "var(--color-brand-orange)" }}
            >
              Book a Free Consultation <ArrowRight size={14} />
            </Link>
          </div>

          {/* Back to insights */}
          <div className="mt-8 text-center">
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
              style={{ color: "var(--color-slate)" }}
            >
              <ArrowLeft size={14} /> Back to all insights
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
