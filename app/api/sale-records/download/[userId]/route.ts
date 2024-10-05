import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { format } from "date-fns"

export const dynamic = "force-dynamic"

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const { userId } = params

    const salesRecord = await prisma.saleRecord.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const csvData = salesRecord.map(
      ({ title, category, image, price, quantity, totalPrice, createdAt }, index) => {
        const formattedDate = format(createdAt, "dd-MM-yyyy")
        return `"${index + 1}",${title}","${category}","${image}","${price}","${quantity}","${totalPrice}","${formattedDate}"\n`
      },
    )

    const csvContent = `"No","Nama Produk","Kategori","Url Gambar","Harga","QTY","Total Harga","Tanggal Pembelian"\n${csvData.join("")}`

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="sales-record.csv"',
      },
    })
  } catch (error) {
    console.log("[ERROR DOWNLOAD PRODUCT API] : ", error)
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
