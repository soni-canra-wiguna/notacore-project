import { Product, Stock } from "@prisma/client"

export type CreateProductRequest = {
  userId: string
  title: string
  description: string | null
  image: string
  price: number
  stock?: Pick<Stock, "quantity" | "unit">
}
