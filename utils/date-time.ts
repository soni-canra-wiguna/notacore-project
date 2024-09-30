import { id } from "date-fns/locale"
import { format, subWeeks, subMonths, subYears } from "date-fns"

export function dateTime() {
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

  return {
    today,
    formatToday,
    oneWeekAgo,
    oneMonthAgo,
    threeMonthsAgo,
    sixMonthsAgo,
    oneYearAgo,
  }
}
