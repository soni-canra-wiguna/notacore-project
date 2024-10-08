"use client"

import { useEffect, useState } from "react"

export default function useVisibleNavbar() {
  const [prevScroll, setPrevScroll] = useState<number | null | any>(
    typeof window !== "undefined" ? window.scrollY : null,
  )
  const [visible, setVisible] = useState<boolean>(true)
  const [isBorderVisible, setIsBorderVisible] = useState(false)

  // handle visible navbar
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

  // handle visible border
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setIsBorderVisible(true)
      } else {
        setIsBorderVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return {
    visible,
    isBorderVisible,
  }
}
