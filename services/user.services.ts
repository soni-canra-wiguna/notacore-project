import { WithTokenAndUserId } from "@/types"
import { useClerk } from "@clerk/nextjs"
import axios from "axios"

export const deleteUserServices = async ({ token, userId }: WithTokenAndUserId) => {
  const { signOut } = useClerk()

  await axios.delete(`/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      userId: userId,
    },
  })

  await signOut()
}
