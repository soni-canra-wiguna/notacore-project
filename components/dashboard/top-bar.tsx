import Image from "next/image"
import { Container } from "../layout/container"
import logo from "@/public/notacore.png"
import { SearchIcon, UserCircle2Icon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export const TopBar = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 h-max w-full bg-background">
      <Container className="flex items-center gap-6 py-3">
        {/* <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" className="w-6" />
          <h4 className="text-base font-semibold capitalize">nota core</h4>
        </div> */}
        <Input
          className="pllaceholder:text-sm h-8 rounded-full border-none bg-secondary px-4 text-sm placeholder:capitalize focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          placeholder="cari produk"
        />
        <div className="flex items-center gap-2">
          {/* <Button className="size-10 text-inherit" variant="ghost" size="icon">
            <SearchIcon className="size-5 stroke-[1.5] text-inherit" />
          </Button> */}
          {/* <Button className="size-10 text-inherit" variant="ghost" size="icon"> */}
          <UserCircle2Icon className="size-6 cursor-pointer stroke-[1.5] text-inherit" />
          {/* </Button> */}
        </div>
      </Container>
    </nav>
  )
}
