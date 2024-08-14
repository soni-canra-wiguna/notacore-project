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
import { useAuth } from "@clerk/nextjs"
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
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { formatToIDR } from "@/utils/format-to-idr"

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
                    <FormItem>
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
            <Button type="submit" className="capitalize">
              tambah produk
            </Button>
          </form>
        </Form>
      </Container>
    </main>
  )
}

export default CreateProductPage
