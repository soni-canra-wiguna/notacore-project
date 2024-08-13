import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { WithClerkProvider } from "@/lib/provider"
import { cn } from "@/lib/utils"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "@/components/ui/toaster"

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
  icons: {
    icon: "/notacore.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <WithClerkProvider>
      <html lang="en">
        <body className={plusJakartaSans.className}>
          <NextTopLoader color="#84ff00" height={3} showSpinner={false} />
          {children}
          <Toaster />
        </body>
      </html>
    </WithClerkProvider>
  )
}
