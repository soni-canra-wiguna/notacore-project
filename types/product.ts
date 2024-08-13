import { Product, Stock } from "@prisma/client"

export type CreateProductRequest = {
  userId: string
  title: string
  description: string | null
  image: string
  price: number
  category: string
  stock?: Pick<Stock, "quantity" | "unit">
}
