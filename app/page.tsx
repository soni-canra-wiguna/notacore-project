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
  const user = useUser()
  const auth = useAuth()

  console.log(user.user?.emailAddresses[0].emailAddress)

  return (
    <main className="w-full min-h-screen max-w-7xl mx-auto my-20">
      <UserButton afterSignOutUrl="/" />

      <SignedIn>
        <div>
          <p className="mb-8">{JSON.stringify(user.user)}</p>
          <div className="my-20">hello world</div>
          <p className="mb-8">{JSON.stringify(auth)}</p>
        </div>
      </SignedIn>

      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
      {/* <SignedOut>
        <SignInButton>
          <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
            Sign In
          </button>
        </SignInButton>
      </SignedOut> */}
    </main>
  )
}
