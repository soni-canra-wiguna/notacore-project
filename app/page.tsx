"use client"

import { Button } from "@/components/ui/button"
import {
  UserButton,
  SignedOut,
  SignInButton,
  useAuth,
  useUser,
  SignedIn,
} from "@clerk/nextjs"
import Link from "next/link"

export default function Home() {
  const {} = useUser()
  return (
    <main className="flex w-full h-screen flex-col items-center justify-center overflow-hidden">
      <h1 className="mb-6 text-3xl font-bold capitalize">Welcome!</h1>
      <SignedIn>
        <div className="flex items-center gap-4">
          <UserButton />
          <Link href="/dashboard">dashboard</Link>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex items-center gap-4">
          <Link href="/sign-up">
            <Button className="capitalize">sign up</Button>
          </Link>
          <Link href="/sign-in">
            <Button className="capitalize">sign in</Button>
          </Link>
        </div>
      </SignedOut>
    </main>
  )
}
