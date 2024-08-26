import { FilterStatistic } from "@/components/dashboard/statistic/filter"
import { Container } from "@/components/layout/container"
import React, { Suspense } from "react"

const StatisticsPage = () => {
  return (
    <main className="min-h-screen w-full">
      <Container className="py-20">
      <Suspense fallback={"loading"}>
        <FilterStatistic />
      </Suspense>
      </Container>
    </main>
  )
}

export default StatisticsPage
