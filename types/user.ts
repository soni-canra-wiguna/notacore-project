import { Product, SaleRecord, User } from "@prisma/client"

export interface UserType extends User {
  products: Product[]
  salesRecord: SaleRecord[]
}
