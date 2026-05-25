"use client"

import { RoughNotation } from "react-rough-notation"

const noteClass =
  "pointer-events-none absolute z-20 hidden select-none whitespace-nowrap font-[var(--font-handwriting)] text-lg leading-none text-foreground/30 xl:block"

const sketchColor = "currentColor"

type ConnectorProps = {
  className?: string
}

function Connector({ className }: ConnectorProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 72 46"
    >
      <path
        d="M15 7 C37 10, 49 18, 49 31"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path
        d="M43 25 L49 33 L56 25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  )
}

export function AboutFundamentalsAnnotation() {
  return (
    <div
      aria-hidden="true"
      className={`${noteClass} top-17 -left-50 2xl:-left-56`}
    >
      <span className="block w-fit -rotate-8 leading-none">
        <RoughNotation
          animationDelay={250}
          animationDuration={1200}
          color={sketchColor}
          customElement="span"
          multiline={false}
          padding={[0, 1, -3, 1]}
          show
          strokeWidth={1.2}
          type="underline"
        >
          <span className="inline-block leading-none">fundamentals</span>
        </RoughNotation>
      </span>
      <span className="mt-3 block w-fit translate-x-17 rotate-[-2deg] leading-none">
        first
      </span>
    </div>
  )
}

export function StackThinkingAnnotation() {
  return (
    <div
      aria-hidden="true"
      className={`${noteClass} top-23 -right-54 rotate-4 2xl:-right-64`}
    >
      <span>tools change</span>
      <Connector className="absolute left-9 top-5 h-9 w-15 text-foreground/25" />
      <span className="mt-6 block translate-x-8 -rotate-7">thinking stays</span>
    </div>
  )
}

export function ActivityConsistencyAnnotation() {
  return (
    <div
      aria-hidden="true"
      className={`${noteClass} top-17 -left-50 -rotate-8 2xl:-left-58`}
    >
      <span>consistency</span>
      <span className="mt-2 block w-fit translate-x-7 rotate-2">
        <RoughNotation
          animationDelay={300}
          animationDuration={1200}
          color={sketchColor}
          customElement="span"
          padding={5}
          show
          strokeWidth={1.1}
          type="box"
        >
          <span className="inline-block px-2 py-1 leading-none">wins</span>
        </RoughNotation>
      </span>
    </div>
  )
}

export function BuildImproveAnnotation() {
  return (
    <div
      aria-hidden="true"
      className={`${noteClass} -top-1 -right-66 rotate-[-8deg] 2xl:-right-74`}
    >
      <RoughNotation
        animationDelay={350}
        animationDuration={1300}
        color={sketchColor}
        padding={3}
        show
        strokeWidth={1.1}
        type="underline"
      >
        <span>
          build &rarr; break &rarr; improve
        </span>
      </RoughNotation>
    </div>
  )
}
