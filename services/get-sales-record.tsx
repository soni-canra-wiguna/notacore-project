import { useAuth } from "@clerk/nextjs"
import { SaleRecord } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface GetSalesRecordWithPaggingProps {
  message: string
  data: SaleRecord[]
  currentPage: number
  totalPages: number
  totalSaleRecordsPerPage: number
  totalSaleRecords: number
}

export const getSalesRecordWithPagging = () => {
  const { userId, getToken } = useAuth()

  const { data, isPending, isError } = useQuery<GetSalesRecordWithPaggingProps>(
    {
      queryKey: ["padding data"],
      queryFn: async () => {
        const token = await getToken()
        const { data } = await axios.get(`/api/sale-records/pagination`, {
          headers: {
            Authorization: token,
            userId: userId!,
          },
        })

        return data
      },
    },
  )

  return {
    data,
    isPending,
    isError,
  }
}
