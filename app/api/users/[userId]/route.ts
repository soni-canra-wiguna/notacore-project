import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    const { userId } = params

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        products: true,
        salesRecord: true,
      },
    })

    return NextResponse.json(
      { message: "user was retrieved", data: user },
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
