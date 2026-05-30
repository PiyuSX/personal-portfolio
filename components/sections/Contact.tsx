import { BuildImproveAnnotation } from "@/components/decorations/SectionAnnotations"
import { SocialIconLinks } from "@/components/social/SocialIconLinks"
import { BlurFade } from "@/components/ui/blur-fade"

export function Contact() {
  return (
    <section
      data-physics-source
      id="contact"
      className="relative scroll-mt-20 py-12 pb-36 sm:py-14 sm:pb-40"
    >
      <BuildImproveAnnotation />
      <BlurFade inView>
        <div className="grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
          <p className="text-xs font-medium text-muted-foreground uppercase">
            05 / CONTACT
          </p>
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">Contact</h2>
            <SocialIconLinks className="mt-6 flex items-center gap-2" />
          </div>
        </div>
      </BlurFade>
    </section>
  )
}
