import * as z from "zod"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { getSearchParams } from "@/utils/get-search-params"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (req: NextRequest, res: NextResponse): Promise<any> => {
  try {
    const token = req.headers.get("authorization")
    const userId = req.headers.get("userId") ?? ""

    if (!token) {
      return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 })
    }

    const page = parseInt(getSearchParams(req, "page") ?? "1")
    const limit = parseInt(getSearchParams(req, "limit") ?? "20")
    const skip = (page - 1) * limit
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

    switch (sortBy) {
      case "price-low":
        orderBy = { price: "asc" }
        break
      case "price-high":
        orderBy = { price: "desc" }
        break
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

    const salesRecords = await prisma.salesRecord.findMany({
      where: {
        userId,
        AND: filters,
      },
      orderBy: orderBy || { createdAt: "desc" },
      skip: skip,
      take: limit,
    })

    const totalSalesRecords = await prisma.salesRecord.count({
      where: {
        userId,
      },
    })

    const productNotFound = salesRecords.length === 0

    if (!totalSalesRecords || productNotFound) {
      return NextResponse.json(
        {
          message: "data not found",
          data: [],
        },
        { status: 200 },
      )
    }

    const response = {
      message: "records successfully retrieved",
      data: salesRecords,
      currentPage: page,
      totalPages: Math.ceil(totalSalesRecords / limit),
      totalSalesRecordsPerPage: salesRecords.length,
      totalSalesRecords,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.log("[ERROR GET SALES RECORDS PAGINATION] : ", error)
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
