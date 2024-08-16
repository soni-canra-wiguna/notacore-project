import { FormEditProduct } from "@/components/dashboard/form-edit-product"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const { userId, getToken } = auth()
  const token = await getToken()

  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
      userId: userId!,
    },
  })

  if (!product) {
    return <div>Produk tidak di temukan :/ </div>
  }

  return <FormEditProduct product={product} token={token} />
}

export default EditProductPage
