import { Wrapper } from "@/components/layout/wrapper"
import { MainContainer } from "@/components/layout/main-container"
import { auth } from "@clerk/nextjs/server"
import { CreateProductTabs } from "@/components/dashboard/create-product-tabs"

const CreateProductPage = async () => {
  const { userId, getToken } = auth()
  const token = await getToken()
  return (
    <MainContainer>
      <Wrapper className="py-20">
        <CreateProductTabs userId={userId ?? ""} token={token ?? ""} />
      </Wrapper>
    </MainContainer>
  )
}

export default CreateProductPage
