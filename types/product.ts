import { Product } from "@prisma/client"

export type CreateProductRequest = Omit<
  Product,
  "id" | "createdAt" | "updatedAt"
>
