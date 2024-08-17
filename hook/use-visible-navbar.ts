"use client"

import { useEffect, useState } from "react"

export default function useVisibleNavbar() {
  const [prevScroll, setPrevScroll] = useState<number | null | any>(
    typeof window !== "undefined" ? window.scrollY : null,
  )
  const [visible, setVisible] = useState<boolean>(true)

  const handleScroll = () => {
    const currentScroll = window?.scrollY
    if (prevScroll > currentScroll) {
      setVisible(true)
    } else {
      setVisible(false)
    }
    setPrevScroll(currentScroll)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScroll])

  return {
    visible,
  }
}
