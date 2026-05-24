import { Mail } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { contactLinks } from "@/components/data/site"
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons/BrandIcons"
import { BlurFade } from "@/components/ui/blur-fade"

type IconComponent = LucideIcon | typeof GitHubIcon

const icons: Record<(typeof contactLinks)[number]["label"], IconComponent> = {
  Email: Mail,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-12 pb-36 sm:py-14 sm:pb-40">
      <BlurFade inView>
        <div className="grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
          <p className="text-xs font-medium text-muted-foreground uppercase">
            05 / CONTACT
          </p>
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">Contact</h2>
            <div className="mt-6 flex items-center gap-2">
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
          </div>
        </div>
      </BlurFade>
    </section>
  )
}
