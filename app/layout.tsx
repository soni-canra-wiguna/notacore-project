import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { WithClerkProvider } from "@/lib/provider"
import { cn } from "@/lib/utils"

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus_jakarta_sans",
})

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
        <body className={cn("w-full min-h-screen", plusJakartaSans.className)}>
          {children}
        </body>
      </html>
    </WithClerkProvider>
  )
}
