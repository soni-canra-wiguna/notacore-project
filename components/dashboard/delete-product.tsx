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
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TrashIcon } from "lucide-react"
import LoadingButton from "../loading-button"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "../ui/use-toast"

interface DeleteProductProps {
  setIsOpen: (isOpen: boolean) => void
  id: string
  userId: string
  token: string
  title: string
}

export const DeleteProduct = ({
  setIsOpen,
  id,
  userId,
  token,
  title,
}: DeleteProductProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const queryClient = useQueryClient()

  const {
    mutate: deleteProduct,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userId,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists_products"] })
      toast({
        description: "produk telah di hapus",
        // variant: "destructive",
      })
      setIsOpenDialog(!isOpenDialog)
      setIsOpen(false)
    },
    onError: () => {
      toast({
        description: "something went wrong, try again!!",
      })
    },
  })

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "relative flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-sm capitalize hover:bg-secondary",
          )}
        >
          <TrashIcon className="size-4 stroke-[1.5]" />
          hapus
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Hapus Produk</DialogTitle>
          <DialogDescription>
            {" "}
            Apakah kamu yakin ingin menghapus produk{" "}
            <span className="font-semibold">{title}</span> ?
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
            onClick={() => deleteProduct()}
            disabled={isPending}
            loading={isPending}
            className="capitalize"
            variant="destructive"
          >
            ya, hapus produk
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
