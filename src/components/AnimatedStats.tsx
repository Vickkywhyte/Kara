"use client"

import { useEffect, useRef, useState } from "react"
import { Globe, Package, Handshake } from "lucide-react"
import { FadeUp } from "./motion/FadeUp"

const stats = [
  { value: 2, suffix: "+", label: "Continents Connected",                   Icon: Globe },
  { value: 2, suffix: "+", label: "Products Sourced",                        Icon: Package },
  { value: 2, suffix: "+", label: "Trusted by SMEs, Govts & Trade Groups",   Icon: Handshake },
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
      style={{ backgroundColor: "var(--color-surface-base)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map(({ value, suffix, label, Icon }, i) => (
            <FadeUp key={label} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-1"
                  style={{ backgroundColor: "rgba(224,90,34,0.08)" }}
                >
                  <Icon size={22} style={{ color: "var(--color-brand-orange)" }} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.25rem, 5vw, 3rem)",
                    fontWeight: 700,
                    color: "var(--color-charcoal)",
                    lineHeight: 1,
                  }}
                >
                  <CountUp target={value} suffix={suffix} />
                </div>
                <p style={{ color: "var(--color-slate)", fontSize: "0.9rem", letterSpacing: "0.03em" }}>
                  {label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
