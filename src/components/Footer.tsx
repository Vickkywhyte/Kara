"use client"

import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import { Logo } from "./Logo"
import { CookieSettingsLink } from "./CookieSettingsLink"
import { SocialLinks } from "./SocialLinks"
import { useLanguage } from "@/context/LanguageContext"

const offeringLinks = [
  { href: "/services", label: "Services" },
  { href: "/model",    label: "Our Model" },
  { href: "/sectors",  label: "Sectors" },
]

const companyLinks = [
  { href: "/",         label: "Home" },
  { href: "/about",    label: "About" },
  { href: "/careers",  label: "Careers" },
  { href: "/contact",  label: "Contact" },
]

const resourceLinks = [
  { href: "/insights", label: "Insights" },
  { href: "/partner",  label: "Partner With Us" },
]

function FooterCol({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", marginBottom: "1rem", color: "var(--color-charcoal)" }}>
        {heading}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
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
  )
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer style={{ backgroundColor: "var(--color-surface-warm)", color: "var(--color-slate)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column — spans 2 on lg so it has room for logo + socials + contact */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo variant="dark" />
            </div>
            <p style={{ color: "var(--color-slate)", fontSize: "0.9rem", lineHeight: "1.7", maxWidth: "30ch" }}>
              {t.footer.tagline}
            </p>
            <SocialLinks className="flex gap-4 mt-5" iconClassName="p-2 rounded-lg transition-colors hover:bg-[rgba(224,90,34,0.08)]" />
            <ul className="mt-5 space-y-2">
              <li>
                <a
                  href="tel:+37253945725"
                  className="flex items-center gap-2 text-sm hover:text-[var(--color-brand-orange)] transition-colors"
                  style={{ color: "var(--color-slate)" }}
                >
                  <Phone size={14} />
                  +372 5394 5725
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@karagateway.com"
                  className="flex items-center gap-2 text-sm hover:text-[var(--color-brand-orange)] transition-colors"
                  style={{ color: "var(--color-slate)" }}
                >
                  <Mail size={14} />
                  info@karagateway.com
                </a>
              </li>
            </ul>
          </div>

          {/* Offering */}
          <FooterCol heading={t.footer.offering} links={offeringLinks} />

          {/* Company */}
          <FooterCol heading={t.footer.company} links={companyLinks} />

          {/* Resources */}
          <FooterCol heading={t.footer.resources} links={resourceLinks} />

        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(135,110,75,0.15)", color: "var(--color-slate)" }}
        >
          <p>© {new Date().getFullYear()} Karagateway. {t.footer.rights}</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
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
            <span>{t.footer.country}</span>
          </div>
        </div>

        {/* Legal registration */}
        <p
          className="mt-4 text-center"
          style={{ fontSize: "0.75rem", color: "rgba(74,90,107,0.55)" }}
        >
          Karagateway O&Uuml; &middot; Registry code: 17421728 &middot; Registered in the Republic of Estonia
        </p>
      </div>
    </footer>
  )
}
