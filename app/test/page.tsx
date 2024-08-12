"use client"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { X, SortAsc } from "lucide-react"
import React, { useState } from "react"
// "#84ff00"

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const mainColor = "#84ff00"
  return (
    <main className="min-h-screen w-full">
      <Container className="mb-20 mt-10">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 20 }, (_, i) => (
            <Card
              className="flex h-20 w-full cursor-pointer items-center justify-center"
              key={i}
              onClick={() => setIsOpen(!isOpen)}
            >
              Hello {i + 1}
            </Card>
          ))}
        </div>
        <Drawer>
          <DrawerTrigger>click me</DrawerTrigger>
          <DrawerContent className="">
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
                    onClick={() => setIsOpen(!isOpen)}
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
      </Container>
    </main>
  )
}

export default TestPage
