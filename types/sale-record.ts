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

export interface SalesAndRevenueByCategoryResponse {
  label: string
  quantity: number
  totalPrice: number
}

export interface StatisticResponse {
  totalSales: number
  totalRevenue: number
  totalTransactions: number
  averageSalePerTransaction: number
  averageRevenuePerTransaction: number
  salesByCategory: Record<string, number>
  salesAndRevenueByCategory: SalesAndRevenueByCategoryResponse[]
  revenueByCategory: Record<string, number>
  salesByMonth: Record<string, number>
  revenueByMonth: Record<string, number>
  topSellingProducts: {
    product: string
    quantity: number
  }[]
}
