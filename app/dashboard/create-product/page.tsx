import { FormCreateProduct } from "@/components/dashboard/form-create-product"
import { Wrapper } from "@/components/layout/wrapper"
import { MainContainer } from "@/components/layout/main-container"
import { auth } from "@clerk/nextjs/server"

const CreateProductPage = async () => {
  const { userId, getToken } = auth()
  const token = await getToken()
  return (
    <MainContainer>
      <Wrapper className="pb-20 pt-16">
        <FormCreateProduct userId={userId ?? ""} token={token ?? ""} />
      </Wrapper>
    </MainContainer>
  )
}

export default CreateProductPage
