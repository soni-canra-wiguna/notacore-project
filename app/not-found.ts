import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function NotFoundPage() {
  const user = await currentUser()
  if (user) {
    redirect("/dashboard")
  } else {
    redirect("/")
  }
}
