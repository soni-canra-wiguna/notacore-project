import prisma from "@/lib/prisma"
import { SaleRecordValidation } from "@/schema/sale-record.schema"
import { Validation } from "@/schema/validation"
import { CreateSaleRecordRequest } from "@/types/sale-record"
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

    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1")
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "20")
    const skip = (page - 1) * limit
    const sortBy = req.nextUrl.searchParams.get("sortBy")
    const totalSaleRecords = await prisma.product.count({
      where: {
        userId,
      },
    })
    const searchQuery = req.nextUrl.searchParams
      .get("search")
      ?.replace(/-/g, " ")

    let orderBy = {}
    switch (sortBy) {
      case "new":
        orderBy = { createdAt: "desc" }
        break
      case "old":
        orderBy = { createdAt: "asc" }
        break
      case "a-z":
        orderBy = { title: "asc" }
        break
      case "z-a":
        orderBy = { title: "desc" }
        break
      default:
        orderBy = { createdAt: "desc" }
    }

    const saleRecords = await prisma.saleRecord.findMany({
      where: {
        userId,
        AND: {
          title: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      },
      orderBy,
      skip: skip,
      take: limit,
    })

    const productNotFound = saleRecords.length === 0

    if (searchQuery && productNotFound) {
      return NextResponse.json(
        {
          message: "search result not found",
          data: [],
        },
        { status: 200 },
      )
    }

    if (!totalSaleRecords || productNotFound) {
      return NextResponse.json(
        {
          message: "data not found",
          data: [],
        },
        { status: 200 },
      )
    }

    const responseMessage = searchQuery
      ? "Search results successfully retrieved"
      : "records successfully retrieved"
    const responseTotalPages = Math.ceil(
      searchQuery ? saleRecords.length : totalSaleRecords / limit,
    )

    const response = {
      message: responseMessage,
      data: saleRecords,
      currentPage: page,
      totalPages: responseTotalPages,
      totalSaleRecordsPerPage: saleRecords.length,
      totalSaleRecords,
    }

    // await redis.set(
    //   redisCacheKey,
    //   JSON.stringify(response),
    //   "EX",
    //   REDIS_EXPIRATION_TIME,
    // )

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