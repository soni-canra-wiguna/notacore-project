"use client"

import { TopBar } from "@/components/dashboard/top-bar"
import { Container } from "@/components/layout/container"
import { Card } from "@/components/ui/card"
import React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { X, SortAsc, MoreVertical, Plus, FilterIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import testImage from "@/public/mouse.webp"
import { toast } from "@/components/ui/use-toast"

const DashboardPage = () => {
  return (
    <main className="min-h-screen w-full">
      <TopBar />
      <Container className="pb-20 pt-[72px]">
        <div className="mb-3 flex w-full items-center justify-between">
          <h3 className="font-semibold capitalize">produk kamu</h3>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon">
                <FilterIcon className="size-4 stroke-[1.5]" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-md mx-auto">
              <DrawerHeader className="flex items-center justify-between border-b pb-3 pt-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold capitalize">
                    Jumlah Produk
                  </h3>
                  <p className="font-medium">10</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="" variant="ghost" size="icon">
                    <SortAsc className="size-6 stroke-[1.5]" />
                    <p className="sr-only">filter</p>
                  </Button>
                  <DrawerClose asChild>
                    <Button className="" variant="ghost" size="icon">
                      <X className="size-6 stroke-[1.5]" />
                      <p className="sr-only">close</p>
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerHeader>
              <div className="h-full max-h-[400px] w-full overflow-y-auto p-4">
                <div className="flex h-full flex-col gap-4">
                  {Array.from({ length: 10 }, (_, i) => (
                    <Card
                      className="flex h-20 w-full cursor-pointer items-center justify-center shadow-none"
                      key={i}
                    >
                      Hello {i + 1}
                    </Card>
                  ))}
                </div>
              </div>
              <DrawerFooter className="border-t">
                <div className="flex items-center justify-end gap-3">
                  <Button>Tambahkan</Button>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
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
              mouse gaming anti lag ffaad
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
