"use client"

import React from "react"
import { ChartArea, Home, LucideProps, PlusCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { dateTime } from "@/utils/date-time"

interface NavigationItemProps {
  label: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  path: string
  href: string
}

interface BottomBarItemProps {
  item: NavigationItemProps
  pathname: string
}

export const BottomBarNavigation = () => {
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
    <>
      {navigationItems.map((item) => {
        return <BottomBarItem key={item.label} item={item} pathname={pathname} />
      })}
    </>
  )
}

const BottomBarItem = ({ item, pathname }: BottomBarItemProps) => {
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
}
