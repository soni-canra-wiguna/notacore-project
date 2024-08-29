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
      default:
        orderBy = { quantity: "desc" }
    }

    const saleRecords = await prisma.saleRecord.findMany({
      where: {
        userId,
        AND: filters,
      },
      orderBy: orderBy || { createdAt: "desc" },
      skip: skip,
      take: limit,
    })

    const totalSaleRecords = await prisma.product.count({
      where: {
        userId,
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

    const response = {
      message: "records successfully retrieved",
      data: saleRecords,
      currentPage: page,
      totalPages: Math.ceil(totalSaleRecords / limit),
      totalSaleRecordsPerPage: saleRecords.length,
      totalSaleRecords,
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
