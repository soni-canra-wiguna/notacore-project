import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

const SectionContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={cn("mb-8 space-y-4", className)} {...props}>
      {children}
    </section>
  )
}

const SectionHeader: React.FC<
  HTMLAttributes<HTMLHeadingElement> & { actionButton?: ReactNode }
> = ({ children, className, actionButton, ...props }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className={cn("text-lg font-bold capitalize", className)} {...props}>
        {children}
      </h1>
      {actionButton}
    </div>
  )
}

export { SectionContent, SectionHeader }
