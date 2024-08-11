// "use client"

import { Button } from "@/components/ui/button"
import {
  UserButton,
  SignedOut,
  SignInButton,
  useAuth,
  useUser,
  SignedIn,
} from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"

export default function Home() {
  // const user = useUser()
  // const auth = useAuth()
  const auths = auth()
  // console.log(auths.userId)

  return (
    <main className="mx-auto my-20 min-h-screen w-full max-w-7xl">
      <UserButton afterSignOutUrl="/" showName />
      <p>{JSON.stringify(auths)}</p>
      {/* <p>email: {user.user?.emailAddresses[0].emailAddress}</p>
      <p>fullname: {user.user?.fullName}</p>
      <SignedIn>
        {!user.isLoaded ? (
          <p>loading ...</p>
        ) : (
          <div>
            <p className="mb-8">{JSON.stringify(user.user)}</p>
            <div className="my-20">hello world</div>
            <p className="mb-8">{JSON.stringify(auth)}</p>
          </div>
        )}
      </SignedIn> */}

      {/* component yang di wrap signedOut, hanya muncul ketika dalam keadaan sign out/ belum login */}
      <SignedOut>
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </SignedOut>
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
