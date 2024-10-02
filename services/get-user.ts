"use client"

import { UserType } from "@/types/user"
import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function getCategoryProducts() {
  const { userId, getToken } = useAuth()

  const { data, isPending, isError } = useQuery<UserType>({
    queryKey: ["category products"],
    queryFn: async () => {
      const token = await getToken()
      const { data } = await axios.get(`/api/users/${userId}`, {
        headers: {
          Authorization: token,
          userId,
        },
      })

      return data.data
    },
    enabled: !!userId,
  })

  return {
    data,
    isPending,
    isError,
  }
}
