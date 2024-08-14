"use client"

import { WithChildren } from "@/types"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export const TanstackProvider = ({ children }: WithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // default: true
            gcTime: 40 * (1000 * 60),
            staleTime: 30 * (1000 * 60),
          },
        },
      }),
  )
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
