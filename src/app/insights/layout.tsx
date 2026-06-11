import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Insights & Resources",
  description: "Trade insights, market intelligence and compliance guides for businesses on the Europe–Africa corridor.",
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
