"use client"

import { ConsentProvider } from "@/context/ConsentContext"
import { LanguageProvider } from "@/context/LanguageContext"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ConsentProvider>{children}</ConsentProvider>
    </LanguageProvider>
  )
}
