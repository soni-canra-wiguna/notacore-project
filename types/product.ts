import { Product, Unit } from "@prisma/client"

export type CreateProductRequest = {
  userId: string
  title: string
  description: string | null
  image: string
  price: number
  category: string
  stock: number
  unit?: Unit
}

export type ResponseDataType = Product

export interface ProductResponse {
  message: string
  data: ResponseDataType[]
  currentPage: number
  totalPages: number
  totalProductsPerPage: number
  totalProducts: number
}
