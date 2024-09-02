import { StatisticResponse } from "@/types/sale-record"
import { useAuth } from "@clerk/nextjs"
import { SaleRecord } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface GetSalesRecordProps {
  message: string
  data: SaleRecord[]
  statistic: StatisticResponse
}

export const getSalesRecord = () => {
  const { userId, getToken } = useAuth()

  const { data, isPending, isError } = useQuery<GetSalesRecordProps>({
    queryKey: ["sales_record"],
    queryFn: async () => {
      const token = await getToken()
      const { data } = await axios.get(`/api/sale-records`, {
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
