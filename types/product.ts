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

export type ResponseDataType = Product & {
  stock: Pick<Stock, "quantity" | "unit">
}

export interface ProductResponse {
  message: string
  data: ResponseDataType[]
  currentPage: number
  totalPages: number
  totalProductsPerPage: number
  totalProducts: number
}
