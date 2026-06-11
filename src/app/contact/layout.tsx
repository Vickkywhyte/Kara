import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with KaraGateway to start your trade journey or explore a partnership on the Europe–Nigeria corridor.",
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
