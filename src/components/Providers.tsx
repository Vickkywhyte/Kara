"use client"

import { ConsentProvider } from "@/context/ConsentContext"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return <ConsentProvider>{children}</ConsentProvider>
}
