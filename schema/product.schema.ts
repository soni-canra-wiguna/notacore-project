import * as z from "zod"

export class ProductValidation {
  static readonly CREATE: z.ZodType = z.object({
    userId: z.string().min(1, {
      message: "userId is required",
    }),
    image: z.string().min(1, {
      message: "image product is required",
    }),
    title: z.string().min(1, {
      message: "title product is required",
    }),
    description: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().positive(),
  })
}
