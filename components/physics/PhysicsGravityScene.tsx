"use client"

import Image from "next/image"
import { Fragment, type ReactNode } from "react"

import Gravity, { MatterBody } from "@/components/fancy/physics/gravity"
import { contactLinks, siteConfig } from "@/components/data/site"
import type { PhysicsMode } from "@/components/physics/PhysicsSwitch"
import { GitHubActivityCard } from "@/components/sections/GitHubActivity"
import { TechBadge } from "@/components/sections/TechStack"
import { socialIcons } from "@/components/social/social-icons"

const bodyOptions = {
  density: 0.001,
  friction: 0.55,
  frictionAir: 0.02,
  frictionStatic: 0.28,
  restitution: 0,
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div
      className="inline-flex w-fit flex-col font-[var(--font-handwriting)] text-lg leading-none text-foreground/65"
    >
      <span className="whitespace-nowrap">{children}</span>
      <svg
        aria-hidden="true"
        className="mt-0.5 h-3 w-full text-foreground/30"
        fill="none"
        viewBox="0 0 120 16"
      >
        <path
          d="M2 9 C28 6, 62 12, 118 5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.2"
        />
        <path
          d="M8 13 C42 10, 76 14, 112 9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  )
}

function SketchArrow() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-20 text-foreground/25"
      fill="none"
      viewBox="0 0 84 38"
    >
      <path
        d="M2 5 C26 11, 46 18, 72 31"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.1"
      />
      <path
        d="M62 22 L75 33 L58 35"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.1"
      />
    </svg>
  )
}

function TextLine({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <p className={`whitespace-nowrap ${className}`}>{children}</p>
}

function SocialRow() {
  return (
    <div className="flex items-center gap-2">
      {contactLinks.map((link) => {
        const Icon = socialIcons[link.label]

        return (
          <span
            className="flex size-9 items-center justify-center border border-border bg-card text-muted-foreground"
            key={link.label}
          >
            <Icon aria-hidden className="size-4" />
          </span>
        )
      })}
    </div>
  )
}

function splitDescription(description: string, maxLineLength = 56) {
  const lines: string[] = []
  const words = description.split(" ")
  let line = ""

  for (const word of words) {
    const nextLine = line ? `${line} ${word}` : word

    if (line && nextLine.length > maxLineLength) {
      lines.push(line)
      line = word
    } else {
      line = nextLine
    }
  }

  if (line) {
    lines.push(line)
  }

  return lines
}

function ProjectLabel({ children }: { children: ReactNode }) {
  return (
    <span className="w-fit border border-border px-2 py-1 text-[11px] text-muted-foreground uppercase">
      {children}
    </span>
  )
}

export function PhysicsGravityScene({
  mode,
  sceneHeight,
}: {
  mode: Exclude<PhysicsMode, "default">
  sceneHeight: number
}) {
  const gravity = { x: 0, y: 1.25 }
  const sceneKey = `${mode}-${Math.round(sceneHeight)}`
  const currentYear = new Date().getFullYear()
  const footerBaseY = Math.max(0, sceneHeight - 230)

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden overflow-hidden xl:block"
      style={{ height: sceneHeight }}
    >
      <Gravity
        addTopWall
        autoStart
        className="pointer-events-none"
        gravity={gravity}
        grabCursor={false}
        key={sceneKey}
        resetOnResize
      >
        <MatterBody
          angle={-6}
          matterBodyOptions={bodyOptions}
          x="31%"
          y={135}
        >
          <Note>Always curious</Note>
        </MatterBody>
        <MatterBody
          angle={-7}
          matterBodyOptions={bodyOptions}
          x="28%"
          y={250}
        >
          <Note>Builds with code</Note>
        </MatterBody>
        <MatterBody
          angle={7}
          matterBodyOptions={bodyOptions}
          x="48%"
          y={120}
        >
          <Note>Creative mind</Note>
        </MatterBody>
        <MatterBody
          angle={-4}
          matterBodyOptions={bodyOptions}
          x="51%"
          y={185}
        >
          <Note>Loves math</Note>
        </MatterBody>
        <MatterBody
          angle={8}
          matterBodyOptions={bodyOptions}
          x="50%"
          y={250}
        >
          <Note>Systems thinker</Note>
        </MatterBody>
        <MatterBody angle={-10} matterBodyOptions={bodyOptions} x="35%" y={170}>
          <SketchArrow />
        </MatterBody>
        <MatterBody angle={8} matterBodyOptions={bodyOptions} x="47%" y={150}>
          <SketchArrow />
        </MatterBody>
        <MatterBody angle={-4} matterBodyOptions={bodyOptions} x="30%" y={280}>
          <SketchArrow />
        </MatterBody>

        <MatterBody
          bodyType="circle"
          matterBodyOptions={bodyOptions}
          x="39%"
          y={180}
        >
          <Image
            alt=""
            className="size-16 rounded-full border border-border object-cover grayscale"
            height={56}
            src={siteConfig.profileImage}
            width={56}
          />
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="47%" y={185}>
          <p className="text-xs font-medium text-muted-foreground uppercase">
            PORTFOLIO / 2026
          </p>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="42%" y={330}>
          <h1 className="text-5xl font-semibold tracking-normal text-foreground">
            {siteConfig.name}
          </h1>
        </MatterBody>
        <MatterBody angle={2} matterBodyOptions={bodyOptions} x="45%" y={390}>
          <p className="text-2xl font-medium tracking-normal text-foreground/90">
            {siteConfig.title}
          </p>
        </MatterBody>
        <MatterBody angle={-4} matterBodyOptions={bodyOptions} x="42%" y={455}>
          <TextLine className="text-base leading-7 text-muted-foreground">
            I&rsquo;m building my foundation in programming, mathematics, and modern web
          </TextLine>
        </MatterBody>
        <MatterBody angle={-4} matterBodyOptions={bodyOptions} x="43%" y={490}>
          <TextLine className="text-base leading-7 text-muted-foreground">
            technologies as I move toward Computer Engineering.
          </TextLine>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="43%" y={540}>
          <p className="text-sm text-muted-foreground">
            {siteConfig.location} <span aria-hidden>&middot;</span> Future
            Computer Engineering
          </p>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="36%" y={610}>
          <SocialRow />
        </MatterBody>

        <MatterBody matterBodyOptions={bodyOptions} x="43%" y={930}>
          <p className="text-xs font-medium text-muted-foreground uppercase">
            01 / ABOUT
          </p>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="55%" y={910}>
          <div className="h-36 border-l border-border" />
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="61%" y={900}>
          <h2 className="text-2xl font-semibold tracking-normal">About</h2>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="63%" y={960}>
          <TextLine className="text-sm leading-7 text-muted-foreground sm:text-base">
            I&rsquo;m {siteConfig.name}, a STEM-focused learner from{" "}
            {siteConfig.location}.
          </TextLine>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="64%" y={995}>
          <TextLine className="text-sm leading-7 text-muted-foreground sm:text-base">
            I&rsquo;m building my foundation in code, math, and systems as I move
          </TextLine>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="63%" y={1030}>
          <TextLine className="text-sm leading-7 text-muted-foreground sm:text-base">
            toward Computer Engineering.
          </TextLine>
        </MatterBody>

        <MatterBody angle={4} matterBodyOptions={bodyOptions} x="76%" y={1180}>
          <Note>tools change thinking stays</Note>
        </MatterBody>
        <MatterBody angle={4} matterBodyOptions={bodyOptions} x="78%" y={1230}>
          <SketchArrow />
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="42%" y={1250}>
          <p className="text-xs font-medium text-muted-foreground uppercase">
            02 / STACK
          </p>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="57%" y={1230}>
          <h2 className="text-2xl font-semibold tracking-normal">Tech Stack</h2>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="61%" y={1285}>
          <p className="text-sm leading-6 text-muted-foreground">
            Tools I am learning and using.
          </p>
        </MatterBody>
        {siteConfig.skills.map((skill, index) => (
          <MatterBody
            angle={index % 2 === 0 ? -2 : 2}
            key={skill}
            matterBodyOptions={bodyOptions}
            x={`${34 + (index % 7) * 5.2}%`}
            y={1370 + Math.floor(index / 7) * 54}
          >
            <TechBadge skill={skill} />
          </MatterBody>
        ))}

        <MatterBody angle={-8} matterBodyOptions={bodyOptions} x="22%" y={1610}>
          <Note>consistency wins</Note>
        </MatterBody>
        <MatterBody angle={-8} matterBodyOptions={bodyOptions} x="28%" y={1650}>
          <SketchArrow />
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="42%" y={1590}>
          <p className="text-xs font-medium text-muted-foreground uppercase">
            03 / ACTIVITY
          </p>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="58%" y={1570}>
          <h2 className="text-2xl font-semibold tracking-normal">
            GitHub Activity
          </h2>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="63%" y={1625}>
          <p className="w-[460px] text-sm leading-6 text-muted-foreground">
            Piyushee&apos;s coding activity and contribution graph.
          </p>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="53%" y={1690}>
          <div className="h-[178px] w-[680px] overflow-hidden">
            <GitHubActivityCard className="h-full" />
          </div>
        </MatterBody>

        <MatterBody matterBodyOptions={bodyOptions} x="42%" y={1950}>
          <p className="text-xs font-medium text-muted-foreground uppercase">
            04 / PROJECTS
          </p>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="56%" y={1930}>
          <h2 className="text-2xl font-semibold tracking-normal">Projects</h2>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="62%" y={1985}>
          <p className="text-sm leading-6 text-muted-foreground">
            Real projects I am building and improving.
          </p>
        </MatterBody>
        {siteConfig.projects.map((project, index) => {
          const y = 2060 + index * 140
          const descriptionLines = splitDescription(project.description)

          return (
            <Fragment key={project.title}>
              <MatterBody
                angle={-1}
                matterBodyOptions={bodyOptions}
                x="53%"
                y={y - 35}
              >
                <div className="h-px w-56 bg-border" />
              </MatterBody>
              <MatterBody
                angle={-3}
                matterBodyOptions={bodyOptions}
                x="40%"
                y={y}
              >
                <span className="text-xs text-muted-foreground">
                  0{index + 1}
                </span>
              </MatterBody>
              <MatterBody
                angle={2}
                matterBodyOptions={bodyOptions}
                x="47%"
                y={y}
              >
                <span className="text-base font-medium tracking-normal text-foreground">
                  {project.title}
                </span>
              </MatterBody>
              {descriptionLines.map((line, lineIndex) => (
                <MatterBody
                  angle={lineIndex % 2 === 0 ? -1.5 : 1.5}
                  key={`${project.title}-${lineIndex}`}
                  matterBodyOptions={bodyOptions}
                  x="53%"
                  y={y + 38 + lineIndex * 30}
                >
                  <TextLine className="text-sm leading-6 text-muted-foreground">
                    {line}
                  </TextLine>
                </MatterBody>
              ))}
              <MatterBody
                angle={3}
                matterBodyOptions={bodyOptions}
                x="70%"
                y={y}
              >
                <ProjectLabel>{project.label}</ProjectLabel>
              </MatterBody>
            </Fragment>
          )
        })}

        <MatterBody angle={-8} matterBodyOptions={bodyOptions} x="76%" y={2290}>
          <Note>build - break - improve</Note>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="42%" y={2350}>
          <p className="text-xs font-medium text-muted-foreground uppercase">
            05 / CONTACT
          </p>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="56%" y={2330}>
          <h2 className="text-2xl font-semibold tracking-normal">Contact</h2>
        </MatterBody>
        <MatterBody matterBodyOptions={bodyOptions} x="58%" y={2400}>
          <SocialRow />
        </MatterBody>

        <MatterBody
          angle={-1}
          matterBodyOptions={bodyOptions}
          x="50%"
          y={footerBaseY}
        >
          <div className="h-px w-[680px] bg-border" />
        </MatterBody>
        <MatterBody
          angle={-3}
          matterBodyOptions={bodyOptions}
          x="42%"
          y={footerBaseY + 45}
        >
          <p className="text-xs font-medium text-muted-foreground uppercase">
            END
          </p>
        </MatterBody>
        <MatterBody
          angle={2}
          matterBodyOptions={bodyOptions}
          x="56%"
          y={footerBaseY + 46}
        >
          <TextLine className="text-sm leading-6 text-muted-foreground">
            Designed and developed by{" "}
            <span className="font-medium text-foreground">
              Piyush Rajbanshi
            </span>
          </TextLine>
        </MatterBody>
        <MatterBody
          angle={-2}
          matterBodyOptions={bodyOptions}
          x="55%"
          y={footerBaseY + 80}
        >
          <p className="whitespace-nowrap text-xs text-muted-foreground">
            &copy; {currentYear}. All rights reserved.
          </p>
        </MatterBody>
        <MatterBody
          angle={3}
          matterBodyOptions={bodyOptions}
          x="71%"
          y={footerBaseY + 78}
        >
          <p className="whitespace-nowrap text-xs font-medium text-muted-foreground uppercase">
            Back to top
          </p>
        </MatterBody>

        <MatterBody angle={-6} matterBodyOptions={bodyOptions} x="90%" y={305}>
          <div className="relative h-12 w-24 text-foreground/35">
            <svg
              aria-hidden="true"
              className="absolute top-0 left-[38px] h-7 w-14 text-foreground/30"
              fill="none"
              viewBox="0 0 56 28"
            >
              <path
                d="M0 23 C16 11, 32 6, 46 4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.1"
              />
              <path
                d="M38 0 L48 4 L39 10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.1"
              />
            </svg>
            <span className="absolute top-2.5 left-0 -rotate-6 font-[var(--font-handwriting)] text-lg leading-none text-foreground/35">
              pull
            </span>
          </div>
        </MatterBody>
      </Gravity>
    </div>
  )
}
