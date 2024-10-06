import { BottomBar } from "@/components/layout/bottom-bar"
import { TopBar } from "@/components/layout/top-bar"
import { WithChildren } from "@/types"
import { auth } from "@clerk/nextjs/server"
import React from "react"

const DashboardLayout = async ({ children }: WithChildren) => {
  const { getToken } = auth()
  const token = await getToken()

  return (
    <>
      <TopBar token={token!} />
      {children}
      <BottomBar />
    </>
  )
}

export default DashboardLayout
