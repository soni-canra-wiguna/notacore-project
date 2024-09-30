"use client"

import React, { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { SignOutButton, useUser } from "@clerk/nextjs"
import { ArrowLeft, Sun } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import { ThemeSwitcher } from "../theme-switcher"

const Account = () => {
  const { user, isLoaded } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  const image = user?.externalAccounts[0].imageUrl
  const email = user?.externalAccounts[0].emailAddress
  const firstName = user?.externalAccounts[0].firstName
  const lastName = user?.externalAccounts[0].lastName
  const fullName = `${firstName!} ${lastName!}`

  if (!isLoaded)
    return <Skeleton variant="shimmer" className="size-9 rounded-full" />

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="size-9 cursor-pointer overflow-hidden rounded-full">
          <img src={image} alt={fullName} className="size-full object-cover" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="gradientCard flex w-72 flex-col gap-4 p-0"
      >
        <div className="flex flex-col gap-1 p-4">
          <h6 className="text-base font-semibold">{fullName}</h6>
          <p className="text-xs font-medium text-muted-foreground">{email}</p>
        </div>
        <div className="flex h-10 items-center border-t">
          <SignOutButton redirectUrl="/">
            <div className="flex flex-1 cursor-pointer items-center justify-center gap-2 p-4 text-sm capitalize">
              <ArrowLeft className="size-4" /> Keluar
            </div>
          </SignOutButton>
          <ThemeSwitcher openClosePopover={() => setIsOpen(!isOpen)} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Account
