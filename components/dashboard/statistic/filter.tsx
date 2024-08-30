"use client"

import { Button } from "@/components/ui/button"
import { useQueryState } from "nuqs"
import { format, subWeeks, subMonths, subYears } from "date-fns"
import { useState } from "react"
import { getCategoryProducts } from "@/services/get-category-products"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Filter } from 'lucide-react';

type TimeProps =
  | "today"
  | "oneWeekAgo"
  | "oneMonthAgo"
  | "threeMonthsAgo"
  | "sixMonthsAgo"
  | "oneYearAgo"

type SortByProps = "quantity-low" | "quantity-high"

interface ListTimeProps {
  title: string
  label: TimeProps
  value: string
}

interface ListQuantityProps {
  title: string
  label: SortByProps
  value: string
}

export const FilterStatistic = () => {
  const [from, setFrom] = useQueryState("from")
  const [to, setTo] = useQueryState("to")
  const [sortBy, setSortBy] = useQueryState("sortBy")
  const [category, setCategory] = useQueryState("category")

  const [hasFrom, setHasFrom] = useState("")
  const [hasTo, setHasTo] = useState("")
  const [hasSortBy, setHasSortBy] = useState("")
  const [hasCategory, setHasCategory] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const { data: categories, isPending, isError } = getCategoryProducts()

  const today = format(new Date(), "yyyy-MM-dd")
  const oneWeekAgo = format(subWeeks(today, 1), "yyyy-MM-dd")
  const oneMonthAgo = format(subMonths(today, 1), "yyyy-MM-dd")
  const threeMonthsAgo = format(subMonths(today, 3), "yyyy-MM-dd")
  const sixMonthsAgo = format(subMonths(today, 6), "yyyy-MM-dd")
  const oneYearAgo = format(subYears(today, 1), "yyyy-MM-dd")

  const handleSelectTime = (time: TimeProps) => {
    switch (time) {
      case "today":
        setHasFrom(today)
        setHasTo(today)
        break
      case "oneWeekAgo":
        setHasFrom(oneWeekAgo)
        setHasTo(today)
        break
      case "oneMonthAgo":
        setHasFrom(oneMonthAgo)
        setHasTo(today)
        break
      case "threeMonthsAgo":
        setHasFrom(threeMonthsAgo)
        setHasTo(today)
        break
      case "sixMonthsAgo":
        setHasFrom(sixMonthsAgo)
        setHasTo(today)
        break
      case "oneYearAgo":
        setHasFrom(oneYearAgo)
        setHasTo(today)
        break
      default:
        setHasFrom(today)
        setHasTo(today)
    }
  }

  const handleSelectSortBy = (sortBy: SortByProps) => {
    switch (sortBy) {
      case "quantity-low":
        setHasSortBy("quantity-low")
        break
      case "quantity-high":
        setHasSortBy("quantity-high")
        break
      default:
        setHasSortBy("quantity-high")
    }
  }

  const handleSelectFilter = () => {
    setFrom(hasFrom ? hasFrom : null)
    setTo(hasTo ? hasTo : null)
    setCategory(hasCategory ? hasCategory : null)
    setSortBy(hasSortBy ? hasSortBy : null)
    setIsOpen(!isOpen)
  }

  const resetSearchParams = () => {
    setFrom(null)
    setTo(null)
    setSortBy(null)
    setCategory(null)
    setIsOpen(!isOpen)
  }

  const list = {
    times: [
      {
        title: "hari ini",
        label: "today",
        value: today,
      },
      {
        title: "minggu lalu",
        label: "oneWeekAgo",
        value: oneWeekAgo,
      },
      {
        title: "bulan lalu",
        label: "oneMonthAgo",
        value: oneMonthAgo,
      },
      {
        title: "3 bulan lalu",
        label: "threeMonthsAgo",
        value: threeMonthsAgo,
      },
      {
        title: "6 bulan lalu",
        label: "sixMonthsAgo",
        value: sixMonthsAgo,
      },
      {
        title: "tahun lalu",
        label: "oneYearAgo",
        value: oneYearAgo,
      },
    ] as ListTimeProps[],
    quantities: [
      {
        title: "Jumlah Terbanyak",
        label: "quantity-high",
        value: "quantity-high",
      },
      {
        title: "jumlah tersedikit",
        label: "quantity-low",
        value: "quantity-low",
      },
    ] as ListQuantityProps[],
  }

  const LoadingCategories = () => {
    const loading = Array.from({ length: 3 }, (_, i) => (
      <Skeleton key={i} className="rounded-full px-3 py-2" />
    ))

    return <>{loading}</>
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
      <Button variant="outline" size="icon" className="size-9">
          <Filter className="size-4 stroke-[1.5]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between border-b">
          <DrawerTitle className="sr-only">filter catatan</DrawerTitle>
          <DrawerDescription className="sr-only">
            kamu bisa filter catatan dengan berbagai kombinasi
          </DrawerDescription>
          <div className="flex items-center gap-3">
            <h3 className="font-semibold capitalize">filter</h3>
          </div>
          <DrawerClose asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className=""
              variant="ghost"
              size="icon"
            >
              <X className="size-6 stroke-[1.5]" />
              <p className="sr-only">close</p>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="scrollbar-hide h-full max-h-[450px] w-full overflow-y-auto p-4">
          <div className="space-y-3">
            <h3 className="text-sm font-bold capitalize">Tanggal</h3>
            <div className="flex flex-wrap items-center gap-2.5">
              {list.times.map((time, i) => (
                <Button
                  key={i}
                  onClick={() => handleSelectTime(time.label)}
                  variant={hasFrom === time.value ? "default" : "outline"}
                  size="xs"
                  className="capitalize"
                >
                  {time.title}
                </Button>
              ))}
            </div>
          </div>
          <Separator className="my-5" />
          <div className="space-y-3">
            <h3 className="text-sm font-bold capitalize">jumlah terjual</h3>
            <div className="flex flex-wrap items-center gap-2.5">
              {list.quantities.map((qty, i) => (
                <Button
                  key={i}
                  variant={hasSortBy === qty.value ? "default" : "outline"}
                  onClick={() => handleSelectSortBy(qty.label)}
                  size="xs"
                  className="capitalize"
                >
                  {qty.title}
                </Button>
              ))}
            </div>
          </div>
          <Separator className="my-5" />
          <div className="space-y-3">
            <h3 className="text-sm font-bold capitalize">kategori</h3>
            <div className="flex flex-wrap items-center gap-2.5">
              {isPending ? (
                <LoadingCategories />
              ) : (
                categories?.map(({ category }, i) => (
                  <Button
                    variant={hasCategory === category ? "default" : "outline"}
                    key={i}
                    onClick={() => setHasCategory(category)}
                    size="xs"
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))
              )}
            </div>
          </div>
        </div>
        <DrawerFooter className="w-full flex-row border-t">
          <Button
            className="w-full rounded-full"
            size="lg"
            onClick={resetSearchParams}
            variant="secondary"
          >
            batalkan
          </Button>
          <Button
            className="w-full rounded-full"
            size="lg"
            onClick={handleSelectFilter}
          >
            terapkan
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
