"use client"

import { TopBar } from "@/components/dashboard/top-bar"
import { Container } from "@/components/layout/container"
import { Card } from "@/components/ui/card"
import React from "react"
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
          <Button className="size-8 rounded-lg" size="icon" variant="ghost">
            <MoreVertical className="size-4 stroke-[1.5]" />
          </Button>
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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="size-9">
          <Settings2 className="size-4 stroke-[1.5]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-40 flex-col">
        <div className="relative flex w-full items-center gap-3 bg-main/10 px-4 py-2 text-sm capitalize">
          <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-lg bg-main" />
          <ArrowUpDown className="size-4 stroke-[1.5]" />
          terbaru
        </div>
        <div className="relative flex w-full items-center gap-3 px-4 py-2 text-sm capitalize hover:bg-secondary">
          <ArrowDownUp className="size-4 stroke-[1.5]" />
          terlama
        </div>
        <div className="relative flex w-full items-center gap-3 px-4 py-2 text-sm capitalize hover:bg-secondary">
          <ArrowDownAZ className="size-4 stroke-[1.5]" />a - z
        </div>
        <div className="relative flex w-full items-center gap-3 px-4 py-2 text-sm capitalize hover:bg-secondary">
          <ArrowDownZA className="size-4 stroke-[1.5]" />z - a
        </div>
      </PopoverContent>
    </Popover>
  )
}
