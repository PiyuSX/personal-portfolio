import { site } from "@/components/data/site"
import { StackThinkingAnnotation } from "@/components/decorations/SectionAnnotations"
import { BlurFade } from "@/components/ui/blur-fade"
import { Marquee } from "@/components/ui/marquee"
import {
  SiCss,
  SiExpress,
  SiGit,
  SiGithub,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import type { IconType } from "react-icons"

const firstRibbon = site.skills.slice(0, 7)
const secondRibbon = site.skills.slice(7)

const skillIcons: Record<(typeof site.skills)[number], IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  MongoDB: SiMongodb,
  "Tailwind CSS": SiTailwindcss,
  Git: SiGit,
  GitHub: SiGithub,
  Go: SiGo,
}

function TechBadge({ skill }: { skill: string }) {
  const Icon = skillIcons[skill as (typeof site.skills)[number]]

  return (
    <span className="tech-badge-shine group relative inline-flex items-center gap-2 overflow-hidden border border-border/70 bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors duration-300 hover:border-foreground/40 hover:bg-foreground/[0.06] hover:text-foreground">
      {Icon ? (
        <Icon
          aria-hidden
          className="size-3.5 text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
        />
      ) : null}
      {skill}
    </span>
  )
}

export function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-20 border-b border-border py-12 sm:py-14">
      <StackThinkingAnnotation />
      <BlurFade inView>
        <div className="grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
          <p className="text-xs font-medium text-muted-foreground uppercase">
            02 / STACK
          </p>

          <div>
            <h2 className="text-2xl font-semibold tracking-normal">
              Tech Stack
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Tools I am learning and using.
            </p>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.12} inView>
        <div className="relative mt-8 max-w-full overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background via-background/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background via-background/80 to-transparent" />

          <Marquee className="[--duration:34s] [--gap:0.75rem]" pauseOnHover>
            {firstRibbon.map((skill) => (
              <TechBadge key={skill} skill={skill} />
            ))}
          </Marquee>

          <Marquee
            className="mt-3 [--duration:38s] [--gap:0.75rem]"
            pauseOnHover
            reverse
          >
            {secondRibbon.map((skill) => (
              <TechBadge key={skill} skill={skill} />
            ))}
          </Marquee>
        </div>
      </BlurFade>
    </section>
  )
}
