import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Our Model",
  description: "Neutral trade facilitation. No ownership of goods, no handling of funds, dual-layer counterparty verification on every engagement.",
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
