// import { Product } from "@prisma/client"
// import { NextRequest } from "next/server"

import { Product } from "@prisma/client"

export type ProductResponse = {
  userId: string
  title: string
  description?: string | null
  image: string
  price: number
  stock: number
}

export type CreateProductRequest = ProductResponse

export function toProductResponse(product: Product): ProductResponse {
  return {
    userId: product.userId,
    title: product.title,
    description: product.description,
    image: product.image,
    price: product.price,
    stock: product.stock,
  }
}
