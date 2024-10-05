"use client"

import { FileType } from "@/app/api/sale-records/download/[userId]/route"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { Download, FileDown, X } from "lucide-react"

export const DownloadTransactionHistory = () => {
  const { userId } = useAuth()

  async function handleDownload(type: FileType) {
    try {
      const { data } = await axios.get(`/api/sale-records/download/${userId}?fileType=${type}`, {
        responseType: "blob",
      })

      const blob = new Blob([data], {
        type:
          type === "csv"
            ? "text/csv"
            : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sales-record.${type}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.log("[ERROR DOWNLOADING FILE]: ", error)
    }
  }

  return (
    <Drawer open>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Download className="size-4 stroke-[1.5]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between border-b">
          <DrawerTitle className="sr-only">Download</DrawerTitle>
          <DrawerDescription className="sr-only">Download Transaksi Penjualan</DrawerDescription>
          <div className="flex items-center gap-3">
            <h3 className="font-semibold capitalize">Download</h3>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="size-6 stroke-[1.5]" />
              <p className="sr-only">close</p>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="grid w-full grid-cols-2 gap-4 p-4">
          <DownloadButton fileType="csv" onClick={() => handleDownload("csv")} />
          <DownloadButton fileType="xlsx" onClick={() => handleDownload("xlsx")} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

interface DownloadButtonProps {
  fileType: FileType
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ fileType, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="gradientCard flex w-full cursor-pointer items-center gap-2 rounded-xl p-3"
    >
      <FileDown className="size-10 stroke-[1.5] text-main" />
      <div className="">
        <h1 className="text-base font-semibold uppercase leading-none">{fileType}</h1>
        <span className="text-sm text-muted-foreground">sales-record.{fileType}</span>
      </div>
    </Card>
  )
}