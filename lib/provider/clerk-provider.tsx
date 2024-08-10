import { WithChildren } from "@/types"
import { ClerkProvider } from "@clerk/nextjs"

export const WithClerkProvider = ({ children }: WithChildren) => {
  return <ClerkProvider>{children}</ClerkProvider>
}
