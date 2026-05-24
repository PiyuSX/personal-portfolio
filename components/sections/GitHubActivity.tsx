"use client"

import { useEffect, useRef, useState } from "react"
import { GitHubCalendar } from "react-github-calendar"

import { site } from "@/components/data/site"
import { GitHubIcon } from "@/components/icons/BrandIcons"
import { BlurFade } from "@/components/ui/blur-fade"

function useCalendarSizing() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [sizing, setSizing] = useState({
    blockMargin: 1,
    blockSize: 4,
    fontSize: 9,
    isCompact: true,
  })

  useEffect(() => {
    const updateSizing = () => {
      const containerWidth = containerRef.current?.clientWidth ?? window.innerWidth
      const viewportWidth = window.innerWidth
      const isCompact = viewportWidth < 640
      const columns = isCompact ? 51 : 53
      const blockMargin = viewportWidth < 480 ? 1 : 2
      const maxBlockSize = isCompact ? 7 : viewportWidth >= 900 ? 10 : 8
      const blockSize = Math.max(
        3,
        Math.min(
          maxBlockSize,
          Math.floor((containerWidth - (columns - 1) * blockMargin) / columns)
        )
      )

      setSizing({
        blockMargin,
        blockSize,
        fontSize: isCompact ? 9 : 10,
        isCompact,
      })
    }

    updateSizing()
    const resizeObserver = new ResizeObserver(updateSizing)

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener("resize", updateSizing)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateSizing)
    }
  }, [])

  return { containerRef, sizing }
}

function useDocumentColorScheme() {
  const [colorScheme, setColorScheme] = useState<"dark" | "light">("light")

  useEffect(() => {
    const updateColorScheme = () => {
      setColorScheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      )
    }

    updateColorScheme()

    const observer = new MutationObserver(updateColorScheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return colorScheme
}

export function GitHubActivity() {
  const { containerRef, sizing } = useCalendarSizing()
  const colorScheme = useDocumentColorScheme()

  return (
    <section
      id="github"
      className="scroll-mt-20 border-b border-border py-12 sm:py-14"
    >
      <BlurFade inView>
        <div className="grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
          <p className="text-xs font-medium text-muted-foreground uppercase">
            03 / ACTIVITY
          </p>
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">
              GitHub Activity
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Piyushee&apos;s coding activity and contribution graph.
            </p>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.12} inView>
        <div className="mt-7 max-w-full overflow-hidden border border-border bg-card p-3 sm:p-5">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground sm:mb-5">
            <GitHubIcon aria-hidden className="size-4" />
            <span className="font-medium text-foreground">
              {site.githubUsername}
            </span>
          </div>

          <div
            className="github-calendar-frame max-w-full overflow-hidden"
            ref={containerRef}
          >
            <GitHubCalendar
              blockMargin={sizing.blockMargin}
              blockRadius={2}
              blockSize={sizing.blockSize}
              colorScheme={colorScheme}
              errorMessage="Unable to load GitHub activity right now."
              fontSize={sizing.fontSize}
              labels={{
                legend: {
                  less: "Less",
                  more: "More",
                },
                totalCount: "{{count}} contributions in {{year}}",
              }}
              showColorLegend={!sizing.isCompact}
              showMonthLabels={!sizing.isCompact}
              showTotalCount={!sizing.isCompact}
              showWeekdayLabels={false}
              theme={{
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
              }}
              key={colorScheme}
              username={site.githubUsername}
              year="last"
            />
          </div>
        </div>
      </BlurFade>
    </section>
  )
}
