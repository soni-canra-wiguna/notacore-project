import { FormCreateProduct } from "@/components/dashboard/form-create-product"
import { Container } from "@/components/layout/container"
import { auth } from "@clerk/nextjs/server"

const CreateProductPage = async () => {
  const { userId, getToken } = auth()
  const token = await getToken()
  return (
    <main className="min-h-screen w-full">
      <Container className="py-20">
        <FormCreateProduct userId={userId} token={token} />
      </Container>
    </main>
  )
}

export default CreateProductPage
