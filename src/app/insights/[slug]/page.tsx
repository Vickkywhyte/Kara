import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPost, formatDate } from "@/lib/posts"
import { InsightArticleCTA, InsightBackLink, InsightAllLink } from "./InsightArticleCTA"

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
          <div className="mb-8">
            <InsightAllLink />
          </div>

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

          <InsightArticleCTA />

          <div className="mt-8 text-center">
            <InsightBackLink />
          </div>
        </div>
      </section>
    </div>
  )
}
