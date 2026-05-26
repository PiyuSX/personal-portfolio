import { Mail } from "lucide-react"
import Image from "next/image"

import { contactLinks, site } from "@/components/data/site"
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons/BrandIcons"
import { ProfileAnnotations } from "@/components/decorations/ProfileAnnotations"
import {
  PhysicsSwitch,
  type PhysicsMode,
} from "@/components/physics/PhysicsSwitch"
import { BlurFade } from "@/components/ui/blur-fade"
import { HyperText } from "@/components/ui/hyper-text"

const icons = {
  Email: Mail,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
}

type HeroProps = {
  physicsMode: PhysicsMode
  setPhysicsMode: (mode: PhysicsMode) => void
}

export function Hero({ physicsMode, setPhysicsMode }: HeroProps) {
  return (
    <section id="home" className="relative scroll-mt-6 py-16 sm:py-20 lg:py-24 xl:pt-39">
      <PhysicsSwitch mode={physicsMode} setMode={setPhysicsMode} />
      <div className="border-b border-border pb-14" data-physics-source>
        <BlurFade inView>
          <div className="flex items-center gap-4 xl:mb-16">
            <div className="relative inline-flex">
              <Image
                alt="Piyushee profile"
                className="size-16 rounded-full border border-border object-cover grayscale"
                height={56}
                src={site.profileImage}
                width={56}
              />
              <ProfileAnnotations />
            </div>
            <p className="text-xs font-medium text-muted-foreground uppercase">
              PORTFOLIO / 2026
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.08} inView>
          <h1 className="mt-8 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
            {site.name}
          </h1>
        </BlurFade>

        <BlurFade className="w-full" delay={0.14} inView>
          <HyperText
            animateOnHover
            as="p"
            className="mt-4 py-0 text-2xl font-medium tracking-normal text-foreground/90 sm:text-2xl"
            duration={700}
            startOnView
          >
            {site.title}
          </HyperText>
        </BlurFade>

        <BlurFade className="w-full" delay={0.2} inView>
          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
            {site.description}
          </p>
        </BlurFade>

        <BlurFade className="w-full" delay={0.23} inView>
          <p className="mt-5 text-sm text-muted-foreground">
            {site.location} <span aria-hidden>&middot;</span> Future Computer
            Engineering
          </p>
        </BlurFade>

        <BlurFade delay={0.28} inView>
          <div className="mt-7 flex items-center gap-2">
            {contactLinks.map((link) => {
              const Icon = icons[link.label]
              const isExternal = "external" in link && link.external

              return (
                <a
                  aria-label={link.label}
                  className="flex size-9 items-center justify-center border border-border bg-card text-muted-foreground transition hover:border-foreground/35 hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:outline-none"
                  href={link.href}
                  key={link.label}
                  rel={isExternal ? "noreferrer noopener" : undefined}
                  target={isExternal ? "_blank" : undefined}
                >
                  <Icon aria-hidden className="size-4" />
                </a>
              )
            })}
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
