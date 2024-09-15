"use client"

import React from "react"
import { ChartArea, Home, PlusCircle } from "lucide-react"
import { Container } from "../layout/container"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { dateTime } from "@/utils/date-time"

export const BottomBar = () => {
  const pathname = usePathname()
  const { formatToday } = dateTime()

  const navigationItems = [
    {
      label: "beranda",
      icon: Home,
      path: "/dashboard",
      href: "/dashboard",
    },
    {
      label: "tambah",
      icon: PlusCircle,
      path: "/dashboard/create-product",
      href: "/dashboard/create-product",
    },
    {
      label: "statistik",
      icon: ChartArea,
      path: `/dashboard/statistics`,
      href: `/dashboard/statistics?from=${formatToday.format1}&to=${formatToday.format1}`,
    },
  ]

  return (
    <header className="fixed bottom-0 left-0 z-50 w-full border-t bg-background">
      <Container className="flex h-full items-center justify-between px-16 py-2">
        {navigationItems.map((item) => {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1.5",
                pathname === item.path && "text-main hover:text-main",
              )}
            >
              <item.icon className="size-5 stroke-[1.5]" />
              <span className="text-xs capitalize">{item.label}</span>
            </Link>
          )
        })}
      </Container>
    </header>
  )
}
