import { Container } from "@/components/layout/container"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const DashboardSearchPage = () => {
  return (
    <main className="">
      <Container className="pt-4">
        <div className="flex items-center gap-3">
          <div className="relative size-full">
            <Input
              className="h-12 rounded-full border-none bg-secondary pl-11 pr-4 text-base placeholder:capitalize focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              placeholder="cari produk"
            />
            <Search className="absolute left-3 top-3 size-6" />
          </div>
        </div>
      </Container>
    </main>
  )
}

export default DashboardSearchPage
