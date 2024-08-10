import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { WithClerkProvider } from "@/lib/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "nota core",
  description:
    "catat hasil penjulanmu, dan lihat hasil analisanya. mari bertumbuh dan berkembang dengan nota core",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <WithClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </WithClerkProvider>
  )
}
