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
} from "date-fns"

export const FilterStatistic = () => {
  const [from, setFrom] = useQueryState("from")
  const [to, setTo] = useQueryState("to")
  const date = new Date(`2024-07-12T00:00:00.000Z`)
  const formattedDate = format(date, "yyyy-MM-dd")

  const today = startOfDay(new Date())
  const endToday = endOfDay(new Date())
  const formattedStartToday = format(today, "yyyy-MM-dd")
  const formattedEndToday = format(endToday, "yyyy-MM-dd")

  const week = startOfWeek(new Date())
  const endWeek = endOfWeek(new Date())
  const formattedStartWeek = format(week, "yyyy-MM-dd")
  const formattedEndWeek = format(endWeek, "yyyy-MM-dd")

  const handleToday = () => {
    setFrom(formattedStartToday)
    setTo(formattedEndToday)
  }

  const handleSetWeek = () => {
    setFrom(formattedStartWeek)
    setTo(formattedEndWeek)
  }

  /* buat tanggal nya itu harus di reverse ke sebelumnya bukan mendatang
  misal di minggu, bukan minggu depan tapi minggu lalu
  */

  return (
    <div className="flex w-full items-center gap-4">
      <Button onClick={() => setFrom(formattedDate)}>from</Button>
      <Button onClick={() => setTo(formattedDate)}>to</Button>
      <Button onClick={handleToday}>today</Button>
      <Button onClick={handleSetWeek}>week</Button>
    </div>
  )
}
