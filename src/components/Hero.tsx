"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

/* City nodes: [cx%, cy%, isPulse] — positions relative to the SVG viewBox 0 0 100 100 */
const cities = [
  { id: "london",     cx: 47,  cy: 28,  pulse: false },
  { id: "tallinn",    cx: 52,  cy: 22,  pulse: true  },
  { id: "newyork",    cx: 22,  cy: 33,  pulse: false },
  { id: "saopaulo",   cx: 28,  cy: 68,  pulse: false },
  { id: "accra",      cx: 44,  cy: 60,  pulse: false },
  { id: "lagos",      cx: 48,  cy: 62,  pulse: true  },
  { id: "nairobi",    cx: 55,  cy: 64,  pulse: false },
  { id: "capetown",   cx: 51,  cy: 77,  pulse: false },
  { id: "dubai",      cx: 62,  cy: 41,  pulse: false },
  { id: "mumbai",     cx: 65,  cy: 48,  pulse: false },
  { id: "singapore",  cx: 73,  cy: 54,  pulse: false },
  { id: "tokyo",      cx: 80,  cy: 36,  pulse: false },
]

/* Connection arcs: quadratic bezier M x1,y1 Q mx,my x2,y2 */
const arcs = [
  "M 47,28 Q 40,15 52,22",   // london → tallinn
  "M 47,28 Q 30,10 22,33",   // london → new york
  "M 47,28 Q 50,44 48,62",   // london → lagos
  "M 22,33 Q 25,52 28,68",   // new york → são paulo
  "M 44,60 Q 42,64 48,62",   // accra → lagos
  "M 48,62 Q 52,63 55,64",   // lagos → nairobi
  "M 55,64 Q 53,71 51,77",   // nairobi → cape town
  "M 48,62 Q 56,50 62,41",   // lagos → dubai
  "M 62,41 Q 64,45 65,48",   // dubai → mumbai
  "M 65,48 Q 69,52 73,54",   // mumbai → singapore
  "M 62,41 Q 71,38 80,36",   // dubai → tokyo
  "M 52,22 Q 58,30 62,41",   // tallinn → dubai
]

function WorldMap() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Connection arcs — animated path draw */}
      {arcs.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="rgba(224,90,34,0.18)"
          strokeWidth="0.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 + i * 0.06, ease: "easeOut" }}
        />
      ))}

      {/* City dots */}
      {cities.map(({ id, cx, cy, pulse }, i) => (
        <g key={id}>
          {pulse && (
            <motion.circle
              cx={cx} cy={cy} r="2.5"
              fill="rgba(224,90,34,0)"
              stroke="rgba(224,90,34,0.35)"
              strokeWidth="0.5"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ duration: 2, delay: 1.5 + i * 0.1, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <motion.circle
            cx={cx} cy={cy} r="1.2"
            fill="rgba(224,90,34,0.55)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          />
        </g>
      ))}
    </svg>
  )
}

export function Hero() {
  const { t } = useLanguage()
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-base)" }}
    >
      {/* Layer 1 — soft radial gradients for warmth and depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 75% 35%,
              rgba(224,90,34,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 55% 70% at 15% 80%,
              rgba(135,110,75,0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Layer 2 — geometric rings + world map */}
      <div aria-hidden="true" className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Geometric arc rings */}
        <div
          className="absolute"
          style={{
            width: "700px", height: "700px",
            borderRadius: "50%",
            border: "1px solid rgba(224,90,34,0.08)",
            top: "-200px", right: "-150px",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "420px", height: "420px",
            borderRadius: "50%",
            border: "1px solid rgba(135,110,75,0.08)",
            bottom: "-80px", left: "-80px",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "440px", height: "440px",
            borderRadius: "50%",
            border: "1px solid rgba(224,90,34,0.05)",
            top: "-80px", right: "-60px",
          }}
        />
        {/* Diagonal accent bar */}
        <div
          className="absolute"
          style={{
            width: "3px", height: "180px",
            background: "linear-gradient(to bottom, transparent, rgba(224,90,34,0.35), transparent)",
            top: "25%", right: "15%",
            transform: "rotate(20deg)",
          }}
        />

        {/* World map — desktop right column */}
        <div
          className="absolute hidden lg:block"
          style={{
            right: "2%", top: "10%",
            width: "46%", height: "80%",
            opacity: 0.9,
          }}
        >
          <WorldMap />
        </div>
      </div>

      {/* Layer 3 — foreground content */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 py-32 lg:py-40 w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-2xl lg:max-w-[55%]">
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="text-sm font-semibold tracking-widest uppercase mb-6"
            style={{ color: "var(--color-brand-amber)" }}
          >
            {t.hero.eyebrow}
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={item}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 600,
              color: "var(--color-charcoal)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              marginBottom: "1.5rem",
            }}
          >
            {t.hero.heading}{" "}
            <span style={{ color: "var(--color-brand-orange)" }}>{t.hero.headingAccent}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={item}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--color-slate)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
              maxWidth: "50ch",
            }}
          >
            {t.hero.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "var(--color-brand-orange)" }}
            >
              {t.hero.cta1}
            </Link>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-[rgba(28,28,28,0.05)]"
              style={{
                border: "1px solid rgba(28,28,28,0.2)",
                color: "var(--color-charcoal)",
              }}
            >
              {t.hero.cta2}
            </Link>
          </motion.div>
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
