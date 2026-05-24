"use client"

import { useEffect } from "react"
import type { ReactNode } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement

    const applyTheme = (theme: string | null) => {
      const nextTheme = theme === "dark" ? "dark" : "light"
      const isDark = nextTheme === "dark"

      root.classList.toggle("dark", isDark)
      root.style.colorScheme = isDark ? "dark" : "light"

      if (theme !== nextTheme) {
        localStorage.setItem("theme", nextTheme)
      }
    }

    applyTheme(localStorage.getItem("theme"))

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "theme") {
        applyTheme(event.newValue)
      }
    }

    window.addEventListener("storage", handleStorage)

    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  return children
}
