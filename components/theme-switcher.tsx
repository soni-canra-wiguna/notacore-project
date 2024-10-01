"use client"

import { cn } from '@/lib/utils'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

interface ThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  openClosePopover?: () => void,
  sizeIcon?: string
}

export const ThemeSwitcher = ({ openClosePopover, className, sizeIcon = "4", ...props }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme()

  return (
    <div
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light")
        openClosePopover?.()
      }}
      className={cn("flex h-full w-16 cursor-pointer items-center justify-center border-l p-4", className)}
      {...props}
    >
      {theme === "light" ? (
        <Sun className={`size-${sizeIcon} stroke-[1.5]`} />
      ) : (
        <Moon className={`size-${sizeIcon} stroke-[1.5]`} />
      )}
    </div>
  )
}
