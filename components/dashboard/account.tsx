"use client"

import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { SignOutButton, useUser } from "@clerk/nextjs"
import { ArrowRight } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import { Button } from "../ui/button"

const Account = () => {
  const { user, isLoaded } = useUser()

  const image = user?.externalAccounts[0].imageUrl
  const email = user?.externalAccounts[0].emailAddress
  const firstName = user?.externalAccounts[0].firstName
  const lastName = user?.externalAccounts[0].lastName
  const fullName = `${firstName!} ${lastName!}`

  if (!isLoaded) return <Skeleton className="size-9 rounded-full" />

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="size-9 cursor-pointer overflow-hidden rounded-full">
          <img src={image} alt={fullName} className="size-full object-cover" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-72 flex-col items-center justify-center gap-2 py-6"
      >
        <div className="size-16 overflow-hidden rounded-full">
          <img src={image} alt={fullName} className="size-full object-cover" />
        </div>
        <h1 className="text-lg font-semibold">{fullName}</h1>
        <p className="text-sm font-medium">{email}</p>
        <div className="mt-3">
          <SignOutButton redirectUrl="/">
            <Button className="capitalize">
              logout <ArrowRight className="mt-1 size-4" />
            </Button>
          </SignOutButton>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Account
