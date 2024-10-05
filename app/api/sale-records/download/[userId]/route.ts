import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { format } from "date-fns"
import { getSearchParams } from "@/utils/get-search-params"
import ExcelJS from "exceljs"
import { Buffer } from "buffer"

export const dynamic = "force-dynamic"

export type FileType = "xlsx" | "csv"

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const { userId } = params
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized. User not Found." }, { status: 404 })
    }

    const fileType: "xlsx" | "csv" = (getSearchParams(req, "fileType") as FileType) ?? "csv"

    const salesRecord = await prisma.saleRecord.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Riwayat Penjualan")

    worksheet.columns = [
      { header: "No", key: "no" },
      { header: "Nama Produk", key: "title" },
      { header: "Kategori", key: "category" },
      { header: "Gambar", key: "image" },
      { header: "Harga", key: "price" },
      { header: "QTY", key: "quantity" },
      { header: "Total Harga", key: "totalPrice" },
      { header: "Tanggal Pembelian", key: "createdAt" },
    ]

    salesRecord.forEach(
      ({ title, category, image, price, quantity, totalPrice, createdAt }, index) => {
        worksheet.addRow({
          no: index + 1,
          title,
          category,
          image: fileType === "xlsx" ? { text: image, hyperlink: image } : image, // Hyperlink image
          price,
          quantity,
          totalPrice,
          createdAt: format(createdAt, "dd-MM-yyyy"),
        })
      },
    )

    let buffer: Buffer
    let contentType: string
    let fileName: string

    if (fileType === "csv") {
      buffer = Buffer.from(await workbook.csv.writeBuffer())
      contentType = "text/csv"
      fileName = "sales-record.csv"
    } else {
      buffer = Buffer.from(await workbook.xlsx.writeBuffer())
      contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      fileName = "sales-record.xlsx"
    }

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename=${fileName}`,
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
