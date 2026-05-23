"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 2,  suffix: "",  label: "Continents Connected",        icon: "🌍" },
  { value: 50, suffix: "+", label: "Products Sourced",            icon: "📦" },
  { value: 5,  suffix: "+", label: "SMEs, Govts & Trade Groups",  icon: "🤝" },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1400
          const steps = 40
          const interval = duration / steps
          let step = 0
          const timer = setInterval(() => {
            step++
            setCount(Math.round((target * step) / steps))
            if (step >= steps) clearInterval(timer)
          }, interval)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function AnimatedStats() {
  return (
    <section
      className="py-12 lg:py-16"
      style={{ backgroundColor: "var(--color-navy)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map(({ value, suffix, label, icon }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="text-3xl mb-1" role="img" aria-label={label}>{icon}</span>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.25rem, 5vw, 3rem)",
                  fontWeight: 700,
                  color: "var(--color-cream)",
                  lineHeight: 1,
                }}
              >
                <CountUp target={value} suffix={suffix} />
              </div>
              <p style={{ color: "var(--color-slate-light)", fontSize: "0.9rem", letterSpacing: "0.03em" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
