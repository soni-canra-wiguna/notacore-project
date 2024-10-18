import { NextRequest } from "next/server"

export const getSearchParams = (request: NextRequest, params: string) => {
  if (params === "query") {
    return request.nextUrl.searchParams.get(params)?.replace(/-/g, " ")
  }

  return request.nextUrl.searchParams.get(params)
}
