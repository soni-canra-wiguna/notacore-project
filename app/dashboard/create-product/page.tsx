"use client"

import { Form } from "@/components/ui/form"
import { ProductValidation } from "@/schema/product.schema"
import React from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

type InferCreateProduct = z.infer<typeof ProductValidation.CREATE>

const CreateProductPage = () => {
  const { userId, getToken } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  // const token = await getToken()
  const token = "dsf34adjsda848"

  const form = useForm<InferCreateProduct>({
    resolver: zodResolver(ProductValidation.CREATE),
    defaultValues: {
      userId: userId!,
      title: "",
      description: "",
      image: "",
      price: 0,
      category: "",
      stock: {
        quantity: 0,
        unit: "PCS",
      },
    },
  })

  const {
    isPending,
    mutate: createProduct,
    isError,
  } = useMutation({
    mutationFn: async (data: InferCreateProduct) => {
      await axios.post("/api/products", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      form.reset({
        userId: userId!,
        title: "",
        description: "",
        image: "",
        price: 0,
        category: "",
        stock: {
          quantity: 0,
          unit: "PCS",
        },
      })
      toast({
        title: "Produk di buat",
        description: "Product berhasil di buat",
      })
      router.push("/dashboard")
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: () => {
      toast({
        title: "Gagal membuat product",
        description: "Gagal membuat product, pastikan koneksimu lancar",
        variant: "destructive",
      })
    },
  })

  const onSubmit = (data: InferCreateProduct) => {
    try {
      createProduct(data)
    } catch (error) {
      console.log("[FAILED TO SUBMIT PRODUCT]", error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full space-y-6"
      ></form>
    </Form>
  )
}

export default CreateProductPage
