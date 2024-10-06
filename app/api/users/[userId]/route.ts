import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs/server"

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const { userId } = params
    const token = req.headers.get("authorization")

    if (!token) {
      return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        products: true,
        salesRecord: true,
      },
    })

    return NextResponse.json({ message: "user was retrieved", data: user }, { status: 200 })
  } catch (error) {
    console.log("[ERROR GET USER] : ", error)
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

export const DELETE = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const { userId } = params
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized. User not Found." }, { status: 404 })
    }

    const token = req.headers.get("authorization")
    if (!token) {
      return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 })
    }

    // delete user from clerk
    await clerkClient().users.deleteUser(userId)

    // delete user from database
    await prisma.user.delete({
      where: {
        userId,
      },
    })

    return NextResponse.json(
      {
        message: "user deleted",
      },
      { status: 200 },
    )
  } catch (error) {
    console.log("[ERROR DELETE USER] : ", error)
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
