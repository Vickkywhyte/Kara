import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import { ChatWidget } from "@/components/ChatWidget"
import { Providers } from "@/components/Providers"
import { CookieBanner } from "@/components/CookieBanner"
import "@fontsource/cormorant-garamond/400.css"
import "@fontsource/cormorant-garamond/600.css"
import "@fontsource/cormorant-garamond/700.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Karagateway — Africa & Global Market Entry Advisory",
    template: "%s | Karagateway",
  },
  description:
    "Boutique Africa↔Global market-entry advisory. Country Manager-as-a-Service, distributor sourcing, soft-landing, and localization.",
  keywords: [
    "Africa market entry",
    "Nigeria market entry",
    "trade facilitation",
    "country manager Africa",
    "African business advisory",
  ],
  authors: [{ name: "Karagateway" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.karagateway.com",
    siteName: "Karagateway",
    title: "Karagateway — Africa & Global Market Entry Advisory",
    description: "On-the-ground market entry advisory for Africa and global markets.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
          <CookieBanner />
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-G2CNGMC3C5" />
    </html>
  )
}
