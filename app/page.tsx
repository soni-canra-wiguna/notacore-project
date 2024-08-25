import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Container } from "@/components/layout/container"
import Image from "next/image"

export default function Home() {
  const { userId } = auth()

  if (userId) redirect("/dashboard")

  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-y-hidden">
      {/* <div className="absolute flex items-center justify-center">social media here(posisi di pojok kanan atas)</div> */}
      <Container className="z-20">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="relative mb-6 size-16">
            <Image alt="logo" className="graysclae" src="/notacore.png" fill />
          </div>
          <h1 className="mb-1 text-center text-4xl font-bold uppercase">
            notacore
          </h1>
          <p className="mb-10 text-center text-primary">
            catat hasil penjualanmu dan lihat hasilnya!
          </p>
          <div className="flex w-full flex-col gap-4">
            <Link className="w-full" href="/sign-in">
              <Button className="w-full capitalize">Sign In</Button>
            </Link>
            <Link className="w-full" href="/sign-up">
              <Button variant="outline" className="w-full capitalize">
                Daftar
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
