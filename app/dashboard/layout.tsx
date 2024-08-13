import { BottomBar } from "@/components/dashboard/bottom-bar"
import { WithChildren } from "@/types"
import React from "react"

const DashboardLayout = ({ children }: WithChildren) => {
  return (
    <>
      {children}
      <BottomBar />
    </>
  )
}

export default DashboardLayout
