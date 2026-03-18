"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait until mounted on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a visible placeholder without an icon
    return (
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 rounded-full shadow-sm bg-card"
        aria-label="Toggle theme placeholder"
        disabled
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="shrink-0 rounded-full shadow-sm transition-all hover:bg-accent hover:text-foreground text-muted-foreground bg-card"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4 stroke-[1.5]" />
      ) : (
        <Moon className="h-4 w-4 stroke-[1.5]" />
      )}
    </Button>
  )
}
