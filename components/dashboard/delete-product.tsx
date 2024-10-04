import { cn } from "@/lib/utils"
import { TrashIcon } from "lucide-react"
import LoadingButton from "../loading-button"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "../ui/use-toast"
import { DeleteModal } from "../delete-modal"

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
      queryClient.invalidateQueries({ queryKey: ["search_input"] })
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

  const trigger = (
    <div
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-sm capitalize hover:bg-secondary",
      )}
    >
      <TrashIcon className="size-4 stroke-[1.5]" />
      hapus
    </div>
  )

  const action = (
    <LoadingButton
      onClick={() => deleteProduct()}
      disabled={isPending}
      loading={isPending}
      className="capitalize"
      variant="destructive"
    >
      ya, hapus produk
    </LoadingButton>
  )

  return (
    <DeleteModal
      title="Hapus Produk"
      description="Apakah kamu yakin ingin menghapus produk"
      titleProduct={title}
      isOpen={isOpenDialog}
      setIsOpen={setIsOpenDialog}
      trigger={trigger}
      action={action}
    />
  )
}
