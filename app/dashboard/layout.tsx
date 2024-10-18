import { BottomBar } from "@/components/layout/bottom-bar"
import { TopBar } from "@/components/layout/top-bar"
import { WithChildren } from "@/types"

const DashboardLayout: React.FC<WithChildren> = ({ children }) => {
  return (
    <>
      <TopBar />
      {children}
      <BottomBar />
    </>
  )
}

export default DashboardLayout
