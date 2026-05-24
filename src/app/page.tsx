import { Hero }                from "@/components/Hero"
import { PremiumServicesBand }  from "@/components/PremiumServicesBand"
import { AnimatedStats }        from "@/components/AnimatedStats"
import { AssessmentSection }    from "@/components/AssessmentSection"
import { ServicesTeaser }       from "@/components/ServicesTeaser"
import { ModelTeaser }          from "@/components/ModelTeaser"

export default function Home() {
  return (
    <>
      <Hero />
      <PremiumServicesBand />
      <AnimatedStats />
      <AssessmentSection />
      <ServicesTeaser />
      <ModelTeaser />
    </>
  )
}
