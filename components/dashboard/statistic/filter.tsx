"use client"

import { Button } from "@/components/ui/button"
import { useQueryState } from "nuqs"
import { format, subWeeks, subMonths, subYears } from "date-fns"
import { useState } from "react"
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
import { Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { id } from "date-fns/locale"
import { Separator } from "@/components/ui/separator"

type TimeProps =
  | "today"
  | "oneWeekAgo"
  | "oneMonthAgo"
  | "threeMonthsAgo"
  | "sixMonthsAgo"
  | "oneYearAgo"

interface ListTimeProps {
  title: string
  description: string
  onClick: () => void
  active: boolean
}

export const FilterStatistic = () => {
  const [from, setFrom] = useQueryState("from")
  const [to, setTo] = useQueryState("to")

  const [hasFrom, setHasFrom] = useState("")
  const [hasTo, setHasTo] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const today = new Date()
  const formatToday = {
    format1: format(today, "yyyy-MM-dd"),
    format2: format(today, "EEE, d MMM yyyy", { locale: id }),
  }
  const oneWeekAgo = {
    format1: format(subWeeks(today, 1), "yyyy-MM-dd"),
    format2: format(subWeeks(today, 1), "EEE, d MMM yyyy", { locale: id }),
  }
  const oneMonthAgo = {
    format1: format(subMonths(today, 1), "yyyy-MM-dd"),
    format2: format(subMonths(today, 1), "EEE, d MMM yyyy", { locale: id }),
  }
  const threeMonthsAgo = {
    format1: format(subMonths(today, 3), "yyyy-MM-dd"),
    format2: format(subMonths(today, 3), "EEE, d MMM yyyy", { locale: id }),
  }
  const sixMonthsAgo = {
    format1: format(subMonths(today, 6), "yyyy-MM-dd"),
    format2: format(subMonths(today, 6), "EEE, d MMM yyyy", { locale: id }),
  }
  const oneYearAgo = {
    format1: format(subYears(today, 1), "yyyy-MM-dd"),
    format2: format(subYears(today, 1), "EEE, d MMM yyyy", { locale: id }),
  }

  const handleSelectTime = (time: TimeProps) => {
    switch (time) {
      case "today":
        setHasFrom(formatToday.format1)
        setHasTo(formatToday.format1)
        break
      case "oneWeekAgo":
        setHasFrom(oneWeekAgo.format1)
        setHasTo(formatToday.format1)
        break
      case "oneMonthAgo":
        setHasFrom(oneMonthAgo.format1)
        setHasTo(formatToday.format1)
        break
      case "threeMonthsAgo":
        setHasFrom(threeMonthsAgo.format1)
        setHasTo(formatToday.format1)
        break
      case "sixMonthsAgo":
        setHasFrom(sixMonthsAgo.format1)
        setHasTo(formatToday.format1)
        break
      case "oneYearAgo":
        setHasFrom(oneYearAgo.format1)
        setHasTo(formatToday.format1)
        break
      default:
        setHasFrom(formatToday.format1)
        setHasTo(formatToday.format1)
    }
  }

  const handleSelectFilter = () => {
    setFrom(hasFrom ? hasFrom : null)
    setTo(hasTo ? hasTo : null)
    setIsOpen(!isOpen)
  }

  const resetSearchParams = () => {
    setFrom(null)
    setTo(null)
    setHasFrom("")
    setIsOpen(!isOpen)
  }

  const list = {
    times: [
      {
        title: "hari ini",
        description: `${formatToday.format2}`,
        onClick: () => handleSelectTime("today"),
        active: hasFrom === formatToday.format1,
      },
      {
        title: "1 minggu terakhir",
        description: `${oneWeekAgo.format2} - ${formatToday.format2}`,
        onClick: () => handleSelectTime("oneWeekAgo"),
        active: hasFrom === oneWeekAgo.format1,
      },
      {
        title: "1 bulan terakhir",
        description: `${oneMonthAgo.format2} - ${formatToday.format2}`,
        onClick: () => handleSelectTime("oneMonthAgo"),
        active: hasFrom === oneMonthAgo.format1,
      },
      {
        title: "3 bulan terakhir",
        description: `${threeMonthsAgo.format2} - ${formatToday.format2}`,
        onClick: () => handleSelectTime("threeMonthsAgo"),
        active: hasFrom === threeMonthsAgo.format1,
      },
      {
        title: "6 bulan terakhir",
        description: `${sixMonthsAgo.format2} - ${formatToday.format2}`,
        onClick: () => handleSelectTime("sixMonthsAgo"),
        active: hasFrom === sixMonthsAgo.format1,
      },
      {
        title: "1 tahun terakhir",
        description: `${oneYearAgo.format2} - ${formatToday.format2}`,
        onClick: () => handleSelectTime("oneYearAgo"),
        active: hasFrom === oneYearAgo.format1,
      },
    ] as ListTimeProps[],
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
              variant="ghost"
              size="icon"
            >
              <X className="size-6 stroke-[1.5]" />
              <p className="sr-only">close</p>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="scrollbar-hide h-full max-h-[450px] w-full overflow-y-auto p-4">
          {list.times.map((time, i) => (
            <FilterItem
              key={i}
              title={time.title}
              description={time.description}
              onClick={time.onClick}
              active={time.active}
              index={i}
            />
          ))}
        </div>
        <DrawerFooter className="w-full flex-row border-t">
          <Button
            className="w-full rounded-xl capitalize"
            size="lg"
            onClick={resetSearchParams}
            variant="secondary"
          >
            batalkan
          </Button>
          <Button
            className="w-full rounded-xl capitalize"
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

interface FilterItemProps extends ListTimeProps {
  index: number | undefined
}

const FilterItem = ({
  title,
  description,
  active,
  onClick,
  index,
}: FilterItemProps) => {
  return (
    <>
      <div
        className={"justfiy-between flex w-full items-center py-4"}
        onClick={onClick}
      >
        <div className="flex flex-1 flex-col gap-0.5">
          <h4 className="font-semibold capitalize">{title}</h4>
          <p className="text-xs capitalize text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="">
          <div
            className={cn(
              "flex size-5 items-center justify-center rounded-full border-2 border-primary",
              active && "border-main",
            )}
          >
            {active && <span className="size-3 rounded-full bg-main" />}
          </div>
        </div>
      </div>
      {index !== 5 && <Separator />}
    </>
  )
}
