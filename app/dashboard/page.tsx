import { auth } from "@clerk/nextjs/server"
import { TopBar } from "@/components/dashboard/top-bar"
import { Container } from "@/components/layout/container"
import ListsProducts from "@/components/dashboard/lists-products"
import { FilterButton } from "@/components/dashboard/filter-button"
import { Suspense } from "react"

const DashboardPage = async () => {
  const { userId, getToken } = auth()
  const token = await getToken()

  return (
    <main className="min-h-screen w-full">
      <TopBar />
      <Container className="pb-20 pt-[72px]">
        <div className="mb-3 flex w-full items-center justify-between">
          <h3 className="font-semibold capitalize">produk kamu</h3>
          {/* fallback isinya loading component biar bagus */}
          <Suspense fallback={"loading"}>
            <FilterButton />
          </Suspense>
        </div>
        <Suspense fallback={"loading"}>
          <ListsProducts userId={userId!} token={token!} />
        </Suspense>
      </Container>
    </main>
  )
}

export default DashboardPage
