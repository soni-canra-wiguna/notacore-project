import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

export const MainContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main className={cn("min-h-screen w-full", className)} {...props}>
      {children}
    </main>
  )
}
