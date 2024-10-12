import { CreateProductRequest } from "@/types/product"
import { parse } from "csv-parse/sync"

const fetchWithTimeout = (
  url: string,
  options: any = {},
  timeout: number = 10000,
): Promise<any> => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeout)),
  ])
}

export const handleCsvFile = async (url: string) => {
  try {
    // fetch file from url
    const response = await fetchWithTimeout(url, {}, 15000)
    // const response = await fetch(url)
    const csvText = await response.text()

    // parse csv file
    const records = parse(csvText, {
      columns: (header) => header.map((col: any) => col.toLowerCase()), // Jika CSV memiliki header dan kamu ingin parsing sebagai objek
      skip_empty_lines: true,
      delimiter: ";",
    })

    return records as CreateProductRequest[]
  } catch (error) {
    console.log("[FAILED UPLOAD CSV FILE]", error)
  }
}
