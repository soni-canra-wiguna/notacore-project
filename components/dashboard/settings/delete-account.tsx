"use client"

import LoadingButton from "@/components/loading-button"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { TriangleAlert } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useClerk } from "@clerk/nextjs"

export const DeteleAccount = ({
  userId,
  token,
}: {
  userId: string
  token: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { signOut } = useClerk()

  const {
    mutate: deleteAccount,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userId,
        },
      })

      await signOut()
    },
    onSuccess: () => {
      toast({
        description: "akun telah di hapus",
      })
      setIsOpen(false)
      router.push("/")
    },
    onError: () => {
      toast({
        description: "something went wrong, try again!!",
      })
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          className="border border-destructive bg-destructive/20 capitalize hover:bg-destructive/25"
          variant="destructive"
        >
          <TriangleAlert className="mr-2 size-4" /> Hapus Akun
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Hapus Akun</DialogTitle>
          <DialogDescription>
            Aksi ini akan menghapus akun kamu, termasuk produk dan catatan yang
            telah kamu buat. Apa kamu yakin ingin menghapusnya?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2.5">
          <DialogClose asChild>
            <Button
              onClick={() => setIsOpen(false)}
              className="capitalize"
              variant="outline"
            >
              batal
            </Button>
          </DialogClose>
          <LoadingButton
            onClick={() => deleteAccount()}
            disabled={isPending}
            loading={isPending}
            className="capitalize"
            variant="destructive"
          >
            ya, hapus akun
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
