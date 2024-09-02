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
import { useMounted } from "@/hook/use-mounted"

export interface GetSalesRecordWithPaggingProps {
  message: string
  data: SaleRecord[]
  currentPage: number
  totalPages: number
  totalSaleRecordsPerPage: number
  totalSaleRecords: number
}

const TableRecords = () => {
  const [page, setPage] = useState(1)
  const { userId, getToken } = useAuth()
  const { isMounted } = useMounted()

  const { data, isPending, isError } = useQuery<GetSalesRecordWithPaggingProps>(
    {
      queryKey: ["pagging_salesrecord", page],
      queryFn: async () => {
        const token = await getToken()
        const { data } = await axios.get(
          `/api/sale-records/pagination?page=${page}`,
          {
            headers: {
              Authorization: token,
              userId: userId!,
            },
          },
        )

        return data
      },
    },
  )

  if (!isMounted)
    return (
      <Card className="gradientCard h-[130px] w-full rounded-xl">
        <div className="space-y-1 p-4">
          <Skeleton variant="shimmer" className="h-7 w-40 rounded-full" />
          <Skeleton variant="shimmer" className="h-4 w-52 rounded-full" />
        </div>
        <div className="p-4">
          <Skeleton variant="shimmer" className="h-[100px] w-full rounded-xl" />
        </div>
      </Card>
    )

  return (
    <Card className="gradientCard h-full max-w-[480px] overflow-hidden rounded-xl">
      <CardHeader className="space-y-1 p-4">
        <CardTitle className="text-lg capitalize">tabel penjualan</CardTitle>
        <CardDescription className="text-xs">
          List produk yang terjual
        </CardDescription>
      </CardHeader>
      <CardContent className="scrollbar-hide h-full max-h-[350px] w-full overflow-y-auto px-4 pb-0">
        <div className="w-[844px] overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-64 border p-2 capitalize">Nama Produk</th>
                <th className="w-36 border p-2 capitalize">harga</th>
                <th className="flex w-24 items-center justify-center gap-2 border p-2 capitalize">
                  jumlah <ChevronsUpDown className="size-3" />
                </th>
                <th className="w-40 border p-2 capitalize">total harga</th>
                <th className="flex items-center justify-center gap-2 border p-2 capitalize">
                  tanggal <ChevronsUpDown className="size-3" />
                </th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <tr className="">loading...</tr>
              ) : (
                data?.data.map((p, i) => {
                  const formattedDate = format(p.createdAt, "yyyy-MM-dd")
                  return (
                    <tr key={i} className="selection:bg-transparent">
                      <td className="max-w-64 truncate border p-2">
                        {p.title}
                      </td>
                      <td className="w-36 border p-2 text-left">
                        {formatToIDR(p.price)}
                      </td>
                      <td className="w-24 border p-2 text-center">
                        {p.quantity}
                      </td>
                      <td className="w-40 border p-2 text-left">
                        {formatToIDR(p.totalPrice)}
                      </td>
                      <td className="border p-2 text-center">
                        {formattedDate}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
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
  )
}

export default TableRecords
