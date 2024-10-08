"use client"

import { UploadButton, UploadDropzone } from "@/lib/uploadthing"
import { toast } from "./ui/use-toast"

interface FileUploadProps {
  onChange: (url?: string) => void
  value: string
  endpoint: "product"
}

export const FileUpload: React.FC<FileUploadProps> = ({ endpoint, onChange, value }) => {
  if (value) {
    return (
      <div className="relative h-[189px] w-full overflow-hidden rounded-xl border border-input">
        <img src={value} alt="preview image" className="size-full object-cover object-center" />
        <UploadButton
          endpoint={endpoint}
          className="ut-button:bg-primary ut-button:text-background ut-button:shadow-md ut-button:focus-within:ring-primary ut-allowed-content:hidden ut-allowed-content:text-background"
          appearance={{
            container: "absolute bottom-2 right-2",
          }}
          onClientUploadComplete={(res) => {
            if (!res) return
            onChange(res[0].url)
            toast({
              title: "success",
              description: `berhasil mengupdate gambar`,
              // variant: "success",
            })
          }}
          onUploadError={(error: Error) => {
            console.log(error)
            toast({
              title: "failed",
              description: `gagal update gambar`,
              variant: "destructive",
            })
          }}
        />
      </div>
    )
  }

  return (
    <UploadDropzone
      className="ut-allowed-content:text-paragraph !rounded-xl !border-foreground/50 !px-4 !py-6 ut-button:bg-primary ut-button:text-background ut-label:font-medium ut-label:text-primary ut-upload-icon:text-primary/30"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (!res) return
        onChange(res[0].url)
        toast({
          title: "succes uploaded",
        })
      }}
      onUploadError={(error: Error) => {
        toast({
          title: "failed",
          description: `gagal menambahkan gambar`,
          variant: "destructive",
        })
      }}
    />
  )
}
