import { FormEditProduct } from "@/components/dashboard/form-edit-product"
import { Wrapper } from "@/components/layout/wrapper"
import { auth } from "@clerk/nextjs/server"
import { MainContainer } from "@/components/layout/main-container"
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
    <MainContainer>
      <Wrapper className="pb-20 pt-16">
        <FormEditProduct product={product} token={token} />
      </Wrapper>
    </MainContainer>
  )
}

export default EditProductPage
