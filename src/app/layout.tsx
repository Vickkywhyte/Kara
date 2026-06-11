import type { Metadata } from "next"
import Script from "next/script"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import { ChatWidget } from "@/components/ChatWidget"
import { Providers } from "@/components/Providers"
import { CookieBanner } from "@/components/CookieBanner"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
})

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
    <html lang="en" className={`h-full ${cormorant.variable} ${inter.variable}`}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WX2HKZPQ');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WX2HKZPQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
