"use client"

import { RoughNotation } from "react-rough-notation"

type ArrowProps = {
  className?: string
  path: string
  tip: string
}

function Arrow({ className, path, tip }: ArrowProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 220 120"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
      <path
        d={tip}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  )
}

const noteClass =
  "absolute whitespace-nowrap font-[var(--font-handwriting)] text-lg leading-none text-foreground/32 dark:text-foreground/70"

const roughStrokeColor =
  "color-mix(in oklab, var(--foreground) 33%, transparent)"

const roughHighlightColor =
  "color-mix(in oklab, var(--foreground) 30%, transparent)"

export function ProfileAnnotations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 hidden select-none xl:block"
    >
      <div className={`${noteClass} -left-54 -top-18 -rotate-8`}>
        Always{" "}
        <RoughNotation
          animationDelay={250}
          animationDuration={1200}
          color={roughStrokeColor}
          padding={2}
          show
          strokeWidth={1.2}
          type="underline"
        >
          <span>curious</span>
        </RoughNotation>
      </div>
      <Arrow
        className="absolute -left-35 -top-11 h-17 w-32 -rotate-9 text-foreground/16 dark:text-foreground/25"
        path="M10 20 C64 4, 120 17, 174 82"
        tip="M163 77 L178 88 L159 91"
      />

      <div className={`${noteClass} left-40 -top-19 rotate-6`}>
        <RoughNotation
          animationDelay={450}
          animationDuration={1200}
          color={roughHighlightColor}
          padding={3}
          show
          strokeWidth={0.9}
          type="highlight"
        >
          <span>Creative</span>
        </RoughNotation>{" "}
        mind
      </div>
      <Arrow
        className="absolute left-14 -top-13 h-18 w-34 rotate-8 text-foreground/16 dark:text-foreground/25"
        path="M205 18 C158 10, 112 26, 50 91"
        tip="M69 87 L47 95 L56 74"
      />

      <div className={`${noteClass} left-44 -top-1 -rotate-4`}>
        Loves{" "}
        <RoughNotation
          animationDelay={650}
          animationDuration={1300}
          color={roughStrokeColor}
          padding={4}
          show
          strokeWidth={1.2}
          type="circle"
        >
          <span>math</span>
        </RoughNotation>
      </div>
      <Arrow
        className="absolute left-13 top-0 h-13 w-34 -rotate-2 text-foreground/16 dark:text-foreground/25"
        path="M203 22 C150 16, 99 30, 48 65"
        tip="M68 62 L45 67 L58 49"
      />

      <div className={`${noteClass} left-39 top-17 rotate-8`}>
        <RoughNotation
          animationDelay={850}
          animationDuration={1300}
          color={roughStrokeColor}
          padding={4}
          show
          strokeWidth={1.1}
          type="box"
        >
          <span>Systems</span>
        </RoughNotation>{" "}
        thinker
      </div>
      <Arrow
        className="absolute left-12 top-8 h-17 w-34 rotate-10 text-foreground/16 dark:text-foreground/25"
        path="M207 103 C157 103, 101 79, 44 24"
        tip="M54 45 L41 21 L69 31"
      />

      <div className={`${noteClass} -left-58 top-17 -rotate-6`}>
        Builds with{" "}
        <RoughNotation
          animationDelay={1050}
          animationDuration={1300}
          color={roughStrokeColor}
          padding={2}
          show
          strokeWidth={1.2}
          type="underline"
        >
          <span>code</span>
        </RoughNotation>
      </div>
      <Arrow
        className="absolute -left-38 top-7 h-17 w-34 -rotate-5 text-foreground/16 dark:text-foreground/25"
        path="M10 103 C67 103, 119 81, 174 28"
        tip="M151 35 L178 24 L168 52"
      />
    </div>
  )
}
