"use client"

import { Container } from "../layout/container"
import useVisibleNavbar from "@/hook/use-visible-navbar"
import { cn } from "@/lib/utils"
import Account from "./account"
import { SearchBar } from "./search"
import { Bell } from "lucide-react"

export const TopBar = ({ token }: { token: string }) => {
  const { visible } = useVisibleNavbar()

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-50 h-max w-full bg-background transition duration-300 ease-in-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0",
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
