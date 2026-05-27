"use client"

import { useEffect, useSyncExternalStore, useState } from "react"

import { HangingLampToggle } from "@/components/decorations/HangingLampToggle"
import { BottomDock } from "@/components/layout/BottomDock"
import { PhysicsGravityScene } from "@/components/physics/PhysicsGravityScene"
import type { PhysicsMode } from "@/components/physics/PhysicsSwitch"
import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { GitHubActivity } from "@/components/sections/GitHubActivity"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { TechStack } from "@/components/sections/TechStack"
import { cn } from "@/lib/utils"

function subscribeToDesktop(callback: () => void) {
  const mediaQuery = window.matchMedia("(min-width: 1280px)")

  mediaQuery.addEventListener("change", callback)

  return () => mediaQuery.removeEventListener("change", callback)
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 1280px)").matches
}

function getServerDesktopSnapshot() {
  return false
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getServerDesktopSnapshot
  )
}

function useDocumentHeight() {
  const [height, setHeight] = useState(2400)

  useEffect(() => {
    const updateHeight = () => {
      setHeight(
        Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
          window.innerHeight * 2
        )
      )
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)

    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  return height
}

export function PortfolioPage() {
  const [physicsMode, setPhysicsMode] = useState<PhysicsMode>("default")
  const isDesktop = useIsDesktop()
  const sceneHeight = useDocumentHeight()
  const activeMode = isDesktop ? physicsMode : "default"
  const isPhysicsActive = activeMode !== "default"

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-x-hidden",
        isPhysicsActive &&
          "[&_[data-physics-source]]:pointer-events-none [&_[data-physics-source]]:opacity-0"
      )}
    >
      <HangingLampToggle />
      <main className="mx-auto w-full max-w-[760px] px-5 sm:px-8">
        <Hero physicsMode={physicsMode} setPhysicsMode={setPhysicsMode} />
        <About />
        <TechStack />
        <GitHubActivity />
        <Projects />
        <Contact />
        <Footer />
      </main>
      <BottomDock />

      {activeMode !== "default" ? (
        <PhysicsGravityScene mode={activeMode} sceneHeight={sceneHeight} />
      ) : null}
    </div>
  )
}
