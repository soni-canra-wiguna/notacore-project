"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Download, Loader2 } from "lucide-react"

export const DownloadTransactionHistory = () => {
  const { userId } = useAuth()

  // fetch data
  const fetchCSVData = async () => {
    const { data } = await axios.get(`/api/sale-records/download/${userId}`, {
      responseType: "text",
    })
    return data
  }

  const {
    data: csv,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["downloadProducts"],
    queryFn: fetchCSVData,
  })

  async function handleDownload() {
    try {
      await refetch() // Manually trigger fetching when button is clicked
      if (!csv) return

      // Trigger download after data is fetched
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "sales-record.csv"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.log("[ERROR DOWNLOADING FILE]: ", error)
    }
  }

  return (
    <Button
      onClick={() => handleDownload()}
      disabled={isPending}
      variant="outline"
      size="icon"
      className="h-9 w-fit gap-2 p-2"
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin stroke-[1.5]" />
      ) : (
        <Download className="size-4 stroke-[1.5]" />
      )}
      <span className="capitalize">download</span>
    </Button>
  )
}
