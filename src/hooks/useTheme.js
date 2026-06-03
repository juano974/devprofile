import { useState, useEffect } from "react"

/**
 * Custom hook to manage the dark/light theme setting.
 * Synchronizes with LocalStorage and system preferences.
 */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = window.localStorage.getItem("theme")
      if (savedTheme) {
        return savedTheme
      }
    } catch (e) {
      console.error("Error reading theme from localStorage", e)
    }
    
    // Fallback to system OS preference
    if (typeof window !== "undefined" && window.matchMedia) {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      return isSystemDark ? "dark" : "light"
    }

    return "light"
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    
    try {
      window.localStorage.setItem("theme", theme)
    } catch (e) {
      console.error("Error writing theme to localStorage", e)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  return { theme, toggleTheme, isDark: theme === "dark" }
}

export default useTheme
