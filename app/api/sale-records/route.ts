import prisma from "@/lib/prisma"
import { SaleRecordValidation } from "@/schema/sale-record.schema"
import { Validation } from "@/schema/validation"
import { CreateSaleRecordRequest } from "@/types/sale-record"
import { getSearchParams } from "@/utils/get-search-params"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const token = req.headers.get("authorization")
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. No token provided." },
        { status: 401 },
      )
    }

    const request: CreateSaleRecordRequest[] = await req.json()
    const response = Validation.validate(
      SaleRecordValidation.ARRAY_CREATE,
      request,
    )

    if (!Array.isArray(response) || response.length === 0) {
      return NextResponse.json(
        {
          message: "invalid request path",
        },
        {
          status: 400,
        },
      )
    }

    await prisma.saleRecord.createMany({
      data: response,
    })

    return NextResponse.json(
      {
        message: "Successfully created sale record",
      },
      { status: 201 },
    )
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 },
      )
    }
    return NextResponse.json(
      {
        message: "internal server error",
      },
      {
        status: 500,
      },
    )
  }
}

export const GET = async (
  req: NextRequest,
  res: NextResponse,
): Promise<any> => {
  try {
    const token = req.headers.get("authorization")
    const userId = req.headers.get("userId") ?? ""

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. No token provided." },
        { status: 401 },
      )
    }

    const from = getSearchParams(req, "from") ?? "" // createdAt
    const to = getSearchParams(req, "to") ?? "" // createdAt
    const category = getSearchParams(req, "category") // category
    const sortBy = getSearchParams(req, "sortBy")

    let filters = []
    let orderBy = {}

    if (category) {
      filters.push({
        category: {
          contains: category,
          mode: "insensitive" as Prisma.QueryMode,
        },
      })
    }

    if (from && to) {
      const fromDate = new Date(from)
      const toDate = new Date(to)
      toDate.setUTCHours(23, 59, 59, 999)
      filters.push({
        createdAt: {
          gte: new Date(fromDate),
          lte: new Date(toDate),
        },
      })
    }

    if (from && to && category) {
      const fromDate = new Date(from)
      const toDate = new Date(to)
      toDate.setUTCHours(23, 59, 59, 999)
      filters.push({
        createdAt: {
          gte: new Date(fromDate),
          lte: new Date(toDate),
        },
        category: {
          contains: category,
          mode: "insensitive" as Prisma.QueryMode,
        },
      })
    }

    switch (sortBy) {
      case "quantity-low":
        orderBy = { quantity: "asc" }
        break
      case "quantity-high":
        orderBy = { quantity: "desc" }
        break
      case "date-desc":
        orderBy = { createdAt: "desc" }
        break
      case "date-asc":
        orderBy = { createdAt: "asc" }
        break
      default:
        orderBy = { createdAt: "desc" }
    }

    const saleRecords = await prisma.saleRecord.findMany({
      where: {
        userId,
        AND: filters,
      },
      orderBy: orderBy || { createdAt: "desc" },
    })

    const totalSaleRecords = await prisma.saleRecord.count({
      where: {
        userId,
        AND: filters,
      },
    })

    const productNotFound = saleRecords.length === 0

    if (!totalSaleRecords || productNotFound) {
      return NextResponse.json(
        {
          message: "data not found",
          data: [],
        },
        { status: 200 },
      )
    }

    // statistic response start

    const totalSales = saleRecords.reduce((acc, curr) => {
      return acc + curr.quantity
    }, 0)
    const totalRevenue = saleRecords.reduce((acc, curr) => {
      return acc + curr.totalPrice
    }, 0)
    const totalTransactions = totalSaleRecords
    const averageSalePerTransaction = Math.round(totalSales / totalTransactions)
    const averageRevenuePerTransaction = totalRevenue / totalTransactions
    // Calculate sales and revenue by category
    const salesByCategory = saleRecords.reduce(
      (acc, curr) => {
        const category = curr.category || "Uncategorized"
        if (!acc[category]) {
          acc[category] = 0
        }
        acc[category] += curr.quantity
        return acc
      },
      {} as Record<string, number>,
    )

    const revenueByCategory = saleRecords.reduce(
      (acc, curr) => {
        const category = curr.category || "Uncategorized"
        if (!acc[category]) {
          acc[category] = 0
        }
        acc[category] += curr.totalPrice
        return acc
      },
      {} as Record<string, number>,
    )

    const salesAndRevenueByCategory = saleRecords.reduce(
      (acc, curr) => {
        const category = curr.category || "Uncategorized"
        if (!acc[category]) {
          acc[category] = {
            label: category,
            quantity: 0,
            totalPrice: 0,
          }
        }
        acc[category].quantity += curr.quantity
        acc[category].totalPrice += curr.totalPrice

        return acc
      },
      {} as Record<
        string,
        { label: string; quantity: number; totalPrice: number }
      >,
    )
    const salesAndRevenueByCategoryArray = Object.values(
      salesAndRevenueByCategory,
    ).sort((a, b) => b.quantity - a.quantity)

    // Calculate sales and revenue by month
    const salesByMonth = saleRecords.reduce(
      (acc, curr) => {
        const month = curr.createdAt.toLocaleString("default", {
          month: "long",
        })
        if (!acc[month]) {
          acc[month] = 0
        }
        acc[month] += curr.quantity
        return acc
      },
      {} as Record<string, number>,
    )

    const revenueByMonth = saleRecords.reduce(
      (acc, curr) => {
        const month = curr.createdAt.toLocaleString("default", {
          month: "long",
        })
        if (!acc[month]) {
          acc[month] = 0
        }
        acc[month] += curr.totalPrice
        return acc
      },
      {} as Record<string, number>,
    )

    // Get top selling products
    const topSellingProducts = saleRecords
      .reduce(
        (acc, curr) => {
          const product = acc.find((p) => p.product === curr.title)
          if (product) {
            product.quantity += curr.quantity
          } else {
            acc.push({ product: curr.title, quantity: curr.quantity })
          }
          return acc
        },
        [] as { product: string; quantity: number }[],
      )
      .sort((a, b) => b.quantity - a.quantity)

    const statisticResponse = {
      totalSales,
      totalRevenue,
      totalTransactions,
      averageSalePerTransaction,
      averageRevenuePerTransaction,
      salesByCategory,
      salesAndRevenueByCategory: salesAndRevenueByCategoryArray,
      revenueByCategory,
      salesByMonth,
      revenueByMonth,
      topSellingProducts,
    }

    // statistic response end

    const response = {
      message: "records successfully retrieved",
      data: saleRecords,
      statistic: statisticResponse,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 },
      )
    }
    return NextResponse.json(
      {
        message: "internal server error",
      },
      {
        status: 500,
      },
    )
  }
}

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const token = req.headers.get("authorization")
    const userId = req.headers.get("userId") ?? ""

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. No token provided." },
        { status: 401 },
      )
    }

    await prisma.saleRecord.deleteMany({
      where: {
        userId: userId,
      },
    })

    return NextResponse.json("successfully deleted", {
      status: 200,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 },
      )
    }
    return NextResponse.json(
      {
        message: "internal server error",
      },
      {
        status: 500,
      },
    )
  }
}
