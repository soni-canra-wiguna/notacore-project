"use client"

import { formatToIDR } from "@/utils/format-to-idr"
import { useDispatch } from "react-redux"
import { Button } from "../ui/button"
import { incermentProduct } from "@/redux/features/product/product-slice"
import { toast } from "../ui/use-toast"
import { Card } from "@/components/ui/card"
import React, { useState } from "react"
import { MoreVertical, Plus, Pencil, TrashIcon, FileSearch } from "lucide-react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { PreviewDetailProduct } from "@/components/dashboard/preview-product"
import { Unit } from "@prisma/client"
import { CreateProductRequest, ResponseDataType } from "@/types/product"

export const ProductCard = ({ product }: { product: ResponseDataType }) => {
  const dispacth = useDispatch()

  const dataProduct = {
    id: product.id,
    userId: product.userId,
    title: product.title,
    image: product.image,
    price: product.price,
    category: product.category,
    quantity: 1,
    unit: product.stock.unit,
    unitPrice: product.price,
  }

  return (
    <Card className="flex h-24 items-start justify-between rounded-xl p-1.5">
      <div className="flex w-full items-start gap-2">
        <div className="aspect-square h-20 overflow-hidden rounded-xl">
          <img alt="image" src={product.image} className="size-full" />
        </div>
        <div className="">
          <h4 className="text-sm font-semibold capitalize">{product.title}</h4>
          <p className="text-xs">{formatToIDR(product.price)}</p>
          <p className="text-xs">stock: 5 pcs</p>
        </div>
      </div>
      <div className="flex h-full flex-col justify-between gap-2">
        <MoreOptions />
        <Button
          onClick={() => {
            dispacth(incermentProduct(dataProduct))
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

const MoreOptions = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const product = {
    userId: "userID123",
    title: "hello titlte",
    image: "/mouse.webp",
    description: "description product",
    price: 10000,
    category: "elektronik",
    stock: {
      quantity: 10,
      unit: Unit.PCS,
    },
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="size-8 rounded-lg" size="icon" variant="ghost">
          <MoreVertical className="size-4 stroke-[1.5]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-32 flex-col">
        <PreviewDetailProduct product={product} setIsOpen={setIsOpen}>
          <div
            className={cn(
              "relative flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-sm capitalize hover:bg-secondary",
            )}
          >
            <FileSearch className="size-4 stroke-[1.5]" />
            Detail
          </div>
        </PreviewDetailProduct>
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
