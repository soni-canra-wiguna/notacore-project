import { BottomBar } from "@/components/dashboard/bottom-bar"
import { TopBar } from "@/components/dashboard/top-bar"
import { WithChildren } from "@/types"
import { auth } from "@clerk/nextjs/server"
import React from "react"

const DashboardLayout = async ({ children }: WithChildren) => {
  const { getToken } = auth()
  const token = await getToken()

  return (
    <div className="min-h-screen w-full">
      <TopBar token={token!} />
      {children}
      <BottomBar />
    </div>
  )
}

export default DashboardLayout
