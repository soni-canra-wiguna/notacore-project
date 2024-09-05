"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatToIDR } from "@/utils/format-to-idr"
import { useAuth } from "@clerk/nextjs"
import { SaleRecord } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react"
import React, { useState } from "react"

export interface GetSalesRecordWithPaggingProps {
  message: string
  data: SaleRecord[]
  currentPage: number
  totalPages: number
  totalSaleRecordsPerPage: number
  totalSaleRecords: number
}

type handleSortByType = "price" | "date" | "qty"

const TableRecords = () => {
  const { userId, getToken } = useAuth()
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState("date-asc")
  const [limit, setLimit] = useState(20)

  const { data, isPending, isError } = useQuery<GetSalesRecordWithPaggingProps>(
    {
      queryKey: ["pagging_salesrecord", sortBy, page, limit],
      queryFn: async () => {
        const token = await getToken()
        const { data } = await axios.get(
          `/api/sale-records/pagination?sortBy=${sortBy}&page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: token,
              userId: userId,
            },
          },
        )
        return data
      },
    },
  )

  const handleSortBy = (type: handleSortByType) => {
    if (type === "price") {
      setSortBy((prev) => (prev === "price-high" ? "price-low" : "price-high"))
    } else if (type === "date") {
      setSortBy((prev) => (prev === "date-desc" ? "date-asc" : "date-desc"))
    } else if (type === "qty") {
      setSortBy((prev) =>
        prev === "quantity-high" ? "quantity-low" : "quantity-high",
      )
    }
  }

  return (
    <section className="my-4 mb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize">riwayat transaksi</h1>
      </div>
      <Card className="gradientCard h-full max-w-[480px] overflow-hidden rounded-xl">
        <CardContent className="scrollbar-hide h-full max-h-[350px] w-full overflow-y-auto px-4 pb-0">
          <div className="w-[844px] overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-64 border p-2 capitalize">Nama Produk</th>
                  <th
                    className="w-36 border p-2 capitalize"
                    onClick={() => handleSortBy("price")}
                  >
                    harga
                  </th>
                  <th
                    className="flex w-24 items-center justify-center gap-2 border p-2 capitalize"
                    onClick={() => handleSortBy("qty")}
                  >
                    jumlah <ChevronsUpDown className="size-3" />
                  </th>
                  <th className="w-40 border p-2 capitalize">total harga</th>
                  <th
                    className="flex items-center justify-center gap-2 border p-2 capitalize"
                    onClick={() => handleSortBy("date")}
                  >
                    tanggal <ChevronsUpDown className="size-3" />
                  </th>
                </tr>
              </thead>
              {isPending ? (
                <LoadingTableProduct />
              ) : isError ? (
                <tbody>something wen wrong</tbody>
              ) : (
                <tbody>
                  <TableContent data={data} />
                </tbody>
              )}
            </table>
          </div>
        </CardContent>
        <CardFooter className="justify-end p-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              size="xs"
              className="rounded-xl p-2"
              variant="outline"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <p className="text-sm">
              {data?.currentPage} / {data?.totalPages}
            </p>
            <Button
              size="xs"
              className="rounded-xl p-2"
              variant="outline"
              onClick={() => setPage(page + 1)}
              disabled={page === data?.totalPages}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  )
}

export default TableRecords

export const LoadingTableProduct = () => {
  return (
    <tbody className="gradientCard shimmer h-[50px] w-full rounded-xl bg-card text-card-foreground shadow-sm"></tbody>
    // <Card className="gradientCard h-[130px] w-full rounded-xl">
    //   <div className="space-y-1 p-4">
    //     <Skeleton variant="shimmer" className="h-7 w-40 rounded-full" />
    //     <Skeleton variant="shimmer" className="h-4 w-52 rounded-full" />
    //   </div>
    //   <div className="p-4">
    //     <Skeleton variant="shimmer" className="h-[100px] w-full rounded-xl" />
    //   </div>
    // </Card>
  )
}

const TableContent = ({
  data,
}: {
  data: GetSalesRecordWithPaggingProps | undefined
}) => {
  return (
    <>
      {data?.data.map((p) => {
        const formattedDate = format(p.createdAt, "yyyy-MM-dd")
        return (
          <tr key={p.id} className="selection:bg-transparent">
            <td className="max-w-64 truncate border p-2">{p.title}</td>
            <td className="w-36 border p-2 text-left">
              {formatToIDR(p.price)}
            </td>
            <td className="w-24 border p-2 text-center">{p.quantity}</td>
            <td className="w-40 border p-2 text-left">
              {formatToIDR(p.totalPrice)}
            </td>
            <td className="border p-2 text-center">{formattedDate}</td>
          </tr>
        )
      })}
    </>
  )
}
