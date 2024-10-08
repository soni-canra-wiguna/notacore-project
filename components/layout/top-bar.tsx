import { Wrapper } from "./wrapper"
import UserProfile from "../dashboard/user-profile"
import { SearchBar } from "../dashboard/search"
import { Bell } from "lucide-react"
import { TokenProps } from "@/types"
import { TopBarWrapper } from "./topbar-wrapper"

export const TopBar: React.FC<TokenProps> = ({ token }) => {
  return (
    <TopBarWrapper>
      <Wrapper className="flex items-center gap-6 py-3">
        <SearchBar token={token} />
        <div className="flex items-center gap-6">
          <Bell className="size-5 stroke-[1.5]" />
          <UserProfile />
        </div>
      </Wrapper>
    </TopBarWrapper>
  )
}
