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

const Amount = () => {
  return (
    <section className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize">Hari ini</h1>
        <FilterStatistic />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
          <span className="text-xs capitalize text-muted-foreground">
            total penjualan
          </span>
          <span className="text-lg font-bold leading-none">30</span>
        </Card>
        <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
          <span className="text-xs capitalize text-muted-foreground">
            total pendapatan
          </span>
          <span className="text-lg font-bold leading-none">
            {formatToIDR(300000)}
          </span>
        </Card>
        <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
          <span className="text-xs text-muted-foreground">
            Avg Penjualan per Transaksi
          </span>
          <span className="text-lg font-bold leading-none">4</span>
        </Card>
        <Card className="gradientCard flex flex-col gap-1 rounded-xl p-4">
          <span className="text-xs text-muted-foreground">
            Avg Pendapatan per Transaksi
          </span>
          <span className="text-lg font-bold leading-none">
            {formatToIDR(40000)}
          </span>
        </Card>
      </div>
      <AmountByCategory />
    </section>
  )
}

export default Amount

const carouselItems = [
  {
    category: "makanan",
    quantity: 5,
    price: 80000,
  },
  {
    category: "minuman",
    quantity: 3,
    price: 30000,
  },
  {
    category: "bakso",
    quantity: 12,
    price: 120000,
  },
]

export const AmountByCategory = () => {
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
          {carouselItems.map((item, i) => (
            <CarouselItem key={i}>
              <Card className="gradientCard grid h-[130px] w-full grid-cols-2 overflow-hidden rounded-xl selection:bg-transparent">
                <div className="flex flex-col gap-1 p-4">
                  <Badge variant="secondary" className="mb-3 w-max">
                    {item.category}
                  </Badge>
                  <span className="mb-1 text-xs capitalize text-muted-foreground">
                    total terjual
                  </span>
                  <span className="text-lg font-bold leading-none">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-lg font-bold leading-none">
                    {formatToIDR(item.price)}
                  </span>
                </div>
              </Card>
              {/* <Card className="flex h-[130px] w-full flex-col gap-1 overflow-hidden rounded-xl bg-gradient-to-bl from-secondary p-4">
                <Badge variant="secondary" className="mb-3 w-max">
                  {item.category}
                </Badge>
                <span className="mb-1 text-xs capitalize text-muted-foreground">
                  total terjual {item.quantity} buah
                </span>
                <span className="text-lg font-bold leading-none">
                  {formatToIDR(item.price)}
                </span>
              </Card> */}
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
