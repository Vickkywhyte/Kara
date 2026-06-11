"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Hero }               from "@/components/Hero"
import { PremiumServicesBand } from "@/components/PremiumServicesBand"
import { AnimatedStats }       from "@/components/AnimatedStats"
import { ServicesTeaser }      from "@/components/ServicesTeaser"
import { ModelTeaser }         from "@/components/ModelTeaser"
import { Partners }            from "@/components/Partners"

const AssessmentSection = dynamic(
  () => import("@/components/AssessmentSection").then(m => ({ default: m.AssessmentSection })),
  { ssr: false }
)

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [showAssessment, setShowAssessment] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowAssessment(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Hero />
      <PremiumServicesBand />
      <AnimatedStats />
      {showAssessment && <AssessmentSection />}
      <ServicesTeaser />
      <ModelTeaser />
      <Partners />
    </>
  )
}
