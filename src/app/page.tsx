"use client"

import { useEffect } from "react"
import { Hero }                from "@/components/Hero"
import { PremiumServicesBand }  from "@/components/PremiumServicesBand"
import { AnimatedStats }        from "@/components/AnimatedStats"
import { AssessmentSection }    from "@/components/AssessmentSection"
import { ServicesTeaser }       from "@/components/ServicesTeaser"
import { ModelTeaser }          from "@/components/ModelTeaser"
import { Partners }             from "@/components/Partners"

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Hero />
      <PremiumServicesBand />
      <AnimatedStats />
      <AssessmentSection />
      <ServicesTeaser />
      <ModelTeaser />
      <Partners />
    </>
  )
}
