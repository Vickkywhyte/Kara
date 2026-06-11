import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Partner With Us",
  description: "Join KaraGateway verified partner network — logistics, inspection, legal and trade specialists on the Africa–Europe corridor.",
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
