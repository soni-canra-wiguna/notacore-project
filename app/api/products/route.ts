import { NextRequest, NextResponse } from "next/server"
import { ProductServices } from "./product.service"
import { CreateProductRequest } from "./product.model"
import { auth } from "@clerk/nextjs/server"
import { z } from "zod"

export const POST = async (
  req: NextRequest,
  res: NextResponse,
): Promise<any> => {
  try {
    const token = req.headers.get("authorization")
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. No token provided." },
        { status: 401 },
      )
    }

    const request: CreateProductRequest =
      (await req.json()) as CreateProductRequest
    await ProductServices.create(request)
    return NextResponse.json(
      {
        message: "successfully created Product",
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
