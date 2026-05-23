import type { Metadata } from "next"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import "@fontsource/cormorant-garamond/400.css"
import "@fontsource/cormorant-garamond/600.css"
import "@fontsource/cormorant-garamond/700.css"
import "@fontsource/plus-jakarta-sans/400.css"
import "@fontsource/plus-jakarta-sans/500.css"
import "@fontsource/plus-jakarta-sans/600.css"
import "@fontsource/plus-jakarta-sans/700.css"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Karagateway — Africa & Global Market Entry Advisory",
    template: "%s | Karagateway",
  },
  description:
    "Boutique Africa↔Global market-entry advisory. On-the-ground presence in Lagos — Country Manager-as-a-Service, distributor sourcing, soft-landing, and localization.",
  keywords: [
    "Africa market entry",
    "Nigeria market entry",
    "trade facilitation",
    "country manager Africa",
    "Lagos business advisory",
  ],
  authors: [{ name: "Karagateway" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://karagateway.com",
    siteName: "Karagateway",
    title: "Karagateway — Africa & Global Market Entry Advisory",
    description:
      "On-the-ground market entry advisory for Africa. Your team in Lagos.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@karagateway",
  },
  icons: {
    icon: "/brand/logo-dark.png",
    apple: "/brand/logo-dark.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
