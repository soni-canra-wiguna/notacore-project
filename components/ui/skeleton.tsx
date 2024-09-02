import { cn } from "@/lib/utils"

function Skeleton({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "shimmer" | "default"
}) {
  if (variant === "shimmer") {
    return (
      <div
        className={cn("shimmer rounded-md bg-secondary", className)}
        {...props}
      />
    )
  }

  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
