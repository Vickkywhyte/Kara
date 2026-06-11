import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Our Services",
  description: "Trade advisory, partner sourcing, country management and transaction facilitation for the Europe–Nigeria corridor.",
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
