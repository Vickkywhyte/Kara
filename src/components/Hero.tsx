"use client"

import Link from "next/link"

/*
 * Hero section — cinematic dark full-viewport section with layered depth.
 * Three CSS layers:
 *   1. Background: gradient mesh in brand palette (placeholder until TODO:image-hero is supplied)
 *   2. Mid: floating geometric accent (CSS only, no images)
 *   3. Foreground: headline, tagline, CTAs
 *
 * TODO(human:image-hero) — Drop a hero background image at public/images/hero-bg.jpg
 * (recommended: 16:9 or 2:1, dark/cinematic — Lagos skyline or diverse business professionals,
 * warm-meets-minimal palette). Source free images from Unsplash or Pexels using search:
 * "Lagos skyline night", "African European business meeting", "global trade professionals".
 * Then uncomment the background-image line below.
 */
export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        backgroundColor: "var(--color-surface-dark)",
        /* TODO(human:image-hero) uncomment and update path when image is ready:
           backgroundImage: "url('/images/hero-bg.jpg')",
           backgroundSize: "cover",
           backgroundPosition: "center top",
        */
      }}
    >
      {/* Layer 1 — gradient background (brand palette placeholder) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%,
              rgba(224, 90, 34, 0.18) 0%,
              transparent 60%),
            radial-gradient(ellipse 60% 80% at 20% 80%,
              rgba(135, 110, 75, 0.15) 0%,
              transparent 55%),
            linear-gradient(160deg, #0d0d0d 0%, #0f1b2d 50%, #1c0e08 100%)
          `,
        }}
      />

      {/* Layer 2 — floating geometric mid-layer (suggest connectivity) */}
      <div aria-hidden="true" className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Large arc */}
        <div
          className="absolute"
          style={{
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            border: "1px solid rgba(224,90,34,0.10)",
            top: "-200px",
            right: "-150px",
          }}
        />
        {/* Medium arc */}
        <div
          className="absolute"
          style={{
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            border: "1px solid rgba(135,110,75,0.12)",
            bottom: "-80px",
            left: "-80px",
          }}
        />
        {/* Diagonal accent bar */}
        <div
          className="absolute"
          style={{
            width: "3px",
            height: "180px",
            background: "linear-gradient(to bottom, transparent, rgba(224,90,34,0.5), transparent)",
            top: "25%",
            right: "15%",
            transform: "rotate(20deg)",
          }}
        />
      </div>

      {/* Layer 3 — foreground content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p
            className="animate-fade-up text-sm font-semibold tracking-widest uppercase mb-6"
            style={{ color: "var(--color-brand-amber)" }}
          >
            Africa ↔ Global Market Entry
          </p>

          {/* Headline */}
          <h1
            className="animate-fade-up delay-100"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 600,
              color: "var(--color-cream)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Where Global Innovations and Opportunities Meet{" "}
            <span style={{ color: "var(--color-brand-orange)" }}>African Excellence</span>
          </h1>

          {/* Tagline */}
          <p
            className="animate-fade-up delay-200"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "rgba(250,247,242,0.75)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "52ch",
            }}
          >
            We help businesses across continents discover new markets, forge partnerships, and grow sustainably.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 flex flex-wrap gap-4">
            <Link
              href="/#assessment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "var(--color-brand-orange)" }}
            >
              Start Your Trade Journey
            </Link>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-white/15"
              style={{
                border: "1px solid rgba(250,247,242,0.35)",
                color: "var(--color-cream)",
              }}
            >
              Partner with Us
            </Link>
          </div>

          {/* Quick snapshot */}
          <p
            className="animate-fade-up delay-400 mt-10 text-sm"
            style={{ color: "rgba(250,247,242,0.45)", fontStyle: "italic" }}
          >
            Bringing the world's innovations to Africa — and Africa's excellence to the world through trade.
          </p>
        </div>
      </div>

      {/* Diagonal transition to next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 z-20 pointer-events-none"
        style={{
          height: "80px",
          background: "var(--color-surface-base)",
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }}
      />
    </section>
  )
}
