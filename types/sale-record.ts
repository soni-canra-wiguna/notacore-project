import { SaleRecordValidation } from "@/schema/sale-record.schema"
import { SaleRecord } from "@prisma/client"
import { z } from "zod"

// export type CreateSaleRecordRequest = {
//   userId: string
//   title: string
//   image: string
//   price: number
//   category: string
//   totalPrice: number
//   quantity: number
// }

export type CreateSaleRecordRequest = z.infer<
  typeof SaleRecordValidation.CREATE
>

export type ResponseDataType = SaleRecord

export interface ProductResponse {
  message: string
  data: ResponseDataType[]
  currentPage: number
  totalPages: number
  totalProductsPerPage: number
  totalProducts: number
}
