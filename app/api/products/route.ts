import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { ProductValidation } from "@/schema/product.schema"
import { Validation } from "@/schema/validation"
import { CreateProductRequest } from "@/types/product"

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const token = req.headers.get("authorization")
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. No token provided." },
        { status: 401 },
      )
    }

    const request: CreateProductRequest = await req.json()
    const response = Validation.validate(ProductValidation.CREATE, request)

    await prisma.product.create({
      data: response,
    })

    return NextResponse.json(
      {
        message: "Successfully created Product",
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
    const totalProducts = await prisma.product.count({
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

    const products = await prisma.product.findMany({
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

    const productNotFound = products.length === 0

    if (searchQuery && productNotFound) {
      return NextResponse.json(
        {
          message: "search result not found",
        },
        { status: 404 },
      )
    }

    if (!totalProducts || productNotFound) {
      return NextResponse.json(
        {
          data: []
        },
        { status: 200 },
      )
    }

    const responseMessage = searchQuery
      ? "Search results successfully retrieved"
      : "Products successfully retrieved"
    const responseTotalPages = Math.ceil(
      searchQuery ? products.length : totalProducts / limit,
    )

    const response = {
      message: responseMessage,
      data: products,
      currentPage: page,
      totalPages: responseTotalPages,
      totalProductsPerPage: products.length,
      totalProducts,
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
