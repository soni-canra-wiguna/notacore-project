import * as z from "zod"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const token = req.headers.get("authorization")
    const userId = req.headers.get("userId") ?? ""

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized. User not Found." }, { status: 404 })
    }
    if (!token) {
      return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 })
    }

    const categories = await prisma.product.findMany({
      where: {
        userId: userId,
      },
      select: {
        category: true,
      },
      distinct: [`category`],
    })

    return NextResponse.json(
      {
        message: "Category successfully retrieved",
        data: categories,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.log("[ERROR GET CATEGORIES] : ", error)
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
