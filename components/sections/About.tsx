import { site } from "@/components/data/site"
import { AboutFundamentalsAnnotation } from "@/components/decorations/SectionAnnotations"
import { BlurFade } from "@/components/ui/blur-fade"

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 border-b border-border py-12 sm:py-14">
      <AboutFundamentalsAnnotation />
      <BlurFade inView>
        <div className="grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
          <p className="text-xs font-medium text-muted-foreground uppercase">
            01 / ABOUT
          </p>
          <div className="border-l border-border pl-5">
            <h2 className="text-2xl font-semibold tracking-normal">About</h2>
            <p className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
              I&rsquo;m {site.name}, a STEM-focused learner from {site.location}.
              I&rsquo;m building my foundation in code, math, and systems as I
              move toward Computer Engineering.
            </p>
          </div>
        </div>
      </BlurFade>
    </section>
  )
}
