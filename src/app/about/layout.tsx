import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "About",
  description: "EU-registered trade facilitation company on the Europe–Nigeria corridor. We connect verified buyers and sellers and coordinate every step of the trade process.",
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
