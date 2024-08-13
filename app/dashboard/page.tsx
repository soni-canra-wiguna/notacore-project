"use client"

import { TopBar } from "@/components/dashboard/top-bar"
import { Container } from "@/components/layout/container"
import { Card } from "@/components/ui/card"
import React, { useState } from "react"
import {
  MoreVertical,
  Plus,
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
  ArrowDownAZ,
  ArrowDownZA,
  Settings2,
  ArrowUpDown,
  ArrowDownUp,
  Pencil,
  TrashIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import testImage from "@/public/mouse.webp"
import { toast } from "@/components/ui/use-toast"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const DashboardPage = () => {
  return (
    <main className="min-h-screen w-full">
      <TopBar />
      <Container className="pb-20 pt-[72px]">
        <div className="mb-3 flex w-full items-center justify-between">
          <h3 className="font-semibold capitalize">produk kamu</h3>
          <FilterProducts />
        </div>
        <TestCard />
      </Container>
    </main>
  )
}

export default DashboardPage

const TestCard = () => {
  const MoreOptions = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button className="size-8 rounded-lg" size="icon" variant="ghost">
            <MoreVertical className="size-4 stroke-[1.5]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="flex w-32 flex-col">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "relative flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-sm capitalize hover:bg-secondary",
            )}
          >
            <Pencil className="size-4 stroke-[1.5]" />
            edit
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "relative flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-sm capitalize hover:bg-secondary",
            )}
          >
            <TrashIcon className="size-4 stroke-[1.5]" />
            hapus
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  const Card1 = () => {
    return (
      <Card className="flex h-24 items-start justify-between rounded-xl p-1.5">
        <div className="flex w-full items-start gap-2">
          <div className="aspect-square h-20 overflow-hidden rounded-xl">
            <Image alt="image" src={testImage} className="size-full" />
          </div>
          <div className="">
            <h4 className="text-sm font-semibold capitalize">
              mouse gaming anti lag by pressplay{" "}
            </h4>
            <p className="text-xs">Rp. 300.000</p>
            <p className="text-xs">stock: 5 pcs</p>
          </div>
        </div>
        <div className="flex h-full flex-col justify-between gap-2">
          <MoreOptions />
          <Button
            onClick={() => {
              toast({
                title: "di tambahkan",
                description: "yayaya ini description",
              })
            }}
            className="size-8 rounded-lg"
            size="icon"
            variant="outline"
          >
            <Plus className="size-4 stroke-[1.5]" />
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {Array.from({ length: 10 }, (_, i) => (
        <Card1 key={i} />
      ))}
    </div>
  )
}

const FilterProducts = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<string>("terbaru")
  const filterItems = [
    {
      label: "terbaru",
      icon: ArrowUpDown,
    },
    {
      label: "terlama",
      icon: ArrowDownUp,
    },
    {
      label: "a - z",
      icon: ArrowDownAZ,
    },
    {
      label: "z - a",
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
              setIsActive(item.label)
              setIsOpen(!isOpen)
            }}
            key={item.label}
            className={cn(
              "group relative flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-sm capitalize hover:bg-main/10",
              isActive === item.label && "bg-main/10",
            )}
          >
            <span
              className={cn(
                "absolute left-0 top-1/2 hidden h-6 w-1 -translate-y-1/2 rounded-lg bg-main group-hover:inline",
                isActive === item.label && "inline",
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
