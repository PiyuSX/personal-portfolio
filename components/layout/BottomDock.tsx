"use client"

import {
  FolderGit2,
  Home,
  Layers3,
  Mail,
  UserRound,
} from "lucide-react"
import type { ComponentType } from "react"

import { navLinks } from "@/components/data/site"
import { GitHubIcon } from "@/components/icons/BrandIcons"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Dock, DockIcon } from "@/components/ui/dock"
import { cn } from "@/lib/utils"

type DockIconComponent = ComponentType<{
  className?: string
  "aria-hidden"?: boolean
}>

const dockIcons: Record<(typeof navLinks)[number]["label"], DockIconComponent> =
  {
    Home,
    About: UserRound,
    Stack: Layers3,
    "GitHub Activity": GitHubIcon,
    Projects: FolderGit2,
    Contact: Mail,
  }

const iconButtonClass =
  "flex size-10 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-foreground/8 hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/30 dark:hover:bg-white/10 sm:size-8"

export function BottomDock() {
  return (
    <div
      data-physics-source
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-2 sm:bottom-6"
    >
      <Dock
        iconSize={30}
        iconMagnification={36}
        iconDistance={90}
        className="mt-0 h-12 max-w-[calc(100vw-1rem)] gap-1 rounded-lg border-border bg-background/75 p-1.5 shadow-none backdrop-blur-md dark:bg-black/45 sm:h-10 sm:gap-0.5 sm:rounded-md sm:bg-background/65 sm:p-1 sm:dark:bg-black/35"
      >
        {navLinks.map((item) => {
          const Icon = dockIcons[item.label]

          return (
            <DockIcon key={item.href} className="shrink-0">
              <a
                aria-label={item.label}
                className={iconButtonClass}
                href={item.href}
              >
                <Icon aria-hidden className="size-5 sm:size-4" />
              </a>
            </DockIcon>
          )
        })}

        <DockIcon className="shrink-0">
          <AnimatedThemeToggler
            aria-label="Toggle theme"
            className={cn(iconButtonClass, "[&_svg]:size-5 sm:[&_svg]:size-4")}
            duration={550}
            variant="circle"
          />
        </DockIcon>
      </Dock>
    </div>
  )
}
