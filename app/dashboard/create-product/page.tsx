import { FormCreateProduct } from "@/components/dashboard/form-create-product"
import { Container } from "@/components/layout/container"
import { MainContainer } from "@/components/layout/main-container"
import { auth } from "@clerk/nextjs/server"

const CreateProductPage = async () => {
  const { userId, getToken } = auth()
  const token = await getToken()
  return (
    <MainContainer>
      <Container className="pb-20 pt-16">
        <FormCreateProduct userId={userId} token={token} />
      </Container>
    </MainContainer>
  )
}

export default CreateProductPage
