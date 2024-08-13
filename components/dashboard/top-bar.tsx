"use client"

import Image from "next/image"
import { Container } from "../layout/container"
import logo from "@/public/notacore.png"
import { SearchIcon, UserCircle2Icon, ClipboardList } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card } from "../ui/card"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { X, SortAsc, MoreVertical, Plus, FilterIcon } from "lucide-react"
import useVisibleNavbar from "@/hook/use-visible-navbar"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hook/use-mounted"

export const TopBar = () => {
  const { isMounted } = useMounted()
  const { visible } = useVisibleNavbar()

  if (!isMounted)
    return (
      <nav
        className={cn(
          "duration-[400ms] fixed left-0 top-0 z-50 h-max w-full bg-background",
        )}
      >
        <Container className="flex items-center gap-6 py-3">
          <Input
            className="pllaceholder:text-sm h-8 rounded-full border-none bg-secondary px-4 text-sm placeholder:capitalize focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            placeholder="cari produk"
          />
          <div className="flex items-center gap-6">
            <ListItems />
            <UserCircle2Icon className="size-6 cursor-pointer stroke-[1.5] text-inherit" />
          </div>
        </Container>
      </nav>
    )

  return (
    <nav
      className={cn(
        "duration-[400ms] fixed left-0 top-0 z-50 h-max w-full bg-background transition ease-in-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0",
      )}
    >
      <Container className="flex items-center gap-6 py-3">
        {/* <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" className="w-6" />
          <h4 className="text-base font-semibold capitalize">nota core</h4>
        </div> */}
        <Input
          className="pllaceholder:text-sm h-8 rounded-full border-none bg-secondary px-4 text-sm placeholder:capitalize focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          placeholder="cari produk"
        />
        <div className="flex items-center gap-6">
          <ListItems />
          {/* <Button className="size-10 text-inherit" variant="ghost" size="icon">
            <SearchIcon className="size-5 stroke-[1.5] text-inherit" />
          </Button> */}
          {/* <Button className="size-10 text-inherit" variant="ghost" size="icon"> */}
          <UserCircle2Icon className="size-6 cursor-pointer stroke-[1.5] text-inherit" />
          {/* </Button> */}
        </div>
      </Container>
    </nav>
  )
}

const ListItems = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="relative size-max cursor-pointer">
          <span className="absolute -bottom-1 -right-1.5 flex size-4 items-center justify-center rounded-full border-[2px] border-white bg-red-500 p-2 text-xs text-background">
            3
          </span>
          <ClipboardList className="size-6 stroke-[1.5] text-inherit" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader className="flex items-center justify-between border-b pb-3 pt-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold capitalize">Jumlah Produk</h3>
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
        <div className="scrollbar-hide h-full max-h-[400px] w-full overflow-y-auto p-4">
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
  )
}
