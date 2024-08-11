import { Product } from "@prisma/client"
import { NextRequest } from "next/server"

// export type ProductType = {
//   userId: string // generate with clerk
//   title: string
//   description?: string
//   image: string
//   price: number
//   stock: number
// }

export interface ProductRequest extends NextRequest {
  product: Product
}
