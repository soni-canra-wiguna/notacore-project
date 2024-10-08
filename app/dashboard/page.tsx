import { auth } from "@clerk/nextjs/server"
import { Wrapper } from "@/components/layout/wrapper"
import ListsProducts, { LoadingListProducts } from "@/components/dashboard/lists-products"
import { FallbackFilterButton, FilterProducts } from "@/components/dashboard/filter-products"
import { Suspense } from "react"
import { SalesRecordView } from "@/components/dashboard/sales-record-view"
import { SectionHeader, SectionContent } from "@/components/section"
import { MainContainer } from "@/components/layout/main-container"

const DashboardPage = async () => {
  const { userId, getToken } = auth()
  const token = await getToken()

  const actionButtonProduct = (
    <Suspense fallback={<FallbackFilterButton />}>
      <FilterProducts />
    </Suspense>
  )

  return (
    <MainContainer>
      <Wrapper className="py-20">
        <SectionContent>
          <SectionHeader actionButton={actionButtonProduct}>produk kamu</SectionHeader>
          <Suspense fallback={<LoadingListProducts type="fallback" />}>
            <ListsProducts userId={userId!} token={token!} />
          </Suspense>
        </SectionContent>
      </Wrapper>
      <SalesRecordView token={token!} /> {/* checkout button ~ absolute position */}
    </MainContainer>
  )
}

export default DashboardPage
