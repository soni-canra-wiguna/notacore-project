import { Unit } from "@prisma/client"
import * as z from "zod"

export class ProductValidation {
  static readonly CREATE = z.object({
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
    category: z.string().min(1, {
      message: "category product is required",
    }),
    stock: z
      .object({
        quantity: z.number().positive(),
        unit: z.nativeEnum(Unit),
      })
      .optional(),
  })

  static readonly UPDATE = z.object({
    userId: z.string().optional(),
    image: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    category: z.string().optional(),
    stock: z
      .object({
        quantity: z.number().positive().optional(),
        unit: z.nativeEnum(Unit).optional(),
      })
      .optional(),
  })
}
