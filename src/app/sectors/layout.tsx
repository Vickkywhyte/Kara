import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Sectors We Serve",
  description: "Agro-processing equipment, agri-food exports, healthcare and renewable energy — the highest-opportunity sectors on the Europe–Africa trade corridor.",
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
