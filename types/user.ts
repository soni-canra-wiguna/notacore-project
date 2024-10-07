import { Product, SalesRecord, User } from "@prisma/client"

export interface UserType extends User {
  products: Product[]
  salesRecord: SalesRecord[]
}
