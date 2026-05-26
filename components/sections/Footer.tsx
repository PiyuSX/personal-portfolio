import { BlurFade } from "@/components/ui/blur-fade"

export function Footer() {
  return (
    <footer
      data-physics-source
      className="border-t border-border py-8 pb-36 sm:pb-40"
    >
      <BlurFade inView>
        <div className="grid gap-5 sm:grid-cols-[160px_minmax(0,1fr)]">
          <p className="text-xs font-medium text-muted-foreground uppercase">
            END / 2026
          </p>

          <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
            <p className="leading-6">
              Designed and developed by{" "}
              <span className="font-medium text-foreground">
                Piyush Rajbanshi
              </span>
              <br />
              <span className="text-xs">
                &copy; 2026. All rights reserved.
              </span>
            </p>

            <a
              className="w-fit text-xs font-medium text-muted-foreground uppercase transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:outline-none"
              href="#home"
            >
              Back to top
            </a>
          </div>
        </div>
      </BlurFade>
    </footer>
  )
}
