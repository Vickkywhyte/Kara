import { Hero }               from "@/components/Hero"
import { PremiumServicesBand } from "@/components/PremiumServicesBand"
import { AnimatedStats }       from "@/components/AnimatedStats"
import { ServicesTeaser }      from "@/components/ServicesTeaser"
import { ModelTeaser }         from "@/components/ModelTeaser"
import { IntakeForm }          from "@/components/IntakeForm"

export default function Home() {
  return (
    <>
      <Hero />
      <PremiumServicesBand />
      <AnimatedStats />
      <ServicesTeaser />
      <ModelTeaser />
      <IntakeForm />
    </>
  )
}
