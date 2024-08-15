"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ProductValidation } from "@/schema/product.schema"
import React from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Container } from "@/components/layout/container"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/file-upload"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UNIT_PRODUCTS } from "@/constants/units"
import { Label } from "@/components/ui/label"
import { formatToIDR } from "@/utils/format-to-idr"
import LoadingButton from "@/components/loading-button"
import { Button } from "../ui/button"
import { FileSearch } from "lucide-react"
import { PreviewDetailProduct } from "./preview-product"
import { v4 as uuidv4 } from "uuid"

type InferCreateProduct = z.infer<typeof ProductValidation.CREATE>

export const FormCreateProduct = ({
  userId,
  token,
}: {
  userId: string | null
  token: string | null
}) => {
  const router = useRouter()
  const queryClient = useQueryClient()

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

  const previewProduct = {
    id: uuidv4(),
    userId: userId!,
    title: form.watch("title"),
    image: form.watch("image"),
    description: form.watch("description") ?? "",
    price: form.watch("price"),
    category: form.watch("category"),
    stock: form.watch("stock")!,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <main className="min-h-screen w-full">
      <Container className="pb-20 pt-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        endpoint="product"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title produk</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="masukkan nama produk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Deskripsi produk</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="masukkan deskripsi produk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <div className="flex w-full items-start gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>Harga produk</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="masukkan nominal harga"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <div className="space-y-2">
                <Label>Preview harga</Label>
                <div className="flex h-10 w-full items-center rounded-xl bg-secondary px-4">
                  {formatToIDR(form.watch("price"))}
                </div>
              </div>
            </div>
            <div className="flex w-full items-start gap-4">
              <FormField
                control={form.control}
                name="stock.quantity"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>Jumlah produk</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="jumlah produk tersedia"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              {/* unit / satuan */}
              <FormField
                control={form.control}
                name="stock.unit"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Satuan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="satuan produk" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent align="end">
                          <SelectGroup>
                            {UNIT_PRODUCTS.map((unit) => (
                              <SelectItem
                                className="capitalize"
                                key={unit.value}
                                value={unit.value}
                              >
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>kategori produk</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="masukkan kategori"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <div className="flex flex-col gap-2.5 pt-3">
              <LoadingButton
                type="submit"
                loading={isPending}
                disabled={isPending}
                className="w-full capitalize"
              >
                tambah produk
              </LoadingButton>
              <PreviewDetailProduct product={previewProduct}>
                <Button className="w-full" variant="outline">
                  <FileSearch className="mr-2 size-4" /> preview
                </Button>
              </PreviewDetailProduct>
            </div>
          </form>
        </Form>
      </Container>
    </main>
  )
}
