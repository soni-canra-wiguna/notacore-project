import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  product: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url)
  }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
