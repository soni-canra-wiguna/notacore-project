import { ProductValidation } from "@/schema/product.schema"
import { Validation } from "@/schema/validation"
import {
  CreateProductRequest,
  ProductResponse,
  toProductResponse,
} from "./product.model"
import prisma from "@/lib/prisma"

export class ProductServices {
  static async create(request: CreateProductRequest): Promise<ProductResponse> {
    const createRequest = Validation.validate(ProductValidation.CREATE, request)

    const product = await prisma.product.create({
      data: createRequest,
    })

    return toProductResponse(product)
  }
}
