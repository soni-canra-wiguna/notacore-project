"use client"

import { Button } from "@/components/ui/button"
import { useQueryState } from "nuqs"
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addWeeks,
  subDays,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns"
import { useState } from "react"
import { getCategoryProducts } from "@/services/get-category-products"

type TimeProps =
  | "today"
  | "oneWeekAgo"
  | "oneMonthAgo"
  | "threeMonthsAgo"
  | "sixMonthsAgo"
  | "oneYearAgo"

type SortByProps = "low" | "high"

export const FilterStatistic = () => {
  const [from, setFrom] = useQueryState("from")
  const [to, setTo] = useQueryState("to")
  const [sortBy, setSortBy] = useQueryState("sortBy")
  const [category, setCategory] = useQueryState("category")

  const [hasFrom, setHasFrom] = useState("")
  const [hasTo, setHasTo] = useState("")
  const [hasSortBy, setHasSortBy] = useState("")
  const [hasCategory, setHasCategory] = useState("")

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
      case "low":
        setHasSortBy("quantity-low")
        break
      case "high":
        setHasSortBy("quantity-high")
        break
      default:
        setHasSortBy("quantity-high")
    }
  }

  const handleSelectFilter = () => {
    // date
    setFrom(hasFrom ? hasFrom : null)
    setTo(hasTo ? hasTo : null)
    // category
    setCategory(hasCategory ? hasCategory : null)
    // sortBy
    setSortBy(hasSortBy ? hasSortBy : null)
  }

  const resetSearchParams = () => {
    setFrom(null)
    setTo(null)
    setSortBy(null)
    setCategory(null)
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">tanggal</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={hasFrom === today ? "default" : "secondary"}
            onClick={() => handleSelectTime("today")}
          >
            today
          </Button>
          <Button
            variant={hasFrom === oneWeekAgo ? "default" : "secondary"}
            onClick={() => handleSelectTime("oneWeekAgo")}
          >
            week
          </Button>
          <Button
            variant={hasFrom === oneMonthAgo ? "default" : "secondary"}
            onClick={() => handleSelectTime("oneMonthAgo")}
          >
            1 month
          </Button>
          <Button
            variant={hasFrom === threeMonthsAgo ? "default" : "secondary"}
            onClick={() => handleSelectTime("threeMonthsAgo")}
          >
            3 months
          </Button>
          <Button
            variant={hasFrom === sixMonthsAgo ? "default" : "secondary"}
            onClick={() => handleSelectTime("sixMonthsAgo")}
          >
            6 months
          </Button>
          <Button
            variant={hasFrom === oneYearAgo ? "default" : "secondary"}
            onClick={() => handleSelectTime("oneYearAgo")}
          >
            1 year
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">urutkan</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={hasSortBy === "quantity-high" ? "default" : "secondary"}
            onClick={() => handleSelectSortBy("high")}
          >
            Jumlah : Terbanyak
          </Button>
          <Button
            variant={hasSortBy === "quantity-low" ? "default" : "secondary"}
            onClick={() => handleSelectSortBy("low")}
          >
            Jumlah : Tersedikit
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">kategori</h1>
        <div className="flex flex-wrap items-center gap-2">
          {isPending
            ? "loading categories"
            : categories?.map(({ category }, i) => (
                <Button
                  variant={hasCategory === "category" ? "default" : "secondary"}
                  key={i}
                  onClick={() => setHasCategory(category)}
                >
                  {category}
                </Button>
              ))}
        </div>
      </div>
      <div className="my-5 flex items-center justify-center gap-4">
        <Button onClick={resetSearchParams} variant="outline">
          batalkan
        </Button>
        <Button onClick={handleSelectFilter}>terapkan</Button>
      </div>
    </div>
  )
}
