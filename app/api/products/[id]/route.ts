import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { ProductValidation } from "@/schema/product.schema"
import { Validation } from "@/schema/validation"
import { CreateProductRequest } from "@/types/product"

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params
    const userId = req.headers.get("userId") ?? ""
    const token = req.headers.get("authorization")
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. No token provided." },
        { status: 401 },
      )
    }

    const request: CreateProductRequest = await req.json()
    const {
      description,
      title,
      image,
      price,
      stock,
      category,
      userId: idUser,
    } = Validation.validate(ProductValidation.UPDATE, request)

    await prisma.product.update({
      where: {
        id,
        userId,
      },
      data: {
        description,
        title,
        image,
        price,
        category,
        userId: idUser,
        stock: {
          update: {
            quantity: stock?.quantity!,
            unit: stock?.unit,
          },
        },
      },
    })

    return NextResponse.json(
      {
        message: "Successfully updated Product",
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
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params
    const userId = req.headers.get("userId") ?? ""
    const token = req.headers.get("authorization")
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. No token provided." },
        { status: 401 },
      )
    }

    const product = await prisma.product.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        stock: true,
      },
    })

    if (!product) {
      return NextResponse.json(
        {
          message: "product not found",
        },
        {
          status: 404,
        },
      )
    }

    return NextResponse.json(
      {
        message: "Product successfully retrieved",
        data: product,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    )
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params
    const userId = req.headers.get("userId") ?? ""
    const token = req.headers.get("authorization")
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. No token provided." },
        { status: 401 },
      )
    }

    await prisma.product.delete({
      where: {
        id,
        userId,
      },
    })

    return NextResponse.json(
      { message: "product was deleted" },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    )
  }
}
