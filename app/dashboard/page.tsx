import { auth } from "@clerk/nextjs/server"
import { TopBar } from "@/components/dashboard/top-bar"
import { Container } from "@/components/layout/container"
import ListsProducts, {
  LoadingListProducts,
} from "@/components/dashboard/lists-products"
import {
  FallbackFilterButton,
  FilterButton,
} from "@/components/dashboard/filter-button"
import { Suspense } from "react"

const DashboardPage = async () => {
  const { userId, getToken } = auth()
  const token = await getToken()

  return (
    <main className="min-h-screen w-full">
      <TopBar token={token!} />
      <Container className="pb-20 pt-[72px]">
        <div className="mb-3 flex w-full items-center justify-between">
          <h3 className="font-semibold capitalize">produk kamu</h3>
          <Suspense fallback={<FallbackFilterButton />}>
            <FilterButton />
          </Suspense>
        </div>
        <Suspense fallback={<LoadingListProducts type="fallback" />}>
          <ListsProducts userId={userId!} token={token!} />
        </Suspense>
      </Container>
    </main>
  )
}

export default DashboardPage
