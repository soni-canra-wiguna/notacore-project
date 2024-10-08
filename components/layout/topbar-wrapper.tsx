"use client"

import useVisibleNavbar from "@/hook/use-visible-navbar"
import { cn } from "@/lib/utils"
import { WithChildren } from "@/types"

export const TopBarWrapper: React.FC<WithChildren> = ({ children }) => {
  const { visible, isBorderVisible } = useVisibleNavbar()

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 h-max w-full bg-background transition duration-300 ease-in-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0",
        isBorderVisible ? "border-b" : "border-none",
      )}
    >
      {children}
    </header>
  )
}
