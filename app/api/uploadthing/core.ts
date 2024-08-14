import { auth } from "@clerk/nextjs/server"
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  product: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const user = auth()
      if (!user || !user.userId) throw new Error("Unauthorized")
      return { userId: user.userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
