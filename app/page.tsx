import { BottomDock } from "@/components/layout/BottomDock"
import { HangingLampToggle } from "@/components/decorations/HangingLampToggle"
import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { GitHubActivity } from "@/components/sections/GitHubActivity"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { TechStack } from "@/components/sections/TechStack"


export default function Home() {
  return (
    <>
      <HangingLampToggle />
      <main className="mx-auto w-full max-w-[760px] px-5 sm:px-8">
        <Hero />
        <About />
        <TechStack />
        <GitHubActivity />
        <Projects />
        <Contact />
      </main>
      <BottomDock />
    </>
  )
}
