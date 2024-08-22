import { FormEditProduct } from "@/components/dashboard/form-edit-product"
import { Container } from "@/components/layout/container"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

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

  return (
    <main className="min-h-screen w-full">
      <Container className="py-20">
        <FormEditProduct product={product} token={token} />
      </Container>
    </main>
  )
}

export default EditProductPage
