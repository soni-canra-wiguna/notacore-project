import { Card } from "@/components/ui/card"
import { ChevronsUpDown } from 'lucide-react'
import React from "react"

const TableRecords = () => {
  return (
    <Card className="gradientCard mt-20 aspect-square max-w-[480px] overflow-hidden rounded-xl p-4">
      <div className="h-full w-full overflow-y-auto scrollbar-hide">
        <div className="w-[900px] overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border p-2 capitalize w-14">No</th>
                <th className=" border p-2 capitalize w-64">Nama Produk</th>
                <th className="border p-2 capitalize w-36">harga</th>
                <th className="border p-2 capitalize w-24 flex items-center gap-2 justify-center">
                  jumlah <ChevronsUpDown className="size-3" />
                </th>
                <th className="border p-2  w-40">total harga</th>
                <th className="border p-2 capitalize flex items-center gap-2 justify-center">
                  tanggal <ChevronsUpDown className="size-3" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }, (_, i) => {
                return (
                  <tr key={i} className="selection:bg-transparent">
                    <td className="border p-2 text-center w-14">{i + 1}</td>
                    <td className="max-w-64 border p-2 truncate">
                      Data 1 dan data 2 is real dkdflasksd sdfsd sdkf s
                    </td>
                    <td className="border p-2 text-center w-36">Rp. 100.000</td>
                    <td className="border p-2 w-24 text-center">4</td>
                    <td className="border p-2 w-40 text-center">Rp. 400.000</td>
                    <td className="border p-2 text-center">2024-05-11</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}

export default TableRecords
