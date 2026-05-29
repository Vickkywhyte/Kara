"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Logo } from "./Logo"
import { clsx } from "clsx"

const navLinks = [
  { href: "/",         label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/sectors",  label: "Sectors" },
  { href: "/model",    label: "Our Model" },
  { href: "/about",    label: "About" },
  { href: "/careers",  label: "Careers" },
  { href: "/contact",  label: "Contact" },
]

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

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

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled || open ? "nav-solid" : "nav-transparent"
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Logo variant="dark" />

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-7">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "text-sm font-medium transition-colors duration-200 relative",
                  active
                    ? "text-[var(--color-brand-orange)]"
                    : "text-[var(--color-charcoal)] hover:text-[var(--color-brand-orange)]"
                )}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px rounded-full"
                    style={{ backgroundColor: "var(--color-brand-orange)" }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-3 -mr-1 rounded-lg text-[var(--color-charcoal)] transition-colors touch-manipulation"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[var(--color-cream)] border-t border-[var(--color-brand-gold)]/20"
        >
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "text-base font-medium py-3 px-3 rounded-lg transition-colors",
                    active
                      ? "text-[var(--color-brand-orange)] bg-[rgba(224,90,34,0.06)]"
                      : "text-[var(--color-charcoal)] hover:text-[var(--color-brand-orange)] hover:bg-[rgba(224,90,34,0.04)]"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </motion.header>
  )
}
