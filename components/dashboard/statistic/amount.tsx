"use client"

import { Card } from "@/components/ui/card"
import { formatToIDR } from "@/utils/format-to-idr"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { Badge } from "@/components/ui/badge"
import { FilterStatistic } from "./filter"
import { getSalesRecord } from "@/services/get-sales-record"
import { SalesAndRevenueByCategoryResponse } from "@/types/sale-record"
import { Skeleton } from "@/components/ui/skeleton"

const Amount = () => {
  const { data, isPending, isError } = getSalesRecord()
  const statistic = data?.statistic

  return (
    <section className="mb-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize">Hari ini</h1>
        <FilterStatistic />
      </div>
      {isPending || !statistic ? (
        <LoadingAmount />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
              <span className="text-xs capitalize text-muted-foreground">
                total penjualan
              </span>
              <span className="text-lg font-bold leading-none">
                {statistic?.totalSales}
              </span>
            </Card>
            <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
              <span className="text-xs capitalize text-muted-foreground">
                total pendapatan
              </span>
              <span className="text-lg font-bold leading-none">
                {formatToIDR(statistic?.totalRevenue)}
              </span>
            </Card>
            <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
              <span className="text-xs text-muted-foreground">
                Avg Penjualan per Transaksi
              </span>
              <span className="text-lg font-bold leading-none">
                {statistic?.averageSalePerTransaction}
              </span>
            </Card>
            <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
              <span className="text-xs text-muted-foreground">
                Avg Pendapatan per Transaksi
              </span>
              <span className="text-lg font-bold leading-none">
                {formatToIDR(statistic?.averageRevenuePerTransaction)}
              </span>
            </Card>
          </div>
          <AmountByCategory categories={statistic?.salesAndRevenueByCategory} />
        </>
      )}
    </section>
  )
}

const LoadingAmount = () => {
  return (
    <section className="mb-4 space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
          <span className="text-xs capitalize text-muted-foreground">
            total penjualan
          </span>
          <Skeleton variant="shimmer" className="size-7" />
        </Card>
        <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
          <span className="text-xs capitalize text-muted-foreground">
            total pendapatan
          </span>
          <span className="text-lg font-bold leading-none">
            <Skeleton variant="shimmer" className="h-7 w-20" />
          </span>
        </Card>
        <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
          <span className="text-xs text-muted-foreground">
            Avg Penjualan per Transaksi
          </span>
          <span className="text-lg font-bold leading-none">
            <Skeleton variant="shimmer" className="size-7" />
          </span>
        </Card>
        <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
          <span className="text-xs text-muted-foreground">
            Avg Pendapatan per Transaksi
          </span>
          <span className="text-lg font-bold leading-none">
            <Skeleton variant="shimmer" className="h-7 w-20" />
          </span>
        </Card>
      </div>
      <Card className="gradientCard grid h-[130px] w-full grid-cols-2 overflow-hidden rounded-xl selection:bg-transparent">
        <div className="flex flex-col gap-1 p-4">
          <Skeleton variant="shimmer" className="mb-3 h-5 w-20 rounded-full" />
          <span className="mb-1 text-xs capitalize text-muted-foreground">
            total terjual
          </span>
          <Skeleton variant="shimmer" className="size-7" />
        </div>
        <div className="flex items-center justify-center">
          <Skeleton variant="shimmer" className="h-7 w-40" />
        </div>
      </Card>
    </section>
  )
}

export default Amount

export const AmountByCategory = ({
  categories,
}: {
  categories: SalesAndRevenueByCategoryResponse[] | undefined
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }
  return (
    <div className="mt-6">
      <Carousel
        opts={{ align: "center", loop: true }}
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4000,
          }) as any,
        ]}
      >
        <CarouselContent>
          {categories?.map((category, i) => (
            <CarouselItem key={i}>
              <Card className="gradientCard grid h-[130px] w-full grid-cols-2 overflow-hidden rounded-xl selection:bg-transparent">
                <div className="flex flex-col gap-1 p-4">
                  <Badge variant="secondary" className="mb-3 w-max">
                    {category.label}
                  </Badge>
                  <span className="mb-1 text-xs capitalize text-muted-foreground">
                    total terjual
                  </span>
                  <span className="text-lg font-bold leading-none">
                    {category.quantity}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-lg font-bold leading-none">
                    {formatToIDR(category.totalPrice)}
                  </span>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5">
          {Array.from({ length: count }, (_, i) => {
            return (
              <span
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-[4px] w-6 cursor-pointer rounded-full ${
                  current === i + 1 ? "bg-primary" : "bg-muted-foreground/50"
                }`}
              />
            )
          })}
        </div>
      </Carousel>
    </div>
  )
}
