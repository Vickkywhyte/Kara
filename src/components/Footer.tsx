import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import { Logo } from "./Logo"
import { CookieSettingsLink } from "./CookieSettingsLink"

const serviceLinks = [
  { href: "/services#country-manager",  label: "Country Manager-as-a-Service" },
  { href: "/services#channel-partner",  label: "Channel-Partner Sourcing" },
  { href: "/services#soft-landing",     label: "Soft-Landing Package" },
  { href: "/services#localization",     label: "Localization & Go-to-Market" },
  { href: "/services",                  label: "All Services" },
]

const companyLinks = [
  { href: "/about",   label: "About" },
  { href: "/model",   label: "Our Model" },
  { href: "/sectors", label: "Sectors We Serve" },
  { href: "/partner", label: "Partner With Us" },
  { href: "/contact", label: "Contact" },
]

const socials = [
  {
    href: "https://www.linkedin.com/company/109096257/",
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: "https://x.com/karagateway",
    label: "X / Twitter",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M15.203 1.875h2.654l-5.797 6.625 6.815 9.004h-5.34l-4.18-5.465-4.783 5.465H1.92l6.2-7.085-6.545-9.544h5.473l3.779 4.997 4.376-4.997Zm-.93 14.035h1.47L5.79 3.382H4.213l10.06 12.528Z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/karagateway",
    label: "Instagram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/profile.php?id=61580678617699",
    label: "Facebook",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-surface-warm)", color: "var(--color-slate)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo variant="dark" />
            </div>
            <p style={{ color: "var(--color-slate)", fontSize: "0.9rem", lineHeight: "1.7" }}>
              Connecting Africa and the world through trade, opportunity, and innovation.
            </p>
            <div className="flex gap-4 mt-6">
              {socials.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg transition-colors hover:bg-[rgba(224,90,34,0.08)]"
                  style={{ color: "var(--color-slate)" }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", marginBottom: "1rem", color: "var(--color-charcoal)" }}>
              Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "var(--color-slate)", fontSize: "0.875rem" }}
                    className="hover:text-[var(--color-brand-orange)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", marginBottom: "1rem", color: "var(--color-charcoal)" }}>
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "var(--color-slate)", fontSize: "0.875rem" }}
                    className="hover:text-[var(--color-brand-orange)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", marginBottom: "1rem", color: "var(--color-charcoal)" }}>
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+37253945725"
                  className="flex items-center gap-2 text-sm hover:text-[var(--color-brand-orange)] transition-colors"
                  style={{ color: "var(--color-slate)" }}
                >
                  <Phone size={15} />
                  +372 5394 5725
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@karagateway.com"
                  className="flex items-center gap-2 text-sm hover:text-[var(--color-brand-orange)] transition-colors"
                  style={{ color: "var(--color-slate)" }}
                >
                  <Mail size={15} />
                  info@karagateway.com
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <Link
                href="/services"
                className="inline-block text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:brightness-110"
                style={{ backgroundColor: "var(--color-brand-orange)", color: "white" }}
              >
                Start Your Trade Journey
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(135,110,75,0.15)", color: "var(--color-slate)" }}
        >
          <p>© {new Date().getFullYear()} Karagateway. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/terms-and-conditions" className="hover:text-[var(--color-brand-orange)] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-[var(--color-brand-orange)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-[var(--color-brand-orange)] transition-colors">
              Cookie Policy
            </Link>
            <CookieSettingsLink />
            <span>Estonia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
