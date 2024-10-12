import prisma from "@/lib/prisma"
import { getSearchParams } from "@/utils/get-search-params"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (req: NextRequest) => {
  try {
    const token = req.headers.get("authorization")
    const userId = req.headers.get("userId") ?? ""

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized. User not Found." }, { status: 404 })
    }
    if (!token) {
      return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 })
    }

    const query = getSearchParams(req, "query")?.replace(/-/g, " ")

    const products = await prisma.product.findMany({
      where: {
        userId,
        AND: {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const productNotFound = products.length === 0

    if (query && productNotFound) {
      return NextResponse.json(
        {
          message: "search results not found",
          data: [],
        },
        { status: 200 },
      )
    }

    const response = {
      message: "Search results successfully retrieved",
      data: products,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.log("[ERROR GET SEARCH RESULTS]", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}