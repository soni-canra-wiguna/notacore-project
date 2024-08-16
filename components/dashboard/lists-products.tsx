"use client"

import React from "react"
import { ProductCard } from "./product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useQueryState } from "nuqs"
import { ProductResponse } from "@/types/product"

const ListsProducts = ({
  userId,
  token,
}: {
  userId: string
  token: string
}) => {
  const [sortBy] = useQueryState("sortBy", {
    defaultValue: "new",
    history: "push",
  })

  const { ref, inView } = useInView()
  const {
    data,
    isPending,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["lists_products", sortBy],
    queryFn: async ({ pageParam = 1 }) => {
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
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1
      }
      return undefined
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])
  return (
    <>
      <div className="flex h-full flex-col gap-4">
        {isPending ? (
          <LoadingListProducts type="loading" />
        ) : isError ? (
          <p>error...</p>
        ) : (
          isSuccess &&
          data?.pages?.map((page) => {
            return page?.data?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          })
        )}
      </div>
      <div
        ref={ref}
        className="mb-8 mt-4 flex w-full items-center justify-center"
      >
        {isFetchingNextPage && (
          <p className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin text-primary" /> Load
            more...
          </p>
        )}
      </div>
    </>
  )
}

export default ListsProducts

export const LoadingListProducts = ({
  type,
  lengthLoading = 4,
}: {
  type: "loading" | "fallback"
  lengthLoading?: number
}) => {
  const loadings = Array.from({ length: lengthLoading }, (_, i) => {
    return <Skeleton className="h-24 w-full rounded-xl" key={i} />
  })

  if (type === "loading") {
    return <>{loadings}</>
  }

  return <div className="flex h-full flex-col gap-4">{loadings}</div>
}
