import { WithChildren } from "@/types"

export default function AuthLayout({ children }: WithChildren) {
  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden">
      {children}
    </div>
  )
}
