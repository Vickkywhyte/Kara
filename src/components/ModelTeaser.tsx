"use client"

import Link from "next/link"
import { StaggerGrid, StaggerItem } from "./motion/StaggerGrid"
import { useLanguage } from "@/context/LanguageContext"

export function ModelTeaser() {
  const { t } = useLanguage()
  const phases = [
    { number: "01", title: t.modelTeaser.phase1.title, tagline: t.modelTeaser.phase1.tagline },
    { number: "02", title: t.modelTeaser.phase2.title, tagline: t.modelTeaser.phase2.tagline },
    { number: "03", title: t.modelTeaser.phase3.title, tagline: t.modelTeaser.phase3.tagline },
    { number: "04", title: t.modelTeaser.phase4.title, tagline: t.modelTeaser.phase4.tagline },
  ]
  return (
    <section
      className="py-16 lg:py-20"
      style={{ backgroundColor: "var(--color-surface-base)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-brand-amber)" }}
            >
              {t.modelTeaser.eyebrow}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--color-charcoal)",
              }}
            >
              {t.modelTeaser.heading}
            </h2>
          </div>
          <Link
            href="/model"
            className="flex-shrink-0 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-brand-amber)" }}
          >
            {t.modelTeaser.seeMore}
          </Link>
        </div>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {phases.map(({ number, title, tagline }) => (
            <StaggerItem key={number}>
              <div
                className="relative p-6 rounded-xl h-full"
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(135,110,75,0.15)",
                }}
              >
                <div
                  className="text-5xl font-bold mb-4 leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "rgba(224,90,34,0.20)",
                    userSelect: "none",
                  }}
                >
                  {number}
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.125rem",
                    color: "var(--color-charcoal)",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-slate)", fontStyle: "italic" }}>
                  {tagline}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <p
          className="mt-8 text-center text-sm italic"
          style={{ color: "var(--color-slate-light)" }}
        >
          {t.modelTeaser.loop}
        </p>
      </div>
    </section>
  )
}
