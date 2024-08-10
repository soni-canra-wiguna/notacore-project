import { cn } from "@/lib/utils"
import { WithChildren } from "@/types"

interface ContainerProps extends WithChildren {
  className?: string
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10",
        className,
      )}
    >
      {children}
    </section>
  )
}
