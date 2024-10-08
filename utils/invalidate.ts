import { useQueryClient } from "@tanstack/react-query"

export const invalidate = (keyValue: string) => {
  const queryClient = useQueryClient()

  return queryClient.invalidateQueries({ queryKey: [keyValue] })
}
