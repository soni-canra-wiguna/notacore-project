"use client"

import Image from "next/image"
import { Container } from "../layout/container"
import logo from "@/public/notacore.png"
import {
  SearchIcon,
  UserCircle2Icon,
  ClipboardList,
  SortAscIcon,
  SortDescIcon,
  ListIcon,
  Minus,
  LayoutGrid,
  Columns2,
  AlignJustify,
} from "lucide-react"
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
// import useVisibleNavbar from "@/hook/use-visible-navbar"
import { cn } from "@/lib/utils"
// import { useMounted } from "@/hook/use-mounted"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { toast } from "../ui/use-toast"
import testImage from "@/public/mouse.webp"
import { Badge } from "../ui/badge"
import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import Account from "./account"

export const TopBar = () => {
  // const { isMounted } = useMounted()
  // const { visible } = useVisibleNavbar()

  // if (!isMounted)
  //   return (
  //     <nav
  //       className={cn(
  //         "duration-[400ms] fixed left-0 top-0 z-50 h-max w-full bg-background",
  //       )}
  //     >
  //       <Container className="flex items-center gap-6 py-3">
  //         <Input
  //           className="pllaceholder:text-sm h-8 rounded-full border-none bg-secondary px-4 text-sm placeholder:capitalize focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
  //           placeholder="cari produk"
  //         />
  //         <div className="flex items-center gap-6">
  //           <ListItems />
  //           <UserCircle2Icon className="size-6 cursor-pointer stroke-[1.5] text-inherit" />
  //         </div>
  //       </Container>
  //     </nav>
  //   )

  return (
    <nav
      className={cn(
        "duration-[400ms] fixed left-0 top-0 z-50 h-max w-full bg-background transition ease-in-out",
        // visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0",
      )}
    >
      <Container className="flex items-center gap-6 py-3">
        <Input
          className="pllaceholder:text-sm h-8 rounded-full border-none bg-secondary px-4 text-sm placeholder:capitalize focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          placeholder="cari produk"
        />
        <div className="flex items-center gap-6">
          <ListItems />
          <Account />
        </div>
      </Container>
    </nav>
  )
}

const ListItems = () => {
  const [layoutSwitcher, setLayoutSwitcher] = useState<"list" | "slider">(
    "list",
  )
  const TOTAL_PRODUCT = 6

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
            <p className="font-medium">{TOTAL_PRODUCT}</p>
          </div>
          <div className="flex items-center gap-2">
            <LayoutSwitcher
              layoutSwitcher={layoutSwitcher}
              setLayoutSwitcher={setLayoutSwitcher}
            />
            <DrawerClose asChild>
              <Button className="" variant="ghost" size="icon">
                <X className="size-6 stroke-[1.5]" />
                <p className="sr-only">close</p>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="scrollbar-hide h-full max-h-[400px] w-full overflow-y-auto p-4">
          {layoutSwitcher === "list" ? (
            <div className="flex h-full flex-col gap-4">
              {Array.from({ length: TOTAL_PRODUCT }, (_, i) => (
                <CardDrawer key={i} />
              ))}
            </div>
          ) : (
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
            >
              <CarouselContent>
                {Array.from({ length: TOTAL_PRODUCT }, (_, i) => (
                  <CarouselItem key={i}>
                    <CardDrawer />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
        <DrawerFooter className="border-t">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium">Total Harga : </p>
              <p className="text-sm font-semibold">Rp. 500.000</p>
            </div>
            <Button>Tambahkan</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const CardDrawer = () => {
  const DeleteButton = () => {
    return (
      <span className="absolute left-0 top-0 flex cursor-pointer items-center justify-center rounded-lg bg-destructive p-1.5">
        <X className="size-3 text-background" />
      </span>
    )
  }
  return (
    <Card className="relative flex h-28 items-start justify-between rounded-xl p-1.5">
      <DeleteButton />
      <div className="flex w-full items-start gap-2">
        <div className="aspect-square h-20 overflow-hidden rounded-xl">
          <Image alt="image" src={testImage} className="size-full" />
        </div>
        <div className="">
          {/* <Badge className="text-xs font-medium capitalize" variant="secondary">
            produk
          </Badge> */}
          <h4 className="text-sm font-semibold capitalize">
            mouse gaming anti lag by pressplay{" "}
          </h4>
          <p className="text-xs font-medium">Rp. 300.000</p>
          <p className="text-xs">stock: 5 pcs</p>
        </div>
      </div>
      <div className="flex h-full flex-col justify-between gap-2">
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
          <Minus className="size-4 stroke-[1.5]" />
        </Button>
        <span className="text-center text-sm">2</span>
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

interface LayoutSwitcherProps {
  layoutSwitcher: "list" | "slider"
  setLayoutSwitcher: (layoutSwitcher: "list" | "slider") => void
}

const LayoutSwitcher = ({
  layoutSwitcher,
  setLayoutSwitcher,
}: LayoutSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)

  function ButtonSwitcher(item: { type: "list" | "slider"; icon: any }) {
    const handleSwitch = () => {
      setLayoutSwitcher(item.type)
      setIsOpen(!isOpen)
    }

    return (
      <div
        onClick={handleSwitch}
        className={cn(
          "group relative flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-sm capitalize hover:bg-main/10",
          layoutSwitcher === item.type && "bg-main/10",
        )}
      >
        <span
          className={cn(
            "absolute left-0 top-1/2 hidden h-6 w-1 -translate-y-1/2 rounded-lg bg-main group-hover:inline",
            layoutSwitcher === item.type && "inline",
          )}
        />
        <item.icon className="size-4 stroke-[1.5]" />
        {item.type}
      </div>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="">
          <LayoutGrid className="size-5 stroke-[1.5]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-40 flex-col">
        <ButtonSwitcher icon={AlignJustify} type="list" />
        <ButtonSwitcher icon={Columns2} type="slider" />
      </PopoverContent>
    </Popover>
  )
}
