import {
  ChartDemo,
  ChartDemo2,
  ChartDemo3,
  ChartDemo4,
  ChartDemo5,
} from "@/components/dashboard/statistic/demo-chart"
import {
  FilterButton,
  FilterStatistic,
} from "@/components/dashboard/statistic/filter"
import Amount, { LoadingAmount } from "@/components/dashboard/statistic/amount"
import { Container } from "@/components/layout/container"
import React, { Suspense } from "react"
import TableRecords from "@/components/dashboard/statistic/table-records"

const StatisticsPage = () => {
  return (
    <main className="min-h-screen w-full">
      <Container className="py-20">
        <section className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold capitalize">
              statistik penjualan
            </h1>
            <Suspense fallback={<FilterButton />}>
              <FilterStatistic />
            </Suspense>
          </div>
          <Suspense fallback={<LoadingAmount />}>
            <Amount />
          </Suspense>
        </section>
        <section className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold capitalize">riwayat transaksi</h1>
          </div>
          <TableRecords />
        </section>
        {/* <ChartDemo />
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
        </Suspense> */}
      </Container>
    </main>
  )
}

export default StatisticsPage
