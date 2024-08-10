import {
  UserButton,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs"
import Link from "next/link"

export default function Home() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <UserButton afterSignOutUrl="/" />
      {/* <SignedIn>
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
        >
          Dashboard
        </Link>
      </SignedIn> */}
      <SignedOut>
        <SignInButton>
          <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </main>
  )
}
