import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Insights & Resources",
  description: "Trade intelligence, market-entry guides, and Africa business insights from the Karagateway team.",
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
