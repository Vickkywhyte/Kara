import { socialLinks, type SocialMeta } from "@/data/socials"

function SocialIcon({ id }: { id: SocialMeta["id"] }) {
  switch (id) {
    case "linkedin":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    case "twitter":
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M15.203 1.875h2.654l-5.797 6.625 6.815 9.004h-5.34l-4.18-5.465-4.783 5.465H1.92l6.2-7.085-6.545-9.544h5.473l3.779 4.997 4.376-4.997Zm-.93 14.035h1.47L5.79 3.382H4.213l10.06 12.528Z" />
        </svg>
      )
    case "instagram":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    case "facebook":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
  }
}

interface SocialLinksProps {
  className?: string
  iconClassName?: string
}

export function SocialLinks({ className = "flex gap-3", iconClassName }: SocialLinksProps) {
  return (
    <div className={className}>
      {socialLinks.map(({ id, href, label }) => (
        <a
          key={id}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className={
            iconClassName ??
            "p-2.5 rounded-lg transition-colors hover:bg-[rgba(224,90,34,0.10)]"
          }
          style={{ color: "var(--color-slate)" }}
        >
          <SocialIcon id={id} />
        </a>
      ))}
    </div>
  )
}
