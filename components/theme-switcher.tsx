"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

interface ThemeSwitcherProps {
  openClosePopover?: () => void
}

export const ThemeSwitcher = ({ openClosePopover }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme()

  return (
    <div
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light")
        openClosePopover?.()
      }}
      className="flex h-full w-16 cursor-pointer items-center justify-center border-l p-4"
    >
      {theme === "light" ? (
        <Sun className="size-4 stroke-[1.5]" />
      ) : (
        <Moon className="size-4 stroke-[1.5]" />
      )}
    </div>
  )
}
