import { NextRequest } from "next/server"

export const getSearchParams = (request: NextRequest, params: string) => {
  return request.nextUrl.searchParams.get(params)
}
