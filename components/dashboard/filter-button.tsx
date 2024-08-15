"use client"

import React, { useState } from "react"
import {
  ArrowDownAZ,
  ArrowDownZA,
  Settings2,
  ArrowUpDown,
  ArrowDownUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useQueryState } from "nuqs"

export const FilterButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    history: "push",
    defaultValue: "new",
  })

  const filterItems = [
    {
      label: "terbaru",
      value: "new",
      icon: ArrowUpDown,
    },
    {
      label: "terlama",
      value: "old",
      icon: ArrowDownUp,
    },
    {
      label: "a - z",
      value: "a-z",
      icon: ArrowDownAZ,
    },
    {
      label: "z - a",
      value: "z-a",
      icon: ArrowDownZA,
    },
  ]

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="size-9">
          <Settings2 className="size-4 stroke-[1.5]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-40 flex-col">
        {filterItems.map((item) => (
          <div
            onClick={() => {
              setSortBy(item.value)
              setIsOpen(!isOpen)
            }}
            key={item.label}
            className={cn(
              "group relative flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-sm capitalize hover:bg-main/10",
              sortBy === item.value && "bg-main/10",
            )}
          >
            <span
              className={cn(
                "absolute left-0 top-1/2 hidden h-6 w-1 -translate-y-1/2 rounded-lg bg-main group-hover:inline",
                sortBy === item.value && "inline",
              )}
            />
            <item.icon className="size-4 stroke-[1.5]" />
            {item.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export const FallbackFilterButton = () => {
  return (
    <Button variant="outline" size="icon" className="size-9">
      <Settings2 className="size-4 stroke-[1.5]" />
    </Button>
  )
}
