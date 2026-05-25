"use client"

import Link from "next/link"
import { motion } from "framer-motion"

/*
 * Hero section — bright, airy light theme with brand orange accents.
 * Geometric arc rings and diagonal bar give depth without images.
 *
 * TODO(human:image-hero) — Drop a hero image at public/images/hero-bg.jpg and
 * uncomment the backgroundImage line below. Recommended: 16:9 or 2:1, high-contrast
 * with clear foreground subject. Source free from Unsplash: "African European
 * business meeting", "Lagos skyline", "global trade professionals".
 */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        backgroundColor: "var(--color-surface-base)",
        /* TODO(human:image-hero) uncomment when image is ready:
           backgroundImage: "url('/images/hero-bg.jpg')",
           backgroundSize: "cover",
           backgroundPosition: "center top",
        */
      }}
    >
      {/* Layer 1 — soft radial gradients for warmth and depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 75% 35%,
              rgba(224,90,34,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 55% 70% at 15% 80%,
              rgba(135,110,75,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* Layer 2 — floating geometric accents (light version of the dark hero rings) */}
      <div aria-hidden="true" className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Large arc — top right */}
        <div
          className="absolute"
          style={{
            width: "700px", height: "700px",
            borderRadius: "50%",
            border: "1px solid rgba(224,90,34,0.10)",
            top: "-200px", right: "-150px",
          }}
        />
        {/* Medium arc — bottom left */}
        <div
          className="absolute"
          style={{
            width: "420px", height: "420px",
            borderRadius: "50%",
            border: "1px solid rgba(135,110,75,0.10)",
            bottom: "-80px", left: "-80px",
          }}
        />
        {/* Small inner arc — top right, nested */}
        <div
          className="absolute"
          style={{
            width: "440px", height: "440px",
            borderRadius: "50%",
            border: "1px solid rgba(224,90,34,0.06)",
            top: "-80px", right: "-60px",
          }}
        />
        {/* Diagonal accent bar */}
        <div
          className="absolute"
          style={{
            width: "3px", height: "180px",
            background: "linear-gradient(to bottom, transparent, rgba(224,90,34,0.40), transparent)",
            top: "25%", right: "15%",
            transform: "rotate(20deg)",
          }}
        />
      </div>

      {/* Layer 3 — foreground content, Framer Motion orchestrated */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 py-32 lg:py-40"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="text-sm font-semibold tracking-widest uppercase mb-6"
            style={{ color: "var(--color-brand-amber)" }}
          >
            Africa ↔ Global Market Entry
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={item}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 600,
              color: "var(--color-charcoal)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Where Global Innovations and Opportunities Meet{" "}
            <span style={{ color: "var(--color-brand-orange)" }}>African Excellence</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={item}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "var(--color-slate)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "52ch",
            }}
          >
            We help businesses across continents discover new markets, forge partnerships, and grow sustainably.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Link
              href="/#assessment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "var(--color-brand-orange)" }}
            >
              Start Your Trade Journey
            </Link>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-[rgba(28,28,28,0.05)]"
              style={{
                border: "1px solid rgba(28,28,28,0.2)",
                color: "var(--color-charcoal)",
              }}
            >
              Partner with Us
            </Link>
          </motion.div>

          {/* Quick snapshot */}
          <motion.p
            variants={item}
            className="mt-10 text-sm"
            style={{ color: "var(--color-slate-light)", fontStyle: "italic" }}
          >
            Bringing the world's innovations to Africa — and Africa's excellence to the world through trade.
          </motion.p>
        </div>
      </motion.div>

      {/* Diagonal transition to next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 z-20 pointer-events-none"
        style={{
          height: "80px",
          background: "var(--color-surface-warm)",
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }}
      />
    </section>
  )
}
