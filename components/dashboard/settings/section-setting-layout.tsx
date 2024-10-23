import { cn } from "@/lib/utils"

interface SectionSettingLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
}

export const SectionSettingLayout: React.FC<SectionSettingLayoutProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <section className={cn("space-y-4", className)}>
      <h1 className="text-lg font-bold capitalize">{title}</h1>
      {children}
    </section>
  )
}
