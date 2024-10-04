"use client"

import { InferProductType, ProductValidation } from "@/schema/product.schema"
import React from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { v4 as uuidv4 } from "uuid"
import { Product } from "@prisma/client"
import { ProductForm } from "./product-form"

export const FormEditProduct = ({
  token,
  product,
}: {
  token: string | null
  product: Product
}) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const defaultValues = {
    userId: product.userId,
    title: product.title,
    description: product.description!,
    image: product.image,
    price: product.price,
    category: product.category,
    stock: product.stock,
    unit: product.unit!,
  }

  const form = useForm<InferProductType>({
    resolver: zodResolver(ProductValidation.CREATE),
    defaultValues,
  })

  const {
    isPending,
    mutate: createProduct,
    isError,
  } = useMutation({
    mutationFn: async (data: InferProductType) => {
      await axios.patch(`/api/products/${product.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          userId: product.userId,
        },
      })
    },
    onSuccess: () => {
      form.reset(defaultValues)
      toast({
        title: "Produk di update",
        description: "Product berhasil di update",
      })
      router.push("/dashboard")
      queryClient.invalidateQueries({ queryKey: ["lists_products"] })
    },
    onError: () => {
      toast({
        title: "Gagal mengupdate product",
        description: "Gagal mengupdate product, pastikan koneksimu lancar",
        variant: "destructive",
      })
    },
  })

  const onSubmit = (data: InferProductType) => {
    createProduct(data)
  }

  const previewProduct = {
    id: uuidv4(),
    userId: product.userId,
    title: form.watch("title") ?? "",
    image: form.watch("image") ?? "",
    description: form.watch("description") ?? "",
    price: form.watch("price") ?? 0,
    category: form.watch("category") ?? "PCS",
    stock: form.watch("stock"),
    unit: form.watch("unit")!,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <ProductForm
      form={form}
      previewProduct={previewProduct}
      isPending={isPending}
      onSubmit={onSubmit}
      label="update"
    />
  )
}
