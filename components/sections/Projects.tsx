import { ExternalLink } from "lucide-react"

import { site } from "@/components/data/site"
import { BlurFade } from "@/components/ui/blur-fade"

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-b border-border py-12 sm:py-14">
      <BlurFade inView>
        <div className="grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
          <p className="text-xs font-medium text-muted-foreground uppercase">
            04 / PROJECTS
          </p>
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">Projects</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Real projects I am building and improving.
            </p>
          </div>
        </div>
      </BlurFade>

      <div className="mt-8 divide-y divide-border border-y border-border">
        {site.projects.map((project, index) => (
          <BlurFade delay={index * 0.06} inView key={project.title}>
            <article className="grid gap-3 py-5 sm:grid-cols-[2rem_minmax(0,1fr)_9rem] sm:items-start">
              <span className="text-xs text-muted-foreground">
                0{index + 1}
              </span>
              <div>
                <a
                  aria-label={`Open ${project.title} on GitHub`}
                  className="group inline-flex items-center gap-2 text-base font-medium tracking-normal text-foreground transition hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:outline-none"
                  href={project.href}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {project.title}
                  <ExternalLink
                    aria-hidden
                    className="size-3.5 opacity-55 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </a>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <span className="w-fit border border-border px-2 py-1 text-[11px] text-muted-foreground uppercase">
                {project.label}
              </span>
            </article>
          </BlurFade>
        ))}
      </div>
    </section>
  )
}
