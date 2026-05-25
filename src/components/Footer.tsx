import Link from "next/link"
import { Phone, Mail, Briefcase, AtSign, Camera, Share2 } from "lucide-react"
import { Logo } from "./Logo"

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

// TODO(human:social-links) — replace # with your actual social URLs
const socials = [
  { Icon: Briefcase, href: "https://www.linkedin.com/company/109096257/",                    label: "LinkedIn" },
  { Icon: AtSign,    href: "https://x.com/karagateway",                                      label: "X / Twitter (@karagateway)" },
  { Icon: Camera,    href: "https://www.instagram.com/karagateway",                          label: "Instagram" },
  { Icon: Share2,    href: "https://www.facebook.com/profile.php?id=61580678617699",          label: "Facebook" },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-surface-warm)", color: "var(--color-slate)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo variant="dark" width={150} />
            </div>
            <p style={{ color: "var(--color-slate)", fontSize: "0.9rem", lineHeight: "1.7" }}>
              Connecting Africa and the world through trade, opportunity, and innovation.
            </p>
            <div className="flex gap-4 mt-6">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg transition-colors hover:bg-[rgba(224,90,34,0.08)]"
                  style={{ color: "var(--color-slate)" }}
                >
                  <Icon size={18} />
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
                href="/#assessment"
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
            <Link href="/terms" className="hover:text-[var(--color-brand-orange)] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-[var(--color-brand-orange)] transition-colors">
              Privacy Policy
            </Link>
            <span>Lagos · Estonia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
