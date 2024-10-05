import React, { Suspense } from "react"
import { FilterButton, FilterStatistic } from "@/components/dashboard/statistic/filter"
import Amount, { LoadingAmount } from "@/components/dashboard/statistic/amount"
import { Container } from "@/components/layout/container"
import TableRecords from "@/components/dashboard/statistic/table-records"
import { SectionHeader, SectionLayout } from "@/components/section"
import { DownloadTransactionHistory } from "@/components/dashboard/statistic/download-transaction-history"

const StatisticsPage = () => {
  const actionButtonStatistic = (
    <Suspense fallback={<FilterButton />}>
      <FilterStatistic />
    </Suspense>
  )

  return (
    <main className="min-h-screen w-full">
      <Container className="py-20">
        <SectionLayout>
          <SectionHeader actionButton={actionButtonStatistic}>statistik penjualan</SectionHeader>
          <Suspense fallback={<LoadingAmount />}>
            <Amount />
          </Suspense>
        </SectionLayout>
        <SectionLayout>
          <SectionHeader actionButton={<DownloadTransactionHistory />}>
            riwayat transaksi
          </SectionHeader>
          <TableRecords />
        </SectionLayout>
      </Container>
    </main>
  )
}

export default StatisticsPage
