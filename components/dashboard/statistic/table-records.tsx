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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { formatToIDR } from "@/utils/format-to-idr"
import { useAuth } from "@clerk/nextjs"
import { SaleRecord } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react"
import React, { useState } from "react"
import { id } from "date-fns/locale"

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
  const [limit, setLimit] = useState("20")

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
    <section className="mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize">riwayat transaksi</h1>
      </div>
      <Card className="gradientCard h-full max-w-[480px] overflow-hidden rounded-xl">
        <CardContent className="scrollbar-hide h-full max-h-[350px] w-full overflow-y-auto px-4 pb-0 pt-4">
          <div className="w-[844px] overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-60 border p-2 capitalize">Nama Produk</th>
                  <th
                    className="w-36 border p-2 capitalize"
                    onClick={() => handleSortBy("price")}
                  >
                    <div className="flex items-center justify-center gap-2">
                      harga <ChevronsUpDown className="size-3" />
                    </div>
                  </th>
                  <th
                    className="w-24 border p-2 capitalize"
                    onClick={() => handleSortBy("qty")}
                  >
                    <div className="flex items-center justify-center gap-2">
                      jumlah <ChevronsUpDown className="size-3" />
                    </div>
                  </th>
                  <th className="w-40 border p-2 capitalize">total harga</th>
                  <th
                    className="border p-2 capitalize"
                    onClick={() => handleSortBy("date")}
                  >
                    <div className="flex items-center justify-center gap-2">
                      tanggal <ChevronsUpDown className="size-3" />
                    </div>
                  </th>
                </tr>
              </thead>
              {isPending ? (
                <LoadingTableProduct />
              ) : isError ? (
                <tbody>something went wrong</tbody>
              ) : (
                <tbody>
                  <TableContent data={data} />
                </tbody>
              )}
            </table>
          </div>
        </CardContent>
        <CardFooter className="justify-between gap-6 p-4">
          <Select onValueChange={setLimit} defaultValue={limit}>
            <SelectTrigger className="w-max gap-2">
              <SelectValue placeholder="pilih" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="text-sm">
                <SelectLabel className="capitalize">baris halaman</SelectLabel>
                <SelectItem className="text-sm" value="10">
                  10
                </SelectItem>
                <SelectItem className="text-sm" value="20">
                  20
                </SelectItem>
                <SelectItem className="text-sm" value="30">
                  30
                </SelectItem>
                <SelectItem className="text-sm" value="40">
                  40
                </SelectItem>
                <SelectItem className="text-sm" value="50">
                  50
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
              halaman {data?.currentPage} dari {data?.totalPages}
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
    <tbody className="gradientCard shimmer scrollbar-hide h-[50px] w-full rounded-xl bg-secondary text-card-foreground shadow-sm"></tbody>
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
        const formattedDate = format(p.createdAt, "dd MMMM yyyy", {
          locale: id,
        })
        return (
          <tr key={p.id} className="selection:bg-transparent">
            <td className="max-w-60 truncate border p-2">{p.title}</td>
            <td className="w-36 border p-2 text-left">
              {formatToIDR(p.price)}
            </td>
            <td className="w-24 border p-2 text-center">{p.quantity}</td>
            <td className="w-40 border p-2 text-left">
              {formatToIDR(p.totalPrice)}
            </td>
            <td className="border p-2 text-left tracking-wide">
              {formattedDate}
            </td>
          </tr>
        )
      })}
    </>
  )
}
