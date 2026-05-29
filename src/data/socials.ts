export interface SocialMeta {
  id: "linkedin" | "twitter" | "instagram" | "facebook"
  href: string
  label: string
}

export const socialLinks: SocialMeta[] = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/company/109096257/",
    label: "LinkedIn",
  },
  {
    id: "twitter",
    href: "https://x.com/karagateway",
    label: "X / Twitter",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/karagateway",
    label: "Instagram",
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/profile.php?id=61580678617699",
    label: "Facebook",
  },
]
