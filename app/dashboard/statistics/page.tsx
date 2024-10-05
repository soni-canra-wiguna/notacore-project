import { FilterButton, FilterStatistic } from "@/components/dashboard/statistic/filter"
import Amount, { LoadingAmount } from "@/components/dashboard/statistic/amount"
import { Container } from "@/components/layout/container"
import React, { Suspense } from "react"
import TableRecords from "@/components/dashboard/statistic/table-records"
import { SectionHeader, SectionLayout } from "@/components/section"

const StatisticsPage = () => {
  const actionButtonStatistic = (
    <Suspense fallback={<FilterButton />}>
      <FilterStatistic />
    </Suspense>
  )

  const actionButtonTransaction = <></>

  return (
    <main className="min-h-screen w-full">
      <Container className="py-20">
        <SectionLayout>
          <SectionHeader actionButton={actionButtonStatistic}>statistik penjualan</SectionHeader>
          <Suspense fallback={<LoadingAmount />}>
            <Amount />
          </Suspense>
          <TableRecords />
        </SectionLayout>
        <SectionLayout>
          <SectionHeader actionButton={actionButtonTransaction}>riwayat transaksi</SectionHeader>
          <TableRecords />
        </SectionLayout>
      </Container>
    </main>
  )
}

export default StatisticsPage
