"use client"

import { useEffect } from "react"
import type { ReactNode } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement

    const applyTheme = (theme: string | null) => {
      const isDark = theme !== "light"

      root.classList.toggle("dark", isDark)
      root.style.colorScheme = isDark ? "dark" : "light"

      if (!theme) {
        localStorage.setItem("theme", "dark")
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
