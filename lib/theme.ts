import type { Dispatch, SetStateAction } from "react"

export type AppTheme = "light" | "dark"

type SetTheme = Dispatch<SetStateAction<string>>

export function getDocumentTheme(fallback?: string): AppTheme {
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark") ? "dark" : "light"
  }

  return fallback === "dark" ? "dark" : "light"
}

export function applyDocumentTheme(theme: AppTheme, setTheme: SetTheme) {
  if (typeof document !== "undefined") {
    const root = document.documentElement

    root.classList.remove("light", "dark")
    root.classList.add(theme)
    root.style.colorScheme = theme
  }

  try {
    localStorage.setItem("theme", theme)
  } catch {
    // next-themes also persists the value; this keeps direct DOM sync resilient.
  }

  setTheme(theme)
}
