"use client"

import { StatisticResponse } from "@/types/sales-record"
import { useAuth } from "@clerk/nextjs"
import { SalesRecord } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface GetSalesRecordProps {
  message: string
  data: SalesRecord[]
  statistic: StatisticResponse
}

export const getSalesRecords = (from: string | null, to: string | null) => {
  const { userId, getToken } = useAuth()

  const { data, isPending, isError } = useQuery<GetSalesRecordProps>({
    queryKey: ["sales_records", from, to],
    queryFn: async () => {
      const token = await getToken()
      const { data } = await axios.get(`/api/sales-records?from=${from}&to=${to}`, {
        headers: {
          Authorization: token,
          userId: userId!,
        },
      })

      return data
    },
  })

  return {
    data,
    isPending,
    isError,
  }
}
