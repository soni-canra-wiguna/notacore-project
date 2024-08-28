"use client"

import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface CategoryProps {
  category: string
}

export function getCategoryProducts() {
  const { userId, getToken } = useAuth()

  const { data, isPending, isError } = useQuery<CategoryProps[]>({
    queryKey: ["category products"],
    queryFn: async () => {
      const token = await getToken()
      const { data } = await axios.get(`/api/products/categories`, {
        headers: {
          Authorization: token,
          userId,
        },
      })

      return data.data
    },
  })

  return {
    data,
    isPending,
    isError,
  }
}
