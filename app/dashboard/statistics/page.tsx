import {
  ChartDemo,
  ChartDemo2,
  ChartDemo3,
  ChartDemo4,
  ChartDemo5,
} from "@/components/dashboard/statistic/demo-chart"
import { FilterStatistic } from "@/components/dashboard/statistic/filter"
import Amount from "@/components/dashboard/statistic/amount"
import { Container } from "@/components/layout/container"
import React, { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import TableRecords from "@/components/dashboard/statistic/table-records"

const StatisticsPage = () => {
  return (
    <main className="min-h-screen w-full">
      <Container className="py-20">
        <Amount />
        <TableRecords />
        <ChartDemo />
        <Separator className="my-5" />
        <ChartDemo2 />
        <Separator className="my-5" />
        <ChartDemo3 />
        <Separator className="my-5" />
        <ChartDemo4 />
        <Separator className="my-5" />
        <ChartDemo5 />
        <Suspense fallback={"loading"}>
          <FilterStatistic />
        </Suspense>
      </Container>
    </main>
  )
}

export default StatisticsPage
