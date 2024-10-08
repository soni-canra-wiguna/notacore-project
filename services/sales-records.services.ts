import { WithTokenAndUserId } from "@/types"
import { SalesRecordsPaginationResponse, SalesRecordsResponse } from "@/types/sales-record"
import axios from "axios"

interface salesRecordsServicesProps extends WithTokenAndUserId {
  from: string
  to: string
}

interface SalesRecordsPaginationServicesProps extends WithTokenAndUserId {
  sortBy: string
  page: number
  limit: string
}

export const salesRecordsServices = async ({
  from,
  to,
  token,
  userId,
}: salesRecordsServicesProps): Promise<SalesRecordsResponse> => {
  const { data }: { data: SalesRecordsResponse } = await axios.get(
    `/api/sales-records?from=${from}&to=${to}`,
    {
      headers: {
        Authorization: token,
        userId,
      },
    },
  )
  return data
}

export const salesRecordsPaginationServices = async ({
  sortBy,
  page,
  limit,
  token,
  userId,
}: SalesRecordsPaginationServicesProps): Promise<SalesRecordsPaginationResponse> => {
  const { data } = await axios.get(
    `/api/sales-records/pagination?sortBy=${sortBy}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: token,
        userId: userId,
      },
    },
  )
  return data
}
