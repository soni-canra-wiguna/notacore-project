"use client"

import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { X } from "lucide-react"
import { WithChildren } from "@/types"
import { ResponseDataType } from "@/types/product"
import { formatToIDR } from "@/utils/format-to-idr"
import { Badge } from "../ui/badge"

interface PreviewDetailProductProps extends WithChildren {
  product: ResponseDataType
  setIsOpen?: (isOpen: boolean) => void
}

export const PreviewDetailProduct = ({
  product,
  children,
  setIsOpen,
}: PreviewDetailProductProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader className="flex items-center justify-between border-b pb-3 pt-1">
          <DrawerTitle className="sr-only">detail produk</DrawerTitle>
          <DrawerDescription className="sr-only">
            detail produk {product.title}
          </DrawerDescription>
          <div className="flex items-center gap-3">
            <h3 className="font-semibold capitalize">Detail produk</h3>
          </div>
          <DrawerClose asChild>
            <Button
              onClick={() => setIsOpen?.(false)}
              className=""
              variant="ghost"
              size="icon"
            >
              <X className="size-6 stroke-[1.5]" />
              <p className="sr-only">close</p>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="scrollbar-hide h-full max-h-[400px] w-full overflow-y-auto p-4">
          <div className="mb-2 aspect-square w-full overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.title}
              className="size-full object-cover"
            />
          </div>
          <Badge variant="secondary" className="mb-2 capitalize">
            {product.category}
          </Badge>
          <h1 className="mb-4 text-lg font-semibold">
            {formatToIDR(product.price)}
          </h1>
          <h2 className="mb-1.5 text-xl font-semibold capitalize">
            {product.title}
          </h2>
          <p className="text-sm font-medium">
            stock : {`${product.stock} ${product.unit}`}
          </p>
          <p className="text-sm">{product.description}</p>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
