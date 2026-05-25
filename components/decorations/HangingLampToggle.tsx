"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react"
import { animate, useMotionValue, useMotionValueEvent } from "motion/react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { RoughNotation } from "react-rough-notation"

import { applyDocumentTheme, getDocumentTheme } from "@/lib/theme"

type Point = {
  x: number
  y: number
}

type AnimationControl = {
  stop: () => void
}

const VIEWBOX_WIDTH = 220
const VIEWBOX_HEIGHT = 420
const PULL_THRESHOLD = 50
const MIN_DOWNWARD_PULL = 28
const MAX_PULL = 45
const ROPE_START = { x: 134, y: 152 }
const BASE_END = { x: 134, y: 244 }

function clampOffset(dx: number, dy: number): Point {
  const distance = Math.hypot(dx, dy)

  if (distance <= MAX_PULL) {
    return { x: dx, y: dy }
  }

  const scale = MAX_PULL / distance
  return {
    x: dx * scale,
    y: dy * scale,
  }
}

function isPullTarget(target: EventTarget | null) {
  return target instanceof Element && target.closest("[data-pull-target]") != null
}

export function HangingLampToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 })
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const startPointerRef = useRef<Point | null>(null)
  const hasTriggeredRef = useRef(false)
  const ignoreClickRef = useRef(false)
  const switchSoundRef = useRef<HTMLAudioElement | null>(null)
  const springControlsRef = useRef<AnimationControl[]>([])

  useEffect(() => {
    const switchSound = new Audio("/lampswitch.mp3")
    switchSound.preload = "auto"
    switchSoundRef.current = switchSound

    return () => {
      switchSound.pause()
      switchSoundRef.current = null
    }
  }, [])

  const syncDragOffset = useCallback(() => {
    setDragOffset({
      x: dragX.get(),
      y: dragY.get(),
    })
  }, [dragX, dragY])

  useMotionValueEvent(dragX, "change", syncDragOffset)
  useMotionValueEvent(dragY, "change", syncDragOffset)

  const stopSpring = useCallback(() => {
    springControlsRef.current.forEach((control) => control.stop())
    springControlsRef.current = []
  }, [])

  const setVisualOffset = useCallback(
    (offset: Point) => {
      dragX.set(offset.x)
      dragY.set(offset.y)
    },
    [dragX, dragY]
  )

  const playSwitchSound = useCallback(() => {
    const switchSound = switchSoundRef.current
    if (!switchSound) return

    switchSound.currentTime = 0
    void switchSound.play().catch(() => undefined)
  }, [])

  const toggleTheme = useCallback(
    (origin?: Point) => {
      const nextTheme = getDocumentTheme(resolvedTheme) === "dark" ? "light" : "dark"
      playSwitchSound()

      const applyTheme = () => {
        applyDocumentTheme(nextTheme, setTheme)
      }

      if (
        typeof document === "undefined" ||
        typeof document.startViewTransition !== "function"
      ) {
        applyTheme()
        return
      }

      const viewportWidth = window.visualViewport?.width ?? window.innerWidth
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight
      const x = origin?.x ?? viewportWidth - 118
      const y = origin?.y ?? 226
      const maxRadius = Math.hypot(
        Math.max(x, viewportWidth - x),
        Math.max(y, viewportHeight - y)
      )
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ]

      const root = document.documentElement
      root.dataset.magicuiThemeVt = "active"
      root.style.setProperty("--magicui-theme-toggle-vt-duration", "550ms")
      root.style.setProperty("--magicui-theme-vt-clip-from", clipPath[0])

      const cleanup = () => {
        delete root.dataset.magicuiThemeVt
        root.style.removeProperty("--magicui-theme-toggle-vt-duration")
        root.style.removeProperty("--magicui-theme-vt-clip-from")
      }

      const transition = document.startViewTransition(() => {
        flushSync(applyTheme)
      })

      transition.finished.finally(cleanup)
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath },
            {
              duration: 550,
              easing: "ease-in-out",
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)",
            }
          )
        })
        .catch(cleanup)
    },
    [playSwitchSound, resolvedTheme, setTheme]
  )

  const springBack = useCallback(() => {
    stopSpring()

    springControlsRef.current = [
      animate(dragX, 0, {
        type: "spring",
        stiffness: 220,
        damping: 16,
      }),
      animate(dragY, 0, {
        type: "spring",
        stiffness: 220,
        damping: 16,
      }),
    ]
  }, [dragX, dragY, stopSpring])

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isPullTarget(event.target)) return
    if (event.pointerType === "mouse" && event.button !== 0) return

    stopSpring()
    ignoreClickRef.current = true
    hasTriggeredRef.current = false
    startPointerRef.current = { x: event.clientX, y: event.clientY }
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const startPointer = startPointerRef.current
    if (!startPointer) return

    const dx = event.clientX - startPointer.x
    const dy = event.clientY - startPointer.y
    const distance = Math.hypot(dx, dy)
    const nextOffset = clampOffset(dx, dy)

    setVisualOffset(nextOffset)

    const isPullingDown = dy > MIN_DOWNWARD_PULL

    if (
      !hasTriggeredRef.current &&
      isPullingDown &&
      distance > PULL_THRESHOLD
    ) {
      hasTriggeredRef.current = true
      toggleTheme({ x: event.clientX, y: event.clientY })
    }
  }

  const stopDragging = (event: PointerEvent<HTMLButtonElement>) => {
    if (startPointerRef.current) {
      startPointerRef.current = null
      setIsDragging(false)
      springBack()
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    window.setTimeout(() => {
      ignoreClickRef.current = false
    }, 0)
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (ignoreClickRef.current) {
      ignoreClickRef.current = false
      return
    }

    if (event.detail !== 0 && !isPullTarget(event.target)) {
      return
    }

    const rect = buttonRef.current?.getBoundingClientRect()
    toggleTheme(
      rect
        ? {
            x: rect.left + BASE_END.x,
            y: rect.top + BASE_END.y,
          }
        : undefined
    )
  }

  const endX = BASE_END.x + dragOffset.x
  const endY = BASE_END.y + dragOffset.y
  const controlX = BASE_END.x + dragOffset.x * 0.58
  const controlY =
    BASE_END.y - 12 + dragOffset.y * 0.42 + Math.abs(dragOffset.x) * 0.22
  const ropePath = `M${ROPE_START.x} ${ROPE_START.y} Q${controlX} ${controlY} ${endX} ${endY}`

  return (
    <div className="pointer-events-none absolute top-0 right-10 z-40 hidden h-[420px] w-[220px] overflow-visible xl:block">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Pull lamp cord to toggle theme"
        className="group pointer-events-auto relative h-full w-full text-foreground/35 opacity-90 outline-none transition-colors hover:text-foreground/50 focus-visible:text-foreground/50 dark:text-foreground/35 dark:hover:text-foreground/45"
        onClick={handleClick}
        onPointerCancel={stopDragging}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        style={{ touchAction: "none" }}
      >
        <svg
          aria-hidden="true"
          className="h-full w-full overflow-visible"
          fill="none"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        >
          <g
            pointerEvents="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.35"
          >
            <path d="M110 0 C109 22, 111 45, 110 70 C109 81, 111 91, 110 101" />
            <path
              d="M113 0 C112 24, 114 47, 113 72 C112 83, 114 92, 112 101"
              opacity="0.45"
              strokeWidth="0.9"
            />

            <path d="M96 100 C101 95, 120 95, 125 100 L123 116 C117 121, 103 121, 97 116Z" />
            <path
              d="M100 102 C106 99, 116 99, 122 102"
              opacity="0.48"
              strokeWidth="0.9"
            />
            <path d="M99 116 C105 120, 116 120, 122 116" opacity="0.5" />

            <path d="M69 135 L91 112 C101 105, 120 105, 130 112 L151 135" />
            <path
              d="M69 135 C83 155, 137 155, 151 135"
              strokeWidth="1.35"
            />
            <path
              d="M73 136 L94 116 C102 110, 119 110, 127 116 L147 136"
              opacity="0.45"
              strokeWidth="0.9"
            />
            <path
              d="M75 137 C91 150, 130 150, 145 137"
              opacity="0.42"
              strokeWidth="0.9"
            />

            <path d="M99 145 C99 132, 121 132, 121 145 C121 158, 116 168, 110 168 C104 168, 99 158, 99 145Z" />
            <path
              d="M104 149 C107 143, 113 143, 116 149"
              opacity="0.55"
              strokeWidth="1"
            />
            <path d="M105 164 C109 167, 115 166, 118 163" opacity="0.45" />
            <path d="M121 144 C126 145, 131 148, 134 152" opacity="0.42" />
          </g>

          <g
            className={isDragging ? "cursor-grabbing" : "cursor-grab"}
            data-pull-target
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d={ropePath}
              fill="none"
              pointerEvents="none"
              strokeWidth="1.45"
            />
            <path
              d={ropePath}
              fill="none"
              opacity="0"
              pointerEvents="stroke"
              strokeWidth="18"
            />

            <g data-pull-target>
              <ellipse
                cx={endX}
                cy={endY}
                fill="var(--background)"
                pointerEvents="visiblePainted"
                rx="8"
                ry="5"
                stroke="currentColor"
                strokeWidth="1.35"
              />
              <ellipse
                cx={endX + 0.9}
                cy={endY - 0.2}
                fill="none"
                opacity="0.45"
                pointerEvents="none"
                rx="7"
                ry="4"
                stroke="currentColor"
                strokeWidth="0.85"
              />
              <path
                d={`M${endX - 4} ${endY + 0.4} C${endX - 1.5} ${
                  endY + 1.9
                }, ${endX + 2.2} ${endY + 1.8}, ${endX + 4.5} ${endY}`}
                opacity="0.38"
                pointerEvents="none"
                stroke="currentColor"
                strokeWidth="0.85"
              />
              <circle
                cx={endX}
                cy={endY}
                data-pull-target
                fill="transparent"
                r="18"
                stroke="none"
              />
            </g>
          </g>

          <g
            className="text-foreground/30"
            pointerEvents="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.1"
          >
            <path d="M62 268 C78 256, 94 251, 108 249" />
            <path d="M100 245 L110 249 L101 255" />
          </g>
        </svg>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[255px] left-[24px] -rotate-6 font-[var(--font-handwriting)] text-lg leading-none text-foreground/35 transition-colors"
        >
          <RoughNotation
            animationDuration={900}
            color="currentColor"
            padding={3}
            show
            strokeWidth={0.9}
            type="box"
          >
            <span>pull</span>
          </RoughNotation>
        </span>
      </button>
    </div>
  )
}
