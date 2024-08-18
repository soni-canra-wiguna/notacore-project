"use client"

import { Container } from "../layout/container"
import {
  ClipboardList,
  Minus,
  LayoutGrid,
  Columns2,
  AlignJustify,
  Trash,
} from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
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
import { X, Plus } from "lucide-react"
import useVisibleNavbar from "@/hook/use-visible-navbar"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import Account from "./account"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import {
  decrementProduct,
  incermentProduct,
  ProductSliceType,
  removeProduct,
  resetProduct,
} from "@/redux/features/product/product-slice"
import { formatToIDR } from "@/utils/format-to-idr"
import { useMounted } from "@/hook/use-mounted"
import { toast } from "@/components/ui/use-toast"
import { SearchBar } from "./search"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const TopBar = ({token}: {token: string}) => {
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
          <ListItems />
          <Account />
        </div>
      </Container>
    </nav>
  )
}

const ListItems = () => {
  const { isMounted } = useMounted()
  const [layoutSwitcher, setLayoutSwitcher] = useState<"list" | "slider">(
    "list",
  )
  const { products } = useSelector((state: RootState) => state.products)
  const totalProduct = products.length
  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price
  }, 0)
  const disabledButton: boolean = totalProduct <= 0

  if (!isMounted) {
    return (
      <div className="relative size-max cursor-pointer">
        <span className="absolute -bottom-1 -right-1.5 flex size-4 items-center justify-center rounded-full border-[2px] border-white bg-red-500 p-2 text-xs text-background">
          0
        </span>
        <ClipboardList className="size-6 stroke-[1.5] text-inherit" />
      </div>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="relative size-max cursor-pointer">
          <span className="absolute -bottom-1 -right-1.5 flex size-4 items-center justify-center rounded-full border-[2px] border-white bg-red-500 p-2 text-xs text-background">
            {totalProduct}
          </span>
          <ClipboardList className="size-6 stroke-[1.5] text-inherit" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader className="flex items-center justify-between border-b">
          <DrawerTitle className="sr-only">jumlah produk</DrawerTitle>
          <DrawerDescription className="sr-only">
            jumlah produk di keranjang yaitu {totalProduct}
          </DrawerDescription>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold capitalize">Jumlah Produk</h3>
            <p className="font-medium">{totalProduct}</p>
          </div>
          <div className="flex items-center gap-2">
            <LayoutSwitcher
              disabledButton={disabledButton}
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
              {products.map((product) => (
                <CardDrawer key={product.id} product={product} />
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
                {products.map((product) => (
                  <CarouselItem key={product.id}>
                    <CardDrawer product={product} />
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
              <p className="text-sm font-semibold">{formatToIDR(totalPrice)}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <ResetListsProductsButton disabledButton={disabledButton} />
              <Button disabled={disabledButton}>Tambahkan</Button>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const CardDrawer = ({ product }: { product: ProductSliceType }) => {
  const dispatch = useDispatch()

  const DeleteButton = ({ id }: { id: string }) => {
    return (
      <span
        onClick={() => {
          dispatch(removeProduct(id))
          toast({
            title: "produk di hapus",
            variant: "destructive",
          })
        }}
        className="absolute left-0 top-0 flex cursor-pointer items-center justify-center rounded-lg bg-destructive p-1.5"
      >
        <X className="size-3 text-background" />
      </span>
    )
  }
  return (
    <Card className="relative flex h-28 items-start justify-between rounded-xl p-1.5">
      <DeleteButton id={product.id} />
      <div className="flex w-full items-start gap-2">
        <div className="aspect-square h-20 overflow-hidden rounded-xl">
          <img
            alt="image"
            src={product.image}
            className="size-full object-cover"
          />
        </div>
        <div className="">
          {/* <Badge className="text-xs font-medium capitalize" variant="secondary">
            produk
          </Badge> */}
          <h4 className="text-sm font-semibold capitalize">{product.title}</h4>
          <p className="text-xs font-medium">
            {formatToIDR(product.unitPrice)}
          </p>
          <p className="text-xs">stock: 5 pcs</p>
        </div>
      </div>
      <div className="flex h-full flex-col justify-between gap-2">
        <Button
          onClick={() => {
            dispatch(decrementProduct(product))
          }}
          disabled={product.quantity <= 1}
          className="size-8 rounded-lg"
          size="icon"
          variant="outline"
        >
          <Minus className="size-4 stroke-[1.5]" />
        </Button>
        <span className="text-center text-sm">{product.quantity}</span>
        <Button
          onClick={() => {
            dispatch(incermentProduct(product))
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
  disabledButton: boolean
  layoutSwitcher: "list" | "slider"
  setLayoutSwitcher: (layoutSwitcher: "list" | "slider") => void
}

const LayoutSwitcher = ({
  disabledButton,
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
        <Button variant="ghost" size="icon" disabled={disabledButton}>
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

const ResetListsProductsButton = ({
  disabledButton,
}: {
  disabledButton: boolean
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleResetProduct = () => {
    dispatch(resetProduct())
    setIsOpen(!isOpen)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabledButton}
          className=""
          variant="secondary"
          size="icon"
        >
          <Trash className="size-5 stroke-[1.5]" />
          <p className="sr-only">reset produk</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="capitalize">Hapus semua produk</DialogTitle>
          <DialogDescription>
            Apakah kamu yakin ingin menghapus semua produk ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2.5">
          <DialogClose asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="capitalize"
              variant="outline"
            >
              batal
            </Button>
          </DialogClose>
          <Button
            onClick={handleResetProduct}
            className="capitalize"
            variant="destructive"
          >
            ya, hapus produk
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
