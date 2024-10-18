import { SearchByType } from "@/app/api/products/search/route"
import { WithTokenAndUserId } from "@/types"
import { ProductResponse, SearchResponse } from "@/types/product"
import { Product } from "@prisma/client"
import axios from "axios"

interface ListsProductsServicesProps extends WithTokenAndUserId {
  pageParam: number
  sortBy: string
}

interface searchServicesProps extends WithTokenAndUserId {
  query: string
  searchBy: SearchByType
}

export const listsProductsServices = async ({
  pageParam,
  sortBy,
  token,
  userId,
}: ListsProductsServicesProps): Promise<ProductResponse> => {
  const { data }: { data: ProductResponse } = await axios.get(
    `/api/products?sortBy=${sortBy}&page=${+pageParam}&limit=${20}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        userId: userId,
      },
    },
  )
  return data
}

export const searchProductsServices = async ({
  query,
  token,
  userId,
  searchBy,
}: searchServicesProps): Promise<Product[]> => {
  const { data }: { data: SearchResponse } = await axios.get(
    `/api/products/search?query=${query}&searchBy=${searchBy}`,
    {
      headers: {
        Authorization: token,
        userId,
      },
    },
  )
  return data.data
}
