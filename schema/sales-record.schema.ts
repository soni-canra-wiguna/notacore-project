import * as z from "zod"

export class SalesRecordValidation {
  static readonly CREATE = z.object({
    userId: z.string(),
    title: z.string(),
    image: z.string(),
    category: z.string(),
    price: z.coerce.number().positive(),
    totalPrice: z.coerce.number().positive(),
    quantity: z.coerce.number().positive(),
  })

  static readonly ARRAY_CREATE = z.array(
    z.object({
      userId: z.string(),
      title: z.string(),
      image: z.string(),
      category: z.string(),
      price: z.coerce.number().positive(),
      totalPrice: z.coerce.number().positive(),
      quantity: z.coerce.number().positive(),
    }),
  )
}
