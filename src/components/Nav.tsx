"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Logo } from "./Logo"
import { clsx } from "clsx"

const navLinks = [
  { href: "/services",  label: "Services" },
  { href: "/model",     label: "Our Model" },
  { href: "/sectors",   label: "Sectors" },
  { href: "/partner",   label: "Partner" },
  { href: "/insights",  label: "Insights" },
  { href: "/about",     label: "About" },
  { href: "/contact",   label: "Contact" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled || open ? "nav-solid" : "nav-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo — sits directly on the light background, no box needed */}
        <Logo variant="dark" width={140} />

        {/* Desktop links — charcoal always (light theme hero) */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-charcoal)] hover:text-[var(--color-brand-orange)] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/#assessment"
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[var(--color-brand-orange)] text-white hover:bg-[var(--color-brand-terracotta)] shadow-sm hover:shadow-md transition-all duration-200"
          >
            Start Your Trade Journey
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-[var(--color-charcoal)] transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="lg:hidden bg-[var(--color-cream)] border-t border-[var(--color-brand-gold)]/20">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-[var(--color-charcoal)] hover:text-[var(--color-brand-orange)] transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#assessment"
              onClick={() => setOpen(false)}
              className="mt-2 text-center text-sm font-semibold px-5 py-3 rounded-full bg-[var(--color-brand-orange)] text-white hover:bg-[var(--color-brand-terracotta)] transition-colors"
            >
              Start Your Trade Journey
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
