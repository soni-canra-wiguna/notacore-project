import { FormCreateProduct } from "@/components/dashboard/form-create-product"
import { Container } from "@/components/layout/container"
import { auth } from "@clerk/nextjs/server"

const CreateProductPage = async () => {
  const { userId, getToken } = auth()
  const token = await getToken()
  return (
    <main className="min-h-screen w-full">
      <Container className="pb-20 pt-16">
        <FormCreateProduct userId={userId} token={token} />
      </Container>
    </main>
  )
}

export default CreateProductPage
