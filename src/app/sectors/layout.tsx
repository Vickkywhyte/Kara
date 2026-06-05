import type { Metadata } from "next"
export const metadata: Metadata = { title: "Sectors We Serve" }
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
