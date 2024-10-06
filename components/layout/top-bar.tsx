"use client"

import { Container } from "./container"
import useVisibleNavbar from "@/hook/use-visible-navbar"
import { cn } from "@/lib/utils"
import Account from "../dashboard/account"
import { SearchBar } from "../dashboard/search"
import { Bell } from "lucide-react"
import { useEffect, useState } from "react"

export const TopBar = ({ token }: { token: string }) => {
  const { visible } = useVisibleNavbar()
  const [isBorderVisible, setIsBorderVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setIsBorderVisible(true)
      } else {
        setIsBorderVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-50 h-max w-full bg-background transition duration-300 ease-in-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0",
        isBorderVisible ? "border-b" : "border-none",
      )}
    >
      <Container className="flex items-center gap-6 py-3">
        <SearchBar token={token} />
        <div className="flex items-center gap-6">
          <Bell className="size-5 stroke-[1.5]" />
          <Account />
        </div>
      </Container>
    </nav>
  )
}
