import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Container } from "@/components/layout/container"
import Image from "next/image"
import FlickeringGrid from "@/components/ui/flickering-grid"
import { Github } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function Home() {
  const { userId } = auth()

  if (userId) redirect("/dashboard")

  return (
    <main className="h-screen w-full overflow-hidden">
      <Container className="relative flex h-full flex-col items-center justify-between overflow-hidden pb-8 pt-48">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="relative mb-6 size-16">
            <Image alt="logo" className="grayscale" src="/notacore.png" fill />
          </div>
          <h1 className="mb-2 text-center text-4xl font-bold uppercase">
            notacore
          </h1>
          <p className="mb-10 text-center text-sm text-muted-foreground">
            Catat hasil penjualanmu dan lihatlah hasilnya!
          </p>
        </div>
        <SignInSignUpButton />

        <SocialMedia />
        <FlickeringGrid
          className="absolute inset-0 -z-20 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={800}
          width={480}
        />
        {/* overlay bottom */}
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-full bg-gradient-to-t from-background" />
      </Container>
    </main>
  )
}

const SocialMedia = () => {
  return (
    <div className="absolute right-8 top-8 flex items-center gap-6">
      <a
        className=""
        href="https://github.com/soni-canra-wiguna"
        target="_blank"
      >
        <Github className="size-6" />
      </a>
      <ThemeSwitcher sizeIcon="6" className="w-max border-none p-0" />
    </div>
  )
}

const SignInSignUpButton = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Link className="w-full" href="/sign-in">
        <Button size="lg" className="w-full rounded-xl capitalize">
          Sign In
        </Button>
      </Link>
      <Link className="w-full" href="/sign-up">
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-xl capitalize"
        >
          Daftar
        </Button>
      </Link>
    </div>
  )
}
