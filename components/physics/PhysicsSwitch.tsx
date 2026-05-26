"use client"

import Image from "next/image"
import { RoughNotation } from "react-rough-notation"

export type PhysicsMode = "default" | "gravity"

const modes: PhysicsMode[] = ["default", "gravity"]

const nextMode = (mode: PhysicsMode): PhysicsMode =>
  mode === "default" ? "gravity" : "default"

function SketchRocket({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <svg
        aria-hidden="true"
        className="h-7 w-6"
        fill="none"
        viewBox="0 0 32 46"
      >
        <path
          d="M16 3 C10 8, 8 18, 9 30 C12 32, 20 32, 23 30 C24 18, 22 8, 16 3 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path
          d="M9 25 C5 27, 4 32, 4 35 C7 34, 10 33, 12 31"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.35"
        />
        <path
          d="M23 25 C27 27, 28 32, 28 35 C25 34, 22 33, 20 31"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.35"
        />
        <path
          d="M13 17 C15 15, 18 15, 20 17 C18 19, 15 20, 13 17 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
        <path
          d="M13 32 C12 36, 12 39, 14 42"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.35"
        />
        <path
          d="M19 32 C20 36, 20 39, 18 42"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.35"
        />
      </svg>
      <span className="physics-rocket-flames mt-0.5 flex h-6 items-start gap-1.5">
        <span className="physics-flame physics-flame-side h-3" />
        <span className="physics-flame physics-flame-middle h-5" />
        <span className="physics-flame physics-flame-side h-3" />
      </span>
    </span>
  )
}

function HangingEinsteinImage() {
  return (
    <span className="physics-einstein-enter -mt-1 block">
      <Image
        alt=""
        aria-hidden="true"
        className="mx-auto h-36 w-auto object-contain opacity-70 dark:hidden"
        height={609}
        src="/whitetheme.png"
        width={409}
      />
      <Image
        alt=""
        aria-hidden="true"
        className="mx-auto hidden h-36 w-auto object-contain opacity-70 dark:block"
        height={609}
        src="/blacktheme.png"
        width={409}
      />
    </span>
  )
}

export function PhysicsSwitch({
  mode,
  setMode,
}: {
  mode: PhysicsMode
  setMode: (mode: PhysicsMode) => void
}) {
  const showGravityArt = mode === "gravity"

  return (
    <>
      <style>{`
        @keyframes physics-flame-middle {
          0%, 100% { transform: scaleY(1); opacity: 0.62; }
          50% { transform: scaleY(0.45); opacity: 0.35; }
        }

        @keyframes physics-flame-side {
          0%, 100% { transform: scaleY(0.55); opacity: 0.36; }
          50% { transform: scaleY(1); opacity: 0.6; }
        }

        @keyframes physics-rocket-enter {
          0% { opacity: 0; transform: translateY(7px) scale(0.88); }
          70% { opacity: 1; transform: translateY(-1px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes physics-einstein-enter {
          0% { opacity: 0; transform: translateY(-12px) scale(0.94); }
          65% { opacity: 0.75; transform: translateY(2px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .physics-rocket-switch .physics-flame {
          width: 1.5px;
          background: currentColor;
          transform-origin: top;
        }

        .physics-rocket-switch[data-mode="gravity"] .physics-rocket-enter {
          animation: physics-rocket-enter 420ms ease-out both;
        }

        .physics-rocket-switch[data-mode="gravity"] .physics-einstein-enter {
          animation: physics-einstein-enter 520ms ease-out both;
        }

        .physics-rocket-switch[data-mode="gravity"] .physics-flame-middle,
        .physics-rocket-switch:hover .physics-flame-middle {
          animation: physics-flame-middle 320ms infinite steps(2, end);
        }

        .physics-rocket-switch[data-mode="gravity"] .physics-flame-side,
        .physics-rocket-switch:hover .physics-flame-side {
          animation: physics-flame-side 320ms infinite steps(2, end);
        }
      `}</style>
      <button
        aria-label={`Cycle physics mode, current mode: ${mode}`}
        className="physics-rocket-switch no-physics absolute top-[520px] left-[-315px] z-50 hidden w-[220px] cursor-pointer select-none text-center font-[var(--font-handwriting)] text-base leading-none text-foreground/30 outline-none transition-colors hover:text-foreground/35 focus-visible:text-foreground/40 focus-visible:ring-2 focus-visible:ring-foreground/20 xl:block"
        data-mode={mode}
        data-no-physics
        onClick={() => setMode(nextMode(mode))}
        type="button"
      >
        <span className="flex items-start justify-between">
          <SketchRocket
            className={`physics-rocket-enter mt-1 -rotate-2 text-foreground/35 ${
              showGravityArt ? "" : "invisible"
            }`}
          />

          <span className="mt-5 flex items-center justify-center gap-3">
            {modes.map((physicsMode, index) => {
              const isActive = mode === physicsMode
              const label = (
                <span
                  className={
                    isActive ? "text-foreground/45" : "text-foreground/25"
                  }
                >
                  {physicsMode}
                </span>
              )

              return (
                <span
                  className="inline-flex items-center gap-3"
                  key={physicsMode}
                >
                  {isActive ? (
                    <RoughNotation
                      color="currentColor"
                      padding={[0, 2, -3, 2]}
                      show
                      strokeWidth={0.85}
                      type="underline"
                    >
                      {label}
                    </RoughNotation>
                  ) : (
                    label
                  )}
                  {index < modes.length - 1 ? (
                    <span className="text-foreground/25">&middot;</span>
                  ) : null}
                </span>
              )
            })}
          </span>

          <SketchRocket
            className={`physics-rocket-enter mt-1 rotate-2 text-foreground/35 ${
              showGravityArt ? "" : "invisible"
            }`}
          />
        </span>

        <svg
          aria-hidden="true"
          className="-mt-5 ml-7 h-4 w-[166px] text-foreground/30"
          fill="none"
          viewBox="0 0 166 18"
        >
          <path
            d="M1 10 C28 8, 58 11, 86 9 C115 8, 140 11, 165 8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1"
          />
          <path
            d="M3 12 C39 10, 78 13, 112 11 C133 10, 151 11, 163 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="0.6"
          />
        </svg>
        {showGravityArt ? <HangingEinsteinImage /> : null}
      </button>
    </>
  )
}
